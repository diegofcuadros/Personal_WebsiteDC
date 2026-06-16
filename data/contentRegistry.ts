import { z } from "zod"

type SectionKind = "array" | "object"

type ArrayPatch = z.ZodArray<z.ZodTypeAny, "many">
type ObjectPatch = z.ZodObject<z.ZodRawShape, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.ZodRawShape>>

type SectionPatchSchema = ArrayPatch | ObjectPatch

interface ManagedSectionConfig {
  id: string
  label: string
  description: string
  sectionKind: SectionKind
  patchSchema: SectionPatchSchema
  supportsAuto: boolean
  supportsCv: boolean
  sampleUpdate: string
}

const zText = z.string().trim().min(1)
const zYear = z.preprocess((value) => {
  if (typeof value === "number") return value
  if (typeof value === "string") return Number.parseInt(value, 10)
  return value
}, z.number().int().min(1800).max(2100))

const contactDetailSchema = z.object({
  icon: z.enum(["mail", "mapPin", "building", "linkedin", "bookUser"]),
  label: zText,
  value: z.union([zText, z.array(zText)]),
  href: zText.optional(),
})

const profileSchema = z.object({
  name: zText.optional(),
  displayName: zText.optional(),
  credentials: zText.optional(),
  title: zText.optional(),
  institution: zText.optional(),
  labTitle: zText.optional(),
  email: zText.optional(),
  image: zText.optional(),
  cvPath: zText.optional(),
  homepageSubtitle: zText.optional(),
  homepageBio: zText.optional(),
  homepageTagline: zText.optional(),
  aboutSubtitle: zText.optional(),
  biography: z.array(zText),
  researchIdentity: z.array(zText),
  currentDirections: z.array(
    z.enum([
      "computational_epidemiology",
      "spatial_epidemiology",
      "ai_for_public_health",
      "human_ai_interaction",
      "biological_systems",
      "health_disparities",
      "scientific_decision_making",
      "infectious_disease_epidemiology",
      "substance_use_epidemiology",
    ]),
  ),
  lastUpdated: zText.optional(),
})

const timelineEventSchema = z.object({
  role: zText,
  institution: zText,
  period: zText,
  focus: zText,
})

const technicalExpertiseSchema = z.object({
  icon: z.enum(["activity", "barChart", "brainCircuit", "code", "dna", "globe", "mapPin", "map", "microscope", "syringe", "users"]),
  name: zText,
})

const expertiseSnapshotSchema = z.object({
  id: zText,
  icon: z.enum(["activity", "barChart", "brainCircuit", "code", "dna", "globe", "mapPin", "map", "microscope", "syringe", "users"]),
  title: zText,
  description: zText,
  color: zText,
  bgColor: zText,
})

const researchPillarSchema = z.object({
  id: zText,
  icon: z.enum(["activity", "barChart", "brainCircuit", "code", "dna", "globe", "mapPin", "map", "microscope", "syringe", "users"]),
  title: zText,
  description: zText,
  themes: z.array(zText),
  tags: z.array(zText),
})

const researchThemeSchema = z.object({
  id: zText,
  icon: z.enum(["activity", "barChart", "brainCircuit", "code", "dna", "globe", "mapPin", "map", "microscope", "syringe", "users"]),
  title: zText,
  description: zText,
  themes: z.array(zText),
})

const copySectionSchema = z.object({
  videoHeading: zText.optional(),
  videoId: zText.optional(),
  expertiseHeading: zText.optional(),
  expertiseIntro: zText.optional(),
  primaryCta: z
    .object({
      label: zText,
      href: zText,
    })
    .partial()
    .optional(),
  secondaryCta: z
    .object({
      label: zText,
      href: zText,
    })
    .partial()
    .optional(),
  collaborationCta: z
    .object({
      label: zText,
      href: zText,
    })
    .partial()
    .optional(),
  collaborationHeading: zText.optional(),
  collaborationBody: zText.optional(),
})

const aboutCopySchema = z.object({
  biographyHeading: zText.optional(),
  researchPillarsHeading: zText.optional(),
  careerHeading: zText.optional(),
  technicalExpertiseHeading: zText.optional(),
  globalFootprintHeading: zText.optional(),
  globalFootprintBody: zText.optional(),
})

const grantSchema = z.object({
  title: zText,
  funder: zText,
  role: zText,
  period: zText,
  amount: zText,
  status: z.enum(["Active", "Completed"]),
  impact: zText,
})

const expertiseAreaSchema = z.object({
  id: zText,
  title: zText,
  category: zText,
  description: zText,
  keyServices: z.array(zText),
  applications: z.array(zText),
  industries: z.array(zText).optional(),
  highlight: zText.optional(),
})

const collaborationAreaSchema = z.object({
  icon: z.enum(["microscope", "globe", "graduationCap", "building"]),
  title: zText,
  description: zText,
})

const labStudentSchema = z.object({
  name: zText,
  period: zText,
  department: zText.optional(),
  university: zText.optional(),
  researchInterests: zText.optional(),
  dissertation: zText.optional(),
  thesis: zText.optional(),
  focus: zText.optional(),
  status: zText.optional(),
})

const labSectionSchema = z.object({
  id: zText,
  title: zText,
  icon: z.enum(["graduationCap", "users", "award", "bookOpen"]),
  students: z.array(labStudentSchema),
  color: zText,
  description: zText.optional(),
})

const mediaItemSchema = z.object({
  id: zText,
  type: z.enum(["interview", "podcast", "webinar", "documentary"]),
  title: zText,
  outlet: zText,
  date: zText,
  description: zText,
  topics: z.array(zText),
  link: zText.optional(),
  highlight: zText.optional(),
})

const presentationSchema = z.object({
  id: zText,
  type: z.enum(["keynote", "invited", "conference", "workshop"]),
  title: zText,
  event: zText,
  location: zText,
  date: zText,
  description: zText,
  audience: zText,
  keyPoints: z.array(zText),
  impact: zText.optional(),
})

const mediaHighlightSchema = z.object({
  type: zText,
  outlet: zText,
  title: zText,
  date: zText,
  description: zText,
  icon: z.enum(["mic", "newspaper", "presentation", "video", "globe", "tv"]),
  link: zText.optional(),
})

const featuredVideoSchema = z.object({
  videoId: zText,
  title: zText,
  description: zText,
})

const talkVenueSchema = z.object({
  name: zText,
  icon: z.enum(["mic", "newspaper", "presentation", "video", "globe", "tv"]),
})

const mediaEngagementAreaSchema = z.object({
  icon: z.enum(["mic", "newspaper", "presentation", "video", "globe", "tv"]),
  title: zText,
  description: zText,
})

const currentProjectSchema = z.object({
  title: zText,
  icon: z.enum(["trendingUp", "brain", "barChartBig", "checkCircle"]),
  goal: zText,
  methods: zText,
  partners: zText.optional(),
  output: zText.optional(),
  funding: zText.optional(),
  impact: zText.optional(),
  useCase: zText.optional(),
})

const pastProjectSchema = z.object({
  title: zText,
  icon: z.enum(["trendingUp", "brain", "barChartBig", "checkCircle"]),
  description: zText,
})

const publicationLinkSchema = z.object({
  label: zText,
  href: zText,
})

const publicationSchema = z.object({
  title: zText,
  authors: zText,
  journal: zText,
  year: zYear,
  links: z.array(publicationLinkSchema),
  tags: z.array(zText),
  imageUrl: zText.optional(),
  summary: zText,
  showFullSummary: z.boolean().optional(),
})

const courseSchema = z.object({
  id: zText,
  title: zText,
  code: zText,
  semester: zText,
  level: zText,
  tools: z.array(zText),
  description: zText,
  keyTopics: z.array(zText),
  specialFeatures: z.array(zText).optional(),
  quote: zText.optional(),
  capstone: zText.optional(),
})

const philosophyPointSchema = z.object({
  icon: z.enum(["target", "globe", "lightbulb", "users"]),
  title: zText,
  description: zText,
})

const editorialStrategySchema = z.object({
  primaryIdentity: zText,
  coreResearchPillars: z.array(zText),
  tone: zText,
  avoid: z.array(zText),
})

export const managedSectionConfigs = {
  profile: {
    id: "profile",
    label: "Profile",
    description: "Core biographical fields and homepage positioning text",
    sectionKind: "object",
    patchSchema: profileSchema.partial(),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '{"title":"Professor of Biological Sciences","homepageBio":"..."}',
  },
  timelineEvents: {
    id: "timelineEvents",
    label: "Career Timeline",
    description: "Ordered list of past positions and career milestones",
    sectionKind: "array",
    patchSchema: z.array(timelineEventSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"role":"Assistant Professor","institution":"...","period":"2018-2022","focus":"..."}]',
  },
  technicalExpertise: {
    id: "technicalExpertise",
    label: "Technical Expertise",
    description: "Short technical focus list shown on About page",
    sectionKind: "array",
    patchSchema: z.array(technicalExpertiseSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"icon":"mapPin","name":"Geographic Information Systems (GIS)"}]',
  },
  homepageCopy: {
    id: "homepageCopy",
    label: "Homepage Copy",
    description: "Homepage hero and first content blocks",
    sectionKind: "object",
    patchSchema: copySectionSchema.partial(),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '{"expertiseIntro":"...", "primaryCta":{"label":"Explore Research","href":"/research"}}',
  },
  aboutCopy: {
    id: "aboutCopy",
    label: "About Page Copy",
    description: "Section headings and about-page opening statements",
    sectionKind: "object",
    patchSchema: aboutCopySchema.partial(),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '{"biographyHeading":"Biography & Mission"}',
  },
  expertiseSnapshots: {
    id: "expertiseSnapshots",
    label: "Homepage Expertise Snapshots",
    description: "Top four homepage research cards",
    sectionKind: "array",
    patchSchema: z.array(expertiseSnapshotSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"id":"human-ai-interaction","icon":"brainCircuit","title":"...","description":"...","color":"text-teal-500","bgColor":"bg-teal-50"}]',
  },
  researchPillars: {
    id: "researchPillars",
    label: "Research Pillars",
    description: "High-level research grouping shown in About/Research sections",
    sectionKind: "array",
    patchSchema: z.array(researchPillarSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"id":"...","title":"...","description":"...","themes":["computational_epidemiology"],"tags":["..."]}]',
  },
  researchThemes: {
    id: "researchThemes",
    label: "Research Themes",
    description: "Theme cards and detailed research area taxonomy",
    sectionKind: "array",
    patchSchema: z.array(researchThemeSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"id":"...","title":"...","description":"...","themes":["human_ai_interaction"]}]',
  },
  contactDetails: {
    id: "contactDetails",
    label: "Contact Details",
    description: "Contact cards, email, location, and links",
    sectionKind: "array",
    patchSchema: z.array(contactDetailSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"icon":"mail","label":"Email","value":"name@uc.edu","href":"mailto:name@uc.edu"}]',
  },
  expertiseAreas: {
    id: "expertiseAreas",
    label: "Expertise Areas",
    description: "Research + services areas shown on collaboration page",
    sectionKind: "array",
    patchSchema: z.array(expertiseAreaSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"id":"...","title":"...","category":"...","description":"...","keyServices":["..."],"applications":["..."]}]',
  },
  collaborationAreas: {
    id: "collaborationAreas",
    label: "Collaboration Areas",
    description: "Research partnership opportunities shown in collaboration section",
    sectionKind: "array",
    patchSchema: z.array(collaborationAreaSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"icon":"microscope","title":"Research Design","description":"..."}]',
  },
  grants: {
    id: "grants",
    label: "Grants",
    description: "Funded projects and grant portfolio",
    sectionKind: "array",
    patchSchema: z.array(grantSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"title":"Example Grant","funder":"NIH","role":"Co-PI","period":"2024-2026","amount":"$1,000,000","status":"Active","impact":"..."}]',
  },
  labData: {
    id: "labData",
    label: "Lab & Students",
    description: "Lab sections and student records",
    sectionKind: "array",
    patchSchema: z.array(labSectionSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"id":"current-phd-advisees","title":"Current PhD Advisees","icon":"graduationCap","students":[{"name":"...","period":"2025-present","department":"...","university":"..."}]}]',
  },
  mediaAppearances: {
    id: "mediaAppearances",
    label: "Media Appearances",
    description: "Media interviews and public-facing appearances",
    sectionKind: "array",
    patchSchema: z.array(mediaItemSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"id":"interview-1","type":"interview","title":"...","outlet":"...","date":"2025","description":"...","topics":["..."]}]',
  },
  presentations: {
    id: "presentations",
    label: "Presentations",
    description: "Talks, invited talks, and conference presentations",
    sectionKind: "array",
    patchSchema: z.array(presentationSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"id":"keynote-2026","type":"keynote","title":"...","event":"...","location":"...","date":"2026","description":"...","audience":"...","keyPoints":["..."]}]',
  },
  mediaHighlights: {
    id: "mediaHighlights",
    label: "Media Highlights",
    description: "Highlighted press and news mentions",
    sectionKind: "array",
    patchSchema: z.array(mediaHighlightSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"type":"Interview","outlet":"...","title":"...","date":"2026","description":"...","icon":"mic"}]',
  },
  featuredTalksVideos: {
    id: "featuredTalksVideos",
    label: "Featured Talk Videos",
    description: "Video highlights shown in media section",
    sectionKind: "array",
    patchSchema: z.array(featuredVideoSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"videoId":"PMbXTsILMFg","title":"...","description":"..."}]',
  },
  talkTypes: {
    id: "talkTypes",
    label: "Talk Types",
    description: "Venue list for media/talk metadata",
    sectionKind: "array",
    patchSchema: z.array(talkVenueSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"name":"...","icon":"tv"}]',
  },
  mediaEngagementAreas: {
    id: "mediaEngagementAreas",
    label: "Media Engagement Areas",
    description: "Media section category cards",
    sectionKind: "array",
    patchSchema: z.array(mediaEngagementAreaSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"icon":"mic","title":"Media Interviews","description":"..."}]',
  },
  currentProjectsData: {
    id: "currentProjectsData",
    label: "Current Projects",
    description: "Current active projects",
    sectionKind: "array",
    patchSchema: z.array(currentProjectSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"title":"...","icon":"brain","goal":"...","methods":"..."}]',
  },
  pastProjectsData: {
    id: "pastProjectsData",
    label: "Past Projects",
    description: "Completed projects and completed research records",
    sectionKind: "array",
    patchSchema: z.array(pastProjectSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"title":"...","icon":"checkCircle","description":"..."}]',
  },
  allPublications: {
    id: "allPublications",
    label: "Publications",
    description: "Bibliography list used on the Publications page and search index",
    sectionKind: "array",
    patchSchema: z.array(publicationSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"title":"...","authors":"...","journal":"...","year":2026,"links":[{"label":"Read","href":"https://..."}],"tags":["..."],"summary":"..."}]',
  },
  courses: {
    id: "courses",
    label: "Teaching Courses",
    description: "Courses and teaching portfolio",
    sectionKind: "array",
    patchSchema: z.array(courseSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"id":"gis-public-health","title":"GIS and Public Health","code":"GEOG 5131","semester":"Spring","level":"Graduate","tools":["ArcGIS"],"description":"...","keyTopics":["..."]}]',
  },
  philosophyPoints: {
    id: "philosophyPoints",
    label: "Teaching Philosophy Points",
    description: "Short philosophy bullets shown in Teaching page",
    sectionKind: "array",
    patchSchema: z.array(philosophyPointSchema),
    supportsAuto: true,
    supportsCv: true,
    sampleUpdate: '[{"icon":"target","title":"Theory Integration","description":"..."}]',
  },
  editorialStrategy: {
    id: "editorialStrategy",
    label: "Editorial Strategy",
    description: "Global tone and positioning constraints for writing updates",
    sectionKind: "object",
    patchSchema: editorialStrategySchema.partial(),
    supportsAuto: true,
    supportsCv: false,
    sampleUpdate: '{"tone":"Professional, evidence-based, concise","avoid":["AI hype","unverified claims"]}',
  },
} satisfies Record<string, ManagedSectionConfig>

export type ManagedSectionId = keyof typeof managedSectionConfigs
export type ContentOverrides = Partial<{
  [K in ManagedSectionId]: z.infer<(typeof managedSectionConfigs)[K]["patchSchema"]>
}>

export const managedSectionIds = Object.keys(managedSectionConfigs) as Array<ManagedSectionId>

export function getSectionConfig(sectionId: ManagedSectionId): ManagedSectionConfig {
  return managedSectionConfigs[sectionId]
}

export function getSectionSchema(sectionId: ManagedSectionId): SectionPatchSchema {
  return getSectionConfig(sectionId).patchSchema
}

export function getManagedSections() {
  return managedSectionIds.map((id) => {
    const config = getSectionConfig(id)
    return {
      id,
      label: config.label,
      description: config.description,
      sectionKind: config.sectionKind,
      supportsAuto: config.supportsAuto,
      supportsCv: config.supportsCv,
      sampleUpdate: config.sampleUpdate,
    }
  })
}

export const extractPublicationsSchema = z.object({
  publications: z.array(publicationSchema),
})
