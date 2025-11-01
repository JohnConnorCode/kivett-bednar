import {PortableText} from '@portabletext/react'

type RichTextProps = {
  content: any
}

export function RichText({content}: RichTextProps) {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="prose prose-lg max-w-3xl mx-auto">
        <PortableText value={content} />
      </div>
    </section>
  )
}
