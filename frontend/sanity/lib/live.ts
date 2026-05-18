import type { ReactNode } from 'react'
import { sanityClient } from './client'

export async function sanityFetch<T>(_query: string, _params: Record<string, unknown> = {}) {
  return sanityClient.fetch<T>(_query, _params)
}

export function SanityLive({ children }: { children: ReactNode }) {
  return children
}
