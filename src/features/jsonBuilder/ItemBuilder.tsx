import { useState } from 'react'
import { inputClass } from '../../components/inputStyles'
import { ErrorMessage } from '../../components/ErrorMessage'

const ITEM_ID_PATTERN = /^[a-z0-9_.-]+:[a-z0-9_./]+$/

type Props = {
  initial?: string
  onSave: (value: string) => void
  onClose: () => void
}

function parseInitial(initial?: string): { itemId: string; quantity: string } {
  if (!initial) return { itemId: '', quantity: '' }
  const hashIndex = initial.indexOf('#')
  if (hashIndex === -1) return { itemId: initial, quantity: '' }
  return { itemId: initial.slice(0, hashIndex), quantity: initial.slice(hashIndex + 1) }
}

export const ItemBuilder = ({ initial, onSave, onClose }: Props) => {
  const parsed = parseInitial(initial)
  const [itemId, setItemId] = useState(parsed.itemId)
  const [quantity, setQuantity] = useState(parsed.quantity)
  const [touched, setTouched] = useState(false)

  const idValid = ITEM_ID_PATTERN.test(itemId.trim())
  const idError = touched && itemId.trim() !== '' && !idValid
    ? 'Format: modid:item_name (e.g. minecraft:nether_star)'
    : undefined

  const qty = quantity.trim()
  const qtyNum = qty === '' ? null : parseInt(qty, 10)
  const qtyError = qtyNum !== null && (qtyNum < 1 || qtyNum > 64 || !Number.isInteger(qtyNum))
    ? 'Quantity must be between 1 and 64'
    : undefined
  const qtyValid = qtyError === undefined

  const canSave = itemId.trim() !== '' && idValid && qtyValid

  // Omit the suffix entirely for qty 1 (default) or empty
  const effectiveQty = qtyNum !== null && qtyNum > 1 ? String(qtyNum) : ''
  const assembled = itemId.trim()
    ? `${itemId.trim()}${effectiveQty ? '#' + effectiveQty : ''}`
    : ''

  const handleSave = () => {
    if (canSave) onSave(assembled)
  }

  return (
    <div
      className="w-full max-w-md rounded-xl bg-white shadow-xl dark:bg-zinc-800"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-700">
        <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          {initial ? 'Edit Item' : 'Add Item'}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
          aria-label="Close"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-4 w-4">
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>
      </div>

      <div className="space-y-4 p-5">
        {/* Item ID */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Item ID
          </label>
          <input
            type="text"
            value={itemId}
            placeholder="e.g. minecraft:nether_star"
            className={inputClass}
            spellCheck={false}
            onChange={(e) => setItemId(e.target.value)}
            onBlur={() => setTouched(true)}
          />
          {idError && <ErrorMessage message={idError} />}
        </div>

        {/* Quantity */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Quantity <span className="font-normal normal-case text-zinc-400">(optional, defaults to 1)</span>
          </label>
          <input
            type="number"
            value={quantity}
            placeholder="1"
            min={1}
            max={64}
            step={1}
            className={inputClass}
            onChange={(e) => setQuantity(e.target.value)}
          />
          {qtyError && <ErrorMessage message={qtyError} />}
        </div>

        {/* Preview */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Preview
          </p>
          <div className="rounded-lg bg-zinc-900 px-4 py-3 font-mono text-xs">
            {assembled ? (
              <span className="text-zinc-200">{assembled}</span>
            ) : (
              <span className="text-zinc-500">{'<item_id>'}</span>
            )}
          </div>
        </div>

        {/* Save */}
        <button
          type="button"
          disabled={!canSave}
          onClick={handleSave}
          className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          {initial ? 'Update Item' : 'Add Item'}
        </button>
      </div>
    </div>
  )
}
