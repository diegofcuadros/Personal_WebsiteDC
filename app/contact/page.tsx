import { Mail, MapPin, Building, Linkedin, BookUser } from "lucide-react"

export default function ContactPage() {
  const contactDetails = [
    {
      icon: Mail,
      label: "Email",
      value: "diego.cuadros@uc.edu",
      href: "mailto:diego.cuadros@uc.edu",
    },
    {
      icon: MapPin,
      label: "Address",
      value: (
        <>
          Digital Epidemiology Laboratory, Digital Futures<br />
          University of Cincinnati<br />
          3080 Exploration Ave.<br />
          Cincinnati, OH, 45206
        </>
      ),
    },
    {
      icon: Building,
      label: "Lab Website",
      value: "Digital Epidemiology Lab",
      href: "https://ucdigitalfutures.com/digital-epidemiology-lab/",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Diego F. Cuadros",
      href: "https://www.linkedin.com/in/diego-f-cuadros-71544a45/",
    },
    {
      icon: BookUser, // Using BookUser as a stand-in for ResearchGate, consider a more specific icon if available or custom SVG
      label: "ResearchGate",
      value: "Diego Cuadros Profile",
      href: "https://www.researchgate.net/profile/Diego-Cuadros?ev=hdr_xprf",
    },
  ]

  return (
    <div className="container py-16 md:py-24 px-4 md:px-6">
      <header className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-deep-navy-900 dark:text-site-white mb-4 font-sans">
          Get in Touch
        </h1>
        <p className="text-lg md:text-xl text-deep-navy-800/80 dark:text-site-gray-200/80 max-w-2xl mx-auto font-serif">
          I'm always open to discussing research collaborations, speaking engagements, or mentoring opportunities.
        </p>
      </header>

      <div className="max-w-2xl mx-auto bg-site-white dark:bg-deep-navy-800/30 shadow-xl rounded-lg p-8 md:p-10">
        <div className="space-y-8">
          {contactDetails.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-teal-600 dark:text-vibrant-gold-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-deep-navy-900 dark:text-site-white font-sans mb-1">
                  {item.label}
                </h3>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-md text-teal-600 hover:text-teal-700 dark:text-vibrant-gold-400 dark:hover:text-vibrant-gold-300 transition-colors duration-200 font-serif break-all"
                  >
                    {typeof item.value === 'string' ? item.value : <span>View Link</span>}
                  </a>
                ) : (
                  <p className="text-md text-deep-navy-800/90 dark:text-site-gray-200/90 font-serif">
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Placeholder for future map integration */}
      {/* <div className="mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-deep-navy-900 dark:text-site-white mb-8 font-sans">
          Find Us
        </h2>
        <div className="aspect-video bg-muted rounded-lg shadow-md">
          {/* Map component will go here - e.g., React Leaflet */}
          {/* For now, a placeholder text */}
          {/* <p className='text-center p-8 text-muted-foreground'>Map of University of Cincinnati coming soon.</p> */}
        {/* </div> */}
      {/* </div> */}
    </div>
  )
}
