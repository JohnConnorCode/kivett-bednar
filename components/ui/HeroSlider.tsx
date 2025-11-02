'use client'

import {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface HeroSlide {
  _key: string
  image: {
    asset: any
    alt?: string
  }
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
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-charcoal-900">
      {/* Background Slider with Ken Burns effect */}
      {slides.length > 0 && slides.map((slide, index) => (
        <div
          key={slide._key || index}
          className={`absolute inset-0 ${
            index === currentSlide ? 'opacity-100 z-20' : 'opacity-0 z-10'
          }`}
          style={{
            transition: 'opacity 1500ms cubic-bezier(0.22, 1, 0.36, 1)',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            willChange: 'opacity'
          }}
        >
          <div className={`absolute inset-0 animate-ken-burns-${(index % 3) + 1}`}>
            {slide.image?.asset?.url && (
              <Image
                src={slide.image.asset.url}
                alt={slide.alt || slide.image.alt || 'Kivett Bednar'}
                fill
                className="object-cover"
                priority={index === 0}
                quality={95}
                sizes="100vw"
              />
            )}
          </div>
          {/* Optimal overlay for text readability while showing images */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/55 z-10" />
        </div>
      ))}

      {/* Animated Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <h1
          className={`text-7xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight text-white transform transition-all duration-1000 ${
            isLoaded
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{
            transitionDelay: '200ms',
            textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.5)'
          }}
        >
          {heading}
        </h1>
        <p
          className={`text-3xl md:text-4xl lg:text-5xl mb-8 font-medium tracking-wide text-white transform transition-all duration-1000 ${
            isLoaded
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{
            transitionDelay: '400ms',
            textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.5)'
          }}
        >
          {subheading}
        </p>
        {tagline && (
          <p
            className={`text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed text-white/95 transform transition-all duration-1000 ${
              isLoaded
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{
              transitionDelay: '600ms',
              textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.5)'
            }}
          >
            {tagline}
          </p>
        )}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-1000 ${
            isLoaded
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{transitionDelay: '800ms'}}
        >
          <Link
            href="/shows"
            className="px-10 py-5 bg-blue-600 text-white font-bold rounded-lg text-xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:bg-blue-700"
          >
            See Live Shows
          </Link>
          <Link
            href="/lessons"
            className="px-10 py-5 border-2 border-white text-white font-bold rounded-lg text-xl backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:bg-white/10"
          >
            Book a Lesson
          </Link>
        </div>
      </div>

    </section>
  )
}
