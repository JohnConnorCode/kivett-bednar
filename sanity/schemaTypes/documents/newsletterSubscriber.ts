import {defineType, defineField} from 'sanity'

export const newsletterSubscriber = defineType({
  name: 'newsletterSubscriber',
  title: 'Newsletter Subscribers',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Unsubscribed', value: 'unsubscribed'},
        ],
      },
      initialValue: 'active',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Subscription Source',
      type: 'string',
      description: 'Where the subscriber signed up from',
      initialValue: 'website',
    }),
  ],
  preview: {
    select: {
      email: 'email',
      status: 'status',
      subscribedAt: 'subscribedAt',
    },
    prepare({email, status, subscribedAt}) {
      return {
        title: email,
        subtitle: `${status} - ${new Date(subscribedAt).toLocaleDateString()}`,
      }
    },
  },
})
