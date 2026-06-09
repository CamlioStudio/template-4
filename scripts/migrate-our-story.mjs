#!/usr/bin/env node
/**
 * migrate-our-story.mjs
 *
 * Migrates mock "Our Story" page data into Sanity as a "page" document
 * with slug "our-story".
 * Images are intentionally omitted — upload them manually via Sanity Studio.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=<your-token> node scripts/migrate-our-story.mjs
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
  _id: 'our-story-page',
  _type: 'page',
  title: 'Our Story',
  slug: { _type: 'slug', current: 'our-story' },
  pageBuilder: [
    // ── Hero ──────────────────────────────────────────────────────────────
    // 📸  Upload: (banner image)  →  Hero › Background Image
    {
      _type: 'hero',
      _key: 'hero',
      eyebrow: 'A Love Story',
      headline: 'Our Story',
      tagline: 'Two hearts, one journey — this is how it all began',
    },

    // ── Story (Our Story section) ─────────────────────────────────────
    // 📸  Upload: /public/flower-story.png  →  Story › Decor Image
    // 📸  Upload: (portrait left)         →  Story › Left Image
    // 📸  Upload: (portrait right full)   →  Story › Right Image (Full)
    // 📸  Upload: (portrait right small)  →  Story › Right Image (Small)
    {
      _type: 'story',
      _key: 'story',
      heading: 'Two Paths, One Destiny',
      body: 'Like rivers meeting at sea, our lives flowed toward each other. We’ve grown not only as individuals but as partners — learning, laughing, and loving. Now, as we join hands, we carry every shared moment into our forever.',
    },

    // ── Couple ────────────────────────────────────────────────────────────
    // 📸  Upload: (decor image)      →  Couple › Decor Image
    // 📸  Upload: (person 1 photo)   →  Couple › People › [0] › Photo
    // 📸  Upload: (person 2 photo)   →  Couple › People › [1] › Photo
    {
      _type: 'couple',
      _key: 'couple',
      heading: 'Meet the Couple',
      people: [
        {
          _key: 'person-0',
          name: 'Emily Johnson',
          role: 'The Bride',
          bio: 'A dreamer with a passion for art, travel, and everything that sparkles. Emily brings warmth and creativity to everything she touches.',
          socials: [
            { _key: 'social-0', platform: 'instagram', href: 'https://instagram.com/' },
          ],
        },
        {
          _key: 'person-1',
          name: 'Daniel Carter',
          role: 'The Groom',
          bio: 'An adventurer at heart who found his greatest adventure in love. Daniel grounds every moment with kindness and quiet strength.',
          socials: [
            { _key: 'social-0', platform: 'instagram', href: 'https://instagram.com/' },
          ],
        },
      ],
    },

    // ── Journey ───────────────────────────────────────────────────────────
    // 📸  Upload: (milestone image per item)  →  Journey › Items › [n] › Image
    {
      _type: 'journey',
      _key: 'journey',
      items: [
        {
          _key: 'milestone-0',
          year: '2017',
          heading: 'A Chance Encounter',
          body: "We didn't meet with grand gestures or sweeping moments—just a quiet introduction at a mutual friend's gathering. It was ordinary, almost forgettable at first. But in between light conversations, easy laughs, and the simplest of exchanges, something gentle began to unfold.\n\nWhat started as casual chats soon turned into long conversations that neither of us wanted to end. Looking back, it was in those little in-between moments where something real began to take root.",
        },
        {
          _key: 'milestone-1',
          year: '2020',
          heading: 'Strangers to Soulmates',
          body: "What began as a quiet friendship gradually unfolded into something more meaningful. What once were simple check-ins became hours-long conversations. Late-night talks turned into early morning texts, and before we realized it, we had built a rhythm that felt like home.\n\nCoffee dates became our shared ritual, weekend walks became our favorite escape, and laughter—the kind that echoed through quiet streets—became the language we knew best. Somewhere between ordinary days and unexpected moments, friendship transformed into love.",
        },
        {
          _key: 'milestone-2',
          year: '2024',
          heading: 'The Yes For Everything',
          body: "It was a quiet evening—just the two of us, wrapped in stillness, with soft lights glowing and hearts beating a little faster than usual. There were no grand gestures, only a feeling we both knew: that this was the moment.\n\nWith a nervous breath and steady eyes, the question was asked: \"Will you spend forever with me?\"\n\nAnd in that moment, time stood still. We said yes—not just to marriage, but to all of it.",
        },
      ],
    },

    // ── CTA ───────────────────────────────────────────────────────────────
    // 📸  Upload: (background image)  →  CTA › Background Image
    {
      _type: 'cta',
      _key: 'cta',
      body: "We're so grateful to have you with us on this journey. Your presence on our wedding day will make it all the more special.",
      ctaText: 'RSVP Now',
      ctaHref: '/rsvp',
    },
  ],
}

// ── Run ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`🚀  Migrating Our Story page → Sanity [${PROJECT_ID}/${DATASET}]`)
  console.log()

  try {
    const result = await client.createOrReplace(pageDocument)
    console.log(`✅  Document created/replaced`)
    console.log(`    _id:  ${result._id}`)
    console.log(`    _rev: ${result._rev}`)
    console.log()
    console.log('📸  Images to upload manually via Sanity Studio:')
    console.log('    Hero    → Background Image               (banner image)')
    console.log('    Story   → Decor Image                    (flower-story.png)')
    console.log('    Story   → Left / Right Images            (portrait photos)')
    console.log('    Couple  → Decor Image                    (optional)')
    console.log('    Couple  → People › [0] › Photo           (bride photo)')
    console.log('    Couple  → People › [1] › Photo           (groom photo)')
    console.log('    Journey → Items › [0–2] › Image          (one per milestone)')
    console.log('    CTA     → Background Image               (optional)')
  } catch (err) {
    console.error('❌  Migration failed:', err.message)
    process.exit(1)
  }
}

main()
