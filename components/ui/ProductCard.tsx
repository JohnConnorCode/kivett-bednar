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
  compareAtPriceCents?: number
  onSale?: boolean
  currency: string
  stockStatus?: string
  badges?: string[]
  inventoryQuantity?: number
  trackInventory?: boolean
  lowStockThreshold?: number
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
  const compareAtPrice = product.compareAtPriceCents
    ? (product.compareAtPriceCents / 100).toFixed(2)
    : null

  // Calculate stock status
  const isLowStock =
    product.trackInventory &&
    product.inventoryQuantity !== undefined &&
    product.inventoryQuantity > 0 &&
    product.inventoryQuantity <= (product.lowStockThreshold || 5)

  const isOutOfStock =
    product.trackInventory &&
    product.inventoryQuantity !== undefined &&
    product.inventoryQuantity === 0

  // Determine discount percentage
  const discountPercentage =
    product.onSale && product.compareAtPriceCents
      ? Math.round(((product.compareAtPriceCents - product.priceCents) / product.compareAtPriceCents) * 100)
      : null

  return (
    <Link
      href={`/merch/${product.slug}`}
      className="group block relative bg-surface border border-border overflow-hidden transition-all duration-300 hover:border-accent-primary hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-primary/20"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-background overflow-hidden">
        {product.images?.[0]?.asset ? (
          <>
            {/* Dark overlay that lightens on hover */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 z-10" />

            <Image
              src={urlFor(product.images[0].asset).width(600).height(600).url()}
              alt={product.images[0].alt || product.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              style={{
                objectPosition: getObjectPosition(product.images[0], isMobile)
              }}
            />
          </>
        ) : (
          /* Professional fallback placeholder */
          <div className="absolute inset-0 bg-gradient-to-br from-surface-elevated via-surface to-background flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            <div className="text-center px-8">
              <svg
                className="w-20 h-20 mx-auto text-text-muted/20 mb-3 group-hover:text-accent-primary/30 transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
              <p className="text-text-muted/40 text-xs uppercase tracking-widest font-bold">Image Coming Soon</p>
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.onSale && discountPercentage && (
            <div className="bg-accent-red text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider shadow-lg">
              {discountPercentage}% Off
            </div>
          )}
          {product.badges?.map((badge) => (
            <div
              key={badge}
              className="bg-accent-primary text-black text-xs font-bold px-3 py-1.5 uppercase tracking-wider shadow-lg"
            >
              {badge === 'bestseller'
                ? 'Best Seller'
                : badge === 'limited'
                ? 'Limited'
                : badge === 'tour-exclusive'
                ? 'Tour Exclusive'
                : badge === 'back-in-stock'
                ? 'Back in Stock'
                : badge === 'new'
                ? 'New'
                : badge}
            </div>
          ))}
          {isOutOfStock && (
            <div className="bg-text-muted text-black text-xs font-bold px-3 py-1.5 uppercase tracking-wider shadow-lg">
              Out of Stock
            </div>
          )}
          {isLowStock && !isOutOfStock && (
            <div className="bg-orange-600 text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider shadow-lg">
              Only {product.inventoryQuantity} Left
            </div>
          )}
        </div>

        {/* Quick View Badge */}
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-accent-primary text-black text-xs font-bold px-3 py-1.5 uppercase tracking-wider shadow-lg">
            View
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 bg-surface-elevated border-t border-border">
        {/* Title */}
        <h3 className="font-bebas text-2xl uppercase tracking-wide text-text-primary mb-3 group-hover:text-accent-primary transition-colors duration-300">
          {product.title}
        </h3>

        {/* Price Bar */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-text-muted uppercase tracking-wide">
                {product.currency}
              </span>
              <span className="text-3xl font-bold text-accent-primary">
                ${price}
              </span>
            </div>
            {compareAtPrice && product.onSale && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-muted line-through">
                  ${compareAtPrice}
                </span>
                <span className="text-xs text-accent-red font-bold uppercase">
                  Save ${(parseFloat(compareAtPrice) - parseFloat(price)).toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* CTA Arrow */}
          <div className="w-10 h-10 flex items-center justify-center border border-accent-primary text-accent-primary group-hover:bg-accent-primary group-hover:text-black transition-all duration-300 flex-shrink-0">
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
