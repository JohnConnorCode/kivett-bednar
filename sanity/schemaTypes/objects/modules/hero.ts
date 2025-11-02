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
      title: 'Desktop Image',
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
      name: 'mobileImage',
      title: 'Mobile Image (Optional)',
      type: 'image',
      description: 'Different image for mobile devices. If not set, desktop image will be used.',
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
      hidden: ({parent}) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'desktopPosition',
      title: 'Desktop Position (Optional)',
      type: 'string',
      description: 'Override image position on desktop screens',
      options: {
        list: [
          {title: 'Top Left', value: 'top-left'},
          {title: 'Top Center', value: 'top-center'},
          {title: 'Top Right', value: 'top-right'},
          {title: 'Center Left', value: 'center-left'},
          {title: 'Center', value: 'center'},
          {title: 'Center Right', value: 'center-right'},
          {title: 'Bottom Left', value: 'bottom-left'},
          {title: 'Bottom Center', value: 'bottom-center'},
          {title: 'Bottom Right', value: 'bottom-right'},
        ],
        layout: 'dropdown',
      },
      hidden: ({parent}) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'mobilePosition',
      title: 'Mobile Position (Optional)',
      type: 'string',
      description: 'Override image position on mobile screens',
      options: {
        list: [
          {title: 'Top Left', value: 'top-left'},
          {title: 'Top Center', value: 'top-center'},
          {title: 'Top Right', value: 'top-right'},
          {title: 'Center Left', value: 'center-left'},
          {title: 'Center', value: 'center'},
          {title: 'Center Right', value: 'center-right'},
          {title: 'Bottom Left', value: 'bottom-left'},
          {title: 'Bottom Center', value: 'bottom-center'},
          {title: 'Bottom Right', value: 'bottom-right'},
        ],
        layout: 'dropdown',
      },
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
