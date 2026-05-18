// Shared decorative accent used above section headings throughout the homepage.
// Default: renders flower.png with object-contain (transparent PNG, no clip).
// With `src`: renders a photo crop with object-cover + rounded-2xl (e.g. Story section).
import Image from 'next/image'

interface FlowerDecorProps {
  /** Override image path. When provided, renders a clipped photo crop instead of the default flower. */
  src?: string
  /** Extra Tailwind classes — use `mx-auto` when the parent is not a flex/grid centering context. */
  className?: string
}

export function FlowerDecor({ src, className }: FlowerDecorProps) {
  // Photo crop variant (e.g. Story section decorImage)
  if (src) {
    return (
      <div
        aria-hidden="true"
        className={['absolute top-0 h-20 w-34 translate-y-8 overflow-hidden rounded-2xl', className].filter(Boolean).join(' ')}
      >
        <Image src={src} alt="" fill sizes="136px" className="object-cover" />
      </div>
    )
  }

  // Default: botanical flower decoration (transparent PNG)
  return (
    <div
      aria-hidden="true"
      className={['absolute top-0 left-1/2 h-20 w-20 -translate-x-1/2 translate-y-8', className].filter(Boolean).join(' ')}
    >
      <Image src="/flower.png" alt="" fill className="object-contain" />
    </div>
  )
}

