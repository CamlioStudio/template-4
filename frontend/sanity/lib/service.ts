import { getPageQuery } from './queries'
import { sanityFetch } from './live'

export async function getPageBySlug(slug: string) {
  return sanityFetch(getPageQuery, { slug })
}
