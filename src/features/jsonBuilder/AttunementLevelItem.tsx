import { useState } from 'react'
import type { Control, UseFormRegister, FieldErrors } from 'react-hook-form'
import { StringListInput } from '../../components/StringListInput'
import { FormField } from '../../components/FormField'
import type { DataSourceFormValues } from './fieldConfig'
import { inputClass } from '../../components/inputStyles'

type Props = {
  index: number
  control: Control<DataSourceFormValues>
  register: UseFormRegister<DataSourceFormValues>
  errors: FieldErrors<DataSourceFormValues>
  onRemove: () => void
}

export const AttunementLevelItem = ({
  index,
  control,
  register,
  errors,
  onRemove,
}: Props) => {
  const [isOpen, setIsOpen] = useState(true)
  const levelErrors = errors.attunement_levels?.[index]

  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-50 px-4 py-2.5">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="flex flex-1 items-center gap-2 text-left text-sm font-medium text-slate-700 hover:text-slate-900 focus-visible:outline-none"
        >
          <svg
            className={[
              'h-3 w-3 text-slate-400 transition-transform duration-200',
              isOpen ? 'rotate-90' : '',
            ].join(' ')}
            viewBox="0 0 6 10"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Level {index + 1}
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="rounded px-2 py-1 text-xs text-slate-400 transition hover:bg-rose-50 hover:text-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
        >
          Remove
        </button>
      </div>

      {/* Body */}
      {isOpen && (
        <div className="space-y-5 p-4">
          {/* Modifications */}
          <StringListInput
            control={control}
            name={`attunement_levels.${index}.modifications`}
            label="Modifications"
            labelClassName="text-[11px] font-semibold uppercase tracking-widest text-slate-400"
            placeholder="e.g. invulnerable"
            hint="Modifiers applied when attuned. Simple flags: invulnerable, unbreakable, soulbound. Attribute format: attribute/modid:attribute_name/operation/value/slot — e.g. attribute/minecraft:generic.attack_damage/add_value/5/mainhand"
          />

          {/* Requirements sub-section */}
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              Requirements
            </p>
            <div className="space-y-4 rounded-lg border border-slate-100 bg-slate-50/60 p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <FormField
                  label="XP Consumed"
                  htmlFor={`attunement_levels.${index}.requirements.xp_levels_consumed`}
                  error={levelErrors?.requirements?.xp_levels_consumed?.message}
                  hint="XP levels consumed when attunement completes. Leave blank to require none."
                >
                  {(errorId) => (
                    <input
                      id={`attunement_levels.${index}.requirements.xp_levels_consumed`}
                      type="number"
                      placeholder="-1"
                      aria-describedby={errorId}
                      aria-invalid={
                        levelErrors?.requirements?.xp_levels_consumed
                          ? true
                          : undefined
                      }
                      className={inputClass}
                      {...register(
                        `attunement_levels.${index}.requirements.xp_levels_consumed`,
                      )}
                    />
                  )}
                </FormField>

                <FormField
                  label="XP Threshold"
                  htmlFor={`attunement_levels.${index}.requirements.xp_level_threshold`}
                  error={levelErrors?.requirements?.xp_level_threshold?.message}
                  hint="Minimum XP level required to begin attunement. Acts as a gate — not consumed."
                >
                  {(errorId) => (
                    <input
                      id={`attunement_levels.${index}.requirements.xp_level_threshold`}
                      type="number"
                      placeholder="-1"
                      aria-describedby={errorId}
                      aria-invalid={
                        levelErrors?.requirements?.xp_level_threshold
                          ? true
                          : undefined
                      }
                      className={inputClass}
                      {...register(
                        `attunement_levels.${index}.requirements.xp_level_threshold`,
                      )}
                    />
                  )}
                </FormField>
              </div>

              <StringListInput
                control={control}
                name={`attunement_levels.${index}.requirements.items`}
                label="Items"
                placeholder="e.g. minecraft:nether_star"
                maxItems={3}
                hint="Items consumed on attunement. Format: modid:item_name or modid:item_name#quantity (quantity defaults to 1) — e.g. minecraft:diamond#64"
                itemErrors={
                  levelErrors?.requirements?.items as unknown as Array<{
                    value?: { message?: string }
                  }>
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
