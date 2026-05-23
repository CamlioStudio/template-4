import { SparklesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: SparklesIcon,
  preview: {
    select: { title: 'headline' },
    prepare({ title }: { title?: string }) {
      return { title: `Hero: ${title || 'Untitled'}` }
    },
  },
  fields: [
    defineField({
      name: 'cmsTitle',
      title: 'CMS Title',
      type: 'string',
      description: 'Internal label used in Studio only.',
    }),
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'text', rows: 2 }),
    defineField({ name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } }),
  ],
})
