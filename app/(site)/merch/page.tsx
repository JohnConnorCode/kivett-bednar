'use client'

import {useState, useMemo} from 'react'
import Link from 'next/link'
import {ProductCard} from '@/components/ui/ProductCard'
import {AnimatedSection} from '@/components/animations/AnimatedSection'

// This will need to be loaded from server component or API
// For now, using client component for filtering/sorting
export default function MerchPage() {
  const [products, setProducts] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('featured')

  // Load products on mount
  React.useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Failed to load products:', error)
      }
    }
    loadProducts()
  }, [])

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p: any) => p.category === selectedCategory)
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return 0
        case 'price-low':
          return a.priceCents - b.priceCents
        case 'price-high':
          return b.priceCents - a.priceCents
        case 'name':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return sorted
  }, [products, selectedCategory, sortBy])

  const categories = [
    {value: 'all', label: 'All Products'},
    {value: 'apparel', label: 'Apparel'},
    {value: 'music', label: 'Music'},
    {value: 'accessories', label: 'Accessories'},
    {value: 'prints', label: 'Posters & Prints'},
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px bg-accent-primary w-12" />
              <span className="text-accent-primary text-sm uppercase tracking-wider font-bold">
                Official Merchandise
              </span>
            </div>
            <h1 className="font-bebas text-6xl md:text-7xl uppercase tracking-wide text-text-primary mb-4">
              Merch Store
            </h1>
            <p className="text-text-secondary text-xl">
              Premium apparel, music, and accessories for true blues fans
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-surface py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {products && products.length > 0 ? (
              <>
                {/* Filters and Sort */}
                <div className="mb-12 bg-surface-elevated border border-border p-6">
                  <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                    {/* Category Filter */}
                    <div className="flex-1">
                      <label className="block text-sm uppercase tracking-wider font-bold text-text-primary mb-3">
                        Category
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat.value}
                            onClick={() => setSelectedCategory(cat.value)}
                            className={`px-4 py-2 border transition-all duration-200 uppercase tracking-wide text-sm font-bold ${
                              selectedCategory === cat.value
                                ? 'bg-accent-primary text-black border-accent-primary'
                                : 'bg-transparent text-text-secondary border-border hover:border-accent-primary hover:text-text-primary'
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sort */}
                    <div className="w-full lg:w-64">
                      <label className="block text-sm uppercase tracking-wider font-bold text-text-primary mb-3">
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full bg-background border border-border px-4 py-3 text-text-primary focus:border-accent-primary focus:outline-none transition-colors uppercase tracking-wide text-sm font-bold"
                      >
                        <option value="featured">Featured</option>
                        <option value="name">Name (A-Z)</option>
                        <option value="price-low">Price (Low to High)</option>
                        <option value="price-high">Price (High to Low)</option>
                      </select>
                    </div>
                  </div>

                  {/* Results Count */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-text-muted uppercase tracking-wide text-sm">
                      Showing {filteredAndSortedProducts.length}{' '}
                      {filteredAndSortedProducts.length === 1 ? 'product' : 'products'}
                    </p>
                  </div>
                </div>

                {/* Products Grid */}
                {filteredAndSortedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAndSortedProducts.map((product: any) => (
                      <AnimatedSection key={product._id} animation="fadeUp">
                        <ProductCard product={product} />
                      </AnimatedSection>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24">
                    <div className="bg-surface-elevated border border-border p-16">
                      <h3 className="font-bebas text-3xl uppercase tracking-wide text-text-primary mb-4">
                        No Products Found
                      </h3>
                      <p className="text-text-secondary mb-6">
                        Try selecting a different category or adjusting your filters.
                      </p>
                      <button
                        onClick={() => {
                          setSelectedCategory('all')
                          setSortBy('featured')
                        }}
                        className="btn-primary inline-flex"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-24">
                <div className="bg-surface-elevated border border-border p-16 max-w-2xl mx-auto">
                  <h2 className="font-bebas text-4xl uppercase tracking-wide text-text-primary mb-4">
                    Merch Store Opening Soon!
                  </h2>
                  <p className="text-xl text-text-secondary mb-8">
                    T-shirts, vinyl records, and exclusive gear coming your way. Check back for
                    updates or follow on social media for the launch announcement.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact" className="btn-primary">
                      Get Notified
                    </Link>
                    <Link href="/shows" className="btn-secondary">
                      See Live Shows
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
