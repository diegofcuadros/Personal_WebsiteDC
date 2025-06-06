"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, BrainCircuit, MapIcon, Activity, Cpu, BookOpen, Mail } from "lucide-react"
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import YouTubeEmbed from "@/components/youtube-embed";

const featuredLogos = [
  { name: "NIH", query: "NIH logo" },
  { name: "WHO", query: "WHO logo" },
  { name: "The Lancet", query: "The Lancet journal logo" },
  { name: "Nature", query: "Nature journal logo" },
  { name: "Science", query: "Science journal logo" },
  { name: "NPR", query: "NPR logo" },
]

const expertiseAreas = [
  {
    icon: BrainCircuit,
    title: "Disease Modeling",
    description:
      "Mathematical and computational models to simulate epidemic trajectories and predict outcomes under different scenarios.",
    color: "text-teal-500",
    bgColor: "bg-teal-50 dark:bg-teal-950/20",
  },
  {
    icon: MapIcon,
    title: "Spatial Epidemiology",
    description:
      "Integrating GIS to map disease incidence, identify hotspots, and uncover environmental/social determinants of health.",
    color: "text-vibrant-gold-500",
    bgColor: "bg-vibrant-gold-50 dark:bg-vibrant-gold-950/20",
  },
  {
    icon: Activity,
    title: "Digital Epidemiology",
    description:
      "Leveraging large datasets, computational tools, and data visualization for contemporary health challenges like HIV & COVID-19.",
    color: "text-coral-500",
    bgColor: "bg-coral-50 dark:bg-coral-950/20",
  },
  {
    icon: Cpu,
    title: "Data Science in Health",
    description:
      "Applying spatial statistics, machine learning, and high-performance computing to complex health data.",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
  },
]

export default function HomePage() {
  const { ref: featuredRef, isVisible: featuredIsVisible } = useScrollAnimation<HTMLElement>({ triggerOnce: true });
  const { ref: expertiseRef, visibleItems: expertiseVisibleItems } = useStaggeredAnimation<HTMLDivElement>(expertiseAreas.length, 150);
  const { ref: insightRef, isVisible: insightIsVisible } = useScrollAnimation<HTMLElement>({ triggerOnce: true });
  const { ref: connectRef, isVisible: connectIsVisible } = useScrollAnimation<HTMLElement>({ triggerOnce: true });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-site-white to-site-gray-50/30 dark:from-deep-navy-900 dark:to-deep-navy-950 overflow-hidden">
        <div className="absolute inset-0 opacity-40 dark:opacity-30 bg-[length:200%_200%] bg-gradient-to-tr from-teal-500/10 via-purple-500/10 to-vibrant-gold-500/10 dark:from-teal-500/5 dark:via-purple-500/5 dark:to-vibrant-gold-500/5 animate-gradient-move" />
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="order-2 md:order-1 animate-fade-in">
              <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 dark:from-slate-200 dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent font-sans tracking-tight">
                Dr. Diego F. Cuadros
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-teal-500 dark:text-vibrant-gold-400 mb-6 font-sans animate-slide-in-bottom [animation-delay:0.2s]">
                Advancing Health Through Innovative Data Analytics
              </h2>
              <p className="text-lg md:text-xl text-deep-navy-800/80 dark:text-site-gray-200/80 mb-8 font-serif leading-relaxed">
                Dr. Diego F. Cuadros, an Associate Professor at the University of Cincinnati, specializes in digital
                epidemiology and disease modeling. He leverages cutting-edge data analytics, geographic information
                systems (GIS), and complex-systems modeling to address pressing challenges in public health and
                epidemiology. Director of the Digital Epidemiology Lab, his work bridges academic rigor with
                real-world impact, driving innovation in health outcomes through data-driven insights.
              </p>
              <div className="mt-8 mb-8 animate-slide-in-bottom [animation-delay:0.3s]">
                <h3 className="text-xl font-semibold text-deep-navy-800 dark:text-site-gray-100 mb-4 font-sans text-center md:text-left">
                  Watch: A Glimpse into Digital Epidemiology
                </h3>
                <YouTubeEmbed videoId="ZjmI_xDaC1k" className="rounded-lg overflow-hidden shadow-xl mx-auto md:mx-0 max-w-xl" />
              </div>
              <p className="text-md italic text-teal-600 dark:text-vibrant-gold-400 mb-8 font-sans animate-slide-in-bottom [animation-delay:0.3s]">
                Harnessing Data for Health Innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-bottom [animation-delay:0.4s]">
                <Button
                  asChild
                  size="lg"
                  className="bg-teal-500 hover:bg-teal-600 text-site-white dark:bg-vibrant-gold-400 dark:hover:bg-vibrant-gold-500 dark:text-deep-navy-900 font-sans btn-hover-lift"
                >
                  <Link href="/research">
                    Explore Research <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-teal-500 text-teal-500 hover:bg-teal-50 dark:border-vibrant-gold-400 dark:text-vibrant-gold-400 dark:hover:bg-vibrant-gold-50/10 font-sans btn-hover-lift"
                >
                  <Link href="/publications">
                    View Publications <BookOpen className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center md:justify-end animate-fade-in [animation-delay:0.2s]">
              <Image
                src="/Dic_2021-V2.jpg"
                alt="Dr. Diego F. Cuadros"
                width={400}
                height={400}
                className="rounded-full shadow-2xl border-4 border-teal-500/50 dark:border-vibrant-gold-400/50 object-cover animate-float"
                priority
              />
            </div>
          </div>
        </div>
      </section>


      {/* Expertise Snapshot Section */}
      <section className="py-16 md:py-24 bg-site-white dark:bg-deep-navy-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-navy-900 dark:text-site-white mb-4 font-sans">
              Expertise Snapshot
            </h2>
            <p className="text-lg text-deep-navy-800/70 dark:text-site-gray-200/80 max-w-2xl mx-auto font-serif">
              Key areas where data science meets public health innovation.
            </p>
          </div>
          <div ref={expertiseRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertiseAreas.map((area, index) => (
              <div
                key={area.title}
                className={cn(
                  "card-gradient-border rounded-xl transition-all duration-500 ease-in-out",
                  expertiseVisibleItems[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                )}
              >
                <div className="card-gradient-border-content p-6 h-full flex flex-col text-center">
                  <div className={cn("flex items-center justify-center mb-4 w-16 h-16 mx-auto rounded-full", area.bgColor)}>
                    <area.icon className={`h-8 w-8 ${area.color}`} />
                  </div>
                  <h3 className={`text-xl font-semibold ${area.color} font-sans mb-2`}>{area.title}</h3>
                  <p className="text-sm text-deep-navy-800/70 dark:text-site-gray-200/70 font-serif flex-grow">
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Invitation to Connect Section */}
      <section ref={connectRef} className={cn("py-16 md:py-20 bg-vibrant-gold-400 dark:bg-teal-600 transition-all duration-1000", connectIsVisible ? 'opacity-100' : 'opacity-0')}>
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-navy-900 dark:text-site-white mb-6 font-sans">
            Interested in collaboration or consulting?
          </h2>
          <p className="text-lg text-deep-navy-900/90 dark:text-site-white/90 mb-8 max-w-xl mx-auto font-serif">
            Let's talk about how we can leverage data to solve complex health challenges together.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 font-sans"
          >
            <Link href="/contact">
              Get In Touch <Mail className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
