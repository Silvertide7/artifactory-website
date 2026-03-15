import {
  useFieldArray,
  type Control,
  type FieldValues,
  type ArrayPath,
} from 'react-hook-form'
import { Tooltip } from './Tooltip'
import { inputClass } from './inputStyles'

type ItemError = { value?: { message?: string } } | undefined

type StringListInputProps<T extends FieldValues> = {
  control: Control<T>
  name: ArrayPath<T>
  placeholder?: string
  label: string
  labelClassName?: string
  hint?: string
  maxItems?: number
  itemErrors?: ItemError[]
}

export const StringListInput = <T extends FieldValues>({
  control,
  name,
  placeholder = 'Enter value…',
  label,
  labelClassName = 'text-sm font-medium text-zinc-700',
  hint,
  maxItems,
  itemErrors,
}: StringListInputProps<T>) => {
  const { fields, append, remove } = useFieldArray({ control, name })
  const atLimit = maxItems !== undefined && fields.length >= maxItems

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className={`flex items-center gap-1.5 ${labelClassName}`}>
          {label}
          {hint && <Tooltip content={hint} />}
          {maxItems !== undefined && (
            <span className="text-xs font-normal text-slate-400">
              ({fields.length}/{maxItems})
            </span>
          )}
        </span>
        <button
          type="button"
          onClick={() => append({ value: '' } as never)}
          disabled={atLimit}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-white transition hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={`Add ${label} item`}
        >
          <span className="text-sm leading-none">+</span>
        </button>
      </div>

      {fields.length === 0 && (
        <div className="rounded-lg border border-dashed border-zinc-300 py-3 text-center">
          <p className="text-xs text-slate-400">
            No items — press <span className="font-semibold">+</span> to add
          </p>
        </div>
      )}

      {fields.map((field, index) => {
        const itemError = itemErrors?.[index]?.value?.message
        return (
          <div key={field.id} className="space-y-1">
            <div className="flex gap-2">
              <input
                {...(control.register(`${name}.${index}.value` as never))}
                type="text"
                placeholder={placeholder}
                aria-invalid={itemError ? true : undefined}
                className={[
                  inputClass,
                  itemError
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-100'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
                aria-label={`Remove item ${index + 1}`}
              >
                ×
              </button>
            </div>
            {itemError && (
              <p className="flex items-center gap-1 text-xs text-rose-500">
                <span aria-hidden="true">⚠</span>
                {itemError}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
