import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'

type FeatureGridProps = {
  items: Array<{
    title: string
    body?: string
    iconType?: 'image' | 'icon'
    icon?: string
    image?: {
      asset: any
    }
  }>
}

export function FeatureGrid({items}: FeatureGridProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, idx) => (
          <div key={idx} className="text-center p-6">
            {item.iconType === 'image' && item.image?.asset && (
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <Image
                  src={urlFor(item.image.asset).width(64).height(64).url()}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            )}
            {item.iconType === 'icon' && item.icon && (
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-accent">
                <span className="text-4xl">{item.icon}</span>
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            {item.body && <p className="text-muted-foreground">{item.body}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
