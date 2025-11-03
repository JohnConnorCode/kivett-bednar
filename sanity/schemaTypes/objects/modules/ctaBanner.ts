import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons'

export const ctaBanner = defineType({
  name: 'ctaBanner',
  title: 'CTA Banner',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',        }),
        defineField({
          name: 'href',
          title: 'URL',
          type: 'string',        }),
      ],
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      body: 'body',
    },
    prepare({heading, body}) {
      return {
        title: heading,
        subtitle: body || 'CTA Banner Module',
      }
    },
  },
})
