import {defineField, defineType} from 'sanity'
import {ControlsIcon} from '@sanity/icons'

export const musicEmbed = defineType({
  name: 'musicEmbed',
  title: 'Music Embed',
  type: 'object',
  icon: ControlsIcon,
  fields: [
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
      initialValue: 'spotify',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Embed URL',
      type: 'url',
      description: 'Share/embed URL from the music platform',
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
        title: `${provider?.charAt(0).toUpperCase()}${provider?.slice(1)} Player`,
        subtitle: url || 'Music Embed Module',
      }
    },
  },
})
