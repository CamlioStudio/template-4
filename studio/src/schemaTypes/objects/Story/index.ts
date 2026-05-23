import { BookIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const story = defineType({
  name: 'story',
  title: 'Story',
  type: 'object',
  icon: BookIcon,
  preview: {
    select: { title: 'heading' },
    prepare({ title }: { title?: string }) {
      return { title: `Story: ${title || 'Untitled'}` }
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
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 4 }),
    defineField({ name: 'decorImage', title: 'Decor Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imageLeft', title: 'Left Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imageRightFull', title: 'Right Image (Full)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imageRightSmall', title: 'Right Image (Small)', type: 'image', options: { hotspot: true } }),
  ],
})
