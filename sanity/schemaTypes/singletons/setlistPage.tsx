import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Setlist Page singleton schema
 */

export const setlistPage = defineType({
  name: 'setlistPage',
  title: 'Setlist Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introText',
      title: 'Introduction Text',
      type: 'text',
      rows: 3,
      description: 'Text displayed above the song list',
    }),
    defineField({
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
      description: 'Heading for call-to-action section at bottom',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'text',
      rows: 2,
      description: 'Text for call-to-action at bottom',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Setlist Page',
      }
    },
  },
})
