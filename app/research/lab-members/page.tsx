"use client"

import { Users, GraduationCap, BookOpen, Award, ChevronDown, ChevronRight, Calendar, MapPin, ExternalLink } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Student {
  name: string
  period: string
  department?: string
  university?: string
  researchInterests?: string
  dissertation?: string
  thesis?: string
  focus?: string
  status?: string
}

interface Section {
  id: string
  title: string
  icon: React.ElementType
  students: Student[]
  color: string
  description?: string
}

const labData: Section[] = [
  {
    id: "current-phd-advisees",
    title: "Current PhD Advisees",
    icon: GraduationCap,
    color: "bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900",
    description: "Doctoral students under direct supervision",
    students: [
      {
        name: "Tuhin Chowdhury",
        period: "2023–present",
        department: "Department of Geography",
        university: "University of Cincinnati",
        researchInterests: "Spatial epidemiology, GIS applications in public health"
      },
      {
        name: "Joseph Okebugwu",
        period: "2023–present",
        department: "Department of Geography",
        university: "University of Cincinnati",
        focus: "Information not publicly available"
      },
      {
        name: "Tolulope Adedoyin",
        period: "2024–present",
        department: "Department of Geography",
        university: "University of Cincinnati",
        researchInterests: "Health geography, spatial epidemiology, disease ecology, and modeling"
      },
      {
        name: "Le Tu",
        period: "2024–present",
        department: "Department of Geography",
        university: "University of Cincinnati",
        focus: "Information not publicly available"
      }
    ]
  },
  {
    id: "current-committee",
    title: "Current PhD Committee Members",
    icon: Users,
    color: "bg-gradient-to-r from-stone-600 via-stone-700 to-stone-800",
    description: "Doctoral students on dissertation committees",
    students: [
      {
        name: "Lora Newman",
        period: "2022–present",
        department: "Department of Mathematics",
        university: "University of Cincinnati",
        status: "PhD Candidate",
        focus: "Information not publicly available"
      },
      {
        name: "Xin Gu",
        period: "2021–present",
        department: "Department of Geography",
        university: "University of Cincinnati",
        status: "PhD Candidate",
        focus: "Information not publicly available"
      }
    ]
  },
  {
    id: "former-phd-advisees",
    title: "Former PhD Advisees",
    icon: Award,
    color: "bg-gradient-to-r from-zinc-600 via-zinc-700 to-zinc-800",
    description: "Successfully graduated doctoral students",
    students: [
      {
        name: "Andres Hernandez",
        period: "2017–2020",
        department: "Department of Geography",
        university: "University of Cincinnati",
        dissertation: "Spatial Modeling of the Social Health Determinants Impact on the Epidemiology of Diseases in Low-, Middle-, and High-income Settings."
      },
      {
        name: "Hana Kim",
        period: "2018–2021",
        department: "Department of Geography",
        university: "University of Cincinnati",
        dissertation: "Spatial Surveillance of Infectious Disease Intervention with Related Factors for a Population Living in Underserved Areas."
      },
      {
        name: "Esteban Correa",
        period: "2018–2021",
        department: "Department of Geography",
        university: "University of Cincinnati",
        dissertation: "Medical Geography in Vulnerable Groups."
      }
    ]
  },
  {
    id: "former-ma-advisees",
    title: "Former MA Advisees",
    icon: BookOpen,
    color: "bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800",
    description: "Successfully graduated master's students",
    students: [
      {
        name: "Tuhin Chowdhury",
        period: "2021–2023",
        department: "Department of Geography",
        university: "University of Cincinnati"
      },
      {
        name: "Santiago Escobar",
        period: "2022–2024",
        department: "Department of Geography",
        university: "University of Cincinnati",
        thesis: "Mapping the Waves: Spatiotemporal Dynamics and Disparities in Substance Use Disorder Mortality Across the United States."
      },
      {
        name: "Chayanika Devi",
        period: "2022–2024",
        department: "Department of Geography",
        university: "University of Cincinnati",
        thesis: "Understanding Spatio-temporal Patterns of COVID-19 in the United States."
      }
    ]
  },
  {
    id: "former-phd-committee",
    title: "Former PhD Committee Members",
    icon: Users,
    color: "bg-gradient-to-r from-neutral-600 via-neutral-700 to-neutral-800",
    description: "Previously served on dissertation committees",
    students: [
      {
        name: "Jingjing Li",
        period: "2017–2020",
        department: "Department of Geography",
        university: "University of Cincinnati",
        dissertation: "Information not publicly available"
      },
      {
        name: "Minxuan Lan",
        period: "2017–2020",
        department: "Department of Geography",
        university: "University of Cincinnati",
        dissertation: "Information not publicly available"
      },
      {
        name: "Zahra Almarhoon",
        period: "2018–2020",
        department: "James L. Winkle College of Pharmacy",
        university: "University of Cincinnati"
      },
      {
        name: "Mohammed Alsultan",
        period: "2020–2022",
        department: "James L. Winkle College of Pharmacy",
        university: "University of Cincinnati",
        dissertation: "Information not publicly available"
      }
    ]
  },
  {
    id: "former-ma-committee",
    title: "Former MA Committee Members",
    icon: BookOpen,
    color: "bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800",
    description: "Previously served on master's thesis committees",
    students: [
      {
        name: "Yang Liu",
        period: "2017–2018",
        department: "Department of Geography",
        university: "University of Cincinnati"
      }
    ]
  }
]

function CollapsibleSection({ section }: { section: Section }) {
  const [isOpen, setIsOpen] = useState(section.id === "current-phd-advisees")
  
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0">
      <CardHeader 
        className={cn(
          "cursor-pointer transition-all duration-300 hover:opacity-90",
          section.color
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <section.icon className="h-6 w-6" />
            <div>
              <CardTitle className="text-lg font-sans">{section.title}</CardTitle>
              {section.description && (
                <p className="text-sm opacity-90 font-serif mt-1">{section.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
              {section.students.length}
            </Badge>
            {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </div>
        </div>
      </CardHeader>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {section.students.map((student, index) => (
                  <motion.div
                    key={student.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                  >
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-sans font-semibold text-lg text-deep-navy-900 dark:text-site-white">
                          {student.name}
                        </h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span className="font-mono">{student.period}</span>
                        </div>
                      </div>
                      
                      {student.status && (
                        <Badge variant="outline" className="w-fit text-xs">
                          {student.status}
                        </Badge>
                      )}
                      
                      {(student.department || student.university) && (
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="font-serif">
                            {student.department && `${student.department}, `}
                            {student.university}
                          </span>
                        </div>
                      )}
                      
                      {student.researchInterests && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-teal-600 dark:text-teal-400">Research Interests:</p>
                          <p className="text-sm font-serif text-deep-navy-800/80 dark:text-site-gray-200/80">
                            {student.researchInterests}
                          </p>
                        </div>
                      )}
                      
                      {student.dissertation && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Dissertation:</p>
                          <p className="text-sm font-serif italic text-deep-navy-800/80 dark:text-site-gray-200/80">
                            "{student.dissertation}"
                          </p>
                        </div>
                      )}
                      
                      {student.thesis && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Thesis:</p>
                          <p className="text-sm font-serif italic text-deep-navy-800/80 dark:text-site-gray-200/80">
                            "{student.thesis}"
                          </p>
                        </div>
                      )}
                      
                      {student.focus && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Focus Areas:</p>
                          <p className="text-sm font-serif text-deep-navy-800/80 dark:text-site-gray-200/80">
                            {student.focus}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export default function LabMembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandAll, setExpandAll] = useState(false)
  
  const filteredData = labData.map(section => ({
    ...section,
    students: section.students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.researchInterests && student.researchInterests.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student.department && student.department.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(section => section.students.length > 0)
  
  const totalStudents = labData.reduce((acc, section) => acc + section.students.length, 0)
  const currentStudents = labData.slice(0, 2).reduce((acc, section) => acc + section.students.length, 0)
  
  return (
    <>
      <div className="flex items-center mb-10">
        <Users className="h-10 w-10 md:h-12 md:w-12 mr-4 text-teal dark:text-vibrant-gold flex-shrink-0" />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-sans text-deep-navy dark:text-site-white">
            Lab Members & Graduate Students
          </h2>
          <p className="text-sm text-muted-foreground mt-1 font-serif">
            Digital Epidemiology Lab & Health Geography and Disease Modeling Laboratory
          </p>
        </div>
      </div>
      
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="border-l-4 border-l-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Students</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{currentStudents}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Alumni</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{totalStudents - currentStudents}</p>
              </div>
              <Award className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-rose-500 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Mentored</p>
                <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">{totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-rose-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Search and Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name, research interests, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setExpandAll(!expandAll)}
          className="whitespace-nowrap"
        >
          {expandAll ? "Collapse All" : "Expand All"}
        </Button>
      </div>
      
      {/* Lab Sections */}
      <div className="space-y-6">
        {(searchTerm ? filteredData : labData).map((section) => (
          <CollapsibleSection key={section.id} section={section} />
        ))}
      </div>
      
      {searchTerm && filteredData.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 font-serif">
            No students found matching your search criteria.
          </p>
        </div>
      )}
      
      {/* Call to Action */}
      <Card className="mt-12 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-950/20 dark:to-blue-950/20 border-0">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-bold font-sans text-deep-navy-900 dark:text-site-white mb-4">
            Interested in Joining Our Lab?
          </h3>
          <p className="font-serif text-deep-navy-800/80 dark:text-site-gray-200/80 mb-6 max-w-2xl mx-auto">
            We welcome motivated students interested in spatial epidemiology, health geography, and disease modeling. 
            Graduate student positions and research opportunities are available.
          </p>
          <Button asChild className="bg-teal-600 hover:bg-teal-700">
            <a href="/contact">
              Get in Touch
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </>
  )
}
