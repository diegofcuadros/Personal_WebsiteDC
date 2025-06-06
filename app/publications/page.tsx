"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Link as LinkIcon, Search, Tag, PresentationIcon, Microscope, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

// Real publications data for Dr. Diego F. Cuadros organized by research categories
const allPublications = [
  // 1. HIV Hotspots
  {
    title: "Mapping HIV clustering: a strategy for identifying populations at high risk of HIV infection in sub-Saharan Africa",
    authors: "Cuadros D.F., Awad S.F., Abu-Raddad L.J.",
    journal: "International Journal of Health Geographics",
    year: 2013,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Hotspots"],
    imageUrl: "/Images/Publications/publication-1.png",
  },
  {
    title: "Spatial variability in HIV prevalence declines in several countries in sub-Saharan Africa",
    authors: "Cuadros D.F., Abu-Raddad L.J.",
    journal: "Health & Place",
    year: 2014,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Hotspots"],
    imageUrl: "/Images/Publications/publication-2.png",
  },
  {
    title: "Geographical patterns of HIV sero-discordancy in high HIV prevalence countries in sub-Saharan Africa",
    authors: "Cuadros D.F., Abu-Raddad L.J.",
    journal: "International Journal of Environmental Research and Public Health",
    year: 2016,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Hotspots"],
    imageUrl: "/Images/Publications/publication-3.png",
  },
  {
    title: "Temporal stability of HIV prevalence in high-burden areas regardless of declines in national HIV prevalence in Malawi and Zimbabwe",
    authors: "Cuadros D.F., Branscum A.J., Mukandavire Z.",
    journal: "AIDS",
    year: 2018,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Hotspots"],
    imageUrl: "/Images/Publications/publication-4.png",
  },
  {
    title: "Beyond HIV prevalence: identifying people living with HIV within underserved areas in South Africa",
    authors: "Kim H., Tanser F., Tomita A., Vandormael A., Cuadros D.F.",
    journal: "BMJ Global Health",
    year: 2021,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Hotspots"],
    imageUrl: "/Images/Publications/publication-5.png",
  },
  {
    title: "The role of high-risk geographies in the perpetuation of the HIV epidemic in rural South Africa: a spatial molecular epidemiology study",
    authors: "Cuadros D.F., de Oliveira T., Gräf T., Junqueira D.M., et al.",
    journal: "PLOS Global Public Health",
    year: 2022,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Hotspots"],
    imageUrl: "/Images/Publications/publication-6.png",
  },

  // 2. HIV Care Access
  {
    title: "Geospatial patterns of progress towards UNAIDS '95-95-95' targets and community vulnerability in Zambia",
    authors: "Cuadros D.F., Chowdhury M.D.T., Milali M., et al.",
    journal: "BMJ Global Health",
    year: 2023,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Care Access"],
    imageUrl: "/Images/Publications/publication-7.png",
  },
  {
    title: "Assessing regional variations and sociodemographic barriers in the progress toward UNAIDS 95-95-95 targets in Zimbabwe",
    authors: "Chowdhury M.D.T., Bershteyn A., Milali M., Citron D.T., Nyimbili S., Musuka G., Cuadros D.F.",
    journal: "Communications Medicine",
    year: 2025,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Care Access"],
    imageUrl: "/Images/Publications/publication-8.png",
  },
  {
    title: "District-level treatment cascade bottlenecks towards UNAIDS HIV 95-95-95 targets",
    authors: "Cuadros D.F., et al.",
    journal: "Lancet HIV",
    year: 2024,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Care Access"],
    imageUrl: "/Images/Publications/publication-9.png",
  },
  {
    title: "Travel time to antiretroviral therapy facilities and gaps in service accessibility in sub-Saharan Africa",
    authors: "Kim H., Cuadros D.F., et al.",
    journal: "PLOS Global Public Health",
    year: 2021,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Care Access"],
    imageUrl: "/Images/Publications/publication-10.png",
  },

  // 3. HIV Co-infections
  {
    title: "From individuals to populations: Immunological and epidemiological significance of co-infection in the dynamics of HIV",
    authors: "Cuadros D.F., Abu-Raddad L.J.",
    journal: "Journal of Clinical & Cellular Immunology",
    year: 2012,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/Publications/publication-11.png",
  },
  {
    title: "Association between HCV infection and diabetes type 2 in Egypt: is it time to split up?",
    authors: "Cuadros D.F., Miller F.D., Nagelkerke N., Abu-Raddad L.J.",
    journal: "Annals of Epidemiology",
    year: 2015,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/Publications/publication-12.png",
  },
  {
    title: "Convergence of HIV and non-communicable disease epidemics: geospatial mapping of the unmet health needs in an HIV hyperendemic community in South Africa",
    authors: "Cuadros D.F., Devi C., Singh U., et al.",
    journal: "BMJ Global Health",
    year: 2024,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/Publications/publication-13.png",
  },
  {
    title: "Spatial synergy between malaria endemicity and HIV prevalence in East Africa",
    authors: "Cuadros D.F., et al.",
    journal: "International Journal of Epidemiology",
    year: 2011,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/Publications/publication-14.png",
  },
  {
    title: "Lack of association between malaria transmission and HIV prevalence in West Africa",
    authors: "Cuadros D.F., et al.",
    journal: "PLOS ONE",
    year: 2011,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/Publications/publication-15.png",
  },
  {
    title: "Transmission model analysis of heterosexual HIV epidemic sensitivity to condom use and ART scale-up",
    authors: "Cuadros D.F., et al.",
    journal: "BMC Infectious Diseases",
    year: 2011,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/Publications/publication-16.png",
  },
  {
    title: "Viral load perturbations in HIV during malaria co-infection: a mathematical modeling study",
    authors: "Cuadros D.F., García-Ramos G.",
    journal: "Theoretical Biology and Medical Modelling",
    year: 2012,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/Publications/publication-17.png",
  },
  {
    title: "Spatial overlap of intimate partner violence, HIV, and poverty in South Africa",
    authors: "Tomita A., Cuadros D.F., Gibbs A.",
    journal: "Scientific Reports",
    year: 2022,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/Publications/publication-18.png",
  },
  {
    title: "Convergence of HIV and hypertension burdens: geospatial patterns in sub-Saharan Africa",
    authors: "Cuadros D.F., et al.",
    journal: "Journal of Multimorbidity and Comorbidity",
    year: 2023,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/Publications/publication-19.png",
  },

  // 4. Male Circumcision
  {
    title: "Are geographical 'cold spots' of male circumcision driving differential HIV dynamics in Tanzania?",
    authors: "Cuadros D.F., Branscum A.J., Miller F.D., Awad S.F., Abu-Raddad L.J.",
    journal: "Frontiers in Public Health",
    year: 2015,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Male Circumcision"],
    imageUrl: "/Images/Publications/publication-20.png",
  },
  {
    title: "Spatial gaps in voluntary medical male circumcision service coverage in Tanzania",
    authors: "Kim H., Cuadros D.F., et al.",
    journal: "BMJ Global Health",
    year: 2019,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Male Circumcision"],
    imageUrl: "/Images/Publications/publication-21.png",
  },

  // 5. COVID-19 Transmission
  {
    title: "Quantifying early COVID-19 outbreak transmission in South Africa and exploring vaccine efficacy scenarios",
    authors: "Mukandavire Z., Nyabadza F., Malunguza N.J., Cuadros D.F., et al.",
    journal: "PLOS ONE",
    year: 2020,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Transmission"],
    imageUrl: "/Images/Publications/publication-22.png",
  },
  {
    title: "On the impact of early non-pharmaceutical interventions as containment strategies against the COVID-19 pandemic",
    authors: "Hernández A., Correa-Agudelo E., Kim H., Branscum A.J., Miller F.D., MacKinnon N.J., Cuadros D.F.",
    journal: "medRxiv (Preprint)",
    year: 2020,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Transmission"],
    imageUrl: "/Images/Publications/publication-23.png",
  },
  {
    title: "Dynamics of the COVID-19 epidemic in urban and rural areas in the United States",
    authors: "Cuadros D.F., Branscum A.J., Mukandavire Z., Miller F.D., MacKinnon N.J.",
    journal: "Annals of Epidemiology",
    year: 2021,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Transmission"],
    imageUrl: "/Images/Publications/publication-24.png",
  },
  {
    title: "Spatial analysis of COVID-19 burden trajectories in Ohio",
    authors: "Cuadros D.F., Devi C., MacKinnon N.",
    journal: "Using Spatial Epidemiology to Better Understand COVID in Ohio (Book Chapter)",
    year: 2023,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Transmission"],
    imageUrl: "/Images/Publications/publication-25.png",
  },

  // 6. COVID-19 Vaccination
  {
    title: "Racial and ethnic disparities in geographic access to COVID-19 vaccination sites in the United States",
    authors: "Kim H., Ali Y., Cuadros D.F., MacKinnon N.",
    journal: "Preventive Medicine",
    year: 2022,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Vaccination"],
    imageUrl: "/Images/Publications/publication-26.png",
  },
  {
    title: "Assessing the spatial patterns of COVID-19 incidence and deaths and the distribution of vaccination sites",
    authors: "Kim H., Cuadros D.F., et al.",
    journal: "Health Affairs",
    year: 2022,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Vaccination"],
    imageUrl: "/Images/Publications/publication-27.png",
  },
  {
    title: "Rapid deployment of mobile COVID-19 testing and vaccine distribution sites: lessons learned from community partnerships",
    authors: "Cuadros D.F., et al.",
    journal: "Frontiers in Public Health",
    year: 2022,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Vaccination"],
    imageUrl: "/Images/Publications/publication-28.png",
  },
  {
    title: "Exploring the role of individual and county-level factors on COVID-19 vaccination behavior in the United States",
    authors: "Kim H., MacKinnon N., Cuadros D.F.",
    journal: "Vaccine",
    year: 2023,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Vaccination"],
    imageUrl: "/Images/Publications/publication-29.png",
  },

  // 7. COVID-19 Capacity
  {
    title: "Spatial inequity in the distribution of COVID-19 medical and transportation resources in the US",
    authors: "Kim H., Cuadros D.F., MacKinnon N.",
    journal: "PLOS Global Public Health",
    year: 2022,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Capacity"],
    imageUrl: "/Images/Publications/publication-30.png",
  },
  {
    title: "Understanding the spatial distribution of severe COVID-19 outcomes to inform hospital capacity planning",
    authors: "Cuadros D.F., Devi C., MacKinnon N.",
    journal: "International Journal of Environmental Research and Public Health",
    year: 2021,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Capacity"],
    imageUrl: "/Images/Publications/publication-31.png",
  },
  {
    title: "Mapping the burden of COVID-19 hospitalizations by healthcare region to guide decision making",
    authors: "Kim H., Cuadros D.F., Ali Y., MacKinnon N.",
    journal: "BMC Health Services Research",
    year: 2022,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Capacity"],
    imageUrl: "/Images/Publications/publication-32.png",
  },

  // 8. Spatial Methods
  {
    title: "Spatiotemporal mapping of global health funding for HIV: a modelling approach to estimate resource allocation",
    authors: "Cuadros D.F., et al.",
    journal: "Lancet Global Health",
    year: 2019,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Spatial Methods"],
    imageUrl: "/Images/Publications/publication-33.png",
  },
  {
    title: "Mapping the global reach of machine learning for health-related content in academic literature",
    authors: "Kim H., Cuadros D.F., MacKinnon N.",
    journal: "JAMIA Open",
    year: 2022,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Spatial Methods"],
    imageUrl: "/Images/Publications/publication-34.png",
  },
  {
    title: "GeoAI for public health surveillance and epidemic intelligence: a review",
    authors: "Cuadros D.F., Li J., Mukandavire Z., et al.",
    journal: "Annals of GIS",
    year: 2023,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Spatial Methods"],
    imageUrl: "/Images/Publications/publication-35.png",
  },
  {
    title: "Spatially varying network vulnerability in a complex transportation system: evidence from Cincinnati",
    authors: "Cuadros D.F., et al.",
    journal: "Journal of Transport Geography",
    year: 2020,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Spatial Methods"],
    imageUrl: "/Images/Publications/publication-36.png",
  },

  // 9. Hepatitis
  {
    title: "Geographic characteristics of hepatitis C and HIV co-infection in the United States",
    authors: "Cuadros D.F., et al.",
    journal: "AIDS Research and Human Retroviruses",
    year: 2016,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Hepatitis"],
    imageUrl: "/Images/Publications/publication-37.png",
  },
  {
    title: "Mapping the burden of hepatitis C virus infection in Egypt",
    authors: "Cuadros D.F., et al.",
    journal: "BMC Infectious Diseases",
    year: 2014,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Hepatitis"],
    imageUrl: "/Images/Publications/publication-38.png",
  },

  // 10. Substance Use
  {
    title: "Drug use and spatial patterns of overdose mortality in Cincinnati, Ohio: analysis of neighborhood vulnerability",
    authors: "Cuadros D.F., et al.",
    journal: "Drug and Alcohol Dependence",
    year: 2020,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Substance Use"],
    imageUrl: "/Images/Publications/publication-39.png",
  },
  {
    title: "Spatially targeted interventions to address drug use and overdose: insights from geographic analysis in Cincinnati",
    authors: "Cuadros D.F., et al.",
    journal: "PLOS ONE",
    year: 2021,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Substance Use"],
    imageUrl: "/Images/Publications/publication-40.png",
  },
  {
    title: "Network analysis of drug trafficking organizations: implications for law enforcement strategies",
    authors: "Cuadros D.F., et al.",
    journal: "Global Crime",
    year: 2019,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Substance Use"],
    imageUrl: "/Images/Publications/publication-41.png",
  },
  {
    title: "Examining the geospatial patterns of opioid overdoses using machine learning: a Cincinnati case study",
    authors: "Kim H., Cuadros D.F., et al.",
    journal: "Journal of Medical Internet Research",
    year: 2022,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Substance Use"],
    imageUrl: "/Images/Publications/publication-42.png",
  },
]

const uniqueTags = ["All Topics", ...Array.from(new Set(allPublications.flatMap(pub => pub.tags)))]

const featuredPresentations = [
  {
    year: 2024,
    title: "Evolution of HIV Transmission Networks in Rural South Africa, 25th International AIDS Conference",
  },
  { year: 2023, title: "Progress Toward UNAIDS 95-95-95 Targets in Zimbabwe, ICASA 2023" },
  { year: 2022, title: "Collision of HIV and NCD Epidemics, 24th International AIDS Conference" },
  { year: 2018, title: "Geographical HIV Hotspots and Epidemic Spread, CROI" },
  { year: 2017, title: "The HIV Epidemic in SSA: From Social Networks to Maps, Disease Modeling Symposium" },
]

const ongoingProjects = [
  {
    title: "Changing Face of HIV Epidemic",
    funder: "NIH",
    period: "2023–2027",
    role: "Co-I",
    amount: "$388k",
    description: "Investigating the spatial evolution of HIV risk in marginalized populations.",
  },
  {
    title: "Precision Public Health RTRI",
    funder: "NIH",
    period: "2023–2027",
    role: "Co-I",
    amount: "$270k",
    description: "AI-driven dashboards for real-time epidemiological tracking in urban settings.",
  },
]

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("All Topics")

  const filteredPublications = useMemo(() => {
    return allPublications.filter(pub => {
      const matchesSearch = 
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.journal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesTag = selectedTag === "All Topics" || pub.tags.includes(selectedTag)
      
      return matchesSearch && matchesTag
    })
  }, [searchQuery, selectedTag])

  return (
    <div className="min-h-screen bg-site-white dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-sans bg-clip-text text-transparent bg-gradient-to-r from-deep-navy via-teal to-vibrant-gold dark:from-slate-100 dark:via-teal-400 dark:to-yellow-400 mb-4">
            Research Publications
          </h1>
          <p className="text-lg font-serif text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            A comprehensive collection of peer-reviewed research spanning global health epidemiology, spatial analytics, and public health interventions.
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search by title, author, or journal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-sans bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-sans">
              <Tag className="h-4 w-4" />
              <span className="text-sm font-medium">Filter by topic:</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {uniqueTags.map(tag => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className={`font-sans text-xs transition-all duration-200 ${
                  selectedTag === tag
                    ? "bg-teal-600 hover:bg-teal-700 text-white dark:bg-teal-500 dark:hover:bg-teal-600"
                    : "text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-teal-50 dark:hover:bg-slate-800"
                }`}
              >
                {tag}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-6 text-center"
        >
          <p className="text-slate-600 dark:text-slate-400 font-sans">
            Selected publications, for a full list of publications please visit my{" "}
            <a 
              href="https://scholar.google.com/citations?user=zMoJ8n4AAAAJ&hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold underline transition-colors"
            >
              Google Scholar
            </a>
          </p>
        </motion.div>

        {/* Publications List */}
        <motion.div layout className="space-y-6 max-w-6xl mx-auto">
          <AnimatePresence>
            {filteredPublications.map((pub, index) => (
              <motion.div
                key={pub.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="w-full"
              >
                <Card className="h-full flex flex-col md:flex-row items-center overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-xl dark:hover:shadow-2xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg shadow-md">
                  <div className="w-full md:w-1/3 h-64 md:h-48 relative overflow-hidden">
                    <Image
                      src={pub.imageUrl}
                      alt={pub.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  <div className="w-full md:w-2/3 p-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {pub.tags.map(tag => (
                          <Badge 
                            key={tag} 
                            variant="secondary" 
                            className="font-sans text-xs bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 border-0"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-xl font-bold font-sans text-slate-900 dark:text-slate-100 mb-3 leading-tight hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                        {pub.title}
                      </CardTitle>
                      <CardDescription className="text-sm font-serif text-slate-700 dark:text-slate-300 mb-2 leading-relaxed">
                        {pub.authors} ({pub.year})
                      </CardDescription>
                      <div className="text-sm font-serif italic text-slate-600 dark:text-slate-400 mb-4">
                        {pub.journal}
                      </div>
                    </div>
                    <div className="flex items-center justify-end mt-auto pt-2">
                      <Button 
                        asChild 
                        variant="link" 
                        className="px-0 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold font-sans flex-shrink-0"
                      >
                        <a href={pub.links[0].href} target="_blank" rel="noopener noreferrer">
                          Read Paper <LinkIcon className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No results message */}
        {filteredPublications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="h-16 w-16 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold font-sans text-slate-900 dark:text-slate-100 mb-2">No publications found</h3>
            <p className="text-slate-600 dark:text-slate-400 font-serif">
              Try adjusting your search terms or filter criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

