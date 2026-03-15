import { useEffect, useMemo, useRef, useState } from 'react'
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
    getValues,
  } = useForm<DataSourceFormValues>({
    defaultValues,
    resolver: zodResolver(dataSourceFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const { fields: levelFields, append: appendLevel, remove: removeLevel } =
    useFieldArray({ control, name: 'attunement_levels' })

  // Stable output state — updated only when RHF detects an actual value change,
  // avoiding recomputation on every unrelated re-render.
  const [cleanOutput, setCleanOutput] = useState(() => toCleanOutput(getValues()))

  useEffect(() => {
    const { unsubscribe } = watch((values) => {
      setCleanOutput(toCleanOutput(values as DataSourceFormValues))
    })
    return unsubscribe
  }, [watch])

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current !== null) clearTimeout(copyTimeoutRef.current)
    }
  }, [])

  const previewJson = useMemo(() => toPrettyJson(cleanOutput), [cleanOutput])

  // Subscribe to just the one field used for derived display values.
  const fileName = watch('file_name')

  const downloadFileName = (() => {
    const raw = fileName.trim()
    if (!raw) return 'attunement-data.json'
    const afterColon = raw.split(':')[1]
    return `${afterColon ?? raw}.json`
  })()

  const placementPath = (() => {
    const raw = fileName.trim()
    if (!raw) return null
    if (raw.includes(':')) {
      const [modId, itemName] = raw.split(':')
      return `data/${modId}/artifactory/${itemName}.json`
    }
    return `data/<modid>/artifactory/${raw}.json`
  })()

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
    setCleanOutput(toCleanOutput(defaultValues))
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
        {/* Section: Item / Group */}
        <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
          <div className="border-b border-zinc-100 dark:border-zinc-600 px-5 py-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-400">
              Minecraft Item or Group
            </h2>
          </div>
          <div className="p-5">
            <FormField
              label="Item ID"
              htmlFor="file_name"
              error={errors.file_name?.message}
              hint={"The item this config targets. Sets the download filename — mod ID prefix is stripped automatically.\n\nIf using Apply to Items, use a descriptive group name instead since the filename is ignored by the game.\ne.g. minecraft:swords"}
            >
              {(errorId) => (
                <input
                  id="file_name"
                  type="text"
                  placeholder="minecraft:diamond_sword"
                  aria-describedby={errorId}
                  aria-invalid={errors.file_name ? true : undefined}
                  className={inputClass}
                  {...register('file_name')}
                />
              )}
            </FormField>
            {fileName.trim() && !errors.file_name && (
              <div className="mt-2 space-y-0.5">
                <p className="text-xs text-zinc-400 dark:text-zinc-400">
                  Will download as{' '}
                  <span className="font-mono font-medium text-zinc-600">
                    {downloadFileName}
                  </span>
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-400">
                  Place in{' '}
                  <span className="font-mono font-medium text-zinc-600">
                    {placementPath}
                  </span>
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Section: Data Source Settings */}
        <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
          <div className="border-b border-zinc-100 dark:border-zinc-600 px-5 py-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-400">
              Data Source Settings
            </h2>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <FormField
              label="Slots Used"
              htmlFor="slots_used"
              error={errors.slots_used?.message}
              hint={"How many attunement slots this item reserves.\nRequired to make an item attuneable.\n\nLeave blank or set -1 to disable attunement.\nDefault: -1 (attunement disabled)"}
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
              hint={"Controls whether the item works before attuning.\n\ntrue — works normally, attuning adds bonuses.\nfalse — item is locked until attuned.\nDefault: true"}
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
              hint={"Overrides any existing config from other datapacks.\n\ntrue — this config wins over others.\nRecommended when building modpack configs.\nDefault: false"}
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
              hint={"Probability the item can be attuned.\nChecked once when placed in an Attunement Nexus.\n\nRange: 0.0 – 1.0\nDefault: 1.0 (always attuneable)"}
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
        <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
          <div className="border-b border-zinc-100 dark:border-zinc-600 px-5 py-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-400">
              Item Targets
            </h2>
          </div>
          <div className="p-5">
            <StringListInput
              control={control}
              name="apply_to_items"
              label="Apply to Items"
              placeholder="e.g. minecraft:iron_helmet"
              hint={"Applies this config to specific items.\nWhen set, the JSON filename is ignored.\n\nFormat: modid:item_name\ne.g. minecraft:iron_helmet\nDefault: empty (filename used instead)"}
              itemErrors={
                errors.apply_to_items as unknown as Array<{
                  value?: { message?: string }
                }>
              }
            />
          </div>
        </section>

        {/* Section: Attunement Levels */}
        <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-600 px-5 py-3">
            <h2 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-400">
              Attunement Levels
              {levelFields.length > 0 && (
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-500 dark:bg-zinc-600 dark:text-zinc-300">
                  {levelFields.length}
                </span>
              )}
            </h2>
            <button
              type="button"
              onClick={() => appendLevel(defaultLevel)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-white transition hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
              aria-label="Add attunement level"
            >
              <span className="text-base leading-none">+</span>
            </button>
          </div>

          <div className="p-5">
            {levelFields.length === 0 ? (
              <div className="rounded-lg border border-dashed border-zinc-300 py-8 text-center">
                <p className="text-sm text-zinc-400 dark:text-zinc-400">No attunement levels added</p>
                <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-400">
                  Press <span className="font-semibold text-zinc-600">+</span> to
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
            onClick={() => downloadJsonFile(cleanOutput, downloadFileName)}
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
        <div className="sticky top-20 rounded-xl border border-zinc-700 bg-zinc-900">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-600/60 px-4 py-3">
            <h2 className="text-xs font-semibold text-zinc-300">JSON Preview</h2>
            <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400 dark:text-zinc-400">
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
