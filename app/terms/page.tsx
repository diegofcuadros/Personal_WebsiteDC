import Link from "next/link"

export const metadata = {
  title: "Terms of Use | Dr. Diego F. Cuadros",
}

export default function TermsPage() {
  return (
    <div className="container py-12 px-4 md:px-6 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4 font-sans">Terms of Use</h1>
      <p className="text-sm font-serif text-muted-foreground mb-8">
        Last updated: June 2026
      </p>
      <div className="space-y-6 font-serif text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>
          Welcome to the personal and professional website of Dr. Diego F. Cuadros. By accessing or using this site,
          you agree to use the content for non-commercial, educational, and research purposes only.
        </p>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Use of Content</h2>
          <p>
            Publication summaries, data visualizations, and course material are provided for educational and scholarly
            communication. Please cite original sources and do not redistribute full site content as proprietary materials
            without permission.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">External Links</h2>
          <p>
            This site links to external resources (journals, repositories, and institutional sites). We are not responsible
            for third-party content, policies, or outcomes.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Contact</h2>
          <p>
            For permissions, collaborations, or usage questions, please use the <Link href="/contact">Contact</Link> page.
          </p>
        </section>
      </div>
    </div>
  )
}
