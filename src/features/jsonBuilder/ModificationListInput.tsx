import { useState } from 'react'
import { useFieldArray, type Control } from 'react-hook-form'
import { ModificationBuilder } from './ModificationBuilder'
import { cn } from '../../utils/cn'
import type { DataSourceFormValues } from './fieldConfig'

type Version = '1.20.1' | '1.21.1'

type Props = {
  control: Control<DataSourceFormValues>
  index: number
  version: Version
}

type BuilderState =
  | { open: false }
  | { open: true; editIndex: number | null; initial: string | undefined }

const BASIC_MODS = new Set(['invulnerable', 'unbreakable', 'soulbound'])

export const ModificationListInput = ({ control, index, version }: Props) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `attunement_levels.${index}.modifications`,
  })

  const [builder, setBuilder] = useState<BuilderState>({ open: false })

  const openNew = () => setBuilder({ open: true, editIndex: null, initial: undefined })
  const openEdit = (i: number, value: string) =>
    setBuilder({ open: true, editIndex: i, initial: value })
  const closeBuilder = () => setBuilder({ open: false })

  const handleSave = (value: string) => {
    if (!builder.open) return
    if (builder.editIndex !== null) {
      update(builder.editIndex, { value })
    } else {
      append({ value })
    }
    closeBuilder()
  }

  const isAttribute = (v: string) => v.startsWith('attribute/')

  return (
    <>
      {/* Label row */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
          Modifications
        </span>
        <button
          type="button"
          onClick={openNew}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-white transition hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          aria-label="Add modification"
        >
          <span className="text-sm leading-none">+</span>
        </button>
      </div>

      {/* Empty state */}
      {fields.length === 0 && (
        <div className="rounded-lg border border-dashed border-zinc-300 py-3 text-center dark:border-zinc-600">
          <p className="text-xs text-zinc-400">
            No modifications — press <span className="font-semibold">+</span> to add
          </p>
        </div>
      )}

      {/* Modification chips */}
      {fields.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {fields.map((field, i) => {
            const val = field.value
            const isAttr = isAttribute(val)
            const isBasic = BASIC_MODS.has(val)

            return (
              <div key={field.id} className="flex items-center gap-1.5">
                {isAttr ? (
                  <button
                    type="button"
                    onClick={() => openEdit(i, val)}
                    className={cn(
                      'min-w-0 flex-1 truncate rounded-md bg-zinc-100 px-2.5 py-1.5 text-left font-mono text-xs text-zinc-700',
                      'transition hover:bg-zinc-200 dark:bg-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-500',
                    )}
                    title={val}
                  >
                    {val}
                  </button>
                ) : (
                  <div
                    className={cn(
                      'min-w-0 flex-1 truncate rounded-md px-2.5 py-1.5 font-mono text-xs',
                      isBasic
                        ? 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                        : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-600 dark:text-zinc-200',
                    )}
                    title={val}
                  >
                    {val}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:border-zinc-600 dark:hover:border-rose-700 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                  aria-label={`Remove modification ${i + 1}`}
                >
                  ×
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Builder modal */}
      {builder.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeBuilder}
        >
          <ModificationBuilder
            version={version}
            initial={builder.initial}
            onSave={handleSave}
            onClose={closeBuilder}
          />
        </div>
      )}
    </>
  )
}
