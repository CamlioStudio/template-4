// Our Story — Figma node 24:2591
import Image from 'next/image'
import { FlowerDecor } from '@/app/components/ui/FlowerDecor'
import type { StoryBlockProps } from '@/app/components/blocks/types'

export default function StoryBlock({ heading, body, decorImage, imageLeft, imageRightFull, imageRightSmall }: StoryBlockProps) {
  return (
    <section className="overflow-hidden">
      <div className="mx-0 sm:mx-6">
        <div className="grid min-h-123.5 items-stretch lg:grid-cols-[204px_1fr_500px]">

          {/* Left portrait photo */}
          <div className="hidden items-end lg:flex">
            <div className="relative h-57 w-51 overflow-hidden rounded-2xl">
              <Image src={imageLeft} alt="" fill sizes="204px" className="object-cover" />
            </div>
          </div>

          {/* Center text */}
          <div className="relative flex flex-col justify-center px-8 py-5 pt-24 lg:py-16 lg:px-12">
            <FlowerDecor src={decorImage} />
            <h2 className="font-display text-section leading-[1.05] text-ink">
              {heading}
            </h2>
            <p className="mt-6 max-w-121.5 text-sm leading-relaxed text-muted">{body}</p>
          </div>

          {/* Right photos cluster */}
          <div className="relative hidden min-h-123.5 lg:block">
            <div className="absolute bottom-0 right-0 top-0 w-90 overflow-hidden rounded-2xl">
              <Image src={imageRightFull} alt="" fill sizes="360px" className="object-cover" />
            </div>
            <div className="absolute bottom-8 left-0 h-66.25 w-47.5 overflow-hidden rounded-2xl">
              <Image src={imageRightSmall} alt="" fill sizes="190px" className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
