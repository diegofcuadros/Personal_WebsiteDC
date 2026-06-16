import { contentOverrides } from "./contentOverrides"

export type GrantStatus = "Active" | "Completed"

export type Grant = {
  title: string
  funder: string
  role: string
  period: string
  amount: string
  status: GrantStatus
  impact: string
}

const grantsBase: Grant[] = [
  {
    title: "The Changing Face of the HIV Epidemic in Hyperendemic Rural KwaZulu-Natal, South Africa",
    funder: "National Institutes of Health",
    role: "Co-Investigator",
    period: "2023-2027",
    amount: "$388,000",
    status: "Active",
    impact: "Studies the spatial evolution of HIV risk, transmission patterns, and intervention opportunities in rural South Africa.",
  },
  {
    title: "Rapid Test for Recent Infection (RTRI) for Precision Public Health in Sub-Saharan Africa",
    funder: "National Institutes of Health",
    role: "Co-Investigator",
    period: "2023-2027",
    amount: "$269,923",
    status: "Active",
    impact: "Uses recent-infection testing, geospatial analysis, and changing HIV epidemiology to support next-generation precision public health strategies.",
  },
  {
    title: "Can Mental Health Services Break the Cycle Perpetuating HIV Hotspots in Sub-Saharan Africa?",
    funder: "National Institutes of Health",
    role: "Co-Investigator",
    period: "2021-2026",
    amount: "$200,000",
    status: "Active",
    impact: "Examines whether integrated mental health services can interrupt persistent HIV hotspot dynamics and co-occurring health burdens.",
  },
  {
    title: "Drone Transport to Improve the Care Cascade for HIV-Exposed Newborns and Children in Guinea",
    funder: "ANRS - Emerging Infectious Diseases",
    role: "Co-Investigator",
    period: "2025-2027",
    amount: "Not disclosed",
    status: "Active",
    impact: "Evaluates drone-supported transport as a strategy to strengthen timely care for newborns and children exposed to HIV.",
  },
  {
    title: "Multilevel and Spatial Determinants of Multimorbidity and Optimal Co-Care Delivery Model in South Africa",
    funder: "National Institutes of Health",
    role: "Co-Investigator",
    period: "2020-2023",
    amount: "$68,000",
    status: "Completed",
    impact: "Mapped multimorbidity and unmet health needs to inform integrated service delivery in HIV-endemic communities.",
  },
  {
    title: "Genomics and Geospatial Analyses of Childhood Asthma Racial Disparities",
    funder: "Cincinnati Children's Hospital",
    role: "Co-Principal Investigator",
    period: "2020-2021",
    amount: "$16,500",
    status: "Completed",
    impact: "Integrated genomic and geospatial analysis to study racial disparities in childhood asthma.",
  },
  {
    title: "Critical Assessment of the Drivers of the Hepatitis C Virus Epidemic in Egypt",
    funder: "Qatar National Research Fund",
    role: "Principal Investigator",
    period: "2013-2016",
    amount: "$298,820",
    status: "Completed",
    impact: "Used quantitative and spatial epidemiology to identify drivers of the hepatitis C epidemic in Egypt.",
  },
  {
    title: "Naloxone Access and Impact Evaluation",
    funder: "Ohio Department of Health",
    role: "Co-Investigator",
    period: "2018",
    amount: "$74,957",
    status: "Completed",
    impact: "Evaluated naloxone access and spatial barriers in community overdose prevention networks.",
  },
]

export const grants = contentOverrides.grants ?? grantsBase
