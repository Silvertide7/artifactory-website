# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev            # Start dev server with HMR
npm run build          # Type-check + production build (tsc -b && vite build)
npm run lint           # ESLint
npm run format         # Prettier write
npm run format:check   # Prettier check (CI)
npm run preview        # Build + run via wrangler dev
npm run deploy         # Build + deploy to Cloudflare Workers
```

No test suite is configured.

## Architecture

This is a React + TypeScript + Vite multi-page SPA for Minecraft mod tooling. It hosts config generators and documentation for multiple mods (Artifactory, Homebound).

**Stack:** React 19, React Router 7, TypeScript 5, Vite 8, Tailwind CSS 4, react-hook-form + Zod for validation, jszip for datapack generation, Cloudflare Workers for deployment.

### Routing

`App.tsx` sets up React Router v7 with a shared `Layout` (breadcrumb nav + theme toggle) wrapping all routes:

- `/` - Home page (mod cards)
- `/artifactory` - Artifactory mod landing page with tabs
- `/artifactory/config-generator` - JSON / Datapack Builder
- `/homebound` - Homebound mod landing page with tabs

### JSON Builder data flow

1. `JsonBuilderForm` (`src/features/jsonBuilder/`) owns all form state via `react-hook-form` with a Zod resolver
2. Nested attunement levels are managed as field arrays; each level is rendered by `AttunementLevelItem`
3. `useSavedItems` persists configurations to `localStorage`; `SavedItemsList` renders them with load/delete/download actions
4. `output.ts` serializes form state to clean JSON (omits empty/nullish fields), handles clipboard copy, file download, and datapack zip generation (Forge 1.20.1 and NeoForge 1.21.1)
5. `JsonPreview` renders syntax-highlighted live JSON output

### Key files

| File                                               | Role                                                                                     |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `src/features/jsonBuilder/fieldConfig.ts`          | Zod schemas and default values; source of truth for the data model                      |
| `src/features/jsonBuilder/JsonBuilderForm.tsx`     | Main form orchestration, validation, layout                                              |
| `src/features/jsonBuilder/AttunementLevelItem.tsx` | Collapsible per-level editor (nested field arrays)                                       |
| `src/features/jsonBuilder/output.ts`               | JSON transformation, clipboard/download, datapack zip generation                         |
| `src/features/jsonBuilder/SavedItemsList.tsx`      | Saved configurations list with load/delete/datapack download; grouped by mod ID          |
| `src/features/jsonBuilder/useSavedItems.ts`        | Custom hook for localStorage-backed saved items (save, remove, find)                    |
| `src/components/`                                  | Shared UI primitives: `Button`, `FormField`, `StringListInput`, `JsonPreview`, `Tooltip` |
| `src/components/ToolLinkCard.tsx`                  | Card component for linking to tools from landing pages                                   |
| `src/components/inputStyles.ts`                    | Shared Tailwind class strings for inputs/selects                                         |
| `src/hooks/useTheme.ts`                            | Dark/light mode toggle; persists to localStorage; default is dark                        |

When changing the data model, update `fieldConfig.ts` first (schema + defaults), then propagate to the form and output serializer.

## Writing Standards

Do not use em dashes (—) in UI copy or documentation. Use commas, semicolons, colons, or parentheses instead.
