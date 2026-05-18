'use client'

// Homepage — Camlio Wedding Planner Agency
// Matches Figma: https://www.figma.com/design/apkoUE0qf0DnlMktY1SnFi

import HeroBlock from "@/app/components/blocks/Hero";
import CtaBlock from "@/app/components/blocks/Cta";
import StoryBlock from "@/app/components/blocks/Story";
import FeaturesBlock from "@/app/components/blocks/Features";
import TimelineBlock from "@/app/components/blocks/Timeline";
import GalleryBlock from "@/app/components/blocks/Gallery";
import RsvpBlock from "@/app/components/blocks/Rsvp";
import QuoteBlock from "@/app/components/blocks/Quote";
import DresscodeBlock from "@/app/components/blocks/Dresscode";
import BlogBlock from "@/app/components/blocks/Blog";

import {
  heroData,
  ctaData,
  storyData,
  featuresData,
  timelineData,
  galleryData,
  rsvpData,
  quoteData,
  dresscodeData,
  blogData,
} from "@/app/mock/homepage";

export default function HomePage() {
  return (
    <main>
      <HeroBlock {...heroData} />
      <CtaBlock {...ctaData} />
      <StoryBlock {...storyData} />
      <FeaturesBlock {...featuresData} />
      <TimelineBlock {...timelineData} />
      <GalleryBlock {...galleryData} />
      <RsvpBlock {...rsvpData} />
      <QuoteBlock {...quoteData} />
      <DresscodeBlock {...dresscodeData} />
      <BlogBlock {...blogData} />
    </main>
  );
}
