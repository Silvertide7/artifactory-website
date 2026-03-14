import { useFieldArray, type Control, type FieldValues, type ArrayPath } from 'react-hook-form'

type StringListInputProps<T extends FieldValues> = {
  control: Control<T>
  name: ArrayPath<T>
  placeholder?: string
  label: string
  maxItems?: number
}

export const StringListInput = <T extends FieldValues>({
  control,
  name,
  placeholder = 'Enter value...',
  label,
  maxItems,
}: StringListInputProps<T>) => {
  const { fields, append, remove } = useFieldArray({ control, name })
  const atLimit = maxItems !== undefined && fields.length >= maxItems

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="block text-sm font-medium text-slate-800">
          {label}
          {maxItems !== undefined && (
            <span className="ml-1.5 text-xs font-normal text-slate-400">
              ({fields.length}/{maxItems})
            </span>
          )}
        </span>
        <button
          type="button"
          onClick={() => append({ value: '' } as never)}
          disabled={atLimit}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={`Add ${label} item`}
        >
          <span className="text-sm leading-none">+</span>
        </button>
      </div>

      {fields.length === 0 && (
        <p className="text-xs text-slate-400 italic">No items — press + to add.</p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <input
            {...(control.register(`${name}.${index}.value` as never))}
            type="text"
            placeholder={placeholder}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-500"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-300 text-slate-500 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            aria-label={`Remove item ${index + 1}`}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
