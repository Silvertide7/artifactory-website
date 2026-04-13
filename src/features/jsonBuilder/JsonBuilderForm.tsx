import { useEffect, useMemo, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'
import { StringListInput } from '../../components/StringListInput'
import { JsonPreview } from '../../components/JsonPreview'
import { SectionHeader } from '../../components/SectionHeader'
import { AttunementLevelItem } from './AttunementLevelItem'
import { SavedItemsList } from './SavedItemsList'
import { useSavedItems } from './useSavedItems'
import {
  dataSourceFormSchema,
  defaultValues,
  defaultLevel,
  type DataSourceFormValues,
} from './fieldConfig'
import {
  copyJsonToClipboard,
  computeDownloadFileName,
  computePlacementPath,
  downloadJsonFile,
  downloadDatapack,
  toCleanOutput,
  toComponentString,
  toPrettyJson,
} from './output'
import { inputClass, selectClass } from '../../components/inputStyles'

type Version = '1.20.1' | '1.21.1'
type OutputMode = 'datapack' | 'component'

export const JsonBuilderForm = () => {
  const [version, setVersion] = useState<Version>('1.21.1')
  const [outputMode, setOutputMode] = useState<OutputMode>('datapack')
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [pendingLoad, setPendingLoad] = useState<string | null>(null)
  const [savePrompt, setSavePrompt] = useState(false)
  const { items: savedItems, save: saveItem, remove: removeItem, find: findItem } = useSavedItems()

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

  const {
    fields: levelFields,
    append: appendLevel,
    remove: removeLevel,
  } = useFieldArray({ control, name: 'attunement_levels' })

  // Stable output state: updated only when RHF detects an actual value change,
  // avoiding recomputation on every unrelated re-render.
  const [cleanOutput, setCleanOutput] = useState(() => toCleanOutput(getValues()))

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
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
  const componentString = useMemo(() => toComponentString(getValues()), [cleanOutput])
  const hasOutput = Object.keys(cleanOutput).length > 0

  // Subscribe to just the one field used for derived display values.
  const fileName = watch('file_name')

  const downloadFileName = computeDownloadFileName(fileName)
  const placementPath = computePlacementPath(fileName)

  const canSave = hasOutput && fileName.trim() !== '' && !errors.file_name

  const doLoad = (values: DataSourceFormValues) => {
    reset(values)
    setCleanOutput(toCleanOutput(values))
    setPendingLoad(null)
    setSavePrompt(false)
    setCopyState('idle')
  }

  const handleItemClick = (file_name: string) => {
    if (!hasOutput) {
      const item = findItem(file_name)
      if (item) doLoad(item.values)
    } else {
      setPendingLoad(file_name)
    }
  }

  const handleCopyValues = (file_name: string) => {
    const item = findItem(file_name)
    if (!item) return
    // Import saved settings but keep the current item ID
    doLoad({ ...item.values, file_name: fileName })
  }

  const handleLoad = (file_name: string) => {
    const item = findItem(file_name)
    if (item) doLoad(item.values)
  }

  const handleSave = () => {
    if (!canSave) return
    const existing = findItem(fileName.trim())
    if (!existing) {
      saveItem(getValues())
      return
    }
    const existingJson = toPrettyJson(toCleanOutput(existing.values))
    const currentJson = toPrettyJson(cleanOutput)
    if (existingJson === currentJson) return // identical, nothing to do
    setSavePrompt(true)
  }

  const handleConfirmOverwrite = () => {
    saveItem(getValues())
    setSavePrompt(false)
  }

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

  const onCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(componentString)
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
    <div className="grid gap-4 lg:grid-cols-5">
      {/* ── Form ── */}
      <form className="space-y-4 lg:col-span-3" onSubmit={handleSubmit(() => {})} noValidate>
        {/* Section: Item / Group */}
        <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
          <SectionHeader title="Minecraft Item or Group" />
          <div className="p-5">
            <FormField
              label="Item ID"
              htmlFor="file_name"
              error={errors.file_name?.message}
              hint={
                'Sets the download filename (mod ID prefix is stripped automatically). When Apply to Items is empty, this also determines which item the config targets in the game.\n\nIf Apply to Items has entries, this field is still used for the filename and folder path, but it is not the attunement target. Use a descriptive group name in that case.\ne.g. minecraft:swords'
              }
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
                <p className="text-xs text-zinc-400">
                  Will download as{' '}
                  <span className="font-mono font-medium text-zinc-600 dark:text-zinc-300">
                    {downloadFileName}
                  </span>
                </p>
                <p className="text-xs text-zinc-400">
                  Place in{' '}
                  <span className="font-mono font-medium text-zinc-600 dark:text-zinc-300">
                    {placementPath}
                  </span>
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Section: Data Source Settings */}
        <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
          <SectionHeader title="Data Source Settings" />
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <FormField
              label="Slots Used"
              htmlFor="slots_used"
              error={errors.slots_used?.message}
              hint={
                'How many attunement slots this item reserves.\nRequired to make an item attuneable.\n\nLeave blank or set -1 to disable attunement.\nDefault: -1 (attunement disabled)'
              }
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
              hint={
                'Controls whether the item works before attuning.\n\ntrue: works normally, attuning adds bonuses.\nfalse: item is locked until attuned.\nDefault: true'
              }
            >
              {(errorId) => (
                <select
                  id="use_without_attunement"
                  aria-describedby={errorId}
                  className={selectClass}
                  {...register('use_without_attunement')}
                >
                  <option value="">not set</option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              )}
            </FormField>

            <FormField
              label="Replace"
              htmlFor="replace"
              error={errors.replace?.message}
              hint={
                'Overrides any existing config from other datapacks.\n\ntrue: this config wins over others.\nRecommended when building modpack configs.\nDefault: false'
              }
            >
              {(errorId) => (
                <select
                  id="replace"
                  aria-describedby={errorId}
                  className={selectClass}
                  {...register('replace')}
                >
                  <option value="">not set</option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              )}
            </FormField>

            <FormField
              label="Chance"
              htmlFor="chance"
              error={errors.chance?.message}
              hint={
                'Probability the item can be attuned.\nChecked once when placed in an Attunement Nexus.\n\nRange: 0.0 – 1.0\nDefault: 1.0 (always attuneable)'
              }
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

        {/* Section: Attunement Levels */}
        <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
          <SectionHeader
            title={
              <>
                Attunement Levels
                {levelFields.length > 0 && (
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-500 dark:bg-zinc-600 dark:text-zinc-300">
                    {levelFields.length}
                  </span>
                )}
              </>
            }
            action={
              <button
                type="button"
                onClick={() => appendLevel(defaultLevel)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-white transition hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                aria-label="Add attunement level"
              >
                <span className="text-base leading-none">+</span>
              </button>
            }
          />

          <div className="p-5">
            {/* Version toggle */}
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Version:</span>
              <div className="flex rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 dark:border-zinc-600 dark:bg-zinc-700">
                {(['1.21.1', '1.20.1'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVersion(v)}
                    className={[
                      'rounded-md px-3 py-1 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-zinc-400',
                      version === v
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                        : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200',
                    ].join(' ')}
                  >
                    {v === '1.21.1' ? 'NeoForge 1.21.1' : 'Forge 1.20.1'}
                  </button>
                ))}
              </div>
            </div>

            {levelFields.length === 0 ? (
              <div className="rounded-lg border border-dashed border-zinc-300 py-8 text-center dark:border-zinc-600">
                <p className="text-sm text-zinc-400">No attunement levels added</p>
                <p className="mt-1 text-xs text-zinc-400">
                  Press <span className="font-semibold text-zinc-600 dark:text-zinc-300">+</span> to
                  add a level with requirements and modifications
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {levelFields.map((field, index) => (
                  <AttunementLevelItem
                    key={field.id}
                    index={index}
                    version={version}
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

        {/* Section: Item Targets */}
        <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
          <SectionHeader title="Item Targets" />
          <div className="p-5">
            <StringListInput
              control={control}
              name="apply_to_items"
              label="Apply to Items"
              placeholder="e.g. minecraft:iron_helmet"
              hint={
                'When items are added here, the attunements in this config apply to every item in the list.\n\nThe file name and mod ID folder are no longer used as the attunement target; only the items listed here will receive the attunements. Items must use the format modid:item_name.\n\nOnly valid, exact item IDs will be matched. Invalid or missing items are ignored by the mod.'
              }
              itemErrors={
                errors.apply_to_items as unknown as Array<{
                  value?: { message?: string }
                }>
              }
            />
            {Array.isArray(cleanOutput.apply_to_items) &&
              (cleanOutput.apply_to_items as string[]).length > 0 && (
                <p className="mt-3 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-600 dark:border-zinc-600 dark:bg-zinc-600/30 dark:text-zinc-300">
                  These attunements will apply to{' '}
                  <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                    {(cleanOutput.apply_to_items as string[]).length} item
                    {(cleanOutput.apply_to_items as string[]).length !== 1 ? 's' : ''}
                  </span>{' '}
                  listed above. The file name is used only for saving and downloading; it is not
                  used as an attunement target. Only the items in this list will receive the
                  attunements.
                </p>
              )}
          </div>
        </section>

      </form>

      {/* ── JSON Preview + Saved Items ── */}
      <div className="sticky top-4 flex max-h-[calc(100vh-2rem)] flex-col gap-4 overflow-y-auto lg:col-span-2">
        <div className="rounded-xl border border-zinc-700 bg-zinc-900">
          {/* Mode toggle header */}
          <div className="flex items-center justify-between border-b border-zinc-700/60 px-4 py-3">
            <div className="flex rounded-lg border border-zinc-700 bg-zinc-800 p-0.5">
              {(['datapack', 'component'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setOutputMode(mode)}
                  className={[
                    'rounded-md px-3 py-1 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-zinc-400',
                    outputMode === mode
                      ? 'bg-zinc-600 text-zinc-100'
                      : 'text-zinc-400 hover:text-zinc-200',
                  ].join(' ')}
                >
                  {mode === 'datapack' ? 'Datapack JSON' : 'Data Component'}
                </button>
              ))}
            </div>
            {outputMode === 'datapack' ? (
              <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400">
                empty fields omitted
              </span>
            ) : (
              <span className="rounded-full bg-zinc-700 px-2 py-0.5 text-[10px] font-semibold text-zinc-300">
                1.21.1+
              </span>
            )}
          </div>

          {/* Preview body */}
          <div className="min-h-48">
            {outputMode === 'datapack' ? (
              <JsonPreview json={previewJson} />
            ) : (
              <div className="p-4 space-y-3">
                {!fileName.trim() && (
                  <p className="text-xs text-zinc-500">
                    Enter an item ID above to complete the component string.
                  </p>
                )}
                <pre className="whitespace-pre-wrap break-all font-mono text-xs leading-relaxed text-zinc-300">
                  {componentString}
                </pre>
                <p className="text-xs text-zinc-500">
                  Use with{' '}
                  <code className="font-mono text-zinc-400">/give @p &lt;paste&gt;</code>,
                  advancements, loot tables, KubeJS, and more.
                </p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-t border-zinc-700/60 px-4 py-3">
            {outputMode === 'datapack' ? (
              <>
                <Button type="button" onClick={onCopy} disabled={!hasOutput}>
                  {copyState === 'copied'
                    ? '✓ Copied!'
                    : copyState === 'error'
                      ? '✗ Copy failed'
                      : 'Copy JSON'}
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => downloadJsonFile(cleanOutput, downloadFileName)}
                  disabled={!hasOutput}
                >
                  ↓ Download
                </Button>
              </>
            ) : (
              <Button type="button" onClick={onCopyCommand}>
                {copyState === 'copied'
                  ? '✓ Copied!'
                  : copyState === 'error'
                    ? '✗ Copy failed'
                    : 'Copy Command'}
              </Button>
            )}
            <Button variant="secondary" type="button" onClick={onReset} disabled={!hasOutput}>
              Clear
            </Button>
          </div>
        </div>

        <SavedItemsList
          items={savedItems}
          canSave={canSave}
          savePrompt={savePrompt}
          onSave={handleSave}
          onConfirmOverwrite={handleConfirmOverwrite}
          onCancelSavePrompt={() => setSavePrompt(false)}
          onDownloadDatapack={(packFormat) => void downloadDatapack(savedItems, packFormat)}
          onClearList={() => {
            savedItems.forEach((item) => removeItem(item.file_name))
          }}
          pendingLoad={pendingLoad}
          onItemClick={handleItemClick}
          onCopyValues={handleCopyValues}
          onLoad={handleLoad}
          onCancelLoad={() => setPendingLoad(null)}
          onRemove={removeItem}
        />
      </div>
    </div>
  )
}
