"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ChevronDown, MapPin, BookOpen, Award, Globe, Microscope, Heart, Shield, Calendar, ChevronUp, Pause, Play } from "lucide-react"

// Import Leaflet CSS
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

// Add custom CSS for popups
const customCSS = `
  .custom-popup .leaflet-popup-content-wrapper {
    border-radius: 12px;
    padding: 0;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .custom-popup .leaflet-popup-content {
    margin: 0;
    line-height: 1.4;
  }
  .custom-popup .leaflet-popup-tip {
    background: white;
    border: none;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
`

// Inject custom CSS
if (typeof window !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = customCSS
  document.head.appendChild(styleElement)
}

// Import map components directly for better type support
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { LatLngExpression } from "leaflet"

// Study locations organized by theme
const studyLocations = {
  "hiv-theme": [
    { id: 1, position: [-15, 25] as LatLngExpression, title: "HIV clustering in sub-Saharan Africa", year: 2013, journal: "Int J Health Geographics", location: "Sub-Saharan Africa" },
    { id: 2, position: [-6, 35] as LatLngExpression, title: "HIV-malaria co-infection synergy", year: 2011, journal: "Int J Epidemiology", location: "Kenya, Malawi, Tanzania" },
    { id: 4, position: [-29, 31] as LatLngExpression, title: "HIV transmission dynamics (KZN)", year: 2024, journal: "Nature Communications", location: "South Africa" },
    { id: 5, position: [-28.5, 30.8] as LatLngExpression, title: "Population viral load effects", year: 2017, journal: "Science Translational Medicine", location: "South Africa" },
    { id: 6, position: [-13.1, 28] as LatLngExpression, title: "UNAIDS 95-95-95 targets (Zambia)", year: 2023, journal: "BMJ Global Health", location: "Zambia" },
    { id: 7, position: [-19, 29.8] as LatLngExpression, title: "UNAIDS targets progress (Zimbabwe)", year: 2025, journal: "Communications Medicine", location: "Zimbabwe" },
    { id: 15, position: [-10, 35] as LatLngExpression, title: "HIV spatial variability mapping", year: 2017, journal: "Scientific Reports", location: "East Africa" },
    { id: 16, position: [-29.5, 30.5] as LatLngExpression, title: "HIV-NCD convergence", year: 2024, journal: "BMJ Global Health", location: "South Africa" },
    { id: 17, position: [-12, 22] as LatLngExpression, title: "HIV healthcare access mapping", year: 2021, journal: "PLOS Global Public Health", location: "Sub-Saharan Africa" }
  ],
  "covid-theme": [
    { id: 3, position: [0, 20] as LatLngExpression, title: "SARS-CoV-2 genomic surveillance", year: 2021, journal: "Science", location: "Africa (Continental)" },
    { id: 9, position: [39, -98] as LatLngExpression, title: "COVID urban-rural dynamics", year: 2021, journal: "Annals of Epidemiology", location: "United States" }
  ],
  "substance-theme": [
    { id: 8, position: [39, -98] as LatLngExpression, title: "Substance use disorder evolution", year: 2024, journal: "Nature Medicine", location: "United States" }
  ],
  "infectious-theme": [
    { id: 10, position: [-12, -77] as LatLngExpression, title: "Prison TB transmission (Peru)", year: 2024, journal: "Lancet Regional Health", location: "Peru" },
    { id: 11, position: [4, -74] as LatLngExpression, title: "Cutaneous leishmaniasis", year: 2022, journal: "PLOS Neglected Tropical Diseases", location: "Colombia" },
    { id: 13, position: [26, 30] as LatLngExpression, title: "Hepatitis C epidemiology", year: 2014, journal: "BMC Infectious Diseases", location: "Egypt" },
    { id: 14, position: [35, 104] as LatLngExpression, title: "AI-based brucellosis prediction", year: 2017, journal: "Remote Sensing", location: "China" }
  ],
  "ncd-theme": [
    { id: 12, position: [20, 77] as LatLngExpression, title: "Diabetes prevalence variation", year: 2020, journal: "JAMA Network Open", location: "India" },
    { id: 19, position: [-30, 25] as LatLngExpression, title: "Food insecurity & depression", year: 2020, journal: "Scientific Reports", location: "South Africa" },
    { id: 20, position: [-18, 31] as LatLngExpression, title: "Intimate partner violence & HIV", year: 2023, journal: "BMJ Global Health", location: "Zimbabwe" }
  ],
  "methods-theme": [
    { id: 18, position: [30, 0] as LatLngExpression, title: "GeoAI for public health review", year: 2023, journal: "Annals of GIS", location: "Global (Methods)" }
  ]
}

// Map focus points for each chapter
const mapFocusPoints = {
  0: { center: [20, 0] as LatLngExpression, zoom: 2 },      // Opening - global view
  1: { center: [-15, 25] as LatLngExpression, zoom: 3 },   // HIV - Africa focus  
  2: { center: [0, 0] as LatLngExpression, zoom: 2.5 },    // COVID - global
  3: { center: [39, -98] as LatLngExpression, zoom: 4 },   // Substance - USA
  4: { center: [-10, -60] as LatLngExpression, zoom: 3 },  // Infectious - Latin America/Global
  5: { center: [20, 77] as LatLngExpression, zoom: 3 },    // NCDs - India/Africa
  6: { center: [30, 0] as LatLngExpression, zoom: 2.5 },   // Methods - global
  7: { center: [20, 0] as LatLngExpression, zoom: 2 }      // Closing - global view
}

// Map controller component to handle view changes
function MapController({ activeChapter }: { activeChapter: number }) {
  const map = useMap()
  
  useEffect(() => {
    const focus = mapFocusPoints[activeChapter as keyof typeof mapFocusPoints] || mapFocusPoints[0]
    map.setView(focus.center, focus.zoom, { animate: true, duration: 1.5 })
  }, [map, activeChapter])
  
  return null
}

// Thematic story chapters with detailed content
const storyChapters = [
  {
    id: "opening",
    type: "intro",
    title: "A Global Journey Through Spatial Health Research",
    subtitle: "Two Decades of Geographic Intelligence Transforming Public Health",
    theme: "Introduction",
    icon: BookOpen,
    color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
  },
  {
    id: "hiv-theme",
    type: "theme",
    title: "HIV/AIDS Research: Mapping the Epidemic",
    subtitle: "Foundational Work in Spatial HIV Epidemiology",
    theme: "HIV/AIDS",
    studyCount: 9,
    icon: Heart,
    color: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    regions: "Sub-Saharan Africa",
    keyInsight: "Established spatial clustering as essential for HIV prevention targeting"
  },
  {
    id: "covid-theme", 
    type: "theme",
    title: "COVID-19: Pandemic Response",
    subtitle: "Leveraging Geographic Analysis for Crisis Response",
    theme: "COVID-19",
    studyCount: 2,
    icon: Shield,
    color: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
    regions: "Africa, United States",
    keyInsight: "Continental genomic surveillance revealed variant emergence patterns"
  },
  {
    id: "substance-theme",
    type: "theme", 
    title: "Substance Use: America's Overdose Crisis",
    subtitle: "Spatial Analysis of Evolving Drug Epidemics",
    theme: "Substance Use",
    studyCount: 1,
    icon: Globe,
    color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
    regions: "United States",
    keyInsight: "Mapped 15-year evolution identifying 27 shifting overdose hotspots"
  },
  {
    id: "infectious-theme",
    type: "theme",
    title: "Infectious Diseases: Beyond HIV and COVID",
    subtitle: "Tuberculosis, Tropical Diseases, and Emerging Threats",
    theme: "Infectious Diseases",
    studyCount: 4,
    icon: Microscope,
    color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    regions: "Peru, Colombia, Egypt, China",
    keyInsight: "AI-driven prediction of zoonotic outbreaks using satellite data"
  },
  {
    id: "ncd-theme",
    type: "theme",
    title: "Non-communicable Diseases & Social Determinants",
    subtitle: "Expanding Geographic Health Intelligence",
    theme: "NCDs & Social",
    studyCount: 3,
    icon: Heart,
    color: "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800",
    regions: "India, South Africa",
    keyInsight: "Revealed food insecurity-mental health geographic nexus"
  },
  {
    id: "methods-theme",
    type: "theme", 
    title: "Methodological Innovation",
    subtitle: "Advancing Spatial Health Intelligence Tools",
    theme: "Methods",
    studyCount: 1,
    icon: Globe,
    color: "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800",
    regions: "Global",
    keyInsight: "GeoAI integration roadmap for next-generation surveillance"
  },
  {
    id: "closing",
    type: "conclusion",
    title: "Shaping Global Health Through Geographic Intelligence", 
    subtitle: "From Local Insights to Global Impact",
    theme: "Conclusion",
    icon: Award,
    color: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
  }
]

interface StoryMapProps {
  className?: string
}

export default function StoryMap({ className = "" }: StoryMapProps) {
  const [activeChapter, setActiveChapter] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  const totalChapters = storyChapters.length
  const currentChapter = storyChapters[activeChapter]

  // Navigate to specific chapter
  const navigateToChapter = useCallback((chapterIndex: number) => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    const targetScroll = (chapterIndex / totalChapters) * (container.scrollHeight - container.clientHeight)
    
    setIsAutoScrolling(true)
    container.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    })
    
    setTimeout(() => setIsAutoScrolling(false), 1000)
  }, [totalChapters])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault()
          if (activeChapter > 0) {
            navigateToChapter(activeChapter - 1)
          }
          break
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault()
          if (activeChapter < totalChapters - 1) {
            navigateToChapter(activeChapter + 1)
          }
          break
        case 'Home':
          event.preventDefault()
          navigateToChapter(0)
          break
        case 'End':
          event.preventDefault()
          navigateToChapter(totalChapters - 1)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeChapter, totalChapters, navigateToChapter])

  // Hide scroll hint after first interaction
  useEffect(() => {
    if (scrollProgress > 5) {
      setShowScrollHint(false)
    }
  }, [scrollProgress])

  // Handle scroll-based progress and chapter detection
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      if (!scrollContainerRef.current || isAutoScrolling) return
      
      setIsScrolling(true)
      clearTimeout(scrollTimeout)
      
      const scrollContainer = scrollContainerRef.current
      const scrollTop = scrollContainer.scrollTop
      const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight
      const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100))
      
      setScrollProgress(progress)
      
      // Calculate active chapter based on scroll position with better precision
      const exactChapterPosition = (progress / 100) * totalChapters
      const chapterIndex = Math.floor(exactChapterPosition)
      const clampedIndex = Math.max(0, Math.min(totalChapters - 1, chapterIndex))
      
      if (clampedIndex !== activeChapter) {
        setActiveChapter(clampedIndex)
      }

      // Reset scrolling state after delay
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }
    
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll)
        clearTimeout(scrollTimeout)
      }
    }
      }, [activeChapter, totalChapters, isAutoScrolling])

  return (
    <div 
      className={`relative h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-900 ${className}`}
      role="application"
      aria-label="Interactive Research StoryMap"
      tabIndex={0}
    >
      {/* Progress Bar Header */}
      <motion.div 
        className="absolute top-4 left-4 right-4 z-30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-slate-200 dark:border-slate-700 shadow-lg ${currentChapter.color}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <currentChapter.icon className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                <h2 className="font-sans font-bold text-lg text-slate-900 dark:text-slate-100">
                  Global Health Through Geographic Intelligence
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToChapter(Math.max(0, activeChapter - 1))}
                  disabled={activeChapter === 0}
                  className="h-8 w-8 p-0"
                  aria-label="Previous chapter"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <span className="text-sm text-slate-600 dark:text-slate-400 font-mono min-w-[3rem] text-center">
                  {activeChapter + 1} / {totalChapters}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToChapter(Math.min(totalChapters - 1, activeChapter + 1))}
                  disabled={activeChapter === totalChapters - 1}
                  className="h-8 w-8 p-0"
                  aria-label="Next chapter"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Progress 
              value={scrollProgress} 
              className="h-3 mb-3" 
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs font-medium">
                  {currentChapter.theme}
                </Badge>
                {currentChapter.studyCount && (
                  <Badge variant="outline" className="text-xs">
                    {currentChapter.studyCount} Studies
                  </Badge>
                )}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 truncate max-w-md">
                {currentChapter.title}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enhanced Scroll Instruction & Controls */}
      <AnimatePresence>
        {showScrollHint && activeChapter === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          >
            <Card className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-xl">
              <CardContent className="p-4">
                <div className="flex flex-col items-center gap-3 text-center">
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronDown className="h-6 w-6 text-teal-600" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Scroll to explore the journey
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Use ↑↓ keys or mouse wheel • {totalChapters} chapters
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Navigation Aid */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: activeChapter > 0 ? 1 : 0, x: activeChapter > 0 ? 0 : 20 }}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20"
      >
        <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg">
          <CardContent className="p-2">
            <div className="flex flex-col gap-1">
              {storyChapters.map((chapter, index) => (
                <Button
                  key={chapter.id}
                  variant={index === activeChapter ? "default" : "ghost"}
                  size="sm"
                  onClick={() => navigateToChapter(index)}
                  className={`w-8 h-8 p-0 ${index === activeChapter ? 'bg-teal-600 hover:bg-teal-700' : ''}`}
                  aria-label={`Go to ${chapter.title}`}
                  title={chapter.title}
                >
                  <chapter.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Interactive Background Map */}
      <div className="absolute inset-0 z-0">
        {!mapLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-teal-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center z-10">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mb-4"
              >
                <Globe className="h-16 w-16 text-teal-500 mx-auto" />
              </motion.div>
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                Loading Interactive World Map...
              </p>
            </div>
          </div>
        )}
        
        <MapContainer
          center={mapFocusPoints[activeChapter as keyof typeof mapFocusPoints]?.center || [20, 0]}
          zoom={mapFocusPoints[activeChapter as keyof typeof mapFocusPoints]?.zoom || 2}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          dragging={false}
          whenReady={() => setMapLoaded(true)}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            eventHandlers={{
              loading: () => setMapLoaded(false),
              load: () => setMapLoaded(true)
            }}
          />
          <MapController activeChapter={activeChapter} />
          
          {/* Render study markers for current theme with enhanced popups */}
          {currentChapter.id && studyLocations[currentChapter.id as keyof typeof studyLocations]?.map((study) => (
            <Marker key={study.id} position={study.position}>
              <Popup maxWidth={320} className="custom-popup">
                <Card className="border-none shadow-lg bg-white dark:bg-slate-800 max-w-xs">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-teal-600 dark:text-teal-400 leading-tight">
                      {study.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <Calendar className="h-3 w-3 flex-shrink-0" />
                        <span className="font-medium">{study.year}</span>
                        <span>•</span>
                        <span className="italic">{study.journal}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span>{study.location}</span>
                      </div>
                      <Badge variant="outline" className="text-xs mt-2">
                        Study #{study.id}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Scrollable Content */}
              <div
        ref={scrollContainerRef}
        className="absolute inset-0 z-10 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400/50 scrollbar-track-transparent scroll-smooth"
        style={{ height: '100vh' }}
        aria-label="Scrollable story content"
      >
        <div style={{ height: `${totalChapters * 100}vh` }}>
          {storyChapters.map((chapter, index) => (
            <div
              key={chapter.id}
              className="h-screen flex items-center justify-start pl-6 pr-6 md:pl-16 md:pr-16"
            >
              <ChapterContent 
                chapter={chapter} 
                isActive={activeChapter === index}
                chapterIndex={index + 1}
                totalChapters={totalChapters}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ChapterContent({ 
  chapter, 
  isActive,
  chapterIndex,
  totalChapters
}: { 
  chapter: typeof storyChapters[0]
  isActive: boolean
  chapterIndex: number
  totalChapters: number
}) {
  const IconComponent = chapter.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, scale: 0.95 }}
      animate={{ 
        opacity: isActive ? 1 : 0.3, 
        x: isActive ? 0 : -30,
        scale: isActive ? 1 : 0.96
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-4xl"
    >
      <Card className={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-2xl ${chapter.color}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-md">
              <IconComponent className="h-8 w-8 text-teal-600 dark:text-teal-400" />
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-xs font-medium px-3 py-1">
                {chapter.type === "intro" ? "Introduction" : 
                 chapter.type === "conclusion" ? "Conclusion" : 
                 `Research Theme`}
              </Badge>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Chapter {chapterIndex} of {totalChapters}
              </span>
            </div>
          </div>

          <CardTitle className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3 leading-tight">
            {chapter.title}
          </CardTitle>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            {chapter.subtitle}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {chapter.type === "intro" && (
            <div className="space-y-6">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                From HIV hotspots in sub-Saharan Africa to opioid epidemics in rural America, 
                spatial epidemiology reveals the hidden geographic patterns that drive health outcomes. 
                This is the story of <strong>20 groundbreaking studies</strong> that have shaped our understanding 
                of disease, informed global health policy, and saved lives through the power of 
                geographic intelligence.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-white/70 dark:bg-slate-800/70 rounded-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">15+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Countries Studied</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">2011-2025</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Research Period</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">6</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Research Themes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">20</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Publications</div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 text-center italic">
                  "Geographic intelligence transforms health data into actionable insights, 
                  revealing where interventions are needed most."
                </p>
              </div>
            </div>
          )}

          {chapter.type === "theme" && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-white/70 dark:bg-slate-800/70 rounded-xl">
                <MapPin className="h-6 w-6 text-teal-600 flex-shrink-0" />
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-teal-700 dark:text-teal-300 text-lg">
                      {chapter.studyCount} Research Studies
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      in {chapter.regions}
                    </span>
                  </div>
                  {chapter.keyInsight && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                      Key insight: {chapter.keyInsight}
                    </p>
                  )}
                </div>
              </div>
              
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                {chapter.theme === "HIV/AIDS" && 
                  "The foundational body of work that established spatial epidemiology as essential for HIV prevention and control. From identifying transmission hotspots to evaluating the UNAIDS 95-95-95 targets, these studies have guided billions in prevention investments across sub-Saharan Africa, revealing the critical importance of geographic targeting in epidemic response."
                }
                {chapter.theme === "COVID-19" && 
                  "When the pandemic struck, spatial intelligence proved critical for understanding viral transmission patterns, tracking variants, and informing public health responses. Continental-scale genomic surveillance across Africa revealed how SARS-CoV-2 spread and evolved, while urban-rural analysis in the United States identified distinct epidemic dynamics requiring tailored interventions."
                }
                {chapter.theme === "Substance Use" && 
                  "Mapping America's evolving opioid crisis revealed shifting geographic patterns of overdose mortality, identifying new hotspots and vulnerable populations as the epidemic evolved from prescription opioids to heroin to synthetic fentanyl. This 15-year analysis of substance use disorder mortality identified 27 distinct hotspot regions and revealed the epidemic's eastward migration with pronounced racial and geographic disparities."
                }
                {chapter.theme === "Infectious Diseases" && 
                  "Beyond HIV and COVID, spatial analysis tackles diverse infectious disease challenges: tuberculosis transmission networks in Latin American prisons, neglected tropical diseases linked to environmental change in Colombia, hepatitis C elimination in Egypt, and emerging zoonotic threats predicted through artificial intelligence and satellite data in China."
                }
                {chapter.theme === "NCDs & Social" && 
                  "Expanding the geographic lens beyond infectious diseases reveals how non-communicable diseases and social determinants cluster across space. District-level diabetes mapping across India identified hotspots and sociodemographic correlates, while food insecurity analysis in South Africa revealed its geographic relationship with depression risk, demonstrating the complex spatial relationships between social determinants and health outcomes."
                }
                {chapter.theme === "Methods" && 
                  "Advancing the field through methodological innovation, this work integrates artificial intelligence with geographic information systems to create next-generation tools for public health surveillance and epidemic intelligence. The comprehensive review provides a roadmap for GeoAI integration, establishing frameworks for how spatial artificial intelligence will transform future disease surveillance and response."
                }
              </p>

              <div className="p-5 bg-white/70 dark:bg-slate-800/70 rounded-xl">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                  <Microscope className="h-5 w-5 text-teal-600" />
                  Key Contributions & Impact:
                </h4>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  {chapter.theme === "HIV/AIDS" && (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>Established HIV hotspot identification methodologies used globally</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>Revealed co-infection synergies (HIV-malaria) doubling transmission risk</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>Mapped UNAIDS 95-95-95 target progress across countries</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>Integrated HIV-NCD convergent epidemics for health system planning</span>
                      </li>
                    </>
                  )}
                  {chapter.theme === "COVID-19" && (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>Continental-scale genomic surveillance across Africa (Science journal)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>Urban-rural pandemic dynamics revealing distinct transmission patterns</span>
                      </li>
                    </>
                  )}
                  {chapter.theme === "Substance Use" && (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>15-year national overdose evolution mapping (Nature Medicine)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>Identified 27 shifting hotspot regions and racial disparities</span>
                      </li>
                    </>
                  )}
                  {chapter.theme === "Infectious Diseases" && (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>Prison TB transmission networks (Lancet Regional Health)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>Environmental leishmaniasis prediction linked to deforestation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>AI-based zoonotic outbreak forecasting using satellite data</span>
                      </li>
                    </>
                  )}
                  {chapter.theme === "NCDs & Social" && (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>District-level diabetes prevalence mapping across India (JAMA Network Open)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>Food insecurity-mental health geographic nexus in South Africa</span>
                      </li>
                    </>
                  )}
                  {chapter.theme === "Methods" && (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>GeoAI integration roadmap for public health surveillance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>Next-generation frameworks for epidemic intelligence</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}

          {chapter.type === "conclusion" && (
            <div className="space-y-6">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                These 20 studies represent more than academic achievement—they represent <strong>lives saved</strong>, 
                <strong>policies informed</strong>, and <strong>communities protected</strong> through the power of geographic intelligence. 
                From identifying HIV hotspots that guided billion-dollar prevention programs to tracking 
                COVID-19 variants across continents, spatial epidemiology has proven essential for 
                addressing the world's most pressing health challenges.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-white/70 dark:bg-slate-800/70 rounded-xl">
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Research Excellence:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Top-tier Journals:</span>
                      <span className="text-teal-600 dark:text-teal-400 font-semibold">Science, Nature, Lancet</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Geographic Scope:</span>
                      <span className="text-teal-600 dark:text-teal-400 font-semibold">6 continents, 15+ countries</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Global Impact:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Health Conditions:</span>
                      <span className="text-teal-600 dark:text-teal-400 font-semibold">HIV, COVID, TB, NCDs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Future Direction:</span>
                      <span className="text-teal-600 dark:text-teal-400 font-semibold">AI-driven intelligence</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-xl">
                <blockquote className="text-slate-700 dark:text-slate-300 text-center text-lg italic font-medium">
                  "The future of global health lies in understanding not just what diseases affect us, 
                  but where they affect us—and why geography matters for every intervention we design."
                </blockquote>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
} 