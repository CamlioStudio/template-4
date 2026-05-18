// Shared prop types for all homepage block components

export interface HeroBlockProps {
  eyebrow: string
  headline: string
  tagline: string
  image: string
}

export interface CtaBlockProps {
  body: string
  ctaText: string
  ctaHref: string
}

export interface StoryBlockProps {
  heading: string
  body: string
  decorImage: string
  imageLeft: string
  imageRightFull: string
  imageRightSmall: string
}

export interface Feature {
  title: string
  body: string
}

export interface FeaturesBlockProps {
  heading: string
  features: Feature[]
}

export interface TimelineBlockProps {
  heading: string
  description?: string
  promoText: string
  /** ISO date-time string, e.g. "2026-06-10T17:00:00" */
  targetDate: string
  ctaText: string
  ctaHref: string
  /** Optional MP4 URL. When omitted the placeholder is shown. */
  videoUrl?: string
  /** Optional poster image shown before playback starts. */
  videoThumbnail?: string
}

export interface GalleryBlockProps {
  heading: string
  subtitle: string
  viewAllText: string
  viewAllHref: string
  photos?: string[]
}

export interface RsvpBlockProps {
  heading: string
  subtitle: string
}

export interface QuoteBlockProps {
  quote: string
  image?: string
}

export interface DresscodeBlockProps {
  headingSerif: string
  headingScript: string
  body: string
  photos?: string[]
}

export interface Article {
  label: string
  image?: string
  /** Placeholder height in px — remove when using real images */
  placeholderHeight: number
  /** Placeholder gradient colour — remove when using real images */
  placeholderColor: string
}

export interface BlogBlockProps {
  heading: string
  subtitle: string
  articles: Article[]
}
