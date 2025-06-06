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
    imageUrl: "/Images/publications/publication-1.png",
  },
  {
    title: "Spatial variability in HIV prevalence declines in several countries in sub-Saharan Africa",
    authors: "Cuadros D.F., Abu-Raddad L.J.",
    journal: "Health & Place",
    year: 2014,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Hotspots"],
    imageUrl: "/Images/publications/publication-2.png",
  },
  {
    title: "Geographical patterns of HIV sero-discordancy in high HIV prevalence countries in sub-Saharan Africa",
    authors: "Cuadros D.F., Abu-Raddad L.J.",
    journal: "International Journal of Environmental Research and Public Health",
    year: 2016,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Hotspots"],
    imageUrl: "/Images/publications/publication-3.png",
  },
  {
    title: "Temporal stability of HIV prevalence in high-burden areas regardless of declines in national HIV prevalence in Malawi and Zimbabwe",
    authors: "Cuadros D.F., Branscum A.J., Mukandavire Z.",
    journal: "AIDS",
    year: 2018,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Hotspots"],
    imageUrl: "/Images/publications/publication-4.png",
  },
  {
    title: "Beyond HIV prevalence: identifying people living with HIV within underserved areas in South Africa",
    authors: "Kim H., Tanser F., Tomita A., Vandormael A., Cuadros D.F.",
    journal: "BMJ Global Health",
    year: 2021,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Hotspots"],
    imageUrl: "/Images/publications/publication-5.png",
  },
  {
    title: "The role of high-risk geographies in the perpetuation of the HIV epidemic in rural South Africa: a spatial molecular epidemiology study",
    authors: "Cuadros D.F., de Oliveira T., Gräf T., Junqueira D.M., et al.",
    journal: "PLOS Global Public Health",
    year: 2022,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Hotspots"],
    imageUrl: "/Images/publications/publication-6.png",
  },

  // 2. HIV Care Access
  {
    title: "Geospatial patterns of progress towards UNAIDS '95-95-95' targets and community vulnerability in Zambia",
    authors: "Cuadros D.F., Chowdhury M.D.T., Milali M., et al.",
    journal: "BMJ Global Health",
    year: 2023,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Care Access"],
    imageUrl: "/Images/publications/publication-7.png",
  },
  {
    title: "Assessing regional variations and sociodemographic barriers in the progress toward UNAIDS 95-95-95 targets in Zimbabwe",
    authors: "Chowdhury M.D.T., Bershteyn A., Milali M., Citron D.T., Nyimbili S., Musuka G., Cuadros D.F.",
    journal: "Communications Medicine",
    year: 2025,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Care Access"],
    imageUrl: "/Images/publications/publication-8.png",
  },
  {
    title: "District-level treatment cascade bottlenecks towards UNAIDS HIV 95-95-95 targets",
    authors: "Cuadros D.F., et al.",
    journal: "Lancet HIV",
    year: 2024,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Care Access"],
    imageUrl: "/Images/publications/publication-9.png",
  },
  {
    title: "Travel time to antiretroviral therapy facilities and gaps in service accessibility in sub-Saharan Africa",
    authors: "Kim H., Cuadros D.F., et al.",
    journal: "PLOS Global Public Health",
    year: 2021,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Care Access"],
    imageUrl: "/Images/publications/publication-10.png",
  },

  // 3. HIV Co-infections
  {
    title: "From individuals to populations: Immunological and epidemiological significance of co-infection in the dynamics of HIV",
    authors: "Cuadros D.F., Abu-Raddad L.J.",
    journal: "Journal of Clinical & Cellular Immunology",
    year: 2012,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/publications/publication-11.png",
  },
  {
    title: "Association between HCV infection and diabetes type 2 in Egypt: is it time to split up?",
    authors: "Cuadros D.F., Miller F.D., Nagelkerke N., Abu-Raddad L.J.",
    journal: "Annals of Epidemiology",
    year: 2015,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/publications/publication-12.png",
  },
  {
    title: "Convergence of HIV and non-communicable disease epidemics: geospatial mapping of the unmet health needs in an HIV hyperendemic community in South Africa",
    authors: "Cuadros D.F., Devi C., Singh U., et al.",
    journal: "BMJ Global Health",
    year: 2024,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/publications/publication-13.png",
  },
  {
    title: "Spatial synergy between malaria endemicity and HIV prevalence in East Africa",
    authors: "Cuadros D.F., et al.",
    journal: "International Journal of Epidemiology",
    year: 2011,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/publications/publication-14.png",
  },
  {
    title: "Lack of association between malaria transmission and HIV prevalence in West Africa",
    authors: "Cuadros D.F., et al.",
    journal: "PLOS ONE",
    year: 2011,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/publications/publication-15.png",
  },
  {
    title: "Transmission model analysis of heterosexual HIV epidemic sensitivity to condom use and ART scale-up",
    authors: "Cuadros D.F., et al.",
    journal: "BMC Infectious Diseases",
    year: 2011,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/publications/publication-16.png",
  },
  {
    title: "Viral load perturbations in HIV during malaria co-infection: a mathematical modeling study",
    authors: "Cuadros D.F., García-Ramos G.",
    journal: "Theoretical Biology and Medical Modelling",
    year: 2012,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/publications/publication-17.png",
  },
  {
    title: "Spatial overlap of intimate partner violence, HIV, and poverty in South Africa",
    authors: "Tomita A., Cuadros D.F., Gibbs A.",
    journal: "Scientific Reports",
    year: 2022,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/publications/publication-18.png",
  },
  {
    title: "Convergence of HIV and hypertension burdens: geospatial patterns in sub-Saharan Africa",
    authors: "Cuadros D.F., et al.",
    journal: "Journal of Multimorbidity and Comorbidity",
    year: 2023,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["HIV Co-infections"],
    imageUrl: "/Images/publications/publication-19.png",
  },

  // 4. Male Circumcision
  {
    title: "Are geographical 'cold spots' of male circumcision driving differential HIV dynamics in Tanzania?",
    authors: "Cuadros D.F., Branscum A.J., Miller F.D., Awad S.F., Abu-Raddad L.J.",
    journal: "Frontiers in Public Health",
    year: 2015,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Male Circumcision"],
    imageUrl: "/Images/publications/publication-20.png",
  },
  {
    title: "Spatial gaps in voluntary medical male circumcision service coverage in Tanzania",
    authors: "Kim H., Cuadros D.F., et al.",
    journal: "BMJ Global Health",
    year: 2019,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Male Circumcision"],
    imageUrl: "/Images/publications/publication-21.png",
  },

  // 5. COVID-19 Transmission
  {
    title: "Quantifying early COVID-19 outbreak transmission in South Africa and exploring vaccine efficacy scenarios",
    authors: "Mukandavire Z., Nyabadza F., Malunguza N.J., Cuadros D.F., et al.",
    journal: "PLOS ONE",
    year: 2020,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Transmission"],
    imageUrl: "/Images/publications/publication-22.png",
  },
  {
    title: "On the impact of early non-pharmaceutical interventions as containment strategies against the COVID-19 pandemic",
    authors: "Hernández A., Correa-Agudelo E., Kim H., Branscum A.J., Miller F.D., MacKinnon N.J., Cuadros D.F.",
    journal: "medRxiv (Preprint)",
    year: 2020,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Transmission"],
    imageUrl: "/Images/publications/publication-23.png",
  },
  {
    title: "Dynamics of the COVID-19 epidemic in urban and rural areas in the United States",
    authors: "Cuadros D.F., Branscum A.J., Mukandavire Z., Miller F.D., MacKinnon N.J.",
    journal: "Annals of Epidemiology",
    year: 2021,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Transmission"],
    imageUrl: "/Images/publications/publication-24.png",
  },
  {
    title: "Spatial analysis of COVID-19 burden trajectories in Ohio",
    authors: "Cuadros D.F., Devi C., MacKinnon N.",
    journal: "Using Spatial Epidemiology to Better Understand COVID in Ohio (Book Chapter)",
    year: 2023,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Transmission"],
    imageUrl: "/Images/publications/publication-25.png",
  },

  // 6. COVID-19 Vaccination
  {
    title: "Association between vaccination coverage disparity and the dynamics of the COVID-19 Delta and Omicron waves in the US",
    authors: "Cuadros D.F., Moreno C.M., Musuka G., et al.",
    journal: "Frontiers in Medicine",
    year: 2022,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Vaccination"],
    imageUrl: "/Images/publications/publication-26.png",
  },
  {
    title: "Mapping Structural Barriers: A Geospatial Assessment of COVID-19 Vaccine Inequities in Kenya",
    authors: "Niño L., Kiragga A., Miller F.D., Mwalili S.M., Musuka G., Cuadros D.F.",
    journal: "medRxiv (Preprint)",
    year: 2025,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Vaccination"],
    imageUrl: "/Images/publications/publication-27.png",
  },
  {
    title: "Healthcare capacity and COVID-19 vaccination rollout disparities across U.S. counties",
    authors: "Cuadros D.F., et al.",
    journal: "Lancet Regional Health – Americas",
    year: 2023,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Vaccination"],
    imageUrl: "/Images/publications/publication-28.png",
  },
  {
    title: "Vaccination coverage and COVID-19 incidence dynamics across US counties",
    authors: "Cuadros D.F., et al.",
    journal: "JAMA Network Open",
    year: 2022,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Vaccination"],
    imageUrl: "/Images/publications/publication-29.png",
  },

  // 7. COVID-19 Capacity
  {
    title: "Identification of vulnerable populations and areas at higher risk of COVID-19-related mortality during the early stage of the epidemic in the United States",
    authors: "Correa-Agudelo E., Mersha T.B., Hernández A., Branscum A.J., MacKinnon N.J., Cuadros D.F.",
    journal: "medRxiv (Preprint)",
    year: 2020,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Capacity"],
    imageUrl: "/Images/publications/publication-30.png",
  },
  {
    title: "Projected ICU surge demands during early COVID-19 hotspots in the United States",
    authors: "Cuadros D.F., et al.",
    journal: "Health & Place",
    year: 2020,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Capacity"],
    imageUrl: "/Images/publications/publication-31.png",
  },
  {
    title: "Testing gaps and mitigation strategies for COVID-19 in Zimbabwe",
    authors: "Dzinamarira T., Cuadros D.F., et al.",
    journal: "Clinical Infectious Diseases",
    year: 2021,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["COVID-19 Capacity"],
    imageUrl: "/Images/publications/publication-32.png",
  },

  // 8. Substance Use
  {
    title: "Narrative minireview of the spatial epidemiology of substance use disorder in the United States: Who is at risk and where?",
    authors: "Cuadros D.F., Branscum A.J., Moreno C.M., MacKinnon N.J.",
    journal: "World Journal of Clinical Cases",
    year: 2023,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Substance Use"],
    imageUrl: "/Images/publications/publication-33.png",
  },
  {
    title: "Spatiotemporal analysis of substance use disorder mortality in the United States: an observational study of emerging hotspots and vulnerable populations (2005–2020)",
    authors: "Escobar S., MacKinnon N.J., Ambade P., Hoffman Z., Cuadros D.F.",
    journal: "Lancet Regional Health – Americas",
    year: 2025,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Substance Use"],
    imageUrl: "/Images/publications/publication-34.png",
  },
  {
    title: "Shifting opioid overdose mortality hotspots in Ohio: a spatiotemporal analysis",
    authors: "Hernandez A., Cuadros D.F., et al.",
    journal: "Scientific Reports",
    year: 2020,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Substance Use"],
    imageUrl: "/Images/publications/publication-35.png",
  },
  {
    title: "Geospatial methods for substance use disorder surveillance in the United States: a mini-review",
    authors: "Cuadros D.F., et al.",
    journal: "World Journal of Clinical Cases",
    year: 2023,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Substance Use"],
    imageUrl: "/Images/publications/publication-36.png",
  },

  // 9. Hepatitis
  {
    title: "Spatial epidemiology of hepatitis C virus infection in Egypt: analyses and implications",
    authors: "Cuadros D.F., Branscum A.J., Miller F.D., Abu-Raddad L.J.",
    journal: "Hepatology",
    year: 2014,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Hepatitis"],
    imageUrl: "/Images/publications/publication-37.png",
  },
  {
    title: "Spatial heterogeneity of hepatitis B virus infection in Egypt and implications for vaccination",
    authors: "Ismail S.A., Cuadros D.F., Benova L.",
    journal: "Liver International",
    year: 2017,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Hepatitis"],
    imageUrl: "/Images/publications/publication-38.png",
  },

  // 10. Spatial Methods
  {
    title: "Spatial epidemiology of diabetes: Methods and insights",
    authors: "Cuadros D.F., Li J., Musuka G., Awad S.F.",
    journal: "World Journal of Diabetes",
    year: 2021,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Spatial Methods"],
    imageUrl: "/Images/publications/publication-39.png",
  },
  {
    title: "Geospatial assessment of the digital divide and telehealth readiness in the United States",
    authors: "Cuadros D.F., et al.",
    journal: "Mayo Clinic Proceedings: Digital Health",
    year: 2023,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Spatial Methods"],
    imageUrl: "/Images/publications/publication-40.png",
  },
  {
    title: "Wastewater-based epidemiology: spatial modeling and public health implications for SARS-CoV-2 and other enteric viruses",
    authors: "Cuadros D.F., et al.",
    journal: "Pathogens",
    year: 2024,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Spatial Methods"],
    imageUrl: "/Images/publications/publication-41.png",
  },
  {
    title: "Geo-spatial determinants of anaemia prevalence in sub-Saharan Africa",
    authors: "Correa-Agudelo E., Cuadros D.F., et al.",
    journal: "Scientific Reports",
    year: 2021,
    links: [{ label: "Read", href: "https://www.researchgate.net/profile/Diego-Cuadros/research" }],
    tags: ["Spatial Methods"],
    imageUrl: "/Images/publications/publication-42.png",
  },
]

const allTags = [...new Set(allPublications.flatMap(p => p.tags))].sort();

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPublications = useMemo(() => {
    return allPublications
      .filter(p => {
        const searchLower = searchTerm.toLowerCase();
        return (
          p.title.toLowerCase().includes(searchLower) ||
          p.authors.toLowerCase().includes(searchLower) ||
          p.journal.toLowerCase().includes(searchLower)
        );
      })
      .filter(p => {
        return selectedTag ? p.tags.includes(selectedTag) : true;
      })
      .sort((a, b) => b.year - a.year);
  }, [searchTerm, selectedTag]);

  return (
    <div className="bg-site-white dark:bg-deep-navy text-deep-navy dark:text-site-gray">
      <div className="container py-12 md:py-16 px-4 md:px-6">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans bg-clip-text text-transparent bg-gradient-to-r from-deep-navy via-teal to-vibrant-gold dark:from-site-white dark:via-teal dark:to-vibrant-gold">
            Publications
          </h1>
          <p className="font-serif text-lg md:text-xl leading-relaxed text-deep-navy/90 dark:text-site-gray/90 max-w-3xl mx-auto">
            Explore a curated list of my research. Use the filters below to search by keyword or browse by topic.
          </p>
        </header>

        {/* Filtering UI */}
        <div className="mb-12 sticky top-16 z-40 bg-background/80 backdrop-blur-md py-4 -mx-4 sm:-mx-6 px-4 sm:px-6">
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative mb-4 max-w-xl mx-auto">
              <Input
                type="text"
                placeholder="Search by title, author, or journal..."
                className="pl-10 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex flex-wrap gap-2 items-center justify-center">
              <Tag className="h-5 w-5 text-muted-foreground mr-2" />
              <Button
                variant={!selectedTag ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedTag(null)}
                className="rounded-full"
              >
                All Topics
              </Button>
              {allTags.map(tag => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className="rounded-full"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Publication List */}
        <motion.div layout className="space-y-6 max-w-4xl mx-auto">
          <AnimatePresence>
            {filteredPublications.map(pub => (
              <motion.div
                key={pub.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="card-gradient-border rounded-xl"
              >
                <div className="bg-white/80 dark:bg-deep-navy/40 backdrop-blur-sm rounded-xl h-full overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="md:col-span-1">
                      <Image
                        src={pub.imageUrl}
                        alt={`Visual representation of ${pub.title}`}
                        width={400}
                        height={300}
                        className="object-cover w-full h-48 md:h-full"
                      />
                    </div>
                    <div className="md:col-span-2 p-6 flex flex-col">
                      <h3 className="text-lg font-semibold font-sans text-teal dark:text-vibrant-gold mb-1">
                        {pub.title}
                      </h3>
                      <p className="text-sm font-serif text-deep-navy/90 dark:text-site-gray/90 mb-3">
                        {pub.authors} ({pub.year}). <strong>{pub.journal}</strong>.
                      </p>
                      <div className="flex-grow" />
                      <div className="flex items-center justify-between mt-auto pt-4">
                        <div className="flex flex-wrap gap-2">
                          {pub.tags.map(tag => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="cursor-pointer bg-teal/10 text-teal dark:bg-vibrant-gold/10 dark:text-vibrant-gold hover:bg-teal/20 dark:hover:bg-vibrant-gold/20"
                              onClick={() => setSelectedTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button asChild variant="link" className="px-0 text-teal dark:text-vibrant-gold font-semibold flex-shrink-0">
                          <a href={pub.links[0].href} target="_blank" rel="noopener noreferrer">
                            Read Paper <LinkIcon className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <section id="featured-presentations" className="my-16 md:my-24">
          <h2 className="text-3xl font-bold font-sans text-deep-navy dark:text-site-white mb-8 text-center flex items-center justify-center">
            <PresentationIcon className="mr-3 h-8 w-8 text-teal dark:text-vibrant-gold" /> Featured Presentations &
            Talks
          </h2>
          <div className="max-w-2xl mx-auto">
            <ul className="space-y-3">
              {featuredPresentations.map((talk, idx) => (
                <li
                  key={idx}
                  className="font-serif text-md text-deep-navy/90 dark:text-site-gray/90 p-3 bg-site-gray/20 dark:bg-deep-navy/40 rounded-md"
                >
                  <span className="font-sans font-semibold text-teal dark:text-vibrant-gold">{talk.year}</span> –{" "}
                  {talk.title}
                </li>
              ))}
            </ul>
            <p className="font-serif text-sm text-center mt-4 text-deep-navy/70 dark:text-site-gray/70">
              (Links to PDF slides, video replays, or abstract pages will be added when available.)
            </p>
          </div>
        </section>

        <section id="ongoing-projects" className="mb-12 md:mb-16">
          <h2 className="text-3xl font-bold font-sans text-deep-navy dark:text-site-white mb-8 text-center flex items-center justify-center">
            <Microscope className="mr-3 h-8 w-8 text-teal dark:text-vibrant-gold" /> Ongoing Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {ongoingProjects.map((project, idx) => (
              <Card key={idx} className="bg-background/50 dark:bg-background/20">
                <CardHeader>
                  <CardTitle className="text-xl font-sans text-teal dark:text-vibrant-gold">{project.title}</CardTitle>
                  <CardDescription className="font-serif text-sm text-deep-navy/70 dark:text-site-gray/70 pt-1">
                    {project.funder} ({project.period}) | {project.role} | {project.amount}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-serif text-sm text-deep-navy/80 dark:text-site-gray/80">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="cv-citations" className="text-center py-10 mt-16 border-t border-site-gray/20 dark:border-deep-navy/50">
          <h2 className="text-2xl font-bold font-sans text-deep-navy dark:text-site-white mb-4">
            Full CV & Citation List
          </h2>
          <p className="font-serif text-md text-deep-navy/80 dark:text-site-gray/80 mb-6 max-w-xl mx-auto">
            For a comprehensive list of publications, teaching activities, grants, and detailed citation metrics, please
            refer to the following resources:
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              asChild
              size="lg"
              className="bg-teal hover:bg-teal/90 text-site-white dark:bg-vibrant-gold dark:hover:bg-vibrant-gold/90 dark:text-deep-navy font-sans"
            >
              <Link href="/diego-f-cuadros-cv.pdf" target="_blank">
                <Download className="mr-2 h-5 w-5" /> Download Full CV (PDF)
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-teal text-teal hover:bg-teal/10 dark:border-vibrant-gold dark:text-vibrant-gold dark:hover:bg-vibrant-gold/10 font-sans"
            >
              <Link href="https://scholar.google.com/citations?user=zMoJ8n4AAAAJ&hl=en" target="_blank">
                <BookOpen className="mr-2 h-5 w-5" /> Google Scholar Profile
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

