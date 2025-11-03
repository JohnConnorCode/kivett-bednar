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
      type: 'blockContent',    }),
    defineField({
      name: 'backgroundVariant',
      title: 'Background Variant',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Surface', value: 'surface'},
          {title: 'Surface Elevated', value: 'surface-elevated'},
          {title: 'Dark Gradient', value: 'dark-gradient'},
        ],
      },
    }),
    defineField({
      name: 'sectionPadding',
      title: 'Section Vertical Padding',
      type: 'string',
      initialValue: 'md',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Small', value: 'sm'},
          {title: 'Medium', value: 'md'},
          {title: 'Large', value: 'lg'},
          {title: 'XL', value: 'xl'},
        ],
      },
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
