import type { PageBuilderSection } from '@/sanity.types'

export type { PageBuilderSection }

export type ExtractPageBuilderType<T extends PageBuilderSection['_type']> = Extract<PageBuilderSection, { _type: T }>
