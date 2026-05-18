import { BlockRenderer } from '@/app/components/BlockRenderer'
import type { PageBuilderSection } from '@/sanity/lib/types'

type PageBuilderProps = {
  sections: PageBuilderSection[]
}

export function PageBuilder({ sections }: PageBuilderProps) {
  return (
    <main>
      {sections.map((section, index) => (
        <BlockRenderer key={`${section._type}-${index}`} block={section} index={index} />
      ))}
    </main>
  )
}
