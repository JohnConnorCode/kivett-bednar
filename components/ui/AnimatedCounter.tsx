'use client'

import {useEffect, useState, useRef} from 'react'
import {useInView} from 'framer-motion'

interface AnimatedCounterProps {
  value: number | string
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 1500,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, {once: true, margin: '-50px'})
  const numericValue = typeof value === 'string' ? parseInt(value.replace(/\D/g, ''), 10) : value

  useEffect(() => {
    if (!isInView || isNaN(numericValue)) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.floor(eased * numericValue))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, numericValue, duration])

  // Handle non-numeric values (like "All")
  if (isNaN(numericValue)) {
    return (
      <span ref={ref} className={`animate-count ${className}`}>
        {prefix}{value}{suffix}
      </span>
    )
  }

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}
