import {HomeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Home Page singleton schema - content for the homepage
 */

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'heroSlides',
      title: 'Hero Slider Images',
      type: 'array',
      description: 'Images for the hero slider (recommended: 4-6 high-quality images)',
      validation: (rule) => rule.required().min(1).max(10),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'slide',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for accessibility',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'alt',
              media: 'image',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      description: 'Main heading text (e.g., "Kivett Bednar")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'string',
      description: 'Subheading text (e.g., "Blues • Guitar • Portland")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'text',
      rows: 2,
      description: 'Short tagline below subheading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aboutHeading',
      title: 'About Section Heading',
      type: 'string',
      description: 'Heading for the about section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aboutText',
      title: 'About Section Text',
      type: 'text',
      rows: 4,
      description: 'Bio/description text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Section Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'albumTitle',
      title: 'Featured Album Title',
      type: 'string',
      description: 'Title of featured album',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'albumYear',
      title: 'Album Year',
      type: 'string',
      description: 'Year released',
    }),
    defineField({
      name: 'albumFormat',
      title: 'Album Format',
      type: 'string',
      description: 'Format description (e.g., "Limited Edition Red Vinyl")',
    }),
    defineField({
      name: 'albumDescription',
      title: 'Album Description',
      type: 'text',
      rows: 3,
      description: 'Description of the album',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'albumImage',
      title: 'Album Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'albumFeatures',
      title: 'Album Features',
      type: 'array',
      description: 'Key features or highlights of the album',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'ctaLessonsHeading',
      title: 'Lessons CTA Heading',
      type: 'string',
      description: 'Heading for lessons call-to-action section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLessonsText',
      title: 'Lessons CTA Text',
      type: 'text',
      rows: 2,
      description: 'Text for lessons call-to-action',
      validation: (rule) => rule.required(),
    }),

    // Parallax Section
    defineField({
      name: 'parallaxHeading',
      title: 'Parallax Section Heading',
      type: 'string',
      description: 'Main heading for parallax section (e.g., "Gritty Texas Blues")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'parallaxSubheading',
      title: 'Parallax Section Subheading',
      type: 'string',
      description: 'Subheading for parallax section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'parallaxImages',
      title: 'Parallax Background Images',
      type: 'array',
      description: 'Images for parallax section (recommended: 2 images)',
      validation: (rule) => rule.required().min(1).max(3),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'parallaxImage',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'position',
              title: 'Position',
              type: 'string',
              options: {
                list: [
                  {title: 'Left', value: 'left'},
                  {title: 'Right', value: 'right'},
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'offset',
              title: 'Vertical Offset (optional)',
              type: 'number',
              description: 'Pixels to offset vertically for visual variety',
            }),
          ],
          preview: {
            select: {
              title: 'alt',
              subtitle: 'position',
              media: 'image',
            },
          },
        }),
      ],
    }),

    // Live Performance Section
    defineField({
      name: 'performanceSectionHeading',
      title: 'Performance Section Heading',
      type: 'string',
      description: 'Heading for live performances section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'performanceImage',
      title: 'Performance Image',
      type: 'image',
      description: 'Featured performance image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    // Gallery Section
    defineField({
      name: 'gallerySectionHeading',
      title: 'Gallery Section Heading',
      type: 'string',
      description: 'Main heading for gallery section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallerySectionSubheading',
      title: 'Gallery Section Subheading',
      type: 'string',
      description: 'Subtitle for gallery section',
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      description: 'Floating gallery images (recommended: 6-8 images)',
      validation: (rule) => rule.required().min(4).max(12),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'galleryImage',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'width',
              title: 'Image Width',
              type: 'number',
              description: 'Original image width in pixels',
              validation: (rule) => rule.required().min(100),
            }),
            defineField({
              name: 'height',
              title: 'Image Height',
              type: 'number',
              description: 'Original image height in pixels',
              validation: (rule) => rule.required().min(100),
            }),
          ],
          preview: {
            select: {
              title: 'alt',
              subtitle: 'width',
              media: 'image',
            },
            prepare({title, subtitle}) {
              return {
                title,
                subtitle: subtitle ? `${subtitle}px wide` : 'No dimensions',
              }
            },
          },
        }),
      ],
    }),

    // Upcoming Shows Section
    defineField({
      name: 'upcomingShowsHeading',
      title: 'Upcoming Shows Heading',
      type: 'string',
      description: 'Heading for upcoming shows section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seeAllShowsLinkText',
      title: 'See All Shows Link Text',
      type: 'string',
      description: 'Link text for viewing all shows',
      initialValue: 'See all shows →',
    }),

    // Button Labels
    defineField({
      name: 'aboutButtonText',
      title: 'About Section Button Text',
      type: 'string',
      description: 'Button text in about section (links to setlist)',
      initialValue: 'View Setlist',
    }),
    defineField({
      name: 'ctaLessonsButtonText',
      title: 'Lessons CTA Button Text',
      type: 'string',
      description: 'Button text for lessons call-to-action',
      initialValue: 'Schedule Your First Lesson',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
      }
    },
  },
})
