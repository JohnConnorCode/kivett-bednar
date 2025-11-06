'use client'

import {useState, useMemo} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {ProductCard} from '@/components/ui/ProductCard'
import {AnimatedSection} from '@/components/animations/AnimatedSection'

type MerchPageData = {
  heroHeading?: string | null
  heroSubheading?: string | null
  heroImage?: {
    asset?: {url: string | null} | null
    alt?: string | null
  } | null
  emptyStateHeading?: string | null
  emptyStateText?: string | null
  emptyStateButton1Text?: string | null
  emptyStateButton1Link?: string | null
  emptyStateButton2Text?: string | null
  emptyStateButton2Link?: string | null
}

type Props = {
  merchPage: MerchPageData | null
  products: any[]
}

export function MerchPageContent({merchPage, products}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('featured')

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

  // Use Sanity content or fallbacks
  const heroHeading = merchPage?.heroHeading || 'Merchandise'
  const heroSubheading = merchPage?.heroSubheading || 'Exclusive apparel, vinyl records, and premium accessories for dedicated blues enthusiasts. Each piece crafted to capture the spirit of authentic blues music.'
  const emptyHeading = merchPage?.emptyStateHeading || 'Store Opening Soon'
  const emptyText = merchPage?.emptyStateText || 'Exclusive merchandise is coming your way. Premium apparel, limited edition vinyl, and unique accessories crafted for true blues enthusiasts.'
  const button1Text = merchPage?.emptyStateButton1Text || 'Get Notified'
  const button1Link = merchPage?.emptyStateButton1Link || '/contact'
  const button2Text = merchPage?.emptyStateButton2Text || 'See Live Shows'
  const button2Link = merchPage?.emptyStateButton2Link || '/shows'

  return (
    <div className="min-h-screen bg-background">
      {/* Cinematic Hero Section with Image */}
      <div className="relative bg-background border-b border-border overflow-hidden">
        {/* Background Image */}
        {merchPage?.heroImage?.asset?.url ? (
          <div className="absolute inset-0">
            <Image
              src={merchPage.heroImage.asset.url}
              alt={merchPage.heroImage.alt || 'Kivett Bednar performing'}
              fill
              className="object-cover"
              style={{objectPosition: '50% 30%'}}
              priority
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
          </div>
        ) : (
          // Fallback: Use a placeholder blues musician image
          <>
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1920&h=800&fit=crop&q=80"
                alt="Blues guitarist performing"
                fill
                className="object-cover"
                style={{objectPosition: '50% 30%'}}
                priority
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
            </div>
          </>
        )}

        <div className="container mx-auto px-4 py-24 md:py-40 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Accent Line */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-accent-primary to-accent-primary w-16" />
              <span className="text-accent-primary text-sm uppercase tracking-[0.2em] font-bold drop-shadow-lg">
                Official Store
              </span>
              <div className="h-px bg-gradient-to-r from-accent-primary via-accent-primary to-transparent w-16" />
            </div>

            {/* Main Heading - From Sanity */}
            <h1 className="font-bebas text-7xl md:text-8xl lg:text-9xl uppercase tracking-wider text-white mb-6 leading-none drop-shadow-2xl">
              {heroHeading}
            </h1>

            {/* Subheading - From Sanity */}
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              {heroSubheading}
            </p>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </div>

      {/* Content */}
      <div className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {products && products.length > 0 ? (
              <>
                {/* Filters and Sort - Enhanced Design */}
                <div className="mb-16">
                  <div className="bg-surface/50 backdrop-blur-sm border border-border/50 p-8 shadow-2xl">
                    <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-end justify-between">
                      {/* Category Filter */}
                      <div className="flex-1 w-full">
                        <label className="block text-xs uppercase tracking-[0.2em] font-bold text-accent-primary mb-4 flex items-center gap-2">
                          <span className="w-8 h-px bg-accent-primary" />
                          Browse by Category
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {categories.map((cat) => (
                            <button
                              key={cat.value}
                              onClick={() => setSelectedCategory(cat.value)}
                              className={`group relative px-6 py-3 border-2 transition-all duration-300 uppercase tracking-wider text-sm font-bold overflow-hidden ${
                                selectedCategory === cat.value
                                  ? 'bg-accent-primary text-black border-accent-primary shadow-lg shadow-accent-primary/20'
                                  : 'bg-transparent text-text-secondary border-border hover:border-accent-primary/50 hover:text-text-primary'
                              }`}
                            >
                              <span className="relative z-10">{cat.label}</span>
                              {selectedCategory !== cat.value && (
                                <div className="absolute inset-0 bg-accent-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sort */}
                      <div className="w-full lg:w-72">
                        <label className="block text-xs uppercase tracking-[0.2em] font-bold text-accent-primary mb-4">
                          Sort Products
                        </label>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full bg-surface-elevated border-2 border-border px-5 py-3 text-text-primary focus:border-accent-primary focus:outline-none transition-all uppercase tracking-wider text-sm font-bold cursor-pointer hover:border-accent-primary/50"
                        >
                          <option value="featured">Featured Products</option>
                          <option value="name">Alphabetical (A-Z)</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                        </select>
                      </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-8 pt-8 border-t border-border/50 flex items-center justify-between">
                      <p className="text-text-muted uppercase tracking-wider text-xs flex items-center gap-3">
                        <span className="w-2 h-2 bg-accent-primary rounded-full animate-pulse" />
                        Displaying {filteredAndSortedProducts.length}{' '}
                        {filteredAndSortedProducts.length === 1 ? 'product' : 'products'}
                      </p>
                      {(selectedCategory !== 'all' || sortBy !== 'featured') && (
                        <button
                          onClick={() => {
                            setSelectedCategory('all')
                            setSortBy('featured')
                          }}
                          className="text-accent-primary hover:text-accent-primary/80 uppercase tracking-wider text-xs font-bold transition-colors"
                        >
                          Reset Filters
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Products Grid - Enhanced Layout */}
                {filteredAndSortedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredAndSortedProducts.map((product: any, index: number) => (
                      <AnimatedSection
                        key={product._id}
                        animation="fadeUp"
                        delay={index * 0.05}
                        className="h-full"
                      >
                        <ProductCard product={product} />
                      </AnimatedSection>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-32">
                    <div className="bg-surface/50 backdrop-blur-sm border border-border/50 p-20 max-w-2xl mx-auto shadow-2xl">
                      {/* Empty state icon */}
                      <div className="mb-8 flex justify-center">
                        <div className="w-24 h-24 border-4 border-border rounded-full flex items-center justify-center">
                          <svg
                            className="w-12 h-12 text-text-muted"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>
                      </div>

                      <h3 className="font-bebas text-4xl uppercase tracking-wider text-text-primary mb-4">
                        No Products Found
                      </h3>
                      <p className="text-text-secondary mb-8 text-lg leading-relaxed">
                        We couldn&apos;t find any products matching your current filters.
                        <br />
                        Try adjusting your selection to see more results.
                      </p>
                      <button
                        onClick={() => {
                          setSelectedCategory('all')
                          setSortBy('featured')
                        }}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-accent-primary text-black font-bold uppercase tracking-wider hover:bg-accent-primary/90 transition-all duration-300 shadow-lg shadow-accent-primary/20"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Reset All Filters
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-32">
                <div className="bg-surface/50 backdrop-blur-sm border border-border/50 p-20 max-w-3xl mx-auto shadow-2xl">
                  {/* Coming soon icon */}
                  <div className="mb-10 flex justify-center">
                    <div className="w-32 h-32 border-4 border-accent-primary/20 rounded-full flex items-center justify-center relative">
                      <div className="absolute inset-0 border-4 border-transparent border-t-accent-primary rounded-full animate-spin" />
                      <svg
                        className="w-16 h-16 text-accent-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Empty State Content - From Sanity */}
                  <h2 className="font-bebas text-5xl md:text-6xl uppercase tracking-wider text-text-primary mb-6">
                    {emptyHeading}
                  </h2>
                  <p className="text-xl text-text-secondary mb-4 leading-relaxed max-w-2xl mx-auto">
                    {emptyText}
                  </p>
                  <p className="text-text-muted mb-10 uppercase tracking-wider text-sm">
                    Stay tuned for the official launch announcement
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href={button1Link}
                      className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent-primary text-black font-bold uppercase tracking-wider hover:bg-accent-primary/90 transition-all duration-300 shadow-lg shadow-accent-primary/20"
                    >
                      {button1Text}
                    </Link>
                    <Link
                      href={button2Link}
                      className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-border text-text-primary font-bold uppercase tracking-wider hover:border-accent-primary hover:text-accent-primary transition-all duration-300"
                    >
                      {button2Text}
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
