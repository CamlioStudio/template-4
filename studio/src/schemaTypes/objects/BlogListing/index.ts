import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const blogListing = defineType({
  name: 'blogListing',
  title: 'Blog Listing',
  type: 'object',
  icon: DocumentTextIcon,
  preview: {
    select: { title: 'heading' },
    prepare({ title }: { title?: string }) {
      return { title: `Blog Listing: ${title || 'Untitled'}` }
    },
  },
  fields: [
    defineField({
      name: 'cmsTitle',
      title: 'CMS Title',
      type: 'string',
      description: 'Internal label used in Studio only.',
    }),
    defineField({ name: 'heading', title: 'Page Heading', type: 'string' }),
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
    defineField({
      name: 'articles',
      title: 'Articles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Title', type: 'string' }),
            defineField({ name: 'category', title: 'Category', type: 'string', description: 'e.g. "Wedding Tips"' }),
            defineField({ name: 'href', title: 'Link URL', type: 'string', description: 'URL this article links to.' }),
            defineField({
              name: 'image',
              title: 'Cover Image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'category' },
            prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
              return { title: title || 'Untitled Article', subtitle }
            },
          },
        },
      ],
    }),
  ],
})
