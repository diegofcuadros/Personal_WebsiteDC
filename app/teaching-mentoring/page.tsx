"use client"

import { Presentation, BookOpen, MapPin, Users, Lightbulb, Target, Globe, Microscope, ChevronRight, Quote, GraduationCap, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface Course {
  id: string
  title: string
  code: string
  semester: string
  level: string
  tools: string[]
  description: string
  keyTopics: string[]
  specialFeatures?: string[]
  quote?: string
  capstone?: string
}

const courses: Course[] = [
  {
    id: "gis-public-health",
    title: "GIS and Public Health",
    code: "GEOG 5131/6031",
    semester: "Spring",
    level: "Undergraduate & Graduate",
    tools: ["ArcGIS Pro", "Open Health Datasets"],
    description: "This course explores the intersection of geography, spatial science, and health systems. Students gain a deep understanding of health disparities, disease distribution, and environmental determinants of health, using GIS technologies to map, analyze, and communicate complex spatial health data.",
    keyTopics: [
      "Disease ecology & demographic transitions",
      "Spatial epidemiology & risk mapping",
      "Environmental exposures & health behavior",
      "GIS-based health policy planning"
    ],
    capstone: "Students design and execute a self-directed spatial health study, using real data and ESRI tools to uncover patterns and generate insights.",
    quote: "We don't just map disease—we decode the spatial logic of health itself."
  },
  {
    id: "landscape-ecology",
    title: "Landscape Ecology and GIS",
    code: "GEOG 5015C/6015C / EVST 5015C",
    semester: "Fall",
    level: "Undergraduate & Graduate",
    tools: ["ArcGIS Pro", "Remote Sensing Tools"],
    description: "This interdisciplinary course addresses how landscape patterns shape ecological processes, biodiversity, and ecosystem dynamics. Students learn key principles of landscape ecology, combined with spatial data analytics and conservation strategies.",
    keyTopics: [
      "Spatial statistics & ecological modeling",
      "Human-environment interaction",
      "Landscape metrics & biodiversity",
      "Remote sensing for habitat and disturbance analysis"
    ],
    specialFeatures: [
      "Interpolating oxygen levels in Chesapeake Bay",
      "Modeling road impacts on deforestation in the Amazon",
      "Timber harvest planning using spatial optimization"
    ]
  }
]

const philosophyPoints = [
  {
    icon: Target,
    title: "Theory Integration",
    description: "Seamlessly blend theoretical foundations with practical applications"
  },
  {
    icon: Globe,
    title: "Spatial Analytics",
    description: "Hands-on experience with cutting-edge spatial analysis tools"
  },
  {
    icon: Lightbulb,
    title: "Real-World Applications",
    description: "Connect classroom learning to professional practice"
  },
  {
    icon: Users,
    title: "Experiential Learning",
    description: "Research-based projects and open data exploration"
  }
]

function TeachingPhilosophy() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true, threshold: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <Card className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/20 dark:via-slate-900 dark:to-purple-950/20 border-0 shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <Lightbulb className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold font-sans text-deep-navy-900 dark:text-site-white">
            Teaching Philosophy
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg font-serif leading-relaxed text-deep-navy-800/90 dark:text-site-gray-200/90 mb-8 text-center">
              My teaching philosophy centers on integrating theory, hands-on spatial analytics, and real-world applications. 
              I design my courses to empower students with analytical thinking, spatial problem-solving skills, and GIS proficiency, 
              all within the context of public health, landscape ecology, and data science.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {philosophyPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="p-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white w-fit mx-auto mb-3">
                    <point.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-sans font-semibold text-deep-navy-900 dark:text-site-white mb-2">
                    {point.title}
                  </h4>
                  <p className="text-sm font-serif text-deep-navy-700/80 dark:text-site-gray-300/80">
                    {point.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
              <p className="font-serif text-deep-navy-800/90 dark:text-site-gray-200/90 leading-relaxed">
                I emphasize experiential learning through research-based projects, open data exploration, and GIS modeling, 
                preparing students for both academic research and applied roles in government, NGOs, and the private sector.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true, threshold: 0.2 })

  const gradients = [
    "bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600",
    "bg-gradient-to-br from-rose-600 via-pink-600 to-fuchsia-600"
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
        <CardHeader className={`${gradients[index]} text-white relative`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 mb-2">
                  {course.code}
                </Badge>
                <CardTitle className="text-xl md:text-2xl font-bold font-sans mb-2">
                  {course.title}
                </CardTitle>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90 font-medium">{course.semester}</p>
                <p className="text-xs opacity-80">{course.level}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {course.tools.map((tool) => (
                <Badge key={tool} variant="secondary" className="bg-white/20 text-white hover:bg-white/30 text-xs">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <p className="font-serif text-deep-navy-800/80 dark:text-site-gray-200/80 leading-relaxed">
            {course.description}
          </p>
          
          <div>
            <h4 className="font-sans font-semibold text-deep-navy-900 dark:text-site-white mb-3 flex items-center">
              <Target className="h-5 w-5 mr-2 text-teal-500" />
              Key Topics
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {course.keyTopics.map((topic, idx) => (
                <div key={idx} className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm font-serif text-deep-navy-700/80 dark:text-site-gray-300/80">
                    {topic}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {course.specialFeatures && (
            <div>
              <h4 className="font-sans font-semibold text-deep-navy-900 dark:text-site-white mb-3 flex items-center">
                <Award className="h-5 w-5 mr-2 text-purple-500" />
                Signature Assignments
              </h4>
              <div className="space-y-2">
                {course.specialFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm font-serif text-deep-navy-700/80 dark:text-site-gray-300/80">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {course.capstone && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-4 border-l-4 border-blue-500">
              <h4 className="font-sans font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Capstone Project
              </h4>
              <p className="text-sm font-serif text-blue-700/80 dark:text-blue-300/80">
                {course.capstone}
              </p>
            </div>
          )}
          
          {course.quote && (
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <Quote className="h-6 w-6 text-slate-400 mb-2" />
              <p className="font-serif italic text-slate-700 dark:text-slate-300 text-center">
                "{course.quote}"
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function TeachingMentoringPage() {
  return (
    <>
      <div className="flex items-center mb-12">
        <Presentation className="h-10 w-10 md:h-12 md:w-12 mr-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-sans text-deep-navy dark:text-site-white">
            Teaching & Mentoring
          </h2>
          <p className="text-sm text-muted-foreground mt-1 font-serif">
            Empowering the next generation of spatial scientists and public health researchers
          </p>
        </div>
      </div>
      
      {/* Teaching Philosophy Section */}
      <TeachingPhilosophy />
      
      {/* Courses Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <BookOpen className="h-6 w-6" />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-sans text-deep-navy-900 dark:text-site-white mb-4">
            Courses Taught
          </h3>
          <p className="text-lg font-serif text-deep-navy-700/80 dark:text-site-gray-300/80 max-w-2xl mx-auto">
            Comprehensive curriculum designed to bridge theoretical knowledge with practical spatial analysis skills
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>
      
      {/* Outcome Statement */}
      <Card className="bg-gradient-to-r from-slate-50 to-stone-50 dark:from-slate-900 dark:to-stone-900 border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white">
              <Users className="h-8 w-8" />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-sans text-deep-navy-900 dark:text-site-white mb-4">
            Student Outcomes
          </h3>
          <p className="font-serif text-deep-navy-800/80 dark:text-site-gray-200/80 leading-relaxed max-w-3xl mx-auto mb-6">
            Students leave with practical GIS skills, an ecological mindset, and the ability to analyze and solve 
            real-world landscape challenges. They are prepared for both academic research and applied roles in 
            government, NGOs, and the private sector.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="outline" className="text-sm px-4 py-2">Academic Research</Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">Government Positions</Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">NGO Leadership</Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">Private Sector</Badge>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
