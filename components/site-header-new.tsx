"use client"

import Link from "next/link"
import Logo from "./logo"
import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  BookOpen,
  Lightbulb,
  Mic,
  Mail,
  Info,
  Microscope,
  GraduationCap,
  Presentation,
  Home,
  Globe,
  Users,
} from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React from "react"
import { cn } from "@/lib/utils"
import { SiteSearch } from "./site-search"

interface NavLink {
  href: string
  label: string
  icon: React.ElementType
  subLinks?: {
    href: string
    title: string
    description: string
  }[]
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/global-reach", label: "Global Reach", icon: Globe },
  {
    href: "/research",
    label: "Research",
    icon: Microscope,
    subLinks: [
      { href: "/research/themes", title: "Research Themes", description: "Core areas of investigation." },
      { href: "/research/projects", title: "Projects", description: "Detailed ongoing and past projects." },
      { href: "/research/grants", title: "Grants & Funding", description: "Secured funding for our work." },
      { href: "/research/lab-members", title: "Lab Members & Openings", description: "Meet the team and join us." },
    ],
  },
  { href: "/publications", label: "Publications", icon: BookOpen },
  { href: "/expertise-services", label: "Expertise", icon: GraduationCap },
  { href: "/teaching-mentoring", label: "Teaching", icon: Presentation },
  { href: "/media-talks", label: "Media & Talks", icon: Mic },
  { href: "/contact", label: "Contact", icon: Mail },
  // Add other links here if needed
];

export default function SiteHeaderNew() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Logo />
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navLinks.map((link) =>
              link.subLinks ? (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuTrigger className="font-sans bg-transparent hover:bg-muted/50 dark:hover:bg-muted/50 transition-all duration-200">
                    <link.icon className="mr-2 h-4 w-4 text-teal-500" /> {link.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {link.subLinks.map((subLink) => (
                        <ListItem key={subLink.title} title={subLink.title} href={subLink.href}>
                          {subLink.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={link.label}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "font-sans bg-transparent hover:bg-muted/50 dark:hover:bg-muted/50 transition-all duration-200",
                      )}
                    >
                      <link.icon className="mr-2 h-4 w-4 text-teal-500" /> {link.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center space-x-2">
          <SiteSearch />
          <ModeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur-md">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <h2 className="text-lg font-semibold font-sans">Navigation</h2>
                </div>
                <nav className="flex flex-col space-y-2 mt-6 flex-1">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="font-sans text-base font-medium text-foreground hover:text-teal-500 dark:hover:text-vibrant-gold-400 flex items-center p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 animate-slide-in-right"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-950/20 flex items-center justify-center mr-3">
                        <link.icon className="h-5 w-5 text-teal-500" />
                      </div>
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </nav>
                <div className="border-t border-border pt-4 mt-4">
                  <p className="text-xs text-muted-foreground font-serif text-center">
                    © 2024 Dr. Diego F. Cuadros
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground font-sans",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground font-serif">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem" 