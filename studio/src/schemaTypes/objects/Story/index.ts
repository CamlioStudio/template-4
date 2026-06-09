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
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 4 }),
    defineField({ name: 'decorImage', title: 'Decor Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imageLeft', title: 'Left Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imageRightFull', title: 'Right Image (Full)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imageRightSmall', title: 'Right Image (Small)', type: 'image', options: { hotspot: true } }),
  ],
})
