import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, BrainCircuit, MapIcon, Activity, Cpu, BookOpen, Mail } from "lucide-react"

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
    color: "text-teal",
  },
  {
    icon: MapIcon,
    title: "Spatial Epidemiology",
    description:
      "Integrating GIS to map disease incidence, identify hotspots, and uncover environmental/social determinants of health.",
    color: "text-vibrant-gold",
  },
  {
    icon: Activity,
    title: "Digital Epidemiology",
    description:
      "Leveraging large datasets, computational tools, and data visualization for contemporary health challenges like HIV & COVID-19.",
    color: "text-teal",
  },
  {
    icon: Cpu,
    title: "Data Science in Health",
    description:
      "Applying spatial statistics, machine learning, and high-performance computing to complex health data.",
    color: "text-vibrant-gold",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-site-white to-site-gray/30 dark:from-deep-navy dark:to-black overflow-hidden">
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          {/* <Image src="/abstract-neural-network.png" alt="Abstract background" layout="fill" objectFit="cover" /> */}
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 font-sans
                       bg-clip-text text-transparent bg-gradient-to-r from-deep-navy via-teal to-vibrant-gold
                       dark:from-site-white dark:via-teal dark:to-vibrant-gold"
              >
                Dr. Diego F. Cuadros
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-teal dark:text-vibrant-gold mb-6 font-sans">
                Advancing Health Through Innovative Data Analytics
              </h2>
              <p className="text-lg md:text-xl text-deep-navy/80 dark:text-site-gray mb-8 font-serif leading-relaxed">
                Dr. Diego F. Cuadros, an Associate Professor at the University of Cincinnati, specializes in spatial
                epidemiology and disease modeling. He leverages cutting-edge data analytics, geographic information
                systems (GIS), and complex-systems modeling to address pressing challenges in public health and
                epidemiology. Co-director of the Digital Epidemiology Lab, his work bridges academic rigor with
                real-world impact, driving innovation in health outcomes through data-driven insights.
              </p>
              <p className="text-md italic text-teal dark:text-vibrant-gold mb-8 font-sans">
                Harnessing Data for Health Innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-teal hover:bg-teal/90 text-site-white dark:bg-vibrant-gold dark:hover:bg-vibrant-gold/90 dark:text-deep-navy font-sans"
                >
                  <Link href="/research">
                    Explore Research <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-teal text-teal hover:bg-teal/10 dark:border-vibrant-gold dark:text-vibrant-gold dark:hover:bg-vibrant-gold/10 font-sans"
                >
                  <Link href="/publications">
                    View Publications <BookOpen className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <Image
                src="/dr-diego-cuadros-headshot.png"
                alt="Dr. Diego F. Cuadros"
                width={400}
                height={400}
                className="rounded-full shadow-2xl border-4 border-teal dark:border-vibrant-gold object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* As Featured In Section */}
      <section className="py-12 md:py-16 bg-site-gray/50 dark:bg-deep-navy/80">
        <div className="container px-4 md:px-6">
          <h3 className="text-center text-sm font-semibold uppercase text-deep-navy/60 dark:text-site-gray/60 tracking-wider mb-8 font-sans">
            As Featured In / Collaborations With
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12 lg:gap-x-16">
            {featuredLogos.map((logo) => (
              <div key={logo.name} className="opacity-70 hover:opacity-100 transition-opacity">
                <span className="text-lg font-medium text-deep-navy/70 dark:text-site-gray/70 font-sans">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Snapshot Section */}
      <section className="py-16 md:py-24 bg-site-white dark:bg-deep-navy">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-navy dark:text-site-white mb-4 font-sans">
              Expertise Snapshot
            </h2>
            <p className="text-lg text-deep-navy/70 dark:text-site-gray/80 max-w-2xl mx-auto font-serif">
              Key areas where data science meets public health innovation.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertiseAreas.map((area) => (
              <Card
                key={area.title}
                className="bg-background/50 dark:bg-background/20 hover:shadow-xl transition-shadow duration-300 border-l-4 border-teal dark:border-vibrant-gold"
              >
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    <area.icon className={`h-12 w-12 ${area.color}`} />
                  </div>
                  <CardTitle className={`text-xl font-semibold text-center ${area.color} font-sans`}>
                    {area.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-deep-navy/70 dark:text-site-gray/70 text-center font-serif">
                    {area.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Insight Section */}
      <section className="py-16 md:py-24 bg-site-gray/30 dark:bg-deep-navy/90">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-navy dark:text-site-white mb-4 font-sans">
              Latest Insight
            </h2>
            <p className="text-lg text-deep-navy/70 dark:text-site-gray/80 max-w-2xl mx-auto font-serif">
              Fresh perspectives from the intersection of data and health.
            </p>
          </div>
          <Card className="max-w-2xl mx-auto shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-teal dark:text-vibrant-gold font-sans">
                The Evolving Landscape of Digital Epidemiology
              </CardTitle>
              <CardDescription className="text-sm text-deep-navy/60 dark:text-site-gray/60 font-serif pt-1">
                Posted on June 3, 2025
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-deep-navy/80 dark:text-site-gray/90 mb-4 font-serif leading-relaxed">
                A brief 40-word teaser about the latest blog post. This section will auto-pull the most recent blog
                title and teaser content. Exploring new methodologies and their impact...
              </p>
              <Button
                asChild
                variant="link"
                className="px-0 text-teal dark:text-vibrant-gold hover:text-deep-navy dark:hover:text-site-white font-sans"
              >
                <Link href="/insights/latest-post">
                  Read post <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Invitation to Connect Section */}
      <section className="py-16 md:py-20 bg-vibrant-gold dark:bg-teal">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-navy dark:text-site-white mb-6 font-sans">
            Interested in collaboration or consulting?
          </h2>
          <p className="text-lg text-deep-navy/90 dark:text-site-white/90 mb-8 max-w-xl mx-auto font-serif">
            Let’s talk about how we can leverage data to solve complex health challenges together.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-deep-navy hover:bg-deep-navy/90 text-site-white dark:bg-site-white dark:hover:bg-site-white/90 dark:text-deep-navy font-sans"
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
