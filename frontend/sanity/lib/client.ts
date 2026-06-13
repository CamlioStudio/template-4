import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './api'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // ISR handles caching via next.revalidate — CDN would serve stale data
})
