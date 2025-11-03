import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const testimonials = defineType({
  name: 'testimonials',
  title: 'Testimonials',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Testimonials',
      type: 'array',
      of: [
        defineField({
          name: 'testimonial',
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string'}),
            defineField({name: 'role', title: 'Role/Attribution', type: 'string'}),
            defineField({name: 'quote', title: 'Quote', type: 'text', rows: 3}),
            defineField({
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'role'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Testimonials'}
    },
  },
})

