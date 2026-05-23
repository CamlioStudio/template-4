import { getPageQuery, getHomePageQuery } from './queries'
import { sanityFetch } from './live'
import type { Page } from '@/sanity.types'

export async function getPageBySlug(slug: string) {
  return sanityFetch<Page | null>(getPageQuery, { slug })
}

export async function getHomePage() {
  return sanityFetch<Page | null>(getHomePageQuery, {})
}
