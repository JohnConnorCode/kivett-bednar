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
    // Hero Section
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      description: 'Background image for hero section',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    // Content Section
    defineField({
      name: 'introText',
      title: 'Introduction Text',
      type: 'text',
      rows: 3,
      description: 'Text displayed above the song list',
    }),

    // Visual Interest Images
    defineField({
      name: 'performanceImage',
      title: 'Performance Image',
      type: 'image',
      description: 'Performance photo for visual interest',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'guitarImage',
      title: 'Guitar Image',
      type: 'image',
      description: 'Guitar close-up or detail shot',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    // CTA Section
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
