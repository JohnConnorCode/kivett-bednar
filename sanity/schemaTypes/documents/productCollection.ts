import {TagsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const productCollection = defineType({
  name: 'productCollection',
  title: 'Product Collection',
  type: 'document',
  icon: TagsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Collection Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Collection Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      description: 'Products in this collection',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Collection',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which collections are displayed (lower numbers first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      products: 'products',
    },
    prepare({title, media, products}) {
      const count = products?.length || 0
      return {
        title,
        subtitle: `${count} ${count === 1 ? 'product' : 'products'}`,
        media,
      }
    },
  },
})
