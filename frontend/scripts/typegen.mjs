import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const outputPath = resolve(process.cwd(), 'sanity.types.ts')

const content = `export type ContactUs = {
  _type: 'contactUs'
  cmsTitle?: string
  eyebrow?: string
  title?: string
  subtitle?: string
  ceremonyTitle?: string
  ceremonyDate?: string
  ceremonyTime?: string
  ceremonyLocation?: string
  receptionTitle?: string
  receptionDate?: string
  receptionTime?: string
  receptionLocation?: string
}

export type Hero = {
  _type: 'hero'
  cmsTitle?: string
  eyebrow?: string
  headline?: string
  highlights?: HighlightItem[] | null
  tagline?: string
  /** Projected URL string from GROQ: image.asset->url */
  image?: string | null
}

export type Cta = {
  _type: 'cta'
  cmsTitle?: string
  body?: string
  ctaText?: string
  ctaHref?: string
  /** Projected URL string from GROQ: backgroundImage.asset->url */
  backgroundImage?: string | null
}

export type Story = {
  _type: 'story'
  cmsTitle?: string
  heading?: string
  highlights?: HighlightItem[] | null
  body?: string
  /** Projected URL string from GROQ: decorImage.asset->url */
  decorImage?: string | null
  /** Projected URL string from GROQ: imageLeft.asset->url */
  imageLeft?: string | null
  /** Projected URL string from GROQ: imageRightFull.asset->url */
  imageRightFull?: string | null
  /** Projected URL string from GROQ: imageRightSmall.asset->url */
  imageRightSmall?: string | null
}

export type FeatureItem = {
  title?: string
  body?: string
}

export type Features = {
  _type: 'features'
  cmsTitle?: string
  heading?: string
  highlights?: HighlightItem[] | null
  features?: FeatureItem[]
}

export type Timeline = {
  _type: 'timeline'
  cmsTitle?: string
  heading?: string
  highlights?: HighlightItem[] | null
  description?: string
  promoText?: string
  /** ISO date-time string */
  targetDate?: string
  ctaText?: string
  ctaHref?: string
  /** MP4 path or YouTube URL */
  videoUrl?: string
  /** Projected URL string from GROQ: videoThumbnail.asset->url */
  videoThumbnail?: string | null
}

export type Gallery = {
  _type: 'gallery'
  cmsTitle?: string
  heading?: string
  subtitle?: string
  viewAllText?: string
  viewAllHref?: string
  /** Projected URL strings from GROQ: photos[].asset->url */
  photos?: (string | null)[]
}

export type Rsvp = {
  _type: 'rsvp'
  cmsTitle?: string
  heading?: string
  subtitle?: string
}

export type Quote = {
  _type: 'quote'
  cmsTitle?: string
  quote?: string
  /** Projected URL string from GROQ: image.asset->url */
  image?: string | null
}

export type Dresscode = {
  _type: 'dresscode'
  cmsTitle?: string
  headingSerif?: string
  headingScript?: string
  body?: string
  /** Projected URL strings from GROQ: photos[].asset->url */
  photos?: (string | null)[]
}

export type BlogArticle = {
  label?: string
  /** Projected URL string from GROQ: image.asset->url */
  image?: string | null
}

export type Blog = {
  _type: 'blog'
  cmsTitle?: string
  heading?: string
  subtitle?: string
  articles?: BlogArticle[]
}

export type SocialLink = {
  platform?: string
  href?: string
}

export type CouplePerson = {
  name?: string
  role?: string
  bio?: string
  /** Projected URL string from GROQ: photo.asset->url */
  photo?: string | null
  socials?: SocialLink[]
}

export type HighlightItem = {
  char?: string | null
  charIndex?: number | null
}

export type Couple = {
  _type: 'couple'
  cmsTitle?: string
  heading?: string
  highlights?: HighlightItem[] | null
  /** Projected URL string from GROQ: decorImage.asset->url */
  decorImage?: string | null
  people?: CouplePerson[]
}

export type JourneyItem = {
  year?: string
  heading?: string
  body?: string
  /** Projected URL string from GROQ: image.asset->url */
  image?: string | null
}

export type Journey = {
  _type: 'journey'
  cmsTitle?: string
  items?: JourneyItem[]
}

export type BridesmaidsGroomsmenMember = {
  name?: string
  role?: string
  /** Projected URL string from GROQ: photo.asset->url */
  photo?: string | null
}

export type BridesmaidsGroomsmen = {
  _type: 'bridesmaidsGroomsmen'
  cmsTitle?: string
  heading?: string
  highlights?: HighlightItem[] | null
  description?: string
  members?: BridesmaidsGroomsmenMember[]
}

export type WishesQuote = {
  quote?: string
  author?: string
}

export type Wishes = {
  _type: 'wishes'
  cmsTitle?: string
  heading?: string
  highlights?: HighlightItem[] | null
  quotes?: WishesQuote[]
}

export type PageBuilderSection =
  | ContactUs
  | Hero
  | Cta
  | Story
  | Features
  | Timeline
  | Gallery
  | Rsvp
  | Quote
  | Dresscode
  | Blog
  | Couple
  | Journey
  | BridesmaidsGroomsmen
  | Wishes

export type Page = {
  _type: 'page'
  title?: string
  slug?: {
    current?: string
  }
  pageBuilder?: PageBuilderSection[]
}
`

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, content)

