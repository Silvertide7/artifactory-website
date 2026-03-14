import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'
import { StringListInput } from '../../components/StringListInput'
import { AttunementLevelItem } from './AttunementLevelItem'
import {
  dataSourceFormSchema,
  defaultValues,
  defaultLevel,
  type DataSourceFormValues,
} from './fieldConfig'
import {
  copyJsonToClipboard,
  downloadJsonFile,
  toCleanOutput,
  toPrettyJson,
} from './output'

const inputClass =
  'w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-500'

const selectClass =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-500'

export const JsonBuilderForm = () => {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<DataSourceFormValues>({
    defaultValues,
    resolver: zodResolver(dataSourceFormSchema),
  })

  const { fields: levelFields, append: appendLevel, remove: removeLevel } =
    useFieldArray({ control, name: 'attunement_levels' })

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current !== null) clearTimeout(copyTimeoutRef.current)
    }
  }, [])

  const values = watch()
  const cleanOutput = toCleanOutput(values)
  const previewJson = toPrettyJson(cleanOutput)

  const onCopy = async () => {
    try {
      await copyJsonToClipboard(cleanOutput)
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }
    if (copyTimeoutRef.current !== null) clearTimeout(copyTimeoutRef.current)
    copyTimeoutRef.current = setTimeout(() => setCopyState('idle'), 1300)
  }

  const onReset = () => {
    reset(defaultValues)
    setCopyState('idle')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form
        className="space-y-5"
        onSubmit={handleSubmit(() => {})}
        noValidate
      >
        {/* Flat scalar fields */}
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Slots Used"
            htmlFor="slots_used"
            error={errors.slots_used?.message}
            hint="INT — leave blank to omit"
          >
            {(errorId) => (
              <input
                id="slots_used"
                type="number"
                placeholder="-1"
                aria-describedby={errorId}
                className={inputClass}
                {...register('slots_used')}
              />
            )}
          </FormField>

          <FormField
            label="Chance"
            htmlFor="chance"
            error={errors.chance?.message}
            hint="DOUBLE — leave blank to omit"
          >
            {(errorId) => (
              <input
                id="chance"
                type="number"
                step="any"
                placeholder="1.0"
                aria-describedby={errorId}
                className={inputClass}
                {...register('chance')}
              />
            )}
          </FormField>

          <FormField
            label="Use Without Attunement"
            htmlFor="use_without_attunement"
            error={errors.use_without_attunement?.message}
            hint="BOOL — leave blank to omit"
          >
            {(errorId) => (
              <select
                id="use_without_attunement"
                aria-describedby={errorId}
                className={selectClass}
                {...register('use_without_attunement')}
              >
                <option value="">— not set —</option>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            )}
          </FormField>

          <FormField
            label="Replace"
            htmlFor="replace"
            error={errors.replace?.message}
            hint="BOOL — leave blank to omit"
          >
            {(errorId) => (
              <select
                id="replace"
                aria-describedby={errorId}
                className={selectClass}
                {...register('replace')}
              >
                <option value="">— not set —</option>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            )}
          </FormField>
        </div>

        {/* apply_to_items */}
        <StringListInput
          control={control}
          name="apply_to_items"
          label="Apply to Items"
          placeholder="e.g. minecraft:diamond_sword"
        />

        {/* attunement_levels */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-800">
              Attunement Levels
            </span>
            <button
              type="button"
              onClick={() => appendLevel(defaultLevel)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
              aria-label="Add attunement level"
            >
              <span className="text-sm leading-none">+</span>
            </button>
          </div>

          {levelFields.length === 0 && (
            <p className="text-xs italic text-slate-400">
              No levels — press + to add.
            </p>
          )}

          {levelFields.map((field, index) => (
            <AttunementLevelItem
              key={field.id}
              index={index}
              control={control}
              register={register}
              errors={errors}
              onRemove={() => removeLevel(index)}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-1">
          <Button type="button" variant="secondary" onClick={onReset}>
            Clear
          </Button>
          <Button type="button" variant="secondary" onClick={onCopy}>
            {copyState === 'copied'
              ? 'Copied!'
              : copyState === 'error'
                ? 'Copy failed'
                : 'Copy JSON'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => downloadJsonFile(cleanOutput)}
          >
            Download JSON
          </Button>
        </div>
      </form>

      {/* JSON preview */}
      <section className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-800">JSON Preview</h2>
          <span className="text-xs text-slate-500">Empty fields omitted</span>
        </div>
        <pre className="max-h-[600px] overflow-auto rounded-md bg-slate-900 p-3 text-xs leading-5 text-slate-100">
          <code>{previewJson}</code>
        </pre>
      </section>
    </div>
  )
}
