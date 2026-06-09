---
name: camlio-studio
description: >-
  Sanity Studio skill for the Camlio stack. Covers schema object structure,
  field patterns, registration workflow, singletons, SEO plugin, and Studio
  configuration. Load alongside camlio-shared.md when adding or editing blocks.
version: "1.0"
tags:
  - sanity
  - schema
  - groq
  - studio
---

# Camlio Studio — Sanity v5 Skill

This skill covers everything needed to work inside `/studio`. Before implementing, also load `camlio-shared.md` for the end-to-end block contract and naming conventions.

---

## Monorepo Structure — Studio Layer

```
studio/
├── sanity.config.ts             # Studio config: plugins, structure, presentation tool
├── sanity.cli.ts                # CLI config: projectId, dataset
├── src/
│   ├── schemaTypes/
│   │   ├── index.ts             # Master schema registry — import ALL core types here
│   │   ├── importSchemaType.ts  # Secondary registry for blocks added via create-block.js
│   │   ├── documents/           # Document types
│   │   │   ├── page.ts          # Page document with pageBuilder[] array
│   │   │   ├── header.ts        # Header singleton document
│   │   │   ├── footer.ts        # Footer singleton document
│   │   │   └── settings.ts      # Global site settings singleton
│   │   ├── objects/             # Block schema types (one folder per block)
│   │   │   └── importPageBuilderTypes.ts  # Array entries for page.pageBuilder field
│   │   └── singletons/          # Singleton document schemas (if separated from documents/)
│   └── structure/               # Custom Sanity Studio sidebar structure
└── static/
    └── page-builder-thumbnails/ # Preview PNGs shown in Studio "Add block" menu
```

---

## Schema Object Structure

Every page section is a Sanity **object** type. Place each block in its own folder:

`studio/src/schemaTypes/objects/MyBlock/index.ts`

```ts
import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const myBlock = defineType({
  name: 'myBlock',           // camelCase — must match BlockRenderer key
  title: 'My Block',
  type: 'object',
  icon: DocumentIcon,
  preview: {
    select: { title: 'heading', cmsTitle: 'cmsTitle' },
    prepare({ heading, cmsTitle }: any) {
      return { title: cmsTitle || heading || 'My Block' }
    },
  },
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    // … more fields
  ],
})
```

**Key rules:**
- `name` must be camelCase and unique across all schema types.
- `type: 'object'` — never `'document'` for page builder blocks.
- Always include a meaningful `preview` so editors can identify blocks in the Studio.
- Prefer `cmsTitle` (a dedicated editor-facing label field) over content fields for preview titles when the block heading may be empty.

---

## Schema Registration Workflow

After creating a schema file, register it in two places:

### 1. `importSchemaType.ts` (for blocks added via `create-block.js`)

```ts
// studio/src/schemaTypes/importSchemaType.ts
import { myBlock } from './objects/MyBlock'

export const importSchemaTypes = [
  // …existing
  myBlock,
]
```

For core/built-in blocks, import directly in `studio/src/schemaTypes/index.ts` instead.

### 2. `importPageBuilderTypes.ts`

```ts
// studio/src/schemaTypes/objects/importPageBuilderTypes.ts
export const importPageBuilderTypes = [
  // …existing
  { type: 'myBlock' },
]
```

This array is spread into the `pageBuilder` field on the `page` document, making the block available in the Studio drag-and-drop builder.

---

## Common Field Patterns

Use `defineField` for every field. Copy these patterns directly:

```ts
// Plain text
defineField({ name: 'heading', title: 'Heading', type: 'string' })

// Multi-line text
defineField({ name: 'body', title: 'Body', type: 'text', rows: 5 })

// Rich text (Portable Text)
defineField({ name: 'content', title: 'Content', type: 'blockContent' })

// Rich text (text only, no embeds)
defineField({ name: 'description', title: 'Description', type: 'blockContentTextOnly' })

// Single image with alt + hotspot
defineField({
  name: 'image',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
})

// Array of images
defineField({
  name: 'images',
  title: 'Images',
  type: 'array',
  of: [{
    type: 'image',
    options: { hotspot: true },
    fields: [{ name: 'alt', type: 'string', title: 'Alt' }],
  }],
})

// CTA button (shared object type)
defineField({ name: 'button', title: 'Button', type: 'button' })

// Link (internal page reference or external href)
defineField({ name: 'link', title: 'Link', type: 'link' })

// Array of typed objects (e.g., stat cards)
defineField({
  name: 'stats',
  title: 'Stats',
  type: 'array',
  of: [{
    type: 'object',
    fields: [
      { name: 'value', type: 'string', title: 'Value' },
      { name: 'label', type: 'string', title: 'Label' },
    ],
    preview: { select: { title: 'value' } },
  }],
})

// Badge text with default
defineField({
  name: 'badgeText',
  title: 'Badge Text',
  type: 'string',
  initialValue: 'What we do',
})

// Boolean toggle
defineField({
  name: 'isReversed',
  title: 'Reverse Layout',
  type: 'boolean',
  initialValue: false,
})

// Select / enum
defineField({
  name: 'theme',
  title: 'Theme',
  type: 'string',
  options: {
    list: [
      { title: 'Light', value: 'light' },
      { title: 'Dark', value: 'dark' },
    ],
  },
  initialValue: 'light',
})

// Reference to another document
defineField({
  name: 'featuredPage',
  title: 'Featured Page',
  type: 'reference',
  to: [{ type: 'page' }],
})
```

---

## Singletons — Settings, Header, Footer

Singleton documents are documents with a fixed `_id` that cannot be duplicated. They are configured in `sanity.config.ts` via the `singletonPlugin` or structure customisation.

### Settings

- Document type: `settings`
- Fixed `_id`: `siteSettings`
- Schema: `studio/src/schemaTypes/documents/settings.ts`
- Used for: site name, logo, social links, default SEO

Query from frontend:
```ts
// frontend/sanity/lib/queries.ts
export const settingsQuery = defineQuery(
  `*[_type == "settings"][0]{ ... }`
)
```

### Header / Footer

- Document types: `header`, `footer`
- Schema: `studio/src/schemaTypes/documents/header.ts`, `footer.ts`
- Used for: global navigation, footer links, social icons

Query from frontend:
```ts
export const headerQuery = defineQuery(`*[_type == "header"][0]{ ... }`)
export const footerQuery = defineQuery(`*[_type == "footer"][0]{ ... }`)
```

---

## SEO Plugin

The Studio uses `sanity-plugin-seo` which adds a `seoMetaFields` object type. Add it to any document or block that needs SEO control:

```ts
defineField({
  name: 'seo',
  title: 'SEO',
  type: 'seoMetaFields',
})
```

The generated GROQ projection for SEO fields (use in `queries.ts`):

```groq
seo{
  _type, metaTitle, metaDescription, seoKeywords,
  "nofollowAttributes": coalesce(nofollowAttributes, null),
  openGraph{ _type, siteName, url, description, title, image{ ... } },
  twitter{ _type, site, creator, cardType, handle },
  additionalMetaTags[]{ _type, metaAttributes[]{ ... } }
}
```

---

## Studio Preview Thumbnails

Each block can have a thumbnail PNG shown in the Studio "Add block" menu:

- Location: `studio/static/page-builder-thumbnails/<blockName>.png`
- Recommended size: `600 × 400 px`
- Filename must match the schema `name` exactly (camelCase)

Reference the thumbnail in the schema `preview` using the Studio's built-in thumbnail mechanism, or let the Studio auto-display them if the static folder naming matches.

---

## Studio Configuration (`sanity.config.ts`)

The Studio config composes plugins and the custom structure:

```ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from '@sanity/presentation'
import { visionTool } from '@sanity/vision'
import { assist } from '@sanity/assist'
import { seoMetaFields } from 'sanity-plugin-seo'
import { schemaTypes } from './src/schemaTypes'

export default defineConfig({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure: customStructure }),
    presentationTool({ previewUrl: process.env.SANITY_STUDIO_PREVIEW_URL }),
    visionTool(),
    assist(),
    seoMetaFields(),
  ],
})
```

---

## Environment Variables — Studio

| Variable | Required | Description |
|---|---|---|
| `SANITY_STUDIO_PROJECT_ID` | ✅ | Sanity project ID |
| `SANITY_STUDIO_DATASET` | ✅ | Dataset name (e.g. `production`) |
| `SANITY_STUDIO_PREVIEW_URL` | optional | Next.js app URL for Presentation Tool (default `http://localhost:3000`) |

See `references/env-vars.md` for the full reference.

---

## References

- `camlio-shared.md` — naming conventions, block contract, type generation, GROQ
- `camlio-frontend.md` — Next.js block component, BlockRenderer, styling
- `references/block-contract.md` — full end-to-end block contract specification
- `assets/templates/block-schema.ts` — copy-paste schema starter
