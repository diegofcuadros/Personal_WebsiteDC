"use client"

import { Mic, Video, Presentation, Globe, Calendar, ExternalLink, ChevronRight, Target, Award, Quote, Users, BookOpen, Tv, Newspaper } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import Link from "next/link"
import YouTubeEmbed from "@/components/youtube-embed"

interface MediaItem {
  id: string
  type: "interview" | "podcast" | "webinar" | "documentary"
  title: string
  outlet: string
  date: string
  description: string
  topics: string[]
  link?: string
  highlight?: string
}

interface TalkItem {
  id: string
  type: "keynote" | "invited" | "conference" | "workshop"
  title: string
  event: string
  location: string
  date: string
  description: string
  audience: string
  keyPoints: string[]
  impact?: string
}

interface MediaHighlight {
  type: string
  outlet: string
  title: string
  date: string
  description: string
  icon: React.ElementType
  link?: string
}

interface FeaturedVideo {
  videoId: string
  title: string
  description: string
}

const mediaAppearances: MediaItem[] = [
  {
    id: "tv-interview-covid",
    type: "interview",
    title: "Spatial Modeling of COVID-19 Transmission Patterns",
    outlet: "Local Health Network TV",
    date: "March 2021",
    description: "Discussed the application of spatial epidemiological methods to understand COVID-19 spread patterns and inform public health interventions.",
    topics: ["Spatial Epidemiology", "Disease Modeling", "Public Health Policy"],
    highlight: "Reached over 50,000 viewers across Ohio region"
  },
  {
    id: "podcast-landscape",
    type: "podcast",
    title: "Conservation Through Spatial Science",
    outlet: "EcoScience Today Podcast",
    date: "September 2022",
    description: "Deep-dive conversation about landscape ecology applications in conservation planning and biodiversity protection strategies.",
    topics: ["Landscape Ecology", "Conservation", "GIS Applications"],
    link: "https://example.com/podcast",
    highlight: "Featured in top environmental science podcasts of the month"
  },
  {
    id: "webinar-gis",
    type: "webinar",
    title: "Advanced GIS Techniques for Health Research",
    outlet: "International GIS Consortium",
    date: "November 2023",
    description: "Technical presentation on cutting-edge GIS methodologies for spatial health analysis and epidemiological research.",
    topics: ["GIS Methodology", "Spatial Analysis", "Health Research"],
    link: "https://example.com/webinar"
  }
]

const presentations: TalkItem[] = [
  {
    id: "keynote-aag",
    type: "keynote",
    title: "The Future of Spatial Epidemiology: Integrating AI and Traditional Methods",
    event: "American Association of Geographers Annual Meeting",
    location: "Denver, Colorado",
    date: "April 2023",
    description: "Explored emerging trends in spatial epidemiology, highlighting the integration of artificial intelligence with established spatial analysis methods.",
    audience: "Academic researchers and practitioners",
    keyPoints: [
      "AI-enhanced disease prediction models",
      "Integration challenges and opportunities",
      "Future research directions in spatial health"
    ],
    impact: "Influenced emerging research directions in the field"
  },
  {
    id: "invited-who",
    type: "invited",
    title: "Spatial Approaches to Global Health Surveillance",
    event: "WHO Expert Panel on Spatial Health",
    location: "Geneva, Switzerland",
    date: "January 2024",
    description: "Presented recommendations for implementing spatial surveillance systems in resource-limited settings for improved disease monitoring.",
    audience: "International health policy makers",
    keyPoints: [
      "Cost-effective surveillance strategies",
      "Technology transfer considerations",
      "Capacity building frameworks"
    ],
    impact: "Contributed to WHO guidelines on spatial health surveillance"
  },
  {
    id: "conference-giscience",
    type: "conference",
    title: "Landscape Connectivity Modeling for Climate Adaptation",
    event: "GIScience International Conference",
    location: "Vienna, Austria",
    date: "September 2023",
    description: "Demonstrated novel approaches to modeling landscape connectivity under changing climate conditions for wildlife conservation planning.",
    audience: "GIS researchers and conservation scientists",
    keyPoints: [
      "Climate-informed connectivity models",
      "Multi-species corridor design",
      "Uncertainty quantification methods"
    ]
  }
]

const mediaHighlights: MediaHighlight[] = [
  {
    type: "Interview",
    outlet: "WVXU (Cincinnati NPR)",
    title: "Coronavirus hitting rural communities hard",
    date: "November 2020",
    description: "Discussed findings on the COVID-19 surge in rural areas and the need for attention to rural healthcare.",
    icon: Mic,
    link: "https://www.uc.edu/news/articles/2020/11/wvxu-coronavirus-hitting-rural-communities-hard.html"
  },
  {
    type: "Magazine Feature",
    outlet: "UC Magazine",
    title: "Championing science amid adversity",
    date: "2020",
    description: "Profile on Dr. Cuadros's approach to communicating data and research on HIV & COVID-19, even when politically sensitive.",
    icon: Newspaper,
    link: "https://www.uc.edu/news/1020/championing-science.html"
  },
  {
    type: "Thought Leader Interview",
    outlet: "News-Medical.net",
    title: "Mapping access to HIV care",
    date: "December 2021",
    description: "Explained research on geolocating populations with HIV and measuring travel times to health facilities in Africa to identify underserved areas.",
    icon: Mic,
    link: "https://www.news-medical.net/news/20211223/Mapping-access-to-HIV-care.aspx"
  },
  {
    type: "UC News Feature",
    outlet: "UC News",
    title: "Epicenter of opioid epidemic shifts with drug preferences",
    date: "April 2025",
    description: "Covered the Lancet Regional Health study on the evolving U.S. opioid epidemic, co-authored by Dr. Cuadros.",
    icon: Newspaper,
    link: "https://www.uc.edu/news/articles/2025/04/epicenter-of-opioid-epidemic-shifts-with-drug-preferences.html"
  }
]

const featuredTalksVideos: FeaturedVideo[] = [
  {
    videoId: "PMbXTsILMFg",
    title: "Insights into Digital Epidemiology", 
    description: "A discussion on the evolving field of digital epidemiology."
  },
  {
    videoId: "qBsfVJ8qYU4",
    title: "The Role of Data in Public Health",
    description: "Exploring how data analytics shapes public health strategies."
  },
  {
    videoId: "Wk9SSwgkuDY",
    title: "Modeling Infectious Diseases",
    description: "An overview of techniques used in modeling disease spread."
  }
]

const talkTypes = [
  { name: "American Association of Geographers (AAG) Annual Meeting", icon: Tv },
  { name: "International AIDS Conferences", icon: Tv },
  { name: "Epidemiology Congresses", icon: Tv },
  { name: "Digital Futures Flashpoint Series (UC)", icon: Tv }
]

const expertiseAreas = [
  {
    icon: Mic,
    title: "Media Interviews",
    description: "Expert commentary on spatial health and environmental topics"
  },
  {
    icon: Presentation,
    title: "Conference Speaking",
    description: "Keynote and invited presentations at international venues"
  },
  {
    icon: Video,
    title: "Educational Content",
    description: "Webinars and workshops for professional development"
  },
  {
    icon: Globe,
    title: "Public Outreach",
    description: "Science communication for diverse audiences"
  }
]

function MediaOverview() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true, threshold: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <Card className="bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950/20 dark:via-slate-900 dark:to-pink-950/20 border-0 shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <Mic className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold font-sans text-slate-900 dark:text-slate-100">
            Media & Public Engagement
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg font-serif leading-relaxed text-slate-700 dark:text-slate-300 mb-8 text-center">
              Sharing insights and engaging with the public, policymakers, and the scientific community through 
              media appearances, conference presentations, and educational outreach initiatives.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {expertiseAreas.map((area, index) => (
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
            
            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
              <p className="font-serif text-slate-700 dark:text-slate-300 leading-relaxed">
                Leveraging data science and epidemiological methods to drive public health innovation and impact 
                through clear, engaging communication across multiple platforms and audiences.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function MediaCard({ media, index }: { media: MediaItem; index: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true, threshold: 0.2 })

  const gradients = [
    "bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600",
    "bg-gradient-to-br from-rose-600 via-pink-600 to-fuchsia-600",
    "bg-gradient-to-br from-amber-600 via-orange-600 to-red-600"
  ]

  const typeIcons = {
    interview: Video,
    podcast: Mic,
    webinar: Presentation,
    documentary: Video
  }

  const TypeIcon = typeIcons[media.type]

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
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <TypeIcon className="h-5 w-5 mr-2" />
                  <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 capitalize">
                    {media.type}
                  </Badge>
                </div>
                <CardTitle className="text-xl md:text-2xl font-bold font-sans mb-2">
                  {media.title}
                </CardTitle>
              </div>
              <div className="text-right ml-4">
                <p className="text-sm opacity-90 font-medium">{media.outlet}</p>
                <p className="text-xs opacity-80">{media.date}</p>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <p className="font-serif text-slate-700 dark:text-slate-300 leading-relaxed">
            {media.description}
          </p>
          
          <div>
            <h4 className="font-sans font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center">
              <Target className="h-5 w-5 mr-2 text-teal-500" />
              Topics Covered
            </h4>
            <div className="flex flex-wrap gap-2">
              {media.topics.map((topic) => (
                <Badge key={topic} variant="outline" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
          
          {media.highlight && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-4 border-l-4 border-blue-500">
              <h4 className="font-sans font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Impact
              </h4>
              <p className="text-sm font-serif text-blue-700 dark:text-blue-300">
                {media.highlight}
              </p>
            </div>
          )}
          
          {media.link && (
            <Button asChild variant="outline" className="w-full">
              <a href={media.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Media
              </a>
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

function TalkCard({ talk, index }: { talk: TalkItem; index: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true, threshold: 0.2 })

  const gradients = [
    "bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600",
    "bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600",
    "bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600"
  ]

  const typeIcons = {
    keynote: Presentation,
    invited: Globe,
    conference: Users,
    workshop: BookOpen
  }

  const TypeIcon = typeIcons[talk.type]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
        <CardHeader className={`${gradients[index % gradients.length]} text-white relative`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <TypeIcon className="h-5 w-5 mr-2" />
                  <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 capitalize">
                    {talk.type}
                  </Badge>
                </div>
                <CardTitle className="text-xl md:text-2xl font-bold font-sans mb-2">
                  {talk.title}
                </CardTitle>
              </div>
              <div className="text-right ml-4">
                <p className="text-sm opacity-90 font-medium">{talk.date}</p>
                <p className="text-xs opacity-80">{talk.location}</p>
              </div>
            </div>
            <p className="text-sm opacity-90">{talk.event}</p>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <p className="font-serif text-slate-700 dark:text-slate-300 leading-relaxed">
            {talk.description}
          </p>
          
          <div>
            <h4 className="font-sans font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center">
              <Target className="h-5 w-5 mr-2 text-teal-500" />
              Key Points
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {talk.keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm font-serif text-slate-700 dark:text-slate-300">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <h4 className="font-sans font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Target Audience
            </h4>
            <p className="text-sm font-serif text-slate-700 dark:text-slate-300">
              {talk.audience}
            </p>
          </div>
          
          {talk.impact && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg p-4 border-l-4 border-green-500">
              <h4 className="font-sans font-semibold text-green-700 dark:text-green-300 mb-2 flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Impact
              </h4>
              <p className="text-sm font-serif text-green-700 dark:text-green-300">
                {talk.impact}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

function MediaHighlightCard({ media, index }: { media: MediaHighlight; index: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true, threshold: 0.2 })

  const gradients = [
    "bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600",
    "bg-gradient-to-br from-rose-600 via-pink-600 to-fuchsia-600",
    "bg-gradient-to-br from-amber-600 via-orange-600 to-red-600",
    "bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600"
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
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <media.icon className="h-5 w-5 mr-2" />
                  <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                    {media.type}
                  </Badge>
                </div>
                <CardTitle className="text-xl md:text-2xl font-bold font-sans mb-2">
                  {media.title}
                </CardTitle>
              </div>
              <div className="text-right ml-4">
                <p className="text-sm opacity-90 font-medium">{media.outlet}</p>
                <p className="text-xs opacity-80">{media.date}</p>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <p className="font-serif text-slate-700 dark:text-slate-300 leading-relaxed">
            {media.description}
          </p>
          
          {media.link && (
            <Button asChild variant="outline" className="w-full">
              <Link href={media.link} target="_blank">
                <ExternalLink className="h-4 w-4 mr-2" />
                Read More
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function MediaTalksPage() {
  return (
    <>
      <div className="flex items-center mb-12">
        <Mic className="h-10 w-10 md:h-12 md:w-12 mr-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-sans text-slate-900 dark:text-slate-100">
            Media & Talks
          </h2>
          <p className="text-sm text-muted-foreground mt-1 font-serif">
            Sharing insights and engaging with the public, policymakers, and the scientific community
          </p>
        </div>
      </div>
      
      {/* Media Overview Section */}
      <MediaOverview />
      
      {/* Media Highlights Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white">
              <Video className="h-6 w-6" />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-sans text-slate-900 dark:text-slate-100 mb-4">
            Media Highlights
          </h3>
          <p className="text-lg font-serif text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
            Recent media appearances and features showcasing research insights and public health expertise
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mediaHighlights.map((media, index) => (
            <MediaHighlightCard key={media.title} media={media} index={index} />
          ))}
        </div>
      </div>
      
      {/* Conference Presentations Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
              <Presentation className="h-6 w-6" />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-sans text-slate-900 dark:text-slate-100 mb-4">
            Talks & Presentations
          </h3>
          <p className="text-lg font-serif text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mb-6">
            Dr. Cuadros frequently presents his research at national and international conferences, workshops, and
            public forums. Key venues include:
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {talkTypes.map((type) => (
            <div key={type.name} className="flex items-center p-3 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
              <type.icon className="h-5 w-5 mr-2 text-teal-600 dark:text-teal-400" />
              <span className="font-sans text-sm text-slate-800 dark:text-slate-200">{type.name}</span>
            </div>
          ))}
        </div>
        
        <p className="font-serif text-lg text-center text-slate-700 dark:text-slate-300 mb-12">
          (A detailed talks timeline will be added here.)
        </p>

        <div className="text-center mb-12">
          <h4 className="text-2xl font-bold font-sans text-slate-900 dark:text-slate-100 mb-6">
            Featured Talks (Videos)
          </h4>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTalksVideos.map((item) => (
            <div key={item.videoId} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
              <YouTubeEmbed videoId={item.videoId} className="rounded-md overflow-hidden mb-4" />
              <h4 className="text-lg font-semibold font-sans text-slate-900 dark:text-slate-100 mb-1">{item.title}</h4>
              <p className="text-xs font-serif text-slate-700 dark:text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Speaking Engagement Info */}
      <Card className="bg-gradient-to-r from-slate-50 to-stone-50 dark:from-slate-900 dark:to-stone-900 border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white">
              <Globe className="h-8 w-8" />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-sans text-slate-900 dark:text-slate-100 mb-4">
            Interested in collaboration or consulting?
          </h3>
          <p className="font-serif text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto mb-6">
            Let's talk about how we can leverage data to solve complex health challenges together.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="outline" className="text-sm px-4 py-2">Academic Conferences</Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">Industry Workshops</Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">Public Health Forums</Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">Media Interviews</Badge>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
