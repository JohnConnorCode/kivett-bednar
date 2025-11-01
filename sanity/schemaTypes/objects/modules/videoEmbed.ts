import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export const videoEmbed = defineType({
  name: 'videoEmbed',
  title: 'Video Embed',
  type: 'object',
  icon: PlayIcon,
  fields: [
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
      initialValue: 'youtube',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      description: 'Full URL or embed code',
      validation: (Rule) => Rule.required(),
    }),
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
