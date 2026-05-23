import { LinkedinIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteFooter = defineType({
  name: 'siteFooter',
  title: 'Footer',
  type: 'document',
  icon: LinkedinIcon,
  fields: [
    defineField({
      name: 'navItems',
      title: 'Navigation Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Link', type: 'string' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        }),
      ],
    }),
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      initialValue: 'Camlio',
    }),
    defineField({
      name: 'brandYear',
      title: 'Brand Year',
      type: 'string',
      initialValue: '2026',
    }),
    defineField({ name: 'facebookUrl', title: 'Facebook URL', type: 'url' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'xUrl', title: 'X (Twitter) URL', type: 'url' }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      initialValue: 'Copyright © 2025 Rometheme. All Rights Reserved.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Footer' }
    },
  },
})
