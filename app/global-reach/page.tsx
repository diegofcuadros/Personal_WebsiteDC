"use client"

import { useMemo } from "react"
import dynamic from "next/dynamic"

function GlobalReachPage() {
  const StoryMap = useMemo(
    () =>
      dynamic(() => import("@/components/story-map"), {
        loading: () => (
          <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
              <p className="text-slate-700 dark:text-slate-300 font-medium">Loading Interactive StoryMap...</p>
            </div>
          </div>
        ),
        ssr: false,
      }),
    [],
  )

  return (
    <div className="h-screen overflow-hidden bg-site-white dark:bg-slate-900">
      <StoryMap />
    </div>
  )
}

export default GlobalReachPage 