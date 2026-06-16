import { contentOverrides } from "./contentOverrides"

export type CollaborationIconKey = "microscope" | "globe" | "graduationCap" | "building"

export type ExpertiseArea = {
  id: string
  title: string
  category: string
  description: string
  keyServices: string[]
  applications: string[]
  industries?: string[]
  highlight?: string
}

export type CollaborationArea = {
  icon: CollaborationIconKey
  title: string
  description: string
}

const expertiseAreasBase: ExpertiseArea[] = [
  {
    id: "spatial-epidemiology",
    title: "Disease Mapping & Spatial Epidemiology",
    category: "Public Health Analytics",
    description: "Advanced spatial analysis of disease patterns, outbreak investigation, and epidemiological modeling using cutting-edge GIS technologies and statistical methods.",
    keyServices: [
      "Disease clustering and hotspot analysis",
      "Risk factor mapping and environmental correlation",
      "Temporal-spatial modeling of disease transmission",
      "Public health surveillance system design",
    ],
    applications: [
      "COVID-19 transmission modeling",
      "Vector-borne disease prediction",
      "Healthcare accessibility analysis",
    ],
    industries: ["Health Departments", "WHO/PAHO", "Research Institutions"],
    highlight: "Expertise in modeling complex disease dynamics across multiple scales",
  },
  {
    id: "data-analytics-visualization",
    title: "Data Analytics & Visualization",
    category: "Data Science",
    description: "Advanced data analytics and visualization services that transform complex datasets into actionable insights through statistical analysis, machine learning, and interactive visualization techniques.",
    keyServices: [
      "Statistical modeling and predictive analytics",
      "Interactive dashboard development",
      "Data mining and pattern recognition",
      "Custom visualization design and implementation",
    ],
    applications: [
      "Public health surveillance dashboards",
      "Real-time epidemiological monitoring",
      "Spatial data storytelling and communication",
    ],
    industries: ["Healthcare Organizations", "Research Institutions", "Government Agencies"],
    highlight: "Transforming complex data into compelling visual narratives",
  },
  {
    id: "gis-modeling",
    title: "Advanced GIS Modeling & Spatial Analytics",
    category: "Geospatial Technology",
    description: "Sophisticated spatial modeling and analysis services leveraging state-of-the-art GIS technologies, remote sensing, and statistical approaches for complex problem-solving.",
    keyServices: [
      "Custom spatial model development",
      "Multi-criteria decision analysis",
      "Spatial optimization and scenario planning",
      "Remote sensing and image analysis",
    ],
    applications: [
      "Urban planning and smart city initiatives",
      "Natural resource management",
      "Climate impact modeling",
    ],
    industries: ["Urban Planning", "Natural Resources", "Technology Sector"],
    highlight: "Transforming complex spatial problems into actionable insights",
  },
]

const collaborationAreasBase: CollaborationArea[] = [
  {
    icon: "microscope",
    title: "Research Design",
    description: "Study design and methodology for spatial health and ecological research",
  },
  {
    icon: "globe",
    title: "International Projects",
    description: "Cross-border collaboration and global health initiatives",
  },
  {
    icon: "graduationCap",
    title: "Capacity Building",
    description: "Training programs and institutional development",
  },
  {
    icon: "building",
    title: "Policy Analysis",
    description: "Evidence-based policy recommendations and impact assessment",
  },
]

export const expertiseAreas = contentOverrides.expertiseAreas ?? expertiseAreasBase
export const collaborationAreas = contentOverrides.collaborationAreas ?? collaborationAreasBase
