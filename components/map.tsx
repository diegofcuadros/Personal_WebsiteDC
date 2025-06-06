"use client"

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { LatLngExpression } from "leaflet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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

export default function Map() {
  return (
    <MapContainer center={[10, 20]} zoom={2.5} scrollWheelZoom={false} className="w-full h-full min-h-[600px] z-0">
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
                <p className="text-sm font-serif mb-2 text-deep-navy dark:text-site-gray">{loc.description}</p>
                <Button asChild variant="link" size="sm" className="px-0 text-teal dark:text-vibrant-gold">
                  <Link href={loc.link}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
} 