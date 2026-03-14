import { z } from 'zod'

const optionalInt = (min: number) =>
  z.string().refine(
    (val) => {
      if (val.trim() === '') return true
      const n = Number(val)
      return Number.isInteger(n) && n >= min
    },
    { message: `Must be a whole number ≥ ${min}` },
  )

const optionalFloat = (min: number, max: number) =>
  z.string().refine(
    (val) => {
      if (val.trim() === '') return true
      const n = parseFloat(val)
      return !isNaN(n) && n >= min && n <= max
    },
    { message: `Must be a number between ${min} and ${max}` },
  )

// modid:item_name with optional #count — used in requirements.items
const itemWithCountSchema = z.object({
  value: z.string().refine(
    (val) =>
      val.trim() === '' ||
      /^[a-z0-9_.-]+:[a-z0-9_./]+(#\d+)?$/.test(val.trim()),
    { message: 'Format: modid:item_name or modid:item_name#count' },
  ),
})

// modid:item_name only — used in apply_to_items
const plainItemIdSchema = z.object({
  value: z.string().refine(
    (val) =>
      val.trim() === '' || /^[a-z0-9_.-]+:[a-z0-9_./]+$/.test(val.trim()),
    { message: 'Format: modid:item_name' },
  ),
})

export const requirementsFormSchema = z.object({
  xp_levels_consumed: optionalInt(0),
  xp_level_threshold: optionalInt(0),
  kills: optionalInt(0),
  items: z.array(itemWithCountSchema).max(3),
})

export const levelFormSchema = z.object({
  requirements: requirementsFormSchema,
  modifications: z.array(z.object({ value: z.string() })),
})

export const dataSourceFormSchema = z.object({
  slots_used: optionalInt(-1),
  chance: optionalFloat(0, 1),
  use_without_attunement: z.enum(['', 'true', 'false']),
  replace: z.enum(['', 'true', 'false']),
  apply_to_items: z.array(plainItemIdSchema),
  attunement_levels: z.array(levelFormSchema),
})

export type RequirementsFormValues = z.infer<typeof requirementsFormSchema>
export type LevelFormValues = z.infer<typeof levelFormSchema>
export type DataSourceFormValues = z.infer<typeof dataSourceFormSchema>

export const defaultRequirements: RequirementsFormValues = {
  xp_levels_consumed: '',
  xp_level_threshold: '',
  kills: '',
  items: [],
}

export const defaultLevel: LevelFormValues = {
  requirements: defaultRequirements,
  modifications: [],
}

export const defaultValues: DataSourceFormValues = {
  slots_used: '',
  chance: '',
  use_without_attunement: '',
  replace: '',
  apply_to_items: [],
  attunement_levels: [],
}
