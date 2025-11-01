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
  ],
  preview: {
    prepare() {
      return {
        title: 'Lessons Page',
      }
    },
  },
})
