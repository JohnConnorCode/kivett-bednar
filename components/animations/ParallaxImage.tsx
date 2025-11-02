'use client'

import {motion, useScroll, useTransform} from 'framer-motion'
import {useRef, useState, useEffect} from 'react'
import Image from 'next/image'
import {getObjectPosition, type SanityImageWithPositioning} from '@/lib/image-positioning'

interface ParallaxImageProps {
  src: SanityImageWithPositioning | string
  alt: string
  speed?: number
  className?: string
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.5,
  className = '',
}: ParallaxImageProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const ref = useRef(null)
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{y}} className="relative w-full h-full">
        <Image
          src={typeof src === 'string' ? src : src.asset?.url || ''}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          style={{
            objectPosition: typeof src === 'string'
              ? 'center center'
              : getObjectPosition(src, isMobile)
          }}
        />
      </motion.div>
    </div>
  )
}
