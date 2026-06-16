"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BrainCircuit, MapIcon, Activity, BookOpen, Mail } from "lucide-react"
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import YouTubeEmbed from "@/components/youtube-embed"
import { profile } from "@/data/profile"
import { expertiseSnapshots } from "@/data/researchAreas"
import { homepageCopy } from "@/data/siteCopy"

const expertiseIconMap = {
  activity: Activity,
  brainCircuit: BrainCircuit,
  map: MapIcon,
}

export default function HomePage() {
  const { ref: expertiseRef, visibleItems: expertiseVisibleItems } = useStaggeredAnimation<HTMLDivElement>(expertiseSnapshots.length, 150)
  const { ref: connectRef, isVisible: connectIsVisible } = useScrollAnimation<HTMLElement>({ triggerOnce: true })

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-site-white to-site-gray-50/30 dark:from-deep-navy-900 dark:to-deep-navy-950 overflow-hidden">
        <div className="absolute inset-0 opacity-40 dark:opacity-30 bg-[length:200%_200%] bg-gradient-to-tr from-teal-500/10 via-purple-500/10 to-vibrant-gold-500/10 dark:from-teal-500/5 dark:via-purple-500/5 dark:to-vibrant-gold-500/5 animate-gradient-move" />
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="order-2 md:order-1 animate-fade-in">
              <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 dark:from-slate-200 dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent font-sans tracking-tight">
                {profile.name}
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-teal-500 dark:text-vibrant-gold-400 mb-6 font-sans animate-slide-in-bottom [animation-delay:0.2s]">
                {profile.homepageSubtitle}
              </h2>
              <p className="text-lg md:text-xl text-deep-navy-800/80 dark:text-site-gray-200/80 mb-8 font-serif leading-relaxed">
                {profile.homepageBio}
              </p>
              <div className="mt-8 mb-8 animate-slide-in-bottom [animation-delay:0.3s]">
                <h3 className="text-xl font-semibold text-deep-navy-800 dark:text-site-gray-100 mb-4 font-sans text-center md:text-left">
                  {homepageCopy.videoHeading}
                </h3>
                <YouTubeEmbed videoId={homepageCopy.videoId} className="rounded-lg overflow-hidden shadow-xl mx-auto md:mx-0 max-w-xl" />
              </div>
              <p className="text-md italic text-teal-600 dark:text-vibrant-gold-400 mb-8 font-sans animate-slide-in-bottom [animation-delay:0.3s]">
                {profile.homepageTagline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-bottom [animation-delay:0.4s]">
                <Button
                  asChild
                  size="lg"
                  className="bg-teal-500 hover:bg-teal-600 text-site-white dark:bg-vibrant-gold-400 dark:hover:bg-vibrant-gold-500 dark:text-deep-navy-900 font-sans btn-hover-lift"
                >
                  <Link href={homepageCopy.primaryCta.href}>
                    {homepageCopy.primaryCta.label} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-teal-500 text-teal-500 hover:bg-teal-50 dark:border-vibrant-gold-400 dark:text-vibrant-gold-400 dark:hover:bg-vibrant-gold-50/10 font-sans btn-hover-lift"
                >
                  <Link href={homepageCopy.secondaryCta.href}>
                    {homepageCopy.secondaryCta.label} <BookOpen className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center md:justify-end animate-fade-in [animation-delay:0.2s]">
              <Image
                src={profile.image}
                alt={profile.name}
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
              {homepageCopy.expertiseHeading}
            </h2>
            <p className="text-lg text-deep-navy-800/70 dark:text-site-gray-200/80 max-w-2xl mx-auto font-serif">
              {homepageCopy.expertiseIntro}
            </p>
          </div>
          <div ref={expertiseRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertiseSnapshots.map((area, index) => {
              const AreaIcon = expertiseIconMap[area.icon as keyof typeof expertiseIconMap]

              return (
              <div
                key={area.title}
                className={cn(
                  "card-gradient-border rounded-xl transition-all duration-500 ease-in-out",
                  expertiseVisibleItems[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                )}
              >
                <div className="card-gradient-border-content p-6 h-full flex flex-col text-center">
                  <div className={cn("flex items-center justify-center mb-4 w-16 h-16 mx-auto rounded-full", area.bgColor)}>
                    <AreaIcon className={`h-8 w-8 ${area.color}`} />
                  </div>
                  <h3 className={`text-xl font-semibold ${area.color} font-sans mb-2`}>{area.title}</h3>
                  <p className="text-sm text-deep-navy-800/70 dark:text-site-gray-200/70 font-serif flex-grow">
                    {area.description}
                  </p>
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </section>


      {/* Invitation to Connect Section */}
      <section ref={connectRef} className={cn("py-16 md:py-20 bg-vibrant-gold-400 dark:bg-teal-600 transition-all duration-1000", connectIsVisible ? 'opacity-100' : 'opacity-0')}>
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-navy-900 dark:text-site-white mb-6 font-sans">
            {homepageCopy.collaborationHeading}
          </h2>
          <p className="text-lg text-deep-navy-900/90 dark:text-site-white/90 mb-8 max-w-xl mx-auto font-serif">
            {homepageCopy.collaborationBody}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 font-sans"
          >
            <Link href={homepageCopy.collaborationCta.href}>
              {homepageCopy.collaborationCta.label} <Mail className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
