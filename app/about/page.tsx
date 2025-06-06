import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, Briefcase, MapPin, Users, Lightbulb, Globe, GraduationCap, Microscope, BrainCircuit, BarChart3, Code } from "lucide-react"
import ClientInteractiveMap from "@/components/client-interactive-map"
import InteractiveTimeline from "@/components/interactive-timeline"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const timelineEvents = [
  {
    role: "Associate Professor",
    institution: "University of Cincinnati",
    period: "2021–Present",
    focus: "Leading research in digital epidemiology and mentoring the next generation of spatial health scientists."
  },
  {
    role: "Co-Director, Digital Epidemiology Lab",
    institution: "UC Digital Futures",
    period: "c. 2021–Present",
    focus: "Bridging geography, public health, and data science to tackle complex health challenges."
  },
  {
    role: "Assistant Professor",
    institution: "University of Cincinnati, Dept. of Geography & GIS",
    period: "2016–2021",
    focus: "Established the Health Geography and Disease Modeling Lab, laying the foundation for current research."
  },
  {
    role: "Research Scientist",
    institution: "Africa Centre for Population Health, South Africa",
    period: "2015",
    focus: "Investigated geographic drivers of HIV spread in KwaZulu-Natal, refining methods for hotspot mapping."
  },
  {
    role: "Consultant",
    institution: "The World Bank",
    period: "c. 2015",
    focus: "Contributed modeling expertise to evaluate and improve HIV resource allocation tools for health policy."
  },
  {
    role: "Postdoctoral Fellow",
    institution: "Weill Cornell Medicine – Qatar",
    period: "2012–2014",
    focus: "Examined spatial patterns of HIV and Hepatitis C, honing skills in advanced spatial statistics and GIS."
  },
  {
    role: "Ph.D. in Biology",
    institution: "University of Kentucky",
    period: "–2012",
    focus: "Doctoral dissertation on the epidemiological impact of co-infections on HIV transmission in sub-Saharan Africa."
  },
  {
    role: "B.Sc. in Biology",
    institution: "National University of Colombia",
    period: " ",
    focus: "Foundation in biological sciences that sparked an interest in ecology and quantitative science."
  },
]

const researchPillars = [
    {
        icon: Microscope,
        title: "Infectious Disease Epidemiology",
        description: "Pioneering research on HIV/AIDS, COVID-19, and Hepatitis C, focusing on co-infections, transmission dynamics, and intervention strategies in high-risk populations.",
        tags: ["HIV/AIDS", "COVID-19", "HCV", "Pandemics"]
    },
    {
        icon: Globe,
        title: "Health Geography & Spatial Epidemiology",
        description: "Utilizing GIS and spatial analysis to map disease hotspots, uncover environmental/social determinants of health, and analyze geographic disparities in healthcare access.",
        tags: ["GIS", "Hotspot Analysis", "Health Disparities"]
    },
    {
        icon: BrainCircuit,
        title: "Digital Epidemiology & Data Science",
        description: "Leveraging large datasets, computational models, and high-performance computing to simulate epidemic trajectories and predict health outcomes under various scenarios.",
        tags: ["Disease Modeling", "Data Science", "AI/ML"]
    },
    {
        icon: Users,
        title: "Substance Use Epidemiology",
        description: "Analyzing the spatial and temporal evolution of the U.S. opioid crisis, identifying demographic shifts and geographic drivers to inform targeted public health interventions.",
        tags: ["Opioid Crisis", "SUD", "Public Health"]
    }
]

const technicalExpertise = [
    { icon: MapPin, name: "Geographic Information Systems (GIS)" },
    { icon: BarChart3, name: "Spatial Statistics & Modeling" },
    { icon: BrainCircuit, name: "Mathematical & Computational Epidemiology" },
    { icon: Code, name: "Data Science & High-Performance Computing" },
]

export default function AboutPage() {
  return (
    <div className="bg-site-white dark:bg-deep-navy-900 text-deep-navy-900 dark:text-site-gray-100">
      <div className="container py-12 md:py-16 px-4 md:px-6">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-teal-500 to-vibrant-gold-500">
            About Dr. Diego F. Cuadros
          </h1>
          <p className="text-xl md:text-2xl text-teal-600 dark:text-teal-400 font-semibold font-sans">
            Epidemiologist, Health Geographer, and Data Scientist
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Image
                src="/Dic_2021-V2.jpg"
                alt="Dr. Diego F. Cuadros"
                width={350}
                height={350}
                className="rounded-lg shadow-xl mx-auto border-4 border-teal-500 dark:border-vibrant-gold-500 object-cover"
              />
              <div className="mt-6 text-center lg:text-left">
                <h3 className="text-2xl font-semibold font-sans text-deep-navy-900 dark:text-site-white mb-2">
                  Dr. Diego F. Cuadros, Ph.D.
                </h3>
                <p className="text-md text-teal-600 dark:text-teal-400 font-sans">
                  Associate Professor, University of Cincinnati
                </p>
                <p className="text-sm text-deep-navy-800/80 dark:text-site-gray-300/80 font-serif mt-1">
                  Co-Director, Digital Epidemiology Lab
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-6 w-full md:w-auto border-teal-500 text-teal-600 hover:bg-teal-500/10 dark:border-vibrant-gold-500 dark:text-vibrant-gold-400 dark:hover:bg-vibrant-gold-500/10 transition-all"
                >
                  <Link href="/CUADROS_CV_March2025.pdf" target="_blank">
                    <Download className="mr-2 h-4 w-4" /> Download CV
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-16">
            <section id="biography-mission">
              <h2 className="text-3xl font-bold font-sans text-deep-navy-900 dark:text-site-white mb-4 flex items-center">
                <Users className="mr-3 h-7 w-7 text-indigo-500" /> Biography & Mission
              </h2>
              <div className="space-y-4 font-serif text-lg leading-relaxed text-deep-navy-800/90 dark:text-site-gray-200/90">
                <p>
                  Born and raised in Bogotá, Colombia, Dr. Diego F. Cuadros earned his B.Sc. in Biology from the National University of Colombia, followed by a Ph.D. in Biology from the University of Kentucky. His doctoral research on HIV epidemiology in sub-Saharan Africa cultivated his passion for quantitative epidemiology and health geography.
                </p>
                <p>
                  Dr. Cuadros's mission is to bridge academic rigor with real-world impact. He uses interdisciplinary approaches that connect geography, epidemiology, and computational methods to address global health issues, translating complex data into actionable insights for policymakers and the public.
                </p>
              </div>
            </section>
            
            <section id="research-pillars">
              <h2 className="text-3xl font-bold font-sans text-deep-navy-900 dark:text-site-white mb-6 flex items-center">
                <Lightbulb className="mr-3 h-7 w-7 text-indigo-500" /> Research Pillars
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {researchPillars.map((pillar) => (
                  <Card key={pillar.title} className="bg-white dark:bg-slate-800/50 hover:shadow-lg transition-shadow border-l-4 border-teal-500">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-teal-100 dark:bg-teal-900/50 rounded-md">
                          <pillar.icon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                        </div>
                        <CardTitle className="font-sans text-lg">{pillar.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="font-serif text-sm text-deep-navy-800/80 dark:text-site-gray-300/80 mb-4">
                        {pillar.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {pillar.tags.map(tag => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section id="career-trajectory">
              <h2 className="text-3xl font-bold font-sans text-deep-navy-900 dark:text-site-white mb-6 flex items-center">
                <Briefcase className="mr-3 h-7 w-7 text-indigo-500" /> Career Trajectory
              </h2>
              <InteractiveTimeline events={timelineEvents} />
            </section>

            <section id="technical-expertise">
              <h2 className="text-3xl font-bold font-sans text-deep-navy-900 dark:text-site-white mb-6 flex items-center">
                <Code className="mr-3 h-7 w-7 text-indigo-500" /> Technical Expertise
              </h2>
              <Card className="bg-white dark:bg-slate-800/50">
                  <CardContent className="p-6">
                      <div className="grid grid-cols-2 gap-4">
                          {technicalExpertise.map(skill => (
                              <div key={skill.name} className="flex items-center space-x-3">
                                  <div className="p-2 bg-teal-100 dark:bg-teal-900/50 rounded-md">
                                      <skill.icon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                  </div>
                                  <p className="font-sans text-md text-deep-navy-800 dark:text-site-gray-200">{skill.name}</p>
                              </div>
                          ))}
                      </div>
                  </CardContent>
              </Card>
            </section>
            
            <section id="global-footprint">
              <h2 className="text-3xl font-bold font-sans text-deep-navy-900 dark:text-site-white mb-4 flex items-center">
                <Globe className="mr-3 h-6 w-6 text-indigo-500" /> Global Research Footprint
              </h2>
              <p className="font-serif text-md mb-6 text-deep-navy-800/90 dark:text-site-gray-200/90">
                My research spans five continents, involving over a dozen institutions and data partnerships. This
                interactive map highlights key projects where I've applied spatial science, modeling, and AI to solve
                real-world public health challenges—from HIV hotspots in southern Africa to predictive dashboards in
                U.S. urban centers.
              </p>
              <ClientInteractiveMap />
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
