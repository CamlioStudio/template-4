// Articles / Blog — Figma node 24:2335
import Image from 'next/image'
import { Container } from '@/app/components/Container'
import { FlowerDecor } from '@/app/components/ui/FlowerDecor'
import type { Blog } from '@/sanity.types'

export default function BlogBlock({ block }: { block: Blog; index: number }) {
  const { heading, subtitle, articles = [] } = block
  return (
    <section className="bg-cream pb-20">
      <Container className="px-6 lg:px-30">
        <div className="relative flex flex-col items-center pt-24 text-center">
          <FlowerDecor className="mx-auto" />
          <h2 className="font-display text-section leading-[1.1] text-ink">{heading}</h2>
          <p className="mt-3 max-w-lg text-sm text-muted">{subtitle}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {articles.map(({ label, image }, i) => (
            <article key={label ?? i} className="flex flex-col gap-4">
              <div
                className="relative w-full overflow-hidden rounded-2xl"
                style={{ height: 360, ...(!image && { background: 'linear-gradient(145deg,#c9b89a,#9a856a)' }) }}
              >
                {image && <Image src={image} alt={label ?? ''} fill className="object-cover transition-all duration-300 hover:scale-125 hover:brightness-50" />}
              </div>
              <p className="font-display text-[32px] text-ink">{label}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
