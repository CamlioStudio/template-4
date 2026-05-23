#!/usr/bin/env node
/**
 * migrate-homepage.mjs
 *
 * Migrates mock homepage data into Sanity as a "page" document with slug "home".
 * Images are intentionally omitted — upload them manually via Sanity Studio.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=<your-token> node scripts/migrate-homepage.mjs
 *
 * Get a write token at:
 *   https://www.sanity.io/manage → project 54xrmg4i → API → Tokens → Add API token
 *   Choose "Editor" or "Deploy studio" permission level.
 *
 * The script is idempotent — running it again replaces the existing document.
 */

import { createClient } from '@sanity/client'

const PROJECT_ID = '54xrmg4i'
const DATASET    = 'production'
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
  _id: 'homepage',
  _type: 'page',
  title: 'Home',
  slug: { _type: 'slug', current: 'home' },
  pageBuilder: [
    // ── Hero ──────────────────────────────────────────────────────────────
    // 📸  Upload: /public/hero.png  →  Hero › Background Image
    {
      _type: 'hero',
      _key: 'hero',
      eyebrow: 'A Love Story, Beautifully Planned',
      headline: 'Wedding Planner',
      tagline: 'Every love story deserves a beginning, a celebration, and a memory that lasts forever',
    },

    // ── CTA ───────────────────────────────────────────────────────────────
    {
      _type: 'cta',
      _key: 'cta',
      body: "We're so glad you're here! This is where your journey begins — not just a wedding, but a celebration of everything you've built together.",
      ctaText: 'Start exploring',
      ctaHref: '/contact',
    },

    // ── Story ─────────────────────────────────────────────────────────────
    // 📸  Upload: /public/flower-story.png  →  Story › Decor Image
    // 📸  Upload: /public/story-1.png       →  Story › Left Image
    // 📸  Upload: /public/story-2.png       →  Story › Right Image (Full)
    // 📸  Upload: /public/story-3.png       →  Story › Right Image (Small)
    {
      _type: 'story',
      _key: 'story',
      heading: 'Two Souls, One Journey',
      body: 'Every couple has a story — a series of moments that led them here. We take inspiration from your journey to design a wedding that feels personal, emotional, and truly yours. Because the most beautiful weddings are the ones that reflect real connections.',
    },

    // ── Features ──────────────────────────────────────────────────────────
    {
      _type: 'features',
      _key: 'features',
      heading: 'About the Experience',
      features: [
        {
          _key: 'feature-0',
          title: 'THOUGHTFUL',
          body: 'Every detail is carefully considered — from timeline to atmosphere — ensuring a seamless and stress-free experience.',
        },
        {
          _key: 'feature-1',
          title: 'CREATIVE DIRECTION',
          body: 'We transform your ideas into a cohesive concept, where visuals, emotions, and storytelling come together beautifully.',
        },
        {
          _key: 'feature-2',
          title: 'SEAMLESS EXECUTION',
          body: 'Behind the scenes, we manage everything — so you can stay fully present in every moment.',
        },
      ],
    },

    // ── Timeline ──────────────────────────────────────────────────────────
    // 📸  Upload: (any poster image)  →  Timeline › Video Thumbnail  (optional)
    {
      _type: 'timeline',
      _key: 'timeline',
      heading: "You're Invited!",
      description: 'A glimpse into the moments we create — intimate, emotional, and unforgettable.',
      promoText: '10% sale off',
      targetDate: '2026-06-10T17:00:00.000Z',
      ctaText: 'Contact Us',
      ctaHref: '/contact',
      videoUrl: '/wedding.mp4',
    },

    // ── Gallery ───────────────────────────────────────────────────────────
    // 📸  Upload: /public/snapshot-1.png … snapshot-5.png  →  Gallery › Photos
    {
      _type: 'gallery',
      _key: 'gallery',
      heading: 'Snapshots of Us',
      subtitle: 'A collection of memories — each one unique, each one meaningful.',
      viewAllText: 'View Our Gallery',
      viewAllHref: '/gallery',
    },

    // ── RSVP ──────────────────────────────────────────────────────────────
    {
      _type: 'rsvp',
      _key: 'rsvp',
      heading: "Let's Begin Your Journey",
      subtitle: "Tell us about your wedding — we'll help you shape it into something unforgettable.",
    },

    // ── Quote ─────────────────────────────────────────────────────────────
    // 📸  Upload: /public/banner.png  →  Quote › Background Image
    {
      _type: 'quote',
      _key: 'quote',
      quote: "We're honored to be part of your journey. Your trust means everything to us — and we're here to make your wedding as beautiful, meaningful, and effortless as it should be.",
    },

    // ── Dresscode ─────────────────────────────────────────────────────────
    // 📸  Upload: /public/our-day-1.png … our-day-6.png  →  Dresscode › Photos
    {
      _type: 'dresscode',
      _key: 'dresscode',
      headingSerif: 'Step Into the Palette',
      headingScript: 'of Our Day',
      body: 'From colors to textures, from florals to lighting — every element is chosen to reflect your unique style and atmosphere.',
    },

    // ── Blog ──────────────────────────────────────────────────────────────
    // 📸  Upload: /public/inspired.png, inspired-2.png, inspired-3.png  →  Blog › Articles › Image
    {
      _type: 'blog',
      _key: 'blog',
      heading: 'Stay Inspired',
      subtitle: "Every celebration has a story — here's a closer look at the moments and ideas behind ours.",
      articles: [
        { _key: 'article-0', label: 'Decoration' },
        { _key: 'article-1', label: 'Photography' },
        { _key: 'article-2', label: 'Video record' },
      ],
    },
  ],
}

// ── Run ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`🚀  Migrating homepage → Sanity [${PROJECT_ID}/${DATASET}]`)
  console.log()

  try {
    const result = await client.createOrReplace(pageDocument)
    console.log(`✅  Document created/replaced`)
    console.log(`    _id:  ${result._id}`)
    console.log(`    _rev: ${result._rev}`)
    console.log()
    console.log('📸  Images to upload manually via Sanity Studio:')
    console.log('    Hero        → Background Image           (hero.png)')
    console.log('    Story       → Decor Image                (flower-story.png)')
    console.log('    Story       → Left Image                 (story-1.png)')
    console.log('    Story       → Right Image (Full)         (story-2.png)')
    console.log('    Story       → Right Image (Small)        (story-3.png)')
    console.log('    Timeline    → Video Thumbnail            (optional)')
    console.log('    Gallery     → Photos (5)                 (snapshot-1…5.png)')
    console.log('    Quote       → Background Image           (banner.png)')
    console.log('    Dresscode   → Photos (6)                 (our-day-1…6.png)')
    console.log('    Blog        → Article images (3)         (inspired.png, inspired-2.png, inspired-3.png)')
  } catch (err) {
    console.error('❌  Migration failed:', err.message)
    process.exit(1)
  }
}

main()
