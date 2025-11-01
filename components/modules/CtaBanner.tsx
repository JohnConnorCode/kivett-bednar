type CtaBannerProps = {
  heading: string
  body?: string
  cta?: {
    label: string
    href: string
  }
}

export function CtaBanner({heading, body, cta}: CtaBannerProps) {
  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
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
