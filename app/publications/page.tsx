"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Link as LinkIcon, Search, Tag, PresentationIcon, Microscope, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { allPublications } from "@/data/publications"
const uniqueTags = ["All Topics", ...Array.from(new Set(allPublications.flatMap(pub => pub.tags)))]

const featuredPresentations = [
  {
    year: 2024,
    title: "Evolution of HIV Transmission Networks in Rural South Africa, 25th International AIDS Conference",
  },
  { year: 2023, title: "Progress Toward UNAIDS 95-95-95 Targets in Zimbabwe, ICASA 2023" },
  { year: 2022, title: "Collision of HIV and NCD Epidemics, 24th International AIDS Conference" },
  { year: 2018, title: "Geographical HIV Hotspots and Epidemic Spread, CROI" },
  { year: 2017, title: "The HIV Epidemic in SSA: From Social Networks to Maps, Disease Modeling Symposium" },
]

const ongoingProjects = [
  {
    title: "Changing Face of HIV Epidemic",
    funder: "NIH",
    period: "2023–2027",
    role: "Co-I",
    amount: "$388k",
    description: "Investigating the spatial evolution of HIV risk in marginalized populations.",
  },
  {
    title: "Precision Public Health RTRI",
    funder: "NIH",
    period: "2023–2027",
    role: "Co-I",
    amount: "$270k",
    description: "AI-driven dashboards for real-time epidemiological tracking in urban settings.",
  },
]

function PublicationsPageContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("query") ?? "")
  const [selectedTag, setSelectedTag] = useState("All Topics")

  useEffect(() => {
    const query = searchParams.get("query") ?? ""
    if (query !== searchQuery) {
      setSearchQuery(query)
    }
  }, [searchParams, searchQuery])

  const filteredPublications = useMemo(() => {
    return allPublications.filter(pub => {
      const matchesSearch = 
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.journal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesTag = selectedTag === "All Topics" || pub.tags.includes(selectedTag)
      
      return matchesSearch && matchesTag
    })
  }, [searchQuery, selectedTag])

  return (
    <div className="min-h-screen bg-site-white dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-sans bg-clip-text text-transparent bg-gradient-to-r from-deep-navy via-teal to-vibrant-gold dark:from-slate-100 dark:via-teal-400 dark:to-yellow-400 mb-4">
            Research Publications
          </h1>
          <p className="text-lg font-serif text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            Selected peer-reviewed research and preprints from a portfolio of more than 100 publications spanning AI-human interaction, agent systems, digital epidemiology, spatial analytics, and infectious disease modeling.
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search by title, author, or journal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-sans bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-sans">
              <Tag className="h-4 w-4" />
              <span className="text-sm font-medium">Filter by topic:</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {uniqueTags.map(tag => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className={`font-sans text-xs transition-all duration-200 ${
                  selectedTag === tag
                    ? "bg-teal-600 hover:bg-teal-700 text-white dark:bg-teal-500 dark:hover:bg-teal-600"
                    : "text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-teal-50 dark:hover:bg-slate-800"
                }`}
              >
                {tag}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-6 text-center"
        >
          <p className="text-slate-600 dark:text-slate-400 font-sans">
            Selected publications, for a full list of publications please visit my{" "}
            <a 
              href="https://scholar.google.com/citations?user=zMoJ8n4AAAAJ&hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold underline transition-colors"
            >
              Google Scholar
            </a>
          </p>
        </motion.div>

        {/* Publications List */}
        <motion.div layout className="space-y-6 max-w-6xl mx-auto">
          <AnimatePresence>
            {filteredPublications.map((pub, index) => (
              <motion.div
                key={pub.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="w-full"
              >
                <Card className="h-full flex flex-col md:flex-row items-center overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-xl dark:hover:shadow-2xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg shadow-md">
                  <div className="w-full md:w-1/3 h-64 md:h-48 relative overflow-hidden">
                    <Image
                      src={pub.imageUrl}
                      alt={pub.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  <div className="w-full md:w-2/3 p-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {pub.tags.map(tag => (
                          <Badge 
                            key={tag} 
                            variant="secondary" 
                            className="font-sans text-xs bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 border-0"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-xl font-bold font-sans text-slate-900 dark:text-slate-100 mb-3 leading-tight hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                        {pub.title}
                      </CardTitle>
                      <CardDescription className="text-sm font-serif text-slate-700 dark:text-slate-300 mb-2 leading-relaxed">
                        {pub.authors} ({pub.year})
                      </CardDescription>
                      <div className="text-sm font-serif italic text-slate-600 dark:text-slate-400 mb-4">
                        {pub.journal}
                      </div>
                      {pub.summary && (
                        <div className="text-sm font-serif text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                          {pub.summary}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-end mt-auto pt-2">
                      <Button 
                        asChild 
                        variant="link" 
                        className="px-0 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold font-sans flex-shrink-0"
                      >
                        <a href={pub.links[0].href} target="_blank" rel="noopener noreferrer">
                          Read Paper <LinkIcon className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No results message */}
        {filteredPublications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="h-16 w-16 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold font-sans text-slate-900 dark:text-slate-100 mb-2">No publications found</h3>
            <p className="text-slate-600 dark:text-slate-400 font-serif">
              Try adjusting your search terms or filter criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function PublicationsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-site-white dark:bg-slate-900">
          <div className="container mx-auto px-4 py-8">
            <p className="text-center text-slate-600 dark:text-slate-400">Loading publications...</p>
          </div>
        </div>
      }
    >
      <PublicationsPageContent />
    </Suspense>
  )
}



