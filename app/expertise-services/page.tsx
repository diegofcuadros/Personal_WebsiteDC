import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart3, MapIcon, LineChart, Users } from "lucide-react"

const services = [
  {
    title: "Advanced Epidemiological Modeling",
    icon: LineChart,
    description:
      "Developing and applying sophisticated models to predict disease spread, assess intervention impacts, and understand transmission dynamics.",
    details: ["Agent-based modeling", "Compartmental models (SIR, SEIR)", "Network analysis"],
  },
  {
    title: "Geospatial Health Disparities Analysis",
    icon: MapIcon,
    description:
      "Utilizing GIS and spatial statistics to identify health disparities, map disease hotspots, and analyze environmental/social determinants of health.",
    details: ["Cluster analysis", "Geographically weighted regression", "Accessibility modeling"],
  },
  {
    title: "Data Science & Visualization for Public Health",
    icon: BarChart3,
    description:
      "Leveraging large datasets, machine learning, and interactive visualizations to extract insights and communicate complex health information effectively.",
    details: ["Big data analytics (R, Python)", "Predictive analytics", "Interactive dashboards (Tableau, R Shiny)"],
  },
  {
    title: "Research Collaboration & Grant Partnership",
    icon: Users,
    description:
      "Partnering on research projects, grant proposals, and academic initiatives to advance public health knowledge and solutions.",
    details: ["NIH grant expertise", "Interdisciplinary team leadership", "Study design consultation"],
  },
]

const caseStudies = [
  {
    title: "Case Study: Mapping HIV Hotspots in Rural Kenya",
    problem: "Limited understanding of precise HIV distribution hindering targeted prevention efforts.",
    solution: "Applied geospatial analysis to identify micro-hotspots of HIV transmission.",
    outcome: "Informed resource allocation for localized testing and prevention campaigns, improving efficiency.",
    tags: ["HIV", "Geospatial Analysis", "Africa"],
  },
  {
    title: "Case Study: COVID-19 Spread Modeling in Urban Ohio",
    problem: "Need for accurate local projections to guide public health responses during the pandemic.",
    solution: "Developed SEIR models incorporating mobility data and local demographics.",
    outcome: "Provided actionable insights to local health departments for intervention planning.",
    tags: ["COVID-19", "Disease Modeling", "USA"],
  },
]

export default function ExpertiseServicesPage() {
  return (
    <div className="bg-site-white dark:bg-deep-navy text-deep-navy dark:text-site-gray">
      <div className="container py-12 md:py-16 px-4 md:px-6">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans bg-clip-text text-transparent bg-gradient-to-r from-deep-navy via-teal to-vibrant-gold dark:from-site-white dark:via-teal dark:to-vibrant-gold">
            Expertise & Services
          </h1>
          <p className="text-xl md:text-2xl text-teal dark:text-vibrant-gold font-semibold font-sans max-w-3xl mx-auto">
            Leveraging data science and epidemiological methods to drive public health innovation and impact.
          </p>
        </header>

        <section id="service-offerings" className="mb-12 md:mb-16">
          <h2 className="text-3xl font-bold font-sans text-deep-navy dark:text-site-white mb-8 text-center">
            Service Offerings
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card
                key={service.title}
                className="flex flex-col bg-background/50 dark:bg-background/20 hover:shadow-xl transition-shadow duration-300 border-l-4 border-teal dark:border-vibrant-gold"
              >
                <CardHeader className="flex-row items-start space-x-4 pb-4">
                  <service.icon className="h-10 w-10 text-teal dark:text-vibrant-gold mt-1" />
                  <div>
                    <CardTitle className="text-2xl font-semibold font-sans text-deep-navy dark:text-site-white">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="font-serif text-deep-navy/80 dark:text-site-gray/80 pt-1">
                      {service.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  {service.details && service.details.length > 0 && (
                    <>
                      <h4 className="font-sans font-semibold text-sm text-deep-navy dark:text-site-white mb-1">
                        Key areas include:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 font-serif text-sm text-deep-navy/70 dark:text-site-gray/70">
                        {service.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="case-studies">
          <h2 className="text-3xl font-bold font-sans text-deep-navy dark:text-site-white mb-8 text-center">
            Impactful Case Studies
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((study) => (
              <Card key={study.title} className="bg-background/50 dark:bg-background/20">
                <CardHeader>
                  <CardTitle className="text-xl font-sans text-teal dark:text-vibrant-gold">{study.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-deep-navy dark:text-site-white">
                      The Challenge:
                    </h4>
                    <p className="font-serif text-sm text-deep-navy/80 dark:text-site-gray/80">{study.problem}</p>
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-deep-navy dark:text-site-white">
                      Our Approach:
                    </h4>
                    <p className="font-serif text-sm text-deep-navy/80 dark:text-site-gray/80">{study.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-deep-navy dark:text-site-white">
                      The Outcome:
                    </h4>
                    <p className="font-serif text-sm text-deep-navy/80 dark:text-site-gray/80">{study.outcome}</p>
                  </div>
                  <div className="pt-2">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-muted text-muted-foreground text-xs font-sans px-2 py-1 rounded-full mr-2 mb-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="font-serif text-center mt-8 text-deep-navy/70 dark:text-site-gray/70">
            More detailed case studies and client testimonials can be provided upon request.
          </p>
        </section>
      </div>
    </div>
  )
}
