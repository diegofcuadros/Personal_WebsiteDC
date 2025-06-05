"use client"

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
})

interface MapMarkerData {
  id: string
  position: [number, number]
  title: string
  region: string
  projectDetails: {
    mainTitle?: string
    description: string
    impact?: string
    publications?: string
    useCase?: string
    modeling?: string
    innovation?: string
    outcome?: string
    collaboration?: string
    tools?: string
    funding?: string
    features?: string
    goal?: string
  }[]
}

const projectLocations: MapMarkerData[] = [
  {
    id: "sa-kzn",
    position: [-29.1, 30.5],
    title: "HIV & NCD Syndemic Risk, KZN",
    region: "South Africa",
    projectDetails: [
      {
        description:
          "Led a study in one of the world’s most HIV-burdened regions to spatially model the co-distribution of HIV prevalence and chronic diseases (e.g., diabetes, hypertension). Integrated geo-linked health facility data, population surveys, and LLM-assisted text synthesis.",
        impact: "Resulted in high-resolution maps guiding national efforts for integrated care delivery.",
        publications: "BMJ Global Health (2024), Lancet HIV (2024)",
      },
    ],
  },
  {
    id: "zambia",
    position: [-13.1339, 27.8493],
    title: "HIV Care Continuum Mapping, Zambia",
    region: "Zambia",
    projectDetails: [
      {
        description:
          "Developed granular spatial models to evaluate disparities in diagnosis, ART coverage, and viral suppression using DHS survey microdata and geostatistical interpolation.",
        useCase: "Supported sub-provincial decision-making in HIV prevention programming.",
        publications: "BMJ Global Health (2023)",
      },
    ],
  },
  {
    id: "zimbabwe",
    position: [-19.0154, 29.1549],
    title: "GIS Optimization for HIV Resource Targeting, Zimbabwe",
    region: "Zimbabwe",
    projectDetails: [
      {
        description:
          "Created priority-area risk maps based on behavioral and biological indicators to support PEPFAR and national HIV prevention strategies.",
        modeling: "Bayesian smoothing, space-time risk field simulation.",
        publications: "AIDS (2019)",
      },
    ],
  },
  {
    id: "malawi",
    position: [-13.2543, 34.3015],
    title: "Health Services Access Inequity, Malawi",
    region: "Malawi",
    projectDetails: [
      {
        description:
          "Collaborated with CDC and local universities to map gaps in care accessibility and ART uptake at fine spatial scales in southern Malawi.",
        outcome: "Shared risk maps and policy briefs with MoH officials for programmatic decision-making.",
      },
    ],
  },
  {
    id: "tz-ke",
    position: [-1.2921, 36.8219],
    title: "High-Res HIV Risk Modeling, East Africa",
    region: "Tanzania & Kenya",
    projectDetails: [
      {
        description:
          "Integrated satellite imagery, survey microdata, and accessibility indices to generate 1×1 km HIV risk grids for Tanzania & Kenya.",
        innovation:
          "Combined Earth observation data with epidemiological modeling to detect micro-hotspots missed by traditional analysis.",
        useCase: "Tools adopted in planning for community-based testing programs.",
      },
    ],
  },
  {
    id: "nigeria-conceptual",
    position: [9.0765, 7.3986],
    title: "Cross-National HIV Spatial Variability Studies",
    region: "Nigeria (Conceptual/Methodological)",
    projectDetails: [
      {
        description:
          "Contributed to multi-country meta-modeling assessing the influence of demographic and environmental predictors on HIV prevalence spatial gradients.",
        outcome: "GIS-informed publications and methods shared with WHO technical working groups.",
      },
    ],
  },
  {
    id: "usa-cincinnati",
    position: [39.1031, -84.512],
    title: "Urban Health Analytics, Cincinnati, OH",
    region: "United States",
    projectDetails: [
      {
        mainTitle: "AI-Powered COVID-19 Spread Analysis & Urban Vulnerability",
        description:
          "Co-developed a suite of dashboards to model the interaction between community transmission dynamics and social vulnerability indicators.",
        features: "LLM-assisted narrative layers, predictive spatial clustering.",
        useCase: "Used by city agencies and hospitals to allocate testing and intervention resources.",
      },
      {
        mainTitle: "Opioid Epidemic Geo-Risk Surveillance",
        description:
          "Developed predictive risk maps of opioid overdose likelihood using spatial-temporal analysis of EMS data and socioeconomic drivers.",
        innovation:
          "Combined census-level predictors, Naloxone use rates, and emergency calls with machine learning forecasts.",
        goal: "Inform targeted harm-reduction strategies and mobile outreach.",
      },
    ],
  },
  {
    id: "colombia-santander-magdalena",
    position: [7.1139, -73.1198],
    title: "Leishmaniasis Transmission Dynamics, Colombia",
    region: "Colombia (Santander & Magdalena Depts.)",
    projectDetails: [
      {
        description:
          "Conducted spatial epidemiology research focused on vector-borne disease risk mapping for cutaneous leishmaniasis. This included high-resolution spatial modeling of transmission hotspots, integrating entomological surveillance data, environmental risk factors (e.g., land use, forest fragmentation), and human behavior patterns.",
        collaboration: "Partnered with Universidad del Norte and local health authorities.",
        impact: "Informed regional control strategies and vector-targeted interventions in endemic areas.",
        tools: "GIS-based cluster analysis, spatial-temporal mapping, ecological niche modeling.",
      },
    ],
  },
]

export default function InteractiveMap() {
  if (typeof window === "undefined") {
    return <div className="h-[450px] w-full bg-site-gray/50 flex items-center justify-center">Loading map...</div>
  }

  return (
    <MapContainer
      center={[5, 25]}
      zoom={2.3}
      scrollWheelZoom={false}
      style={{ height: "500px", width: "100%", borderRadius: "0.5rem" }}
      className="shadow-lg border border-site-gray/30 dark:border-deep-navy/50"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {projectLocations.map((marker) => (
        <Marker key={marker.id} position={marker.position}>
          <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
            <span className="font-sans font-semibold">{marker.title}</span>
          </Tooltip>
          <Popup minWidth={280} maxWidth={350}>
            <div className="font-sans p-1 max-h-64 overflow-y-auto">
              <h3 className="font-semibold text-lg mb-2 text-teal sticky top-0 bg-background/90 dark:bg-popover/90 py-1">
                {marker.title}
                <p className="text-xs font-normal text-deep-navy/60 dark:text-site-gray/60">{marker.region}</p>
              </h3>
              {marker.projectDetails.map((detail, index) => (
                <div key={index} className="mb-3 text-xs text-deep-navy/90 dark:text-site-gray/90">
                  {detail.mainTitle && (
                    <h4 className="font-semibold text-sm text-deep-navy dark:text-site-white mb-0.5">
                      {detail.mainTitle}
                    </h4>
                  )}
                  <p className="mb-1">{detail.description}</p>
                  {detail.impact && (
                    <p>
                      <span className="font-semibold">Impact:</span> {detail.impact}
                    </p>
                  )}
                  {detail.publications && (
                    <p>
                      <span className="font-semibold">Publications:</span> {detail.publications}
                    </p>
                  )}
                  {detail.useCase && (
                    <p>
                      <span className="font-semibold">Use Case:</span> {detail.useCase}
                    </p>
                  )}
                  {detail.modeling && (
                    <p>
                      <span className="font-semibold">Modeling:</span> {detail.modeling}
                    </p>
                  )}
                  {detail.innovation && (
                    <p>
                      <span className="font-semibold">Innovation:</span> {detail.innovation}
                    </p>
                  )}
                  {detail.outcome && (
                    <p>
                      <span className="font-semibold">Outcome:</span> {detail.outcome}
                    </p>
                  )}
                  {detail.collaboration && (
                    <p>
                      <span className="font-semibold">Collaboration:</span> {detail.collaboration}
                    </p>
                  )}
                  {detail.tools && (
                    <p>
                      <span className="font-semibold">Tools:</span> {detail.tools}
                    </p>
                  )}
                  {detail.funding && (
                    <p>
                      <span className="font-semibold">Funding:</span> {detail.funding}
                    </p>
                  )}
                  {detail.features && (
                    <p>
                      <span className="font-semibold">Features:</span> {detail.features}
                    </p>
                  )}
                  {detail.goal && (
                    <p>
                      <span className="font-semibold">Goal:</span> {detail.goal}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
