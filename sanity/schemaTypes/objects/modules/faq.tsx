import React from 'react'
import {defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'set',
      title: 'Use FAQ Set',
      type: 'reference',
      to: [{type: 'faqSet'}],
      description: 'Optional: reference a reusable FAQ set instead of defining items here',
    }),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({
      name: 'headingTracking',
      title: 'Heading Letter Spacing',
      type: 'string',
      initialValue: 'tracking-tight',
      options: {list: [
        {title: 'Tighter', value: 'tracking-tighter'},
        {title: 'Tight', value: 'tracking-tight'},
        {title: 'Normal', value: 'tracking-normal'},
        {title: 'Wide', value: 'tracking-wide'},
        {title: 'Wider', value: 'tracking-wider'},
        {title: 'Widest', value: 'tracking-widest'},
      ]},
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
                <div style={{fontSize: 20, letterSpacing, fontWeight: 700}}>Heading spacing preview</div>
              </div>
            </div>
          )
        },
      },
    }),
    defineField({
      name: 'headingLineHeight',
      title: 'Heading Line Height',
      type: 'string',
      initialValue: 'leading-tight',
      options: {list: [
        {title: 'None', value: 'leading-none'},
        {title: 'Tight', value: 'leading-tight'},
        {title: 'Snug', value: 'leading-snug'},
        {title: 'Normal', value: 'leading-normal'},
        {title: 'Relaxed', value: 'leading-relaxed'},
      ]},
      components: {
        input: (props) => {
          const value = (props.value as string) || 'leading-tight'
          const lineHeightMap: Record<string, number> = {
            'leading-none': 1,
            'leading-tight': 1.25,
            'leading-snug': 1.375,
            'leading-normal': 1.5,
            'leading-relaxed': 1.625,
          }
          const lineHeight = lineHeightMap[value] || 1.25
          return (
            <div>
              {props.renderDefault(props)}
              <div style={{marginTop: 8, padding: 8, background: '#f7f7f7', borderRadius: 6}}>
                <div style={{fontSize: 18, lineHeight, fontWeight: 700}}>Heading line-height preview\nSecond line</div>
              </div>
            </div>
          )
        },
      },
    }),
    defineField({
      name: 'backgroundVariant',
      title: 'Background Variant',
      type: 'string',
      initialValue: 'default',
      options: {list: [
        {title: 'Default', value: 'default'},
        {title: 'Surface', value: 'surface'},
        {title: 'Surface Elevated', value: 'surface-elevated'},
        {title: 'Dark Gradient', value: 'dark-gradient'},
      ]},
    }),
    defineField({
      name: 'sectionPadding',
      title: 'Section Vertical Padding',
      type: 'string',
      initialValue: 'lg',
      options: {list: [
        {title: 'None', value: 'none'},
        {title: 'Small', value: 'sm'},
        {title: 'Medium', value: 'md'},
        {title: 'Large', value: 'lg'},
        {title: 'XL', value: 'xl'},
      ]},
    }),
    defineField({
      name: 'items',
      title: 'Questions',
      type: 'array',
      hidden: ({parent}) => Boolean(parent?.set),
      of: [
        defineField({
          name: 'qa',
          type: 'object',
          fields: [
            defineField({name: 'question', title: 'Question', type: 'string'}),
            defineField({name: 'answer', title: 'Answer', type: 'text', rows: 4}),
          ],
          preview: {
            select: {title: 'question'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading', hasSet: 'set._ref'},
    prepare({title}) {
      return {title: title || 'FAQ'}
    },
  },
})
