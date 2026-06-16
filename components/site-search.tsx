"use client"

import * as React from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { BookOpen, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { allPublications } from "@/data/publications"

const quickLinks = [
  {
    href: "/about",
    title: "About",
    description: "Research biography, teaching, and professional background.",
  },
  {
    href: "/research",
    title: "Research",
    description: "Core themes, projects, grants, and team.",
  },
  {
    href: "/publications",
    title: "Publications",
    description: "Peer-reviewed papers and selected research output.",
  },
  {
    href: "/teaching-mentoring",
    title: "Teaching & Mentoring",
    description: "Courses taught and mentoring opportunities.",
  },
  {
    href: "/media-talks",
    title: "Media & Talks",
    description: "Interviews, talks, and policy-facing contributions.",
  },
  {
    href: "/contact",
    title: "Contact",
    description: "Request a collaboration, talk, or advisory conversation.",
  },
]

const publicationIndex = allPublications.map(({ title, authors, journal, year }) => ({
  title,
  authors,
  journal,
  year,
}))

export function SiteSearch() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((current) => !current)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (url: string) => {
    router.push(url)
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <Search className="h-4 w-4" />
        Search...
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a keyword, page, or publication title..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {quickLinks.map((link) => (
              <CommandItem
                key={link.href}
                value={link.title}
                onSelect={() => handleSelect(link.href)}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span>{link.title}</span>
                  <span className="text-xs text-muted-foreground">{link.description}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Publications">
            {publicationIndex.map((pub) => (
              <CommandItem
                key={pub.title}
                value={pub.title}
                onSelect={() => handleSelect(`/publications?query=${encodeURIComponent(pub.title)}`)}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span>{pub.title}</span>
                  <span className="text-xs text-muted-foreground">{pub.authors} ({pub.year})</span>
                  <span className="text-xs text-muted-foreground">{pub.journal}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}




