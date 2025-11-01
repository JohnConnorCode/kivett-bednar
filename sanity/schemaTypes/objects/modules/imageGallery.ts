import {defineArrayMember, defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export const imageGallery = defineType({
  name: 'imageGallery',
  title: 'Image Gallery',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare({images}) {
      const count = images?.length || 0
      return {
        title: `Image Gallery (${count} ${count === 1 ? 'image' : 'images'})`,
        subtitle: 'Image Gallery Module',
        media: images?.[0],
      }
    },
  },
})
