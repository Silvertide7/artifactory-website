import { JsonBuilderForm } from './features/jsonBuilder/JsonBuilderForm'

function App() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl p-4 md:p-8">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
        <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          JSON Builder
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Fill out the fields, validate input, then copy or download the
          generated JSON.
        </p>
        <div className="mt-6">
          <JsonBuilderForm />
        </div>
      </section>
    </main>
  )
}

export default App
