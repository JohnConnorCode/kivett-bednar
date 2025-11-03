import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export const videoEmbed = defineType({
  name: 'videoEmbed',
  title: 'Video Embed',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'backgroundVariant',
      title: 'Background Variant',
      type: 'string',
      initialValue: 'default',
      options: {list: [
        {title: 'Default', value: 'default'},
        {title: 'Surface', value: 'surface'},
        {title: 'Surface Elevated', value: 'surface-elevated'},
        {title: 'Dark Gradient', value: 'dark-gradient'},
      ]},
    }),
    defineField({
      name: 'sectionPadding',
      title: 'Section Vertical Padding',
      type: 'string',
      initialValue: 'md',
      options: {list: [
        {title: 'None', value: 'none'},
        {title: 'Small', value: 'sm'},
        {title: 'Medium', value: 'md'},
        {title: 'Large', value: 'lg'},
        {title: 'XL', value: 'xl'},
      ]},
    }),
    defineField({
      name: 'provider',
      title: 'Provider',
      type: 'string',
      options: {
        list: [
          {title: 'YouTube', value: 'youtube'},
          {title: 'Vimeo', value: 'vimeo'},
        ],
        layout: 'radio',
      },
      initialValue: 'youtube',    }),
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      description: 'Full URL or embed code',    }),
  ],
  preview: {
    select: {
      provider: 'provider',
      url: 'url',
    },
    prepare({provider, url}) {
      return {
        title: `${provider?.charAt(0).toUpperCase()}${provider?.slice(1)} Video`,
        subtitle: url || 'Video Embed Module',
      }
    },
  },
})
