import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Lightbulb, TrendingUp, Brain, BarChartBig, CheckCircle, RefreshCw } from "lucide-react"

const currentProjectsData = [
  {
    title: "Spatial Shifts in HIV Epidemics in Sub-Saharan Africa",
    icon: TrendingUp,
    goal: "Identify and characterize evolving HIV hotspots across multiple African countries",
    methods: "Geostatistical interpolation, Bayesian smoothing, LLM-assisted text mining of health survey reports",
    partners: "University of Cincinnati, Harvard, local ministries of health",
    output: "Targeted maps for national program use; publications in Lancet HIV, BMJ Global Health",
  },
  {
    title: "AI for Precision Public Health: Real-Time Risk Indicators (RTRI)",
    icon: Brain,
    goal: "Develop adaptive dashboards powered by machine learning to inform health agencies in real time",
    methods: "LLM-assisted EDA, unsupervised clustering of health behavior datasets, temporal anomaly detection",
    funding: "NIH (2023–2027)",
    impact: "Pilot in U.S. urban settings for syndromic surveillance and behavioral intervention planning",
  },
  {
    title: "Health Service Access and NCD Burden in HIV-Endemic Regions",
    icon: BarChartBig,
    goal: "Analyze joint burden of HIV and non-communicable diseases using population-level geospatial data",
    methods: "Hotspot mapping, spatial autocorrelation, multilevel modeling",
    useCase: "South Africa, Zambia",
  },
]

const pastProjectsData = [
  {
    title: "Mapping HIV Testing Gaps in Zambia",
    icon: CheckCircle,
    description:
      "Identified critical spatial disparities in HIV testing using DHS data. Supported targeted resource allocation for provincial health planners.",
  },
  {
    title: "Geospatial Modeling of Malaria-HIV Co-Infection",
    icon: CheckCircle,
    description:
      "Developed one of the first mechanistic models for disease interaction at a systems level. Helped shape understanding of interdependent disease burdens.",
  },
  {
    title: "UNAIDS 95-95-95 Progress Mapping",
    icon: CheckCircle,
    description:
      "Created fine-scale geospatial analysis of ART access, diagnosis rates, and viral suppression. Published results directly influencing subnational HIV programs in SSA.",
  },
  {
    title: "Epidemic Metric Index for HIV",
    icon: CheckCircle,
    description:
      "Proposed and validated new epidemiological indicators to prioritize intervention zones. Widely cited in strategy documents and used in dashboarding projects.",
  },
]

export default function ProjectsPage() {
  return (
    <>
      <div className="flex items-center mb-10">
        <Lightbulb className="h-10 w-10 md:h-12 md:w-12 mr-4 text-teal dark:text-vibrant-gold flex-shrink-0" />
        <h2 className="text-2xl md:text-3xl font-bold font-sans text-deep-navy dark:text-site-white">Projects</h2>
      </div>

      <div className="mb-10">
        <div className="flex items-center mb-6">
          <RefreshCw className="h-7 w-7 mr-3 text-teal dark:text-vibrant-gold" />
          <h3 className="text-xl md:text-2xl font-semibold font-sans text-deep-navy dark:text-site-white">
            Current Projects
          </h3>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
          {currentProjectsData.map((project) => (
            <Card
              key={project.title}
              className="bg-background/50 dark:bg-background/20 hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start space-x-3">
                  <project.icon className="h-7 w-7 text-teal dark:text-vibrant-gold mt-1 flex-shrink-0" />
                  <div>
                    <CardTitle className="text-lg font-sans text-teal dark:text-vibrant-gold">
                      {project.title}
                    </CardTitle>
                    {project.funding && (
                      <CardDescription className="font-serif text-xs text-deep-navy/70 dark:text-site-gray/70 pt-0.5">
                        Funding: {project.funding}
                      </CardDescription>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm font-serif text-deep-navy/80 dark:text-site-gray/80">
                <p>
                  <span className="font-sans font-semibold text-deep-navy/90 dark:text-site-gray/90">Goal:</span>{" "}
                  {project.goal}
                </p>
                <p>
                  <span className="font-sans font-semibold text-deep-navy/90 dark:text-site-gray/90">Methods:</span>{" "}
                  {project.methods}
                </p>
                {project.partners && (
                  <p>
                    <span className="font-sans font-semibold text-deep-navy/90 dark:text-site-gray/90">Partners:</span>{" "}
                    {project.partners}
                  </p>
                )}
                {project.output && (
                  <p>
                    <span className="font-sans font-semibold text-deep-navy/90 dark:text-site-gray/90">Output:</span>{" "}
                    {project.output}
                  </p>
                )}
                {project.impact && (
                  <p>
                    <span className="font-sans font-semibold text-deep-navy/90 dark:text-site-gray/90">Impact:</span>{" "}
                    {project.impact}
                  </p>
                )}
                {project.useCase && (
                  <p>
                    <span className="font-sans font-semibold text-deep-navy/90 dark:text-site-gray/90">Use Case:</span>{" "}
                    {project.useCase}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center mb-6">
          <CheckCircle className="h-7 w-7 mr-3 text-teal dark:text-vibrant-gold" />
          <h3 className="text-xl md:text-2xl font-semibold font-sans text-deep-navy dark:text-site-white">
            Past Projects (Selected)
          </h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {pastProjectsData.map((project) => (
            <Card
              key={project.title}
              className="bg-background/50 dark:bg-background/20 hover:shadow-lg transition-shadow"
            >
              <CardHeader className="flex-row items-start space-x-3 pb-3">
                <project.icon className="h-6 w-6 text-teal dark:text-vibrant-gold mt-0.5 flex-shrink-0" />
                <CardTitle className="text-md font-sans text-teal dark:text-vibrant-gold leading-tight">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-serif text-sm text-deep-navy/80 dark:text-site-gray/80">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
