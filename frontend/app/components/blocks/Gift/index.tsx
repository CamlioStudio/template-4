// Gift — Figma node 24:2025
// "A Gift from the Heart" section with physical address and QR code
import Image from 'next/image'
import { Container } from '@/app/components/Container'
import { FlowerDecor } from '@/app/components/ui/FlowerDecor'
import { HighlightedHeading } from '@/app/components/ui/HighlightedHeading'
import type { Gift } from '@/sanity.types'
import { cn } from "../../../../sanity/lib/utils";

function PinIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1.875C7.07 1.875 4.688 4.257 4.688 7.188c0 3.75 5.312 11.25 5.312 11.25s5.313-7.5 5.313-11.25C15.313 4.257 12.93 1.875 10 1.875Zm0 7.5a2.188 2.188 0 1 1 0-4.375 2.188 2.188 0 0 1 0 4.375Z"
        fill="currentColor"
      />
    </svg>
  )
}

type GiftBlockProps = { block: Gift; index: number }

export default function GiftBlock({ block }: GiftBlockProps) {
  const {
    heading,
    highlights,
    description,
    decorImage,
    physicalGiftTitle,
    physicalGiftDescription,
    physicalAddress,
    physicalMapLocation,
    bankTransferTitle,
    bankTransferDescription,
    qrCodeImage,
  } = block

  return (
    <section className={cn('py-16', 'lg:py-24', 'bg-cream')}>
      <Container>
        {/* Card */}
        <div className={cn('mx-auto', 'max-w-3xl', 'bg-white', 'px-10', 'py-16', 'panel-shadow')}>
          {/* Heading section */}
          <div className={cn('flex', 'flex-col', 'items-center', 'gap-8', 'text-center')}>
            <div className={cn('relative', 'flex', 'flex-col', 'items-center')}>
              <FlowerDecor
                src={decorImage ?? undefined}
                className={cn('mx-auto', 'mb-4', 'lg:-translate-y-10')}
              />
              {heading && (
                <HighlightedHeading
                  as="h2"
                  text={heading}
                  highlights={highlights}
                  className={cn('font-display', 'not-italic', 'text-[clamp(2.5rem,5vw,4rem)]', 'leading-[1.1]', 'text-ink')}
                  highlightClassName="font-script text-[6rem] leading-[0.7]"
                />
              )}
            </div>
            {description && (
              <p className={cn('max-w-md', 'font-body', 'text-body', 'leading-relaxed', 'text-muted')}>{description}</p>
            )}
          </div>

          {/* Divider */}
          <div className={cn('my-10', 'h-px', 'w-full', 'bg-paper')} />

          {/* Two sub-sections */}
          <div className={cn('flex', 'flex-col', 'gap-12')}>
            {/* Physical Gift */}
            {(physicalGiftTitle || physicalAddress || physicalMapLocation) && (
              <div className={cn('flex', 'flex-col', 'items-center', 'gap-5', 'text-center')}>
                {physicalGiftTitle && (
                  <h3 className={cn('font-display', 'not-italic', 'text-[clamp(1.5rem,3vw,2.5rem)]', 'leading-[1.1]', 'text-ink')}>
                    {physicalGiftTitle}
                  </h3>
                )}
                {physicalGiftDescription && (
                  <p className={cn('max-w-xs', 'font-body', 'text-body', 'leading-relaxed', 'text-muted')}>
                    {physicalGiftDescription}
                  </p>
                )}
                {physicalAddress && (
                  <div className={cn('flex', 'items-center', 'gap-3', 'text-ink')}>
                    <PinIcon />
                    <span className={cn('font-display', 'not-italic', 'text-sub', 'leading-[1.1]')}>
                      {physicalAddress}
                    </span>
                  </div>
                )}
                {physicalMapLocation ? (
                  <div
                    className={cn('mt-2', 'h-48', 'w-full', 'max-w-sm', 'overflow-hidden', 'rounded-xl', '[&_iframe]:h-full', '[&_iframe]:w-full', '[&_iframe]:border-0')}
                    dangerouslySetInnerHTML={{ __html: physicalMapLocation }}
                  />
                ) : (
                  <div className={cn('map-panel', 'mt-2', 'h-48', 'w-full', 'max-w-sm', 'rounded-xl')} aria-hidden="true" />
                )}
              </div>
            )}

            {/* Bank Transfer */}
            {(bankTransferTitle || bankTransferDescription || qrCodeImage) && (
              <div className={cn('flex', 'flex-col', 'items-center', 'gap-5', 'text-center')}>
                {bankTransferTitle && (
                  <h3 className={cn('font-display', 'not-italic', 'text-[clamp(1.5rem,3vw,2.5rem)]', 'leading-[1.1]', 'text-ink')}>
                    {bankTransferTitle}
                  </h3>
                )}
                {bankTransferDescription && (
                  <p className={cn('max-w-xs', 'font-body', 'text-body', 'leading-relaxed', 'text-muted')}>
                    {bankTransferDescription}
                  </p>
                )}
                {qrCodeImage ? (
                  <div className={cn('relative', 'h-44', 'w-44', 'overflow-hidden')}>
                    <Image
                      src={qrCodeImage}
                      alt="QR code for bank transfer"
                      fill
                      sizes="180px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className={cn('hero-checker', 'h-44', 'w-44')} aria-hidden="true" />
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
