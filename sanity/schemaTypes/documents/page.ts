import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

/**
 * Page schema.  Define and edit the fields for the 'page' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'modules',
      title: 'Page Modules',
      type: 'array',
      of: [
        {type: 'hero'},
        {type: 'richText'},
        {type: 'imageGallery'},
        {type: 'featureGrid'},
        {type: 'ctaBanner'},
        {type: 'videoEmbed'},
        {type: 'musicEmbed'},
        {type: 'callToAction'},
        {type: 'infoSection'},
      ],
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) =>
                `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
            },
          ],
        },
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'SEO Title',
          type: 'string',
          description: 'If empty, defaults to page name',
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
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      return {
        title,
        subtitle: `/${slug || ''}`,
      }
    },
  },
})
