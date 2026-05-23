import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { mediaAssetSource } from 'sanity-plugin-media'

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  icon: ImagesIcon,
  preview: {
    select: { title: 'heading' },
    prepare({ title }: { title?: string }) {
      return { title: `Gallery: ${title || 'Untitled'}` }
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
    defineField({ name: 'viewAllText', title: 'View All Text', type: 'string' }),
    defineField({ name: 'viewAllHref', title: 'View All Link', type: 'string' }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true, sources: [mediaAssetSource] } }],
    }),
  ],
})
