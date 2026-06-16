import { Mail, MapPin, Building, Linkedin, BookUser, type LucideIcon } from "lucide-react"
import { contactDetails, type ContactIconKey } from "@/data/contact"

const contactIconMap: Record<ContactIconKey, LucideIcon> = {
  mail: Mail,
  mapPin: MapPin,
  building: Building,
  linkedin: Linkedin,
  bookUser: BookUser,
}

export default function ContactPage() {
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
          {contactDetails.map((item) => {
            const Icon = contactIconMap[item.icon]

            return (
              <div key={item.label} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-teal-600 dark:text-vibrant-gold-400" />
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
                      {Array.isArray(item.value) ? item.value[0] : item.value}
                    </a>
                  ) : (
                    <p className="text-md text-deep-navy-800/90 dark:text-site-gray-200/90 font-serif">
                      {Array.isArray(item.value)
                        ? item.value.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))
                        : item.value}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}