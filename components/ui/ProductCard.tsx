'use client'

import Image from 'next/image'
import Link from 'next/link'
import {urlFor} from '@/lib/image-positioning'
import {useState, useEffect} from 'react'
import {getObjectPosition, type SanityImageWithPositioning} from '@/lib/image-positioning'

type Product = {
  _id: string
  title: string
  slug: string
  images: Array<SanityImageWithPositioning & {
    alt: string
  }>
  priceCents: number
  currency: string
}

export function ProductCard({product}: {product: Product}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const price = (product.priceCents / 100).toFixed(2)

  return (
    <Link
      href={`/merch/${product.slug}`}
      className="group block relative bg-surface border border-border overflow-hidden transition-all duration-300 hover:border-accent-primary hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-primary/20"
    >
      {/* Image Container */}
      {product.images?.[0]?.asset && (
        <div className="relative aspect-square bg-background overflow-hidden">
          {/* Dark overlay that lightens on hover */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 z-10" />

          <Image
            src={urlFor(product.images[0].asset).width(800).height(800).url()}
            alt={product.images[0].alt || product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            style={{
              objectPosition: getObjectPosition(product.images[0], isMobile)
            }}
          />

          {/* Quick View Badge */}
          <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-accent-primary text-black text-xs font-bold px-3 py-1.5 uppercase tracking-wider">
              View
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative p-6 bg-surface-elevated border-t border-border">
        {/* Title */}
        <h3 className="font-bebas text-2xl uppercase tracking-wide text-text-primary mb-3 group-hover:text-accent-primary transition-colors duration-300">
          {product.title}
        </h3>

        {/* Price Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-text-muted uppercase tracking-wide">
              {product.currency}
            </span>
            <span className="text-3xl font-bold text-accent-primary">
              ${price}
            </span>
          </div>

          {/* CTA Arrow */}
          <div className="w-10 h-10 flex items-center justify-center border border-accent-primary text-accent-primary group-hover:bg-accent-primary group-hover:text-black transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  )
}
