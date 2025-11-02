import {CalendarIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Shows Page singleton schema - content for the shows/events page
 */

export const showsPage = defineType({
  name: 'showsPage',
  title: 'Shows Page',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    // Hero Section
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      description: 'Main heading (e.g., "Live Shows")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      description: 'Subtitle text below the heading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      description: 'Background image for the hero section',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),

    // Performance Gallery Section
    defineField({
      name: 'performanceGalleryHeading',
      title: 'Performance Gallery Heading',
      type: 'string',
      description: 'Heading for the performance photos section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'performanceGallerySubheading',
      title: 'Performance Gallery Subheading',
      type: 'string',
      description: 'Subtitle for the performance photos section',
    }),
    defineField({
      name: 'performanceImages',
      title: 'Performance Gallery Images',
      type: 'array',
      description: 'Grid of performance photos (recommended: 6 images)',
      validation: (rule) => rule.required().min(1).max(12),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'performanceImage',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for accessibility',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Short caption displayed on the image',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'caption',
              subtitle: 'alt',
              media: 'image',
            },
          },
        }),
      ],
    }),

    // Upcoming Shows Section
    defineField({
      name: 'upcomingShowsHeading',
      title: 'Upcoming Shows Heading',
      type: 'string',
      description: 'Heading for upcoming shows list',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'emptyStateHeading',
      title: 'No Shows - Heading',
      type: 'string',
      description: 'Heading when no upcoming shows exist',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'emptyStateText',
      title: 'No Shows - Message',
      type: 'text',
      description: 'Message displayed when no upcoming shows are scheduled',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Shows Page',
        subtitle: 'Live shows and events content',
      }
    },
  },
})
