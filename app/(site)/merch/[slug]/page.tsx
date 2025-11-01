import {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Image from 'next/image'
import {sanityFetch} from '@/sanity/lib/live'
import {productBySlugQuery} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'
import {PortableText} from '@portabletext/react'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const {data: product} = await sanityFetch({
    query: productBySlugQuery,
    params: {slug},
  })

  return {
    title: product?.title ? `${product.title} | Kivett Bednar` : 'Product | Kivett Bednar',
    description: product?.seo?.description || 'Product details',
  }
}

export default async function ProductPage({params}: Props) {
  const {slug} = await params
  const {data: product} = await sanityFetch({
    query: productBySlugQuery,
    params: {slug},
  })

  if (!product) {
    notFound()
  }

  const price = (product.priceCents / 100).toFixed(2)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {product.images?.[0]?.asset && (
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                <Image
                  src={urlFor(product.images[0].asset).width(800).height(800).url()}
                  alt={product.images[0].alt || product.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1, 5).map((img: any, idx: number) => (
                  <div key={idx} className="relative aspect-square bg-muted rounded overflow-hidden">
                    <Image
                      src={urlFor(img.asset).width(200).height(200).url()}
                      alt={img.alt || ''}
                      fill
                      className="object-cover"
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
  )
}
