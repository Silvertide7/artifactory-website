import { useEffect, useMemo, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'
import { JsonPreview } from '../../components/JsonPreview'
import { SectionHeader } from '../../components/SectionHeader'
import { SavedItemsList } from './SavedItemsList'
import { useSavedItems } from './useSavedItems'
import {
  alchemicalFormSchema,
  defaultValues,
  type AlchemicalFormValues,
  type IngredientType,
} from './fieldConfig'
import {
  copyJsonToClipboard,
  computeDownloadFileName,
  computePlacementPath,
  deriveFileName,
  downloadJsonFile,
  downloadDatapack,
  toCleanOutput,
  toPrettyJson,
} from './output'
import { inputClass } from '../../components/inputStyles'

const TYPE_LABELS: Record<IngredientType, string> = {
  essence_stone: 'Essence Stone',
  tincture: 'Tincture',
  catalyst: 'Catalyst',
}

const TYPE_ACCENT: Record<IngredientType, string> = {
  essence_stone: 'text-amber-600 dark:text-amber-400',
  tincture: 'text-sky-600 dark:text-sky-400',
  catalyst: 'text-violet-600 dark:text-violet-400',
}

export const AlchemicalBuilderForm = () => {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [pendingLoad, setPendingLoad] = useState<string | null>(null)
  const [savePrompt, setSavePrompt] = useState(false)
  const { items: savedItems, save: saveItem, remove: removeItem, find: findItem } = useSavedItems()

  const {
    register,
    formState: { errors },
    reset,
    watch,
    getValues,
  } = useForm<AlchemicalFormValues>({
    defaultValues,
    resolver: zodResolver(alchemicalFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const [cleanOutput, setCleanOutput] = useState(() => toCleanOutput(getValues()))

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const { unsubscribe } = watch((values) => {
      setCleanOutput(toCleanOutput(values as AlchemicalFormValues))
    })
    return unsubscribe
  }, [watch])

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current !== null) clearTimeout(copyTimeoutRef.current)
    }
  }, [])

  const previewJson = useMemo(() => toPrettyJson(cleanOutput), [cleanOutput])
  const hasOutput = Object.keys(cleanOutput).length > 0

  const ingredientType = watch('ingredient_type')
  const displayName = watch('display_name')

  const slug = deriveFileName(displayName, ingredientType)
  const downloadFileName = computeDownloadFileName(displayName, ingredientType)
  const placementPath = computePlacementPath(displayName, ingredientType)

  const canSave = hasOutput && slug !== ''

  const doLoad = (values: AlchemicalFormValues) => {
    reset(values)
    setCleanOutput(toCleanOutput(values))
    setPendingLoad(null)
    setSavePrompt(false)
    setCopyState('idle')
  }

  const handleTypeChange = (type: IngredientType) => {
    reset({ ...defaultValues, ingredient_type: type })
    setCleanOutput({})
    setCopyState('idle')
  }

  const handleItemClick = (slug: string) => {
    if (!hasOutput) {
      const item = findItem(slug)
      if (item) doLoad(item.values)
    } else {
      setPendingLoad(slug)
    }
  }

  const handleCopyValues = (slug: string) => {
    const item = findItem(slug)
    if (!item) return
    doLoad({ ...item.values, display_name: displayName })
  }

  const handleLoad = (slug: string) => {
    const item = findItem(slug)
    if (item) doLoad(item.values)
  }

  const handleSave = () => {
    if (!canSave) return
    const existing = findItem(slug)
    if (!existing) {
      saveItem(getValues())
      return
    }
    const existingJson = toPrettyJson(toCleanOutput(existing.values))
    const currentJson = toPrettyJson(cleanOutput)
    if (existingJson === currentJson) return
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

  const onReset = () => {
    reset({ ...defaultValues, ingredient_type: ingredientType })
    setCleanOutput({})
    setCopyState('idle')
  }

  const isStone = ingredientType === 'essence_stone'
  const isTinctureOrCatalyst = ingredientType === 'tincture' || ingredientType === 'catalyst'

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {/* ── Form ── */}
      <form className="space-y-4 lg:col-span-3" onSubmit={(e) => e.preventDefault()} noValidate>

        {/* Section: Ingredient Type */}
        <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
          <SectionHeader title="Ingredient Type" />
          <div className="p-5">
            <div className="flex gap-2">
              {(['essence_stone', 'tincture', 'catalyst'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleTypeChange(type)}
                  className={[
                    'flex-1 rounded-lg border px-3 py-2.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                    ingredientType === type
                      ? type === 'essence_stone'
                        ? 'border-amber-300 bg-amber-50 text-amber-700 focus-visible:outline-amber-400 dark:border-amber-700/60 dark:bg-amber-950/30 dark:text-amber-400'
                        : type === 'tincture'
                          ? 'border-sky-300 bg-sky-50 text-sky-700 focus-visible:outline-sky-400 dark:border-sky-700/60 dark:bg-sky-950/30 dark:text-sky-400'
                          : 'border-violet-300 bg-violet-50 text-violet-700 focus-visible:outline-violet-400 dark:border-violet-700/60 dark:bg-violet-950/30 dark:text-violet-400'
                      : 'border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 focus-visible:outline-zinc-400 dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200',
                  ].join(' ')}
                >
                  {TYPE_LABELS[type]}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-400">
              {isStone
                ? 'Defines a potion effect granted when drinking. Loaded into an elixir and switchable on the fly.'
                : ingredientType === 'tincture'
                  ? 'A liquid base identified by a Minecraft item. Modifies effect duration and level.'
                  : 'A reactive powder identified by a Minecraft item. Same fields as tinctures, loaded from the catalyst/ folder.'}
            </p>
          </div>
        </section>

        {/* Section: Identity */}
        <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
          <SectionHeader title="Identity" />
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            {isTinctureOrCatalyst && (
              <div className="sm:col-span-2">
                <FormField
                  label={
                    <span>
                      Item{' '}
                      <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[10px] font-semibold text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                        Required
                      </span>
                    </span>
                  }
                  htmlFor="item"
                  error={errors.item?.message}
                  hint={
                    ingredientType === 'tincture'
                      ? 'The Minecraft item that represents this tincture.\nWhen placed in the Athanor\'s ingredient slot it is recognized with these properties.\n\nEach item can only be one ingredient type; tinctures take priority over catalysts if the same item appears in both.\n\nDefault tincture items:\n  minecraft:potion (Aqueous Solution)\n  minecraft:honey_bottle (Honey Distillate)\n  minecraft:experience_bottle (Arcane Extract)\n  minecraft:dragon_breath (Dragon\'s Essence)'
                      : 'The Minecraft item that represents this catalyst.\nWhen placed in the Athanor\'s ingredient slot it is recognized with these properties.\n\nEach item can only be one ingredient type; tinctures take priority over catalysts if the same item appears in both.\n\nDefault catalyst items:\n  minecraft:glowstone_dust (Glowstone Powder)\n  minecraft:redstone (Redstone Catalyst)\n  minecraft:blaze_powder (Blaze Catalyst)\n  minecraft:gunpowder (Volatile Catalyst)'
                  }
                >
                  {(errorId) => (
                    <input
                      id="item"
                      type="text"
                      placeholder={
                        ingredientType === 'tincture'
                          ? 'minecraft:honey_bottle'
                          : 'minecraft:blaze_powder'
                      }
                      aria-describedby={errorId}
                      aria-invalid={errors.item ? true : undefined}
                      className={inputClass}
                      {...register('item')}
                    />
                  )}
                </FormField>
              </div>
            )}

            <div className="sm:col-span-2">
              <FormField
                label="Display Name"
                htmlFor="display_name"
                error={errors.display_name?.message}
                hint={
                  isStone
                    ? 'Name shown in the Athanor UI and item tooltips. Also used to derive the filename and datapack path.'
                    : 'Name shown in the Athanor UI. Also used to derive the filename and datapack path. If omitted, the item\'s default Minecraft name is used in-game.'
                }
              >
                {(errorId) => (
                  <input
                    id="display_name"
                    type="text"
                    placeholder={
                      isStone
                        ? 'Bastion Stone'
                        : ingredientType === 'tincture'
                          ? 'Aqueous Solution'
                          : 'Blaze Catalyst'
                    }
                    aria-describedby={errorId}
                    className={inputClass}
                    {...register('display_name')}
                  />
                )}
              </FormField>

              {slug && (
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

            {isStone && (
              <FormField
                label="Color"
                htmlFor="color"
                error={errors.color?.message}
                hint={'Hex color for the stone\'s name in the UI.\nFormat: #RRGGBB\nDefault: #AA88FF\n\nExamples from defaults:\n  #7BBFFF (Swift / Speed)\n  #FF8833 (Ember / Fire Resistance)\n  #FF6699 (Crimson / Regeneration)\n  #888899 (Bastion / Resistance)'}
              >
                {(errorId) => (
                  <input
                    id="color"
                    type="text"
                    placeholder="#AA88FF"
                    aria-describedby={errorId}
                    aria-invalid={errors.color ? true : undefined}
                    className={inputClass}
                    {...register('color')}
                  />
                )}
              </FormField>
            )}

            <FormField
              label="Potency"
              htmlFor="potency"
              error={errors.potency?.message}
              hint={
                isStone
                  ? 'Capacity slots consumed when loaded into an elixir.\nHigher potency = more costly to include. Minimum: 0.\n\nDefault: 2\nThe Bastion Stone (Resistance) uses 3, making it the most expensive default.'
                  : 'Capacity slots consumed when loaded into an elixir.\nHigher potency = more costly to include. Minimum: 0.\n\nDefault: 1 (tinctures/catalysts)\nDragon\'s Essence uses 3; most simple ingredients use 1 or 2.'
              }
            >
              {(errorId) => (
                <input
                  id="potency"
                  type="number"
                  placeholder={isStone ? '2' : '1'}
                  aria-describedby={errorId}
                  aria-invalid={errors.potency ? true : undefined}
                  className={inputClass}
                  {...register('potency')}
                />
              )}
            </FormField>
          </div>
        </section>

        {/* Section: Effect Properties (Essence Stone) */}
        {isStone && (
          <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
            <SectionHeader
              title={<span className={TYPE_ACCENT.essence_stone}>Effect Properties</span>}
            />
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <FormField
                label={
                  <span>
                    Effect{' '}
                    <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[10px] font-semibold text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                      Required
                    </span>
                  </span>
                }
                htmlFor="effect"
                error={errors.effect?.message}
                hint={
                  'The ResourceLocation of the mob effect to grant.\n\nDefault stones use:\n  minecraft:speed, minecraft:jump_boost\n  minecraft:fire_resistance, minecraft:water_breathing\n  minecraft:night_vision, minecraft:slow_falling\n  minecraft:strength, minecraft:regeneration\n  minecraft:invisibility, minecraft:resistance\n\nAlso accepts any modded effect, e.g. mymod:flight'
                }
              >
                {(errorId) => (
                  <input
                    id="effect"
                    type="text"
                    placeholder="minecraft:resistance"
                    aria-describedby={errorId}
                    aria-invalid={errors.effect ? true : undefined}
                    className={inputClass}
                    {...register('effect')}
                  />
                )}
              </FormField>

              <FormField
                label="Base Level"
                htmlFor="base_level"
                error={errors.base_level?.message}
                hint={
                  'Starting effect amplifier level.\n1 = Level I, 2 = Level II, etc.\n\nTincture and catalyst level modifiers are added on top of this.\nDefault: 1'
                }
              >
                {(errorId) => (
                  <input
                    id="base_level"
                    type="number"
                    placeholder="1"
                    aria-describedby={errorId}
                    aria-invalid={errors.base_level ? true : undefined}
                    className={inputClass}
                    {...register('base_level')}
                  />
                )}
              </FormField>

              <FormField
                label="Base Duration (seconds)"
                htmlFor="base_duration"
                error={errors.base_duration?.message}
                hint={
                  'Effect duration in seconds before any tincture or catalyst modifiers.\nConverted to ticks automatically (×20) in the output.\n\nDefault: 10 seconds\nTypical range: 300 – 600 seconds (5 – 10 minutes)'
                }
              >
                {(errorId) => (
                  <input
                    id="base_duration"
                    type="number"
                    placeholder="300"
                    aria-describedby={errorId}
                    aria-invalid={errors.base_duration ? true : undefined}
                    className={inputClass}
                    {...register('base_duration')}
                  />
                )}
              </FormField>
            </div>
          </section>
        )}

        {/* Section: Effect Properties (Tincture / Catalyst) */}
        {isTinctureOrCatalyst && (
          <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
            <SectionHeader
              title={
                <span className={TYPE_ACCENT[ingredientType]}>Effect Properties</span>
              }
            />
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <FormField
                label="Duration Multiplier"
                htmlFor="effect_duration_multiplier"
                error={errors.effect_duration_multiplier?.message}
                hint={
                  'Multiplier applied to the active stone\'s effect duration.\nAbove 1.0 extends, below 1.0 shortens.\n\nStacks multiplicatively with other duration multipliers.\nDefault: 1.0 (no change)'
                }
              >
                {(errorId) => (
                  <input
                    id="effect_duration_multiplier"
                    type="number"
                    step="any"
                    placeholder="1.25"
                    aria-describedby={errorId}
                    aria-invalid={errors.effect_duration_multiplier ? true : undefined}
                    className={inputClass}
                    {...register('effect_duration_multiplier')}
                  />
                )}
              </FormField>

              <FormField
                label="Duration Flat (seconds)"
                htmlFor="effect_duration_flat"
                error={errors.effect_duration_flat?.message}
                hint={
                  'Flat seconds added to the effect duration after all multipliers.\nConverted to ticks automatically (×20) in the output.\nCan be negative to reduce duration.\n\nDefault: 0'
                }
              >
                {(errorId) => (
                  <input
                    id="effect_duration_flat"
                    type="number"
                    placeholder="0"
                    aria-describedby={errorId}
                    aria-invalid={errors.effect_duration_flat ? true : undefined}
                    className={inputClass}
                    {...register('effect_duration_flat')}
                  />
                )}
              </FormField>

              <FormField
                label="Effect Level Modifier"
                htmlFor="effect_level_modifier"
                error={errors.effect_level_modifier?.message}
                hint={
                  'Additive modifier to the effect level.\n+1 means this ingredient adds one level on top of the stone\'s base level.\n\nAll level modifiers from tinctures and catalysts are summed.\nDefault: 0 (no change)'
                }
              >
                {(errorId) => (
                  <input
                    id="effect_level_modifier"
                    type="number"
                    placeholder="0"
                    aria-describedby={errorId}
                    aria-invalid={errors.effect_level_modifier ? true : undefined}
                    className={inputClass}
                    {...register('effect_level_modifier')}
                  />
                )}
              </FormField>
            </div>
          </section>
        )}

        {/* Section: Elixir Cooldown */}
        <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
          <SectionHeader title="Elixir Cooldown" />
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <FormField
              label="Cooldown Multiplier"
              htmlFor="elixir_cooldown_multiplier"
              error={errors.elixir_cooldown_multiplier?.message}
              hint={
                'Multiplier applied to the elixir\'s base cooldown.\nAbove 1.0 increases cooldown, below 1.0 decreases it.\n\nStacks multiplicatively with all other cooldown multipliers.\nDefault: 1.0 (no change)'
              }
            >
              {(errorId) => (
                <input
                  id="elixir_cooldown_multiplier"
                  type="number"
                  step="any"
                  placeholder="1.0"
                  aria-describedby={errorId}
                  aria-invalid={errors.elixir_cooldown_multiplier ? true : undefined}
                  className={inputClass}
                  {...register('elixir_cooldown_multiplier')}
                />
              )}
            </FormField>

            <FormField
              label="Cooldown Flat (seconds)"
              htmlFor="elixir_cooldown_flat"
              error={errors.elixir_cooldown_flat?.message}
              hint={
                'Flat seconds added to the cooldown after all multipliers are applied.\nCan be negative to reduce cooldown.\n\nDefault: 0'
              }
            >
              {(errorId) => (
                <input
                  id="elixir_cooldown_flat"
                  type="number"
                  placeholder="0"
                  aria-describedby={errorId}
                  aria-invalid={errors.elixir_cooldown_flat ? true : undefined}
                  className={inputClass}
                  {...register('elixir_cooldown_flat')}
                />
              )}
            </FormField>
          </div>
        </section>
      </form>

      {/* ── JSON Preview + Saved Items ── */}
      <div className="sticky top-4 flex max-h-[calc(100vh-2rem)] flex-col gap-4 overflow-y-auto lg:col-span-2">
        <div className="rounded-xl border border-zinc-700 bg-zinc-900">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-700/60 px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              JSON Preview
            </span>
            <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400">
              empty fields omitted
            </span>
          </div>

          {/* Preview */}
          <div className="min-h-48">
            <JsonPreview json={previewJson} />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-t border-zinc-700/60 px-4 py-3">
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
          onDownloadDatapack={() => void downloadDatapack(savedItems)}
          onClearList={() => {
            savedItems.forEach((item) => removeItem(item.slug))
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
