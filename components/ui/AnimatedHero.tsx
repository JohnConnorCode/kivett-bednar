'use client'

import {motion} from 'framer-motion'
import {useEffect, useState} from 'react'
import Image from 'next/image'

interface AnimatedHeroProps {
  title: string
  subtitle?: string
  variant?: 'lessons' | 'shows' | 'contact' | 'setlist'
  backgroundImage?: string
  backgroundAlt?: string
}

export function AnimatedHero({title, subtitle, variant = 'shows', backgroundImage, backgroundAlt}: AnimatedHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-charcoal-900">
      {/* Background Image (if provided) */}
      {backgroundImage && (
        <div className="absolute inset-0 animate-ken-burns">
          <Image
            src={backgroundImage}
            alt={backgroundAlt || title}
            fill
            className="object-cover"
            priority
            quality={95}
            sizes="100vw"
          />
        </div>
      )}

      {/* Strong Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/75 z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center text-bone">
        <motion.h1
          initial={{opacity: 0, y: 50, scale: 0.9}}
          animate={isLoaded ? {opacity: 1, y: 0, scale: 1} : {}}
          transition={{duration: 0.8, ease: [0.22, 1, 0.36, 1]}}
          className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 tracking-tight drop-shadow-2xl"
          style={{
            textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 8px 24px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,1)'
          }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{opacity: 0, y: 30}}
            animate={isLoaded ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1]}}
            className="text-2xl md:text-3xl lg:text-4xl max-w-4xl mx-auto leading-relaxed text-blue-300 font-light drop-shadow-xl"
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,1)'
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

    </section>
  )
}

// Musical Notes Background for Lessons
function MusicalNotesBackground() {
  const notes = ['♪', '♫', '♬', '♩']
  return (
    <div className="absolute inset-0">
      {Array.from({length: 20}).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-sky-500/20 text-4xl md:text-6xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        >
          {notes[Math.floor(Math.random() * notes.length)]}
        </motion.div>
      ))}
    </div>
  )
}

// Spotlight Background for Shows
function SpotlightBackground() {
  return (
    <div className="absolute inset-0">
      {/* Animated spotlights */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-48 md:w-96 h-full opacity-20"
          style={{
            left: `${20 + i * 30}%`,
            background: 'radial-gradient(ellipse at top, rgba(240,200,62,0.4) 0%, transparent 60%)',
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scaleX: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
      {/* Stage floor glow */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-sky-500/10 to-transparent" />
    </div>
  )
}

// Vinyl Record Background for Contact
function VinylBackground() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-10">
      <motion.div
        className="w-96 h-96 md:w-[600px] md:h-[600px] rounded-full border-4 border-bone/30 relative"
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, rgba(240,200,62,0.1) 20%, rgba(240,200,62,0.1) 22%, transparent 22%, transparent 40%, rgba(240,200,62,0.1) 40%, rgba(240,200,62,0.1) 42%, transparent 42%)',
        }}
        animate={{rotate: 360}}
        transition={{duration: 20, repeat: Infinity, ease: 'linear'}}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-sky-500/30" />
        </div>
      </motion.div>
    </div>
  )
}

// Sheet Music Background for Setlist
function SheetMusicBackground() {
  return (
    <div className="absolute inset-0">
      {/* Staff lines */}
      {Array.from({length: 5}).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-px bg-bone/10"
          style={{top: `${20 + i * 15}%`}}
          initial={{scaleX: 0}}
          animate={{scaleX: 1}}
          transition={{duration: 1.5, delay: i * 0.1}}
        />
      ))}
      {/* Floating notes */}
      {Array.from({length: 15}).map((_, i) => (
        <motion.div
          key={`note-${i}`}
          className="absolute text-sky-500/20 text-3xl md:text-5xl"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${15 + Math.random() * 50}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          ♪
        </motion.div>
      ))}
    </div>
  )
}
