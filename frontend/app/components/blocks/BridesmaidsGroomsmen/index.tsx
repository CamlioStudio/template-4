'use client'

// BridesmaidsGroomsmen — Figma node 24:2143
import { useState } from 'react'
import Image from 'next/image'
import { HighlightedHeading } from '@/app/components/ui/HighlightedHeading'
import { FlowerDecor } from '@/app/components/ui/FlowerDecor'
import type { BridesmaidsGroomsmen } from '@/sanity.types'

type Props = { block: BridesmaidsGroomsmen; index: number }

type Filter = 'All' | 'Bridesmaid' | 'Groomsmen'
const FILTERS: Filter[] = ['All', 'Bridesmaid', 'Groomsmen']

export default function BridesmaidsGroomsmenBlock({ block }: Props) {
  const { heading, highlights, description, members } = block
  const [active, setActive] = useState<Filter>('All')

  const filtered = members?.filter(
    (m) => active === 'All' || m.role === active
  ) ?? []

  return (
    <section className="px-4 lg:px-30 py-16 lg:py-24">
      <div>
        {/* Headline */}
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center relative">
            <FlowerDecor className='lg:!-translate-y-20' />
            {heading && (
              <HighlightedHeading
                as="h2"
                text={heading}
                highlights={highlights}
                className="font-display not-italic text-section leading-[1.1] text-ink"
              />
            )}
          </div>
          {description && (
            <p className="max-w-lg font-body text-body leading-normal text-muted">
              {description}
            </p>
          )}
        </div>

        {/* Filter tabs */}
        <div className="mt-11 flex items-center justify-center gap-3 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={[
                'rounded-full px-8 py-3 font-body text-body transition-colors',
                active === f
                  ? 'bg-accent text-ink'
                  : 'border border-muted text-ink hover:bg-accent/20',
              ].join(' ')}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Profile grid — 3 columns, staggered offsets */}
        <div className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((member, i) => (
            <div
              key={`${member.name}-${i}`}
              className={[
                'flex flex-col gap-4',
                // Stagger every first/third column down slightly on large screens
                i % 3 !== 1 ? 'lg:mt-9' : '',
              ].join(' ')}
            >
              {/* Photo */}
              <div className="relative aspect-384/459 w-full overflow-hidden bg-paper">
                {member.photo && (
                  <Image
                    src={member.photo}
                    alt={member.name ?? ''}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                    className="object-cover"
                  />
                )}
              </div>
              {/* Name + role */}
              <div className="flex flex-col gap-1 font-display not-italic">
                {member.name && (
                  <p className="text-[2.5rem] leading-[1.1] text-ink">{member.name}</p>
                )}
                {member.role && (
                  <p className="text-sub leading-[1.1] text-muted">{member.role}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
