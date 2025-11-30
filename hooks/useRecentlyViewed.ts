'use client'

import {useState, useEffect, useCallback} from 'react'

export interface RecentlyViewedProduct {
  id: string
  title: string
  slug: string
  imageUrl?: string
  price: string
  currency: string
  viewedAt: number
}

const STORAGE_KEY = 'recently-viewed-products'
const MAX_ITEMS = 10

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as RecentlyViewedProduct[]
        // Filter out items older than 30 days
        const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
        const filtered = parsed.filter((item) => item.viewedAt > thirtyDaysAgo)
        setRecentlyViewed(filtered)
      }
    } catch (error) {
      console.error('Error loading recently viewed:', error)
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage when items change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyViewed))
      } catch (error) {
        console.error('Error saving recently viewed:', error)
      }
    }
  }, [recentlyViewed, isLoaded])

  const addProduct = useCallback((product: Omit<RecentlyViewedProduct, 'viewedAt'>) => {
    setRecentlyViewed((prev) => {
      // Remove existing entry for this product
      const filtered = prev.filter((p) => p.id !== product.id)

      // Add new entry at the beginning
      const newItem: RecentlyViewedProduct = {
        ...product,
        viewedAt: Date.now(),
      }

      // Keep only MAX_ITEMS
      return [newItem, ...filtered].slice(0, MAX_ITEMS)
    })
  }, [])

  const removeProduct = useCallback((productId: string) => {
    setRecentlyViewed((prev) => prev.filter((p) => p.id !== productId))
  }, [])

  const clearAll = useCallback(() => {
    setRecentlyViewed([])
  }, [])

  // Get products excluding a specific one (useful for "you may also like" on product pages)
  const getExcluding = useCallback(
    (productId: string, limit?: number) => {
      const filtered = recentlyViewed.filter((p) => p.id !== productId)
      return limit ? filtered.slice(0, limit) : filtered
    },
    [recentlyViewed]
  )

  return {
    recentlyViewed,
    addProduct,
    removeProduct,
    clearAll,
    getExcluding,
    isLoaded,
  }
}
