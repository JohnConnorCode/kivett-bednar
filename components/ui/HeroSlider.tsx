'use client'

import {useState, useEffect, useRef} from 'react'
import {motion, useScroll, useTransform} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {cn} from '@/lib/utils'
import {getObjectPosition, type SanityImageWithPositioning} from '@/lib/image-positioning'

// Text size mapping for Tailwind JIT compiler
const textSizeMap: Record<string, string> = {
  'text-2xl': 'text-2xl',
  'text-3xl': 'text-3xl',
  'text-4xl': 'text-4xl',
  'text-5xl': 'text-5xl',
  'text-6xl': 'text-6xl',
  'text-7xl': 'text-7xl',
  'text-8xl': 'text-8xl',
  'text-9xl': 'text-9xl',
}

const desktopSizeMap: Record<string, string> = {
  'text-4xl': 'md:text-4xl',
  'text-5xl': 'md:text-5xl',
  'text-6xl': 'md:text-6xl',
  'text-7xl': 'md:text-7xl',
  'text-8xl': 'md:text-8xl',
  'text-9xl': 'md:text-9xl',
}

interface HeroSlide {
  _key: string
  image: SanityImageWithPositioning | null
  mobileImage?: SanityImageWithPositioning | null
  alt: string | null
  desktopPosition?: string | null
  mobilePosition?: string | null
}

interface HeroSliderProps {
  slides?: HeroSlide[]
  heading?: string
  subheading?: string
  tagline?: string
  buttonText?: string
  headingDesktopSize?: string
  headingMobileSize?: string
  headingTracking?: string
  headingLineHeight?: string
  subheadingTracking?: string
  subheadingLineHeight?: string
}

export function HeroSlider({
  slides = [],
  heading = 'Kivett Bednar',
  subheading = 'Blues • Guitar • Portland',
  tagline = 'Gritty Texas Blues meets the heart of the Pacific Northwest',
  buttonText = 'See Live Shows',
  headingDesktopSize = 'text-8xl',
  headingMobileSize = 'text-5xl',
  headingTracking = 'tracking-tight',
  headingLineHeight = 'leading-none',
  subheadingTracking = 'tracking-normal',
  subheadingLineHeight = 'leading-normal',
}: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Parallax effect: background moves at 50% speed
  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 400])

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // Tailwind md breakpoint
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Debug: Log positioning data
  useEffect(() => {
    if (slides.length > 0 && slides[0]) {
      const slide = slides[0]
      const activeImage = isMobile && slide.mobileImage?.asset?.url ? slide.mobileImage : slide.image
      const imageWithPosition = {
        ...activeImage,
        desktopPosition: slide.desktopPosition as any,
        mobilePosition: slide.mobilePosition as any
      }
      console.log('Hero Slider Debug:', {
        isMobile,
        slide: {
          desktopPosition: slide.desktopPosition,
          mobilePosition: slide.mobilePosition,
          hotspot: activeImage?.hotspot,
          calculatedPosition: getObjectPosition(imageWithPosition, isMobile)
        }
      })
    }
  }, [slides, isMobile])

  useEffect(() => {
    setIsLoaded(true)
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 6000)

      return () => clearInterval(timer)
    }
  }, [slides.length])

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

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-background"
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: '100vh',
      }}
    >
      {/* Parallax Background Slider with Ken Burns effect */}
      {slides.length > 0 && slides.map((slide, index) => (
        <div
          key={slide._key || index}
          className={`absolute inset-0 ${
            index === currentSlide ? 'opacity-100 z-20' : 'opacity-0 z-10'
          }`}
          style={{
            transition: 'opacity 1500ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <motion.div
            style={{y: backgroundY}}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 animate-ken-burns">
              {(() => {
                // Use mobile image if available and on mobile, otherwise use desktop image
                const activeImage = isMobile && slide.mobileImage?.asset?.url ? slide.mobileImage : slide.image
                const imageUrl = activeImage?.asset?.url

                // Combine image data with slide-level position settings
                const imageWithPosition = {
                  ...activeImage,
                  desktopPosition: slide.desktopPosition as any,
                  mobilePosition: slide.mobilePosition as any
                }

                return imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={slide.alt || activeImage?.alt || 'Kivett Bednar'}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    quality={95}
                    sizes="100vw"
                    style={{
                      objectPosition: getObjectPosition(imageWithPosition, isMobile)
                    }}
                  />
                ) : null
              })()}
            </div>
          </motion.div>
          {/* Optimal overlay for text readability while showing images */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/55 z-10" />
        </div>
      ))}

      {/* Animated Content */}
      <div className="relative z-30 container mx-auto px-4 text-center">
        <motion.h1
          initial={{opacity: 0, y: 50, scale: 0.95}}
          whileInView={{opacity: 1, y: 0, scale: 1}}
          viewport={{once: true, amount: 0.3}}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={cn(
            'font-bold text-white mb-6',
            textSizeMap[headingMobileSize] || 'text-5xl',
            desktopSizeMap[headingDesktopSize] || 'md:text-8xl',
            trackingMap[headingTracking] || 'tracking-tight',
            leadingMap[headingLineHeight] || 'leading-none'
          )}
          style={{
            textShadow: '0 4px 8px rgba(0,0,0,0.8)',
            fontFamily: 'var(--font-bebas), system-ui, sans-serif'
          }}
        >
          {heading}
        </motion.h1>
        <motion.p
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.3}}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={cn(
            'text-2xl md:text-4xl lg:text-5xl mb-8 font-normal text-white',
            trackingMap[subheadingTracking] || 'tracking-normal',
            leadingMap[subheadingLineHeight] || 'leading-normal'
          )}
        >
          {subheading}
        </motion.p>
        {tagline && (
          <motion.p
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.3}}
            transition={{
              duration: 0.6,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed text-white/95 font-light"
          >
            {tagline}
          </motion.p>
        )}
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.3}}
          transition={{
            duration: 0.6,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex justify-center"
        >
          <Link
            href="/shows"
            className="btn-primary text-xl px-10 py-5"
          >
            {buttonText}
          </Link>
        </motion.div>
      </div>

    </section>
  )
}
