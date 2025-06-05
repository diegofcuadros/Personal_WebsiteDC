"use client"

import dynamic from "next/dynamic"

const InteractiveMap = dynamic(() => import("@/components/interactive-map"), {
  ssr: false,
  loading: () => (
    <div
      className="h-[500px] w-full bg-site-gray/30 dark:bg-deep-navy/50 flex items-center justify-center rounded-lg shadow-lg border border-site-gray/30 dark:border-deep-navy/50"
      aria-label="Loading map"
    >
      <p className="font-sans text-deep-navy dark:text-site-gray">Loading Interactive Map...</p>
    </div>
  ),
})

export default function ClientInteractiveMap() {
  return <InteractiveMap />
}
