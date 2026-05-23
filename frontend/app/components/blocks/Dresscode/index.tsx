// Dresscode / Step Into the Palette — Figma node 24:2363
import Image from 'next/image'
import { Container } from '@/app/components/Container'
import type { Dresscode } from '@/sanity.types'
import { FlowerDecor } from '../../ui/FlowerDecor'

const PHOTO_COLORS = ['#c9b89a', '#b9a888', '#d4c5a9', '#a89878', '#c2b090', '#baa882'] as const

function renderHeadingWithScriptLetters(text: string) {
  // Highlight word-initial capital O and D with font-script
  const parts: React.ReactNode[] = []
  const regex = /\b([OD])(\w*)/g
  let lastIndex = 0
  let match
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
    parts.push(
      <span key={match.index} className="font-script text-display not-italic">
        {match[1]}
      </span>
    )
    parts.push(match[2])
  lastIndex = regex.lastIndex
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return <>{parts}</>
}

export default function DresscodeBlock({ block }: { block: Dresscode; index: number }) {
  const { headingSerif, headingScript, body, photos = [] } = block
  const fullHeading = `${headingSerif} ${headingScript}`
  return (
    <section className="bg-cream py-20">
      <Container className="px-6 lg:px-30">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[486px_1fr]">
          <div className="relative pt-24">
            <FlowerDecor src='/flower-story.png' />
            <h2 className="font-display text-section leading-[1.1] text-ink">
              {renderHeadingWithScriptLetters(fullHeading)}
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-muted">{body}</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {photos?.length > 0 && PHOTO_COLORS.map((color, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-2xl" style={photos?.length > 0 && !photos[i] ? { background: `linear-gradient(145deg,${color},#9a856a)` } : undefined}>
                {photos[i] && (
                  <Image src={photos[i] as string} alt={`Dresscode photo ${i + 1}`} fill className="object-cover" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
