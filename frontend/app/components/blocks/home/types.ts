export type HeroSection = {
  _type: 'hero'
  dateLabel: string
  locationLabel: string
  titlePrimary: string
  titleSecondary: string
  description: string
}

export type StorySection = {
  _type: 'story'
  eyebrow: string
  title: string
  paragraphs: string[]
  notesTitle: string
  notes: string[]
}

export type TimelineItem = {
  time: string
  title: string
  description: string
}

export type TimelineSection = {
  _type: 'timeline'
  eyebrow: string
  title: string
  ctaLabel: string
  items: TimelineItem[]
}

export type GallerySection = {
  _type: 'gallery'
  title: string
  subtitle: string
}

export type RsvpSection = {
  _type: 'rsvp'
  eyebrow: string
  title: string
  description: string
  primaryCta: string
  secondaryCta: string
}

export type PageSection =
  | HeroSection
  | StorySection
  | TimelineSection
  | GallerySection
  | RsvpSection
