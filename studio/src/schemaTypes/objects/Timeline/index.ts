import { ClockIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const timeline = defineType({
  name: 'timeline',
  title: 'Timeline',
  type: 'object',
  icon: ClockIcon,
  preview: {
    select: { title: 'heading' },
    prepare({ title }: { title?: string }) {
      return { title: `Timeline: ${title || 'Untitled'}` }
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
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'promoText', title: 'Promo Text', type: 'string' }),
    defineField({ name: 'targetDate', title: 'Target Date', type: 'datetime' }),
    defineField({ name: 'ctaText', title: 'CTA Text', type: 'string' }),
    defineField({ name: 'ctaHref', title: 'CTA Link', type: 'string' }),
    defineField({ name: 'videoUrl', title: 'Video URL', type: 'string', description: 'MP4 path or YouTube URL' }),
    defineField({ name: 'videoThumbnail', title: 'Video Thumbnail', type: 'image', options: { hotspot: true } }),
  ],
})
