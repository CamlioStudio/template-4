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
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'promoText', title: 'Promo Text', type: 'string' }),
    defineField({ name: 'targetDate', title: 'Target Date', type: 'datetime' }),
    defineField({ name: 'ctaText', title: 'CTA Text', type: 'string' }),
    defineField({ name: 'ctaHref', title: 'CTA Link', type: 'string' }),
    defineField({ name: 'videoUrl', title: 'Video URL', type: 'string', description: 'MP4 path or YouTube URL' }),
    defineField({ name: 'videoThumbnail', title: 'Video Thumbnail', type: 'image', options: { hotspot: true } }),
  ],
})
