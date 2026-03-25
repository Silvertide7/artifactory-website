import { useState, useEffect } from 'react'
import type { DataSourceFormValues } from './fieldConfig'

export type SavedItem = {
  file_name: string
  values: DataSourceFormValues
  savedAt: number
}

const STORAGE_KEY = 'artifactory-saved-items'

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

  const save = (values: DataSourceFormValues) => {
    const file_name = values.file_name.trim()
    setItems((prev) => {
      const without = prev.filter((i) => i.file_name !== file_name)
      return [...without, { file_name, values, savedAt: Date.now() }].sort((a, b) =>
        a.file_name.localeCompare(b.file_name),
      )
    })
  }

  const remove = (file_name: string) => {
    setItems((prev) => prev.filter((i) => i.file_name !== file_name))
  }

  const find = (file_name: string): SavedItem | undefined =>
    items.find((i) => i.file_name === file_name)

  return { items, save, remove, find }
}
