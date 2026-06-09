// Journey — Figma node 24:2232
import Image from 'next/image'
import type { Journey } from '@/sanity.types'

type JourneyBlockProps = { block: Journey; index: number }

export default function JourneyBlock({ block }: JourneyBlockProps) {
  const { items } = block
  if (!items?.length) return null

  return (
    <section className="px-4 lg:px-30 py-16 lg:py-20">
      {/* White card */}
      <div className="bg-white p-10 lg:p-19.5">
        {items.map((item, i) => {
          const isFirst = i === 0
          const isLast = i === items.length - 1
          return (
            <div
              key={i}
              className={[
                'flex gap-8 lg:gap-25.5 items-center',
                !isLast ? 'border-b border-muted' : '',
                isFirst ? 'pb-10' : isLast ? 'pt-10' : 'py-10',
              ].join(' ')}
            >
              {/* Text — always left */}
              <div className="flex flex-col gap-8 w-full lg:w-127.5 shrink-0">
                <div className="flex flex-col gap-1 font-display text-ink">
                  {item.year && (
                    <p className="text-sub leading-[1.1]">( {item.year} )</p>
                  )}
                  {item.heading && (
                    <p className="text-[4rem] leading-[1.1]">{item.heading}</p>
                  )}
                </div>
                {item.body && (
                  <p className="font-body text-body leading-normal text-muted">{item.body}</p>
                )}
              </div>

              {/* Image — always right */}
              <div className="hidden lg:block relative h-106 w-108 shrink-0 overflow-hidden bg-paper">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.heading ?? ''}
                    fill
                    sizes="432px"
                    quality={90}
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
