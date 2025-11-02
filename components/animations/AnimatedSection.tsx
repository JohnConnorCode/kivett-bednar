'use client'

import {motion} from 'framer-motion'
import {useInView} from 'react-intersection-observer'
import {ReactNode} from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleIn'
  delay?: number
  duration?: number
}

const animations = {
  fadeUp: {
    hidden: {opacity: 0, y: 40},
    visible: {opacity: 1, y: 0},
  },
  fadeIn: {
    hidden: {opacity: 0},
    visible: {opacity: 1},
  },
  slideLeft: {
    hidden: {opacity: 0, x: -60},
    visible: {opacity: 1, x: 0},
  },
  slideRight: {
    hidden: {opacity: 0, x: 60},
    visible: {opacity: 1, x: 0},
  },
  scaleIn: {
    hidden: {opacity: 0, scale: 0.8},
    visible: {opacity: 1, scale: 1},
  },
}

export function AnimatedSection({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  duration = 0.6,
}: AnimatedSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={animations[animation]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
