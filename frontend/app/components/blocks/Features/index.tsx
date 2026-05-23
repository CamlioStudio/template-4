// About the Experience + 3-column features — Figma nodes 53:3131 + 24:2544
import { Container } from '@/app/components/Container'
import type { Features } from '@/sanity.types'
import { FlowerDecor } from '../../ui/FlowerDecor'

type FeaturesBlockProps = { block: Features; index: number }

export default function FeaturesBlock({ block }: FeaturesBlockProps) {
  const { heading, features = [] } = block
  return (
    <section className="py-20">
      <Container className="relative flex flex-col items-center px-6 pt-24 text-center">
        <FlowerDecor />
        <h2 className="font-display text-section leading-[1.1] text-ink">{heading}</h2>
      </Container>

      <Container className="mt-16 px-6 lg:px-30">
        <div className="grid grid-cols-1 gap-8 divide-ink/15 md:grid-cols-3 md:divide-x">
          {features.map(({ title, body }) => (
            <div key={title} className="flex flex-col gap-3 px-6 first:pl-0 last:pr-0">
              <h3 className="text-[32px] font-display font-medium uppercase tracking-label text-ink">{title}</h3>
              <p className="text-sm leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
