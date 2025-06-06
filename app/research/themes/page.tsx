"use client"

import { BrainCircuit, Dna, Syringe, Globe, BarChart3, Users } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const themes = [
  {
    icon: BrainCircuit,
    title: "Geospatial Artificial Intelligence (GeoAI) in Public Health",
    description:
      "Integrating machine learning with GIS to identify disease hotspots, predict outbreaks, and model public health scenarios with unprecedented accuracy.",
  },
  {
    icon: Dna,
    title: "HIV Epidemiology in sub-Saharan Africa",
    description:
      "Investigating the spatial dynamics of HIV, including epidemic persistence, the impact of co-infections, and the effectiveness of targeted interventions.",
  },
  {
    icon: Syringe,
    title: "Opioid Crisis and Infectious Diseases",
    description:
      "Analyzing the dual epidemics of opioid use and related infectious diseases like Hepatitis C, focusing on syndemic theory and spatial patterns in rural and urban settings.",
  },
  {
    icon: Globe,
    title: "Global Health & Tropical Diseases",
    description: "Modeling the spread and control of tropical diseases, considering environmental factors, climate change, and global travel patterns.",
  },
  {
    icon: BarChart3,
    title: "Advanced Methodologies in Disease Modeling",
    description:
      "Developing and applying novel statistical methods, machine learning algorithms, and complex-systems modeling to address challenges in health data analytics.",
  },
  {
    icon: Users,
    title: "Health Disparities and Social Determinants of Health",
    description:
      "Using spatial analysis to identify and understand health inequities, focusing on how social and environmental factors contribute to disparities in disease burden.",
  },
]

export default function ResearchThemesPage() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true, threshold: 0.1 })

  return (
    <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {themes.map((theme, index) => (
        <div
          key={theme.title}
          className={cn(
            "card-gradient-border rounded-xl transition-all duration-500 ease-in-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div className="card-gradient-border-content p-6 h-full flex flex-col text-left">
            <div
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 mb-4",
                "bg-teal-50 dark:bg-teal-950/30",
              )}
            >
              <theme.icon className="h-8 w-8 text-teal-500 dark:text-teal-400" />
            </div>
            <h3 className="text-lg font-semibold font-sans text-deep-navy-900 dark:text-site-white mb-2 flex-grow">
              {theme.title}
            </h3>
            <p className="font-serif text-sm text-deep-navy-800/80 dark:text-site-gray-200/80">
              {theme.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
