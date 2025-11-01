import {EnvelopeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Contact Page singleton schema
 */

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Page',
      }
    },
  },
})
