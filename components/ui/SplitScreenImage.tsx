'use client'

import {useRef, useState, useEffect} from 'react'
import {motion, useScroll, useTransform} from 'framer-motion'
import Image from 'next/image'
import {getObjectPosition, type SanityImageWithPositioning} from '@/lib/image-positioning'

interface SplitScreenImageProps {
  imageSrc: SanityImageWithPositioning | string
  imageAlt: string
  imagePosition?: 'left' | 'right'
  children: React.ReactNode
  darkBg?: boolean
}

export function SplitScreenImage({
  imageSrc,
  imageAlt,
  imagePosition = 'left',
  children,
  darkBg = false,
}: SplitScreenImageProps) {
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const contentY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  const isLeft = imagePosition === 'left'

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${
        darkBg ? 'bg-gradient-to-br from-background to-surface-elevated' : 'bg-surface'
      }`}
    >
      <div className="container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <motion.div
            style={{y: imageY}}
            className={`relative h-[600px] ${isLeft ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={typeof imageSrc === 'string' ? imageSrc : imageSrc.asset?.url || ''}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{
                  objectPosition: typeof imageSrc === 'string'
                    ? 'center 40%'
                    : getObjectPosition(imageSrc, isMobile)
                }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />

              {/* Decorative Frame */}
              <div className="absolute inset-0 border-4 border-border rounded-2xl" />
            </div>

            {/* Floating Accent */}
            <motion.div
              className="absolute -top-4 -right-4 w-32 h-32 bg-surface-elevated/50 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Content Column */}
          <motion.div
            style={{y: contentY}}
            className={`${isLeft ? 'lg:order-2' : 'lg:order-1'} ${
              darkBg ? 'text-text-primary' : 'text-text-primary'
            }`}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
