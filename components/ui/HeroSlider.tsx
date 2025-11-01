'use client'

import {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'

const slides = [
  {
    image: '/images/hero/background-1.png',
    alt: 'Kivett Bednar performing blues guitar',
  },
  {
    image: '/images/hero/performance-orpheum.jpg',
    alt: 'Live performance at the Orpheum',
  },
  {
    image: '/images/hero/guitar-red.jpg',
    alt: 'Kivett with vintage Guild guitar',
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-charcoal-900">
      {/* Background Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
            quality={90}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/70 via-charcoal-900/50 to-charcoal-900/80" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-bone">
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight drop-shadow-2xl">
          Kivett Bednar
        </h1>
        <p className="text-2xl md:text-3xl lg:text-4xl mb-8 font-light tracking-wide text-amber-600 drop-shadow-lg">
          Blues • Guitar • Portland
        </p>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed text-bone/90 drop-shadow-md">
          Gritty Texas Blues meets the heart of the Pacific Northwest
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shows"
            className="px-8 py-4 bg-amber-600 text-charcoal-900 font-bold rounded-lg hover:bg-amber-500 transition-all transform hover:scale-105 text-lg shadow-xl"
          >
            See Live Shows
          </Link>
          <Link
            href="/lessons"
            className="px-8 py-4 border-2 border-bone text-bone font-semibold rounded-lg hover:bg-bone/10 transition-all text-lg backdrop-blur-sm"
          >
            Book a Lesson
          </Link>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-amber-600 w-8'
                : 'bg-bone/50 hover:bg-bone/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1200 120" className="w-full h-16 text-bone">
          <path d="M0,0 Q300,40 600,20 T1200,0 L1200,120 L0,120 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  )
}
