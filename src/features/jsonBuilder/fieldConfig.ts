import { z } from 'zod'

const listItemSchema = z.object({ value: z.string() })

export const requirementsFormSchema = z.object({
  xp_levels_consumed: z.string(),
  xp_level_threshold: z.string(),
  kills: z.string(),
  items: z.array(listItemSchema).max(3),
})

export const levelFormSchema = z.object({
  requirements: requirementsFormSchema,
  modifications: z.array(listItemSchema),
})

export const dataSourceFormSchema = z.object({
  slots_used: z.string(),
  chance: z.string(),
  use_without_attunement: z.enum(['', 'true', 'false']),
  replace: z.enum(['', 'true', 'false']),
  apply_to_items: z.array(listItemSchema),
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
