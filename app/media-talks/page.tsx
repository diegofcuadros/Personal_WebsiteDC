import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, Tv, Newspaper } from "lucide-react"
import Link from "next/link";
import YouTubeEmbed from "@/components/youtube-embed";

const mediaHighlights = [
  {
    type: "Interview",
    outlet: "WVXU (Cincinnati NPR)",
    title: "Coronavirus hitting rural communities hard",
    date: "November 2020",
    description:
      "Discussed findings on the COVID-19 surge in rural areas and the need for attention to rural healthcare.",
    icon: Mic,
    link: "https://www.uc.edu/news/articles/2020/11/wvxu-coronavirus-hitting-rural-communities-hard.html",
  },
  {
    type: "Magazine Feature",
    outlet: "UC Magazine",
    title: "Championing science amid adversity",
    date: "2020",
    description:
      "Profile on Dr. Cuadros's approach to communicating data and research on HIV & COVID-19, even when politically sensitive.",
    icon: Newspaper,
    link: "https://www.uc.edu/news/1020/championing-science.html",
  },
  {
    type: "Thought Leader Interview",
    outlet: "News-Medical.net",
    title: "Mapping access to HIV care",
    date: "December 2021",
    description:
      "Explained research on geolocating populations with HIV and measuring travel times to health facilities in Africa to identify underserved areas.",
    icon: Mic,
    link: "https://www.news-medical.net/news/20211223/Mapping-access-to-HIV-care.aspx",
  },
  {
    type: "UC News Feature",
    outlet: "UC News",
    title: "Epicenter of opioid epidemic shifts with drug preferences",
    date: "April 2025 (as per doc)",
    description:
      "Covered the Lancet Regional Health study on the evolving U.S. opioid epidemic, co-authored by Dr. Cuadros.",
    icon: Newspaper,
    link: "https://www.uc.edu/news/articles/2025/04/epicenter-of-opioid-epidemic-shifts-with-drug-preferences.html",
  },
]

const featuredTalksVideos = [
  {
    videoId: "PMbXTsILMFg",
    title: "Insights into Digital Epidemiology", 
    description: "A discussion on the evolving field of digital epidemiology."
  },
  {
    videoId: "qBsfVJ8qYU4",
    title: "The Role of Data in Public Health",
    description: "Exploring how data analytics shapes public health strategies."
  },
  {
    videoId: "Wk9SSwgkuDY",
    title: "Modeling Infectious Diseases",
    description: "An overview of techniques used in modeling disease spread."
  }
];

const talkTypes = [
  { name: "American Association of Geographers (AAG) Annual Meeting", icon: Tv },
  { name: "International AIDS Conferences", icon: Tv },
  { name: "Epidemiology Congresses", icon: Tv },
  { name: "Digital Futures Flashpoint Series (UC)", icon: Tv },
]

export default function MediaTalksPage() {
  return (
    <div className="bg-site-white dark:bg-slate-900">
      <div className="container py-12 md:py-16 px-4 md:px-6">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans bg-clip-text text-transparent bg-gradient-to-r from-deep-navy via-teal to-vibrant-gold dark:from-slate-100 dark:via-teal-400 dark:to-yellow-400">
            Media & Talks
          </h1>
          <p className="text-xl md:text-2xl text-teal-600 dark:text-teal-400 font-semibold font-sans max-w-3xl mx-auto">
            Sharing insights and engaging with the public, policymakers, and the scientific community.
          </p>
        </header>

        <section id="media-highlights" className="mb-12 md:mb-16">
          <h2 className="text-3xl font-bold font-sans text-slate-900 dark:text-slate-100 mb-8 text-center">
            Media Highlights
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {mediaHighlights.map((item) => (
              <Card
                key={item.title}
                className="flex flex-col bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <item.icon className="h-6 w-6 mr-3 text-teal-600 dark:text-teal-400" />
                    <CardTitle className="text-xl font-sans text-slate-900 dark:text-slate-100">
                      {item.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="font-serif text-sm text-slate-600 dark:text-slate-400">
                    {item.type} via {item.outlet} - {item.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="font-serif text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
                {item.link && (
                  <div className="p-6 pt-0">
                    <Link
                      href={item.link}
                      target="_blank"
                      className="text-sm font-sans text-teal-600 dark:text-teal-400 hover:underline"
                    >
                      Read More &rarr;
                    </Link>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        <section id="talks-presentations">
          <h2 className="text-3xl font-bold font-sans text-slate-900 dark:text-slate-100 mb-8 text-center">
            Talks & Presentations
          </h2>
          <p className="font-serif text-lg text-center text-slate-700 dark:text-slate-300 mb-6">
            Dr. Cuadros frequently presents his research at national and international conferences, workshops, and
            public forums. Key venues include:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {talkTypes.map((type) => (
              <div key={type.name} className="flex items-center p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
                <type.icon className="h-5 w-5 mr-2 text-teal-600 dark:text-teal-400" />
                <span className="font-sans text-sm text-slate-800 dark:text-slate-200">{type.name}</span>
              </div>
            ))}
          </div>
          <p className="font-serif text-lg text-center text-slate-700 dark:text-slate-300">
            (A detailed talks timeline will be added here.)
          </p>

          <h3 className="text-2xl font-bold font-sans text-slate-900 dark:text-slate-100 mt-12 mb-6 text-center">
            Featured Talks (Videos)
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTalksVideos.map((item) => (
              <div key={item.videoId} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                <YouTubeEmbed videoId={item.videoId} className="rounded-md overflow-hidden mb-4" />
                <h4 className="text-lg font-semibold font-sans text-slate-900 dark:text-slate-100 mb-1">{item.title}</h4>
                <p className="text-xs font-serif text-slate-700 dark:text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
