import { Users } from "lucide-react"

export default function LabMembersPage() {
  return (
    <>
      <div className="flex items-center mb-10">
        <Users className="h-10 w-10 md:h-12 md:w-12 mr-4 text-teal dark:text-vibrant-gold flex-shrink-0" />
        <h2 className="text-2xl md:text-3xl font-bold font-sans text-deep-navy dark:text-site-white">
          Lab Members & Openings
        </h2>
      </div>
      <div className="max-w-3xl mx-auto space-y-6 font-serif text-lg leading-relaxed text-deep-navy/80 dark:text-site-gray/80">
        <p>
          Meet the dedicated team of researchers, students, and collaborators at the Digital Epidemiology Lab and the
          Health Geography and Disease Modeling Laboratory.
        </p>
        <p>
          Information on current team members, alumni, and opportunities to join our lab (e.g., postdoctoral positions,
          graduate student openings) will be available here.
        </p>
        <p>Content to be populated soon.</p>
      </div>
    </>
  )
}
