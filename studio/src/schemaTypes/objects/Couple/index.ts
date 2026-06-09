import { UsersIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const couple = defineType({
  name: 'couple',
  title: 'Couple',
  type: 'object',
  icon: UsersIcon,
  preview: {
    select: { title: 'heading' },
    prepare({ title }: { title?: string }) {
      return { title: `Couple: ${title || 'Untitled'}` }
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
              description: 'Single character to highlight (e.g. "C").',
              validation: (Rule) => Rule.required().max(1),
            }),
            defineField({
              name: 'charIndex',
              title: 'Occurrence Index',
              type: 'number',
              description: '0-based. Only needed if this character appears more than once in the heading.',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'decorImage',
      title: 'Decor Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'people',
      title: 'People',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'person',
          title: 'Person',
          preview: {
            select: { title: 'name', subtitle: 'role' },
          },
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'role', title: 'Role', type: 'string', description: 'e.g. The Bride, The Groom' }),
            defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 4 }),
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
            }),
            defineField({
              name: 'socials',
              title: 'Social Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'socialLink',
                  title: 'Social Link',
                  preview: {
                    select: { title: 'platform', subtitle: 'href' },
                  },
                  fields: [
                    defineField({
                      name: 'platform',
                      title: 'Platform',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Instagram', value: 'instagram' },
                          { title: 'Facebook', value: 'facebook' },
                          { title: 'X / Twitter', value: 'x' },
                          { title: 'TikTok', value: 'tiktok' },
                        ],
                      },
                    }),
                    defineField({ name: 'href', title: 'URL', type: 'url' }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
})
