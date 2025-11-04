import {defineArrayMember, defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export const faqSet = defineType({
  name: 'faqSet',
  title: 'FAQ Set',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'items',
      title: 'Questions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
          ],
        }),
      ],
    }),
  ],
  preview: {select: {title: 'title'}},
})

