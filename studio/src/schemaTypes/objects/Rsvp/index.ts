import { CheckmarkCircleIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const rsvp = defineType({
  name: 'rsvp',
  title: 'RSVP',
  type: 'object',
  icon: CheckmarkCircleIcon,
  preview: {
    select: { title: 'heading' },
    prepare({ title }: { title?: string }) {
      return { title: `RSVP: ${title || 'Untitled'}` }
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
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2 }),
  ],
})
