import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MapPin, Brain, ShieldCheck, Network, Puzzle } from "lucide-react"

const coreResearchThemesData = [
  {
    title: "Geospatial Epidemiology of HIV",
    icon: MapPin,
    description:
      "Mapping, modeling, and predicting the geographic and social clustering of HIV in sub-Saharan Africa and beyond. This includes:",
    points: [
      "Identifying HIV transmission hotspots at community and sub-district levels",
      "Spatial analysis of testing and treatment gaps (e.g., UNAIDS 95-95-95 targets)",
      "Evaluating intervention allocation strategies through GIS-optimized approaches",
    ],
  },
  {
    title: "AI-Enhanced Epidemic Forecasting & Surveillance",
    icon: Brain,
    description: "Development of analytical frameworks that integrate:",
    points: [
      "Predictive models of disease spread using traditional and AI techniques",
      "Early warning systems for outbreak detection and epidemic intelligence",
      "LLM-assisted hypothesis generation and interpretation from complex data streams",
    ],
  },
  {
    title: "Health Equity & Risk Mapping",
    icon: ShieldCheck,
    description: "Focusing on social and environmental determinants of health:",
    points: [
      "Quantifying geographic disparities in access to care",
      "Mapping intersecting risks such as poverty, NCD burden, and gender disparities",
      "Enabling precision public health for marginalized communities",
    ],
  },
  {
    title: "Mathematical Modeling of Disease Dynamics",
    icon: Network,
    description: "Using deterministic and stochastic models to understand:",
    points: [
      "Co-infection dynamics, e.g., HIV and malaria interplay",
      "Behavioral and network-based transmission models",
      "Scenario simulations to test policy and intervention efficacy",
    ],
  },
]

export default function ResearchThemesPage() {
  return (
    <>
      <div className="flex items-center mb-10">
        <Puzzle className="h-10 w-10 md:h-12 md:w-12 mr-4 text-teal dark:text-vibrant-gold flex-shrink-0" />
        <h2 className="text-2xl md:text-3xl font-bold font-sans text-deep-navy dark:text-site-white">
          Core Research Themes
        </h2>
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        {coreResearchThemesData.map((theme) => (
          <Card
            key={theme.title}
            className="flex flex-col bg-background/50 dark:bg-background/20 hover:shadow-xl transition-shadow duration-300 border-l-4 border-teal dark:border-vibrant-gold"
          >
            <CardHeader className="flex-row items-start space-x-4 pb-3">
              <theme.icon className="h-8 w-8 text-teal dark:text-vibrant-gold mt-1 flex-shrink-0" />
              <div>
                <CardTitle className="text-xl font-semibold font-sans text-deep-navy dark:text-site-white">
                  {theme.title}
                </CardTitle>
                <CardDescription className="font-serif text-sm text-deep-navy/80 dark:text-site-gray/80 pt-1">
                  {theme.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow pt-0">
              <ul className="list-disc list-inside space-y-1 font-serif text-sm text-deep-navy/70 dark:text-site-gray/70 pl-1">
                {theme.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
