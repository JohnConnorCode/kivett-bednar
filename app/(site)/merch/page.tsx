import {Metadata} from 'next'
import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import {allProductsQuery} from '@/sanity/lib/queries'
import {ProductCard} from '@/components/ui/ProductCard'

export const metadata: Metadata = {
  title: 'Merch | Kivett Bednar',
  description: 'Official merchandise and apparel',
}

export default async function MerchPage() {
  const {data: products} = await sanityFetch({
    query: allProductsQuery,
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-charcoal-900 via-midnight-500 to-charcoal-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(240,200,62,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-bone">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            Merch
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed text-amber-600 font-light">
            Official Kivett Bednar gear and music
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" className="w-full h-12 text-bone">
            <path d="M0,0 Q300,40 600,20 T1200,0 L1200,120 L0,120 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <div className="bg-bone py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product: any) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="bg-gradient-to-br from-midnight-500 to-charcoal-900 rounded-2xl p-16 max-w-2xl mx-auto border-2 border-amber-600/20">
                  <h2 className="text-4xl font-bold text-bone mb-4">
                    Merch Store Opening Soon!
                  </h2>
                  <p className="text-xl text-bone/80 mb-8">
                    T-shirts, vinyl records, and exclusive gear coming your way.
                    Check back for updates or follow on social media for the launch announcement.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="px-8 py-4 rounded-lg bg-amber-600 text-charcoal-900 font-bold hover:bg-amber-500 transition-all transform hover:scale-105"
                    >
                      Get Notified
                    </Link>
                    <Link
                      href="/shows"
                      className="px-8 py-4 rounded-lg border-2 border-bone text-bone font-semibold hover:bg-bone/10 transition-all"
                    >
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
