import { EnvelopeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const contactUs = defineType({
  name: 'contactUs',
  title: 'Contact Us',
  type: 'object',
  icon: EnvelopeIcon,
  preview: {
    select: {
      title: 'title',
      cmsTitle: 'cmsTitle',
    },
    prepare({ title, cmsTitle }: { title?: string; cmsTitle?: string }) {
      return {
        title: cmsTitle || title || 'Contact Us',
      }
    },
  },
  fields: [
    defineField({
      name: 'cmsTitle',
      title: 'CMS Title',
      type: 'string',
      description: 'Internal label used in Studio only.',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Get In Touch',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'We are only a note away from making everything perfect for you.',
    }),
    defineField({
      name: 'ceremonyTitle',
      title: 'Ceremony Title',
      type: 'string',
      initialValue: 'Ceremonial Info',
    }),
    defineField({
      name: 'ceremonyDate',
      title: 'Ceremony Date',
      type: 'string',
      initialValue: 'Thursday, 10 June 2026',
    }),
    defineField({
      name: 'ceremonyTime',
      title: 'Ceremony Time',
      type: 'string',
      initialValue: '5.00 PM',
    }),
    defineField({
      name: 'ceremonyLocation',
      title: 'Ceremony Location',
      type: 'string',
      initialValue: 'KLLG St, No.99, Pku City, ID 28289',
    }),
    defineField({
      name: 'receptionTitle',
      title: 'Reception Title',
      type: 'string',
      initialValue: 'Reception Info',
    }),
    defineField({
      name: 'receptionDate',
      title: 'Reception Date',
      type: 'string',
      initialValue: 'Thursday, 10 June 2026',
    }),
    defineField({
      name: 'receptionTime',
      title: 'Reception Time',
      type: 'string',
      initialValue: '6.30 PM - Late',
    }),
    defineField({
      name: 'receptionLocation',
      title: 'Reception Location',
      type: 'string',
      initialValue: 'KLLG St, No.99, Pku City, ID 28289',
    }),
  ],
})
