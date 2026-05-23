export type ContactUs = {
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
}

export type Story = {
  _type: 'story'
  cmsTitle?: string
  heading?: string
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
  features?: FeatureItem[]
}

export type Timeline = {
  _type: 'timeline'
  cmsTitle?: string
  heading?: string
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

export type Page = {
  _type: 'page'
  title?: string
  slug?: {
    current?: string
  }
  pageBuilder?: PageBuilderSection[]
}
