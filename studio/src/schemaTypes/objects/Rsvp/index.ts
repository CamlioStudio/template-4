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
              return {
                title: `"${title ?? ''}"`,
                subtitle: subtitle != null ? `occurrence ${subtitle}` : 'first occurrence',
              }
            },
          },
          fields: [
            defineField({
              name: 'char',
              title: 'Character',
              type: 'string',
              validation: (Rule) => Rule.required().max(1),
            }),
            defineField({ name: 'charIndex', title: 'Occurrence Index', type: 'number' }),
          ],
        },
      ],
    }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2 }),
    defineField({
      name: 'variant',
      title: 'Layout Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Elevated (homepage — white bg + form floats up)', value: 'elevated' },
          { title: 'Flat (RSVP page — transparent bg, no float)', value: 'flat' },
        ],
        layout: 'radio',
      },
      initialValue: 'elevated',
      description: 'Controls the white background wrapper and form translate-up effect.',
    }),
  ],
})
