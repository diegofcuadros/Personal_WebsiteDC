import { contentOverrides } from "./contentOverrides"

export type ProjectIconKey = "trendingUp" | "brain" | "barChartBig" | "checkCircle"

export type CurrentProject = {
  title: string
  icon: ProjectIconKey
  goal: string
  methods: string
  partners?: string
  output?: string
  funding?: string
  impact?: string
  useCase?: string
}

export type PastProject = {
  title: string
  icon: ProjectIconKey
  description: string
}

const currentProjectsBase: CurrentProject[] = [
  {
    title: "AI Agent Ecosystems and AI-Human Scientific Workflows",
    icon: "brain",
    goal: "Study how AI agents, governed collaborative memory, oversight, and human-in-the-loop workflows shape scientific reasoning",
    methods: "AI-human interaction analysis, agentic research workflows, collaborative memory governance, audit design, and evaluation of AI-supported scientific cognition",
    impact: "Positions the lab at the intersection of AI-human interaction, agent governance, scientific decision support, and applied epidemiology.",
  },
  {
    title: "Spatial Shifts in HIV Epidemics in Sub-Saharan Africa",
    icon: "trendingUp",
    goal: "Identify and characterize evolving HIV hotspots across multiple African countries",
    methods: "Geostatistical interpolation, Bayesian smoothing, HIV care-cascade mapping, and AI-supported evidence synthesis",
    partners: "University of Cincinnati, Harvard, local ministries of health",
    output: "Targeted maps for national program use; publications in Lancet HIV, BMJ Global Health",
  },
  {
    title: "RTRI for Precision Public Health in Sub-Saharan Africa",
    icon: "brain",
    goal: "Use rapid tests for recent infection to support precision public health strategies amid changing HIV epidemiology",
    methods: "Recent-infection indicators, spatial risk mapping, implementation analytics, and dashboard-oriented translation",
    funding: "NIH (2023-2027)",
    impact: "Supports next-generation HIV hotspot targeting and program adaptation in sub-Saharan Africa.",
  },
  {
    title: "Health Service Access and NCD Burden in HIV-Endemic Regions",
    icon: "barChartBig",
    goal: "Analyze joint burden of HIV and non-communicable diseases using population-level geospatial data",
    methods: "Hotspot mapping, spatial autocorrelation, multilevel modeling",
    useCase: "South Africa, Zambia",
  },
]

const pastProjectsBase: PastProject[] = [
  {
    title: "Mapping HIV Testing Gaps in Zambia",
    icon: "checkCircle",
    description: "Identified critical spatial disparities in HIV testing using DHS data. Supported targeted resource allocation for provincial health planners.",
  },
  {
    title: "Geospatial Modeling of Malaria-HIV Co-Infection",
    icon: "checkCircle",
    description: "Developed one of the first mechanistic models for disease interaction at a systems level. Helped shape understanding of interdependent disease burdens.",
  },
  {
    title: "UNAIDS 95-95-95 Progress Mapping",
    icon: "checkCircle",
    description: "Created fine-scale geospatial analysis of ART access, diagnosis rates, and viral suppression. Published results directly influencing subnational HIV programs in SSA.",
  },
  {
    title: "Epidemic Metric Index for HIV",
    icon: "checkCircle",
    description: "Proposed and validated new epidemiological indicators to prioritize intervention zones. Widely cited in strategy documents and used in dashboarding projects.",
  },
]

export const currentProjectsData = contentOverrides.currentProjectsData ?? currentProjectsBase
export const pastProjectsData = contentOverrides.pastProjectsData ?? pastProjectsBase
