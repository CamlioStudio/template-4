// HighlightedHeading — renders a heading with one or more characters in Kapakana
// decorative font at 96px (text-display).
//
// Usage:
//   <HighlightedHeading
//     as="h2"
//     text="Meet the Couple"
//     highlights={[{ char: 'C' }]}
//     className="font-display text-[4rem] leading-[1.1] text-ink"
//   />
//   // Multiple: highlights={[{ char: 'T' }, { char: 'P', charIndex: 1 }]}

import type { ElementType, ReactNode } from 'react'

type HighlightItem = {
  char?: string | null
  charIndex?: number | null
}

type Props = {
  text: string
  highlights?: HighlightItem[] | null
  className?: string
  highlightClassName?: string
  as?: ElementType
}

export function HighlightedHeading({
  text,
  highlights,
  className,
  highlightClassName,
  as: Tag = 'h2',
}: Props) {
  if (!highlights?.length) {
    return <Tag className={className}>{text}</Tag>
  }

  // Resolve each highlight { char, charIndex } → absolute position in text
  const resolved: number[] = []

  for (const h of highlights) {
    if (!h.char) continue
    const charLower = h.char.toLowerCase()
    const target = h.charIndex ?? 0
    let occurrence = 0
    for (let i = 0; i < text.length; i++) {
      if (text[i].toLowerCase() === charLower) {
        if (occurrence === target) {
          resolved.push(i)
          break
        }
        occurrence++
      }
    }
  }

  if (!resolved.length) return <Tag className={className}>{text}</Tag>

  // Sort positions ascending and deduplicate
  const positions = [...new Set(resolved)].sort((a, b) => a - b)

  // Build parts: plain strings and highlighted spans
  const parts: ReactNode[] = []
  let lastIndex = 0

  for (const pos of positions) {
    if (pos > lastIndex) parts.push(text.slice(lastIndex, pos))
    parts.push(
      <span key={pos} className={highlightClassName ?? 'font-script text-display leading-[0.7]'}>
        {text[pos]}
      </span>
    )
    lastIndex = pos + 1
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex))

  return <Tag className={className}>{parts}</Tag>
}
