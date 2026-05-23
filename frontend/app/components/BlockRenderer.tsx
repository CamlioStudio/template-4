'use client'

import type { PageBuilderSection } from '@/sanity/lib/types'
import ContactUsBlock from '@/app/components/blocks/ContactUs'
import HeroBlock from '@/app/components/blocks/Hero'
import CtaBlock from '@/app/components/blocks/Cta'
import StoryBlock from '@/app/components/blocks/Story'
import FeaturesBlock from '@/app/components/blocks/Features'
import TimelineBlock from '@/app/components/blocks/Timeline'
import GalleryBlock from '@/app/components/blocks/Gallery'
import RsvpBlock from '@/app/components/blocks/Rsvp'
import QuoteBlock from '@/app/components/blocks/Quote'
import DresscodeBlock from '@/app/components/blocks/Dresscode'
import BlogBlock from '@/app/components/blocks/Blog'

type BlockRendererProps = {
  block: PageBuilderSection
  index: number
}

const blocks = {
  contactUs: ContactUsBlock,
  hero: HeroBlock,
  cta: CtaBlock,
  story: StoryBlock,
  features: FeaturesBlock,
  timeline: TimelineBlock,
  gallery: GalleryBlock,
  rsvp: RsvpBlock,
  quote: QuoteBlock,
  dresscode: DresscodeBlock,
  blog: BlogBlock,
} as const

export function BlockRenderer({ block, index }: BlockRendererProps) {
  const Component = blocks[block._type as keyof typeof blocks]

  if (!Component) {
    return null
  }

  return <Component block={block as never} index={index} />
}
