'use client'

import {useState, useEffect, useRef} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {Search, X, Loader2} from 'lucide-react'

type SearchResult = {
  _id: string
  title: string
  slug: string
  priceCents: number
  currency: string
  images?: Array<{asset?: {url: string}; alt?: string}>
}

type SearchModalProps = {
  open: boolean
  onClose: () => void
}

export function SearchModal({open, onClose}: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  // Handle Escape key
  useEffect(() => {
    if (!open) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  // Debounced search
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([])
      setError('')
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=8`)

        if (!response.ok) {
          const data = await response.json()
          setError(data.error || 'Search failed')
          setResults([])
          return
        }

        const data = await response.json()
        setResults(data)
      } catch (err) {
        setError('Search failed. Please try again.')
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[300]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-modal-title"
          className="max-w-3xl mx-auto bg-surface border-2 border-accent-primary/30 shadow-2xl"
        >
          {/* Search Input */}
          <div className="p-6 border-b border-border">
            <h2 id="search-modal-title" className="sr-only">Search Products</h2>
            <div className="flex items-center gap-4">
              <Search className="w-6 h-6 text-accent-primary flex-shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-text-muted text-lg"
                aria-label="Search for products"
              />
              {loading && (
                <Loader2 className="w-5 h-5 text-accent-primary animate-spin" aria-hidden="true" />
              )}
              <button
                onClick={onClose}
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="Close search"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {error && (
              <div className="p-8 text-center text-accent-red" role="alert">
                {error}
              </div>
            )}

            {query.length >= 2 && !loading && !error && results.length === 0 && (
              <div className="p-8 text-center text-text-muted">
                No products found for &quot;{query}&quot;
              </div>
            )}

            {results.length > 0 && (
              <div className="p-4">
                <div className="grid gap-3">
                  {results.map((product) => (
                    <Link
                      key={product._id}
                      href={`/merch/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-4 bg-surface-elevated hover:bg-background border border-border hover:border-accent-primary transition-all group"
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-background border border-border flex-shrink-0 relative overflow-hidden">
                        {product.images?.[0]?.asset?.url ? (
                          <Image
                            src={product.images[0].asset.url}
                            alt={product.images[0].alt || product.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform"
                            sizes="64px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg
                              className="w-8 h-8 text-text-muted/30"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bebas text-xl uppercase tracking-wide text-text-primary group-hover:text-accent-primary transition-colors truncate">
                          {product.title}
                        </h3>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-sm text-text-muted uppercase tracking-wide">
                            {product.currency}
                          </span>
                          <span className="text-lg font-bold text-accent-primary">
                            ${(product.priceCents / 100).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0 text-text-muted group-hover:text-accent-primary transition-colors">
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
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>

                {results.length === 8 && (
                  <div className="mt-4 text-center text-sm text-text-muted">
                    Showing top 8 results. Try refining your search for more specific results.
                  </div>
                )}
              </div>
            )}

            {query.length > 0 && query.length < 2 && (
              <div className="p-8 text-center text-text-muted text-sm">
                Type at least 2 characters to search
              </div>
            )}
          </div>

          {/* Keyboard hint */}
          <div className="px-6 py-3 border-t border-border bg-surface-elevated">
            <p className="text-xs text-text-muted text-center uppercase tracking-wider">
              Press <kbd className="px-2 py-1 bg-background border border-border text-text-secondary rounded text-xs font-mono">ESC</kbd> to close
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
