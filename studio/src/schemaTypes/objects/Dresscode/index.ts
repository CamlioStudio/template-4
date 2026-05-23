import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { mediaAssetSource } from 'sanity-plugin-media'

export const dresscode = defineType({
  name: 'dresscode',
  title: 'Dresscode',
  type: 'object',
  icon: TagIcon,
  preview: {
    select: { title: 'headingSerif' },
    prepare({ title }: { title?: string }) {
      return { title: `Dresscode: ${title || 'Untitled'}` }
    },
  },
  fields: [
    defineField({
      name: 'cmsTitle',
      title: 'CMS Title',
      type: 'string',
      description: 'Internal label used in Studio only.',
    }),
    defineField({ name: 'headingSerif', title: 'Heading (Serif)', type: 'string' }),
    defineField({ name: 'headingScript', title: 'Heading (Script)', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true, sources: [mediaAssetSource] } }],
    }),
  ],
})
