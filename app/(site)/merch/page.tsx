import {Metadata} from 'next'
import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import {allProductsQuery, merchPageQuery} from '@/sanity/lib/queries'
import {ProductCard} from '@/components/ui/ProductCard'
import {AnimatedHero} from '@/components/ui/AnimatedHero'
import {AnimatedSection} from '@/components/animations/AnimatedSection'

export const metadata: Metadata = {
  title: 'Merch | Kivett Bednar',
  description: 'Official merchandise and apparel',
}

export default async function MerchPage() {
  const [products, merchPage] = await Promise.all([
    sanityFetch({query: allProductsQuery}).then((r) => r.data),
    sanityFetch({query: merchPageQuery}).then((r) => r.data),
  ])

  // Fallback if no content in Sanity yet
  if (!merchPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading merch page content from Sanity Studio...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AnimatedHero
        title={merchPage.heroHeading || 'Merch'}
        subtitle={merchPage.heroSubheading || 'Official Kivett Bednar gear and music'}
        variant="shows"
        backgroundImage={merchPage.heroImage || undefined}
        backgroundAlt={merchPage.heroImage?.alt || 'Kivett Bednar merchandise'}
        desktopPosition={merchPage.heroImage?.desktopPosition || undefined}
        mobilePosition={merchPage.heroImage?.mobilePosition || undefined}
      />

      {/* Content */}
      <div className="bg-surface py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {products && products.length > 0 ? (
              <>
                {/* Content Heading */}
                {(merchPage.contentHeading || merchPage.contentSubheading) && (
                  <AnimatedSection animation="fadeIn">
                    <div className="text-center mb-16">
                      {merchPage.contentHeading && (
                        <h2 className="text-5xl font-bold text-text-primary mb-4">
                          {merchPage.contentHeading}
                        </h2>
                      )}
                      {merchPage.contentSubheading && (
                        <p className="text-xl text-text-secondary">
                          {merchPage.contentSubheading}
                        </p>
                      )}
                    </div>
                  </AnimatedSection>
                )}

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product: any, index: number) => (
                    <AnimatedSection key={product._id} animation="fadeUp" delay={0.1 * index}>
                      <ProductCard product={product} />
                    </AnimatedSection>
                  ))}
                </div>
              </>
            ) : (
              <AnimatedSection animation="fadeUp">
                <div className="text-center py-24">
                  <div className="bg-gradient-to-br from-surface-elevated to-background rounded-2xl p-16 max-w-2xl mx-auto border-2 border-border">
                    <h2 className="text-4xl font-bold text-text-primary mb-4">
                      {merchPage.emptyStateHeading || 'Merch Store Opening Soon!'}
                    </h2>
                    <p className="text-xl text-text-secondary mb-8">
                      {merchPage.emptyStateText || 'T-shirts, vinyl records, and exclusive gear coming your way. Check back for updates or follow on social media for the launch announcement.'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        href={merchPage.emptyStateButton1Link || '/contact'}
                        className="btn-primary"
                      >
                        {merchPage.emptyStateButton1Text || 'Get Notified'}
                      </Link>
                      <Link
                        href={merchPage.emptyStateButton2Link || '/shows'}
                        className="btn-secondary"
                      >
                        {merchPage.emptyStateButton2Text || 'See Live Shows'}
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
