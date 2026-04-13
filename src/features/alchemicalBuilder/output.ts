import JSZip from 'jszip'
import type { AlchemicalFormValues, IngredientType } from './fieldConfig'

export const toPrettyJson = (value: unknown) => JSON.stringify(value, null, 2)

const parseIntField = (s: string): number | undefined => {
  const trimmed = s.trim()
  if (trimmed === '') return undefined
  const n = parseInt(trimmed, 10)
  return isNaN(n) ? undefined : n
}

const parseFloatField = (s: string): number | undefined => {
  const trimmed = s.trim()
  if (trimmed === '') return undefined
  const n = parseFloat(trimmed)
  return isNaN(n) ? undefined : n
}

// Returns the subfolder for a given ingredient type
const typeFolder = (type: IngredientType) => {
  if (type === 'essence_stone') return 'essence_stone'
  if (type === 'tincture') return 'tincture'
  return 'catalyst'
}

// Derive the file slug from the display name and ingredient type.
// "Bastion Stone" (stone)     → "bastion_stone"
// "Aqueous Solution" (tincture) → "aqueous_solution_tincture"
// "Blaze Catalyst" (catalyst)   → "blaze_catalyst_catalyst"
const baseSlug = (displayName: string): string =>
  displayName.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')

export const deriveFileName = (displayName: string, type: IngredientType): string => {
  const slug = baseSlug(displayName)
  if (!slug) return ''
  if (type === 'tincture') return `${slug}_tincture`
  if (type === 'catalyst') return `${slug}_catalyst`
  return slug
}

export const computeDownloadFileName = (displayName: string, type: IngredientType): string => {
  const slug = deriveFileName(displayName, type)
  return slug ? `${slug}.json` : 'ingredient.json'
}

export const computePlacementPath = (displayName: string, type: IngredientType): string | null => {
  const slug = deriveFileName(displayName, type)
  if (!slug) return null
  return `data/alchemical/alchemical/${typeFolder(type)}/${slug}.json`
}

export const copyJsonToClipboard = async (jsonValue: unknown) => {
  const text = toPrettyJson(jsonValue)
  await navigator.clipboard.writeText(text)
}

export const downloadJsonFile = (jsonValue: unknown, fileName = 'ingredient.json') => {
  const blob = new Blob([toPrettyJson(jsonValue)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  try {
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } finally {
    URL.revokeObjectURL(url)
  }
}

export const downloadDatapack = async (
  items: Array<{ ingredient_type: IngredientType; values: AlchemicalFormValues }>,
) => {
  const zip = new JSZip()

  zip.file(
    'pack.mcmeta',
    toPrettyJson({
      pack: {
        description: 'Alchemical Datapack built from Web Builder',
        pack_format: 48,
      },
    }),
  )

  for (const item of items) {
    const slug = deriveFileName(item.values.display_name, item.ingredient_type)
    if (!slug) continue
    const path = `data/alchemical/alchemical/${typeFolder(item.ingredient_type)}/${slug}.json`
    zip.file(path, toPrettyJson(toCleanOutput(item.values)))
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  try {
    const link = document.createElement('a')
    link.href = url
    link.download = 'alchemical-datapack.zip'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } finally {
    URL.revokeObjectURL(url)
  }
}

export const toCleanOutput = (values: AlchemicalFormValues): Record<string, unknown> => {
  const out: Record<string, unknown> = {}

  if (values.ingredient_type === 'essence_stone') {
    // Order matches the default datapack: name, color, effect, base_duration, [base_level], [...cooldown], [potency]
    const displayName = values.display_name.trim()
    if (displayName) out.name = displayName

    const color = values.color.trim()
    if (color) out.color = color

    const effect = values.effect.trim()
    if (effect) out.effect = effect

    const baseDurationSecs = parseIntField(values.base_duration)
    if (baseDurationSecs !== undefined) out.base_duration = baseDurationSecs * 20

    const baseLevel = parseIntField(values.base_level)
    if (baseLevel !== undefined) out.base_level = baseLevel

    const cooldownMult = parseFloatField(values.elixir_cooldown_multiplier)
    if (cooldownMult !== undefined) out.elixir_cooldown_multiplier = cooldownMult

    const cooldownFlat = parseIntField(values.elixir_cooldown_flat)
    if (cooldownFlat !== undefined) out.elixir_cooldown_flat = cooldownFlat

    const potency = parseIntField(values.potency)
    if (potency !== undefined) out.potency = potency
  } else {
    // Tincture / catalyst order matches default datapack: item, name, [duration_mult], [duration_flat],
    // [cooldown_mult], [level_mod], [potency]
    const item = values.item.trim()
    if (item) out.item = item

    const displayName = values.display_name.trim()
    if (displayName) out.name = displayName

    const durationMult = parseFloatField(values.effect_duration_multiplier)
    if (durationMult !== undefined) out.effect_duration_multiplier = durationMult

    const durationFlatSecs = parseIntField(values.effect_duration_flat)
    if (durationFlatSecs !== undefined) out.effect_duration_flat = durationFlatSecs * 20

    const cooldownMult = parseFloatField(values.elixir_cooldown_multiplier)
    if (cooldownMult !== undefined) out.elixir_cooldown_multiplier = cooldownMult

    const levelMod = parseIntField(values.effect_level_modifier)
    if (levelMod !== undefined) out.effect_level_modifier = levelMod

    const potency = parseIntField(values.potency)
    if (potency !== undefined) out.potency = potency
  }

  return out
}
