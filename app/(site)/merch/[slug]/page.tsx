import {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Image from 'next/image'
import {client} from '@/sanity/lib/client'
import {sanityFetch} from '@/sanity/lib/live'
import {productBySlugQuery} from '@/sanity/lib/queries'
import {useCart} from '@/components/ui/CartContext'
import React, {useState} from 'react'
import {urlFor} from '@/sanity/lib/image'
import {PortableText} from '@portabletext/react'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const product = await client.fetch(
    productBySlugQuery,
    {slug},
    {next: {revalidate: 60}}
  )

  return {
    title: product?.title ? `${product.title} | Kivett Bednar` : 'Product | Kivett Bednar',
    description: product?.seo?.description || 'Product details',
  }
}

export default async function ProductPage({params}: Props) {
  const {slug} = await params
  const product = await sanityFetch({query: productBySlugQuery, params: {slug}}).then((r) => r.data)

  if (!product) {
    notFound()
  }

  const price = product.priceCents ? (product.priceCents / 100).toFixed(2) : '0.00'

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
      <AddToCartUI product={product} />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              {product.images?.[0]?.asset && (
                <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(product.images[0].asset).width(800).height(800).url()}
                    alt={product.images[0].alt || product.title || 'Product image'}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority
                  />
                </div>
              )}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(1, 5).map((img: any, idx: number) => (
                    <div key={idx} className="relative aspect-square bg-muted rounded overflow-hidden">
                      <Image
                        src={urlFor(img.asset).width(200).height(200).url()}
                        alt={img.alt || ''}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 12vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
              <p className="text-3xl font-bold mb-6">
                {product.currency} ${price}
              </p>

              <ProductOptions product={product} />

              {product.description && (
                <div className="prose prose-lg mb-8">
                  <PortableText value={product.description} />
                </div>
              )}

              {product.shippingNotes && (
                <div className="bg-muted/50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-muted-foreground">{product.shippingNotes}</p>
                </div>
              )}

              <div className="border-t pt-6">
                <p className="text-sm text-muted-foreground">
                  Cart and checkout functionality coming soon!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function ProductOptions({product}: {product: any}) {
  'use client'
  const [selected, setSelected] = useState<Record<string, string>>({})
  const {addItem} = useCart()
  const price = product.priceCents ? (product.priceCents / 100).toFixed(2) : '0.00'

  return (
    <div className="mb-6">
      {product.options?.map((opt: any) => (
        <div key={opt.name} className="mb-4">
          <label className="block font-semibold mb-2">{opt.name}</label>
          <div className="flex gap-2 flex-wrap">
            {opt.values?.map((val: string) => (
              <button
                key={val}
                className={`px-3 py-2 border rounded ${selected[opt.name] === val ? 'bg-accent-primary/20 border-accent-primary' : ''}`}
                onClick={() => setSelected((s) => ({...s, [opt.name]: val}))}
                type="button"
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        className="btn-primary"
        onClick={() =>
          addItem({
            productId: product._id,
            title: product.title,
            slug: product.slug,
            imageUrl: product.images?.[0]?.asset?.url,
            priceCents: product.priceCents,
            currency: product.currency || 'USD',
            quantity: 1,
            options: Object.keys(selected).length ? selected : undefined,
          })
        }
        type="button"
      >
        Add to cart — {product.currency} ${price}
      </button>
    </div>
  )
}

function AddToCartUI({product}: {product: any}) {
  'use client'
  return null
}
