import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const richText = defineType({
  name: 'richText',
  title: 'Rich Text',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({content}) {
      const block = (content || []).find((block: any) => block._type === 'block')
      return {
        title: block
          ? block.children
              .filter((child: any) => child._type === 'span')
              .map((span: any) => span.text)
              .join('')
          : 'Rich Text',
        subtitle: 'Rich Text Module',
      }
    },
  },
})
