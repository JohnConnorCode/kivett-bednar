'use client'

import {motion, useScroll, useTransform, MotionValue} from 'framer-motion'
import Image from 'next/image'
import {useRef, useState, useEffect} from 'react'
import {getObjectPosition, type SanityImageWithPositioning} from '@/lib/image-positioning'

interface GalleryImage {
  src: SanityImageWithPositioning | string
  alt: string
  width: number
  height: number
}

interface FloatingGalleryProps {
  images: GalleryImage[]
}

interface FloatingImageProps {
  image: GalleryImage
  index: number
  scrollYProgress: MotionValue<number>
  isMobile: boolean
}

function FloatingImage({image, index, scrollYProgress, isMobile}: FloatingImageProps) {
  // Create parallax effect for this image
  const yOffset = index % 2 === 0 ? [0, -50] : [0, 50]
  const y = useTransform(scrollYProgress, [0, 1], yOffset)

  const rotateOffset = index % 3 === 0 ? [-2, 2] : index % 3 === 1 ? [2, -2] : [-1, 1]
  const rotate = useTransform(scrollYProgress, [0, 1], rotateOffset)

  return (
    <motion.div
      style={{y, rotate}}
      className="group relative"
      initial={{opacity: 0, scale: 0.9}}
      whileInView={{opacity: 1, scale: 1}}
      viewport={{once: true, margin: '-100px'}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{scale: 1.05, zIndex: 10}}
    >
      {/* Floating image container with elegant shadow */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

        {/* Image */}
        <Image
          src={typeof image.src === 'string' ? image.src : image.src.asset?.url || ''}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          style={{
            objectPosition: typeof image.src === 'string'
              ? 'center center'
              : getObjectPosition(image.src, isMobile)
          }}
        />

        {/* Elegant border with subtle animation */}
        <div className="absolute inset-0 border-2 border-midnight-600/20 group-hover:border-midnight-600/40 transition-colors duration-500 rounded-2xl" />

        {/* Floating overlay with info */}
        <motion.div
          className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{y: 20}}
          whileHover={{y: 0}}
        >
          <p className="text-bone font-light text-sm tracking-wide">{image.alt}</p>
        </motion.div>
      </div>

      {/* Elegant shadow beneath */}
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-charcoal-900/20 blur-2xl rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-500"
        style={{zIndex: -1}}
      />
    </motion.div>
  )
}

export function FloatingGallery({images}: FloatingGalleryProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const containerRef = useRef<HTMLDivElement>(null)
  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <div ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({length: 8}).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-midnight-600/5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {images.map((image, index) => (
            <FloatingImage
              key={index}
              image={image}
              index={index}
              scrollYProgress={scrollYProgress}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
