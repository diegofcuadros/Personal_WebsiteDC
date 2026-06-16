"use client"

import { type FormEvent, useEffect, useMemo, useState } from "react"

type SectionMeta = {
  id: string
  label: string
  description: string
  sectionKind: "array" | "object"
  supportsAuto: boolean
  supportsCv: boolean
  sampleUpdate: string
}

type UpdateResponse = {
  ok?: boolean
  section?: string
  error?: string
  message?: string
  nextValue?: unknown
  nextValues?: Record<string, unknown>
  sectionsUpdated?: string[]
  preview?: boolean
}

type AdminBootstrap = {
  sections: SectionMeta[]
  hasOpenAIKey: boolean
}

type AdminMode = "auto" | "manual" | "cv"

type PresetUpdate = {
  section: string
  mode: "manual"
  patch: unknown
  append?: boolean
}

type UpdatePayload = {
  section?: string
  mode: AdminMode
  prompt?: string
  patch?: unknown
  cvText?: string
  append?: boolean
  preview?: boolean
  targetSections?: string[]
  targetAllSections?: boolean
  cvFile?: File | null
}

const ADMIN_TOKEN_STORAGE_KEY = "dc-admin-access-token"

const PRESET_UPDATES: PresetUpdate[] = [
  {
    section: "profile",
    mode: "manual",
    patch: {
      homepageSubtitle: "AI-Human Interaction for Trustworthy Scientific Decisions",
      homepageBio:
        "Dr. Diego F. Cuadros leads a research program centered on AI-human interaction, agent systems, spatial epidemiology, and computational biology methods that support clearer, fairer, and more accountable decisions.",
      homepageTagline: "Advancing Human-centered AI workflows that strengthen real-world health action.",
      aboutSubtitle: "Epidemiologist, AI-Human Interaction Scientist, and Biological Systems Researcher",
      researchIdentity: [
        "computational_epidemiology",
        "spatial_epidemiology",
        "human_ai_interaction",
        "scientific_decision_making",
        "biological_systems",
      ],
    },
  },
  {
    section: "homepageCopy",
    mode: "manual",
    patch: {
      expertiseHeading: "Research Focus: AI-Human Interaction and Agent Systems",
      expertiseIntro:
        "Our work centers on how experts and AI systems co-create insights for public health decisions across spatial disease surveillance, intervention planning, and communication.",
      collaborationHeading: "Want to co-design robust AI-human workflows for your team?",
      collaborationBody:
        "I help teams build interpretable AI pipelines for spatial epidemiology, evidence synthesis, and rapid public health response, always with scientific rigor and practical usability as the core constraints.",
    },
  },
  {
    section: "aboutCopy",
    mode: "manual",
    patch: {
      biographyHeading: "About & Mission",
      researchPillarsHeading: "Research Pillars: Spatial + Biological + AI-Human Science",
      careerHeading: "Career Trajectory in AI-Human Interaction Research",
      globalFootprintBody:
        "The lab spans five continents, combining spatial methods, computational biology thinking, and AI-human collaboration to support resilient scientific and public health decision systems in high-impact settings.",
    },
  },
  {
    section: "researchThemes",
    mode: "manual",
    append: true,
    patch: [
      {
        id: "human-ai-interaction-public-health-decision-workflows",
        icon: "brainCircuit",
        title: "AI-Human Interaction in Scientific Decision Workflows",
        description:
          "How analysts, policy teams, and AI systems collaborate to produce transparent, trustworthy public health actions, from forecast interpretation to intervention prioritization.",
        themes: ["human_ai_interaction", "scientific_decision_making", "ai_for_public_health"],
      },
    ],
  },
  {
    section: "researchPillars",
    mode: "manual",
    append: true,
    patch: [
      {
        id: "human-ai-interaction-pillar",
        icon: "users",
        title: "AI-Human Interaction for Accountable Decision Support",
        description:
          "Design, evaluation, and translation of AI-human workflows in spatial epidemiology to improve trust, interpretability, accountability, and equity in decision settings.",
        themes: ["human_ai_interaction", "ai_for_public_health", "scientific_decision_making"],
        tags: ["Human-Centered AI", "Decision Support", "Spatial Epidemiology", "Biological Systems"],
      },
    ],
  },
]

function getJsonHeaders(token: string) {
  const headers: Record<string, string> = { "content-type": "application/json" }
  if (token.trim()) {
    headers.Authorization = `Bearer ${token.trim()}`
  }
  return headers
}

function getAuthHeaders(token: string) {
  const headers: Record<string, string> = {}
  if (token.trim()) {
    headers.Authorization = `Bearer ${token.trim()}`
  }
  return headers
}

export default function AdminContentPage() {
  const [sections, setSections] = useState<SectionMeta[]>([])
  const [loadingSections, setLoadingSections] = useState(true)
  const [hasOpenAIKey, setHasOpenAIKey] = useState(false)
  const [adminToken, setAdminToken] = useState("")
  const [adminTokenInput, setAdminTokenInput] = useState("")

  const [sectionId, setSectionId] = useState("")
  const [mode, setMode] = useState<AdminMode>("auto")
  const [prompt, setPrompt] = useState("")
  const [patchText, setPatchText] = useState("")
  const [cvText, setCvText] = useState("")
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [append, setAppend] = useState(false)
  const [targetAllSections, setTargetAllSections] = useState(true)
  const [preview, setPreview] = useState(false)

  const [busy, setBusy] = useState(false)
  const [presetBusy, setPresetBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [result, setResult] = useState<UpdateResponse | null>(null)

  const selectedSection = useMemo(
    () => sections.find((item) => item.id === sectionId) ?? null,
    [sections, sectionId],
  )

  const supportsAuto = Boolean(selectedSection?.supportsAuto)
  const hasAnyCvSupport = sections.some((item) => item.supportsCv)

  const loadSections = async (token?: string) => {
    setLoadingSections(true)
    setMessage(null)
    try {
      const response = await fetch("/api/admin/content", {
        headers: getAuthHeaders(token ?? adminToken),
      })

      if (response.status === 401) {
        const payload = (await response.json()) as { error?: string }
        setMessage(payload.error ?? "Unauthorized. Provide admin token.")
        setHasOpenAIKey(false)
        setSections([])
        return
      }

      if (!response.ok) {
        throw new Error("Could not load editable sections.")
      }

      const payload = (await response.json()) as AdminBootstrap
      setSections(payload.sections ?? [])
      setHasOpenAIKey(Boolean(payload.hasOpenAIKey))
      const first = payload.sections?.[0]
      if (first && !sectionId) {
        setSectionId(first.id)
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load section metadata.")
      setSections([])
    } finally {
      setLoadingSections(false)
    }
  }

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) : null
    if (stored) {
      setAdminToken(stored)
      setAdminTokenInput(stored)
    }

    void loadSections(stored ?? undefined)
  }, [])

  useEffect(() => {
    if (!selectedSection) return
    if (mode === "manual") {
      setPatchText(selectedSection.sampleUpdate)
    }
  }, [selectedSection, mode])

  useEffect(() => {
    if (mode === "auto" && !selectedSection?.supportsAuto) {
      setMode(selectedSection?.supportsCv ? "cv" : "manual")
    }
    if (mode === "cv" && !hasAnyCvSupport) {
      setMode("manual")
    }
  }, [hasAnyCvSupport, mode, selectedSection?.supportsAuto, selectedSection?.supportsCv])

  const postUpdate = async (payload: UpdatePayload): Promise<UpdateResponse> => {
    if (payload.mode === "cv") {
      const formData = new FormData()
      if (payload.section) formData.append("section", payload.section)
      if (payload.prompt) formData.append("prompt", payload.prompt)
      if (payload.patch !== undefined) formData.append("patch", JSON.stringify(payload.patch))
      if (payload.cvText) formData.append("cvText", payload.cvText)
      if (payload.cvFile) formData.append("cvFile", payload.cvFile)
      if (payload.targetSections?.length) formData.append("targetSections", JSON.stringify(payload.targetSections))
      formData.append("targetAllSections", String(payload.targetAllSections ?? true))
      formData.append("append", String(payload.append ?? false))
      formData.append("preview", String(payload.preview ?? false))
      formData.append("mode", payload.mode)

      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: getAuthHeaders(adminToken),
        body: formData,
      })

      const parsed = (await response.json()) as UpdateResponse
      if (!response.ok) {
        throw new Error(parsed.error ?? "Update failed.")
      }
      return parsed
    }

    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: getJsonHeaders(adminToken),
      body: JSON.stringify({
        section: payload.section,
        mode: payload.mode,
        prompt: payload.prompt,
        patch: payload.patch,
        append: payload.append ?? false,
        preview: payload.preview ?? false,
      }),
    })

    const parsed = (await response.json()) as UpdateResponse
    if (!response.ok) {
      throw new Error(parsed.error ?? "Update failed.")
    }

    return parsed
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setMessage(null)
    setResult(null)

    try {
      if (mode === "manual" && !patchText.trim()) {
        setMessage("Manual mode requires JSON patch text.")
        return
      }

      if (mode === "auto" && !selectedSection?.supportsAuto) {
        setMessage("Selected section does not support AI text mode.")
        return
      }

      if (mode === "cv" && !hasAnyCvSupport) {
        setMessage("No CV-capable section is available.")
        return
      }

      if ((mode === "auto" || mode === "manual") && !selectedSection) {
        setMessage("Choose a section first.")
        return
      }

      if (mode === "auto" && !prompt.trim()) {
        setMessage("Auto mode requires a natural-language prompt.")
        return
      }

      if (mode === "cv" && !targetAllSections && !selectedSection?.supportsCv) {
        setMessage("CV mode for selected section is not supported.")
        return
      }

      if (mode === "cv" && !cvFile && !cvText.trim()) {
        setMessage("Upload a CV file or paste CV text.")
        return
      }

      if (mode === "manual" && sectionId) {
        try {
          JSON.parse(patchText)
        } catch (_error) {
          setMessage("The manual patch is not valid JSON.")
          return
        }
      }

      const response = await postUpdate({
        section: sectionId || undefined,
        mode,
        prompt: mode === "manual" ? "" : prompt,
        patch: mode === "manual" ? JSON.parse(patchText) : undefined,
        cvText: mode === "cv" ? cvText : "",
        cvFile: mode === "cv" ? cvFile : null,
        append,
        targetSections: mode === "cv" && targetAllSections ? undefined : [sectionId],
        targetAllSections,
        preview,
      })

      setResult(response)
      setMessage(response.message ?? "Update completed.")
    } catch (error) {
      if (error instanceof Error && error.message.includes("Unauthorized")) {
        setMessage("Unauthorized. Add your admin token and click 'Save token'.")
      } else {
        setMessage(error instanceof Error ? error.message : "There was an error submitting the request.")
      }
      setResult(null)
    } finally {
      setBusy(false)
    }
  }

  const applyPreset = async () => {
    setPresetBusy(true)
    setMessage(null)
    setResult(null)

    try {
      let lastResponse: UpdateResponse | null = null
      for (let index = 0; index < PRESET_UPDATES.length; index += 1) {
        const preset = PRESET_UPDATES[index]
        setMessage(`Applying preset (${index + 1}/${PRESET_UPDATES.length})`)
        lastResponse = await postUpdate({
          section: preset.section,
          mode: preset.mode,
          patch: preset.patch,
          append: preset.append,
        })
      }
      setResult(lastResponse ?? { ok: true, message: "Preset applied." })
      setMessage("AI-human interaction preset applied. Reload the relevant pages to see updates.")
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to apply the preset.")
      setResult(null)
    } finally {
      setPresetBusy(false)
    }
  }

  const saveAdminToken = () => {
    if (typeof window !== "undefined") {
      if (adminTokenInput.trim()) {
        window.localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, adminTokenInput.trim())
      } else {
        window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY)
      }
    }
    setAdminToken(adminTokenInput.trim())
    void loadSections(adminTokenInput.trim())
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 md:px-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-deep-navy-900">Website Content Updater</h1>
        <p className="mt-2 text-sm text-slate-700">
          Use this panel to update website content from natural language, pasted JSON, or CV extraction.
          Changes are saved to <code>data/content-overrides.json</code> and applied immediately on page refresh.
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">Admin Access</h2>
        <p className="mb-2 text-sm text-slate-600">
          Optional token is needed only when <code>ADMIN_ACCESS_TOKEN</code> is set for the API route.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="adminToken">
              Admin token
            </label>
            <input
              id="adminToken"
              value={adminTokenInput}
              onChange={(event) => setAdminTokenInput(event.target.value)}
              placeholder="ADMIN_ACCESS_TOKEN"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <button
            type="button"
            onClick={saveAdminToken}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
          >
            Save token
          </button>
          <button
            type="button"
            onClick={() => void loadSections(adminToken)}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
          >
            Reload sections
          </button>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">
          AI-Human Interaction Preset
        </h2>
        <p className="mb-3 text-sm text-slate-600">
          Apply a one-click preset that updates homepage, about, and research-facing copy toward the AI-human interaction theme.
        </p>
        <button
          type="button"
          disabled={presetBusy}
          onClick={() => void applyPreset()}
          className="rounded-md bg-coral-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-coral-600 disabled:opacity-50"
        >
          {presetBusy ? "Applying preset..." : "Apply AI-Human Interaction preset"}
        </button>
      </section>

      <form onSubmit={submit} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        {loadingSections ? (
          <p>Loading sections...</p>
        ) : (
          <>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="section">
              Section
            </label>
            <select
              id="section"
              value={sectionId}
              onChange={(event) => setSectionId(event.target.value)}
              className="mb-4 w-full rounded-md border border-slate-300 px-3 py-2"
            >
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.label}
                </option>
              ))}
            </select>

            {selectedSection && <p className="mb-4 text-sm text-slate-600">{selectedSection.description}</p>}

            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="mode">
              Update mode
            </label>
            <select
              id="mode"
              value={mode}
              onChange={(event) => setMode(event.target.value as AdminMode)}
              className="mb-4 w-full rounded-md border border-slate-300 px-3 py-2"
            >
              {supportsAuto ? <option value="auto">Natural language (AI)</option> : null}
              <option value="manual">Manual JSON patch</option>
              {hasAnyCvSupport ? <option value="cv">CV upload + AI extraction</option> : null}
            </select>

            {mode === "cv" ? (
              <label className="mb-4 inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={targetAllSections}
                  onChange={(event) => setTargetAllSections(event.target.checked)}
                />
                Apply updates to all CV-supported sections
              </label>
            ) : null}

            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="prompt">
              Prompt (for AI modes)
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder='Example: "Reposition homepage to emphasize AI-human interaction and Biological Sciences identity."'
              disabled={mode !== "auto"}
              className="mb-4 h-28 w-full rounded-md border border-slate-300 px-3 py-2"
            />

            {mode === "manual" ? (
              <>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="patch">
                  Patch JSON
                </label>
                <textarea
                  id="patch"
                  value={patchText}
                  onChange={(event) => setPatchText(event.target.value)}
                  className="mb-4 h-56 w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </>
            ) : null}

            {mode === "cv" ? (
              <>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="cvFile">
                  CV file
                </label>
                <input
                  id="cvFile"
                  type="file"
                  accept=".pdf,.txt,application/pdf,text/plain"
                  onChange={(event) => setCvFile(event.target.files?.[0] ?? null)}
                  className="mb-2 w-full rounded-md border border-slate-300 px-3 py-2"
                />
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="cvText">
                  CV text (optional)
                </label>
                <textarea
                  id="cvText"
                  value={cvText}
                  onChange={(event) => setCvText(event.target.value)}
                  className="mb-4 h-48 w-full rounded-md border border-slate-300 px-3 py-2"
                  placeholder="Paste CV text if you want to fine-tune the upload (optional)."
                />
                <p className="mb-4 text-xs text-slate-500">
                  Upload a PDF/TXT file. If text is also pasted, the system combines both sources and updates sections it can reliably infer.
                </p>
              </>
            ) : null}

            {selectedSection?.sectionKind === "array" ? (
              <label className="mb-3 inline-flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={append} onChange={(event) => setAppend(event.target.checked)} />
                Append instead of replace for array sections
              </label>
            ) : null}

            <label className="mb-4 inline-flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={preview} onChange={(event) => setPreview(event.target.checked)} />
              Preview only (do not write file)
            </label>

            <button
              type="submit"
              disabled={busy || presetBusy}
              className="rounded-md bg-deep-navy-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-deep-navy-800 disabled:opacity-50"
            >
              {busy ? "Applying..." : "Apply update"}
            </button>
          </>
        )}
      </form>

      {!hasOpenAIKey ? (
        <section className="rounded-lg border border-amber-300 bg-amber-50 p-5 shadow-sm">
          <p className="text-sm text-amber-900">
            AI modes are disabled because OPENAI_API_KEY is not set. Add it to <code>.env.local</code> for natural-language
            and CV extraction updates.
          </p>
        </section>
      ) : null}

      {message ? (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-800">{message}</p>
        </section>
      ) : null}

      {result ? (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-700">Result</h2>
          <pre className="overflow-auto rounded border border-slate-200 bg-slate-950 p-3 text-xs text-slate-100">
            {JSON.stringify(result, null, 2)}
          </pre>
        </section>
      ) : null}
    </main>
  )
}
