---
name: camlio-stack
description: >-
  Orchestration entry point for the Camlio stack — Sanity v5 (Studio) + Next.js
  16 (App Router) headless architecture. Loads the correct sub-skill for the
  layer being worked on. Always read this file first, then load the relevant
  sub-skill before proceeding with any implementation.
version: "2.0"
figma_design_url: ""   # ← Paste your Figma file URL here before starting a session
                        #   e.g. https://www.figma.com/design/<file-id>/<file-name>
                        #   The agent will use Figma MCP to inspect designs when this is set.
sub_skills:
  shared:  agents/camlio-stack/camlio-shared.md
  studio:  agents/camlio-stack/camlio-studio.md
  frontend: agents/camlio-stack/camlio-frontend.md
tags:
  - sanity
  - nextjs
  - typescript
  - tailwindcss
  - groq
---

# Camlio Stack — Orchestration Skill

This is the **entry-point skill** for the Camlio architecture. It describes the overall project structure and routes to the correct sub-skill. Before working on any code, load the relevant sub-skill(s) using `read_file`:

| Task | Sub-skill to load |
|---|---|
| Sanity schema, field, singleton, or studio config | `camlio-studio.md` |
| Next.js component, page, styling, or live editing | `camlio-frontend.md` |
| Block contract (end-to-end), naming, GROQ, types | `camlio-shared.md` |
| Adding a new block (touches both layers) | `camlio-shared.md` **+** `camlio-studio.md` **+** `camlio-frontend.md` |

---

## Figma Integration

When `figma_design_url` is set in the metadata above, use the **Figma MCP** to:

1. Open the file and inspect frames / components for exact colors, spacing, typography tokens, and layout.
2. Map Figma components to Sanity block schema fields (e.g., a "Stats Section" Figma component → `backgroundColumnSection` schema object).
3. Implement the frontend component to match the Figma design pixel-accurately.
4. Use Figma-exported asset names and color tokens to keep code aligned with the design system.

---

## Project Overview

| Layer | Technology | Location |
|---|---|---|
| CMS / Studio | Sanity v5 | `/studio` |
| Frontend | Next.js 16 App Router | `/frontend` |
| Styling | Tailwind CSS v4 | `/frontend` |
| Type generation | `sanity typegen` | root `sanity.schema.json` → `frontend/sanity.types.ts` |
| Package management | npm workspaces | root `package.json` |

The two workspaces share types through an extracted schema JSON. **Always run `npm run predev` from the root** (or `npm run sanity:typegen` from `frontend/`) after any schema change to regenerate `sanity.types.ts`.

---

## Figma Integration

When `figma_design_url` is set in the metadata above, use the **Figma MCP** to:

1. Open the file and inspect frames / components for exact colors, spacing, typography tokens, and layout.
2. Map Figma components to Sanity block schema fields (e.g., a "Stats Section" Figma component → `backgroundColumnSection` schema object).
3. Implement the frontend component to match the Figma design pixel-accurately.
4. Use Figma-exported asset names and color tokens to keep code aligned with the design system.

---

## Project Overview

| Layer | Technology | Location |
|---|---|---|
| CMS / Studio | Sanity v5 | `/studio` |
| Frontend | Next.js 16 App Router | `/frontend` |
| Styling | Tailwind CSS v4 | `/frontend` |
| Type generation | `sanity typegen` | root `sanity.schema.json` → `frontend/sanity.types.ts` |
| Package management | npm workspaces | root `package.json` |

The two workspaces share types through an extracted schema JSON. **Always run `npm run predev` from the root** (or `npm run sanity:typegen` from `frontend/`) after any schema change to regenerate `sanity.types.ts`.

---

## Monorepo Structure

```
camlio-v2/
├── studio/                          # Sanity Studio (Sanity v5)
│   ├── sanity.config.ts             # Studio config: plugins, structure, presentation tool
│   ├── src/
│   │   ├── schemaTypes/
│   │   │   ├── index.ts             # Master schema registry — import ALL types here
│   │   │   ├── importSchemaType.ts  # Secondary registry for blocks added via create-block.js
│   │   │   ├── documents/           # Document types: page.ts, template.ts, tag.ts
│   │   │   ├── singletons/          # settings.tsx (site-wide config)
│   │   │   └── objects/             # Block schema types (one folder per block)
│   │   │       └── importPageBuilderTypes.ts  # Array entries for the page.pageBuilder field
│   │   └── structure/               # Custom Sanity Studio sidebar structure
│   └── static/page-builder-thumbnails/  # Preview PNGs shown in the Studio "Add block" menu
│
├── frontend/                        # Next.js 16 App Router
│   ├── app/
│   │   ├── layout.tsx               # Root layout: fonts, global providers, Header/Footer
│   │   ├── page.tsx                 # Home page — fetches "home" slug, renders BlockRenderer
│   │   ├── [slug]/page.tsx          # Dynamic pages — fetches by slug, renders PageBuilder
│   │   ├── components/
│   │   │   ├── PageBuilder.tsx      # Renders pageBuilder[] array with live-editing support
│   │   │   ├── BlockRenderer.tsx    # Looks up block._type → React component, renders it
│   │   │   ├── blocks/              # One folder per block (matches schema object name)
│   │   │   ├── ui/                  # Reusable presentational components (Badge, Button, …)
│   │   │   ├── icons/               # SVG icon components + central <Icon> registry
│   │   │   └── global/              # Header, Footer, Layout wrapper
│   │   └── utils/                   # generateSeoMetadata, etc.
│   └── sanity/
│       └── lib/
│           ├── api.ts               # env var exports: projectId, dataset, apiVersion, studioUrl
│           ├── client.ts            # createClient() with stega support
│           ├── live.ts              # sanityFetch() + SanityLive for Live Content API
│           ├── queries.ts           # All GROQ queries (defineQuery)
│           ├── service.ts           # Data fetching helpers (getPageBySlug, getTemplates…)
│           ├── types.ts             # PageBuilderSection, ExtractPageBuilderType, DereferencedLink
│           └── utils.ts             # urlForImage, linkResolver, dataAttr, cn, formatPrice
│
├── create-block.js                  # CLI scaffold: node create-block.js <PascalCaseName>
├── sanity.schema.json               # Auto-generated — DO NOT edit manually
└── package.json                     # Root workspace scripts
```

---

## Sub-Skills

Load the sub-skill that matches the layer you are working on. Each sub-skill contains the full implementation details, patterns, and rules for that layer.

### `camlio-shared.md`

Cross-cutting concerns shared by both the Studio and Frontend layers:

- Block naming conventions & end-to-end block contract
- TypeScript type generation workflow (`sanity typegen`)
- GROQ query patterns

### `camlio-studio.md`

Everything needed to work in `/studio`:

- Sanity schema object structure (`defineType`, `defineField`)
- Schema registration checklist (`importSchemaType.ts`, `importPageBuilderTypes.ts`)
- Common field patterns (string, image, Portable Text, button, link, arrays)
- Singletons & settings document
- SEO plugin (`sanity-plugin-seo`)
- Studio preview thumbnails

### `camlio-frontend.md`

Everything needed to work in `/frontend`:

- Frontend block component pattern & `BlockRenderer` registration
- Global layout components (`Header`, `Footer`, `Layout`)
- Hardcoded homepage block mapping pattern
- Shared UI components (`components/ui/`)
- Images (`urlForImage`), Links (`linkResolver`), Styling (Tailwind, `cn`, `Container`)
- Video / Media component pattern (custom YouTube + MP4 player)
- Live / Draft mode & Visual Editing

---

## Quick-Start Commands
---

## Quick-Start Commands

```bash
# From repo root:
npm run dev                    # Start both Studio (:3333) and Next.js (:3000) in parallel
npm run create-block MySection # Scaffold a new block (schema + frontend component)
npm run predev                 # Regenerate sanity.types.ts after schema changes
npm run type-check             # TypeScript check across all workspaces
npm run lint                   # ESLint on frontend

# From /studio:
npx sanity deploy              # Deploy Studio to Sanity-hosted URL

# From /frontend:
npm run build                  # Production build (runs typegen first via prebuild)
```

---

## Environment Variables

| Variable | Workspace | Required |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | frontend | ✅ |
| `NEXT_PUBLIC_SANITY_DATASET` | frontend | ✅ |
| `NEXT_PUBLIC_SANITY_API_VERSION` | frontend | optional (default `2025-09-25`) |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | frontend | optional (default `http://localhost:3333`) |
| `NEXT_PUBLIC_APP_URL` | frontend | optional |
| `SANITY_API_READ_TOKEN` | frontend | for private datasets |
| `SANITY_API_WRITE_TOKEN` | frontend | for mutations |
| `SANITY_STUDIO_PROJECT_ID` | studio | ✅ |
| `SANITY_STUDIO_DATASET` | studio | ✅ |

---

## References

See the `references/` folder for detailed guides:

- `references/architecture.md` — full architecture diagram and data flow
- `references/block-contract.md` — complete specification for adding a new block end-to-end
- `references/groq-patterns.md` — GROQ cheat sheet for this codebase
- `references/env-vars.md` — full environment variable reference

See the `assets/templates/` folder for copy-paste starters:

- `assets/templates/block-schema.ts` — Sanity schema template
- `assets/templates/block-component.tsx` — Next.js block component template


