import type { Profile, TechnicalExpertise, TimelineEvent } from "./types"
import { contentOverrides } from "./contentOverrides"

const profileBase: Profile = {
  name: "Dr. Diego F. Cuadros",
  displayName: "Dr. Diego F. Cuadros, Ph.D.",
  credentials: "Ph.D.",
  title: "Professor",
  institution: "University of Cincinnati",
  labTitle: "Director, Digital Epidemiology Lab",
  email: "diego.cuadros@uc.edu",
  image: "/Dic_2021-V2.jpg",
  cvPath: "/Diego_F_Cuadros_CV_full_0526.pdf",
  homepageSubtitle: "Professor of Epidemiology | AI-Human Interaction, Digital Epidemiology, and Disease Modeling",
  homepageBio:
    "Dr. Diego F. Cuadros is a Professor in the Department of Biological Sciences at the University of Cincinnati and Director of the Digital Epidemiology Laboratory. His work connects AI-human interaction, agentic AI systems, mathematical disease modeling, spatial epidemiology, and disease ecology, with more than 100 peer-reviewed publications and sustained NIH-funded research.",
  homepageTagline: "Studying how humans and AI systems reason, remember, govern, and act together.",
  aboutSubtitle: "Professor of Epidemiology, Digital Epidemiologist, and AI-Human Interaction Researcher",
  biography: [
    "Born and raised in Bogota, Colombia, Dr. Diego F. Cuadros earned his B.Sc. in Biology from the National University of Colombia, followed by a Ph.D. in Biology from the University of Kentucky. His doctoral research on HIV epidemiology in sub-Saharan Africa cultivated his passion for quantitative epidemiology and health geography.",
    "Dr. Cuadros's current research program bridges AI-human interaction, agentic AI systems, digital epidemiology, mathematical modeling, and disease ecology. His group studies how AI agents behave in real scientific workflows, how memory and oversight should be governed, and how complex data can be translated into actionable insight for researchers, health agencies, and communities.",
  ],
  researchIdentity: [
    "AI-human interaction",
    "AI agent ecosystems",
    "Digital epidemiology",
    "Computational epidemiology",
    "Disease ecology",
    "Spatial public health",
  ],
  currentDirections: [
    "ai_for_public_health",
    "human_ai_interaction",
    "computational_epidemiology",
    "infectious_disease_epidemiology",
    "spatial_epidemiology",
    "scientific_decision_making",
  ],
  lastUpdated: "2026-06-15",
}

const timelineEventsBase: TimelineEvent[] = [
  {
    role: "Professor",
    institution: "University of Cincinnati, Dept. of Biological Sciences",
    period: "2025-Present",
    focus: "Leading a research program in AI-human interaction, digital epidemiology, infectious disease modeling, and disease ecology.",
  },
  {
    role: "Director, Digital Epidemiology Lab",
    institution: "UC Digital Futures",
    period: "c. 2021-Present",
    focus: "Building data-driven, AI-supported, and human-centered approaches for scientific reasoning, surveillance, equity, and decision support.",
  },
  {
    role: "Associate Professor",
    institution: "University of Cincinnati, Dept. of Geography & GIS",
    period: "2022-2025",
    focus: "Advanced digital epidemiology, spatial epidemiology, HIV research, and computational public health.",
  },
  {
    role: "Assistant Professor",
    institution: "University of Cincinnati, Dept. of Geography & GIS",
    period: "2016-2022",
    focus: "Established the Health Geography and Disease Modeling Lab, laying the foundation for current research.",
  },
  {
    role: "Research Fellow",
    institution: "Africa Health Research Institute, South Africa",
    period: "2016",
    focus: "Modeled community-, household-, individual-, spatial, and genetic determinants of HIV acquisition and transmission.",
  },
  {
    role: "Consultant",
    institution: "The World Bank",
    period: "c. 2015",
    focus: "Contributed modeling expertise to evaluate and improve HIV resource allocation tools for health policy.",
  },
  {
    role: "Postdoctoral Fellow",
    institution: "Weill Cornell Medicine - Qatar",
    period: "2012-2014",
    focus: "Examined spatial patterns of HIV and Hepatitis C, honing skills in advanced spatial statistics and GIS.",
  },
  {
    role: "Ph.D. in Biology",
    institution: "University of Kentucky",
    period: "Completed 2012",
    focus: "Doctoral dissertation on the epidemiological impact of co-infections on HIV transmission in sub-Saharan Africa.",
  },
  {
    role: "B.Sc. in Biology",
    institution: "National University of Colombia",
    period: "",
    focus: "Foundation in biological sciences that sparked an interest in ecology and quantitative science.",
  },
]

const technicalExpertiseBase: TechnicalExpertise[] = [
  { icon: "brainCircuit", name: "AI-Human Interaction & Agent Systems" },
  { icon: "mapPin", name: "Geographic Information Systems (GIS)" },
  { icon: "barChart", name: "Spatial Statistics, Geospatial AI & Modeling" },
  { icon: "brainCircuit", name: "Mathematical & Computational Epidemiology" },
  { icon: "code", name: "Data Science, R, Python & Public Health Analytics" },
]

export const profile: Profile = {
  ...profileBase,
  ...(contentOverrides.profile ?? {}),
}

export const timelineEvents: TimelineEvent[] = contentOverrides.timelineEvents ?? timelineEventsBase
export const technicalExpertise: TechnicalExpertise[] = contentOverrides.technicalExpertise ?? technicalExpertiseBase
