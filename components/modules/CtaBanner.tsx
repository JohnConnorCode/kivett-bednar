type CtaBannerProps = {
  heading: string
  headingTracking?: string
  headingLineHeight?: string
  body?: string
  backgroundVariant?: string
  sectionPadding?: string
  cta?: {
    label: string
    href: string
  }
}

function sectionClasses(variant?: string, pad?: string) {
  const bg =
    variant === 'surface' ? 'bg-surface' :
    variant === 'surface-elevated' ? 'bg-surface-elevated' :
    variant === 'dark-gradient' ? 'bg-gradient-to-b from-background via-surface to-surface-elevated' :
    'bg-primary text-primary-foreground'
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

export function CtaBanner({heading, headingTracking = 'tracking-tight', headingLineHeight = 'leading-tight', body, backgroundVariant, sectionPadding, cta}: CtaBannerProps) {
  return (
    <section className={sectionClasses(backgroundVariant, sectionPadding)}>
      <div className="container mx-auto px-4 text-center">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${trackingMap[headingTracking] || ''} ${leadingMap[headingLineHeight] || ''}`}>{heading}</h2>
        {body && <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">{body}</p>}
        {cta && (
          <a
            href={cta.href}
            className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-md font-semibold hover:bg-accent/90 transition-colors"
          >
            {cta.label}
          </a>
        )}
      </div>
    </section>
  )
}
