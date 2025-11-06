import {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Image from 'next/image'
import {client} from '@/sanity/lib/client'
import {sanityFetch} from '@/sanity/lib/live'
import {productBySlugQuery} from '@/sanity/lib/queries'
import {PurchaseSection} from '@/components/merch/ProductPurchase'
import {urlFor} from '@/sanity/lib/image'
import {PortableText} from '@portabletext/react'

type Props = {
  params: Promise<{slug: string}>
}

// Revalidate every 60 seconds (ISR)
export const revalidate = 60

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  let product = null

  try {
    product = await client.fetch(
      productBySlugQuery,
      {slug},
      {next: {revalidate: 60}}
    )
  } catch (error) {
    console.warn(`Failed to fetch product metadata for slug: ${slug}`, error)
  }

  return {
    title: product?.title ? `${product.title} | Kivett Bednar` : 'Product | Kivett Bednar',
    description: product?.seo?.description || 'Product details',
  }
}

export default async function ProductPage({params}: Props) {
  const {slug} = await params
  let product = null

  try {
    product = await sanityFetch({query: productBySlugQuery, params: {slug}}).then((r) => r.data)
  } catch (error) {
    console.warn(`Failed to fetch product for slug: ${slug}`, error)
  }

  if (!product) {
    notFound()
  }

  const price = product.priceCents ? (product.priceCents / 100).toFixed(2) : '0.00'

  const productSlug: string = product.slug?.current || '';

  // Generate JSON-LD structured data for product
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.images?.[0]?.asset
      ? urlFor(product.images[0].asset).width(800).height(800).url()
      : undefined,
    description: product.seo?.description || product.title,
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: product.currency || 'USD',
      availability: 'https://schema.org/InStock',
    },
    brand: {
      '@type': 'Brand',
      name: 'Kivett Bednar',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(productJsonLd)}}
      />

      {/* Hero Section with Product Title */}
      <div className="relative bg-background border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px bg-accent-primary w-12" />
              <span className="text-accent-primary text-sm uppercase tracking-wider font-bold">
                Official Merch
              </span>
            </div>
            <h1 className="font-bebas text-6xl md:text-7xl uppercase tracking-wide text-text-primary mb-4">
              {product.title}
            </h1>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-bold text-accent-primary">${price}</span>
              <span className="text-text-muted uppercase tracking-wide">{product.currency}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-surface py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {/* Images Section */}
              <div className="space-y-6">
                {/* Main Image */}
                {product.images?.[0]?.asset && (
                  <div className="relative aspect-square bg-background border border-border overflow-hidden group">
                    <Image
                      src={urlFor(product.images[0].asset).width(800).height(800).url()}
                      alt={product.images[0].alt || product.title || 'Product image'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(min-width: 768px) 50vw, 100vw"
                      priority
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                )}

                {/* Thumbnail Gallery */}
                {product.images && product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {product.images.slice(1, 5).map((img: any, idx: number) => (
                      <div
                        key={idx}
                        className="relative aspect-square bg-background border border-border overflow-hidden group cursor-pointer hover:border-accent-primary transition-colors"
                      >
                        <Image
                          src={urlFor(img.asset).width(200).height(200).url()}
                          alt={img.alt || ''}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="(min-width: 768px) 12vw, 25vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Details Section */}
              <div className="space-y-8">
                {/* Description */}
                {product.description && (
                  <div className="prose prose-invert prose-lg max-w-none">
                    <div className="text-text-secondary leading-relaxed">
                      <PortableText value={product.description} />
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Purchase Section */}
                <div className="bg-surface-elevated border border-border p-8">
                  <h3 className="font-bebas text-2xl uppercase tracking-wide text-text-primary mb-6">
                    Select Options
                  </h3>
                  <PurchaseSection
                    product={{
                      _id: product._id,
                      title: product.title,
                      slug: productSlug,
                      priceCents: product.priceCents,
                      currency: product.currency,
                      options: product.options || [],
                      imageUrl: product.images?.[0]?.asset?.url || undefined
                    }}
                  />
                </div>

                {/* Shipping Info */}
                {product.shippingNotes && (
                  <div className="bg-background/50 border border-border p-6">
                    <div className="flex gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-accent-primary flex-shrink-0"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                        />
                      </svg>
                      <div>
                        <h4 className="font-bold text-text-primary mb-1 uppercase tracking-wide text-sm">
                          Shipping Information
                        </h4>
                        <p className="text-text-secondary text-sm">{product.shippingNotes}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-background/30 border border-border p-4">
                    <div className="text-accent-primary font-bold uppercase tracking-wider mb-1">
                      Authentic
                    </div>
                    <div className="text-text-muted">Official merchandise</div>
                  </div>
                  <div className="bg-background/30 border border-border p-4">
                    <div className="text-accent-primary font-bold uppercase tracking-wider mb-1">
                      Quality
                    </div>
                    <div className="text-text-muted">Premium materials</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
