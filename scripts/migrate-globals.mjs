#!/usr/bin/env node
/**
 * migrate-globals.mjs
 *
 * Seeds the three singleton documents (siteHeader, siteFooter, siteSettings)
 * with the hardcoded data previously in Header.tsx, Footer.tsx, and layout.tsx.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=<your-token> node scripts/migrate-globals.mjs
 *
 * Get a write token at:
 *   https://www.sanity.io/manage → project 54xrmg4i → API → Tokens → Add API token
 *   Choose "Editor" permission level.
 *
 * The script is idempotent — running it again replaces the existing documents.
 */

import { createClient } from '@sanity/client'

const PROJECT_ID  = '54xrmg4i'
const DATASET     = 'production'
const API_VERSION = '2025-09-25'

const token = process.env.SANITY_API_WRITE_TOKEN || 'skohqwOffOJk1XSdTduO9opNfX2Rl9tnoanlTE9HeDKP3C12nL6DvPNCwmBq0y2AeGEZgenbogdxLXiSvVCkjMcw92uRAR8iX7MkiQ7HOOXgTLuLQpMhANUjlTmPK17B0gSO7siCL9UieIXK2UzaIxCSTGuDbbYpwtywqJZQz4BMgsdWhxMi'

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

// ── siteHeader ───────────────────────────────────────────────────────────────
// Source: frontend/app/components/global/Header.tsx  NAV_LEFT / NAV_RIGHT
const siteHeader = {
  _id: 'siteHeader',
  _type: 'siteHeader',
  navLeft: [
    { _key: 'nav-home',      label: 'Home',      href: '/'          },
    { _key: 'nav-our-story', label: 'Our Story', href: '/our-story' },
    { _key: 'nav-location',  label: 'Location',  href: '/location'  },
  ],
  navRight: [
    { _key: 'nav-gallery', label: 'Gallery', href: '/gallery' },
    { _key: 'nav-blog',    label: 'Blog',    href: '/blog'    },
    { _key: 'nav-pages',   label: 'Pages',   href: '/pages'   },
  ],
  rsvpLabel: 'RSVP',
  rsvpHref: '/rsvp',
}

// ── siteFooter ───────────────────────────────────────────────────────────────
// Source: frontend/app/components/global/Footer.tsx  NAV_ITEMS + brand row + social
const siteFooter = {
  _id: 'siteFooter',
  _type: 'siteFooter',
  navItems: [
    { _key: 'fnav-home',      label: 'Home',      href: '/'          },
    { _key: 'fnav-our-story', label: 'Our Story', href: '/our-story' },
    { _key: 'fnav-gallery',   label: 'Gallery',   href: '/gallery'   },
    { _key: 'fnav-rsvp',      label: 'RSVP',      href: '/rsvp'      },
  ],
  brandName: 'Camlio',
  brandYear: '2026',
  facebookUrl:  null,
  instagramUrl: null,
  xUrl:         null,
  copyrightText: 'Copyright © 2025 Rometheme. All Rights Reserved.',
}

// ── siteSettings ─────────────────────────────────────────────────────────────
// Source: frontend/app/layout.tsx  export const metadata
const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteTitle: 'Laila & Blaize',
  siteDescription: 'Wedding website contact page scaffold built with Camlio.',
  coupleName: 'Laila & Blaize',
}

// ── Upsert all three singletons ──────────────────────────────────────────────
const documents = [siteHeader, siteFooter, siteSettings]

async function migrate() {
  for (const doc of documents) {
    const result = await client.createOrReplace(doc)
    console.log(`✅  ${result._type} (${result._id}) → created/updated`)
  }
  console.log('\nDone. Open Sanity Studio to review and update the content.')
  console.log('Note: Footer social URLs were left empty — fill them in Studio.')
}

migrate().catch((err) => {
  console.error('❌  Migration failed:', err.message)
  process.exit(1)
})
