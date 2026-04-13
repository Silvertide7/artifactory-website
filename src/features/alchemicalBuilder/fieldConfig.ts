import { z } from 'zod'

export type IngredientType = 'essence_stone' | 'tincture' | 'catalyst'

const RESOURCE_LOCATION = /^[a-z0-9_.-]+:[a-z0-9_./]+$/
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/

const optionalInt = (min: number) =>
  z.string().refine(
    (val) => {
      if (val.trim() === '') return true
      const n = Number(val)
      return Number.isInteger(n) && n >= min
    },
    { message: `Must be a whole number ≥ ${min}` },
  )

const optionalFloat = (min: number, max?: number) =>
  z.string().refine(
    (val) => {
      if (val.trim() === '') return true
      const n = parseFloat(val)
      if (isNaN(n) || n < min) return false
      if (max !== undefined && n > max) return false
      return true
    },
    {
      message:
        max !== undefined ? `Must be a number between ${min} and ${max}` : `Must be a number ≥ ${min}`,
    },
  )

const resourceLocationOrEmpty = z.string().refine(
  (val) => val.trim() === '' || RESOURCE_LOCATION.test(val.trim()),
  { message: 'Format: modid:name (e.g. minecraft:speed)' },
)

export const alchemicalFormSchema = z
  .object({
    ingredient_type: z.enum(['essence_stone', 'tincture', 'catalyst']),

    // Shared optional field
    display_name: z.string(),

    // Essence Stone fields
    effect: resourceLocationOrEmpty,
    color: z.string().refine(
      (val) => val.trim() === '' || HEX_COLOR.test(val.trim()),
      { message: 'Must be a 6-digit hex color (e.g. #AA88FF)' },
    ),
    base_duration: optionalInt(0),
    base_level: optionalInt(1),

    // Tincture / Catalyst fields
    item: resourceLocationOrEmpty,
    effect_duration_multiplier: optionalFloat(0),
    effect_duration_flat: z.string().refine(
      (val) => {
        if (val.trim() === '') return true
        return Number.isInteger(Number(val))
      },
      { message: 'Must be a whole number (can be negative)' },
    ),
    effect_level_modifier: z.string().refine(
      (val) => {
        if (val.trim() === '') return true
        return Number.isInteger(Number(val))
      },
      { message: 'Must be a whole number (can be negative)' },
    ),

    // Shared modifier fields (all types)
    elixir_cooldown_multiplier: optionalFloat(0),
    elixir_cooldown_flat: z.string().refine(
      (val) => {
        if (val.trim() === '') return true
        return Number.isInteger(Number(val))
      },
      { message: 'Must be a whole number (can be negative)' },
    ),
    potency: optionalInt(0),
  })
  .superRefine((data, ctx) => {
    if (data.ingredient_type === 'essence_stone' && data.effect.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Effect is required for Essence Stones',
        path: ['effect'],
      })
    }
    if (
      (data.ingredient_type === 'tincture' || data.ingredient_type === 'catalyst') &&
      data.item.trim() === ''
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Item is required for Tinctures and Catalysts',
        path: ['item'],
      })
    }
  })

export type AlchemicalFormValues = z.infer<typeof alchemicalFormSchema>

export const defaultValues: AlchemicalFormValues = {
  ingredient_type: 'essence_stone',
  display_name: '',
  effect: '',
  color: '',
  base_duration: '',
  base_level: '',
  item: '',
  effect_duration_multiplier: '',
  effect_duration_flat: '',
  effect_level_modifier: '',
  elixir_cooldown_multiplier: '',
  elixir_cooldown_flat: '',
  potency: '',
}
