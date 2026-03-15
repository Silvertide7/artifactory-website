# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Type-check + production build (tsc -b && vite build)
npm run lint      # ESLint
npm run preview   # Preview production build
```

No test suite is configured.

## Architecture

This is a React + TypeScript + Vite SPA — an "Attunement Data Source Config Generator" that produces Artifactory mod configuration JSON.

**Stack:** React 19, TypeScript 5, Vite 8, Tailwind CSS 4, react-hook-form + Zod for validation.

### Data flow

1. `App.tsx` renders the header and mounts `JsonBuilderForm`
2. `JsonBuilderForm` (`src/features/jsonBuilder/`) owns all form state via `react-hook-form` with a Zod resolver
3. Nested attunement levels are managed as field arrays; each level is rendered by `AttunementLevelItem`
4. `output.ts` serializes form state → clean JSON (omits empty/nullish fields) and handles clipboard copy + file download
5. `JsonPreview` renders syntax-highlighted live JSON output

### Key files

| File | Role |
|------|------|
| `src/features/jsonBuilder/fieldConfig.ts` | Zod schemas and default values — source of truth for the data model |
| `src/features/jsonBuilder/JsonBuilderForm.tsx` | Main form orchestration, validation, layout |
| `src/features/jsonBuilder/AttunementLevelItem.tsx` | Collapsible per-level editor (nested field arrays) |
| `src/features/jsonBuilder/output.ts` | JSON transformation + clipboard/download utilities |
| `src/components/` | Shared UI primitives: `Button`, `FormField`, `StringListInput`, `JsonPreview`, `Tooltip` |
| `src/components/inputStyles.ts` | Shared Tailwind class strings for inputs/selects |

When changing the data model, update `fieldConfig.ts` first (schema + defaults), then propagate to the form and output serializer.
