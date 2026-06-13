import { PinIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const locationVenue = defineType({
  name: 'locationVenue',
  title: 'Location Venue',
  type: 'object',
  icon: PinIcon,
  preview: {
    select: { title: 'cmsTitle', subtitle: 'title' },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: `Venue: ${title || subtitle || 'Untitled'}` }
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
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'e.g. "The Ceremony" or "The Reception"',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlight Characters',
      type: 'array',
      description: 'Characters in the title to render in Kapakana decorative font.',
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
    defineField({
      name: 'venueName',
      title: 'Venue Name',
      type: 'string',
      description: 'e.g. "Garden Pavilion, Meadow Garden"',
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'e.g. "5:00 PM" or "6:30 PM until late"',
    }),
    defineField({
      name: 'mapLocation',
      title: 'Map Location',
      type: 'string',
      description:
        'Paste a Google Maps embed URL (https://maps.google.com/maps?q=...) or just the venue address — it will be embedded as an interactive map.',
    }),
    defineField({
      name: 'images',
      title: 'Venue Images',
      type: 'array',
      description: 'Decorative images shown alongside the venue info (2–3 recommended).',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
        },
      ],
    }),
    defineField({
      name: 'imagesPosition',
      title: 'Images Position',
      type: 'string',
      options: {
        list: [
          { title: 'Right (images on right)', value: 'right' },
          { title: 'Left (images on left)', value: 'left' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
    }),
  ],
})
