import { JsonBuilderForm } from '../features/jsonBuilder/JsonBuilderForm'

export const JsonBuilder = () => (
  <div className="space-y-6">
    {/* Page header */}
    <div className="flex items-center gap-3">
      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
        Attunement Data Source Config Generator
      </p>
    </div>

    <JsonBuilderForm />
  </div>
)
