'use client'

import {useState} from 'react'

type FAQItem = {
  _key: string
  question?: string
  answer?: string
}

type FAQProps = {
  heading?: string
  items?: FAQItem[]
}

export function FAQ({heading, items = []}: FAQProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="container mx-auto px-4 py-16">
      {heading && (
        <h2 className="text-4xl font-bold text-center mb-10 text-text-primary">{heading}</h2>
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

