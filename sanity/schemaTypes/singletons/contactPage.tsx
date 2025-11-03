import {EnvelopeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Contact Page singleton schema
 */

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    // Hero Section
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 2,
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
              initialValue: 'Kivett Bednar',        }),
      ],
    }),

    // Portrait Section
    defineField({
      name: 'portraitImage',
      title: 'Main Portrait Image',
      type: 'image',
      description: 'Primary portrait photo',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
              initialValue: 'Kivett Bednar',        }),
      ],
    }),
    defineField({
      name: 'portraitGallery',
      title: 'Portrait Gallery',
      type: 'array',
      description: 'Additional portrait/performance images',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'portraitGalleryImage',
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
              initialValue: 'Kivett Bednar',            }),
          ],
          preview: {
            select: {
              title: 'alt',
              media: 'image',
            },
          },
        }),
      ],
    }),

    // Section Headings
    defineField({
      name: 'formHeading',
      title: 'Contact Form Heading',
      type: 'string',
      description: 'Heading for the contact form section',
    }),
    defineField({
      name: 'directContactHeading',
      title: 'Direct Contact Heading',
      type: 'string',
      description: 'Heading for direct contact info section',
    }),
    defineField({
      name: 'directContactDescription',
      title: 'Direct Contact Description',
      type: 'text',
      rows: 2,
      description: 'Description text for direct contact section',
      initialValue: 'For booking inquiries, press questions, or guitar lessons, reach out directly:',
    }),
    defineField({
      name: 'socialHeading',
      title: 'Social Links Heading',
      type: 'string',
      description: 'Heading for social media links',
    }),
    defineField({
      name: 'quickLinksHeading',
      title: 'Quick Links Heading',
      type: 'string',
      description: 'Heading for quick navigation links',
    }),
    defineField({
      name: 'aboutHeading',
      title: 'About Section Heading',
      type: 'string',
      description: 'Heading for about/bio section',
    }),

    // Quick Links Labels
    defineField({
      name: 'quickLinkShowsText',
      title: 'Quick Link: Shows Text',
      type: 'string',
      description: 'Text for "Upcoming Shows" quick link',
      initialValue: 'Upcoming Shows',
    }),
    defineField({
      name: 'quickLinkLessonsText',
      title: 'Quick Link: Lessons Text',
      type: 'string',
      description: 'Text for "Guitar Lessons" quick link',
      initialValue: 'Guitar Lessons',
    }),
    defineField({
      name: 'quickLinkSetlistText',
      title: 'Quick Link: Setlist Text',
      type: 'string',
      description: 'Text for "Blues Setlist" quick link',
      initialValue: 'Blues Setlist',
    }),

    // CTA Section
    defineField({
      name: 'ctaSectionHeading',
      title: 'CTA Section Heading',
      type: 'string',
      description: 'Heading for "Looking for Live Blues?" CTA section',
      initialValue: 'Looking for Live Blues?',
    }),
    defineField({
      name: 'ctaSectionText',
      title: 'CTA Section Text',
      type: 'text',
      rows: 2,
      description: 'Description text for shows CTA section',
      initialValue: 'Check out upcoming performances and get your tickets before they sell out.',
    }),
    defineField({
      name: 'ctaSectionButtonText',
      title: 'CTA Section Button Text',
      type: 'string',
      description: 'Button text for shows CTA',
      initialValue: 'See Upcoming Shows',
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
