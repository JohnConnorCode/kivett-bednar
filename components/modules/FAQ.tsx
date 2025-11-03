'use client'

import {useState} from 'react'

type FAQItem = {
  _key: string
  question?: string
  answer?: string
}

type FAQProps = {
  heading?: string
  headingTracking?: string
  headingLineHeight?: string
  backgroundVariant?: string
  sectionPadding?: string
  items?: FAQItem[]
}

function sectionClasses(variant?: string, pad?: string) {
  const bg =
    variant === 'surface' ? 'bg-surface' :
    variant === 'surface-elevated' ? 'bg-surface-elevated' :
    variant === 'dark-gradient' ? 'bg-gradient-to-b from-background via-surface to-surface-elevated' :
    ''
  const py =
    pad === 'none' ? 'py-0' :
    pad === 'sm' ? 'py-8' :
    pad === 'md' ? 'py-16' :
    pad === 'lg' ? 'py-24' :
    pad === 'xl' ? 'py-32' :
    'py-16'
  return `${bg} ${py}`.trim()
}

const trackingMap: Record<string, string> = {
  'tracking-tighter': 'tracking-tighter',
  'tracking-tight': 'tracking-tight',
  'tracking-normal': 'tracking-normal',
  'tracking-wide': 'tracking-wide',
  'tracking-wider': 'tracking-wider',
  'tracking-widest': 'tracking-widest',
}
const leadingMap: Record<string, string> = {
  'leading-none': 'leading-none',
  'leading-tight': 'leading-tight',
  'leading-snug': 'leading-snug',
  'leading-normal': 'leading-normal',
  'leading-relaxed': 'leading-relaxed',
}

export function FAQ({heading, headingTracking = 'tracking-tight', headingLineHeight = 'leading-tight', backgroundVariant, sectionPadding, items = []}: FAQProps) {
  if (!items || items.length === 0) return null

  return (
    <section className={`container mx-auto px-4 ${sectionClasses(backgroundVariant, sectionPadding)}`}>
      {heading && (
        <h2 className={`text-4xl font-bold text-center mb-10 text-text-primary ${trackingMap[headingTracking] || ''} ${leadingMap[headingLineHeight] || ''}`}>{heading}</h2>
      )}
      <div className="max-w-3xl mx-auto divide-y divide-border rounded-xl overflow-hidden border border-border bg-surface">
        {items.map((qa, idx) => (
          <Disclosure key={qa._key || idx} question={qa.question} answer={qa.answer} />
        ))}
      </div>
    </section>
  )
}

function Disclosure({question, answer}: {question?: string; answer?: string}) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-surface-elevated transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-text-primary">{question}</span>
        <span className="text-accent-primary">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-text-secondary">
          <p className="leading-relaxed whitespace-pre-wrap">{answer}</p>
        </div>
      )}
    </div>
  )
}
