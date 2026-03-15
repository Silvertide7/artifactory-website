import { JsonBuilderForm } from '../features/jsonBuilder/JsonBuilderForm'

export const JsonBuilder = () => (
  <div className="space-y-6">
    {/* Page header */}
    <div className="flex items-center gap-4">
      <img
        src="/artifactory-logo.png"
        alt="Artifactory Nexus"
        className="h-10 w-10 shrink-0 object-contain drop-shadow-sm"
      />
      <div className="flex items-center gap-3">
        <img
          src="/artifactory-title.png"
          alt="Artifactory"
          className="h-6 object-contain"
        />
        <span className="text-zinc-300" aria-hidden="true">|</span>
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Attunement Data Source Config Generator
        </p>
      </div>
    </div>

    <JsonBuilderForm />
  </div>
)
