import { NextResponse } from "next/server"
import fs from "node:fs/promises"
import path from "node:path"

import { z } from "zod"
import {
  getManagedSections,
  getSectionConfig,
  managedSectionIds,
  type ManagedSectionId,
} from "@/data/contentRegistry"

type ContentOverrides = Record<string, unknown>

const overridesPath = path.join(process.cwd(), "data", "content-overrides.json")
const sectionKeys = managedSectionIds as [ManagedSectionId, ...ManagedSectionId[]]
const managedSectionSet = new Set<ManagedSectionId>(managedSectionIds)

const updateRequestSchema = z.object({
  section: z.enum(sectionKeys).optional(),
  mode: z.enum(["auto", "manual", "cv"]),
  prompt: z.string().optional(),
  patch: z.unknown().optional(),
  cvText: z.string().optional(),
  append: z.boolean().default(false),
  preview: z.boolean().default(false),
  targetSections: z.array(z.enum(sectionKeys)).default([]),
  targetAllSections: z.boolean().default(true),
})

type ParsedRequest = z.infer<typeof updateRequestSchema> & { cvFile?: File | null }

const cvUpdateSchema = z.object({
  sections: z.record(z.unknown()).default({}),
  notes: z.string().optional(),
})

function parseBooleanInput(value: unknown, fallback: boolean) {
  if (typeof value === "boolean") return value
  if (typeof value === "string") {
    const normalized = value.toLowerCase().trim()
    if (normalized === "true" || normalized === "1" || normalized === "yes" || normalized === "on") {
      return true
    }
    if (normalized === "false" || normalized === "0" || normalized === "no" || normalized === "off") {
      return false
    }
  }
  return fallback
}

function getOptionalString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined
  const valueAsString = value.trim()
  return valueAsString.length ? valueAsString : undefined
}

function parseSectionIdList(raw: unknown): string[] {
  if (!raw) return []
  if (Array.isArray(raw)) {
    return raw.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
  }
  if (typeof raw !== "string") return []
  const trimmed = raw.trim()
  if (!trimmed) return []
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const parsed = JSON.parse(trimmed)
      if (!Array.isArray(parsed)) return []
      return parsed
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.trim())
        .filter((value) => value.length > 0)
    } catch (_error) {
      return []
    }
  }
  return trimmed
    .split(",")
    .map((value) => value.trim())
    .filter((value) => value.length > 0)
}

function parseJsonPayload(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return undefined
  try {
    return JSON.parse(value)
  } catch (_error) {
    throw new Error("Invalid JSON payload for field 'patch'.")
  }
}

function isManagedSectionId(value: string): value is ManagedSectionId {
  return managedSectionSet.has(value as ManagedSectionId)
}

function getAdminTokenFromRequest(request: Request) {
  const headerToken = request.headers.get("x-admin-token")
  if (headerToken) return headerToken.trim()

  const bearerHeader = request.headers.get("authorization")?.trim()
  if (!bearerHeader) return null
  if (bearerHeader.toLowerCase().startsWith("bearer ")) return bearerHeader.slice(7).trim()
  return bearerHeader
}

function requireAdminAccess(request: Request) {
  const configuredToken = process.env.ADMIN_ACCESS_TOKEN?.trim()
  if (!configuredToken) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          error: "Admin API disabled: set ADMIN_ACCESS_TOKEN in the deployment environment.",
        },
        { status: 503 },
      )
    }

    return null
  }

  const token = getAdminTokenFromRequest(request)
  if (token && token === configuredToken) return null

  const requestUrl = new URL(request.url)
  const queryToken = requestUrl.searchParams.get("adminToken")
  if (queryToken && queryToken === configuredToken) return null

  return NextResponse.json(
    {
      error:
        "Unauthorized: provide ADMIN_ACCESS_TOKEN using Authorization Bearer header or x-admin-token header.",
    },
    { status: 401 },
  )
}

async function parseUpdateRequest(request: Request): Promise<ParsedRequest> {
  const contentType = request.headers.get("content-type") ?? ""

  if (contentType.includes("application/json")) {
    const body = await request.json()
    const parsed = updateRequestSchema.parse({
      section: body?.section,
      mode: body?.mode,
      prompt: body?.prompt,
      patch: body?.patch,
      cvText: body?.cvText,
      append: parseBooleanInput(body?.append, false),
      preview: parseBooleanInput(body?.preview, false),
      targetSections: parseSectionIdList(body?.targetSections),
      targetAllSections: parseBooleanInput(body?.targetAllSections, true),
    })
    return parsed
  }

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData()
    const parsed = updateRequestSchema.parse({
      section: getOptionalString(formData.get("section")),
      mode: getOptionalString(formData.get("mode")),
      prompt: getOptionalString(formData.get("prompt")),
      patch: parseJsonPayload(formData.get("patch")),
      cvText: getOptionalString(formData.get("cvText")),
      append: parseBooleanInput(formData.get("append"), false),
      preview: parseBooleanInput(formData.get("preview"), false),
      targetSections: parseSectionIdList(formData.get("targetSections")),
      targetAllSections: parseBooleanInput(formData.get("targetAllSections"), true),
    })
    const cvFile = formData.get("cvFile")
    return { ...parsed, cvFile: cvFile instanceof File && cvFile.size > 0 ? cvFile : null }
  }

  throw new Error("Unsupported request content type. Use application/json or multipart/form-data.")
}

async function readOverrides(): Promise<ContentOverrides> {
  try {
    const raw = await fs.readFile(overridesPath, "utf8")
    const parsed = JSON.parse(raw)
    if (typeof parsed === "object" && parsed !== null) return parsed
  } catch (_error) {
    // Keep fallback empty store
  }
  return {}
}

async function writeOverrides(nextOverrides: ContentOverrides) {
  await fs.writeFile(overridesPath, `${JSON.stringify(nextOverrides, null, 2)}\n`, "utf8")
}

function currentSectionValue(overrides: ContentOverrides, section: ManagedSectionId) {
  const existing = overrides[section]
  if (existing === undefined || existing === null) return undefined
  return existing
}

function mergeSectionValue(
  section: ManagedSectionId,
  patch: unknown,
  existing: unknown,
  append: boolean,
) {
  const config = getSectionConfig(section)
  if (config.sectionKind === "array") {
    if (!Array.isArray(patch)) {
      throw new Error(`Expected an array for section '${section}'.`)
    }
    const nextList = patch as Array<unknown>
    if (append && Array.isArray(existing)) {
      const existingList = existing as Array<Record<string, unknown>>
      const existingKeys = new Set(existingList.map((item) => {
        const title = String((item as Record<string, unknown>)?.title ?? "")
        return title.toLowerCase().trim()
      }))
      const appended = [...existingList]
      nextList.forEach((item) => {
        const title = String((item as Record<string, unknown>)?.title ?? JSON.stringify(item))
        const key = title.toLowerCase().trim()
        if (!existingKeys.has(key)) {
          appended.push(item as Record<string, unknown>)
          existingKeys.add(key)
        }
      })
      return appended
    }
    return nextList
  }

  if (typeof patch !== "object" || patch === null || Array.isArray(patch)) {
    throw new Error(`Expected an object patch for section '${section}'.`)
  }

  return {
    ...(typeof existing === "object" && existing !== null ? (existing as Record<string, unknown>) : {}),
    ...(patch as Record<string, unknown>),
  }
}

async function callOpenAI(
  systemPrompt: string,
  userPrompt: string,
): Promise<unknown> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error("No OPENAI_API_KEY found. Set it in .env.local to use AI mode.")

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.ADMIN_AI_MODEL ?? "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.2,
      response_format: { type: "json_object" },
    }),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(`OpenAI API failed: ${response.status} ${response.statusText} ${message}`)
  }

  const payload = await response.json()
  const rawContent = payload?.choices?.[0]?.message?.content
  if (typeof rawContent !== "string") throw new Error("OpenAI response did not return JSON content.")

  const parsedText = rawContent.trim()
  try {
    return JSON.parse(parsedText)
  } catch (_error) {
    throw new Error("OpenAI did not return valid JSON.")
  }
}

function extractJsonString(raw: string) {
  const fenced = raw.trim().match(/^```json([\s\S]*?)```$/i)
  if (fenced?.[1]) return fenced[1].trim()
  if (raw.trim().startsWith("{") && raw.trim().endsWith("}")) return raw.trim()
  return raw.trim()
}

function buildAutoPrompt(section: ManagedSectionId, current: unknown, prompt: string) {
  const sectionConfig = getSectionConfig(section)
  const currentSnapshot = current
    ? `Current section snapshot:\n${JSON.stringify(current, null, 2)}`
    : "No override exists yet. Use the base content semantics."

  return {
    system: `You are a content operations agent for an academic website.
Return ONLY valid JSON with no markdown.
Use this section definition and produce updates that are academically precise and low-risk.
Section: ${sectionConfig.label}
Section ID: ${sectionConfig.id}
Description: ${sectionConfig.description}
Supported update shape: object/array matching this section. Keep all text concise and accurate.
Do not add fields outside the section shape.
Example: ${sectionConfig.sampleUpdate}
`,
    user: `${currentSnapshot}

User request:
${prompt}

Return only valid JSON. For object sections return partial object; for array sections return full array.`,
  }
}

async function parsePdfBuffer(buffer: Buffer) {
  try {
    const parserModule = await import("pdf-parse")
    const parser = (parserModule.default ?? parserModule) as (
      buffer: Buffer,
      options?: unknown,
    ) => Promise<{ text?: string }>
    const parsed = await parser(buffer)
    return parsed.text?.trim() ?? ""
  } catch (_error) {
    throw new Error("PDF parsing dependency is not available on the server. Install pdf-parse and restart.")
  }
}

async function extractCvFileText(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer())
  const mime = file.type.toLowerCase()
  const name = file.name.toLowerCase()

  if (mime === "application/pdf" || name.endsWith(".pdf")) {
    return parsePdfBuffer(buffer)
  }
  if (mime.startsWith("text/") || name.endsWith(".txt")) {
    return buffer.toString("utf8")
  }
  throw new Error("Unsupported CV file type. Upload PDF or plain text.")
}

async function extractCvText(payload: ParsedRequest) {
  const providedText = extractJsonString(payload.cvText ?? "")
  const uploadedText = payload.cvFile ? await extractCvFileText(payload.cvFile) : ""

  const merged = [providedText, uploadedText].filter((item) => item.trim().length).join("\n\n").trim()
  if (!merged) {
    throw new Error("CV mode requires either uploaded file text or pasted CV text.")
  }
  return merged
}

function buildCvPrompt(cvText: string, targets: ManagedSectionId[], existingBySection: Record<ManagedSectionId, unknown>) {
  const sectionList = targets
    .map((sectionId) => {
      const config = getSectionConfig(sectionId)
      const currentSection = existingBySection[sectionId]
      const currentSnapshot = currentSection
        ? `Current content snapshot:\n${JSON.stringify(currentSection, null, 2)}`
        : "Current content snapshot:\n<empty>"
      return `- ${sectionId}
Section name: ${config.label}
Description: ${config.description}
Shape: ${config.sectionKind}
Example shape: ${config.sampleUpdate}
${currentSnapshot}`
    })
    .join("\n\n")

  return {
    system: `You are a content extraction assistant for an academic website.
Return ONLY strict JSON using this exact shape:
{
  "sections": {
    "<sectionId>": <object-or-array>,
    ...
  },
  "notes": "optional update notes"
}
Use only these section IDs:
${targets.join(", ")}
For each provided section, only include a field when the CV contains clear evidence for it.
Do not invent details. Keep wording concise and aligned with the existing website style.
For array sections return only new or materially updated entries; skip duplicates.
For object sections return partial objects.`,
    user: `Use the CV text below to produce the requested section updates.
Only output strict JSON and nothing else.\n\n${sectionList}\n\nCV text:\n${cvText}`,
  }
}

function resolveCvTargets(payload: ParsedRequest): ManagedSectionId[] {
  const requestedSections = payload.targetSections.filter((section): section is ManagedSectionId => isManagedSectionId(section))

  if (!payload.targetAllSections && payload.section) {
    return payload.section && getSectionConfig(payload.section).supportsCv ? [payload.section] : []
  }

  if (requestedSections.length > 0) return requestedSections

  return managedSectionIds.filter((section) => getSectionConfig(section).supportsCv)
}

function extractSectionListFromData(data: Record<string, unknown>) {
  const existing: Record<ManagedSectionId, unknown> = {}
  managedSectionIds.forEach((id) => {
    if (Object.prototype.hasOwnProperty.call(data, id)) {
      existing[id] = data[id]
    }
  })
  return existing
}

export async function GET(request: Request) {
  const accessResult = requireAdminAccess(request)
  if (accessResult) return accessResult

  const overrides = await readOverrides()
  return NextResponse.json({
    sections: getManagedSections(),
    overrides,
    hasOpenAIKey: Boolean(process.env.OPENAI_API_KEY),
  })
}

export async function POST(request: Request) {
  const accessResult = requireAdminAccess(request)
  if (accessResult) return accessResult

  try {
    const payload = await parseUpdateRequest(request)
    const overrides = await readOverrides()

    if ((payload.mode === "auto" || payload.mode === "manual") && !payload.section) {
      return NextResponse.json({ error: "Section is required for manual/auto modes." }, { status: 400 })
    }

    if (payload.mode === "manual" && payload.patch === undefined) {
      return NextResponse.json({ error: "Manual mode requires a patch payload." }, { status: 400 })
    }
    if (payload.mode === "auto" && !payload.prompt?.trim()) {
      return NextResponse.json({ error: "Auto mode requires a prompt." }, { status: 400 })
    }

    if (payload.mode === "cv") {
      const targetSections = resolveCvTargets(payload)
      if (targetSections.length === 0) {
        return NextResponse.json({ error: "CV mode has no target sections to update." }, { status: 400 })
      }

      const cvText = await extractCvText(payload)
      const existingSections = extractSectionListFromData(overrides)
      const promptData = buildCvPrompt(cvText, targetSections, existingSections)
      const output = await callOpenAI(promptData.system, promptData.user)
      const parsed = cvUpdateSchema.safeParse(output)
      if (!parsed.success) {
        return NextResponse.json({ error: "Could not parse CV extraction response." }, { status: 400 })
      }

      const targetSet = new Set(targetSections)
      const nextOverrides = { ...overrides }
      const updatedSections: string[] = []

      for (const [sectionId, sectionPatch] of Object.entries(parsed.data.sections)) {
        if (!isManagedSectionId(sectionId)) continue
        if (!targetSet.has(sectionId)) continue
        const config = getSectionConfig(sectionId)
        if (!config.supportsCv) continue

        const parsedPatch = config.patchSchema.safeParse(sectionPatch)
        if (!parsedPatch.success) {
          return NextResponse.json(
            {
              error: `Could not parse extracted content for section '${sectionId}'.`,
              details: parsedPatch.error.issues,
            },
            { status: 400 },
          )
        }

        const sectionValue = currentSectionValue(overrides, sectionId)
        const nextValue = mergeSectionValue(sectionId, parsedPatch.data, sectionValue, payload.append)
        nextOverrides[sectionId] = nextValue
        updatedSections.push(sectionId)
      }

      if (!updatedSections.length) {
        return NextResponse.json(
          {
            ok: true,
            mode: "cv",
            sectionsUpdated: [],
            nextValues: {},
            message: "No confident updates were extracted from the CV.",
            preview: payload.preview,
          },
          { status: 200 },
        )
      }

      if (!payload.preview) {
        await writeOverrides(nextOverrides)
      }

      const message = payload.preview
        ? "CV preview generated successfully. No file write occurred."
        : "CV extracted updates applied successfully."

      return NextResponse.json({
        ok: true,
        mode: "cv",
        sectionsUpdated: updatedSections,
        nextValues: payload.preview ? updatedSections.reduce<Record<string, unknown>>((acc, section) => {
          acc[section] = nextOverrides[section]
          return acc
        }, {}) : nextOverrides,
        message,
        preview: payload.preview,
      })
    }

    const sectionId = payload.section as ManagedSectionId
    const config = getSectionConfig(sectionId)
    if (payload.mode === "auto" && !config.supportsAuto) {
      return NextResponse.json({ error: "Auto mode is not supported for this section." }, { status: 400 })
    }
    if (payload.mode === "cv" && !config.supportsCv) {
      return NextResponse.json({ error: "CV mode is not supported for this section." }, { status: 400 })
    }
      const existingValue = currentSectionValue(overrides, sectionId)
    let patch: unknown

    if (payload.mode === "manual") {
      try {
        patch = config.patchSchema.parse(payload.patch)
      } catch (_error) {
        return NextResponse.json({ error: "Invalid patch format for this section." }, { status: 400 })
      }
    } else {
      const promptData = buildAutoPrompt(sectionId, existingValue, payload.prompt ?? "")
      const output = await callOpenAI(promptData.system, promptData.user)
      const parsed = config.patchSchema.safeParse(output)
      if (!parsed.success) {
        return NextResponse.json({ error: "Could not parse AI patch for section." }, { status: 400 })
      }
      patch = parsed.data
    }

    const nextValue = mergeSectionValue(sectionId, patch, existingValue, payload.append)
    const nextOverrides = {
      ...overrides,
      [sectionId]: nextValue,
    }

    if (!payload.preview) {
      await writeOverrides(nextOverrides)
    }

    return NextResponse.json({
      ok: true,
      section: sectionId,
      mode: payload.mode,
      nextValue,
      preview: payload.preview,
      message: payload.preview
        ? "Preview generated. No file write occurred."
        : "Section updated successfully. Reload dev server page to see latest values.",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request body.", details: error.issues }, { status: 400 })
    }
    if (error instanceof Error && error.message.includes("Unsupported request content type")) {
      return NextResponse.json({ error: error.message }, { status: 415 })
    }
    const message = error instanceof Error ? error.message : "Unexpected error while updating content."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
