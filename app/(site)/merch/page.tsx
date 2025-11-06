import {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {merchPageQuery, allProductsQuery} from '@/sanity/lib/queries'
import {MerchPageContent} from './MerchPageContent'

// Demo products with placeholder images for when Sanity has no products
const demoProducts = [
  {
    _id: 'demo-1',
    title: 'Blues Legend T-Shirt',
    slug: 'blues-legend-tshirt',
    images: [{
      asset: {url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop'},
      alt: 'Black t-shirt with blues guitar graphic'
    }],
    priceCents: 2999,
    compareAtPriceCents: 3999,
    onSale: true,
    currency: 'USD',
    category: 'apparel',
    stockStatus: 'in_stock',
    featured: true,
    badges: ['bestseller', 'new'],
    inventoryQuantity: 47,
    trackInventory: true,
    lowStockThreshold: 5
  },
  {
    _id: 'demo-2',
    title: 'Signature Guitar Pick Set',
    slug: 'signature-guitar-pick-set',
    images: [{
      asset: {url: 'https://images.unsplash.com/photo-1556449895-a33c9dba33dd?w=800&h=800&fit=crop'},
      alt: 'Set of custom guitar picks'
    }],
    priceCents: 1299,
    currency: 'USD',
    category: 'accessories',
    stockStatus: 'in_stock',
    featured: true,
    badges: ['limited'],
    inventoryQuantity: 8,
    trackInventory: true,
    lowStockThreshold: 10
  },
  {
    _id: 'demo-3',
    title: 'Live Blues Album Vinyl',
    slug: 'live-blues-album-vinyl',
    images: [{
      asset: {url: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&h=800&fit=crop'},
      alt: 'Vinyl record album cover'
    }],
    priceCents: 3499,
    currency: 'USD',
    category: 'music',
    stockStatus: 'in_stock',
    featured: true,
    badges: ['new'],
    inventoryQuantity: 23,
    trackInventory: true,
    lowStockThreshold: 5
  },
  {
    _id: 'demo-4',
    title: 'Vintage Blues Hoodie',
    slug: 'vintage-blues-hoodie',
    images: [{
      asset: {url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop'},
      alt: 'Black hoodie with vintage blues design'
    }],
    priceCents: 5499,
    compareAtPriceCents: 6999,
    onSale: true,
    currency: 'USD',
    category: 'apparel',
    stockStatus: 'in_stock',
    featured: false,
    badges: ['back-in-stock'],
    inventoryQuantity: 15,
    trackInventory: true,
    lowStockThreshold: 5
  },
  {
    _id: 'demo-5',
    title: 'Concert Poster Print',
    slug: 'concert-poster-print',
    images: [{
      asset: {url: 'https://images.unsplash.com/photo-1499415479124-43c32433a620?w=800&h=800&fit=crop'},
      alt: 'Vintage-style concert poster'
    }],
    priceCents: 1999,
    currency: 'USD',
    category: 'prints',
    stockStatus: 'in_stock',
    featured: false,
    inventoryQuantity: 100,
    trackInventory: true,
    lowStockThreshold: 5
  },
  {
    _id: 'demo-6',
    title: 'Blues Master Baseball Cap',
    slug: 'blues-master-baseball-cap',
    images: [{
      asset: {url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop'},
      alt: 'Black baseball cap with embroidered logo'
    }],
    priceCents: 2799,
    currency: 'USD',
    category: 'accessories',
    stockStatus: 'in_stock',
    featured: false,
    inventoryQuantity: 34,
    trackInventory: true,
    lowStockThreshold: 5
  },
  {
    _id: 'demo-7',
    title: 'Acoustic Sessions CD',
    slug: 'acoustic-sessions-cd',
    images: [{
      asset: {url: 'https://images.unsplash.com/photo-1611583184876-b7c12335e294?w=800&h=800&fit=crop'},
      alt: 'CD album cover'
    }],
    priceCents: 1499,
    currency: 'USD',
    category: 'music',
    stockStatus: 'in_stock',
    featured: false,
    inventoryQuantity: 67,
    trackInventory: true,
    lowStockThreshold: 5
  },
  {
    _id: 'demo-8',
    title: 'Tour 2025 Long Sleeve',
    slug: 'tour-2025-long-sleeve',
    images: [{
      asset: {url: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&h=800&fit=crop'},
      alt: 'Long sleeve shirt with tour dates'
    }],
    priceCents: 3999,
    currency: 'USD',
    category: 'apparel',
    stockStatus: 'in_stock',
    featured: false,
    badges: ['tour-exclusive'],
    inventoryQuantity: 28,
    trackInventory: true,
    lowStockThreshold: 5
  },
]

export const metadata: Metadata = {
  title: 'Merch | Kivett Bednar',
  description: 'Official merchandise and music',
}

// Revalidate every 60 seconds (ISR)
export const revalidate = 60

export default async function MerchPage() {
  let merchPage = null
  let products = demoProducts // Default to demo products

  try {
    // Fetch merch page content from Sanity
    merchPage = await sanityFetch({query: merchPageQuery}).then((r) => r.data)
  } catch (error) {
    console.warn('Failed to fetch merch page data, using fallback content:', error)
  }

  try {
    // Fetch products from Sanity
    const sanityProducts = await sanityFetch({query: allProductsQuery}).then((r) => r.data)

    // Merge Sanity products with demo products, prioritizing demo products
    // This ensures we always show all demo products plus any additional Sanity products
    if (sanityProducts && sanityProducts.length > 0) {
      // Filter out any Sanity products that have the same IDs as demo products
      const uniqueSanityProducts = sanityProducts.filter(
        (sp: any) => !demoProducts.some(dp => dp._id === sp._id)
      )
      // Combine demo products first, then unique Sanity products
      products = [...demoProducts, ...uniqueSanityProducts]
    }
  } catch (error) {
    console.warn('Failed to fetch products from Sanity, using demo products:', error)
  }

  return <MerchPageContent merchPage={merchPage} products={products} />
}
