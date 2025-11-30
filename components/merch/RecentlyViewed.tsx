'use client'

import {useRecentlyViewed, type RecentlyViewedProduct} from '@/hooks/useRecentlyViewed'
import Image from 'next/image'
import Link from 'next/link'
import {motion} from 'framer-motion'
import {X, Clock} from 'lucide-react'

interface RecentlyViewedProps {
  excludeProductId?: string
  limit?: number
  title?: string
  showRemove?: boolean
}

export function RecentlyViewed({
  excludeProductId,
  limit = 4,
  title = 'Recently Viewed',
  showRemove = false,
}: RecentlyViewedProps) {
  const {recentlyViewed, getExcluding, removeProduct, isLoaded} = useRecentlyViewed()

  if (!isLoaded) return null

  const products = excludeProductId
    ? getExcluding(excludeProductId, limit)
    : recentlyViewed.slice(0, limit)

  if (products.length === 0) return null

  return (
    <section className="py-12">
      <div className="flex items-center gap-3 mb-8">
        <Clock className="w-5 h-5 text-accent-primary" />
        <h2 className="text-2xl font-bebas uppercase tracking-wide text-white">{title}</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: index * 0.1}}
            className="group relative"
          >
            <Link
              href={`/merch/${product.slug}`}
              className="block bg-surface border border-border hover:border-accent-primary transition-all duration-300 overflow-hidden"
            >
              <div className="relative aspect-square bg-background">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                    <span className="text-xs uppercase tracking-wider">No Image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-white truncate group-hover:text-accent-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-accent-primary font-bold mt-1">
                  {product.currency} ${product.price}
                </p>
              </div>
            </Link>

            {showRemove && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  removeProduct(product.id)
                }}
                className="absolute top-2 right-2 p-1.5 bg-black/60 text-white/80 hover:text-white hover:bg-black/80 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
                aria-label={`Remove ${product.title} from recently viewed`}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// Compact version for sidebars or empty states
export function RecentlyViewedCompact({
  excludeProductId,
  limit = 3,
}: {
  excludeProductId?: string
  limit?: number
}) {
  const {recentlyViewed, getExcluding, isLoaded} = useRecentlyViewed()

  if (!isLoaded) return null

  const products = excludeProductId
    ? getExcluding(excludeProductId, limit)
    : recentlyViewed.slice(0, limit)

  if (products.length === 0) return null

  return (
    <div className="space-y-3">
      <p className="text-sm text-text-muted uppercase tracking-wider">Recently Viewed</p>
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/merch/${product.slug}`}
          className="flex items-center gap-3 group"
        >
          <div className="w-12 h-12 relative rounded overflow-hidden flex-shrink-0 border border-border">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-surface" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate group-hover:text-accent-primary transition-colors">
              {product.title}
            </p>
            <p className="text-xs text-accent-primary">${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
