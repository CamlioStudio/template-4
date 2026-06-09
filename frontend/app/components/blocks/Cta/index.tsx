// CTA Welcome Box — Figma node 24:2600
import Image from 'next/image'
import { Container } from '@/app/components/Container'
import type { Cta } from '@/sanity.types'

type CtaBlockProps = { block: Cta; index: number }

export default function CtaBlock({ block }: CtaBlockProps) {
  const { body, ctaText, ctaHref, backgroundImage } = block
  const hasImage = !!backgroundImage
  return (
    <section className="relative py-5 lg:py-20 text-center overflow-hidden">
      {hasImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      )}
      <Container className="relative z-10 flex flex-col items-center gap-6 px-6">
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none" aria-hidden="true" className={hasImage ? 'text-white/40' : 'text-ink/30'}>
          <circle cx="17" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="31" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        {body && (
          <p className={`max-w-2xl font-display text-[clamp(1.5rem,3vw,2.5rem)] not-italic leading-[1.15] ${hasImage ? 'text-white' : 'text-ink'}`}>
            {body}
          </p>
        )}
        {ctaText && ctaHref && (
          <a href={ctaHref} className="rounded-full bg-accent px-8 py-3 text-sm text-ink transition-opacity hover:opacity-80">
            {ctaText}
          </a>
        )}
      </Container>
    </section>
  )
}
