import {defineField, defineType} from 'sanity'
import {BasketIcon} from '@sanity/icons'

export const order = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  icon: BasketIcon,
  fields: [
    defineField({name: 'stripeSessionId', title: 'Stripe Session ID', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'name', title: 'Customer Name', type: 'string'}),
    defineField({
      name: 'address',
      title: 'Shipping Address',
      type: 'object',
      fields: [
        defineField({name: 'line1', title: 'Line 1', type: 'string'}),
        defineField({name: 'city', title: 'City', type: 'string'}),
        defineField({name: 'state', title: 'State/Region', type: 'string'}),
        defineField({name: 'postalCode', title: 'Postal Code', type: 'string'}),
        defineField({name: 'country', title: 'Country', type: 'string'}),
      ],
    }),
    defineField({name: 'gelatoOrderId', title: 'Gelato Order ID', type: 'string'}),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {list: ['pending', 'submitted', 'in_production', 'shipped', 'delivered', 'canceled', 'failed']},
      initialValue: 'pending',
    }),
    defineField({name: 'createdAt', title: 'Created At', type: 'datetime'}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'status'},
  },
})
