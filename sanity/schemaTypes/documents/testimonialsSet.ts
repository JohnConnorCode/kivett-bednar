import {defineArrayMember, defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const testimonialsSet = defineType({
  name: 'testimonialsSet',
  title: 'Testimonials Set',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'items',
      title: 'Testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'role', title: 'Role/Attribution', type: 'string'}),
            defineField({name: 'quote', title: 'Quote', type: 'text', rows: 3, validation: (Rule) => Rule.required()}),
            defineField({name: 'image', title: 'Photo', type: 'image', options: {hotspot: true}}),
          ],
        }),
      ],
    }),
  ],
  preview: {select: {title: 'title'}},
})

