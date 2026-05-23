import { getPageQuery, getHomePageQuery, siteHeaderQuery, siteFooterQuery, siteSettingsQuery } from './queries'
import { sanityFetch } from './live'
import type { Page } from '@/sanity.types'

export async function getPageBySlug(slug: string) {
  return sanityFetch<Page | null>(getPageQuery, { slug })
}

export async function getHomePage() {
  return sanityFetch<Page | null>(getHomePageQuery, {})
}

type NavItem = { label: string; href: string }

export type SiteHeaderData = {
  navLeft: NavItem[]
  navRight: NavItem[]
  rsvpLabel: string
  rsvpHref: string
} | null

export type SiteFooterData = {
  navItems: NavItem[]
  brandName: string
  brandYear: string
  facebookUrl: string | null
  instagramUrl: string | null
  xUrl: string | null
  copyrightText: string
} | null

export type SiteSettingsData = {
  siteTitle: string
  siteDescription: string
  coupleName: string
} | null

export async function getSiteHeader() {
  return sanityFetch<SiteHeaderData>(siteHeaderQuery, {})
}

export async function getSiteFooter() {
  return sanityFetch<SiteFooterData>(siteFooterQuery, {})
}

export async function getSiteSettings() {
  return sanityFetch<SiteSettingsData>(siteSettingsQuery, {})
}
