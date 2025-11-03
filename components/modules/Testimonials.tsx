'use client'

import Image from 'next/image'
import {getObjectPosition, type SanityImageWithPositioning} from '@/lib/image-positioning'
import {useEffect, useState} from 'react'

type TestimonialItem = {
  _key: string
  name?: string
  role?: string
  quote?: string
  image?: (SanityImageWithPositioning & {alt?: string}) | null
}

type TestimonialsProps = {
  heading?: string
  items?: TestimonialItem[]
}

export function Testimonials({heading, items = []}: TestimonialsProps) {
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
      {heading && (
        <h2 className="text-4xl font-bold text-center mb-12 text-text-primary">{heading}</h2>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((t, idx) => (
          <div key={t._key || idx} className="bg-surface rounded-xl p-6 border-2 border-accent-primary/20 shadow">
            {t.image?.asset?.url && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4">
                <Image
                  src={t.image.asset.url}
                  alt={t.image.alt || t.name || 'Testimonial'}
                  fill
                  className="object-cover"
                  sizes="64px"
                  style={{objectPosition: getObjectPosition(t.image, isMobile)}}
                />
              </div>
            )}
            {t.quote && (
              <blockquote className="text-text-primary italic mb-4">“{t.quote}”</blockquote>
            )}
            <div className="text-text-secondary text-sm">
              {t.name && <div className="font-semibold text-text-primary">{t.name}</div>}
              {t.role && <div>{t.role}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )}

