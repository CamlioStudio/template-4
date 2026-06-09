// Hero banner — Figma node 53:3160
import Image from 'next/image'
import type { Hero } from '@/sanity.types'
import { HighlightedHeading } from '@/app/components/ui/HighlightedHeading'

type HeroBlockProps = { block: Hero; index: number }

export default function HeroBlock({ block }: HeroBlockProps) {
  const { eyebrow, headline, highlights, tagline, image } = block
  return (
    <section aria-label="Hero">
      <div className="relative mx-4 overflow-hidden sm:mx-6" style={{ minHeight: '609px' }}>
        {image && (
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="(max-width: 640px) calc(100vw - 2rem), calc(100vw - 3rem)"
            className="object-cover object-center"
          />
        )}
        <div aria-hidden="true" className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex min-h-152.25 flex-col items-center justify-center gap-4 px-6 py-20 text-center">
          {eyebrow && (
            <p className="font-display not-italic text-[clamp(1rem,2vw,2rem)] uppercase leading-[1.1] tracking-[0.2em] text-paper">
              {eyebrow}
            </p>
          )}
          {headline && (
            <HighlightedHeading
              as="h1"
              text={headline}
              highlights={highlights}
              highlightClassName="font-script text-[10rem] leading-[0.7]"
              className="font-display not-italic text-[clamp(3rem,10vw,6rem)] leading-[1.1] text-white"
            />
          )}
          {tagline && (
            <div className="mt-4 flex items-center gap-4">
              <span aria-hidden="true" className="block h-1.5 w-1.5 shrink-0 rounded-full bg-paper/60" />
              <p className="max-w-lg font-display not-italic text-[clamp(0.875rem,1.5vw,1.5rem)] leading-[1.2] text-paper">
                {tagline}
              </p>
              <span aria-hidden="true" className="block h-1.5 w-1.5 shrink-0 rounded-full bg-paper/60" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
