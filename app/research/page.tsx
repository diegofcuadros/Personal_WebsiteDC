"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Target, Puzzle, Lightbulb, FileText, Users, ArrowRight, ExternalLinkIcon, BookOpen, Award, Linkedin, GraduationCap, Briefcase } from "lucide-react";

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const researchSections = [
  {
    title: "Core Research Themes",
    description:
      "Explore the fundamental areas driving my research, from geospatial HIV epidemiology to AI-driven forecasting and health equity. Delve into the core questions and methodologies that define our work.",
    href: "/research/themes",
    icon: Puzzle,
  },
  {
    title: "Projects",
    description:
      "Discover current and past projects, showcasing a portfolio of our research in action. Each project includes details on partnerships, methodologies, and impactful public health outcomes.",
    href: "/research/projects",
    icon: Lightbulb,
  },
  {
    title: "Grants & Funding",
    description:
      "Our research is made possible through the generous support of various funding bodies. Learn about the grants that have supported our innovative endeavors in digital epidemiology.",
    href: "/research/grants",
    icon: FileText,
  },
  {
    title: "Lab Members & Openings",
    description:
      "Meet the talented team of researchers, data scientists, and students at the Digital Epidemiology Laboratory. Find information on current openings and how to join our team.",
    href: "/research/lab-members",
    icon: Users,
  },
]

export default function ResearchOverviewPage() {
  const { ref: focusRef, isVisible: focusIsVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: navRef, isVisible: navIsVisible } = useScrollAnimation({ triggerOnce: true, threshold: 0.1 })

  return (
    <>
      <section
        ref={focusRef}
        className={cn(
          "max-w-4xl mx-auto mb-12 md:mb-16 transition-all duration-700 ease-in-out",
          focusIsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        )}
      >
        <div className="flex items-start p-6 bg-site-gray-50 dark:bg-deep-navy-950/30 rounded-xl">
          <Target className="h-10 w-10 md:h-12 md:w-12 mr-6 text-teal-500 dark:text-vibrant-gold-400 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-sans text-deep-navy-900 dark:text-site-white mb-3">
              Research Focus & Philosophy
            </h2>
            <p className="font-serif text-lg leading-relaxed text-deep-navy-800/90 dark:text-site-gray-200/90">
              My research lies at the intersection of spatial epidemiology, mathematical modeling, and data-driven
              public health strategy. I combine geospatial data, advanced analytics, and AI to uncover hidden patterns
              in disease dynamics, identify health inequities, and guide evidence-based decision-making in
              resource-constrained settings. My goal is to move from data to action—enabling smarter, faster, and more
              targeted public health responses.
            </p>
          </div>
        </div>
      </section>

      <section
        ref={navRef}
        className={cn(
          "mb-12 md:mb-16 transition-all duration-700 ease-in-out",
          navIsVisible ? "opacity-100" : "opacity-0",
        )}
      >
        <h2 className="text-3xl md:text-4xl font-bold font-sans text-deep-navy-900 dark:text-site-white mb-10 text-center">
          Explore Our Research
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {researchSections.map((section, index) => (
            <div
              key={section.title}
              className={cn(
                "card-gradient-border rounded-xl transition-all duration-500 ease-in-out",
                navIsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="card-gradient-border-content p-6 md:p-8 flex flex-col md:flex-row items-start">
                <div
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 mr-6 mb-4 md:mb-0",
                    "bg-teal-50 dark:bg-teal-950/30",
                  )}
                >
                  <section.icon className="h-8 w-8 text-teal-500 dark:text-teal-400" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold font-sans text-deep-navy-900 dark:text-site-white mb-2">
                    {section.title}
                  </h3>
                  <p className="font-serif text-base text-deep-navy-800/80 dark:text-site-gray-200/80 mb-4">
                    {section.description}
                  </p>
                  <Button asChild variant="link" className="px-0 text-teal-600 dark:text-vibrant-gold-400 font-semibold">
                    <Link href={section.href}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
