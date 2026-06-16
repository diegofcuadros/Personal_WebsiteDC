"use client"

import { BrainCircuit, Dna, Syringe, Globe, BarChart3, Users } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { researchThemes } from "@/data/researchAreas"

const themeIconMap = {
  barChart: BarChart3,
  brainCircuit: BrainCircuit,
  dna: Dna,
  globe: Globe,
  syringe: Syringe,
  users: Users,
}

export default function ResearchThemesPage() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true, threshold: 0.1 })

  return (
    <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {researchThemes.map((theme, index) => {
        const ThemeIcon = themeIconMap[theme.icon as keyof typeof themeIconMap]

        return (
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
              <ThemeIcon className="h-8 w-8 text-teal-500 dark:text-teal-400" />
            </div>
            <h3 className="text-lg font-semibold font-sans text-deep-navy-900 dark:text-site-white mb-2 flex-grow">
              {theme.title}
            </h3>
            <p className="font-serif text-sm text-deep-navy-800/80 dark:text-site-gray-200/80">
              {theme.description}
            </p>
          </div>
        </div>
        )
      })}
    </div>
  )
}
