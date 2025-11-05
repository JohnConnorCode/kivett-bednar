import {StarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const productReview = defineType({
  name: 'productReview',
  title: 'Product Review',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating from 1-5 stars',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: 'title',
      title: 'Review Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'review',
      title: 'Review Text',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().min(10).max(1000),
    }),
    defineField({
      name: 'reviewerName',
      title: 'Reviewer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reviewerEmail',
      title: 'Reviewer Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'verified',
      title: 'Verified Purchase',
      type: 'boolean',
      description: 'Is this a verified purchase?',
      initialValue: false,
    }),
    defineField({
      name: 'helpful',
      title: 'Helpful Count',
      type: 'number',
      description: 'Number of people who found this helpful',
      initialValue: 0,
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: 'Approve review to show on product page',
      initialValue: false,
    }),
    defineField({
      name: 'createdAt',
      title: 'Review Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      rating: 'rating',
      reviewerName: 'reviewerName',
      product: 'product.title',
    },
    prepare({title, rating, reviewerName, product}) {
      return {
        title,
        subtitle: `${rating}⭐ by ${reviewerName} - ${product}`,
      }
    },
  },
})
