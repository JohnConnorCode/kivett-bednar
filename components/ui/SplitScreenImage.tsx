'use client'

import {useRef} from 'react'
import {motion, useScroll, useTransform} from 'framer-motion'
import Image from 'next/image'

interface SplitScreenImageProps {
  imageSrc: string
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
  const containerRef = useRef<HTMLDivElement>(null)
  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const contentY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  const isLeft = imagePosition === 'left'

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${
        darkBg ? 'bg-gradient-to-br from-charcoal-900 to-midnight-500' : 'bg-bone'
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
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 via-transparent to-transparent" />

              {/* Decorative Frame */}
              <div className="absolute inset-0 border-4 border-amber-600/20 rounded-2xl" />
            </div>

            {/* Floating Accent */}
            <motion.div
              className="absolute -top-4 -right-4 w-32 h-32 bg-amber-600/10 rounded-full blur-3xl"
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
              darkBg ? 'text-bone' : 'text-charcoal-900'
            }`}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
