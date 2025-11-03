import React from 'react'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',    }),
    defineField({
      name: 'headlineDesktopSize',
      title: 'Headline Size (Desktop)',
      type: 'string',
      description: 'Text size for headline on desktop screens',
      initialValue: 'text-7xl',
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
      components: {
        input: (props) => {
          const value = (props.value as string) || 'text-7xl'
          const pxMap: Record<string, number> = {
            'text-4xl': 36,
            'text-5xl': 48,
            'text-6xl': 60,
            'text-7xl': 72,
            'text-8xl': 96,
            'text-9xl': 128,
          }
          const fontSize = pxMap[value] || 72
          return (
            <div>
              {props.renderDefault(props)}
              <div style={{marginTop: 8, padding: 8, background: '#f7f7f7', borderRadius: 6}}>
                <div style={{fontSize, lineHeight: 1.1, fontWeight: 700}}>Desktop preview size</div>
              </div>
            </div>
          )
        },
      },
    }),
    defineField({
      name: 'headlineMobileSize',
      title: 'Headline Size (Mobile)',
      type: 'string',
      description: 'Text size for headline on mobile screens',
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
      components: {
        input: (props) => {
          const value = (props.value as string) || 'text-5xl'
          const pxMap: Record<string, number> = {
            'text-2xl': 24,
            'text-3xl': 30,
            'text-4xl': 36,
            'text-5xl': 48,
            'text-6xl': 60,
            'text-7xl': 72,
          }
          const fontSize = pxMap[value] || 48
          return (
            <div>
              {props.renderDefault(props)}
              <div style={{marginTop: 8, padding: 8, background: '#f7f7f7', borderRadius: 6}}>
                <div style={{fontSize, lineHeight: 1.1, fontWeight: 700}}>Mobile preview size</div>
              </div>
            </div>
          )
        },
      },
    }),
    defineField({
      name: 'headlineTracking',
      title: 'Headline Letter Spacing',
      type: 'string',
      initialValue: 'tracking-tight',
      options: {
        list: [
          {title: 'Tighter', value: 'tracking-tighter'},
          {title: 'Tight', value: 'tracking-tight'},
          {title: 'Normal', value: 'tracking-normal'},
          {title: 'Wide', value: 'tracking-wide'},
          {title: 'Wider', value: 'tracking-wider'},
          {title: 'Widest', value: 'tracking-widest'},
        ],
        layout: 'dropdown',
      },
      components: {
        input: (props) => {
          const value = (props.value as string) || 'tracking-tight'
          const letterSpacingMap: Record<string, string> = {
            'tracking-tighter': '-0.05em',
            'tracking-tight': '-0.025em',
            'tracking-normal': '0',
            'tracking-wide': '0.025em',
            'tracking-wider': '0.05em',
            'tracking-widest': '0.1em',
          }
          const letterSpacing = letterSpacingMap[value] || '-0.025em'
          return (
            <div>
              {props.renderDefault(props)}
              <div style={{marginTop: 8, padding: 8, background: '#f7f7f7', borderRadius: 6}}>
                <div style={{fontSize: 28, letterSpacing, fontWeight: 700}}>Letter spacing preview</div>
              </div>
            </div>
          )
        },
      },
    }),
    defineField({
      name: 'headlineLineHeight',
      title: 'Headline Line Height',
      type: 'string',
      initialValue: 'leading-none',
      options: {
        list: [
          {title: 'None', value: 'leading-none'},
          {title: 'Tight', value: 'leading-tight'},
          {title: 'Snug', value: 'leading-snug'},
          {title: 'Normal', value: 'leading-normal'},
          {title: 'Relaxed', value: 'leading-relaxed'},
        ],
        layout: 'dropdown',
      },
      components: {
        input: (props) => {
          const value = (props.value as string) || 'leading-none'
          const lineHeightMap: Record<string, number> = {
            'leading-none': 1,
            'leading-tight': 1.25,
            'leading-snug': 1.375,
            'leading-normal': 1.5,
            'leading-relaxed': 1.625,
          }
          const lineHeight = lineHeightMap[value] || 1
          return (
            <div>
              {props.renderDefault(props)}
              <div style={{marginTop: 8, padding: 8, background: '#f7f7f7', borderRadius: 6}}>
                <div style={{fontSize: 24, lineHeight, fontWeight: 700}}>Line height preview (two lines)\nSecond line here</div>
              </div>
            </div>
          )
        },
      },
    }),
    defineField({
      name: 'subhead',
      title: 'Subheadline',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'subheadTracking',
      title: 'Subheadline Letter Spacing',
      type: 'string',
      initialValue: 'tracking-normal',
      options: {
        list: [
          {title: 'Tighter', value: 'tracking-tighter'},
          {title: 'Tight', value: 'tracking-tight'},
          {title: 'Normal', value: 'tracking-normal'},
          {title: 'Wide', value: 'tracking-wide'},
          {title: 'Wider', value: 'tracking-wider'},
          {title: 'Widest', value: 'tracking-widest'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'subheadLineHeight',
      title: 'Subheadline Line Height',
      type: 'string',
      initialValue: 'leading-normal',
      options: {
        list: [
          {title: 'None', value: 'leading-none'},
          {title: 'Tight', value: 'leading-tight'},
          {title: 'Snug', value: 'leading-snug'},
          {title: 'Normal', value: 'leading-normal'},
          {title: 'Relaxed', value: 'leading-relaxed'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'image',
      title: 'Desktop Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',        }),
      ],
      hidden: ({parent}) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'mobileImage',
      title: 'Mobile Image (Optional)',
      type: 'image',
      description: 'Different image for mobile devices. If not set, desktop image will be used.',
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
      hidden: ({parent}) => parent?.mediaType !== 'image',
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
      hidden: ({parent}) => parent?.mediaType !== 'image',
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
      hidden: ({parent}) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'video',
      title: 'Video URL',
      type: 'url',
      description: 'Video file URL (MP4, WebM, etc.)',
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'backgroundVariant',
      title: 'Background Variant',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Surface', value: 'surface'},
          {title: 'Surface Elevated', value: 'surface-elevated'},
          {title: 'Dark Gradient', value: 'dark-gradient'},
        ],
      },
    }),
    defineField({
      name: 'sectionPadding',
      title: 'Section Vertical Padding',
      type: 'string',
      initialValue: 'lg',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Small', value: 'sm'},
          {title: 'Medium', value: 'md'},
          {title: 'Large', value: 'lg'},
          {title: 'XL', value: 'xl'},
        ],
      },
    }),
    defineField({
      name: 'ctas',
      title: 'Call to Actions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',            }),
            defineField({
              name: 'href',
              title: 'URL',
              type: 'string',            }),
            defineField({
              name: 'variant',
              title: 'Variant',
              type: 'string',
              options: {
                list: [
                  {title: 'Primary', value: 'primary'},
                  {title: 'Secondary', value: 'secondary'},
                  {title: 'Outline', value: 'outline'},
                ],
              },
              initialValue: 'primary',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
      media: 'image',
    },
    prepare({headline, media}) {
      return {
        title: headline || 'Hero',
        subtitle: 'Hero Module',
        media,
      }
    },
  },
})
