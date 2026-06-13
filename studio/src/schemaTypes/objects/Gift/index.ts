import { HeartIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const gift = defineType({
  name: 'gift',
  title: 'Gift',
  type: 'object',
  icon: HeartIcon,
  preview: {
    select: { title: 'cmsTitle', subtitle: 'heading' },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: `Gift: ${title || subtitle || 'Untitled'}` }
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
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'e.g. "A Gift from the Heart"',
    }),
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: "Introductory text shown below the heading.",
    }),
    defineField({
      name: 'decorImage',
      title: 'Decorative Flower Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
      description: 'Small floral decoration above the heading.',
    }),
    defineField({
      name: 'physicalGiftTitle',
      title: 'Physical Gift Title',
      type: 'string',
      description: 'e.g. "Send a Physical Gift"',
      initialValue: 'Send a Physical Gift',
    }),
    defineField({
      name: 'physicalGiftDescription',
      title: 'Physical Gift Description',
      type: 'text',
      rows: 3,
      description: 'Instructions for sending a physical gift.',
    }),
    defineField({
      name: 'physicalAddress',
      title: 'Physical Address',
      type: 'string',
      description: 'Mailing address for physical gifts.',
    }),
    defineField({
      name: 'physicalMapImage',
      title: 'Physical Address Map Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
      description: 'Map image for the physical gift address.',
    }),
    defineField({
      name: 'bankTransferTitle',
      title: 'Bank Transfer Title',
      type: 'string',
      description: 'e.g. "Bank Transfer via QR Code"',
      initialValue: 'Bank Transfer via QR Code',
    }),
    defineField({
      name: 'bankTransferDescription',
      title: 'Bank Transfer Description',
      type: 'text',
      rows: 3,
      description: 'Instructions for bank transfer.',
    }),
    defineField({
      name: 'qrCodeImage',
      title: 'QR Code Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
      description: 'QR code image for bank transfer.',
    }),
  ],
})
