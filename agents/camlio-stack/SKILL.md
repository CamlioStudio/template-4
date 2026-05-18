---
name: camlio-stack
description: >-
  Agent skill for creating and extending projects built on the Camlio stack —
  Sanity v5 (Studio) + Next.js 16 (App Router) headless architecture with
  page-builder blocks, GROQ queries, TypeScript types, and Tailwind CSS v4.
version: "1.0"
figma_design_url: ""   # ← Paste your Figma file URL here before starting a session
                        #   e.g. https://www.figma.com/design/<file-id>/<file-name>
                        #   The agent will use Figma MCP to inspect designs when this is set.
tags:
  - sanity
  - nextjs
  - typescript
  - tailwindcss
  - groq
---

# Camlio Stack — Agent Skill

This skill teaches the agent everything needed to **scaffold, extend, and maintain** projects that follow the Camlio architecture: a Sanity v5 CMS driving a Next.js 16 App Router frontend via GROQ queries and a drag-and-drop page builder.

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

## Core Concepts

### 1. Sanity Schema — Block Objects

Every page section is a Sanity **object** type stored in `studio/src/schemaTypes/objects/<BlockName>/index.ts`:

```ts
import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const myBlock = defineType({
  name: 'myBlock',           // camelCase — must match key in BlockRenderer
  title: 'My Block',
  type: 'object',
  icon: DocumentIcon,
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: `My Block: ${title || 'Untitled'}` }
    },
  },
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    // … more fields
  ],
})
```

**Registration checklist for a new block:**

| File | What to do |
|---|---|
| `studio/src/schemaTypes/objects/<BlockName>/index.ts` | Create schema |
| `studio/src/schemaTypes/importSchemaType.ts` | Import + add to `importSchemaTypes[]` |
| `studio/src/schemaTypes/objects/importPageBuilderTypes.ts` | Add `{ type: 'myBlock' }` entry |
| `studio/src/schemaTypes/documents/page.ts` | Add `{ type: 'myBlock' }` to `pageBuilder` array if NOT using `importPageBuilderTypes` |
| Run `npm run predev` from root | Regenerate `sanity.types.ts` |

### 2. Frontend Block Component

Each block lives in `frontend/app/components/blocks/<BlockName>/index.tsx`:

```tsx
import { MyBlock } from '@/sanity.types'   // auto-generated type

type MyBlockProps = {
  block: MyBlock
  index: number
}

export default function MyBlockBlock({ block }: MyBlockProps) {
  return (
    <section className="…">
      <h2>{block.heading}</h2>
    </section>
  )
}
```

Then **register it in `BlockRenderer.tsx`**:

```ts
import MyBlockBlock from '@/app/components/blocks/MyBlock'

const Blocks = {
  // …existing entries…
  myBlock: MyBlockBlock,
}
```

### 2.1 Global Layout Components

Global UI chrome should live in `frontend/app/components/global/` and be composed from the Next.js root layout:

- `global/Header.tsx` — site-wide header/nav
- `global/Footer.tsx` — site-wide footer content
- `global/Layout.tsx` — wrapper that combines Header + page content + Footer

Usage in `frontend/app/layout.tsx`:

```tsx
import { Layout } from '@/app/components/global/Layout'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
```

Rule: block components under `components/blocks/` must render page sections only, not global header/footer.

### 2.2 Hardcoded Homepage Block Mapping Pattern

When temporarily not using CMS `PageBuilder`, still keep block architecture by mapping section `_type` to block components in `frontend/app/page.tsx`.

Example pattern:

```tsx
const sections = [
  { _type: 'hero', ... },
  { _type: 'story', ... },
] as const

const blockMap = {
  hero: HeroBlock,
  story: StoryBlock,
}

export default function HomePage() {
  return (
    <main>
      {sections.map((section, index) => {
        const SectionComponent = blockMap[section._type]
        return <SectionComponent key={`${section._type}-${index}`} block={section} index={index} />
      })}
    </main>
  )
}
```

Recommended hardcoded homepage section blocks:

- `Hero`
- `Story`
- `Timeline`
- `Gallery`
- `Rsvp`

### 2.3 Shared UI Components (`components/ui/`)

Reusable presentational primitives live in `frontend/app/components/ui/`. Import from there instead of duplicating inline.

| Component | Path | Props | Usage |
|---|---|---|---|
| `FlowerDecor` | `@/app/components/ui/FlowerDecor` | `src?: string`, `className?: string` | Decorative accent above section headings. No `src` → muted placeholder rectangle (`w-12`). With `src` → photo crop (`w-34`, `object-cover`). Pass `className="mx-auto"` when the parent is not a flex centering context. |

**Rule:** if a purely presentational element appears in more than one block, extract it to `components/ui/` rather than copying it.

---

### 3. GROQ Queries

All queries live in `frontend/sanity/lib/queries.ts` and use `defineQuery` from `next-sanity`:

```ts
import {defineQuery} from 'next-sanity'

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id, _type, name, slug,
    "pageBuilder": pageBuilder[]{ ... },
    ...
  }
`)
```

**Common patterns:**

```groq
// Dereference a reference field
"author": author->{ firstName, lastName }

// Conditional field projection per block type
_type == "myBlock" => { ..., link{ ..., "page": page->slug.current } }

// Coalesce for fallback values
"title": coalesce(title, "Untitled")

// Image with asset metadata
thumbnail { ..., asset->{ _id, url, metadata { dimensions { width, height } } } }

// Filter + order
*[_type == "template" && defined(slug.current)] | order(_createdAt desc) [0...limit]
```

### 4. TypeScript Types

Types are auto-generated from the Sanity schema. Import them from `@/sanity.types`:

```ts
import { Page, Hero, ColumnSection } from '@/sanity.types'
import { PageBuilderSection, ExtractPageBuilderType } from '@/sanity/lib/types'

// Extract a specific block type from the union
type HeroBlock = ExtractPageBuilderType<'hero'>
```

### 5. Sanity Singletons — Settings

`settings` is a singleton document (id: `siteSettings`) used for site-wide config.  
Schema: `studio/src/schemaTypes/singletons/settings.tsx`  
Query: `settingsQuery` in `queries.ts` → `*[_type == "settings"][0]{ ... }`

### 6. SEO

- The Studio uses `sanity-plugin-seo` (`seoMetaFields` field type).
- On the frontend, `generateSeoMetadata({ slug })` in `frontend/app/utils/` reads the `seo` field and returns Next.js `Metadata`.

### 7. Images

Use `urlForImage` from `@/sanity/lib/utils`:

```ts
import { urlForImage } from '@/sanity/lib/utils'

const src = urlForImage(block.image).width(800).height(600).url()
```

Use Next.js `<Image>` for rendering. Remote domain `cdn.sanity.io` is already configured in `next.config.ts`.

### 8. Links & Navigation

The `link` schema object supports `href`, `page` (reference), and `post` (reference).  
Use `linkResolver(link)` from `@/sanity/lib/utils` to convert to a URL string.

### 9. Styling Conventions

- Tailwind CSS v4 with `@tailwindcss/postcss`.
- Use `cn(...)` from `@/sanity/lib/utils` (wraps `clsx` + `tailwind-merge`) for conditional classes.
- Use `<Container>` from `@/app/components/Container` for consistent horizontal padding.
- Typography scale classes: `heading-1-bold`, `heading-2-bold`, `body-1-regular`, etc. (defined in global CSS).
- Use project color tokens (e.g., `paper`, `cream`, `ink`, `muted`, `accent`, `sand`) from global theme variables.

### Tailwind Implementation Guidelines

- **Always use design tokens or Tailwind config variables for font sizes, colors, and spacing.**
- **Avoid hardcoded values** (e.g., `text-[17px]`, `text-[#123456]`, `mt-[13px]`).
- Reference Figma tokens and map them to Tailwind classes or custom variables in the Tailwind config.
- If a value is not in the design system, propose adding it to the Tailwind config before using it.
- Use semantic class names and utility classes for consistency and maintainability.
- Review Figma for the correct token or style before implementing a new style.

### 9.1 Video / Media Component Pattern

Use this pattern whenever a block needs a video player. **No external video player library is required** — the player is fully custom.

#### Detection & thumbnail

```ts
function extractYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|[?&]v=)([^?&#]+)/)
  return m ? m[1] : null
}

const ytId = extractYouTubeId(videoUrl)
const isYouTube = ytId !== null

// Auto-generate YT thumbnail when none provided
const thumbnailSrc =
  videoThumbnail ??
  (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null)
```

#### TypeScript — global `window.YT` declaration

Add this once per file (or in a shared `globals.d.ts`):

```ts
interface YTPlayerInstance {
  playVideo(): void
  pauseVideo(): void
  seekTo(seconds: number, allowSeekAhead: boolean): void
  getCurrentTime(): number
  getDuration(): number
  destroy(): void
}

declare global {
  interface Window {
    YT: {
      Player: new (
        el: HTMLElement,
        opts: {
          videoId: string
          width?: string | number
          height?: string | number
          playerVars?: Record<string, string | number>
          events?: {
            onReady?: (e: { target: YTPlayerInstance }) => void
            onStateChange?: (e: { data: number }) => void
          }
        }
      ) => YTPlayerInstance
      PlayerState: { ENDED: 0; PLAYING: 1; PAUSED: 2; BUFFERING: 3; CUED: 5 }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}
```

#### YouTube IFrame API — imperative setup

The YT API **replaces** a plain `<div>` with its own iframe. Create that div outside React's reconciler in a `useEffect`, and destroy the player on cleanup:

```tsx
const ytWrapperRef = useRef<HTMLDivElement>(null)
const ytPlayerRef = useRef<YTPlayerInstance | null>(null)

useEffect(() => {
  if (!isYouTube || !ytId) return
  const wrapper = ytWrapperRef.current
  if (!wrapper) return

  const ytDiv = document.createElement('div')
  ytDiv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%'
  wrapper.appendChild(ytDiv)

  const initPlayer = () => {
    if (!ytDiv.parentElement) return
    ytPlayerRef.current = new window.YT.Player(ytDiv, {
      videoId: ytId,
      width: '100%',
      height: '100%',
      playerVars: { controls: 0, rel: 0, modestbranding: 1, playsinline: 1,
                    enablejsapi: 1, origin: window.location.origin },
      events: {
        onReady: (e) => { const d = e.target.getDuration(); if (d > 0) setDuration(d) },
        onStateChange: (e) => {
          if (e.data === 1) { setIsPlaying(true); setShowThumbnail(false) }
          else if (e.data === 2) setIsPlaying(false)
          else if (e.data === 0) { setIsPlaying(false); setCurrentTime(0); setShowThumbnail(true) }
        },
      },
    })
  }

  if (window.YT?.Player) {
    initPlayer()
  } else {
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => { prev?.(); initPlayer() }
    if (!document.getElementById('yt-iframe-api')) {
      const script = document.createElement('script')
      script.id = 'yt-iframe-api'
      script.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(script)
    }
  }

  return () => { ytPlayerRef.current?.destroy(); ytPlayerRef.current = null }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [isYouTube, ytId])
```

Poll `getCurrentTime()` while playing (YT has no `timeupdate` event):

```ts
useEffect(() => {
  if (!isYouTube || !isPlaying) return
  const id = setInterval(() => {
    const player = ytPlayerRef.current
    if (!player) return
    setCurrentTime(player.getCurrentTime())
    if (duration === 0) { const d = player.getDuration(); if (d > 0) setDuration(d) }
  }, 250)
  return () => clearInterval(id)
}, [isYouTube, isPlaying, duration])
```

#### MP4 native `<video>` handlers

```tsx
<video
  ref={videoRef}
  src={videoUrl}
  className="absolute inset-0 w-full h-full object-cover"
  onTimeUpdate={handleTimeUpdate}
  onLoadedMetadata={handleLoadedMetadata}
  onDurationChange={handleDurationChange}
  onEnded={handleEnded}
  playsInline
  preload="metadata"
/>
```

`preload="metadata"` shows the first frame as a default poster without loading the full file.

#### JSX structure

```tsx
<div className="relative h-[…] overflow-hidden group">
  {/* YouTube wrapper — visibility:hidden keeps space reserved while thumbnail shows */}
  {isYouTube && (
    <div
      ref={ytWrapperRef}
      className="absolute inset-0 w-full h-full"
      style={{ visibility: showThumbnail ? 'hidden' : 'visible' }}
    />
  )}

  {/* MP4 */}
  {!isYouTube && <video ref={videoRef} … />}

  {/* Thumbnail overlay */}
  {showThumbnail && thumbnailSrc && (
    <Image src={thumbnailSrc} alt="…" fill className="object-cover"
      unoptimized={thumbnailSrc.startsWith('https://img.youtube.com')} />
  )}

  {/* Play / Pause button — fades out while playing, reappears on hover */}
  <button
    onClick={handlePlayPause}
    className={[
      'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 …',
      !showThumbnail && isPlaying
        ? 'opacity-0 group-hover:opacity-100 focus:opacity-100'
        : 'opacity-100',
    ].join(' ')}
  >…</button>

  {/* Custom toolbar: progress bar + time display */}
  <div className="absolute bottom-3 left-4 right-4 … flex flex-col gap-1.5">
    {/* Hover tooltip */}
    {hoverRatio !== null && duration > 0 && (
      <div style={{ left: `${hoverRatio * 100}%` }} className="absolute bottom-full …">
        {formatTime(hoverRatio * duration)}
      </div>
    )}
    {/* Progress bar hit area (taller than visual) */}
    <div ref={progressBarRef} role="slider"
      aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}
      onClick={handleProgressClick}
      onMouseMove={handleProgressMouseMove}
      onMouseLeave={handleProgressMouseLeave}
      className="relative flex items-center w-full h-4 cursor-pointer"
    >
      <div className="relative w-full h-1.5 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-white/50" />
        <div className="absolute inset-y-0 left-0 bg-[var(--color-accent)]"
          style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
    <div className="flex justify-between text-white text-sm font-bold tracking-tight">
      <span>{formatTime(currentTime)}</span>
      <span>{duration > 0 ? formatTime(duration) : ''}</span>
    </div>
  </div>
</div>
```

#### Helper

```ts
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}
```

#### Key rules

| Rule | Detail |
|---|---|
| `'use client'` | Required — refs and state are client-only |
| YouTube wrapper visibility | Use `visibility: hidden` (not `display:none`) so the API-managed iframe keeps its DOM node and dimensions |
| `unoptimized` on YT CDN thumbnails | Next.js `<Image>` cannot optimise external `img.youtube.com` URLs without a remote pattern; pass `unoptimized` |
| Progress bar hit area | Make the clickable div `h-4`; the visual track inside is `h-1.5`. Larger hit area improves usability |
| YT script deduplication | Guard the `<script>` injection with `getElementById('yt-iframe-api')` to prevent duplicates across HMR reloads |
| Cleanup | Always call `player.destroy()` in `useEffect` cleanup to avoid memory leaks |

---

### 10. Live / Draft Mode & Visual Editing

- `sanityFetch()` from `@/sanity/lib/live` handles live content and draft mode automatically.
- `<SanityLive>` in root layout keeps all fetches live.
- `dataAttr()` from utils attaches `data-sanity` attributes for Presentation Tool click-to-edit.
- `useOptimistic` in `PageBuilder.tsx` reconciles optimistic Studio edits.

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
