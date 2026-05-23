// CTA Welcome Box — Figma node 24:2600
import { Container } from '@/app/components/Container'
import type { Cta } from '@/sanity.types'

type CtaBlockProps = { block: Cta; index: number }

export default function CtaBlock({ block }: CtaBlockProps) {
  const { body, ctaText, ctaHref } = block
  return (
    <section className="py-5 lg:py-20 text-center">
      <Container className="flex flex-col items-center gap-6 px-6">
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none" aria-hidden="true" className="text-ink/30">
          <circle cx="17" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="31" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <p className="max-w-2xl font-display text-[clamp(1.5rem,3vw,2.5rem)] not-italic leading-[1.15] text-ink">
          {body}
        </p>
        <a href={ctaHref} className="rounded-full bg-accent px-8 py-3 text-sm text-ink transition-opacity hover:opacity-80">
          {ctaText}
        </a>
      </Container>
    </section>
  )
}
