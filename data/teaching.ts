import { contentOverrides } from "./contentOverrides"

export type TeachingPhilosophyIconKey = "target" | "globe" | "lightbulb" | "users"

export type Course = {
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

export type PhilosophyPoint = {
  icon: TeachingPhilosophyIconKey
  title: string
  description: string
}

const coursesBase: Course[] = [
  {
    id: "gis-public-health",
    title: "GIS and Public Health",
    code: "GEOG 5131/6031",
    semester: "Spring",
    level: "Undergraduate & Graduate",
    tools: ["ArcGIS Pro", "Open Health Datasets"],
    description:
      "This course explores the intersection of geography, spatial science, and health systems. Students gain a deep understanding of health disparities, disease distribution, and environmental determinants of health, using GIS technologies to map, analyze, and communicate complex spatial health data.",
    keyTopics: [
      "Disease ecology & demographic transitions",
      "Spatial epidemiology & risk mapping",
      "Environmental exposures & health behavior",
      "GIS-based health policy planning",
    ],
    capstone:
      "Students design and execute a self-directed spatial health study, using real data and ESRI tools to uncover patterns and generate insights.",
    quote: "We don't just map disease - we decode the spatial logic of health itself.",
  },
  {
    id: "medical-geography-epidemiology",
    title: "Medical Geography & Epidemiology",
    code: "GEOG 4000C",
    semester: "Spring / Fall",
    level: "Undergraduate",
    tools: ["Epidemiological Data", "GIS", "Spatial Analysis"],
    description:
      "This course introduces students to the geographic study of health, disease, and healthcare systems, connecting epidemiological reasoning with spatial patterns, social determinants, and public health action.",
    keyTopics: [
      "Disease distribution and place-based risk",
      "Health disparities and social determinants",
      "Epidemiological study design",
      "Spatial approaches to public health intervention",
    ],
  },
  {
    id: "landscape-ecology",
    title: "Landscape Ecology and GIS",
    code: "GEOG 5015C/6015C / EVST 5015C",
    semester: "Fall",
    level: "Undergraduate & Graduate",
    tools: ["ArcGIS Pro", "Remote Sensing Tools"],
    description:
      "This interdisciplinary course addresses how landscape patterns shape ecological processes, biodiversity, and ecosystem dynamics. Students learn key principles of landscape ecology, combined with spatial data analytics and conservation strategies.",
    keyTopics: [
      "Spatial statistics & ecological modeling",
      "Human-environment interaction",
      "Landscape metrics & biodiversity",
      "Remote sensing for habitat and disturbance analysis",
    ],
    specialFeatures: [
      "Interpolating oxygen levels in Chesapeake Bay",
      "Modeling road impacts on deforestation in the Amazon",
      "Timber harvest planning using spatial optimization",
    ],
  },
  {
    id: "conservation-biogeography",
    title: "Conservation Biogeography",
    code: "GEOG 2043C",
    semester: "Spring",
    level: "Undergraduate",
    tools: ["Biodiversity Data", "GIS", "Ecological Mapping"],
    description:
      "This course examines spatial patterns of biodiversity, conservation planning, and the ecological processes that shape species distributions across changing landscapes.",
    keyTopics: [
      "Biogeographic patterns and conservation priorities",
      "Species distributions and habitat change",
      "Landscape fragmentation",
      "Spatial planning for biodiversity protection",
    ],
  },
  {
    id: "places-plagues-people",
    title: "Places, Plagues & People",
    code: "GEOG 1007",
    semester: "Spring",
    level: "Undergraduate",
    tools: ["Case Studies", "Public Health Data", "Disease Maps"],
    description:
      "This general education course explores how infectious diseases emerge, move through populations, and interact with geography, society, environment, and public health systems.",
    keyTopics: [
      "Pandemics and place",
      "Human mobility and transmission",
      "Disease ecology",
      "Public health response and communication",
    ],
  },
]

const philosophyPointsBase: PhilosophyPoint[] = [
  {
    icon: "target",
    title: "Theory Integration",
    description: "Seamlessly blend theoretical foundations with practical applications",
  },
  {
    icon: "globe",
    title: "Spatial Analytics",
    description: "Hands-on experience with cutting-edge spatial analysis tools",
  },
  {
    icon: "lightbulb",
    title: "Real-World Applications",
    description: "Connect classroom learning to professional practice",
  },
  {
    icon: "users",
    title: "Experiential Learning",
    description: "Research-based projects and open data exploration",
  },
]

export const courses = contentOverrides.courses ?? coursesBase
export const philosophyPoints = contentOverrides.philosophyPoints ?? philosophyPointsBase
