// Blog Listing — Figma node 24:1814
import Image from 'next/image'
import { Container } from '@/app/components/Container'
import { HighlightedHeading } from '@/app/components/ui/HighlightedHeading'
import { cn } from '@/sanity/lib/utils'
import type { BlogListing } from '@/sanity.types'

const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(145deg,#5c4a38,#3d2b1f)',
  'linear-gradient(145deg,#4a3828,#2e1f14)',
  'linear-gradient(145deg,#524030,#3a2820)',
  'linear-gradient(145deg,#483825,#2a1a0e)',
  'linear-gradient(145deg,#604e3a,#3d2b1f)',
  'linear-gradient(145deg,#3a2c1e,#1a0f0a)',
]

export default function BlogListingBlock({ block }: { block: BlogListing; index: number }) {
  const { heading, highlights, articles = [] } = block

  return (
    <section className={cn('bg-cream', 'pb-24')}>
      {/* Hero strip */}
      <div className="hero-checker relative">
        <Container className={cn('flex', 'min-h-80', 'items-center', 'justify-center', 'py-16')}>
          <div className="text-center">
            <HighlightedHeading
              as="h1"
              text={heading ?? 'Blog'}
              highlights={highlights}
              className={cn('font-display', 'text-section', 'leading-[1.1]', 'text-ink')}
              highlightClassName="font-script text-[6rem] leading-[0.7]"
            />
          </div>
        </Container>
      </div>

      {/* Articles grid */}
      <Container className={cn('px-6', 'lg:px-12', '-mt-12')}>
        {articles.length === 0 ? (
          <p className={cn('py-24', 'text-center', 'text-muted')}>No articles yet.</p>
        ) : (
          <div className={cn('grid', 'grid-cols-1', 'gap-8', 'md:grid-cols-2', 'lg:grid-cols-3')}>
            {articles.map(({ label, category, href, image }, i) => {
              const CardWrapper = href ? 'a' : 'article'
              const cardProps = href ? { href, className: cn('group', 'flex', 'flex-col', 'gap-4', 'cursor-pointer') } : { className: cn('group', 'flex', 'flex-col', 'gap-4') }

              return (
                <CardWrapper key={label ?? i} {...(cardProps as React.ComponentPropsWithoutRef<typeof CardWrapper>)}>
                  {/* Cover image */}
                  <div
                    className={cn('relative', 'w-full', 'overflow-hidden', 'rounded-2xl', 'bg-paper')}
                    style={{
                      height: 360,
                      ...(!image && { background: PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length] }),
                    }}
                  >
                    {image && (
                      <Image
                        src={image}
                        alt={label ?? ''}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={cn('object-cover', 'transition-transform', 'duration-500', 'group-hover:scale-105')}
                      />
                    )}
                    {/* Category badge */}
                    {category && (
                      <span className={cn(
                        'absolute', 'bottom-4', 'left-4',
                        'rounded-full', 'bg-white/80', 'backdrop-blur-sm',
                        'px-4', 'py-1.5',
                        'text-xs', 'uppercase', 'tracking-[0.15em]', 'text-ink',
                        'font-body'
                      )}>
                        {category}
                      </span>
                    )}
                  </div>

                  {/* Article title */}
                  <p className={cn(
                    'font-display', 'not-italic',
                    'text-[clamp(1.25rem,2.5vw,1.75rem)]', 'leading-[1.2]',
                    'text-ink',
                    'transition-colors', 'group-hover:text-muted'
                  )}>
                    {label}
                  </p>
                </CardWrapper>
              )
            })}
          </div>
        )}
      </Container>
    </section>
  )
}
