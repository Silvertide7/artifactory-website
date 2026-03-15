type Props = {
  json: string
}

type TokenType =
  | 'key'
  | 'string'
  | 'number'
  | 'boolean'
  | 'null'
  | 'punctuation'
  | 'whitespace'

const TOKEN_REGEX =
  /("(?:\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?|[{}[\],:]|\s+)/

const classify = (val: string): TokenType => {
  if (/\s/.test(val)) return 'whitespace'
  if (/^"/.test(val)) return /:$/.test(val.trimEnd()) ? 'key' : 'string'
  if (val === 'true' || val === 'false') return 'boolean'
  if (val === 'null') return 'null'
  if (/^[{}[\],:]$/.test(val)) return 'punctuation'
  return 'number'
}

const colorMap: Record<TokenType, string> = {
  key: 'text-sky-400',
  string: 'text-emerald-400',
  number: 'text-amber-300',
  boolean: 'text-violet-400',
  null: 'text-slate-500',
  punctuation: 'text-slate-400',
  whitespace: '',
}

export const JsonPreview = ({ json }: Props) => {
  if (!json || json === '{}') {
    return (
      <div className="flex items-center justify-center py-14 text-sm italic text-zinc-400">
        Fill in fields to see output
      </div>
    )
  }

  const tokens: { type: TokenType; value: string }[] = []
  const re = new RegExp(TOKEN_REGEX.source, 'g')
  let match
  while ((match = re.exec(json)) !== null) {
    tokens.push({ type: classify(match[0]), value: match[0] })
  }

  return (
    <pre className="overflow-auto p-4 font-mono text-xs leading-[1.75]">
      <code>
        {tokens.map((t, i) => (
          <span key={i} className={colorMap[t.type]}>
            {t.value}
          </span>
        ))}
      </code>
    </pre>
  )
}
