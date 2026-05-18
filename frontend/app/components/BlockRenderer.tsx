import type { PageBuilderSection } from '@/sanity/lib/types'
import ContactUsBlock from '@/app/components/blocks/ContactUs'

type BlockRendererProps = {
  block: PageBuilderSection
  index: number
}

const blocks = {
  contactUs: ContactUsBlock,
} as const

export function BlockRenderer({ block, index }: BlockRendererProps) {
  const Component = blocks[block._type as keyof typeof blocks]

  if (!Component) {
    return null
  }

  return <Component block={block as never} index={index} />
}
