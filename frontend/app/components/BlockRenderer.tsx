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
import CoupleBlock from '@/app/components/blocks/Couple'
import JourneyBlock from '@/app/components/blocks/Journey'
import BridesmaidsGroomsmenBlock from '@/app/components/blocks/BridesmaidsGroomsmen'
import WishesBlock from '@/app/components/blocks/Wishes'
import LocationVenueBlock from '@/app/components/blocks/LocationVenue'
import GiftBlock from '@/app/components/blocks/Gift'
import BlogListingBlock from '@/app/components/blocks/BlogListing'

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
  couple: CoupleBlock,
  journey: JourneyBlock,
  bridesmaidsGroomsmen: BridesmaidsGroomsmenBlock,
  wishes: WishesBlock,
  locationVenue: LocationVenueBlock,
  gift: GiftBlock,
  blogListing: BlogListingBlock,
} as const

export function BlockRenderer({ block, index }: BlockRendererProps) {
  const Component = blocks[block._type as keyof typeof blocks]

  if (!Component) {
    return null
  }

  return <Component block={block as never} index={index} />
}
