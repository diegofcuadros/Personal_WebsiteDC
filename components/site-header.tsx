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
  FolderGit2,
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

const navLinks = [
  { href: "/about", label: "About", icon: Info },
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
  { href: "/insights", label: "Insights", icon: Lightbulb },
  { href: "/media-talks", label: "Media & Talks", icon: Mic },
  { href: "/resources", label: "Resources", icon: FolderGit2 },
  { href: "/contact", label: "Contact", icon: Mail },
]

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Logo />
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navLinks.map((link) =>
              link.subLinks ? (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuTrigger className="font-sans bg-transparent hover:bg-muted/50 dark:hover:bg-muted/50">
                    <link.icon className="mr-2 h-4 w-4 text-teal" /> {link.label}
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
                        "font-sans bg-transparent hover:bg-muted/50 dark:hover:bg-muted/50",
                      )}
                    >
                      <link.icon className="mr-2 h-4 w-4 text-teal" /> {link.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-sans text-lg font-medium text-foreground hover:text-teal dark:hover:text-vibrant-gold flex items-center"
                  >
                    <link.icon className="mr-2 h-5 w-5 text-teal" /> {link.label}
                  </Link>
                ))}
              </nav>
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
