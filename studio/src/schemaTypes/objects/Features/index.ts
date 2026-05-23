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
