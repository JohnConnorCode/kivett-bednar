'use client'

import {motion, useScroll, useTransform} from 'framer-motion'
import {useRef} from 'react'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
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
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
    </div>
  )
}
