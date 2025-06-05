import type React from "react"

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-site-white dark:bg-deep-navy text-deep-navy dark:text-site-gray">
      <div className="container py-12 md:py-16 px-4 md:px-6">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans bg-clip-text text-transparent bg-gradient-to-r from-deep-navy via-teal to-vibrant-gold dark:from-site-white dark:via-teal dark:to-vibrant-gold">
            Research
          </h1>
        </header>
        {children}
      </div>
    </div>
  )
}
