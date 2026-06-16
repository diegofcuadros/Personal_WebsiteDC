import { FileText } from "lucide-react"
import { grants } from "@/data/grants"

export default function GrantsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center mb-6">
        <FileText className="h-10 w-10 md:h-12 md:w-12 mr-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
        <h2 className="text-2xl md:text-3xl font-bold font-sans text-slate-900 dark:text-slate-100">
          Grants & Funding
        </h2>
      </div>

      <p className="text-sm md:text-base font-serif text-slate-700 dark:text-slate-300">
        Our lab and collaborators are supported by competitive federal, state, and institutional funding that enables
        sustained research on digital epidemiology, spatial health disparities, and implementation science. Grants are listed
        below by recency, with emphasis on projects advancing precision public health and actionable translation.
      </p>

      <div className="grid gap-4">
        {grants.map((grant) => (
          <article key={grant.title} className="border rounded-lg p-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 font-sans">{grant.title}</h3>
              <span className="inline-flex items-center rounded-full bg-teal-50 dark:bg-teal-900/30 px-3 py-1 text-xs font-medium text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700">
                {grant.status}
              </span>
            </div>
            <p className="mt-1 font-serif text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold">Funder:</span> {grant.funder}
            </p>
            <p className="font-serif text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold">Role:</span> {grant.role} &nbsp;|&nbsp; <span className="font-semibold">Period:</span> {grant.period}
            </p>
            <p className="font-serif text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold">Award Amount:</span> {grant.amount}
            </p>
            <p className="mt-2 text-sm font-serif text-slate-800 dark:text-slate-200">{grant.impact}</p>
          </article>
        ))}
      </div>
    </div>
  )
}