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
  onItemClick: (file_name: string) => void
  onCopyValues: (file_name: string) => void
  onLoad: (file_name: string) => void
  onCancelLoad: () => void
  onRemove: (file_name: string) => void
}

const parseFileName = (file_name: string): { modId: string; itemName: string } => {
  const colonIdx = file_name.indexOf(':')
  if (colonIdx === -1) return { modId: '', itemName: file_name }
  return {
    modId: file_name.slice(0, colonIdx),
    itemName: file_name.slice(colonIdx + 1),
  }
}

const groupByModId = (items: SavedItem[]): Map<string, SavedItem[]> => {
  const map = new Map<string, SavedItem[]>()
  for (const item of items) {
    const { modId } = parseFileName(item.file_name)
    const key = modId || '(no namespace)'
    const group = map.get(key) ?? []
    group.push(item)
    map.set(key, group)
  }
  return map
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
  const groups = groupByModId(items)
  const hasItems = items.length > 0

  return (
    <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
      {/* Header */}
      <div className="flex items-center border-b border-zinc-200 px-4 py-3 dark:border-zinc-600">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Saved Items
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
            <Button
              variant="secondary"
              type="button"
              onClick={() => setClearPrompt(false)}
            >
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
              ↓ Datapack
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => setClearPrompt(true)}
              disabled={!hasItems}
            >
              Clear list
            </Button>
          </>
        )}
      </div>

      {/* List */}
      {hasItems ? (
        <div className="max-h-72 overflow-y-auto">
          {[...groups.entries()].map(([modId, groupItems]) => (
            <div key={modId}>
              <p className="sticky top-0 bg-zinc-50 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400 dark:bg-zinc-600/50 dark:text-zinc-400">
                {modId}
              </p>
              <ul>
                {groupItems.map((item) => {
                  const { itemName } = parseFileName(item.file_name)
                  const isPending = pendingLoad === item.file_name

                  return (
                    <li key={item.file_name}>
                      {isPending ? (
                        <div className="flex flex-col gap-2 border-l-2 border-zinc-400 bg-zinc-50 px-4 py-2.5 dark:border-zinc-500 dark:bg-zinc-600/40">
                          <p className="text-xs font-medium text-zinc-700 dark:text-zinc-200">
                            Load{' '}
                            <span className="font-mono text-zinc-500 dark:text-zinc-400">
                              {item.file_name}
                            </span>
                            ?
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            <button
                              type="button"
                              onClick={() => onCopyValues(item.file_name)}
                              className="rounded-md bg-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-700 transition hover:bg-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:bg-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-500"
                            >
                              Copy values
                            </button>
                            <button
                              type="button"
                              onClick={() => onLoad(item.file_name)}
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
                            onClick={() => onItemClick(item.file_name)}
                            className="flex-1 text-left text-sm text-zinc-700 transition hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:text-zinc-300 dark:hover:text-zinc-100"
                          >
                            {itemName}
                          </button>
                          <button
                            type="button"
                            onClick={() => onRemove(item.file_name)}
                            aria-label={`Remove ${item.file_name}`}
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
          <p className="text-xs italic text-zinc-400">No items — press Save to add.</p>
        </div>
      )}
    </div>
  )
}
