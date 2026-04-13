import { useState } from 'react'
import { Button } from '../../components/Button'
import type { SavedItem } from './useSavedItems'

type Props = {
  items: SavedItem[]
  canSave: boolean
  savePrompt: boolean
  onSave: () => void
  onConfirmOverwrite: () => void
  onCancelSavePrompt: () => void
  onDownloadDatapack: () => void
  onClearList: () => void
  pendingLoad: string | null
  onItemClick: (slug: string) => void
  onCopyValues: (slug: string) => void
  onLoad: (slug: string) => void
  onCancelLoad: () => void
  onRemove: (slug: string) => void
}


const groupByType = (items: SavedItem[]): Map<string, SavedItem[]> => {
  const map = new Map<string, SavedItem[]>()
  for (const item of items) {
    const key = item.ingredient_type
    const group = map.get(key) ?? []
    group.push(item)
    map.set(key, group)
  }
  return map
}

const TYPE_GROUP_LABELS: Record<string, string> = {
  essence_stone: 'Essence Stones',
  tincture: 'Tinctures',
  catalyst: 'Catalysts',
}

export const SavedItemsList = ({
  items,
  canSave,
  savePrompt,
  onSave,
  onConfirmOverwrite,
  onCancelSavePrompt,
  onDownloadDatapack,
  onClearList,
  pendingLoad,
  onItemClick,
  onCopyValues,
  onLoad,
  onCancelLoad,
  onRemove,
}: Props) => {
  const [clearPrompt, setClearPrompt] = useState(false)
  const groups = groupByType(items)
  const hasItems = items.length > 0

  return (
    <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
      {/* Header */}
      <div className="flex items-center border-b border-zinc-200 px-4 py-3 dark:border-zinc-600">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Saved Ingredients
        </h2>
        {hasItems && (
          <span className="ml-2 rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-500 dark:bg-zinc-600 dark:text-zinc-300">
            {items.length}
          </span>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-zinc-200 px-4 py-3 dark:border-zinc-600">
        {savePrompt ? (
          <>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Overwrite saved entry?</span>
            <Button type="button" onClick={onConfirmOverwrite}>
              Yes, overwrite
            </Button>
            <Button variant="secondary" type="button" onClick={onCancelSavePrompt}>
              Cancel
            </Button>
          </>
        ) : clearPrompt ? (
          <>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Clear all saved items?</span>
            <Button
              variant="danger"
              type="button"
              onClick={() => {
                onClearList()
                setClearPrompt(false)
              }}
            >
              Clear all
            </Button>
            <Button variant="secondary" type="button" onClick={() => setClearPrompt(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button type="button" onClick={onSave} disabled={!canSave}>
              Save
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={onDownloadDatapack}
              disabled={!hasItems}
            >
              Download Datapack
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => setClearPrompt(true)}
              disabled={!hasItems}
            >
              Clear Items
            </Button>
          </>
        )}
      </div>

      {/* List */}
      {hasItems ? (
        <div className="max-h-72 overflow-y-auto">
          {[...groups.entries()].map(([type, groupItems]) => (
            <div key={type}>
              <p className="sticky top-0 bg-zinc-50 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400 dark:bg-zinc-600/50 dark:text-zinc-400">
                {TYPE_GROUP_LABELS[type] ?? type}
              </p>
              <ul>
                {groupItems.map((item) => {
                  const isPending = pendingLoad === item.slug
                  const displayName = item.values.display_name || item.slug

                  return (
                    <li key={item.slug}>
                      {isPending ? (
                        <div className="flex flex-col gap-2 border-l-2 border-zinc-400 bg-zinc-50 px-4 py-2.5 dark:border-zinc-500 dark:bg-zinc-600/40">
                          <p className="text-xs font-medium text-zinc-700 dark:text-zinc-200">
                            Load{' '}
                            <span className="text-zinc-500 dark:text-zinc-400">{displayName}</span>
                            ?
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            <button
                              type="button"
                              onClick={() => onCopyValues(item.slug)}
                              className="rounded-md bg-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-700 transition hover:bg-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:bg-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-500"
                            >
                              Copy values
                            </button>
                            <button
                              type="button"
                              onClick={() => onLoad(item.slug)}
                              className="rounded-md bg-zinc-900 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-white"
                            >
                              Load
                            </button>
                            <button
                              type="button"
                              onClick={onCancelLoad}
                              className="rounded-md px-2.5 py-1 text-xs font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:text-zinc-400 dark:hover:bg-zinc-600 dark:hover:text-zinc-200"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="group flex items-center justify-between px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-600/30">
                          <button
                            type="button"
                            onClick={() => onItemClick(item.slug)}
                            className="flex-1 text-left text-sm text-zinc-700 transition hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:text-zinc-300 dark:hover:text-zinc-100"
                          >
                            {displayName}
                          </button>
                          <button
                            type="button"
                            onClick={() => onRemove(item.slug)}
                            aria-label={`Remove ${displayName}`}
                            className="ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded text-zinc-300 opacity-0 transition hover:bg-zinc-200 hover:text-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 group-hover:opacity-100 dark:text-zinc-500 dark:hover:bg-zinc-600 dark:hover:text-zinc-300"
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-4 py-5 text-center">
          <p className="text-xs italic text-zinc-400">No ingredients saved — press Save to add.</p>
        </div>
      )}
    </div>
  )
}
