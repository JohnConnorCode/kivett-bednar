'use client'

import {motion} from 'framer-motion'
import Image from 'next/image'
import {useState} from 'react'

interface StaggeredImageGridProps {
  images: {
    src: string
    alt: string
    caption?: string
    width?: number
    height?: number
  }[]
  columns?: 2 | 3 | 4
}

export function StaggeredImageGrid({images, columns = 3}: StaggeredImageGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className={`grid gap-6 ${
        columns === 2
          ? 'grid-cols-1 md:grid-cols-2'
          : columns === 3
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      }`}
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{opacity: 0, y: 50}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            ease: 'easeOut',
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative group cursor-pointer"
          style={{
            marginTop: index % 2 === 0 ? '0' : '3rem',
          }}
        >
          <motion.div
            className="relative rounded-xl overflow-hidden shadow-xl"
            whileHover={{scale: 1.05, rotate: hoveredIndex === index ? 2 : 0}}
            transition={{duration: 0.3}}
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes={`(max-width: 768px) 100vw, ${100 / columns}vw`}
              />

              {/* Hover Overlay */}
              <motion.div
                initial={{opacity: 0}}
                whileHover={{opacity: 1}}
                className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/50 to-transparent flex items-end p-6"
              >
                {image.caption && (
                  <p className="text-bone text-lg font-semibold">
                    {image.caption}
                  </p>
                )}
              </motion.div>

              {/* Border Glow on Hover */}
              {hoveredIndex === index && (
                <motion.div
                  className="absolute inset-0 border-2 border-amber-600 rounded-xl"
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{duration: 0.2}}
                />
              )}
            </div>
          </motion.div>

          {/* Floating Shadow */}
          <motion.div
            className="absolute -inset-2 bg-amber-600/10 rounded-xl blur-xl -z-10"
            animate={{
              opacity: hoveredIndex === index ? 0.6 : 0,
            }}
            transition={{duration: 0.3}}
          />
        </motion.div>
      ))}
    </div>
  )
}
