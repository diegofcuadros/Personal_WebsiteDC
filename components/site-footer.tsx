import Link from "next/link"
import Image from "next/image"
import { Linkedin, Mail, BookText, Award, Users } from "lucide-react"

const socialLinks = [
  { name: "Email", href: "mailto:diego.cuadros@uc.edu", icon: Mail },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "ORCID", href: "#", icon: BookText },
  { name: "Google Scholar", href: "#", icon: Award },
  { name: "ResearchGate", href: "#", icon: Users },
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
            <Link href="/" className="block mb-4">
              <Image
                src="/digital-epidemiology-lab-logo.png"
                alt="Digital Epidemiology Laboratory Logo"
                width={102}
                height={40}
                className="object-contain filter brightness-0 invert-[95%] sepia-[12%] saturate-[150%] hue-rotate-[180deg] contrast-[100%]"
              />
            </Link>
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
            <p className="text-xs mt-4 text-site-gray/60 font-serif">
              Map of Cincinnati campus can be embedded on the Contact page.
            </p>
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
