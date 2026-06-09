#!/usr/bin/env node
/**
 * migrate-bridesmaid-groomsmen.mjs
 *
 * Migrates mock "Bridesmaid & Groomsmen" page data into Sanity as a "page"
 * document with slug "bridesmaid-groomsmen".
 * Images are intentionally omitted — upload them manually via Sanity Studio.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=<your-token> node scripts/migrate-bridesmaid-groomsmen.mjs
 *
 * Get a write token at:
 *   https://www.sanity.io/manage → project 54xrmg4i → API → Tokens → Add API token
 *   Choose "Editor" or "Deploy studio" permission level.
 *
 * The script is idempotent — running it again replaces the existing document.
 */

import { createClient } from '@sanity/client'

const PROJECT_ID  = '54xrmg4i'
const DATASET     = 'production'
const API_VERSION = '2025-09-25'

const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  console.error('❌  SANITY_API_WRITE_TOKEN env var is required.')
  console.error('    Get one at https://www.sanity.io/manage → API → Tokens')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token,
  useCdn: false,
})

// ── Page document ────────────────────────────────────────────────────────────
// Images are omitted here. After running this script, open Sanity Studio and
// upload the corresponding images from /frontend/public/ into each block.

const pageDocument = {
  _id: 'bridesmaid-groomsmen-page',
  _type: 'page',
  title: 'Bridesmaid & Groomsmen',
  slug: { _type: 'slug', current: 'bridesmaid-groomsmen' },
  pageBuilder: [
    // ── Hero (Banner) ─────────────────────────────────────────────────────
    // 📸  Upload: (banner background image)  →  Hero › Background Image
    {
      _type: 'hero',
      _key: 'hero',
      cmsTitle: 'Bridesmaid & Groomsmen Banner',
      headline: 'Bridesmaid & Groomsmen',
      // "B" in "Bridesmaid" and "G" in "Groomsmen" rendered in Kapakana script
      highlights: [
        { _key: 'h-0', char: 'B', charIndex: 0 },
        { _key: 'h-1', char: 'G', charIndex: 0 },
      ],
    },

    // ── Bridesmaids & Groomsmen ───────────────────────────────────────────
    // 📸  Upload one photo per member  →  BridesmaidsGroomsmen › Members › [n] › Photo
    {
      _type: 'bridesmaidsGroomsmen',
      _key: 'bridesmaids-groomsmen',
      cmsTitle: 'Our Bridesmaids & Groomsmen',
      heading: 'Our Bridesmaids & Groomsmen',
      // "B" in "Bridesmaids" and "G" in "Groomsmen" rendered in Kapakana script
      highlights: [
        { _key: 'h-0', char: 'B', charIndex: 0 },
        { _key: 'h-1', char: 'G', charIndex: 0 },
      ],
      description:
        "They've been there for every milestone, and now they'll be standing beside us for the biggest one yet.",
      members: [
        {
          _key: 'member-0',
          name: 'Livia Aria',
          role: 'Bridesmaid',
        },
        {
          _key: 'member-1',
          name: 'Maya Selena',
          role: 'Bridesmaid',
        },
        {
          _key: 'member-2',
          name: 'Zara Noor',
          role: 'Bridesmaid',
        },
        {
          _key: 'member-3',
          name: 'Ezra M.',
          role: 'Groomsmen',
        },
        {
          _key: 'member-4',
          name: 'Kai Julian',
          role: 'Groomsmen',
        },
        {
          _key: 'member-5',
          name: 'Ravi Theo',
          role: 'Groomsmen',
        },
      ],
    },

    // ── Wishes (Words of Love) ────────────────────────────────────────────
    {
      _type: 'wishes',
      _key: 'wishes',
      cmsTitle: 'Words of Love',
      heading: 'Words of Love',
      // "L" in "Love" rendered in Kapakana script
      highlights: [
        { _key: 'h-0', char: 'L', charIndex: 1 },
      ],
      quotes: [
        {
          _key: 'quote-0',
          quote:
            'Wishing you endless days of adventure, belly laughs, and quiet moments of peace. Love wins.',
          author: 'Emily S.',
        },
        {
          _key: 'quote-1',
          quote:
            'Congratulations, Laila & Blaize! May your days be filled with love as beautiful as your journey.',
          author: 'Jason L.',
        },
        {
          _key: 'quote-2',
          quote:
            "I always knew you'd end up together. You're proof that soulmates are real.",
          author: 'Clara W.',
        },
        {
          _key: 'quote-3',
          quote:
            "From friendship to forever — watching your story unfold has been a joy. Can't wait to celebrate you!",
          author: 'Jules & Kai',
        },
      ],
    },

    // ── CTA ───────────────────────────────────────────────────────────────
    // 📸  Upload: (background image)  →  CTA › Background Image
    {
      _type: 'cta',
      _key: 'cta',
      cmsTitle: 'RSVP CTA',
      body: 'Your presence would mean the world to us.',
      ctaText: 'RSVP',
      ctaHref: '/rsvp',
    },
  ],
}

// ── Run ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`🚀  Migrating Bridesmaid & Groomsmen page → Sanity [${PROJECT_ID}/${DATASET}]`)
  console.log()

  try {
    const result = await client.createOrReplace(pageDocument)
    console.log(`✅  Document created/replaced`)
    console.log(`    _id:  ${result._id}`)
    console.log(`    _rev: ${result._rev}`)
    console.log()
    console.log('📸  Images to upload manually via Sanity Studio:')
    console.log('    Hero                  → Background Image               (banner background)')
    console.log('    BridesmaidsGroomsmen  → Members › [0] › Photo          (Livia Aria)')
    console.log('    BridesmaidsGroomsmen  → Members › [1] › Photo          (Maya Selena)')
    console.log('    BridesmaidsGroomsmen  → Members › [2] › Photo          (Zara Noor)')
    console.log('    BridesmaidsGroomsmen  → Members › [3] › Photo          (Ezra M.)')
    console.log('    BridesmaidsGroomsmen  → Members › [4] › Photo          (Kai Julian)')
    console.log('    BridesmaidsGroomsmen  → Members › [5] › Photo          (Ravi Theo)')
    console.log('    CTA                   → Background Image               (optional)')
    console.log()
    console.log(`🔗  Page URL: http://localhost:3000/bridesmaid-groomsmen`)
  } catch (err) {
    console.error('❌  Migration failed:', err.message)
    process.exit(1)
  }
}

main()
