import { useState } from 'react'
import { useFieldArray, type Control } from 'react-hook-form'
import { ItemBuilder } from './ItemBuilder'
import { ErrorMessage } from '../../components/ErrorMessage'
import { cn } from '../../utils/cn'
import type { DataSourceFormValues } from './fieldConfig'

const MAX_ITEMS = 3

type ItemError = { value?: { message?: string } } | undefined

type Props = {
  control: Control<DataSourceFormValues>
  index: number
  itemErrors?: ItemError[]
}

type BuilderState =
  | { open: false }
  | { open: true; editIndex: number | null; initial: string | undefined }

function parseChip(value: string): { itemId: string; quantity: string } {
  const hashIndex = value.indexOf('#')
  if (hashIndex === -1) return { itemId: value, quantity: '' }
  return { itemId: value.slice(0, hashIndex), quantity: value.slice(hashIndex + 1) }
}

export const ItemListInput = ({ control, index, itemErrors }: Props) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `attunement_levels.${index}.requirements.items`,
  })

  const [builder, setBuilder] = useState<BuilderState>({ open: false })

  const atLimit = fields.length >= MAX_ITEMS
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

  return (
    <>
      {/* Label row */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Items
          <span className="text-xs font-normal text-zinc-400">
            ({fields.length}/{MAX_ITEMS})
          </span>
        </span>
        <button
          type="button"
          onClick={openNew}
          disabled={atLimit}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-white transition hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          aria-label="Add item"
        >
          <span className="text-sm leading-none">+</span>
        </button>
      </div>

      {/* Empty state */}
      {fields.length === 0 && (
        <div className="rounded-lg border border-dashed border-zinc-300 py-3 text-center dark:border-zinc-600">
          <p className="text-xs text-zinc-400">
            No items — press <span className="font-semibold">+</span> to add
          </p>
        </div>
      )}

      {/* Item chips */}
      {fields.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {fields.map((field, i) => {
            const { itemId, quantity } = parseChip(field.value)
            const error = itemErrors?.[i]?.value?.message

            return (
              <div key={field.id} className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEdit(i, field.value)}
                    className={cn(
                      'flex min-w-0 flex-1 items-center gap-2 rounded-md bg-zinc-100 px-2.5 py-1.5 text-left transition',
                      'hover:bg-zinc-200 dark:bg-zinc-600 dark:hover:bg-zinc-500',
                      error && 'ring-1 ring-rose-400 dark:ring-rose-700',
                    )}
                    title={field.value}
                  >
                    <span className="truncate font-mono text-xs text-zinc-700 dark:text-zinc-200">
                      {itemId}
                    </span>
                    {quantity && (
                      <span className="shrink-0 text-xs text-zinc-400 dark:text-zinc-400">
                        ×{quantity}
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:border-zinc-600 dark:hover:border-rose-700 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                    aria-label={`Remove item ${i + 1}`}
                  >
                    ×
                  </button>
                </div>
                {error && <ErrorMessage message={error} />}
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
          <ItemBuilder
            initial={builder.initial}
            onSave={handleSave}
            onClose={closeBuilder}
          />
        </div>
      )}
    </>
  )
}
