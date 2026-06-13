// LocationVenue — Figma node 24:2044 / 24:2059
// Used for both Ceremony and Reception sections
import Image from 'next/image'
import { Container } from '@/app/components/Container'
import { HighlightedHeading } from '@/app/components/ui/HighlightedHeading'
import type { LocationVenue } from '@/sanity.types'

// Pin icon SVG
function PinIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 2.625C9.928 2.625 6.625 5.928 6.625 10c0 5.25 7.375 15.375 7.375 15.375S21.375 15.25 21.375 10c0-4.072-3.303-7.375-7.375-7.375Zm0 10.25a2.875 2.875 0 1 1 0-5.75 2.875 2.875 0 0 1 0 5.75Z"
        fill="currentColor"
      />
    </svg>
  )
}

// Clock icon SVG
function ClockIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="14" cy="14" r="10.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M14 8.75V14l3.5 3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type LocationVenueBlockProps = { block: LocationVenue; index: number }

export default function LocationVenueBlock({ block }: LocationVenueBlockProps) {
  const { title, highlights, venueName, time, mapImage, images, imagesPosition } = block
  const isImagesLeft = imagesPosition === 'left'

  const textContent = (
    <div className="flex flex-col gap-10 lg:gap-11">
      {/* Title */}
      {title && (
        <div className="flex flex-col gap-8">
          <HighlightedHeading
            as="h2"
            text={title}
            highlights={highlights}
            className="font-display not-italic text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] text-ink"
            highlightClassName="font-script text-[6rem] leading-[0.7]"
          />

          {/* Venue details */}
          <div className="flex flex-col gap-3">
            {venueName && (
              <div className="flex items-center gap-5 text-ink">
                <PinIcon />
                <span className="font-display not-italic text-[clamp(1.25rem,2.5vw,2rem)] leading-[1.1]">
                  {venueName}
                </span>
              </div>
            )}
            {time && (
              <div className="flex items-center gap-5 text-ink">
                <ClockIcon />
                <span className="font-display not-italic text-[clamp(1.25rem,2.5vw,2rem)] leading-[1.1]">
                  {time}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Map */}
      {mapImage && (
        <div className="relative h-60 w-full overflow-hidden lg:h-82">
          <Image
            src={mapImage}
            alt="Venue map"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover"
          />
        </div>
      )}
      {!mapImage && (
        <div className="map-panel h-60 w-full lg:h-82" aria-hidden="true" />
      )}
    </div>
  )

  const imageCollage = images && images.length > 0 && (
    <div className="relative hidden lg:block" aria-hidden="true">
      {/* Primary large image — top, offset towards center */}
      {images[0] && (
        <div className={`absolute top-0 h-[475px] w-96 overflow-hidden ${isImagesLeft ? 'left-0' : 'right-0'}`}>
          <Image
            src={images[0]}
            alt=""
            fill
            sizes="384px"
            className="object-cover"
          />
        </div>
      )}
      {/* Secondary small image — bottom opposite corner */}
      {images[1] && (
        <div className={`absolute bottom-0 h-55 w-45 overflow-hidden ${isImagesLeft ? 'right-0' : 'left-0'}`}>
          <Image
            src={images[1]}
            alt=""
            fill
            sizes="180px"
            className="object-cover"
          />
        </div>
      )}
      {/* Third image if present */}
      {images[2] && (
        <div className={`absolute top-12 h-42 w-32 overflow-hidden ${isImagesLeft ? 'right-0' : 'left-0'}`}>
          <Image
            src={images[2]}
            alt=""
            fill
            sizes="128px"
            className="object-cover"
          />
        </div>
      )}
      {/* Invisible spacer to reserve space */}
      <div className="h-[550px] w-[486px]" />
    </div>
  )

  return (
    <section className="py-16 lg:py-20 bg-cream">
      <Container>
        <div
          className={`flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16 xl:gap-32 ${
            isImagesLeft ? 'lg:flex-row-reverse' : ''
          }`}
        >
          <div className="flex-1">{textContent}</div>
          {imageCollage && <div className="shrink-0">{imageCollage}</div>}
        </div>
      </Container>
    </section>
  )
}
