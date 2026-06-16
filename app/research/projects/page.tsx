import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Lightbulb, TrendingUp, Brain, BarChartBig, CheckCircle, RefreshCw, type LucideIcon } from "lucide-react"
import { currentProjectsData, pastProjectsData, type ProjectIconKey } from "@/data/projects"

const projectIconMap: Record<ProjectIconKey, LucideIcon> = {
  trendingUp: TrendingUp,
  brain: Brain,
  barChartBig: BarChartBig,
  checkCircle: CheckCircle,
}

export default function ProjectsPage() {
  return (
    <>
      <div className="flex items-center mb-10">
        <Lightbulb className="h-10 w-10 md:h-12 md:w-12 mr-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
        <h2 className="text-2xl md:text-3xl font-bold font-sans text-slate-900 dark:text-slate-100">Projects</h2>
      </div>

      <div className="mb-10">
        <div className="flex items-center mb-6">
          <RefreshCw className="h-7 w-7 mr-3 text-teal-600 dark:text-teal-400" />
          <h3 className="text-xl md:text-2xl font-semibold font-sans text-slate-900 dark:text-slate-100">
            Current Projects
          </h3>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
          {currentProjectsData.map((project) => {
            const Icon = projectIconMap[project.icon]

            return (
              <Card
                key={project.title}
                className="bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow border border-slate-200 dark:border-slate-700"
              >
                <CardHeader>
                  <div className="flex items-start space-x-3">
                    <Icon className="h-7 w-7 text-teal-600 dark:text-teal-400 mt-1 flex-shrink-0" />
                    <div>
                      <CardTitle className="text-lg font-sans text-slate-900 dark:text-slate-100">
                        {project.title}
                      </CardTitle>
                      {project.funding && (
                        <CardDescription className="font-serif text-xs text-slate-600 dark:text-slate-400 pt-0.5">
                          Funding: {project.funding}
                        </CardDescription>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm font-serif text-slate-700 dark:text-slate-300">
                  <p>
                    <span className="font-sans font-semibold text-slate-900 dark:text-slate-100">Goal:</span>{" "}
                    {project.goal}
                  </p>
                  <p>
                    <span className="font-sans font-semibold text-slate-900 dark:text-slate-100">Methods:</span>{" "}
                    {project.methods}
                  </p>
                  {project.partners && (
                    <p>
                      <span className="font-sans font-semibold text-slate-900 dark:text-slate-100">Partners:</span>{" "}
                      {project.partners}
                    </p>
                  )}
                  {project.output && (
                    <p>
                      <span className="font-sans font-semibold text-slate-900 dark:text-slate-100">Output:</span>{" "}
                      {project.output}
                    </p>
                  )}
                  {project.impact && (
                    <p>
                      <span className="font-sans font-semibold text-slate-900 dark:text-slate-100">Impact:</span>{" "}
                      {project.impact}
                    </p>
                  )}
                  {project.useCase && (
                    <p>
                      <span className="font-sans font-semibold text-slate-900 dark:text-slate-100">Use Case:</span>{" "}
                      {project.useCase}
                    </p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center mb-6">
          <CheckCircle className="h-7 w-7 mr-3 text-teal-600 dark:text-teal-400" />
          <h3 className="text-xl md:text-2xl font-semibold font-sans text-slate-900 dark:text-slate-100">
            Past Projects (Selected)
          </h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {pastProjectsData.map((project) => {
            const Icon = projectIconMap[project.icon]

            return (
              <Card
                key={project.title}
                className="bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow border border-slate-200 dark:border-slate-700"
              >
                <CardHeader className="flex-row items-start space-x-3 pb-3">
                  <Icon className="h-6 w-6 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" />
                  <CardTitle className="text-md font-sans text-slate-900 dark:text-slate-100 leading-tight">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-serif text-sm text-slate-700 dark:text-slate-300">{project.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </>
  )
}