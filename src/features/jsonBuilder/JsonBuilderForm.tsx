import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'
import { StringListInput } from '../../components/StringListInput'
import { JsonPreview } from '../../components/JsonPreview'
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
import { inputClass, selectClass } from '../../components/inputStyles'

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
    mode: 'onBlur',
    reValidateMode: 'onChange',
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
    copyTimeoutRef.current = setTimeout(() => setCopyState('idle'), 1500)
  }

  const onReset = () => {
    reset(defaultValues)
    setCopyState('idle')
  }

  return (
    <div className="grid gap-5 lg:grid-cols-5">
      {/* ── Form ── */}
      <form
        className="space-y-4 lg:col-span-3"
        onSubmit={handleSubmit(() => {})}
        noValidate
      >
        {/* Section: Data Source Settings */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 px-5 py-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              Data Source Settings
            </h2>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <FormField
              label="Slots Used"
              htmlFor="slots_used"
              error={errors.slots_used?.message}
              hint="How many attunement slots this item reserves when attuned. Required to make an item attuneable — leave blank (or -1) to disable attunement entirely."
            >
              {(errorId) => (
                <input
                  id="slots_used"
                  type="number"
                  placeholder="-1"
                  aria-describedby={errorId}
                  aria-invalid={errors.slots_used ? true : undefined}
                  className={inputClass}
                  {...register('slots_used')}
                />
              )}
            </FormField>

            <FormField
              label="Use Without Attunement"
              htmlFor="use_without_attunement"
              error={errors.use_without_attunement?.message}
              hint="false = item cannot be used until attuned (locks the item). true = item works normally and attuning just adds bonuses on top."
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
              hint="Set true to override any existing config from other datapacks. Last loaded config with replace: true wins — recommended for modpack configs."
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

            <FormField
              label="Chance"
              htmlFor="chance"
              error={errors.chance?.message}
              hint="Probability (0.0–1.0) that this item can be attuned. Checked once on Attunement Nexus placement. Default 1.0 = always attuneable."
            >
              {(errorId) => (
                <input
                  id="chance"
                  type="number"
                  step="any"
                  placeholder="1.0"
                  aria-describedby={errorId}
                  aria-invalid={errors.chance ? true : undefined}
                  className={inputClass}
                  {...register('chance')}
                />
              )}
            </FormField>
          </div>
        </section>

        {/* Section: Apply to Items */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 px-5 py-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              Item Targets
            </h2>
          </div>
          <div className="p-5">
            <StringListInput
              control={control}
              name="apply_to_items"
              label="Apply to Items"
              placeholder="e.g. minecraft:iron_helmet"
              hint="Apply this config to specific items. When set, the JSON filename is ignored and all listed items receive this config. Format: modid:item_name"
              itemErrors={
                errors.apply_to_items as unknown as Array<{
                  value?: { message?: string }
                }>
              }
            />
          </div>
        </section>

        {/* Section: Attunement Levels */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
            <h2 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              Attunement Levels
              {levelFields.length > 0 && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                  {levelFields.length}
                </span>
              )}
            </h2>
            <button
              type="button"
              onClick={() => appendLevel(defaultLevel)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
              aria-label="Add attunement level"
            >
              <span className="text-base leading-none">+</span>
            </button>
          </div>

          <div className="p-5">
            {levelFields.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-200 py-8 text-center">
                <p className="text-sm text-slate-400">No attunement levels added</p>
                <p className="mt-1 text-xs text-slate-400">
                  Press <span className="font-semibold text-slate-600">+</span> to
                  add a level with requirements and modifications
                </p>
              </div>
            ) : (
              <div className="space-y-3">
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
            )}
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Button variant="secondary" type="button" onClick={onReset}>
            Clear
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => downloadJsonFile(cleanOutput)}
          >
            ↓ Download
          </Button>
          <Button type="button" onClick={onCopy}>
            {copyState === 'copied'
              ? '✓ Copied!'
              : copyState === 'error'
                ? '✗ Copy failed'
                : 'Copy JSON'}
          </Button>
        </div>
      </form>

      {/* ── JSON Preview ── */}
      <div className="lg:col-span-2">
        <div className="sticky top-20 overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-700/60 px-4 py-3">
            <h2 className="text-xs font-semibold text-slate-300">JSON Preview</h2>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-500">
              empty fields omitted
            </span>
          </div>
          <div className="max-h-[calc(100vh-10rem)] min-h-48 overflow-auto">
            <JsonPreview json={previewJson} />
          </div>
        </div>
      </div>
    </div>
  )
}
