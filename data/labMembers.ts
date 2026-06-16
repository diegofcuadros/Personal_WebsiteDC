import { contentOverrides } from "./contentOverrides"

export type LabSectionIconKey = "graduationCap" | "users" | "award" | "bookOpen"

export type Student = {
  name: string
  period: string
  department?: string
  university?: string
  researchInterests?: string
  dissertation?: string
  thesis?: string
  focus?: string
  status?: string
}

export type LabSection = {
  id: string
  title: string
  icon: LabSectionIconKey
  students: Student[]
  color: string
  description?: string
}

const labDataBase: LabSection[] = [
  {
    id: "current-phd-advisees",
    title: "Current PhD Advisees",
    icon: "graduationCap",
    color: "bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900",
    description: "Doctoral students under direct supervision",
    students: [
      {
        name: "Tuhin Chowdhury",
        period: "2023-present",
        department: "Department of Geography",
        university: "University of Cincinnati",
        researchInterests: "Spatial epidemiology, GIS applications in public health",
      },
      {
        name: "Joseph Katenkamp",
        period: "2023-present",
        department: "Department of Geography",
        university: "University of Cincinnati",
        focus: "Doctoral research in geography and public health analytics",
      },
      {
        name: "Tolulope Adedoyin",
        period: "2024-present",
        department: "Department of Geography",
        university: "University of Cincinnati",
        researchInterests: "Health geography, spatial epidemiology, disease ecology, and modeling",
      },
      {
        name: "Tahmina Younos",
        period: "2025-present",
        department: "Department of Geography",
        university: "University of Cincinnati",
        focus: "Doctoral research in geography and public health analytics",
      },
      {
        name: "Weiye Li",
        period: "2025-present",
        department: "Department of Geography",
        university: "University of Cincinnati",
        focus: "Doctoral research in geography and public health analytics",
      },
    ],
  },
  {
    id: "current-ma-advisees",
    title: "Current MA Advisees",
    icon: "bookOpen",
    color: "bg-gradient-to-r from-stone-600 via-stone-700 to-stone-800",
    description: "Master's students under direct supervision",
    students: [
      {
        name: "Vivian Nakate",
        period: "2025-present",
        department: "Department of Geography",
        university: "University of Cincinnati",
        focus: "Master's research in geography and public health analytics",
      },
    ],
  },
  {
    id: "former-phd-advisees",
    title: "Former PhD Advisees",
    icon: "award",
    color: "bg-gradient-to-r from-zinc-600 via-zinc-700 to-zinc-800",
    description: "Successfully graduated doctoral students",
    students: [
      {
        name: "Andres Hernandez",
        period: "2017-2020",
        department: "Department of Geography",
        university: "University of Cincinnati",
        dissertation: "Spatial Modeling of the Social Health Determinants Impact on the Epidemiology of Diseases in Low-, Middle-, and High-income Settings.",
      },
      {
        name: "Hana Kim",
        period: "2017-2020",
        department: "Department of Geography",
        university: "University of Cincinnati",
        dissertation: "Spatial Surveillance of Infectious Disease Intervention with Related Factors for a Population Living in Underserved Areas.",
      },
      {
        name: "Esteban Correa",
        period: "2018-2021",
        department: "Department of Geography",
        university: "University of Cincinnati",
        dissertation: "Medical Geography in Vulnerable Groups.",
      },
    ],
  },
  {
    id: "former-ma-advisees",
    title: "Former MA Advisees",
    icon: "bookOpen",
    color: "bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800",
    description: "Successfully graduated master's students",
    students: [
      {
        name: "Tuhin Chowdhury",
        period: "2021-2023",
        department: "Department of Geography",
        university: "University of Cincinnati",
      },
      {
        name: "Santiago Escobar",
        period: "2022-2024",
        department: "Department of Geography",
        university: "University of Cincinnati",
        thesis: "Mapping the Waves: Spatiotemporal Dynamics and Disparities in Substance Use Disorder Mortality Across the United States.",
      },
      {
        name: "Chayanika Devi",
        period: "2022-2024",
        department: "Department of Geography",
        university: "University of Cincinnati",
        thesis: "Understanding Spatio-temporal Patterns of COVID-19 in the United States.",
      },
    ],
  },
  {
    id: "former-phd-committee",
    title: "Former PhD Committee Members",
    icon: "users",
    color: "bg-gradient-to-r from-neutral-600 via-neutral-700 to-neutral-800",
    description: "Previously served on dissertation committees",
    students: [
      {
        name: "Jingjing Li",
        period: "2017-2020",
        department: "Department of Geography",
        university: "University of Cincinnati",
        dissertation: "Information not publicly available",
      },
      {
        name: "Minxuan Lan",
        period: "2017-2020",
        department: "Department of Geography",
        university: "University of Cincinnati",
        dissertation: "Information not publicly available",
      },
      {
        name: "Zahra Almarhoon",
        period: "2018-2020",
        department: "James L. Winkle College of Pharmacy",
        university: "University of Cincinnati",
      },
      {
        name: "Mohammed Alsultan",
        period: "2020-2022",
        department: "James L. Winkle College of Pharmacy",
        university: "University of Cincinnati",
        dissertation: "Information not publicly available",
      },
    ],
  },
  {
    id: "former-ma-committee",
    title: "Former MA Committee Members",
    icon: "bookOpen",
    color: "bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800",
    description: "Previously served on master's thesis committees",
    students: [
      {
        name: "Yang Liu",
        period: "2017-2018",
        department: "Department of Geography",
        university: "University of Cincinnati",
      },
    ],
  },
]

export const labData = contentOverrides.labData ?? labDataBase
