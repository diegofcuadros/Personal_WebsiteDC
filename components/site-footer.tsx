import Link from "next/link"
import Image from "next/image"
import { Linkedin, Mail, BookText, Award, Users } from "lucide-react"

const socialLinks = [
  { name: "Email", href: "mailto:diego.cuadros@uc.edu", icon: Mail },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/diego-f-cuadros-71544a45/", icon: Linkedin },
  { name: "Google Scholar", href: "https://scholar.google.com/citations?user=zMoJ8n4AAAAJ&hl=en", icon: BookText },
  { name: "ResearchGate", href: "https://www.researchgate.net/profile/Diego-Cuadros?ev=hdr_xprf", icon: Award },
  { name: "Digital Epi Lab", href: "https://ucdigitalfutures.com/digital-epidemiology-lab/", icon: Users },
]

const footerNavLinks = [
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
]

export default function SiteFooter() {
  return (
    <footer className="bg-deep-navy text-site-gray/80 py-12 font-sans">
      <div className="container max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-3 lg:col-span-1">
            {/* UC Logo */}
            <Image
              src="/UC.png"
              alt="University of Cincinnati Logo"
              width={200} // Doubled width
              height={120} // Doubled height
              className="object-contain mb-2"
            />
            <p className="text-sm font-serif text-site-gray/70">University of Cincinnati</p>
          </div>

          <div>
            <h5 className="font-semibold text-site-white mb-3">Quick Links</h5>
            <ul className="space-y-2">
              {footerNavLinks.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-vibrant-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-site-white mb-3">Legal</h5>
            <ul className="space-y-2">
              {footerNavLinks.slice(4).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-vibrant-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-site-white mb-3">Connect</h5>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-site-gray/80 hover:text-vibrant-gold transition-colors"
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            <div className="mt-4">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d197354.20018980817!2d-84.6800607539097!3d39.13652179924028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8840518d52655b65%3A0x47cf5626287729e0!2sCincinnati%2C%20OH!5e0!3m2!1sen!2sus!4v1678886500000!5m2!1sen!2sus" 
                width="100%" 
                height="150" 
                style={{ border:0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Map of Cincinnati"
                className="rounded-md shadow-md"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="border-t border-site-gray/20 pt-8 text-center md:text-left">
          <p className="text-sm text-site-gray/60 font-serif">
            &copy; {new Date().getFullYear()} Dr. Diego F. Cuadros. All rights reserved.
          </p>
          <p className="text-xs text-site-gray/50 mt-1 font-serif">
            Website designed and developed with innovation in mind.
          </p>
        </div>
      </div>
    </footer>
  )
}
