import { useState, useEffect } from 'react'
import type { AlchemicalFormValues, IngredientType } from './fieldConfig'
import { deriveFileName } from './output'

export type SavedItem = {
  slug: string
  ingredient_type: IngredientType
  values: AlchemicalFormValues
  savedAt: number
}

const STORAGE_KEY = 'alchemical-saved-items'

const readFromStorage = (): SavedItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as SavedItem[]
  } catch {
    return []
  }
}

const writeToStorage = (items: SavedItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const useSavedItems = () => {
  const [items, setItems] = useState<SavedItem[]>(readFromStorage)

  useEffect(() => {
    writeToStorage(items)
  }, [items])

  const save = (values: AlchemicalFormValues) => {
    const slug = deriveFileName(values.display_name, values.ingredient_type)
    setItems((prev) => {
      const without = prev.filter((i) => i.slug !== slug)
      return [
        ...without,
        { slug, ingredient_type: values.ingredient_type, values, savedAt: Date.now() },
      ].sort((a, b) => a.slug.localeCompare(b.slug))
    })
  }

  const remove = (slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug))
  }

  const find = (slug: string): SavedItem | undefined =>
    items.find((i) => i.slug === slug)

  return { items, save, remove, find }
}
