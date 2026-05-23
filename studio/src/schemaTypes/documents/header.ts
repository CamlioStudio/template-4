import { MenuIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteHeader = defineType({
  name: 'siteHeader',
  title: 'Header',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'navLeft',
      title: 'Left Navigation',
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
      name: 'navRight',
      title: 'Right Navigation',
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
      name: 'rsvpLabel',
      title: 'RSVP Button Label',
      type: 'string',
      initialValue: 'RSVP',
    }),
    defineField({
      name: 'rsvpHref',
      title: 'RSVP Button Link',
      type: 'string',
      initialValue: '/rsvp',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Header' }
    },
  },
})
