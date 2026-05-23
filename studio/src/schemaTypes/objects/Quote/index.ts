import { BlockquoteIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const quote = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  icon: BlockquoteIcon,
  preview: {
    select: { title: 'quote' },
    prepare({ title }: { title?: string }) {
      return { title: `Quote: ${title ? title.slice(0, 40) + '…' : 'Untitled'}` }
    },
  },
  fields: [
    defineField({
      name: 'cmsTitle',
      title: 'CMS Title',
      type: 'string',
      description: 'Internal label used in Studio only.',
    }),
    defineField({ name: 'quote', title: 'Quote Text', type: 'text', rows: 4 }),
    defineField({ name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } }),
  ],
})
