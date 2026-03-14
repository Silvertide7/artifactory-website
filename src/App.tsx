import { JsonBuilderForm } from './features/jsonBuilder/JsonBuilderForm'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3.5 md:px-8">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-base">
            ⚗️
          </div>
          <div>
            <h1 className="text-sm font-semibold leading-tight text-slate-900">
              Artifactory JSON Builder
            </h1>
            <p className="text-[11px] text-slate-500">
              Attunement data source config generator
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-8">
        <JsonBuilderForm />
      </main>
    </div>
  )
}

export default App
