export type ResearchTheme =
  | "computational_epidemiology"
  | "spatial_epidemiology"
  | "ai_for_public_health"
  | "human_ai_interaction"
  | "biological_systems"
  | "health_disparities"
  | "scientific_decision_making"
  | "infectious_disease_epidemiology"
  | "substance_use_epidemiology"

export type IconKey =
  | "activity"
  | "barChart"
  | "brainCircuit"
  | "code"
  | "dna"
  | "globe"
  | "mapPin"
  | "map"
  | "microscope"
  | "syringe"
  | "users"

export type Profile = {
  name: string
  displayName: string
  credentials: string
  title: string
  institution: string
  labTitle: string
  email: string
  image: string
  cvPath: string
  homepageSubtitle: string
  homepageBio: string
  homepageTagline: string
  aboutSubtitle: string
  biography: string[]
  researchIdentity: string[]
  currentDirections: ResearchTheme[]
  lastUpdated: string
}

export type ExpertiseSnapshot = {
  id: string
  icon: IconKey
  title: string
  description: string
  color: string
  bgColor: string
}

export type ResearchArea = {
  id: string
  icon: IconKey
  title: string
  description: string
  themes: ResearchTheme[]
}

export type ResearchPillar = ResearchArea & {
  tags: string[]
}

export type TimelineEvent = {
  role: string
  institution: string
  period: string
  focus: string
}

export type TechnicalExpertise = {
  icon: IconKey
  name: string
}
