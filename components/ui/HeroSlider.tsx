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
  {
    image: '/images/hero/rae-gordon-album.jpg',
    alt: 'Rae Gordon Band album artwork',
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-charcoal-900">
      {/* Background Slider with Ken Burns effect */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-2000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className={`absolute inset-0 ${
              index === currentSlide ? 'animate-ken-burns' : ''
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
              quality={95}
              sizes="100vw"
            />
          </div>
          {/* Elegant dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/80 via-charcoal-900/60 to-charcoal-900/90" />
        </div>
      ))}

      {/* Animated Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-bone">
        <h1
          className={`text-7xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight drop-shadow-2xl transform transition-all duration-1000 ${
            isLoaded
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{transitionDelay: '200ms'}}
        >
          Kivett Bednar
        </h1>
        <p
          className={`text-2xl md:text-3xl lg:text-4xl mb-8 font-light tracking-wide text-amber-600 drop-shadow-lg transform transition-all duration-1000 ${
            isLoaded
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{transitionDelay: '400ms'}}
        >
          Blues • Guitar • Portland
        </p>
        <p
          className={`text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed text-bone/90 drop-shadow-md transform transition-all duration-1000 ${
            isLoaded
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{transitionDelay: '600ms'}}
        >
          Gritty Texas Blues meets the heart of the Pacific Northwest
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
            className="group relative px-8 py-4 bg-amber-600 text-charcoal-900 font-bold rounded-lg overflow-hidden text-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-amber-600/50"
          >
            <span className="relative z-10">See Live Shows</span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          <Link
            href="/lessons"
            className="group relative px-8 py-4 border-2 border-bone text-bone font-semibold rounded-lg overflow-hidden text-lg backdrop-blur-sm transform transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">Book a Lesson</span>
            <div className="absolute inset-0 bg-bone/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </div>

      {/* Elegant slide indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
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

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1200 120" className="w-full h-16 text-bone">
          <path d="M0,0 Q300,40 600,20 T1200,0 L1200,120 L0,120 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  )
}
