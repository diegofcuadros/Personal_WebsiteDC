"use client"

import { useMemo } from "react"
import dynamic from "next/dynamic"

function GlobalReachPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map"), {
        loading: () => <p className="text-slate-700 dark:text-slate-300">A map is loading...</p>,
        ssr: false,
      }),
    [],
  )

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col bg-site-white dark:bg-slate-900">
      <header className="text-center py-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-sans bg-clip-text text-transparent bg-gradient-to-r from-deep-navy via-teal to-vibrant-gold dark:from-slate-100 dark:via-teal-400 dark:to-yellow-400">
          Global Research Footprint
        </h1>
        <p className="font-serif text-lg md:text-xl text-slate-700 dark:text-slate-300 mt-2 max-w-3xl mx-auto">
          From Sub-Saharan Africa to my home in Cincinnati, my research addresses global health challenges. Click on the
          markers to explore projects.
        </p>
      </header>
      <div className="flex-grow container mx-auto px-4 pb-8">
        <Map />
      </div>
    </div>
  )
}

export default GlobalReachPage 