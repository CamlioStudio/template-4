#!/usr/bin/env node
/**
 * migrate-location.mjs
 *
 * Migrates the Location page data into Sanity as a "page" document
 * with slug "location".
 *
 * Page structure (from Figma node 24:2000):
 *   ├── Hero          — "Location" banner with full-bleed background image
 *   ├── LocationVenue — The Ceremony section (images right)
 *   ├── LocationVenue — The Reception section (images left)
 *   └── Gift          — "A Gift from the Heart" section
 *
 * Images are intentionally omitted — upload them manually via Sanity Studio
 * after running this script.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=<your-token> node scripts/migrate-location.mjs
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
// All Kapakana (script font) highlight characters are specified in `highlights`.
// In the Figma design the first letter of a key word is rendered in the
// decorative Kapakana font at a larger size — e.g. the "L" in "Location",
// the "C" in "Ceremony", the "H" in "Heart", etc.

const pageDocument = {
  _id: 'location-page',
  _type: 'page',
  title: 'Location',
  slug: { _type: 'slug', current: 'location' },
  pageBuilder: [

    // ── Hero ─────────────────────────────────────────────────────────────
    // Figma: node 24:2075 — full-bleed banner, white "Location" heading
    // "L" is rendered in Kapakana (script font), rest in Instrument Serif.
    //
    // 📸  Upload: venue / landscape photo  →  Hero › Background Image
    {
      _type: 'hero',
      _key: 'hero-location',
      cmsTitle: 'Location Hero Banner',
      eyebrow: '',
      headline: 'Location',
      highlights: [
        { _key: 'hl-0', char: 'L', charIndex: 0 },
      ],
      tagline: '',
    },

    // ── The Ceremony ─────────────────────────────────────────────────────
    // Figma: node 24:2044
    // Two-column layout: text + map on the left, stacked images on the right.
    // "C" in "Ceremony" → Kapakana.
    //
    // 📸  Upload: ceremony photo (tall)   →  Location Venue › Venue Images [0]
    // 📸  Upload: ceremony photo (small)  →  Location Venue › Venue Images [1]
    // 📸  Upload: map screenshot          →  Location Venue › Map Image
    {
      _type: 'locationVenue',
      _key: 'venue-ceremony',
      cmsTitle: 'The Ceremony',
      title: 'The Ceremony',
      highlights: [
        { _key: 'hl-0', char: 'C', charIndex: 0 },
      ],
      venueName: 'Garden Pavilion, Meadow Garden',
      time: '5:00 PM',
      imagesPosition: 'right',
    },

    // ── The Reception ─────────────────────────────────────────────────────
    // Figma: node 24:2059
    // Two-column layout: stacked images on the left, text + map on the right.
    // "R" in "Reception" → Kapakana.
    //
    // 📸  Upload: reception photo (tall)     →  Location Venue › Venue Images [0]
    // 📸  Upload: reception photo (small 1)  →  Location Venue › Venue Images [1]
    // 📸  Upload: reception photo (small 2)  →  Location Venue › Venue Images [2]
    // 📸  Upload: map screenshot             →  Location Venue › Map Image
    {
      _type: 'locationVenue',
      _key: 'venue-reception',
      cmsTitle: 'The Reception',
      title: 'The Reception',
      highlights: [
        { _key: 'hl-0', char: 'R', charIndex: 0 },
      ],
      venueName: 'Palm Courtyard, Meadow Garden',
      time: '6:30 PM until late',
      imagesPosition: 'left',
    },

    // ── Gift ─────────────────────────────────────────────────────────────
    // Figma: node 24:2025
    // Centered white card with two sub-sections:
    //   1. Send a Physical Gift — address + map
    //   2. Bank Transfer via QR Code — QR image
    // "H" in "Heart" → Kapakana.
    //
    // 📸  Upload: flower / floral decor  →  Gift › Decorative Flower Image
    // 📸  Upload: map screenshot         →  Gift › Physical Address Map Image
    // 📸  Upload: QR code image          →  Gift › QR Code Image
    {
      _type: 'gift',
      _key: 'gift',
      cmsTitle: 'A Gift from the Heart',
      heading: 'A Gift from the Heart',
      highlights: [
        { _key: 'hl-0', char: 'H', charIndex: 0 },
      ],
      description: "Your presence is our greatest gift, but if you'd like to send something more, here's how.",
      physicalGiftTitle: 'Send a Physical Gift',
      physicalGiftDescription: 'Please feel free to send your gift to the address below:',
      physicalAddress: 'KLLG St, No.99, Pku City, ID 28289',
      bankTransferTitle: 'Bank Transfer via QR Code',
      bankTransferDescription: 'To make things easier, you can also send a monetary gift using the QR code below.',
    },

  ],
}

// ── Run ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`🚀  Migrating Location page → Sanity [${PROJECT_ID}/${DATASET}]`)
  console.log()

  try {
    const result = await client.createOrReplace(pageDocument)

    console.log(`✅  Document created/replaced`)
    console.log(`    _id:   ${result._id}`)
    console.log(`    _rev:  ${result._rev}`)
    console.log()
    console.log('📸  Images to upload manually via Sanity Studio:')
    console.log()
    console.log('  Hero')
    console.log('    → Background Image          (full-bleed venue/landscape photo)')
    console.log()
    console.log('  Location Venue — The Ceremony')
    console.log('    → Venue Images [0]          (tall portrait of ceremony space)')
    console.log('    → Venue Images [1]          (small portrait — bottom corner)')
    console.log('    → Map Image                 (map screenshot of ceremony venue)')
    console.log()
    console.log('  Location Venue — The Reception')
    console.log('    → Venue Images [0]          (tall portrait of reception space)')
    console.log('    → Venue Images [1]          (small portrait — bottom corner)')
    console.log('    → Venue Images [2]          (extra portrait — optional)')
    console.log('    → Map Image                 (map screenshot of reception venue)')
    console.log()
    console.log('  Gift')
    console.log('    → Decorative Flower Image   (small floral accent above heading)')
    console.log('    → Physical Address Map Image (map screenshot for gift address)')
    console.log('    → QR Code Image             (bank transfer QR code)')
    console.log()
    console.log(`🌐  Page will be live at: /location`)
  } catch (err) {
    console.error('❌  Migration failed:', err.message)
    process.exit(1)
  }
}

main()
