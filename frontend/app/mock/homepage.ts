import type {
  HeroBlockProps,
  CtaBlockProps,
  StoryBlockProps,
  FeaturesBlockProps,
  TimelineBlockProps,
  GalleryBlockProps,
  RsvpBlockProps,
  QuoteBlockProps,
  DresscodeBlockProps,
  BlogBlockProps,
} from '@/app/components/blocks/types'

export const heroData: HeroBlockProps = {
  eyebrow: 'A Love Story, Beautifully Planned',
  headline: 'Wedding Planner',
  tagline: 'Every love story deserves a beginning, a celebration, and a memory that lasts forever',
  image: '/hero.png',
}

export const ctaData: CtaBlockProps = {
  body: "We're so glad you're here! This is where your journey begins — not just a wedding, but a celebration of everything you've built together.",
  ctaText: 'Start exploring',
  ctaHref: '/contact',
}

export const storyData: StoryBlockProps = {
  heading: 'Two Souls, One Journey',
  body: 'Every couple has a story — a series of moments that led them here. We take inspiration from your journey to design a wedding that feels personal, emotional, and truly yours. Because the most beautiful weddings are the ones that reflect real connections.',
  decorImage: '/flower-story.png',
  imageLeft: '/story-1.png',
  imageRightFull: '/story-2.png',
  imageRightSmall: '/story-3.png',
}

export const featuresData: FeaturesBlockProps = {
  heading: 'About the Experience',
  features: [
    {
      title: 'THOUGHTFUL',
      body: 'Every detail is carefully considered — from timeline to atmosphere — ensuring a seamless and stress-free experience.',
    },
    {
      title: 'CREATIVE DIRECTION',
      body: 'We transform your ideas into a cohesive concept, where visuals, emotions, and storytelling come together beautifully.',
    },
    {
      title: 'SEAMLESS EXECUTION',
      body: 'Behind the scenes, we manage everything — so you can stay fully present in every moment.',
    },
  ],
}

export const timelineData: TimelineBlockProps = {
  heading: "You're Invited!",
  description: 'A glimpse into the moments we create — intimate, emotional, and unforgettable.',
  promoText: '10% sale off',
  targetDate: '2026-06-10T17:00:00',
  ctaText: 'Contact Us',
  ctaHref: '/contact',
  videoUrl: '/wedding.mp4',
}

export const galleryData: GalleryBlockProps = {
  heading: 'Snapshots of Us',
  subtitle: 'A collection of memories — each one unique, each one meaningful.',
  viewAllText: 'View Our Gallery',
  viewAllHref: '/gallery',
  photos: [
    '/snapshot-1.png',
    '/snapshot-2.png',
    '/snapshot-3.png',
    '/snapshot-4.png',
    '/snapshot-5.png',
  ],
}

export const rsvpData: RsvpBlockProps = {
  heading: "Let's Begin Your Journey",
  subtitle: "Tell us about your wedding — we'll help you shape it into something unforgettable.",
}

export const quoteData: QuoteBlockProps = {
  quote: "We're honored to be part of your journey. Your trust means everything to us — and we're here to make your wedding as beautiful, meaningful, and effortless as it should be.",
  image: '/banner.png',
}

export const dresscodeData: DresscodeBlockProps = {
  headingSerif: 'Step Into the Palette',
  headingScript: 'of Our Day',
  body: 'From colors to textures, from florals to lighting — every element is chosen to reflect your unique style and atmosphere.',
  photos: ['/our-day-1.png', '/our-day-2.png', '/our-day-3.png', '/our-day-4.png', '/our-day-5.png', '/our-day-6.png'],
}

export const blogData: BlogBlockProps = {
  heading: 'Stay Inspired',
  subtitle: "Every celebration has a story — here's a closer look at the moments and ideas behind ours.",
  articles: [
    { label: 'Decoration',   image: '/inspired.png',   placeholderHeight: 340, placeholderColor: '#c9b89a' },
    { label: 'Photography',  image: '/inspired-2.png', placeholderHeight: 300, placeholderColor: '#b9a888' },
    { label: 'Video record', image: '/inspired-3.png', placeholderHeight: 480, placeholderColor: '#d4c5a9' },
  ],
}
