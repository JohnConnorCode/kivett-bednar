'use client'

import Image from 'next/image'
import {urlFor} from '@/lib/image-positioning'
import {useState, useEffect} from 'react'
import {getObjectPosition, type SanityImageWithPositioning} from '@/lib/image-positioning'

type FeatureGridProps = {
  items: Array<{
    title: string
    body?: string
    iconType?: 'image' | 'icon'
    icon?: string
    image?: SanityImageWithPositioning
  }>
}

export function FeatureGrid({items}: FeatureGridProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
                  sizes="64px"
                  style={{
                    objectPosition: getObjectPosition(item.image, isMobile)
                  }}
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
