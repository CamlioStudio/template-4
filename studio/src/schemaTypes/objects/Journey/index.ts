import { ClockIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const journey = defineType({
  name: 'journey',
  title: 'Journey',
  type: 'object',
  icon: ClockIcon,
  preview: {
    select: { title: 'cmsTitle' },
    prepare({ title }: { title?: string }) {
      return { title: `Journey: ${title || 'Untitled'}` }
    },
  },
  fields: [
    defineField({
      name: 'cmsTitle',
      title: 'CMS Title',
      type: 'string',
      description: 'Internal label used in Studio only.',
    }),
    defineField({
      name: 'items',
      title: 'Milestones',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'milestone',
          title: 'Milestone',
          preview: {
            select: { title: 'heading', subtitle: 'year' },
          },
          fields: [
            defineField({ name: 'year', title: 'Year', type: 'string' }),
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 4 }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
            }),
          ],
        },
      ],
    }),
  ],
})
