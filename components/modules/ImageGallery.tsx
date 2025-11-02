'use client'

import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'
import {useState, useEffect} from 'react'
import {getObjectPosition, type SanityImageWithPositioning} from '@/lib/image-positioning'

type ImageGalleryProps = {
  images: Array<SanityImageWithPositioning & {
    alt: string
    caption?: string
  }>
}

export function ImageGallery({images}: ImageGalleryProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!images || images.length === 0) return null

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, idx) => (
          <div key={idx} className="group relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={urlFor(image.asset).width(800).height(600).url()}
              alt={image.alt || ''}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              style={{
                objectPosition: getObjectPosition(image, isMobile)
              }}
            />
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white text-sm">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
