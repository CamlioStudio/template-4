'use client'

// Wishes — Figma node 24:2120
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Container } from '@/app/components/Container'
import { HighlightedHeading } from '@/app/components/ui/HighlightedHeading'
import { FlowerDecor } from '@/app/components/ui/FlowerDecor'
import type { Wishes } from '@/sanity.types'

type Props = { block: Wishes; index: number }

export default function WishesBlock({ block }: Props) {
  const { heading, highlights, quotes } = block

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', slidesToScroll: 2 })
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  )

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  return (
    <section className="py-16 lg:py-24">
      <Container>
        {/* Headline */}
        <div className="flex flex-col items-center text-center relative">
          <FlowerDecor className="lg:-translate-y-20" />
          {heading && (
            <HighlightedHeading
              as="h2"
              text={heading}
              highlights={highlights}
              className="font-display not-italic text-section leading-[1.1] text-ink"
            />
          )}
        </div>

        {/* Carousel */}
        {!!quotes?.length && (
          <div className="mt-14">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex gap-5">
                {quotes.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-center gap-10 px-14 py-9 bg-paper hover:bg-white transition-colors duration-300 flex-[0_0_100%] sm:flex-[0_0_calc(50%-10px)]"
                  >
                    {item.quote && (
                      <p className="font-display italic text-[2rem] leading-[1.1] text-muted">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    )}
                    {item.author && (
                      <p className="font-display not-italic text-[2rem] leading-[1.1] text-ink">
                        — {item.author}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Dot pagination */}
            {scrollSnaps.length > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {scrollSnaps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={[
                      'rounded-full transition-all duration-300',
                      i === selectedIndex
                        ? 'w-6 h-3 bg-ink'
                        : 'w-3 h-3 bg-ink/30 hover:bg-ink/60',
                    ].join(' ')}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  )
}
