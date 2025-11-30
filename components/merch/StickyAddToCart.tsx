'use client'

import {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {ShoppingCart, ChevronUp} from 'lucide-react'
import Image from 'next/image'

interface StickyAddToCartProps {
  productTitle: string
  price: string
  currency: string
  imageUrl?: string
  onAddToCart: () => void
  isAddingToCart?: boolean
  isOutOfStock?: boolean
  threshold?: number
}

export function StickyAddToCart({
  productTitle,
  price,
  currency,
  imageUrl,
  onAddToCart,
  isAddingToCart = false,
  isOutOfStock = false,
  threshold = 500,
}: StickyAddToCartProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll, {passive: true})
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{y: 100, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          exit={{y: 100, opacity: 0}}
          transition={{type: 'spring', damping: 25, stiffness: 300}}
          className="fixed bottom-0 left-0 right-0 z-50 md:bottom-4 md:left-4 md:right-4 md:max-w-md md:mx-auto"
        >
          <div
            className="bg-surface/95 backdrop-blur-xl border border-border md:rounded-lg shadow-2xl"
            style={{
              boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(212, 175, 55, 0.1)',
            }}
          >
            {/* Mobile compact bar */}
            <div className="flex items-center justify-between p-4 md:hidden">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {imageUrl && (
                  <div className="w-12 h-12 relative rounded overflow-hidden flex-shrink-0 border border-border">
                    <Image
                      src={imageUrl}
                      alt={productTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-white font-medium truncate text-sm">{productTitle}</p>
                  <p className="text-accent-primary font-bold">{currency} ${price}</p>
                </div>
              </div>
              <button
                onClick={onAddToCart}
                disabled={isAddingToCart || isOutOfStock}
                className="btn-primary py-3 px-6 text-sm flex items-center gap-2 disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4" />
                {isOutOfStock ? 'Sold Out' : isAddingToCart ? 'Adding...' : 'Add'}
              </button>
            </div>

            {/* Desktop expanded view */}
            <div className="hidden md:block p-4">
              <div className="flex items-center gap-4">
                {imageUrl && (
                  <div className="w-16 h-16 relative rounded overflow-hidden flex-shrink-0 border border-border">
                    <Image
                      src={imageUrl}
                      alt={productTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-lg truncate">{productTitle}</p>
                  <p className="text-accent-primary font-bold text-xl">{currency} ${price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={scrollToTop}
                    className="p-3 text-text-muted hover:text-white transition-colors border border-border rounded hover:border-accent-primary"
                    aria-label="Scroll to top"
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>
                  <button
                    onClick={onAddToCart}
                    disabled={isAddingToCart || isOutOfStock}
                    className="btn-primary py-3 px-8 flex items-center gap-2 disabled:opacity-50"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {isOutOfStock ? 'Sold Out' : isAddingToCart ? 'Adding...' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>

            {/* Safe area padding for notched phones */}
            <div className="h-safe-area-inset-bottom md:hidden" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
