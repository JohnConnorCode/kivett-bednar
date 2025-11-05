import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const promoCode = defineType({
  name: 'promoCode',
  title: 'Promo Code',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'string',
      description: 'The promo code customers will enter (e.g., "BLUES20")',
      validation: (Rule) => Rule.required().uppercase().min(3).max(20),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Internal description of this promo code',
    }),
    defineField({
      name: 'discountType',
      title: 'Discount Type',
      type: 'string',
      options: {
        list: [
          {title: 'Percentage', value: 'percentage'},
          {title: 'Fixed Amount', value: 'fixed'},
          {title: 'Free Shipping', value: 'free_shipping'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'discountValue',
      title: 'Discount Value',
      type: 'number',
      description: 'Percentage (e.g., 20 for 20% off) or cents (e.g., 1000 for $10 off)',
    }),
    defineField({
      name: 'minimumPurchaseCents',
      title: 'Minimum Purchase (cents)',
      type: 'number',
      description: 'Minimum order total required to use this code',
    }),
    defineField({
      name: 'maxUses',
      title: 'Maximum Uses',
      type: 'number',
      description: 'Total number of times this code can be used (-1 for unlimited)',
      initialValue: -1,
    }),
    defineField({
      name: 'currentUses',
      title: 'Current Uses',
      type: 'number',
      description: 'Number of times this code has been used',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Is this promo code currently active?',
      initialValue: true,
    }),
    defineField({
      name: 'validFrom',
      title: 'Valid From',
      type: 'datetime',
      description: 'When this promo code becomes valid',
    }),
    defineField({
      name: 'validUntil',
      title: 'Valid Until',
      type: 'datetime',
      description: 'When this promo code expires',
    }),
    defineField({
      name: 'applicableProducts',
      title: 'Applicable Products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      description: 'Leave empty to apply to all products',
    }),
    defineField({
      name: 'applicableCategories',
      title: 'Applicable Categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Apparel', value: 'apparel'},
          {title: 'Music', value: 'music'},
          {title: 'Accessories', value: 'accessories'},
          {title: 'Posters & Prints', value: 'prints'},
        ],
      },
      description: 'Leave empty to apply to all categories',
    }),
  ],
  preview: {
    select: {
      code: 'code',
      discountType: 'discountType',
      discountValue: 'discountValue',
      active: 'active',
    },
    prepare({code, discountType, discountValue, active}) {
      let discount = ''
      if (discountType === 'percentage') {
        discount = `${discountValue}% off`
      } else if (discountType === 'fixed') {
        discount = `$${(discountValue / 100).toFixed(2)} off`
      } else {
        discount = 'Free shipping'
      }
      return {
        title: code,
        subtitle: `${discount} ${active ? '✓ Active' : '✗ Inactive'}`,
      }
    },
  },
})
