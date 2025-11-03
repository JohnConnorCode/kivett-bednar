import {defineField, defineType} from 'sanity'
import {ControlsIcon} from '@sanity/icons'

export const musicEmbed = defineType({
  name: 'musicEmbed',
  title: 'Music Embed',
  type: 'object',
  icon: ControlsIcon,
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
          {title: 'Spotify', value: 'spotify'},
          {title: 'Bandcamp', value: 'bandcamp'},
          {title: 'YouTube', value: 'youtube'},
        ],
        layout: 'radio',
      },
      initialValue: 'spotify',    }),
    defineField({
      name: 'url',
      title: 'Embed URL',
      type: 'url',
      description: 'Share/embed URL from the music platform',    }),
  ],
  preview: {
    select: {
      provider: 'provider',
      url: 'url',
    },
    prepare({provider, url}) {
      return {
        title: `${provider?.charAt(0).toUpperCase()}${provider?.slice(1)} Player`,
        subtitle: url || 'Music Embed Module',
      }
    },
  },
})
