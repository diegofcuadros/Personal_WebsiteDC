"use client"

import { Lightbulb, Users, MapPin, Microscope, Book, Globe, ChevronRight, Target, Award, Building, GraduationCap, Briefcase } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface ExpertiseArea {
  id: string
  title: string
  category: string
  description: string
  keyServices: string[]
  applications: string[]
  industries?: string[]
  highlight?: string
}

const expertiseAreas: ExpertiseArea[] = [
  {
    id: "spatial-epidemiology",
    title: "Disease Mapping & Spatial Epidemiology",
    category: "Public Health Analytics",
    description: "Advanced spatial analysis of disease patterns, outbreak investigation, and epidemiological modeling using cutting-edge GIS technologies and statistical methods.",
    keyServices: [
      "Disease clustering and hotspot analysis",
      "Risk factor mapping and environmental correlation",
      "Temporal-spatial modeling of disease transmission",
      "Public health surveillance system design"
    ],
    applications: [
      "COVID-19 transmission modeling",
      "Vector-borne disease prediction",
      "Healthcare accessibility analysis"
    ],
    industries: ["Health Departments", "WHO/PAHO", "Research Institutions"],
    highlight: "Expertise in modeling complex disease dynamics across multiple scales"
  },
  {
    id: "landscape-ecology",
    title: "Landscape Ecology & Conservation Planning",
    category: "Environmental Science",
    description: "Comprehensive landscape analysis combining ecological principles with spatial technologies to support biodiversity conservation and sustainable land management decisions.",
    keyServices: [
      "Habitat connectivity and fragmentation analysis",
      "Species distribution modeling",
      "Land use change impact assessment",
      "Conservation prioritization and corridor design"
    ],
    applications: [
      "Protected area network optimization",
      "Climate change adaptation planning",
      "Ecosystem service valuation"
    ],
    industries: ["Conservation NGOs", "Government Agencies", "Environmental Consulting"],
    highlight: "Bridging ecological theory with practical conservation outcomes"
  },
  {
    id: "gis-modeling",
    title: "Advanced GIS Modeling & Spatial Analytics",
    category: "Geospatial Technology",
    description: "Sophisticated spatial modeling and analysis services leveraging state-of-the-art GIS technologies, remote sensing, and statistical approaches for complex problem-solving.",
    keyServices: [
      "Custom spatial model development",
      "Multi-criteria decision analysis",
      "Spatial optimization and scenario planning",
      "Remote sensing and image analysis"
    ],
    applications: [
      "Urban planning and smart city initiatives",
      "Natural resource management",
      "Climate impact modeling"
    ],
    industries: ["Urban Planning", "Natural Resources", "Technology Sector"],
    highlight: "Transforming complex spatial problems into actionable insights"
  }
]

const consultingAreas = [
  {
    icon: Microscope,
    title: "Research Design",
    description: "Study design and methodology for spatial health and ecological research"
  },
  {
    icon: Globe,
    title: "International Projects",
    description: "Cross-border collaboration and global health initiatives"
  },
  {
    icon: GraduationCap,
    title: "Capacity Building",
    description: "Training programs and institutional development"
  },
  {
    icon: Building,
    title: "Policy Analysis",
    description: "Evidence-based policy recommendations and impact assessment"
  }
]

function ExpertiseOverview() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true, threshold: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <Card className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950/20 dark:via-slate-900 dark:to-indigo-950/20 border-0 shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <Lightbulb className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold font-sans text-slate-900 dark:text-slate-100">
            Professional Expertise
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg font-serif leading-relaxed text-slate-700 dark:text-slate-300 mb-8 text-center">
              Combining deep expertise in spatial epidemiology, landscape ecology, and GIS technologies to deliver 
              innovative solutions for complex health and environmental challenges worldwide.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {consultingAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="p-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white w-fit mx-auto mb-3">
                    <area.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-sans font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {area.title}
                  </h4>
                  <p className="text-sm font-serif text-slate-700 dark:text-slate-300">
                    {area.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <p className="font-serif text-slate-700 dark:text-slate-300 leading-relaxed">
                With over a decade of experience in academic research and consulting, I provide evidence-based solutions 
                that bridge the gap between cutting-edge science and practical implementation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ExpertiseCard({ expertise, index }: { expertise: ExpertiseArea; index: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true, threshold: 0.2 })

  const gradients = [
    "bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600",
    "bg-gradient-to-br from-rose-600 via-pink-600 to-fuchsia-600",
    "bg-gradient-to-br from-amber-600 via-orange-600 to-red-600"
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
        <CardHeader className={`${gradients[index % gradients.length]} text-white relative`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <div className="mb-4">
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 mb-2">
                {expertise.category}
              </Badge>
              <CardTitle className="text-xl md:text-2xl font-bold font-sans mb-2">
                {expertise.title}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <p className="font-serif text-slate-700 dark:text-slate-300 leading-relaxed">
            {expertise.description}
          </p>
          
          <div>
            <h4 className="font-sans font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center">
              <Target className="h-5 w-5 mr-2 text-teal-500" />
              Key Services
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {expertise.keyServices.map((service, idx) => (
                <div key={idx} className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm font-serif text-slate-700 dark:text-slate-300">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-sans font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center">
              <Award className="h-5 w-5 mr-2 text-purple-500" />
              Applications
            </h4>
            <div className="space-y-2">
              {expertise.applications.map((application, idx) => (
                <div key={idx} className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm font-serif text-slate-700 dark:text-slate-300">
                    {application}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {expertise.industries && (
            <div>
              <h4 className="font-sans font-semibold text-slate-900 dark:text-slate-100 mb-3">
                Target Industries
              </h4>
              <div className="flex flex-wrap gap-2">
                {expertise.industries.map((industry) => (
                  <Badge key={industry} variant="outline" className="text-xs">
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {expertise.highlight && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-4 border-l-4 border-blue-500">
              <h4 className="font-sans font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Specialized Focus
              </h4>
              <p className="text-sm font-serif text-blue-700 dark:text-blue-300">
                {expertise.highlight}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function ExpertiseServicesPage() {
  return (
    <>
      <div className="flex items-center mb-12">
        <GraduationCap className="h-10 w-10 md:h-12 md:w-12 mr-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-sans text-slate-900 dark:text-slate-100">
            Expertise & Services
          </h2>
          <p className="text-sm text-muted-foreground mt-1 font-serif">
            Professional consulting and research services in spatial epidemiology and landscape ecology
          </p>
        </div>
      </div>
      
      {/* Expertise Overview Section */}
      <ExpertiseOverview />
      
      {/* Expertise Areas Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <Microscope className="h-6 w-6" />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-sans text-slate-900 dark:text-slate-100 mb-4">
            Core Expertise Areas
          </h3>
          <p className="text-lg font-serif text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
            Specialized knowledge and practical experience across multiple domains of spatial science and public health
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {expertiseAreas.map((expertise, index) => (
            <ExpertiseCard key={expertise.id} expertise={expertise} index={index} />
          ))}
        </div>
      </div>
      
      {/* Collaboration Statement */}
      <Card className="bg-gradient-to-r from-slate-50 to-stone-50 dark:from-slate-900 dark:to-stone-900 border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white">
              <Users className="h-8 w-8" />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-sans text-slate-900 dark:text-slate-100 mb-4">
            Collaborative Approach
          </h3>
          <p className="font-serif text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto mb-6">
            Every project begins with understanding your unique challenges and objectives. I work closely with clients 
            to develop tailored solutions that leverage cutting-edge spatial technologies while remaining practical 
            and actionable.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="outline" className="text-sm px-4 py-2">Research Institutions</Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">Government Agencies</Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">International Organizations</Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">Private Sector</Badge>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
