import { contentOverrides } from "./contentOverrides"

export type ContactIconKey = "mail" | "mapPin" | "building" | "linkedin" | "bookUser"

export type ContactDetail = {
  icon: ContactIconKey
  label: string
  value: string | string[]
  href?: string
}

const contactDetailsBase: ContactDetail[] = [
  {
    icon: "mail",
    label: "Email",
    value: "diego.cuadros@uc.edu",
    href: "mailto:diego.cuadros@uc.edu",
  },
  {
    icon: "mapPin",
    label: "Address",
    value: [
      "Digital Epidemiology Laboratory, Digital Futures",
      "Department of Biological Sciences",
      "University of Cincinnati",
      "3080 Exploration Ave.",
      "Cincinnati, OH, 45206",
    ],
  },
  {
    icon: "building",
    label: "Lab Website",
    value: "Digital Epidemiology Lab",
    href: "https://ucdigitalfutures.com/digital-epidemiology-lab/",
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    value: "Diego F. Cuadros",
    href: "https://www.linkedin.com/in/diego-f-cuadros-71544a45/",
  },
  {
    icon: "bookUser",
    label: "ResearchGate",
    value: "Diego Cuadros Profile",
    href: "https://www.researchgate.net/profile/Diego-Cuadros?ev=hdr_xprf",
  },
]

export const contactDetails = contentOverrides.contactDetails ?? contactDetailsBase
