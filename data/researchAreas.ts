import type { ExpertiseSnapshot, ResearchArea, ResearchPillar } from "./types"
import { contentOverrides } from "./contentOverrides"

const expertiseSnapshotsBase: ExpertiseSnapshot[] = [
  {
    id: "ai-human-interaction",
    icon: "brainCircuit",
    title: "AI-Human Interaction",
    description:
      "Agentic AI systems, governed memory, oversight, and human decision boundaries in real scientific and analytic workflows.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
  },
  {
    id: "disease-modeling",
    icon: "brainCircuit",
    title: "Disease Modeling",
    description:
      "Mathematical and computational models to simulate epidemic trajectories and predict outcomes under different scenarios.",
    color: "text-teal-500",
    bgColor: "bg-teal-50 dark:bg-teal-950/20",
  },
  {
    id: "spatial-epidemiology",
    icon: "map",
    title: "Spatial Epidemiology",
    description:
      "Integrating GIS to map disease incidence, identify hotspots, and uncover environmental and social determinants of health.",
    color: "text-vibrant-gold-500",
    bgColor: "bg-vibrant-gold-50 dark:bg-vibrant-gold-950/20",
  },
  {
    id: "digital-epidemiology",
    icon: "activity",
    title: "Digital Epidemiology",
    description:
      "Leveraging large datasets, computational tools, and public health analytics for HIV, COVID-19, vaccination, and emerging health threats.",
    color: "text-coral-500",
    bgColor: "bg-coral-50 dark:bg-coral-950/20",
  },
]

const researchPillarsBase: ResearchPillar[] = [
  {
    id: "ai-human-interaction-agentic-systems",
    icon: "brainCircuit",
    title: "AI-Human Interaction & Agentic Systems",
    description:
      "Designing and evaluating AI agents, collaborative memory systems, oversight mechanisms, and decision workflows that keep human authority visible and accountable.",
    themes: ["ai_for_public_health", "human_ai_interaction", "scientific_decision_making"],
    tags: ["AI Agents", "AI-Human Interaction", "Memory Governance", "Oversight"],
  },
  {
    id: "infectious-disease-epidemiology",
    icon: "microscope",
    title: "Infectious Disease Epidemiology",
    description:
      "Pioneering research on HIV/AIDS, COVID-19, and Hepatitis C, focusing on co-infections, transmission dynamics, and intervention strategies in high-risk populations.",
    themes: ["infectious_disease_epidemiology", "computational_epidemiology"],
    tags: ["HIV/AIDS", "COVID-19", "HCV", "Pandemics"],
  },
  {
    id: "health-geography-spatial-epidemiology",
    icon: "globe",
    title: "Health Geography & Spatial Epidemiology",
    description:
      "Utilizing GIS and spatial analysis to map disease hotspots, uncover environmental and social determinants of health, and analyze geographic disparities in healthcare access.",
    themes: ["spatial_epidemiology", "health_disparities"],
    tags: ["GIS", "Hotspot Analysis", "Health Disparities"],
  },
  {
    id: "substance-use-epidemiology",
    icon: "users",
    title: "Substance Use Epidemiology",
    description:
      "Analyzing the spatial and temporal evolution of the U.S. opioid crisis, identifying demographic shifts and geographic drivers to inform targeted public health interventions.",
    themes: ["substance_use_epidemiology", "health_disparities"],
    tags: ["Opioid Crisis", "SUD", "Public Health"],
  },
]

const researchThemesBase: ResearchArea[] = [
  {
    id: "ai-agent-ecosystems-governed-memory",
    icon: "brainCircuit",
    title: "AI Agent Ecosystems & Governed Memory",
    description:
      "Studying how AI agents exchange memory, acquire influence, and require governance in collaborative scientific and analytic environments.",
    themes: ["human_ai_interaction", "scientific_decision_making", "ai_for_public_health"],
  },
  {
    id: "ambient-persuasion-ai-oversight",
    icon: "users",
    title: "Ambient Persuasion, Oversight & Authorization",
    description:
      "Examining how non-adversarial AI behavior can still steer human decisions, and how oversight, audit, and authorization should be designed.",
    themes: ["human_ai_interaction", "scientific_decision_making"],
  },
  {
    id: "human-ai-interaction-public-health",
    icon: "users",
    title: "AI-Human Interaction for Decision Support",
    description:
      "Examining how researchers, practitioners, and communities interact with AI tools, with emphasis on trust, interpretability, workflow design, and equitable decision support.",
    themes: ["human_ai_interaction", "scientific_decision_making", "ai_for_public_health"],
  },
  {
    id: "hiv-epidemiology-sub-saharan-africa",
    icon: "dna",
    title: "HIV Epidemiology in sub-Saharan Africa",
    description:
      "Investigating the spatial dynamics of HIV, including epidemic persistence, the impact of co-infections, and the effectiveness of targeted interventions.",
    themes: ["infectious_disease_epidemiology", "spatial_epidemiology"],
  },
  {
    id: "opioid-crisis-infectious-diseases",
    icon: "syringe",
    title: "Opioid Crisis and Infectious Diseases",
    description:
      "Analyzing the dual epidemics of opioid use and related infectious diseases like Hepatitis C, focusing on syndemic theory and spatial patterns in rural and urban settings.",
    themes: ["substance_use_epidemiology", "infectious_disease_epidemiology"],
  },
  {
    id: "global-health-tropical-diseases",
    icon: "globe",
    title: "Global Health & Tropical Diseases",
    description:
      "Modeling the spread and control of tropical diseases, considering environmental factors, climate change, and global travel patterns.",
    themes: ["computational_epidemiology", "biological_systems"],
  },
  {
    id: "advanced-methods-disease-modeling",
    icon: "barChart",
    title: "Advanced Methodologies in Disease Modeling",
    description:
      "Developing and applying novel statistical methods, machine learning algorithms, and complex-systems modeling to address challenges in health data analytics.",
    themes: ["computational_epidemiology", "ai_for_public_health"],
  },
  {
    id: "health-disparities-social-determinants",
    icon: "users",
    title: "Health Disparities and Social Determinants of Health",
    description:
      "Using spatial analysis to identify and understand health inequities, focusing on how social and environmental factors contribute to disparities in disease burden.",
    themes: ["health_disparities", "spatial_epidemiology"],
  },
]

export const expertiseSnapshots = contentOverrides.expertiseSnapshots ?? expertiseSnapshotsBase
export const researchPillars = contentOverrides.researchPillars ?? researchPillarsBase
export const researchThemes = contentOverrides.researchThemes ?? researchThemesBase
