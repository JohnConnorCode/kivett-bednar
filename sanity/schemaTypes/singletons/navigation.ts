import {MenuIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Navigation schema Singleton for managing site navigation
 */
export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'main',
      title: 'Main Navigation',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navItem',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL',
              type: 'string',
              description: 'Use relative paths like /shows or /merch',
            }),
            defineField({
              name: 'docRef',
              title: 'Page Reference',
              type: 'reference',
              to: [{type: 'page'}],
              description: 'Link to a page document (optional, overrides href)',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              href: 'href',
            },
            prepare({title, href}) {
              return {
                title: title,
                subtitle: href || 'Page reference',
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer Navigation',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerItem',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL',
              type: 'string',
            }),
            defineField({
              name: 'docRef',
              title: 'Page Reference',
              type: 'reference',
              to: [{type: 'page'}],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              href: 'href',
            },
            prepare({title, href}) {
              return {
                title: title,
                subtitle: href || 'Page reference',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation',
      }
    },
  },
})
