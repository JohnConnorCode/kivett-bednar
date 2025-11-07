import {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {client} from '@/sanity/lib/client'
import {sanityFetch} from '@/sanity/lib/live'
import {productBySlugQuery, relatedProductsByCategoryQuery} from '@/sanity/lib/queries'
import {ProductPageContent} from './ProductPageContent'
import {urlFor} from '@/sanity/lib/image'

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

  // Fetch product and related products in parallel
  const [productResult, relatedProductsResult] = await Promise.allSettled([
    sanityFetch({query: productBySlugQuery, params: {slug}}).then((r) => r.data),
    // Pre-fetch related products query (will be resolved after we have product data)
    sanityFetch({query: productBySlugQuery, params: {slug}})
      .then(async (r) => {
        const prod = r.data
        if (!prod) return []

        // If product has explicit related products, use those
        if (prod.relatedProducts && prod.relatedProducts.length > 0) {
          return prod.relatedProducts
        }

        // Otherwise fetch by category
        if (prod.category) {
          return sanityFetch({
            query: relatedProductsByCategoryQuery,
            params: {
              category: prod.category,
              excludeId: prod._id,
              limit: 4,
            },
          }).then((r) => r.data || [])
        }

        return []
      })
      .catch(() => [])
  ])

  const product = productResult.status === 'fulfilled' ? productResult.value : null
  const relatedProducts = relatedProductsResult.status === 'fulfilled' ? relatedProductsResult.value : []

  if (!product) {
    notFound()
  }

  const price = product.priceCents ? (product.priceCents / 100).toFixed(2) : '0.00'

  const productSlug: string = product.slug?.current || '';

  // Build image URLs on server
  const mainImageUrl = product.images?.[0]?.asset
    ? urlFor(product.images[0].asset).width(800).height(800).url()
    : undefined

  const thumbnailImages = product.images && product.images.length > 1
    ? product.images.slice(1, 5).map((img: any) => ({
        url: urlFor(img.asset).width(200).height(200).url(),
        alt: img.alt || ''
      }))
    : undefined

  // Build all images for lightbox (larger resolution)
  const allImages = product.images
    ? product.images.map((img: any) => ({
        url: urlFor(img.asset).width(1600).height(1600).url(),
        alt: img.alt || product.title || 'Product image'
      }))
    : []

  // Generate JSON-LD structured data for product
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: mainImageUrl,
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
      <ProductPageContent
        product={product}
        price={price}
        productSlug={productSlug}
        mainImageUrl={mainImageUrl}
        thumbnailImages={thumbnailImages}
        allImages={allImages}
        relatedProducts={relatedProducts}
      />
    </>
  )
}
