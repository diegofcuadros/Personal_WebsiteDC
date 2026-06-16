import { contentOverrides } from "./contentOverrides"

const editorialStrategyBase = {
  primaryIdentity:
    "Academic researcher working at the intersection of computational epidemiology, spatial public health, and AI-human interaction.",
  coreResearchPillars: [
    "Computational and Spatial Epidemiology",
    "AI for Public Health and Biological Systems",
    "AI-Human Interaction and Scientific Decision-Making",
  ],
  tone: "Professional, academic, precise, evidence-based, concise, and not promotional.",
  avoid: [
    "placeholder content",
    "generic consulting language",
    "unverified claims",
    "AI hype",
    "invented DOIs or grant details",
    "overly long publication summaries",
  ],
}

export const editorialStrategy = {
  ...editorialStrategyBase,
  ...(contentOverrides.editorialStrategy ?? {}),
}
