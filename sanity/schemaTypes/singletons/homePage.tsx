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
              title: 'Desktop Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'mobileImage',
              title: 'Mobile Image (Optional)',
              type: 'image',
              description: 'Different image for mobile devices. If not set, desktop image will be used.',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for accessibility',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'desktopPosition',
              title: 'Desktop Position (Optional)',
              type: 'string',
              description: 'Override image position on desktop screens',
              options: {
                list: [
                  {title: 'Top Left', value: 'top-left'},
                  {title: 'Top Center', value: 'top-center'},
                  {title: 'Top Right', value: 'top-right'},
                  {title: 'Center Left', value: 'center-left'},
                  {title: 'Center', value: 'center'},
                  {title: 'Center Right', value: 'center-right'},
                  {title: 'Bottom Left', value: 'bottom-left'},
                  {title: 'Bottom Center', value: 'bottom-center'},
                  {title: 'Bottom Right', value: 'bottom-right'},
                ],
                layout: 'dropdown',
              },
            }),
            defineField({
              name: 'mobilePosition',
              title: 'Mobile Position (Optional)',
              type: 'string',
              description: 'Override image position on mobile screens',
              options: {
                list: [
                  {title: 'Top Left', value: 'top-left'},
                  {title: 'Top Center', value: 'top-center'},
                  {title: 'Top Right', value: 'top-right'},
                  {title: 'Center Left', value: 'center-left'},
                  {title: 'Center', value: 'center'},
                  {title: 'Center Right', value: 'center-right'},
                  {title: 'Bottom Left', value: 'bottom-left'},
                  {title: 'Bottom Center', value: 'bottom-center'},
                  {title: 'Bottom Right', value: 'bottom-right'},
                ],
                layout: 'dropdown',
              },
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
      name: 'heroHeadingDesktopSize',
      title: 'Hero Heading Size (Desktop)',
      type: 'string',
      description: 'Text size for hero heading on desktop screens',
      initialValue: 'text-8xl',
      options: {
        list: [
          {title: 'Extra Small (4xl)', value: 'text-4xl'},
          {title: 'Small (5xl)', value: 'text-5xl'},
          {title: 'Medium (6xl)', value: 'text-6xl'},
          {title: 'Large (7xl)', value: 'text-7xl'},
          {title: 'Extra Large (8xl)', value: 'text-8xl'},
          {title: 'Huge (9xl)', value: 'text-9xl'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'heroHeadingMobileSize',
      title: 'Hero Heading Size (Mobile)',
      type: 'string',
      description: 'Text size for hero heading on mobile screens',
      initialValue: 'text-5xl',
      options: {
        list: [
          {title: 'Extra Small (2xl)', value: 'text-2xl'},
          {title: 'Small (3xl)', value: 'text-3xl'},
          {title: 'Medium (4xl)', value: 'text-4xl'},
          {title: 'Large (5xl)', value: 'text-5xl'},
          {title: 'Extra Large (6xl)', value: 'text-6xl'},
          {title: 'Huge (7xl)', value: 'text-7xl'},
        ],
        layout: 'dropdown',
      },
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

    // Featured Video Section
    defineField({
      name: 'featuredVideoHeading',
      title: 'Featured Video Section Heading',
      type: 'string',
      description: 'Heading for featured video section (e.g., "Live Performance")',
      initialValue: 'Live Performance',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredVideoSubheading',
      title: 'Featured Video Section Subheading',
      type: 'string',
      description: 'Subheading for featured video section',
      initialValue: 'Experience the authentic blues sound',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredVideoUrl',
      title: 'Featured Video URL',
      type: 'url',
      description: 'YouTube video ID or full URL for the featured "Live Performance" video (e.g., https://www.youtube.com/watch?v=75M50Bfksa0 or just 75M50Bfksa0)',
      validation: (rule) => rule.required(),
    }),

    // Booking Section
    defineField({
      name: 'bookingSectionHeading',
      title: 'Booking Section Heading',
      type: 'string',
      description: 'Main heading for booking section',
      initialValue: 'Book Kivett for Your Event',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bookingSectionIntro',
      title: 'Booking Section Introduction',
      type: 'text',
      rows: 2,
      description: 'Introduction text for booking section',
      initialValue: 'Available for festivals, private events, and venue bookings. Professional blues performance with authentic Texas style meets Pacific Northwest soul.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bookingInquiriesHeading',
      title: 'Booking Inquiries Heading',
      type: 'string',
      description: 'Heading for booking inquiries box',
      initialValue: 'Booking Inquiries',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bookingInquiriesText',
      title: 'Booking Inquiries Text',
      type: 'text',
      rows: 2,
      description: 'Instructional text for booking inquiries',
      initialValue: 'For booking inquiries, please contact Kivett directly via email:',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bookingInquiryListHeading',
      title: 'Booking Inquiry List Heading',
      type: 'string',
      description: 'Heading for inquiry requirements list',
      initialValue: 'Include in Your Inquiry:',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bookingInquiryItems',
      title: 'Booking Inquiry Items',
      type: 'array',
      description: 'List of items to include in booking inquiry',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      initialValue: [
        'Event date and location',
        'Type of event (festival, private party, venue, etc.)',
        'Expected audience size',
        'Performance duration needed',
      ],
    }),
    defineField({
      name: 'bookingPerfectForHeading',
      title: 'Booking "Perfect For" Heading',
      type: 'string',
      description: 'Heading for event types list',
      initialValue: 'Perfect For',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bookingEventTypes',
      title: 'Booking Event Types',
      type: 'array',
      description: 'List of event types suitable for booking',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      initialValue: [
        'Blues Festivals & Music Events',
        'Private Parties & Celebrations',
        'Corporate Events',
        'Venue Residencies',
      ],
    }),
    defineField({
      name: 'bookingTestimonialQuote',
      title: 'Booking Testimonial Quote',
      type: 'text',
      rows: 3,
      description: 'Testimonial quote for booking section',
      initialValue: 'Kivett brings authentic blues energy that connects with every audience. His performance at our festival was unforgettable.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bookingTestimonialAttribution',
      title: 'Booking Testimonial Attribution',
      type: 'string',
      description: 'Attribution for testimonial',
      initialValue: '— Festival Organizer',
      validation: (rule) => rule.required(),
    }),

    // Studio Section
    defineField({
      name: 'studioSectionHeading',
      title: 'Studio Section Heading',
      type: 'string',
      description: 'Heading for studio videos section',
      initialValue: 'In The Studio',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'studioSectionSubheading',
      title: 'Studio Section Subheading',
      type: 'string',
      description: 'Subheading for studio videos section',
      initialValue: 'Behind the scenes of creating authentic Texas blues',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'studioVideo1Url',
      title: 'Studio Video 1 URL',
      type: 'url',
      description: 'YouTube video ID or full URL for first studio session video',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'studioVideo2Url',
      title: 'Studio Video 2 URL',
      type: 'url',
      description: 'YouTube video ID or full URL for second studio session video',
      validation: (rule) => rule.required(),
    }),

    // Newsletter Section
    defineField({
      name: 'newsletterHeading',
      title: 'Newsletter Section Heading',
      type: 'string',
      description: 'Heading for newsletter signup section',
      initialValue: 'Stay Connected',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'newsletterText',
      title: 'Newsletter Section Text',
      type: 'text',
      rows: 2,
      description: 'Description text for newsletter signup',
      initialValue: 'Get the latest show announcements, new music releases, and exclusive content delivered to your inbox.',
      validation: (rule) => rule.required(),
    }),

    // Button Labels
    defineField({
      name: 'heroButtonText',
      title: 'Hero Button Text',
      type: 'string',
      description: 'Button text in hero slider (links to shows page)',
      initialValue: 'See Live Shows',
    }),
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
