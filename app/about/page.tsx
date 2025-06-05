import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, Briefcase, MapPin, Users, Lightbulb, Globe } from "lucide-react"
import ClientInteractiveMap from "@/components/client-interactive-map"

const professionalPositions = [
  {
    role: "Associate Professor, Geography & GIS",
    institution: "University of Cincinnati",
    period: "2021–present",
    focus:
      "Current position, specializing in digital epidemiology. Co-Director, Digital Epidemiology Lab, UC Digital Futures (c. 2021–present). Director, Health Geography and Disease Modeling Laboratory.",
  },
  {
    role: "Assistant Professor, Department of Geography & GIS",
    institution: "University of Cincinnati",
    period: "2016–2021",
    focus: "Founded Health Geography & Disease Modeling Lab.",
  },
  {
    role: "Research Scientist",
    institution: "Africa Centre for Population Health (now Africa Health Research Institute), South Africa",
    period: "2015",
    focus: "Investigated HIV geographic trends and local epidemic patterns in KwaZulu-Natal.",
  },
  {
    role: "Postdoctoral Fellow",
    institution: "Weill Cornell Medicine – Qatar",
    period: "2012–2014",
    focus:
      "Examined spatial patterns of diseases like HIV and hepatitis C in the Middle East. Honed skills in spatial statistics and GIS.",
  },
]

export default function AboutPage() {
  return (
    <div className="bg-site-white dark:bg-deep-navy text-deep-navy dark:text-site-gray">
      <div className="container py-12 md:py-16 px-4 md:px-6">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans bg-clip-text text-transparent bg-gradient-to-r from-deep-navy via-teal to-vibrant-gold dark:from-site-white dark:via-teal dark:to-vibrant-gold">
            About Dr. Diego F. Cuadros
          </h1>
          <p className="text-xl md:text-2xl text-teal dark:text-vibrant-gold font-semibold font-sans">
            Epidemiologist & Health Geographer
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-1">
            <Image
              src="/dr-diego-cuadros-headshot.png"
              alt="Dr. Diego F. Cuadros"
              width={350}
              height={350}
              className="rounded-lg shadow-xl mx-auto border-4 border-teal dark:border-vibrant-gold object-cover"
            />
            <div className="mt-6 text-center md:text-left">
              <h3 className="text-2xl font-semibold font-sans text-deep-navy dark:text-site-white mb-2">
                Dr. Diego F. Cuadros, Ph.D.
              </h3>
              <p className="text-md text-teal dark:text-vibrant-gold font-sans">
                Associate Professor, University of Cincinnati
              </p>
              <p className="text-sm text-deep-navy/80 dark:text-site-gray/80 font-serif mt-1">
                Co-Director, Digital Epidemiology Lab (UC Digital Futures)
                <br />
                Director, Health Geography and Disease Modeling Laboratory
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-6 w-full md:w-auto border-teal text-teal hover:bg-teal/10 dark:border-vibrant-gold dark:text-vibrant-gold dark:hover:bg-vibrant-gold/10"
              >
                <Link href="/diego-f-cuadros-cv.pdf" target="_blank">
                  <Download className="mr-2 h-4 w-4" /> Download CV
                </Link>
              </Button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-8">
            <section id="biography-mission">
              <h2 className="text-3xl font-bold font-sans text-deep-navy dark:text-site-white mb-4 flex items-center">
                <Users className="mr-3 h-7 w-7 text-teal dark:text-vibrant-gold" /> Biography & Mission
              </h2>
              <div className="space-y-4 font-serif text-lg leading-relaxed text-deep-navy/90 dark:text-site-gray/90">
                <p>
                  Born and raised in Bogotá, Colombia, Dr. Diego F. Cuadros developed an early interest in nature and
                  science. He earned his B.Sc. in Biology from the National University of Colombia, followed by a Ph.D.
                  in Biology from the University of Kentucky in 2012. His doctoral research, focusing on HIV
                  epidemiology and the impact of co-infections in sub-Saharan Africa, cultivated his passion for
                  quantitative epidemiology and health geography.
                </p>
                <p>
                  Dr. Cuadros specializes in spatial epidemiology and disease modeling, leveraging geographic
                  information systems (GIS) and data science to study infectious disease patterns. His mission is to
                  bridge academic rigor with real-world impact, using interdisciplinary approaches that connect
                  geography, epidemiology, and computational methods to address global and community health issues.
                </p>
              </div>
            </section>

            <section id="career-trajectory">
              <h2 className="text-3xl font-bold font-sans text-deep-navy dark:text-site-white mb-6 flex items-center">
                <Briefcase className="mr-3 h-7 w-7 text-teal dark:text-vibrant-gold" /> Career Trajectory
              </h2>
              <div className="space-y-6">
                {professionalPositions.map((pos) => (
                  <div
                    key={pos.period}
                    className="p-4 border-l-4 border-teal dark:border-vibrant-gold bg-site-gray/30 dark:bg-deep-navy/50 rounded-r-lg"
                  >
                    <h4 className="font-sans font-semibold text-xl text-deep-navy dark:text-site-white">{pos.role}</h4>
                    <p className="font-sans text-md text-teal dark:text-vibrant-gold">
                      {pos.institution} ({pos.period})
                    </p>
                    <p className="font-serif text-sm mt-1 text-deep-navy/80 dark:text-site-gray/80">{pos.focus}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="text-2xl font-bold font-sans text-deep-navy dark:text-site-white mb-4 flex items-center">
                  <Globe className="mr-3 h-6 w-6 text-teal dark:text-vibrant-gold" /> Global Research Footprint
                </h3>
                <p className="font-serif text-md mb-6 text-deep-navy/80 dark:text-site-gray/80">
                  My research spans five continents, involving over a dozen institutions and data partnerships. This
                  interactive map highlights key projects where I’ve applied spatial science, modeling, and AI to solve
                  real-world public health challenges—from HIV hotspots in southern Africa to predictive dashboards in
                  U.S. urban centers. Hover over a pin for a brief title, and click for more details.
                </p>
                <ClientInteractiveMap />
              </div>
              <p className="font-serif text-md mt-6 text-deep-navy/80 dark:text-site-gray/80">
                (Note: An interactive timeline using TimelineJS will be implemented here in a future update.)
              </p>
            </section>
          </div>
        </div>

        <section id="research-philosophy" className="mt-12 md:mt-16">
          <h2 className="text-3xl font-bold font-sans text-deep-navy dark:text-site-white mb-4 text-center flex items-center justify-center">
            <Lightbulb className="mr-3 h-7 w-7 text-teal dark:text-vibrant-gold" /> Research & Teaching Philosophy
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 font-serif text-lg leading-relaxed text-deep-navy/90 dark:text-site-gray/90 text-center">
            <p>
              Dr. Cuadros's research philosophy emphasizes interdisciplinary collaboration, rigorous quantitative
              analysis, and the translation of complex data into actionable insights. He believes in the power of
              geospatial analytics and mathematical modeling to not only understand disease dynamics but also to inform
              targeted interventions and policies. In teaching, he aims to mentor the next generation of health
              geographers and data scientists, fostering critical thinking and practical skills in spatial analysis and
              epidemiological methods.
            </p>
          </div>
        </section>

        <section id="broader-impact" className="mt-12 md:mt-16">
          <h2 className="text-3xl font-bold font-sans text-deep-navy dark:text-site-white mb-6 text-center flex items-center justify-center">
            <MapPin className="mr-3 h-7 w-7 text-teal dark:text-vibrant-gold" /> Broader Impact
          </h2>
          <div className="max-w-4xl mx-auto space-y-4 font-serif text-lg leading-relaxed text-deep-navy/90 dark:text-site-gray/90">
            <p>
              The research conducted by Dr. Cuadros and his lab has significant broader impacts, contributing to
              understanding and combating major public health crises globally and locally. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                Informing HIV prevention and treatment strategies in sub-Saharan Africa by identifying high-risk
                communities and factors influencing epidemic trajectories.
              </li>
              <li>
                Providing critical insights into the COVID-19 pandemic's spread, particularly highlighting
                vulnerabilities in rural populations and informing public health responses.
              </li>
              <li>
                Mapping and analyzing the spatial epidemiology of diseases like Hepatitis C in Egypt and the opioid
                crisis in the United States, guiding targeted interventions.
              </li>
              <li>
                Advancing methodologies in digital and spatial epidemiology, benefiting the wider scientific community.
              </li>
            </ul>
            <p className="mt-4 text-center">
              (Note: The interactive map above provides a visual representation of global impact. A more detailed Mapbox
              heatmap visualizing countries/regions impacted by Dr. Cuadros's research could be integrated in the
              future.)
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
