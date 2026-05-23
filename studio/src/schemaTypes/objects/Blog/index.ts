import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const blog = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'object',
  icon: DocumentIcon,
  preview: {
    select: { title: 'heading' },
    prepare({ title }: { title?: string }) {
      return { title: `Blog: ${title || 'Untitled'}` }
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
    defineField({
      name: 'articles',
      title: 'Articles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
          ],
          preview: {
            select: { title: 'label' },
            prepare({ title }: { title?: string }) {
              return { title: title || 'Untitled Article' }
            },
          },
        },
      ],
    }),
  ],
})
