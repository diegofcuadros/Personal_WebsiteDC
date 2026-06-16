import { contentOverrides } from "./contentOverrides"

const homepageCopyBase = {
  videoHeading: "Watch: A Glimpse into Digital Epidemiology",
  videoId: "ZjmI_xDaC1k",
  expertiseHeading: "AI-Human Interaction, Agent Systems, and Epidemiology",
  expertiseIntro: "A research program connecting agentic AI, governed memory, disease modeling, spatial intelligence, and scientific decision-making.",
  primaryCta: {
    label: "Explore Research Program",
    href: "/research",
  },
  secondaryCta: {
    label: "View Publications",
    href: "/publications",
  },
  collaborationHeading: "Interested in AI-human interaction, agent systems, or an invited talk?",
  collaborationBody:
    "Discuss how AI-human interaction, agent governance, disease modeling, and rigorous spatial analysis can inform scientific and public health decisions.",
  collaborationCta: {
    label: "Get In Touch",
    href: "/contact",
  },
}

const aboutCopyBase = {
  biographyHeading: "Biography & Mission",
  researchPillarsHeading: "Research Pillars",
  careerHeading: "Career Trajectory",
  technicalExpertiseHeading: "Technical Expertise",
  globalFootprintHeading: "Global Research Footprint",
  globalFootprintBody:
    "My research spans five continents, involving universities, ministries of health, global health institutes, and data partnerships. This interactive map highlights projects where AI-human interaction, modeling, spatial epidemiology, and disease ecology support real-world decisions.",
}

export const homepageCopy = {
  ...homepageCopyBase,
  ...(contentOverrides.homepageCopy ?? {}),
}

export const aboutCopy = {
  ...aboutCopyBase,
  ...(contentOverrides.aboutCopy ?? {}),
}
