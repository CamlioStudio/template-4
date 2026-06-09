import { HeartIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const wishes = defineType({
  name: 'wishes',
  title: 'Wishes',
  type: 'object',
  icon: HeartIcon,
  preview: {
    select: { title: 'cmsTitle', heading: 'heading' },
    prepare({ title, heading }: { title?: string; heading?: string }) {
      return { title: title || heading || 'Wishes' }
    },
  },
  fields: [
    defineField({
      name: 'cmsTitle',
      title: 'CMS Title',
      type: 'string',
      description: 'Internal label used in Studio only.',
    }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'highlights',
      title: 'Highlight Characters',
      type: 'array',
      description: 'Characters in the heading to render in Kapakana decorative font.',
      of: [
        {
          type: 'object',
          name: 'highlightItem',
          title: 'Highlight',
          preview: {
            select: { title: 'char', subtitle: 'charIndex' },
            prepare({ title, subtitle }: { title?: string; subtitle?: number }) {
              return { title: `"${title ?? ''}"`, subtitle: subtitle != null ? `occurrence ${subtitle}` : 'first occurrence' }
            },
          },
          fields: [
            defineField({ name: 'char', title: 'Character', type: 'string', validation: (Rule) => Rule.required().max(1) }),
            defineField({ name: 'charIndex', title: 'Occurrence Index', type: 'number' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'quotes',
      title: 'Quotes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'quoteItem',
          title: 'Quote',
          preview: {
            select: { title: 'author', subtitle: 'quote' },
            prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
              return { title: title || 'Anonymous', subtitle: subtitle ? `"${subtitle.slice(0, 60)}…"` : '' }
            },
          },
          fields: [
            defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 4 }),
            defineField({ name: 'author', title: 'Author', type: 'string' }),
          ],
        },
      ],
    }),
  ],
})
