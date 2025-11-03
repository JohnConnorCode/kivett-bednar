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
      description: 'Main heading (e.g., "Live Shows")',    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      description: 'Subtitle text below the heading',    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Desktop Image',
      type: 'image',
      description: 'Desktop background image for the hero section',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility',        }),
      ],    }),
    defineField({
      name: 'heroMobileImage',
      title: 'Hero Mobile Image (Optional)',
      type: 'image',
      description: 'Different image for mobile devices. If not set, desktop image will be used.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
              initialValue: 'Kivett Bednar performing live',
        }),
      ],
    }),
    defineField({
      name: 'heroDesktopPosition',
      title: 'Hero Desktop Position (Optional)',
      type: 'string',
      description: 'Override hero image position on desktop screens',
      options: {
        list: [
          {title: 'Top Left', value: 'top-left'},
          {title: 'Top Center', value: 'top-center'},
          {title: 'Top Right', value: 'top-right'},
          {title: 'Center Left', value: 'center-left'},
          {title: 'Center', value: 'center'},
          {title: 'Center Right', value: 'center-right'},
          {title: 'Bottom Left', value: 'bottom-left'},
          {title: 'Bottom Center', value: 'bottom-center'},
          {title: 'Bottom Right', value: 'bottom-right'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'heroMobilePosition',
      title: 'Hero Mobile Position (Optional)',
      type: 'string',
      description: 'Override hero image position on mobile screens',
      options: {
        list: [
          {title: 'Top Left', value: 'top-left'},
          {title: 'Top Center', value: 'top-center'},
          {title: 'Top Right', value: 'top-right'},
          {title: 'Center Left', value: 'center-left'},
          {title: 'Center', value: 'center'},
          {title: 'Center Right', value: 'center-right'},
          {title: 'Bottom Left', value: 'bottom-left'},
          {title: 'Bottom Center', value: 'bottom-center'},
          {title: 'Bottom Right', value: 'bottom-right'},
        ],
        layout: 'dropdown',
      },
    }),

    // Performance Gallery Section
    defineField({
      name: 'performanceGalleryHeading',
      title: 'Performance Gallery Heading',
      type: 'string',
      description: 'Heading for the performance photos section',    }),
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
      description: 'Grid of performance photos (recommended: 6 images)',      of: [
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
              },            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for accessibility',            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Short caption displayed on the image',            }),
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
      description: 'Heading for upcoming shows list',    }),
    defineField({
      name: 'emptyStateHeading',
      title: 'No Shows - Heading',
      type: 'string',
      description: 'Heading when no upcoming shows exist',    }),
    defineField({
      name: 'emptyStateText',
      title: 'No Shows - Message',
      type: 'text',
      description: 'Message displayed when no upcoming shows are scheduled',    }),

    // Dynamic Count Text
    defineField({
      name: 'showCountPrefix',
      title: 'Show Count Prefix',
      type: 'string',
      description: 'Text prefix before show count (e.g., " upcoming")',
      initialValue: ' upcoming',
    }),
    defineField({
      name: 'showSingular',
      title: 'Show: Singular Form',
      type: 'string',
      description: 'Singular form (e.g., "show")',
      initialValue: 'show',    }),
    defineField({
      name: 'showPlural',
      title: 'Show: Plural Form',
      type: 'string',
      description: 'Plural form (e.g., "shows")',
      initialValue: 'shows',    }),
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
