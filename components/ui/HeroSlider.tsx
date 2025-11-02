'use client'

import {useState, useEffect, useRef} from 'react'
import {motion, useScroll, useTransform} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {getObjectPosition, type SanityImageWithPositioning} from '@/lib/image-positioning'

interface HeroSlide {
  _key: string
  image: SanityImageWithPositioning
  alt: string
}

interface HeroSliderProps {
  slides?: HeroSlide[]
  heading?: string
  subheading?: string
  tagline?: string
}

export function HeroSlider({
  slides = [],
  heading = 'Kivett Bednar',
  subheading = 'Blues • Guitar • Portland',
  tagline = 'Gritty Texas Blues meets the heart of the Pacific Northwest',
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

  useEffect(() => {
    setIsLoaded(true)
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 6000)

      return () => clearInterval(timer)
    }
  }, [slides.length])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-charcoal-900"
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
              {slide.image?.asset?.url && (
                <Image
                  src={slide.image.asset.url}
                  alt={slide.alt || slide.image.alt || 'Kivett Bednar'}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  quality={95}
                  sizes="100vw"
                  style={{
                    objectPosition: getObjectPosition(slide.image, isMobile)
                  }}
                />
              )}
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
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white"
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
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
          className="text-2xl md:text-3xl lg:text-4xl mb-8 font-normal tracking-wide text-white"
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
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/shows"
            className="px-10 py-5 bg-midnight-600 text-white font-bold rounded-lg text-xl shadow-2xl transform transition-all duration-200 hover:scale-105 hover:bg-midnight-700"
          >
            See Live Shows
          </Link>
          <Link
            href="/lessons"
            className="px-10 py-5 border-2 border-white text-white font-bold rounded-lg text-xl backdrop-blur-sm transform transition-all duration-200 hover:scale-105 hover:bg-white/10"
          >
            Book a Lesson
          </Link>
        </motion.div>
      </div>

    </section>
  )
}
