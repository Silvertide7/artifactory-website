import { JsonBuilderForm } from './features/jsonBuilder/JsonBuilderForm'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-8">
          <img
            src="/artifactory-logo.png"
            alt="Artifactory Nexus"
            className="h-10 w-10 shrink-0 object-contain drop-shadow-sm"
          />
          <img
            src="/artifactory-title.png"
            alt="Artifactory"
            className="h-6 object-contain"
          />
          <span className="text-slate-300" aria-hidden="true">|</span>
          <p className="text-[11px] text-slate-500">
            Attunement data source config generator
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-8">
        <JsonBuilderForm />
      </main>
    </div>
  )
}

export default App
