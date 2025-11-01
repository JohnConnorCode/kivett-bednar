import {defineArrayMember, defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subhead',
      title: 'Subheadline',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'image',
      title: 'Image',
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
      ],
      hidden: ({parent}) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'video',
      title: 'Video URL',
      type: 'url',
      description: 'Video file URL (MP4, WebM, etc.)',
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'ctas',
      title: 'Call to Actions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'variant',
              title: 'Variant',
              type: 'string',
              options: {
                list: [
                  {title: 'Primary', value: 'primary'},
                  {title: 'Secondary', value: 'secondary'},
                  {title: 'Outline', value: 'outline'},
                ],
              },
              initialValue: 'primary',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
      media: 'image',
    },
    prepare({headline, media}) {
      return {
        title: headline || 'Hero',
        subtitle: 'Hero Module',
        media,
      }
    },
  },
})
