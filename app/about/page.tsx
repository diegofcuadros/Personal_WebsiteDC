import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, Briefcase, MapPin, Users, Lightbulb, Globe, Microscope, BrainCircuit, BarChart3, Code } from "lucide-react"
import ClientInteractiveMap from "@/components/client-interactive-map"
import InteractiveTimeline from "@/components/interactive-timeline"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { profile, technicalExpertise, timelineEvents } from "@/data/profile"
import { researchPillars } from "@/data/researchAreas"
import { aboutCopy } from "@/data/siteCopy"

const aboutIconMap = {
  barChart: BarChart3,
  brainCircuit: BrainCircuit,
  code: Code,
  globe: Globe,
  mapPin: MapPin,
  microscope: Microscope,
  users: Users,
}

export default function AboutPage() {
  return (
    <div className="bg-site-white dark:bg-deep-navy-900 text-deep-navy-900 dark:text-site-gray-100">
      <div className="container py-12 md:py-16 px-4 md:px-6">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans">
            About <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 dark:from-slate-200 dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">{profile.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-teal-600 dark:text-teal-400 font-semibold font-sans">
            {profile.aboutSubtitle}
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Image
                src={profile.image}
                alt={profile.name}
                width={350}
                height={350}
                className="rounded-lg shadow-xl mx-auto border-4 border-teal-500 dark:border-vibrant-gold-500 object-cover"
              />
              <div className="mt-6 text-center lg:text-left">
                <h3 className="text-2xl font-semibold font-sans text-deep-navy-900 dark:text-site-white mb-2">
                  {profile.displayName}
                </h3>
                <p className="text-md text-teal-600 dark:text-teal-400 font-sans">
                  {profile.title}, {profile.institution}
                </p>
                <p className="text-sm text-deep-navy-800/80 dark:text-site-gray-300/80 font-serif mt-1">
                  {profile.labTitle}
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-6 w-full md:w-auto border-teal-500 text-teal-600 hover:bg-teal-500/10 dark:border-vibrant-gold-500 dark:text-vibrant-gold-400 dark:hover:bg-vibrant-gold-500/10 transition-all"
                >
                  <Link href={profile.cvPath} target="_blank">
                    <Download className="mr-2 h-4 w-4" /> Download CV
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-16">
            <section id="biography-mission">
              <h2 className="text-3xl font-bold font-sans text-deep-navy-900 dark:text-site-white mb-4 flex items-center">
                <Users className="mr-3 h-7 w-7 text-indigo-500" /> {aboutCopy.biographyHeading}
              </h2>
              <div className="space-y-4 font-serif text-lg leading-relaxed text-deep-navy-800/90 dark:text-site-gray-200/90">
                {profile.biography.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
            
            <section id="research-pillars">
              <h2 className="text-3xl font-bold font-sans text-deep-navy-900 dark:text-site-white mb-6 flex items-center">
                <Lightbulb className="mr-3 h-7 w-7 text-indigo-500" /> {aboutCopy.researchPillarsHeading}
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {researchPillars.map((pillar) => {
                  const PillarIcon = aboutIconMap[pillar.icon as keyof typeof aboutIconMap]

                  return (
                  <Card key={pillar.title} className="bg-white dark:bg-slate-800/50 hover:shadow-lg transition-shadow border-l-4 border-teal-500">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-teal-100 dark:bg-teal-900/50 rounded-md">
                          <PillarIcon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                        </div>
                        <CardTitle className="font-sans text-lg">{pillar.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="font-serif text-sm text-deep-navy-800/80 dark:text-site-gray-300/80 mb-4">
                        {pillar.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {pillar.tags.map(tag => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  )
                })}
              </div>
            </section>

            <section id="career-trajectory">
              <h2 className="text-3xl font-bold font-sans text-deep-navy-900 dark:text-site-white mb-6 flex items-center">
                <Briefcase className="mr-3 h-7 w-7 text-indigo-500" /> {aboutCopy.careerHeading}
              </h2>
              <InteractiveTimeline events={timelineEvents} />
            </section>

            <section id="technical-expertise">
              <h2 className="text-3xl font-bold font-sans text-deep-navy-900 dark:text-site-white mb-6 flex items-center">
                <Code className="mr-3 h-7 w-7 text-indigo-500" /> {aboutCopy.technicalExpertiseHeading}
              </h2>
              <Card className="bg-white dark:bg-slate-800/50">
                  <CardContent className="p-6">
                      <div className="grid grid-cols-2 gap-4">
                          {technicalExpertise.map(skill => {
                            const SkillIcon = aboutIconMap[skill.icon as keyof typeof aboutIconMap]

                            return (
                              <div key={skill.name} className="flex items-center space-x-3">
                                  <div className="p-2 bg-teal-100 dark:bg-teal-900/50 rounded-md">
                                      <SkillIcon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                  </div>
                                  <p className="font-sans text-md text-deep-navy-800 dark:text-site-gray-200">{skill.name}</p>
                              </div>
                            )
                          })}
                      </div>
                  </CardContent>
              </Card>
            </section>
            
            <section id="global-footprint">
              <h2 className="text-3xl font-bold font-sans text-deep-navy-900 dark:text-site-white mb-4 flex items-center">
                <Globe className="mr-3 h-6 w-6 text-indigo-500" /> {aboutCopy.globalFootprintHeading}
              </h2>
              <p className="font-serif text-md mb-6 text-deep-navy-800/90 dark:text-site-gray-200/90">
                {aboutCopy.globalFootprintBody}
              </p>
              <ClientInteractiveMap />
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}


