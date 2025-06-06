"use client"

import * as React from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { BookOpen, Link as LinkIcon, Search } from "lucide-react"
import { useRouter } from "next/navigation"

// Real publications data for Dr. Diego F. Cuadros organized by research categories
const publications = [
  // 1. HIV Hotspots
  {
    title: "Mapping HIV clustering: a strategy for identifying populations at high risk of HIV infection in sub-Saharan Africa",
    authors: "Cuadros D.F., Awad S.F., Abu-Raddad L.J.",
    journal: "International Journal of Health Geographics",
    year: 2013,
    tags: ["HIV Hotspots"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    title: "Spatial variability in HIV prevalence declines in several countries in sub-Saharan Africa",
    authors: "Cuadros D.F., Abu-Raddad L.J.",
    journal: "Health & Place",
    year: 2014,
    tags: ["HIV Hotspots"],
    imageUrl: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80",
  },
  {
    title: "Beyond HIV prevalence: identifying people living with HIV within underserved areas in South Africa",
    authors: "Kim H., Tanser F., Tomita A., Vandormael A., Cuadros D.F.",
    journal: "BMJ Global Health",
    year: 2021,
    tags: ["HIV Hotspots"],
    imageUrl: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80",
  },
  {
    title: "The role of high-risk geographies in the perpetuation of the HIV epidemic in rural South Africa: a spatial molecular epidemiology study",
    authors: "Cuadros D.F., de Oliveira T., Gräf T., Junqueira D.M., et al.",
    journal: "PLOS Global Public Health",
    year: 2022,
    tags: ["HIV Hotspots"],
    imageUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80",
  },

  // 2. HIV Care Access
  {
    title: "Assessing regional variations and sociodemographic barriers in the progress toward UNAIDS 95-95-95 targets in Zimbabwe",
    authors: "Chowdhury M.D.T., Bershteyn A., Milali M., Citron D.T., Nyimbili S., Musuka G., Cuadros D.F.",
    journal: "Communications Medicine",
    year: 2025,
    tags: ["HIV Care Access"],
    imageUrl: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80",
  },
  {
    title: "District-level treatment cascade bottlenecks towards UNAIDS HIV 95-95-95 targets",
    authors: "Cuadros D.F., et al.",
    journal: "Lancet HIV",
    year: 2024,
    tags: ["HIV Care Access"],
    imageUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80",
  },

  // 3. HIV Co-infections  
  {
    title: "From individuals to populations: Immunological and epidemiological significance of co-infection in the dynamics of HIV",
    authors: "Cuadros D.F., Abu-Raddad L.J.",
    journal: "Journal of Clinical & Cellular Immunology",
    year: 2012,
    tags: ["HIV Co-infections"],
    imageUrl: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80",
  },
  {
    title: "Convergence of HIV and non-communicable disease epidemics: geospatial mapping of the unmet health needs in an HIV hyperendemic community in South Africa",
    authors: "Cuadros D.F., Devi C., Singh U., et al.",
    journal: "BMJ Global Health",
    year: 2024,
    tags: ["HIV Co-infections"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },

  // 4. Male Circumcision
  {
    title: "Are geographical 'cold spots' of male circumcision driving differential HIV dynamics in Tanzania?",
    authors: "Cuadros D.F., Branscum A.J., Miller F.D., Awad S.F., Abu-Raddad L.J.",
    journal: "Frontiers in Public Health",
    year: 2015,
    tags: ["Male Circumcision"],
    imageUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80",
  },

  // 5. COVID-19 Transmission
  {
    title: "Quantifying early COVID-19 outbreak transmission in South Africa and exploring vaccine efficacy scenarios",
    authors: "Mukandavire Z., Nyabadza F., Malunguza N.J., Cuadros D.F., et al.",
    journal: "PLOS ONE",
    year: 2020,
    tags: ["COVID-19 Transmission"],
    imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80",
  },
  {
    title: "Dynamics of the COVID-19 epidemic in urban and rural areas in the United States",
    authors: "Cuadros D.F., Branscum A.J., Mukandavire Z., Miller F.D., MacKinnon N.J.",
    journal: "Annals of Epidemiology",
    year: 2021,
    tags: ["COVID-19 Transmission"],
    imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80",
  },

  // 6. COVID-19 Vaccination
  {
    title: "Association between vaccination coverage disparity and the dynamics of the COVID-19 Delta and Omicron waves in the US",
    authors: "Cuadros D.F., Moreno C.M., Musuka G., et al.",
    journal: "Frontiers in Medicine",
    year: 2022,
    tags: ["COVID-19 Vaccination"],
    imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80",
  },
  {
    title: "Mapping Structural Barriers: A Geospatial Assessment of COVID-19 Vaccine Inequities in Kenya",
    authors: "Niño L., Kiragga A., Miller F.D., Mwalili S.M., Musuka G., Cuadros D.F.",
    journal: "medRxiv (Preprint)",
    year: 2025,
    tags: ["COVID-19 Vaccination"],
    imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80",
  },

  // 7. COVID-19 Capacity
  {
    title: "Projected ICU surge demands during early COVID-19 hotspots in the United States",
    authors: "Cuadros D.F., et al.",
    journal: "Health & Place",
    year: 2020,
    tags: ["COVID-19 Capacity"],
    imageUrl: "https://images.unsplash.com/photo-1628771062401-644a49d3a7e2?w=800&q=80",
  },

  // 8. Substance Use
  {
    title: "Spatiotemporal analysis of substance use disorder mortality in the United States: an observational study of emerging hotspots and vulnerable populations (2005–2020)",
    authors: "Escobar S., MacKinnon N.J., Ambade P., Hoffman Z., Cuadros D.F.",
    journal: "Lancet Regional Health – Americas",
    year: 2025,
    tags: ["Substance Use"],
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
  },
  {
    title: "Shifting opioid overdose mortality hotspots in Ohio: a spatiotemporal analysis",
    authors: "Hernandez A., Cuadros D.F., et al.",
    journal: "Scientific Reports",
    year: 2020,
    tags: ["Substance Use"],
    imageUrl: "https://images.unsplash.com/photo-1606318601954-b9d7c34c8b22?w=800&q=80",
  },

  // 9. Hepatitis
  {
    title: "Spatial epidemiology of hepatitis C virus infection in Egypt: analyses and implications",
    authors: "Cuadros D.F., Branscum A.J., Miller F.D., Abu-Raddad L.J.",
    journal: "Hepatology",
    year: 2014,
    tags: ["Hepatitis"],
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
  },

  // 10. Spatial Methods
  {
    title: "Spatial epidemiology of diabetes: Methods and insights",
    authors: "Cuadros D.F., Li J., Musuka G., Awad S.F.",
    journal: "World Journal of Diabetes",
    year: 2021,
    tags: ["Spatial Methods"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    title: "Wastewater-based epidemiology: spatial modeling and public health implications for SARS-CoV-2 and other enteric viruses",
    authors: "Cuadros D.F., et al.",
    journal: "Pathogens",
    year: 2024,
    tags: ["Spatial Methods"],
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
  },
]

export function SiteSearch() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (url: string) => {
    router.push(url)
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <Search className="h-4 w-4" />
        Search...
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Publications">
            {publications.map((pub) => (
              <CommandItem
                key={pub.title}
                onSelect={() => handleSelect(`/publications`)}
                value={pub.title}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                <span>{pub.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
} 