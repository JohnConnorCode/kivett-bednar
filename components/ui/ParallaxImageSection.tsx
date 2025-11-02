'use client'

import {useRef} from 'react'
import {motion, useScroll, useTransform, MotionValue} from 'framer-motion'
import Image from 'next/image'

interface ParallaxImageProps {
  image: {
    src: string
    alt: string
    position: 'left' | 'right'
    offset?: number
  }
  index: number
  scrollYProgress: MotionValue<number>
  darkOverlay: boolean
}

function ParallaxImage({image, index, scrollYProgress, darkOverlay}: ParallaxImageProps) {
  const yOffset = image.offset || (index % 2 === 0 ? 100 : -100)
  const y = useTransform(scrollYProgress, [0, 1], [yOffset, -yOffset])

  return (
    <motion.div
      style={{y}}
      className={`absolute ${
        image.position === 'left' ? 'left-0' : 'right-0'
      } top-1/4 w-1/3 h-1/2 hidden lg:block`}
    >
      <div className="relative w-full h-full">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover rounded-2xl shadow-2xl"
          sizes="33vw"
        />
        {darkOverlay && (
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900/20 to-transparent rounded-2xl" />
        )}
      </div>
    </motion.div>
  )
}

interface ParallaxImageSectionProps {
  images: {
    src: string
    alt: string
    position: 'left' | 'right'
    offset?: number
  }[]
  children?: React.ReactNode
  darkOverlay?: boolean
}

export function ParallaxImageSection({
  images,
  children,
  darkOverlay = false,
}: ParallaxImageSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <div ref={containerRef} className="relative min-h-screen py-24 overflow-hidden">
      {/* Parallax Images */}
      {images.map((image, index) => (
        <ParallaxImage
          key={index}
          image={image}
          index={index}
          scrollYProgress={scrollYProgress}
          darkOverlay={darkOverlay}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {children}
      </div>
    </div>
  )
}
