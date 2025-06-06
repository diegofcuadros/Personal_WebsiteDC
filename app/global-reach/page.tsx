"use client"

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import { Component, ReactNode } from "react"
import L, { LatLngExpression } from "leaflet"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

const locations: { position: LatLngExpression; title: string; description: string; link: string }[] = [
  {
    position: [8.7832, 34.5085],
    title: "HIV Epidemic Hotspots in Ethiopia",
    description: "Spatial modeling of HIV transmission dynamics to identify key intervention areas.",
    link: "/research/themes#hiv-dynamics",
  },
  {
    position: [-13.1339, 34.0122],
    title: "Malaria & HIV Co-infection in Malawi",
    description: "Investigating the syndemic interactions between HIV and Malaria in rural communities.",
    link: "/research/themes#co-infection",
  },
  {
    position: [-28.5383, 30.9587],
    title: "Health Disparities in KwaZulu-Natal, South Africa",
    description: "Mapping access to healthcare for NCDs and HIV in hyperendemic settings.",
    link: "/publications",
  },
  {
    position: [39.1031, -84.512],
    title: "Opioid Crisis Analytics in Cincinnati, USA",
    description: "Using GeoAI to understand and predict opioid overdose hotspots in urban environments.",
    link: "/research/themes#geoai",
  },
  {
    position: [-19.0154, 29.1549],
    title: "Progress Towards 95-95-95 in Zimbabwe",
    description: "Geospatial evaluation of UNAIDS targets to guide national HIV program strategies.",
    link: "/publications",
  },
]

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class MapErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = { hasError: false }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full bg-red-100 text-red-800 p-4 rounded-lg">
          <p>
            An error occurred while loading the map. This often happens during server-side rendering. The map should
            load correctly on the client side.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

function GlobalReachPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col bg-site-white dark:bg-deep-navy">
      <header className="text-center py-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-sans bg-clip-text text-transparent bg-gradient-to-r from-deep-navy via-teal to-vibrant-gold dark:from-site-white dark:via-teal dark:to-vibrant-gold">
          Global Research Footprint
        </h1>
        <p className="font-serif text-lg md:text-xl text-deep-navy/90 dark:text-site-gray/90 mt-2 max-w-3xl mx-auto">
          From Sub-Saharan Africa to my home in Cincinnati, my research addresses global health challenges. Click on the
          markers to explore projects.
        </p>
      </header>
      <div className="flex-grow container mx-auto px-4 pb-8">
        <MapErrorBoundary>
          <MapContainer
            center={[10, 20]}
            zoom={2.5}
            scrollWheelZoom={false}
            className="w-full h-full min-h-[600px] z-0"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            {locations.map(loc => (
              <Marker key={loc.title} position={loc.position}>
                <Popup>
                  <Card className="border-none shadow-none bg-transparent">
                    <CardHeader className="p-2">
                      <CardTitle className="text-base text-teal dark:text-vibrant-gold">{loc.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                      <p className="text-sm font-serif mb-2 text-deep-navy dark:text-site-gray">
                        {loc.description}
                      </p>
                      <Button asChild variant="link" size="sm" className="px-0 text-teal dark:text-vibrant-gold">
                        <Link href={loc.link}>Learn More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </MapErrorBoundary>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(GlobalReachPage), {
  ssr: false,
}) 