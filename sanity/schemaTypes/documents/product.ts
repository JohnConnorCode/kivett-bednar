import {PackageIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Product schema for POD (Print on Demand) merch via Gelato
 * Includes variant management, pricing, and Gelato integration fields
 */
export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1).error('At least one image is required'),
    }),
    defineField({
      name: 'priceCents',
      title: 'Price (cents)',
      type: 'number',
      description: 'Price in cents (e.g., 2500 = $25.00)',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'USD',
      options: {
        list: [
          {title: 'USD', value: 'USD'},
          {title: 'EUR', value: 'EUR'},
          {title: 'GBP', value: 'GBP'},
        ],
      },
    }),
    defineField({
      name: 'options',
      title: 'Product Options',
      type: 'array',
      description: 'Options like Size, Color, etc.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Option Name',
              type: 'string',
              description: 'e.g., "Size", "Color"',            }),
            defineField({
              name: 'values',
              title: 'Values',
              type: 'array',
              of: [{type: 'string'}],
              description: 'e.g., ["Small", "Medium", "Large"]',            }),
          ],
          preview: {
            select: {
              name: 'name',
              values: 'values',
            },
            prepare({name, values}) {
              return {
                title: name,
                subtitle: values?.join(', '),
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      description: 'Product variants with option combinations',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'optionValues',
              title: 'Option Values',
              type: 'array',
              description: 'Key-value pairs like Size: Medium, Color: Black',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'key',
                      title: 'Option Name',
                      type: 'string',
                      description: 'e.g., "Size", "Color"',
                    }),
                    defineField({
                      name: 'value',
                      title: 'Option Value',
                      type: 'string',
                      description: 'e.g., "Medium", "Black"',
                    }),
                  ],
                }),
              ],
            }),
            defineField({
              name: 'priceCents',
              title: 'Price Override (cents)',
              type: 'number',
              description: 'Optional price override for this variant',
            }),
            defineField({
              name: 'sku',
              title: 'SKU',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              optionValues: 'optionValues',
              priceCents: 'priceCents',
            },
            prepare({optionValues, priceCents}) {
              const values = optionValues && Array.isArray(optionValues)
                ? optionValues
                    .map((opt: {key?: string; value?: string}) => `${opt.key}: ${opt.value}`)
                    .join(', ')
                : 'No options'
              const price = priceCents ? ` - $${(priceCents / 100).toFixed(2)}` : ''
              return {
                title: values,
                subtitle: `Variant${price}`,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'gelatoProductUid',
      title: 'Gelato Product UID',
      type: 'string',
      description: 'Gelato product identifier for fulfillment',    }),
    defineField({
      name: 'printAreas',
      title: 'Print Areas',
      type: 'array',
      description: 'Define artwork for each print area (front, back, etc.)',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'areaName',
              title: 'Area Name',
              type: 'string',
              description: 'e.g., "front", "back"',            }),
            defineField({
              name: 'artwork',
              title: 'Artwork',
              type: 'image',
              description: 'High-resolution artwork for this print area',            }),
          ],
          preview: {
            select: {
              areaName: 'areaName',
              media: 'artwork',
            },
            prepare({areaName, media}) {
              return {
                title: areaName || 'Print Area',
                media,
              }
            },
          },
        }),
      ],    }),
    defineField({
      name: 'shippingNotes',
      title: 'Shipping Notes',
      type: 'text',
      rows: 3,
      description: 'Display shipping time estimates, international availability, etc.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'SEO Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'SEO Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      priceCents: 'priceCents',
      currency: 'currency',
      media: 'images.0',
    },
    prepare({title, priceCents, currency, media}) {
      const price = priceCents ? `${currency} $${(priceCents / 100).toFixed(2)}` : 'No price'
      return {
        title,
        subtitle: price,
        media,
      }
    },
  },
})
