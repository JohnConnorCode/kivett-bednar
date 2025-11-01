import {HomeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Home Page singleton schema - content for the homepage
 */

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'heroSlides',
      title: 'Hero Slider Images',
      type: 'array',
      description: 'Images for the hero slider (recommended: 4-6 high-quality images)',
      validation: (rule) => rule.required().min(1).max(10),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'slide',
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
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      description: 'Main heading text (e.g., "Kivett Bednar")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'string',
      description: 'Subheading text (e.g., "Blues • Guitar • Portland")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'text',
      rows: 2,
      description: 'Short tagline below subheading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aboutHeading',
      title: 'About Section Heading',
      type: 'string',
      description: 'Heading for the about section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aboutText',
      title: 'About Section Text',
      type: 'text',
      rows: 4,
      description: 'Bio/description text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Section Image',
      type: 'image',
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
      name: 'albumTitle',
      title: 'Featured Album Title',
      type: 'string',
      description: 'Title of featured album',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'albumYear',
      title: 'Album Year',
      type: 'string',
      description: 'Year released',
    }),
    defineField({
      name: 'albumFormat',
      title: 'Album Format',
      type: 'string',
      description: 'Format description (e.g., "Limited Edition Red Vinyl")',
    }),
    defineField({
      name: 'albumDescription',
      title: 'Album Description',
      type: 'text',
      rows: 3,
      description: 'Description of the album',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'albumImage',
      title: 'Album Cover Image',
      type: 'image',
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
      name: 'albumFeatures',
      title: 'Album Features',
      type: 'array',
      description: 'Key features or highlights of the album',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'ctaLessonsHeading',
      title: 'Lessons CTA Heading',
      type: 'string',
      description: 'Heading for lessons call-to-action section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLessonsText',
      title: 'Lessons CTA Text',
      type: 'text',
      rows: 2,
      description: 'Text for lessons call-to-action',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
      }
    },
  },
})
