export default function ResourcesPage() {
  return (
    <div className="container py-12 px-4 md:px-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Resources</h1>
      <div className="max-w-3xl mx-auto space-y-6 font-serif text-lg leading-relaxed">
        <p>
          This section will provide GitHub repo cards (API-fetched stars), a table of datasets with DOIs & size, and
          tutorial notebooks embedded via nbviewer.
        </p>
      </div>
    </div>
  )
}
