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
      type: 'string',    }),
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
              initialValue: 'Kivett Bednar blues setlist',        }),
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
              initialValue: 'Kivett Bednar blues setlist',        }),
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
              initialValue: 'Kivett Bednar blues setlist',        }),
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

    // Button Labels
    defineField({
      name: 'ctaBookLessonButtonText',
      title: 'CTA: Book Lesson Button Text',
      type: 'string',
      description: 'Text for "Book a Lesson" button in CTA',
      initialValue: 'Book a Lesson',
    }),
    defineField({
      name: 'ctaContactButtonText',
      title: 'CTA: Contact Button Text',
      type: 'string',
      description: 'Text for "Get in Touch" button in CTA',
      initialValue: 'Get in Touch',
    }),

    // Dynamic Text
    defineField({
      name: 'subtitleSuffix',
      title: 'Subtitle Suffix',
      type: 'string',
      description: 'Text appended to song count in hero subtitle (e.g., "32 [timeless classics...]")',
      initialValue: ' timeless classics from the great American songbook',
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
