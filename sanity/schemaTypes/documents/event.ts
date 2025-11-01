import {CalendarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Event schema for concerts and performances
 * Includes timezone handling for accurate display across regions
 */
export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDateTime',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
    }),
    defineField({
      name: 'endDateTime',
      title: 'End Date & Time',
      type: 'datetime',
      description: 'Optional end time if different from start',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
    }),
    defineField({
      name: 'timezone',
      title: 'Timezone',
      type: 'string',
      description: 'IANA timezone (e.g., America/Los_Angeles)',
      initialValue: 'America/Los_Angeles',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Street Address',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'State/Province',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      initialValue: 'USA',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ticketUrl',
      title: 'Ticket URL',
      type: 'url',
      description: 'Link to purchase tickets',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
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
      name: 'isCanceled',
      title: 'Event Canceled',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isSoldOut',
      title: 'Sold Out',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Event Date, Newest',
      name: 'startDateTimeDesc',
      by: [{field: 'startDateTime', direction: 'desc'}],
    },
    {
      title: 'Event Date, Oldest',
      name: 'startDateTimeAsc',
      by: [{field: 'startDateTime', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      venue: 'venue',
      city: 'city',
      startDateTime: 'startDateTime',
      isCanceled: 'isCanceled',
      isSoldOut: 'isSoldOut',
      media: 'coverImage',
    },
    prepare({title, venue, city, startDateTime, isCanceled, isSoldOut, media}) {
      const date = startDateTime ? new Date(startDateTime).toLocaleDateString() : ''
      const status = isCanceled ? '[CANCELED] ' : isSoldOut ? '[SOLD OUT] ' : ''
      return {
        title: `${status}${title}`,
        subtitle: `${venue}, ${city} • ${date}`,
        media,
      }
    },
  },
})
