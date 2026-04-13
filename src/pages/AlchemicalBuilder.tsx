import { AlchemicalBuilderForm } from '../features/alchemicalBuilder/AlchemicalBuilderForm'

export const AlchemicalBuilder = () => (
  <div className="space-y-3">
    <div className="flex items-center gap-3">
      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
        Alchemical Ingredient Builder
      </p>
    </div>

    <AlchemicalBuilderForm />
  </div>
)
