import { ArrowRightIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'CTA',
  type: 'object',
  icon: ArrowRightIcon,
  preview: {
    select: { title: 'ctaText' },
    prepare({ title }: { title?: string }) {
      return { title: `CTA: ${title || 'Untitled'}` }
    },
  },
  fields: [
    defineField({
      name: 'cmsTitle',
      title: 'CMS Title',
      type: 'string',
      description: 'Internal label used in Studio only.',
    }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
    defineField({ name: 'ctaText', title: 'CTA Text', type: 'string' }),
    defineField({ name: 'ctaHref', title: 'CTA Link', type: 'string' }),
  ],
})
