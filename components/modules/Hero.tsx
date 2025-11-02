'use client'

import Image from 'next/image'
import {urlFor} from '@/lib/image-positioning'
import {cn} from '@/lib/utils'
import {useState, useEffect} from 'react'
import {getObjectPosition, type SanityImageWithPositioning} from '@/lib/image-positioning'

type HeroProps = {
  headline: string
  subhead?: string
  mediaType?: 'image' | 'video'
  image?: SanityImageWithPositioning & {
    alt: string
  }
  video?: string
  ctas?: Array<{
    label: string
    href: string
    variant?: 'primary' | 'secondary' | 'outline'
  }>
}

export function Hero({headline, subhead, mediaType = 'image', image, video, ctas}: HeroProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      {mediaType === 'image' && image?.asset && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(image.asset).url()}
            alt={image.alt || ''}
            fill
            className="object-cover"
            priority
            style={{
              objectPosition: getObjectPosition(image, isMobile)
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        </div>
      )}

      {mediaType === 'video' && video && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          {headline}
        </h1>
        {subhead && (
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white/90">
            {subhead}
          </p>
        )}
        {ctas && ctas.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center">
            {ctas.map((cta, idx) => (
              <a
                key={idx}
                href={cta.href}
                className={cn(
                  'px-8 py-3 rounded-md font-semibold transition-all',
                  cta.variant === 'primary' &&
                    'bg-primary text-primary-foreground hover:bg-primary/90',
                  cta.variant === 'secondary' &&
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                  cta.variant === 'outline' &&
                    'border-2 border-white text-white hover:bg-white hover:text-black',
                  !cta.variant &&
                    'bg-accent text-accent-foreground hover:bg-accent/90'
                )}
              >
                {cta.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
