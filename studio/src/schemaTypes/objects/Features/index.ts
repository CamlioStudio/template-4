import { ThListIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const features = defineType({
  name: 'features',
  title: 'Features',
  type: 'object',
  icon: ThListIcon,
  preview: {
    select: { title: 'heading' },
    prepare({ title }: { title?: string }) {
      return { title: `Features: ${title || 'Untitled'}` }
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
      description: 'Characters in the heading to render in Kapakana decorative font at 96px.',
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
            defineField({
              name: 'char',
              title: 'Character',
              type: 'string',
              validation: (Rule) => Rule.required().max(1),
            }),
            defineField({
              name: 'charIndex',
              title: 'Occurrence Index',
              type: 'number',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Feature Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'title' },
            prepare({ title }: { title?: string }) {
              return { title: title || 'Untitled Feature' }
            },
          },
        },
      ],
    }),
  ],
})
