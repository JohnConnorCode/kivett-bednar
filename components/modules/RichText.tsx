import {PortableText} from '@portabletext/react'

type RichTextProps = {
  content: any
  backgroundVariant?: string
  sectionPadding?: string
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

export function RichText({content, backgroundVariant, sectionPadding}: RichTextProps) {
  return (
    <section className={`container mx-auto px-4 ${sectionClasses(backgroundVariant, sectionPadding)}`}>
      <div className="prose prose-lg max-w-3xl mx-auto">
        <PortableText value={content} />
      </div>
    </section>
  )
}
