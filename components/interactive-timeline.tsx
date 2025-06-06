"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineEvent {
  role: string
  institution: string
  period: string
  focus: string
}

interface InteractiveTimelineProps {
  events: TimelineEvent[]
}

const timelineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function InteractiveTimeline({ events }: InteractiveTimelineProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true, threshold: 0.2 })

  return (
    <div ref={ref} className="relative w-full">
      <div className="absolute left-1/2 md:left-4 top-0 h-full w-0.5 bg-teal-200/50 dark:bg-teal-800/50 md:translate-x-0 -translate-x-1/2" />
      <motion.div
        variants={timelineVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="space-y-12 md:space-y-0 md:flex md:gap-8 md:overflow-x-auto md:pb-8 md:scrollbar-thin md:scrollbar-thumb-teal-400/50 md:scrollbar-track-transparent"
      >
        {events.map((event, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="relative md:flex-shrink-0 md:w-80"
          >
            <div className="absolute -left-2 top-1.5 h-4 w-4 rounded-full bg-teal-500 border-4 border-site-white dark:border-deep-navy-900 md:left-1.5" />
            <div className="pl-8 md:pl-12">
              <p className="font-sans text-sm text-vibrant-gold-500 dark:text-vibrant-gold-400 mb-1">{event.period}</p>
              <h4 className="font-sans font-bold text-lg text-deep-navy-900 dark:text-site-white">{event.role}</h4>
              <p className="font-sans text-md text-teal-600 dark:text-teal-400 mb-2">{event.institution}</p>
              <p className="font-serif text-sm text-deep-navy-800/80 dark:text-site-gray-200/80">{event.focus}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
} 