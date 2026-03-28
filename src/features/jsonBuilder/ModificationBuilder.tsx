import { useState } from 'react'
import { ATTRIBUTES_1211, ATTRIBUTES_1201 } from '../../data/attributes'
import { inputClass } from '../../components/inputStyles'
import { cn } from '../../utils/cn'

type Mode = 'pick' | 'basic' | 'attribute'
type Version = '1.20.1' | '1.21.1'

type Props = {
  version: Version
  initial?: string
  onSave: (value: string) => void
  onClose: () => void
}

const BASIC_MODS = ['invulnerable', 'unbreakable', 'soulbound'] as const
const OPERATIONS_1201 = ['addition', 'multiply_base', 'multiply_total']
const OPERATIONS_1211 = ['add_value', 'add_multiplied_base', 'add_multiplied_total']
const SLOTS_BASE = ['mainhand', 'offhand', 'feet', 'legs', 'chest', 'head']
const SLOTS_1211_EXTRA = ['hand', 'body', 'armor', 'any']

function parseInitial(initial?: string): {
  mode: Mode
  attrId: string
  operation: string
  value: string
  slot: string
} {
  if (!initial) return { mode: 'pick', attrId: '', operation: '', value: '', slot: '' }
  if (initial.startsWith('attribute/')) {
    const parts = initial.split('/')
    return {
      mode: 'attribute',
      attrId: parts[1] ?? '',
      operation: parts[2] ?? '',
      value: parts[3] ?? '',
      slot: parts[4] ?? '',
    }
  }
  return { mode: 'basic', attrId: '', operation: '', value: '', slot: '' }
}

const toggleBtnBase =
  'rounded-md px-2.5 py-1.5 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-zinc-400'
const toggleBtnActive =
  'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
const toggleBtnInactive =
  'bg-white text-zinc-600 ring-1 ring-zinc-300 hover:bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-300 dark:ring-zinc-600 dark:hover:bg-zinc-600'

export const ModificationBuilder = ({ version, initial, onSave, onClose }: Props) => {
  const parsed = parseInitial(initial)
  const [mode, setMode] = useState<Mode>(parsed.mode)
  const [attrId, setAttrId] = useState(parsed.attrId)
  const [operation, setOperation] = useState(parsed.operation)
  const [value, setValue] = useState(parsed.value)
  const [slot, setSlot] = useState(parsed.slot)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const attributes = version === '1.21.1' ? ATTRIBUTES_1211 : ATTRIBUTES_1201
  const operations = version === '1.21.1' ? OPERATIONS_1211 : OPERATIONS_1201
  const extraSlots = version === '1.21.1' ? SLOTS_1211_EXTRA : []

  const query = attrId.trim().toLowerCase()
  const suggestions = query
    ? attributes.filter((a) => a.includes(query)).slice(0, 8)
    : attributes.slice(0, 8)

  const canSave = attrId.trim() !== '' && operation !== '' && value.trim() !== '' && slot !== ''

  const previewParts = [
    { text: 'attribute', filled: true },
    { text: attrId || '<attribute>', filled: !!attrId },
    { text: operation || '<operation>', filled: !!operation },
    { text: value || '<value>', filled: !!value },
    { text: slot || '<slot>', filled: !!slot },
  ]

  return (
    <div className="w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-zinc-800" onClick={(e) => e.stopPropagation()}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          {mode !== 'pick' && (
            <button
              type="button"
              onClick={() => setMode('pick')}
              className="mr-1 rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
              aria-label="Back"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
            {mode === 'pick' && 'Add Modification'}
            {mode === 'basic' && 'Basic Modification'}
            {mode === 'attribute' && 'Attribute Modification'}
          </h2>
        </div>
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

      <div className="space-y-5 p-5">
        {/* Pick screen */}
        {mode === 'pick' && (
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMode('basic')}
              className="flex flex-col items-start gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-left transition hover:border-zinc-400 hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:border-zinc-600 dark:bg-zinc-700 dark:hover:border-zinc-400 dark:hover:bg-zinc-600"
            >
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Basic</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">invulnerable, unbreakable, soulbound</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('attribute')}
              className="flex flex-col items-start gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-left transition hover:border-zinc-400 hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:border-zinc-600 dark:bg-zinc-700 dark:hover:border-zinc-400 dark:hover:bg-zinc-600"
            >
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Attribute</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Add any attribute bonus on attunement</span>
            </button>
          </div>
        )}

        {/* Basic screen */}
        {mode === 'basic' && (
          <div className="space-y-2">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Click a modification to add it.</p>
            <div className="flex flex-col gap-2">
              {BASIC_MODS.map((mod) => (
                <button
                  key={mod}
                  type="button"
                  onClick={() => onSave(mod)}
                  className={cn(
                    'flex items-center justify-between rounded-lg border px-4 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400',
                    initial === mod
                      ? 'border-zinc-400 bg-zinc-100 dark:border-zinc-400 dark:bg-zinc-600'
                      : 'border-zinc-200 bg-white hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-700 dark:hover:border-zinc-400 dark:hover:bg-zinc-600',
                  )}
                >
                  <div>
                    <p className="text-sm font-semibold font-mono text-zinc-800 dark:text-zinc-100">{mod}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {mod === 'invulnerable' && "Can't be destroyed by environment, won't despawn"}
                      {mod === 'unbreakable' && 'Becomes unbreakable if it has durability'}
                      {mod === 'soulbound' && 'Travels with you through death'}
                    </p>
                  </div>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-zinc-400 ml-3">
                    <path d="M6 3l5 5-5 5" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Attribute builder screen */}
        {mode === 'attribute' && (
          <div className="space-y-4">
            {/* Attribute name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider dark:text-zinc-400">
                Attribute
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={attrId}
                  placeholder="Search or enter attribute ID..."
                  className={inputClass}
                  onChange={(e) => {
                    setAttrId(e.target.value)
                    setShowSuggestions(true)
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  autoComplete="off"
                  spellCheck={false}
                />
                {showSuggestions && suggestions.length > 0 && (
                  <ul
                    role="listbox"
                    aria-label="Attribute suggestions"
                    className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-600 dark:bg-zinc-800"
                  >
                    {suggestions.map((attr) => (
                      <li key={attr} role="option" aria-selected={attrId === attr}>
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setAttrId(attr)
                            setShowSuggestions(false)
                          }}
                          className="w-full px-3 py-1.5 text-left font-mono text-xs text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-700"
                        >
                          {attr}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Operation */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider dark:text-zinc-400">
                Operation
              </label>
              <div className="flex flex-wrap gap-1.5">
                {operations.map((op) => (
                  <button
                    key={op}
                    type="button"
                    onClick={() => setOperation(op)}
                    className={cn(toggleBtnBase, operation === op ? toggleBtnActive : toggleBtnInactive)}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>

            {/* Value */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider dark:text-zinc-400">
                Value
              </label>
              <input
                type="number"
                value={value}
                placeholder="e.g. 5"
                step="any"
                className={inputClass}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>

            {/* Equipment slot */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider dark:text-zinc-400">
                Equipment Slot
              </label>
              <div className="flex flex-wrap gap-1.5">
                {SLOTS_BASE.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSlot(s)}
                    className={cn(toggleBtnBase, slot === s ? toggleBtnActive : toggleBtnInactive)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {extraSlots.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {extraSlots.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlot(s)}
                      className={cn(toggleBtnBase, slot === s ? toggleBtnActive : toggleBtnInactive)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Live preview */}
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider dark:text-zinc-400">Preview</p>
              <div className="rounded-lg bg-zinc-900 px-4 py-3 font-mono text-xs leading-relaxed">
                {previewParts.map((part, i) => (
                  <span key={i} className={part.filled ? 'text-zinc-200' : 'text-zinc-500'}>
                    {part.text}{i < previewParts.length - 1 ? '/' : ''}
                  </span>
                ))}
              </div>
            </div>

            {/* Save */}
            <button
              type="button"
              disabled={!canSave}
              onClick={() => {
                if (canSave) onSave(`attribute/${attrId}/${operation}/${value}/${slot}`)
              }}
              className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              {initial ? 'Update Modification' : 'Add Modification'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
