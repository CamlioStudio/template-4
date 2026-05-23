import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ogImage',
      title: 'Default OG Image',
      type: 'image',
      description: 'Used as fallback for social sharing previews.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'coupleName',
      title: 'Couple Names',
      type: 'string',
      description: 'e.g. Sarah & James',
    }),
    defineField({
      name: 'weddingDate',
      title: 'Wedding Date',
      type: 'datetime',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Settings' }
    },
  },
})
