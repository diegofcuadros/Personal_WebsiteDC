import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Puzzle, Lightbulb, FileText, Users, ArrowRight } from "lucide-react"

const researchSections = [
  {
    title: "Core Research Themes",
    description:
      "Explore the fundamental areas driving my research, from geospatial HIV epidemiology to AI-driven forecasting and health equity.",
    href: "/research/themes",
    icon: Puzzle,
  },
  {
    title: "Projects",
    description:
      "Discover current and past projects, showcasing methodologies, partnerships, and impactful outcomes in public health.",
    href: "/research/projects",
    icon: Lightbulb,
  },
  {
    title: "Grants & Funding",
    description: "Learn about the funding sources that support our innovative research endeavors.",
    href: "/research/grants",
    icon: FileText,
  },
  {
    title: "Lab Members & Openings",
    description: "Meet the team and explore opportunities to join the Digital Epidemiology Laboratory.",
    href: "/research/lab-members",
    icon: Users,
  },
]

export default function ResearchOverviewPage() {
  return (
    <>
      <section id="research-focus-philosophy" className="max-w-3xl mx-auto mb-12 md:mb-16">
        <div className="flex items-start mb-6">
          <Target className="h-10 w-10 md:h-12 md:w-12 mr-4 text-teal dark:text-vibrant-gold flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-sans text-deep-navy dark:text-site-white mb-2">
              Research Focus & Philosophy
            </h2>
            <p className="font-serif text-lg leading-relaxed text-deep-navy/90 dark:text-site-gray/90">
              My research lies at the intersection of spatial epidemiology, mathematical modeling, and data-driven
              public health strategy. I combine geospatial data, advanced analytics, and AI to uncover hidden patterns
              in disease dynamics, identify health inequities, and guide evidence-based decision-making in
              resource-constrained settings. My goal is to move from data to action—enabling smarter, faster, and more
              targeted public health responses.
            </p>
          </div>
        </div>
      </section>

      <section id="research-navigation" className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold font-sans text-deep-navy dark:text-site-white mb-8 text-center">
          Explore Our Research
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {researchSections.map((section) => (
            <Card
              key={section.title}
              className="flex flex-col bg-background/50 dark:bg-background/20 hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className="flex-row items-start space-x-4 pb-3">
                <section.icon className="h-8 w-8 text-teal dark:text-vibrant-gold mt-1 flex-shrink-0" />
                <CardTitle className="text-xl font-semibold font-sans text-deep-navy dark:text-site-white">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="font-serif text-sm text-deep-navy/80 dark:text-site-gray/80 mb-4">
                  {section.description}
                </p>
                <Button asChild variant="link" className="px-0 text-teal dark:text-vibrant-gold">
                  <Link href={section.href}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}
