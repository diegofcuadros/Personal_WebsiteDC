import { FileText } from "lucide-react"

export default function GrantsPage() {
  return (
    <>
      <div className="flex items-center mb-10">
        <FileText className="h-10 w-10 md:h-12 md:w-12 mr-4 text-teal dark:text-vibrant-gold flex-shrink-0" />
        <h2 className="text-2xl md:text-3xl font-bold font-sans text-deep-navy dark:text-site-white">
          Grants & Funding
        </h2>
      </div>
      <div className="max-w-3xl mx-auto space-y-6 font-serif text-lg leading-relaxed text-deep-navy/80 dark:text-site-gray/80">
        <p>
          This section will detail significant grants that support our research, including Grant Name, Funding Agency,
          Role (e.g., PI, Co-PI), Amount, and Period.
        </p>
        <p>Key grants mentioned in the research profile include:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Naloxone Access and Impact Evaluation (Ohio Department of Health)</li>
          <li>Multilevel and Spatial Determinants of Multimorbidity in South Africa (NIH Fogarty)</li>
          <li>Can Mental Health Services Break the Cycle Perpetuating HIV Hotspots? (NIH R01)</li>
          <li>Rapid Tests for Recent Infection for Precision Public Health in Africa (NIH R01)</li>
          <li>The Changing Face of the HIV Epidemic in Rural KwaZulu-Natal (NIH R01)</li>
        </ul>
        <p>More detailed information will be populated here soon.</p>
      </div>
    </>
  )
}
