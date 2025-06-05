import {
  BookOpen,
  Download,
  PresentationIcon,
  Microscope,
  LinkIcon,
  MapIcon,
  BarChartIcon,
  ActivityIcon,
  BrainIcon,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const publicationThemes = [
  {
    themeTitle: "HIV Epidemic Modeling & Spatial Analysis",
    themeIcon: Microscope,
    themeDescription:
      "My core research centers on mapping and modeling the spatial-temporal dynamics of HIV in sub-Saharan Africa, supporting UNAIDS 95-95-95 targets and localized prevention efforts.",
    publications: [
      {
        title: "Geospatial mapping of unmet HIV and NCD health needs in a hyperendemic South African community",
        authors: "Cuadros DF et al.",
        journal: "BMJ Global Health",
        year: 2024,
        links: [
          { label: "Read", href: "#", icon: LinkIcon },
          { label: "View Summary", href: "#", icon: MapIcon },
        ],
      },
      {
        title: "Shifting focus to geospatial hotspots of UNAIDS 95-95-95 in Sub-Saharan Africa",
        authors: "Cuadros DF et al.",
        journal: "The Lancet HIV",
        year: 2024,
        links: [
          { label: "Read", href: "#", icon: LinkIcon },
          { label: "Dashboard Snapshot", href: "#", icon: BarChartIcon },
        ],
      },
      {
        title: "Geospatial patterns of progress toward UNAIDS 95-95-95 targets in Zambia",
        authors: "Cuadros DF et al.",
        journal: "BMJ Global Health",
        year: 2023,
        links: [
          { label: "Read", href: "#", icon: LinkIcon },
          { label: "Regional Map Visual", href: "#", icon: MapIcon },
        ],
      },
      {
        title: "Targeting HIV prevention to priority areas in Zimbabwe",
        authors: "Cuadros DF et al.",
        journal: "AIDS",
        year: 2019,
        links: [{ label: "Read", href: "#", icon: LinkIcon }],
      },
      {
        title: "Spatial variability in HIV prevalence declines in SSA",
        authors: "Cuadros DF, Abu-Raddad LJ.",
        journal: "Health & Place",
        year: 2014,
        links: [{ label: "Read", href: "#", icon: LinkIcon }],
      },
    ],
  },
  {
    themeTitle: "Epidemic Hotspots, Surveillance & Forecasting",
    themeIcon: ActivityIcon,
    themeDescription:
      "This line of work combines geospatial analytics and predictive modeling to support early warning systems, epidemic intelligence, and health equity mapping.",
    publications: [
      {
        title: "State of the HIV epidemic in KwaZulu-Natal: epidemic metrics for targeted interventions",
        authors: "Cuadros DF et al.",
        journal: "International Journal of Epidemiology",
        year: 2020,
        links: [{ label: "Read", href: "#", icon: LinkIcon }],
      },
      {
        title: "Mapping spatial variability of HIV infection in sub-Saharan Africa",
        authors: "Cuadros DF et al.",
        journal: "Scientific Reports",
        year: 2017,
        links: [{ label: "Read", href: "#", icon: LinkIcon }],
      },
      {
        title: "Role of high-risk communities in HIV spread in rural South Africa",
        authors: "Cuadros DF et al.",
        journal: "PLOS Global Public Health",
        year: 2022,
        links: [{ label: "Read", href: "#", icon: LinkIcon }],
      },
    ],
  },
  {
    themeTitle: "Co-Infection Dynamics & Theoretical Modeling",
    themeIcon: BrainIcon,
    themeDescription:
      "My earlier work examined ecological and epidemiological intersections—especially HIV and malaria co-infection dynamics.",
    publications: [
      {
        title: "HIV-malaria co-infection dynamics: implications for disease control",
        authors: "Cuadros DF, Branscum AJ, Crowley PH.",
        journal: "International Journal of Epidemiology",
        year: 2011,
        links: [{ label: "Read", href: "#", icon: LinkIcon }],
      },
    ],
  },
]

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
  return (
    <div className="bg-site-white dark:bg-deep-navy text-deep-navy dark:text-site-gray">
      <div className="container py-12 md:py-16 px-4 md:px-6">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans bg-clip-text text-transparent bg-gradient-to-r from-deep-navy via-teal to-vibrant-gold dark:from-site-white dark:via-teal dark:to-vibrant-gold">
            Research & Publications
          </h1>
        </header>

        <section id="intro-paragraph" className="max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="font-serif text-lg md:text-xl leading-relaxed text-deep-navy/90 dark:text-site-gray/90 text-center">
            As Director of the Digital Epidemiology Lab at the University of Cincinnati, my research bridges spatial
            modeling, epidemic theory, and AI-assisted analytics to understand and respond to public health threats. I
            focus on HIV, COVID-19, and emerging health challenges across sub-Saharan Africa and the U.S., using
            geospatial science and predictive modeling to inform policy and optimize interventions.
          </p>
        </section>

        {publicationThemes.map((theme, index) => (
          <section key={index} id={`theme-${index}`} className="mb-12 md:mb-16">
            <div className="flex items-center mb-6 md:mb-8">
              <theme.themeIcon className="h-8 w-8 md:h-10 md:w-10 mr-3 md:mr-4 text-teal dark:text-vibrant-gold" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-sans text-deep-navy dark:text-site-white">
                  {theme.themeTitle}
                </h2>
                {theme.themeDescription && (
                  <p className="font-serif text-md text-deep-navy/80 dark:text-site-gray/80 mt-1 max-w-2xl">
                    {theme.themeDescription}
                  </p>
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {theme.publications.map((pub) => (
                <Card
                  key={pub.title}
                  className="flex flex-col bg-background/50 dark:bg-background/20 hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-sans text-teal dark:text-vibrant-gold">{pub.title}</CardTitle>
                    <CardDescription className="font-serif text-xs text-deep-navy/70 dark:text-site-gray/70 pt-1">
                      {pub.authors} ({pub.year}). <em>{pub.journal}</em>.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-2">
                    <div className="flex flex-wrap gap-2">
                      {pub.links.map((link) => (
                        <Button
                          key={link.label}
                          asChild
                          variant="link"
                          size="sm"
                          className="px-1 text-teal dark:text-vibrant-gold text-xs"
                        >
                          <Link href={link.href} target="_blank">
                            <link.icon className="mr-1 h-3 w-3" /> {link.label}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        ))}

        <section id="featured-presentations" className="mb-12 md:mb-16">
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

        <section id="cv-citations" className="text-center py-10 border-t border-site-gray/20 dark:border-deep-navy/50">
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
