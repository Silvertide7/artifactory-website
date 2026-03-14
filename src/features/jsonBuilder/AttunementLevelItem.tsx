import type { Control, UseFormRegister, FieldErrors } from 'react-hook-form'
import { StringListInput } from '../../components/StringListInput'
import { FormField } from '../../components/FormField'
import type { DataSourceFormValues } from './fieldConfig'

type Props = {
  index: number
  control: Control<DataSourceFormValues>
  register: UseFormRegister<DataSourceFormValues>
  errors: FieldErrors<DataSourceFormValues>
  onRemove: () => void
}

const inputClass =
  'w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-500'

export const AttunementLevelItem = ({
  index,
  control,
  register,
  errors,
  onRemove,
}: Props) => {
  const levelErrors = errors.attunement_levels?.[index]

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between rounded-t-lg border-b border-slate-200 bg-slate-50 px-4 py-2.5">
        <span className="text-sm font-semibold text-slate-800">
          Level {index + 1}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="rounded px-2 py-1 text-xs text-rose-600 transition hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
        >
          Remove
        </button>
      </div>

      <div className="space-y-5 p-4">
        <StringListInput
          control={control}
          name={`attunement_levels.${index}.modifications`}
          label="Modifications"
          placeholder="e.g. namespace:modifier_id"
        />

        <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Requirements
          </p>
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <FormField
                label="XP Levels Consumed"
                htmlFor={`attunement_levels.${index}.requirements.xp_levels_consumed`}
                error={levelErrors?.requirements?.xp_levels_consumed?.message}
              >
                {(errorId) => (
                  <input
                    id={`attunement_levels.${index}.requirements.xp_levels_consumed`}
                    type="number"
                    placeholder="-1"
                    aria-describedby={errorId}
                    className={inputClass}
                    {...register(`attunement_levels.${index}.requirements.xp_levels_consumed`)}
                  />
                )}
              </FormField>

              <FormField
                label="XP Level Threshold"
                htmlFor={`attunement_levels.${index}.requirements.xp_level_threshold`}
                error={levelErrors?.requirements?.xp_level_threshold?.message}
              >
                {(errorId) => (
                  <input
                    id={`attunement_levels.${index}.requirements.xp_level_threshold`}
                    type="number"
                    placeholder="-1"
                    aria-describedby={errorId}
                    className={inputClass}
                    {...register(`attunement_levels.${index}.requirements.xp_level_threshold`)}
                  />
                )}
              </FormField>

              <FormField
                label="Kills"
                htmlFor={`attunement_levels.${index}.requirements.kills`}
                error={levelErrors?.requirements?.kills?.message}
              >
                {(errorId) => (
                  <input
                    id={`attunement_levels.${index}.requirements.kills`}
                    type="number"
                    placeholder="0"
                    aria-describedby={errorId}
                    className={inputClass}
                    {...register(`attunement_levels.${index}.requirements.kills`)}
                  />
                )}
              </FormField>
            </div>

            <StringListInput
              control={control}
              name={`attunement_levels.${index}.requirements.items`}
              label="Items"
              placeholder="e.g. minecraft:diamond_sword"
              maxItems={3}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
