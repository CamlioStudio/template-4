---
name: camlio-frontend
description: >-
  Next.js Frontend skill for the Camlio stack. Covers block components,
  BlockRenderer, global layout, shared UI, styling conventions, images, links,
  video pattern, and live/draft editing. Load alongside camlio-shared.md when
  adding or editing frontend components.
version: "1.0"
tags:
  - nextjs
  - typescript
  - tailwindcss
  - react
---

# Camlio Frontend — Next.js 16 Skill

This skill covers everything needed to work inside `/frontend`. Before implementing, also load `camlio-shared.md` for the end-to-end block contract, naming conventions, type generation, and GROQ patterns.

---

## Monorepo Structure — Frontend Layer

```
frontend/
├── app/
│   ├── layout.tsx               # Root layout: fonts, global providers, Header/Footer
│   ├── page.tsx                 # Home page — fetches "home" slug, renders BlockRenderer
│   ├── [slug]/page.tsx          # Dynamic pages — fetches by slug, renders PageBuilder
│   ├── globals.css              # Global CSS: Tailwind directives, typography scale, color tokens
│   └── components/
│       ├── PageBuilder.tsx      # Renders pageBuilder[] with live-editing / useOptimistic
│       ├── BlockRenderer.tsx    # Maps block._type → React component
│       ├── Container.tsx        # Consistent horizontal padding wrapper
│       ├── blocks/              # One folder per block (PascalCase, matches schema name)
│       ├── ui/                  # Reusable presentational primitives
│       ├── icons/               # SVG icon components + central <Icon> registry
│       └── global/              # Header, Footer, Layout wrapper
├── sanity/lib/                  # Sanity client, queries, types, utils
└── public/                      # Static assets
```

---

## Frontend Block Component

Each block lives in its own folder under `components/blocks/`:

`frontend/app/components/blocks/MyBlock/index.tsx`

```tsx
import { MyBlock } from '@/sanity.types'   // auto-generated type
import { Container } from '@/app/components/Container'

type MyBlockProps = {
  block: MyBlock
  index: number
}

export default function MyBlockBlock({ block }: MyBlockProps) {
  return (
    <section className="py-16 md:py-24">
      <Container as="div">
        <h2 className="heading-2-bold">{block.heading}</h2>
      </Container>
    </section>
  )
}
```

**Key rules:**
- Props are always `{ block: <GeneratedType>, index: number }`.
- Import the type from `@/sanity.types` (auto-generated) — never hand-write prop types for Sanity fields.
- Use `<Container>` for consistent horizontal padding on sections.
- Block components render page sections only — no global header/footer chrome.

---

## BlockRenderer — Registration

After creating a block component, register it in `BlockRenderer.tsx`:

`frontend/app/components/BlockRenderer.tsx`

```ts
import MyBlockBlock from '@/app/components/blocks/MyBlock'

const Blocks: Record<string, React.ComponentType<any>> = {
  // …existing entries…
  myBlock: MyBlockBlock,   // key = schema `name` (camelCase)
}
```

The map key must exactly match the Sanity schema `name` (camelCase). `BlockRenderer` uses `block._type` to look up the component at runtime.

---

## Global Layout Components

Global UI chrome lives in `frontend/app/components/global/`:

| File | Purpose |
|---|---|
| `global/Header.tsx` | Site-wide navigation header |
| `global/Footer.tsx` | Site-wide footer content |
| `global/Layout.tsx` | Wrapper combining Header + `{children}` + Footer |

Usage in the root layout:

```tsx
// frontend/app/layout.tsx
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

**Rule:** block components under `components/blocks/` must render page sections only — never import or render `Header`, `Footer`, or `Layout` inside a block.

---

## Hardcoded Homepage Block Mapping Pattern

When not yet using the CMS `PageBuilder`, still keep the block architecture by mapping section `_type` to block components directly in `frontend/app/page.tsx`.

```tsx
// frontend/app/page.tsx
import HeroBlock from '@/app/components/blocks/Hero'
import StoryBlock from '@/app/components/blocks/Story'
import { homepageSections } from '@/app/mock/homepage'

const blockMap = {
  hero: HeroBlock,
  story: StoryBlock,
  // …add more as needed
}

export default function HomePage() {
  return (
    <main>
      {homepageSections.map((section, index) => {
        const SectionComponent = blockMap[section._type as keyof typeof blockMap]
        if (!SectionComponent) return null
        return (
          <SectionComponent
            key={`${section._type}-${index}`}
            block={section as any}
            index={index}
          />
        )
      })}
    </main>
  )
}
```

Recommended hardcoded homepage blocks:
- `Hero`
- `Story`
- `Timeline`
- `Gallery`
- `Rsvp`

Mock data lives in `frontend/app/mock/homepage.ts`.

---

## Shared UI Components (`components/ui/`)

Reusable presentational primitives live in `frontend/app/components/ui/`. Import from there instead of duplicating inline.

**Rule:** if a purely presentational element appears in more than one block, extract it to `components/ui/`.

### Available components

| Component | Import | Props | Notes |
|---|---|---|---|
| `FlowerDecor` | `@/app/components/ui/FlowerDecor` | `src?: string`, `className?: string` | Decorative accent above section headings. No `src` → muted placeholder rectangle (`w-12`). With `src` → photo crop (`w-34`, `object-cover`). |

**Usage:**
```tsx
import { FlowerDecor } from '@/app/components/ui/FlowerDecor'

// Without image (placeholder bar)
<FlowerDecor className="mx-auto mb-4" />

// With image
<FlowerDecor src={urlForImage(block.decorImage).url()} className="mx-auto mb-4" />
```

Pass `className="mx-auto"` when the parent is not already a flex centering context.

---

## Images

Use `urlForImage` from `@/sanity/lib/utils` to build Sanity image URLs:

```ts
import { urlForImage } from '@/sanity/lib/utils'

// Basic URL
const src = urlForImage(block.image).url()

// With explicit dimensions
const src = urlForImage(block.image).width(800).height(600).url()
```

Use Next.js `<Image>` for rendering — the remote domain `cdn.sanity.io` is already configured in `next.config.ts`:

```tsx
import Image from 'next/image'

<Image
  src={urlForImage(block.image).width(1200).url()}
  alt={block.image.alt ?? ''}
  width={1200}
  height={800}
  className="w-full h-auto"
/>

// Fill layout (parent must be position: relative with a defined height)
<div className="relative h-64">
  <Image
    src={urlForImage(block.image).url()}
    alt={block.image.alt ?? ''}
    fill
    className="object-cover"
  />
</div>
```

**Rules:**
- Always provide a meaningful `alt` — fall back to `''` only for decorative images.
- Use `fill` + `object-cover` for full-bleed section backgrounds.
- Pass `unoptimized` for external image CDNs (e.g., `img.youtube.com`) that are not in the Next.js remote patterns config.

---

## Links & Navigation

The `link` schema object supports `href` (external), `page` (internal reference), and `post` (internal reference).

Use `linkResolver` from `@/sanity/lib/utils` to convert any link object to a URL string:

```ts
import { linkResolver } from '@/sanity/lib/utils'

const url = linkResolver(block.link)   // returns string | null
```

For navigation links, combine with Next.js `<Link>`:

```tsx
import Link from 'next/link'

{url && <Link href={url}>{block.label}</Link>}
```

---

## Styling Conventions

### Core rules

- Tailwind CSS v4 with `@tailwindcss/postcss`.
- Use `cn(...)` from `@/sanity/lib/utils` (wraps `clsx` + `tailwind-merge`) for conditional classes.
- Use `<Container>` from `@/app/components/Container` for consistent horizontal padding on sections.
- **Always use design tokens or Tailwind config variables** for font sizes, colors, and spacing.
- **Never hardcode values** (e.g., `text-[17px]`, `text-[#123456]`, `mt-[13px]`).

### Typography scale

Semantic class names defined in `globals.css`:

| Class | Usage |
|---|---|
| `heading-1-bold` | Page hero headings |
| `heading-2-bold` | Section headings |
| `heading-3-bold` | Sub-section headings |
| `body-1-regular` | Primary body text |
| `body-2-regular` | Secondary / caption text |

### Color tokens

Use CSS variable-based color tokens from the global theme:

| Token | Usage |
|---|---|
| `paper` | Primary background |
| `cream` | Secondary/muted background |
| `ink` | Primary text |
| `muted` | Secondary text |
| `accent` | Brand accent color |
| `sand` | Warm neutral |

Reference in Tailwind: `bg-paper`, `text-ink`, `border-accent`, etc.  
Reference in inline styles: `var(--color-accent)`, `var(--color-ink)`, etc.

### Tailwind implementation guidelines

- Reference Figma tokens and map them to Tailwind classes or custom variables in the Tailwind config.
- If a value does not exist in the design system, propose adding it to the Tailwind config before using it.
- Use semantic class names for consistency and maintainability.
- Review Figma for the correct token or style before implementing a new style.

---

## Carousel Pattern (Embla)

Use `embla-carousel-react` (already installed) for any swipeable/scrollable block. Never use Swiper, Keen Slider, or other carousel libraries.

### Installation

```bash
# Already installed in the workspace — do not re-install
npm install embla-carousel-react
```

### Standard pattern — dots pagination, 2 slides per view

```tsx
'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export default function MyCarouselBlock({ block }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', slidesToScroll: 2 })
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  )

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  return (
    <section>
      {/* Viewport — must have overflow:hidden */}
      <div ref={emblaRef} className="overflow-hidden">
        {/* Track — must be flex, no wrapping */}
        <div className="flex gap-5">
          {items.map((item, i) => (
            // Each slide: 100% on mobile, 50% (minus gap) on sm+
            <div key={i} className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-10px)]">
              {/* slide content */}
            </div>
          ))}
        </div>
      </div>

      {/* Dot navigation — only render when there is more than one snap */}
      {scrollSnaps.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={[
                'rounded-full transition-all duration-300',
                i === selectedIndex
                  ? 'w-6 h-3 bg-ink'
                  : 'w-3 h-3 bg-ink/30 hover:bg-ink/60',
              ].join(' ')}
            />
          ))}
        </div>
      )}
    </section>
  )
}
```

### Carousel key rules

| Rule | Detail |
|---|---|
| `'use client'` | Required — `useEmblaCarousel` uses refs and effects |
| Viewport `overflow-hidden` | The `ref` target must have `overflow:hidden`; never put it on the slide track |
| Slide track is `flex` | The direct child of the viewport must be `display:flex` with no wrapping |
| Slide sizing | Use `flex-[0_0_<width>]` (Tailwind arbitrary flex shorthand) — e.g. `flex-[0_0_100%]` mobile, `sm:flex-[0_0_calc(50%-10px)]` desktop (subtract half the gap) |
| Gap on track | Apply `gap-<n>` to the flex track; compensate for it in `calc()` inside each slide's flex-basis |
| `slidesToScroll` | Match to how many slides are visible — `1` for single-up, `2` for two-up |
| Dots from `scrollSnapList()` | Call `emblaApi.scrollSnapList()` after mount to get the canonical snap count — do not compute it manually |
| Active dot style | Use a wider pill (`w-6 h-3`) for the active dot and a circle (`w-3 h-3`) for inactive — matches the Figma pagination style |
| Cleanup | Always call `emblaApi.off('select', onSelect)` in the `useEffect` cleanup |

---

## Video / Media Component Pattern

Use this pattern whenever a block needs a video player. No external library is required — the player is fully custom and supports both YouTube (IFrame API) and native MP4.

### Detection & thumbnail

```ts
function extractYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|[?&]v=)([^?&#]+)/)
  return m ? m[1] : null
}

const ytId = extractYouTubeId(videoUrl)
const isYouTube = ytId !== null

// Auto-generate YT thumbnail when none is provided in the CMS
const thumbnailSrc =
  videoThumbnail ??
  (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null)
```

### TypeScript — global `window.YT` declaration

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

### YouTube IFrame API — imperative setup

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

### MP4 native `<video>` handlers

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

`preload="metadata"` loads the first frame as a default poster without fetching the full file.

### JSX structure

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
  <div className="absolute bottom-3 left-4 right-4 flex flex-col gap-1.5">
    {/* Hover tooltip */}
    {hoverRatio !== null && duration > 0 && (
      <div style={{ left: `${hoverRatio * 100}%` }} className="absolute bottom-full …">
        {formatTime(hoverRatio * duration)}
      </div>
    )}
    {/* Progress bar hit area (taller than visual track for easier interaction) */}
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

### Helper

```ts
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}
```

### Video component key rules

| Rule | Detail |
|---|---|
| `'use client'` | Required — refs and state are client-only |
| YouTube wrapper visibility | Use `visibility: hidden` (not `display: none`) so the API-managed iframe keeps its DOM node and dimensions |
| `unoptimized` on YT CDN thumbnails | Next.js `<Image>` cannot optimise `img.youtube.com` URLs without a remote pattern; pass `unoptimized` |
| Progress bar hit area | Make the clickable div `h-4`; the visual track inside is `h-1.5`. Larger hit area improves usability |
| YT script deduplication | Guard `<script>` injection with `getElementById('yt-iframe-api')` to prevent duplicates across HMR reloads |
| Cleanup | Always call `player.destroy()` in `useEffect` cleanup to avoid memory leaks |

---

## SEO — Frontend

On the frontend, `generateSeoMetadata` in `frontend/app/utils/` reads the `seo` field returned from GROQ and returns a Next.js `Metadata` object:

```ts
// frontend/app/[slug]/page.tsx
import { generateSeoMetadata } from '@/app/utils/generateSeoMetadata'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return generateSeoMetadata({ slug: params.slug })
}
```

The SEO data comes from the `seoMetaFields` field on the page document — see `camlio-studio.md` for the schema side.

---

## Live / Draft Mode & Visual Editing

- `sanityFetch()` from `@/sanity/lib/live` handles live content and draft mode automatically.
- `<SanityLive>` in the root layout (`app/layout.tsx`) keeps all fetches live.
- `dataAttr()` from `@/sanity/lib/utils` attaches `data-sanity` attributes for Presentation Tool click-to-edit.
- `useOptimistic` in `PageBuilder.tsx` reconciles optimistic Studio edits without waiting for the full GROQ response.

```tsx
// Root layout — enables live content globally
import { SanityLive } from '@/sanity/lib/live'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
        <SanityLive />
      </body>
    </html>
  )
}
```

```tsx
// Inside a block component — attach data-sanity for click-to-edit
import { dataAttr } from '@/sanity/lib/utils'

<div {...dataAttr(block._id, 'heading')}>
  <h2>{block.heading}</h2>
</div>
```

---

## Environment Variables — Frontend

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ | — | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ | — | Dataset name (e.g. `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | optional | `2025-09-25` | Sanity API version date |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | optional | `http://localhost:3333` | Studio URL for stega + Presentation Tool |
| `NEXT_PUBLIC_APP_URL` | optional | `https://www.camlio.me` | Canonical app URL for `metadataBase` |
| `SANITY_API_READ_TOKEN` | private datasets | — | Sanity token with `viewer` role |
| `SANITY_API_WRITE_TOKEN` | mutations | — | Sanity token with `editor` role |

See `references/env-vars.md` for the full reference including Vercel and CI setup.

---

## Dynamic Page Routing (`[slug]`)

All CMS-driven pages beyond the homepage are served by `app/[slug]/page.tsx`.

### Route file

```tsx
// frontend/app/[slug]/page.tsx
import { notFound, redirect } from 'next/navigation'
import { getPageBySlug } from '@/sanity/lib/service'
import { PageBuilder } from '@/app/components/PageBuilder'

type Props = { params: Promise<{ slug: string }> }

export default async function SlugPage({ params }: Props) {
  const { slug } = await params

  // Prevent duplicate content — homepage lives at / not /home
  if (slug === 'home') redirect('/')

  const page = await getPageBySlug(slug)
  if (!page?.pageBuilder?.length) notFound()

  return <PageBuilder sections={page.pageBuilder} />
}
```

### Query — always use the full projection

`getPageQuery` in `sanity/lib/queries.ts` must mirror `getHomePageQuery` exactly but parameterised with `$slug`. Both queries project images as URL strings via `asset->url`. Keep them in sync when adding new block types.

### Rules

| Rule | Detail |
|---|---|
| `redirect('/')` for `slug === 'home'` | Prevents `/home` and `/` from serving duplicate content |
| `notFound()` when page is missing | Returns a proper 404; never render an empty shell |
| Projection parity | `getPageQuery` and `getHomePageQuery` must have identical `select()` branches — update both when a new block is added |
| Homepage stays at `/` | `app/page.tsx` uses `getHomePage()` (hardcoded `slug == "home"` query) — do not add slug logic there |

---

## References

- `camlio-shared.md` — naming conventions, block contract, type generation, GROQ
- `camlio-studio.md` — Sanity schema, field patterns, singletons
- `references/architecture.md` — full architecture and data flow diagram
- `references/groq-patterns.md` — extended GROQ cheat sheet
- `assets/templates/block-component.tsx` — copy-paste block component starter
