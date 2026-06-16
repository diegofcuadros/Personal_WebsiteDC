"use client"

import { Users, GraduationCap, BookOpen, Award, ChevronDown, ChevronRight, Calendar, MapPin, ExternalLink, type LucideIcon } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { labData, type LabSection, type LabSectionIconKey } from "@/data/labMembers"

const labSectionIconMap: Record<LabSectionIconKey, LucideIcon> = {
  graduationCap: GraduationCap,
  users: Users,
  award: Award,
  bookOpen: BookOpen,
}

function CollapsibleSection({
  section,
  isOpen,
  onToggle,
}: {
  section: LabSection
  isOpen: boolean
  onToggle: () => void
}) {
  const Icon = labSectionIconMap[section.icon]

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0">
      <CardHeader 
        className={cn(
          "cursor-pointer transition-all duration-300 hover:opacity-90",
          section.color
        )}
        onClick={onToggle}
      >
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <Icon className="h-6 w-6" />
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
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => Object.fromEntries(labData.map((section) => [section.id, section.id === "current-phd-advisees"]))
  )
  
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
  const displayedData = searchTerm ? filteredData : labData
  const allDisplayedOpen = displayedData.length > 0 && displayedData.every((section) => openSections[section.id])

  const toggleDisplayedSections = () => {
    const nextOpenState = !allDisplayedOpen

    setOpenSections((current) => ({
      ...current,
      ...Object.fromEntries(displayedData.map((section) => [section.id, nextOpenState])),
    }))
  }
  
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
          onClick={toggleDisplayedSections}
          className="whitespace-nowrap"
        >
          {allDisplayedOpen ? "Collapse All" : "Expand All"}
        </Button>
      </div>
      
      <div className="space-y-6">
        {displayedData.map((section) => (
          <CollapsibleSection
            key={section.id}
            section={section}
            isOpen={Boolean(openSections[section.id])}
            onToggle={() =>
              setOpenSections((current) => ({
                ...current,
                [section.id]: !current[section.id],
              }))
            }
          />
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