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
          className={`absolute inset-0 transition-opacity duration-2000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
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
              />
            )}
          </div>
          {/* Dramatic overlays for readability and atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight-500/30 via-transparent to-amber-600/20" />
        </div>
      ))}

      {/* Animated Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-bone">
        <h1
          className={`text-7xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight transform transition-all duration-1000 ${
            isLoaded
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{
            transitionDelay: '200ms',
            textShadow: '0 2px 15px rgba(0,0,0,0.9), 0 0 20px rgba(240,200,62,0.2)'
          }}
        >
          {heading}
        </h1>
        <p
          className={`text-3xl md:text-4xl lg:text-5xl mb-8 font-medium tracking-wide text-amber-400 transform transition-all duration-1000 ${
            isLoaded
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{
            transitionDelay: '400ms',
            textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 0 15px rgba(240,200,62,0.25)'
          }}
        >
          {subheading}
        </p>
        <p
          className={`text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed text-bone transform transition-all duration-1000 ${
            isLoaded
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{
            transitionDelay: '600ms',
            textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.7)'
          }}
        >
          {tagline}
        </p>
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
            className="group relative px-10 py-5 bg-amber-600 text-black font-bold rounded-lg overflow-hidden text-xl shadow-2xl transform transition-all duration-300 hover:scale-110"
            style={{
              boxShadow: '0 0 20px rgba(240,200,62,0.3), 0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
            <span className="relative z-10">See Live Shows</span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          <Link
            href="/lessons"
            className="group relative px-10 py-5 border-3 border-amber-600 text-bone font-bold rounded-lg overflow-hidden text-xl backdrop-blur-sm transform transition-all duration-300 hover:scale-110"
            style={{
              boxShadow: '0 0 15px rgba(240,200,62,0.2), 0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
            <span className="relative z-10">Book a Lesson</span>
            <div className="absolute inset-0 bg-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </div>

      {/* Elegant slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide._key || index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-500 rounded-full ${
                index === currentSlide
                  ? 'bg-amber-600 w-12 h-2'
                  : 'bg-bone/30 hover:bg-bone/50 w-2 h-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1200 120" className="w-full h-16 text-bone">
          <path d="M0,0 Q300,40 600,20 T1200,0 L1200,120 L0,120 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  )
}
