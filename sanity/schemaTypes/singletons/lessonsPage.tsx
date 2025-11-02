import {BookIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Lessons Page singleton schema
 */

export const lessonsPage = defineType({
  name: 'lessonsPage',
  title: 'Lessons Page',
  type: 'document',
  icon: BookIcon,
  fields: [
    // Hero Section
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

    // Teaching Philosophy Section
    defineField({
      name: 'philosophyHeading',
      title: 'Philosophy/Approach Heading',
      type: 'string',
      description: 'Heading for the teaching philosophy section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'philosophyText',
      title: 'Philosophy/Approach Text',
      type: 'text',
      rows: 4,
      description: 'Description of teaching approach',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'philosophyImage',
      title: 'Philosophy Section Image',
      type: 'image',
      description: 'Image for teaching philosophy section',
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

    // Learning Items Section
    defineField({
      name: 'learningItemsHeading',
      title: 'Learning Items Section Heading',
      type: 'string',
      description: 'Heading for the "What You\'ll Learn" section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'learningItems',
      title: 'What You\'ll Learn',
      type: 'array',
      description: 'Grid of learning topics/skills',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'learningItem',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'ctaBoxHeading',
      title: 'CTA Box Heading',
      type: 'string',
      description: 'Heading for the call-to-action box',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaBoxText',
      title: 'CTA Box Text',
      type: 'text',
      rows: 2,
      description: 'Text in the CTA box',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials/Experience',
      type: 'text',
      rows: 2,
      description: 'Teaching credentials (e.g., "Twenty years teaching experience. Berklee graduate.")',
    }),

    // Performance/Teaching Images
    defineField({
      name: 'teachingImage',
      title: 'Teaching Image',
      type: 'image',
      description: 'Image showing teaching or playing',
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

    // Button Labels
    defineField({
      name: 'emailButtonText',
      title: 'Email Button Text',
      type: 'string',
      description: 'Text for email button in CTA box',
      initialValue: 'Email Me',
    }),
    defineField({
      name: 'scheduleButtonText',
      title: 'Schedule Button Text',
      type: 'string',
      description: 'Text for schedule button in CTA box',
      initialValue: 'Schedule a Lesson',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Lessons Page',
      }
    },
  },
})
