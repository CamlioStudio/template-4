import { UsersIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const bridesmaidsGroomsmen = defineType({
  name: 'bridesmaidsGroomsmen',
  title: 'Bridesmaids & Groomsmen',
  type: 'object',
  icon: UsersIcon,
  preview: {
    select: { title: 'cmsTitle', heading: 'heading' },
    prepare({ title, heading }: { title?: string; heading?: string }) {
      return { title: title || heading || 'Bridesmaids & Groomsmen' }
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
              return { title: `"${title ?? ''}"`, subtitle: subtitle != null ? `occurrence ${subtitle}` : 'first occurrence' }
            },
          },
          fields: [
            defineField({ name: 'char', title: 'Character', type: 'string', validation: (Rule) => Rule.required().max(1) }),
            defineField({ name: 'charIndex', title: 'Occurrence Index', type: 'number' }),
          ],
        },
      ],
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'member',
          title: 'Member',
          preview: {
            select: { title: 'name', subtitle: 'role' },
            prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
              return { title: title || 'Unnamed', subtitle: subtitle || '' }
            },
          },
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              options: {
                list: [
                  { title: 'Bridesmaid', value: 'Bridesmaid' },
                  { title: 'Groomsmen', value: 'Groomsmen' },
                ],
              },
            }),
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
            }),
          ],
        },
      ],
    }),
  ],
})
