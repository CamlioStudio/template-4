import type { ReactNode } from 'react'
import { sanityClient } from './client'

/**
 * Fetches data from Sanity with ISR revalidation.
 * Next.js will serve cached data and re-fetch in the background
 * at most once every 60 seconds — no rebuild required.
 */
export async function sanityFetch<T>(_query: string, _params: Record<string, unknown> = {}) {
  return sanityClient.fetch<T>(_query, _params, { next: { revalidate: 60 } })
}

export function SanityLive({ children }: { children: ReactNode }) {
  return children
}
