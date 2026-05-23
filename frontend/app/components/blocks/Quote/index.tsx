// Quote / Full-bleed photo — Figma node 24:2402
import Image from 'next/image'
import type { Quote } from '@/sanity.types'

type QuoteBlockProps = { block: Quote; index: number }

export default function QuoteBlock({ block }: QuoteBlockProps) {
  const { quote, image } = block
  return (
    <section className="bg-cream py-4">
      <div className="mx-4 sm:mx-6">
        <div
          className="relative flex min-h-158.25 items-center justify-center overflow-hidden rounded-2xl"
          style={!image ? { background: 'linear-gradient(145deg,#2a1f14,#4a3222)' } : undefined}
        >
          {image && (
            <Image
              src={image}
              alt=""
              aria-hidden="true"
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 rounded-2xl bg-black/50" />
          <blockquote className="relative z-10 mx-auto max-w-6xl p-10 lg:p-8 text-center">
            <p className="font-display text-section not-italic leading-[1.1] text-paper">
              &ldquo;{quote}&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
