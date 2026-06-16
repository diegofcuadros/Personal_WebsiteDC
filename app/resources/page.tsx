export default function ResourcesPage() {
  return (
    <div className="container py-12 px-4 md:px-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Resources</h1>
      <p className="max-w-3xl mx-auto text-center text-base md:text-lg font-serif text-slate-700 dark:text-slate-300 mb-8">
        Curated materials supporting my research program in digital epidemiology, with practical code, teaching assets, and open
        datasets used in publications and classrooms.
      </p>
      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 bg-white/90 dark:bg-slate-800">
          <h2 className="text-2xl font-semibold mb-3 font-sans">Code and Methods</h2>
          <p className="font-serif text-slate-700 dark:text-slate-300 mb-4">
            Selected repositories and notebooks for spatial epidemiology workflows, geospatial pipelines, and visualization.
          </p>
          <ul className="space-y-2 font-serif text-sm text-slate-700 dark:text-slate-200">
            <li>Publication-specific code repositories are linked from individual project and publication records when public.</li>
            <li>Teaching notebooks and reproducible workflows are distributed through course and collaboration channels.</li>
            <li>Methods materials emphasize spatial epidemiology, AI-human interaction, and public health visualization workflows.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 bg-white/90 dark:bg-slate-800">
          <h2 className="text-2xl font-semibold mb-3 font-sans">Datasets and Reports</h2>
          <p className="font-serif text-slate-700 dark:text-slate-300 mb-4">
            Data references, spatial layers, and methods notes used in selected projects.
          </p>
          <ul className="space-y-2 font-serif text-sm text-slate-700 dark:text-slate-200">
            <li>Open and licensed geospatial datasets used in teaching modules.</li>
            <li>Publication-specific tables and supplementary materials (DOIs linked from publication pages).</li>
            <li>Public policy briefs and invited commentary in PDF/slide format.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
