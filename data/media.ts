import { contentOverrides } from "./contentOverrides"

export type MediaType = "interview" | "podcast" | "webinar" | "documentary"
export type TalkType = "keynote" | "invited" | "conference" | "workshop"
export type MediaIconKey = "mic" | "newspaper" | "presentation" | "video" | "globe" | "tv"

export type MediaItem = {
  id: string
  type: MediaType
  title: string
  outlet: string
  date: string
  description: string
  topics: string[]
  link?: string
  highlight?: string
}

export type TalkItem = {
  id: string
  type: TalkType
  title: string
  event: string
  location: string
  date: string
  description: string
  audience: string
  keyPoints: string[]
  impact?: string
}

export type MediaHighlight = {
  type: string
  outlet: string
  title: string
  date: string
  description: string
  icon: MediaIconKey
  link?: string
}

export type FeaturedVideo = {
  videoId: string
  title: string
  description: string
}

export type TalkVenue = {
  name: string
  icon: MediaIconKey
}

export type MediaEngagementArea = {
  icon: MediaIconKey
  title: string
  description: string
}

const mediaAppearancesBase: MediaItem[] = [
  {
    id: "putting-mental-health-on-the-map",
    type: "interview",
    title: "Putting Mental Health on the Map",
    outlet: "UC Digital Futures",
    date: "2023",
    description: "Feature on geospatial methods for identifying mental health needs and connecting spatial analytics with public health response.",
    topics: ["Mental Health", "Spatial Epidemiology", "Public Health Equity"],
    link: "https://ucdigitalfutures.com/putting-mental-health-on-the-map/",
  },
  {
    id: "digital-divide-health-care",
    type: "interview",
    title: "Narrowing the Digital Divide for Health Care",
    outlet: "UC News",
    date: "March 2023",
    description: "Covered research on how digital access shapes healthcare access, telehealth opportunity, and public health equity across underserved communities.",
    topics: ["Digital Health", "Health Equity", "Healthcare Access"],
    link: "https://www.uc.edu/news/articles/2023/03/us-technology-gap-means-more-americans-will-have-less-access-to-health-care.html",
  },
  {
    id: "vulnerable-populations",
    type: "interview",
    title: "UC Research Helps Identify Vulnerable Populations",
    outlet: "UC News",
    date: "February 2023",
    description: "Feature on spatial methods for identifying vulnerable populations and informing targeted public health planning.",
    topics: ["Vulnerability Mapping", "Spatial Epidemiology", "Public Health Planning"],
    link: "https://www.uc.edu/news/articles/2023/02/uc-research-helps-identify-vulnerable-populations.html",
  },
]

const presentationsBase: TalkItem[] = [
  {
    id: "idi-uganda-2025",
    type: "invited",
    title: "Uncovering the Hidden Geography of HIV: From Prevalence Hotspots to Gaps in Care",
    event: "Research Forum, Infectious Disease Institute",
    location: "Uganda",
    date: "2025",
    description: "Invited research forum presentation on moving from HIV prevalence hotspots toward care cascade gaps and more actionable geospatial targeting.",
    audience: "Infectious disease researchers, public health practitioners, and implementation partners",
    keyPoints: [
      "HIV hotspot interpretation",
      "Care-cascade mapping",
      "Translation from geospatial evidence to program decisions",
    ],
    impact: "Advanced the lab's transition from hotspot description toward decision-oriented HIV care analytics.",
  },
  {
    id: "jkuat-kenya-2024",
    type: "invited",
    title: "Assessing the Role of Geographical HIV Hotspots in the Spread of the Epidemic",
    event: "Mathematical and Physical Sciences Conference",
    location: "Jomo Kenyatta University of Agriculture and Technology, Kenya",
    date: "2024",
    description: "Presented mathematical and spatial epidemiology work on the role of geographic HIV hotspots in epidemic persistence and spread.",
    audience: "Mathematical sciences, epidemiology, and public health researchers",
    keyPoints: [
      "Geographic concentration of risk",
      "Transmission dynamics",
      "Precision intervention planning",
    ],
  },
  {
    id: "pangea-2024",
    type: "conference",
    title: "Evolution of HIV Transmission Networks in Rural South Africa",
    event: "PANGEA Meeting",
    location: "2024 Meeting",
    date: "2024",
    description: "Presented work on the evolution of HIV transmission networks and the interpretation of changing epidemic structure in rural South Africa.",
    audience: "HIV molecular epidemiology and transmission network researchers",
    keyPoints: [
      "Transmission network evolution",
      "Rural HIV dynamics",
      "Spatial and genetic epidemiological interpretation",
    ],
  },
]

const mediaHighlightsBase: MediaHighlight[] = [
  {
    type: "Interview",
    outlet: "UC Digital Futures",
    title: "Putting Mental Health on the Map",
    date: "2023",
    description: "Feature on Dr. Cuadros's spatial public health work connecting mental health, place, and health system response.",
    icon: "newspaper",
    link: "https://ucdigitalfutures.com/putting-mental-health-on-the-map/",
  },
  {
    type: "Interview",
    outlet: "WVXU (Cincinnati NPR)",
    title: "Coronavirus hitting rural communities hard",
    date: "November 2020",
    description: "Discussed findings on the COVID-19 surge in rural areas and the need for attention to rural healthcare.",
    icon: "mic",
    link: "https://www.uc.edu/news/articles/2020/11/wvxu-coronavirus-hitting-rural-communities-hard.html",
  },
  {
    type: "Magazine Feature",
    outlet: "UC Magazine",
    title: "Championing science amid adversity",
    date: "2020",
    description: "Profile on Dr. Cuadros's approach to communicating data and research on HIV & COVID-19, even when politically sensitive.",
    icon: "newspaper",
    link: "https://www.uc.edu/news/1020/championing-science.html",
  },
  {
    type: "Thought Leader Interview",
    outlet: "News-Medical.net",
    title: "Mapping access to HIV care",
    date: "December 2021",
    description: "Explained research on geolocating populations with HIV and measuring travel times to health facilities in Africa to identify underserved areas.",
    icon: "mic",
    link: "https://www.news-medical.net/news/20211223/Mapping-access-to-HIV-care.aspx",
  },
  {
    type: "UC News Feature",
    outlet: "UC News",
    title: "Epicenter of opioid epidemic shifts with drug preferences",
    date: "April 2025",
    description: "Covered the Lancet Regional Health study on the evolving U.S. opioid epidemic, co-authored by Dr. Cuadros.",
    icon: "newspaper",
    link: "https://www.uc.edu/news/articles/2025/04/epicenter-of-opioid-epidemic-shifts-with-drug-preferences.html",
  },
]

const featuredTalksVideosBase: FeaturedVideo[] = [
  {
    videoId: "PMbXTsILMFg",
    title: "Insights into Digital Epidemiology",
    description: "A discussion on the evolving field of digital epidemiology.",
  },
  {
    videoId: "qBsfVJ8qYU4",
    title: "The Role of Data in Public Health",
    description: "Exploring how data analytics shapes public health strategies.",
  },
  {
    videoId: "Wk9SSwgkuDY",
    title: "Modeling Infectious Diseases",
    description: "An overview of techniques used in modeling disease spread.",
  },
]

const talkTypesBase: TalkVenue[] = [
  { name: "American Association of Geographers (AAG) Annual Meeting", icon: "tv" },
  { name: "International AIDS Conferences", icon: "tv" },
  { name: "Epidemiology Congresses", icon: "tv" },
  { name: "Digital Futures Flashpoint Series (UC)", icon: "tv" },
]

const mediaEngagementAreasBase: MediaEngagementArea[] = [
  {
    icon: "mic",
    title: "Media Interviews",
    description: "Expert commentary on spatial health and environmental topics",
  },
  {
    icon: "presentation",
    title: "Conference Speaking",
    description: "Keynote and invited presentations at international venues",
  },
  {
    icon: "video",
    title: "Educational Content",
    description: "Webinars and workshops for professional development",
  },
  {
    icon: "globe",
    title: "Public Outreach",
    description: "Science communication for diverse audiences",
  },
]

export const mediaAppearances = contentOverrides.mediaAppearances ?? mediaAppearancesBase
export const presentations = contentOverrides.presentations ?? presentationsBase
export const mediaHighlights = contentOverrides.mediaHighlights ?? mediaHighlightsBase
export const featuredTalksVideos = contentOverrides.featuredTalksVideos ?? featuredTalksVideosBase
export const talkTypes = contentOverrides.talkTypes ?? talkTypesBase
export const mediaEngagementAreas = contentOverrides.mediaEngagementAreas ?? mediaEngagementAreasBase






