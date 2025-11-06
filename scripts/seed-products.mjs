#!/usr/bin/env node
import https from 'node:https'
import {createClient} from 'next-sanity'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({path: '.env.local'})

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-09-25'
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN

if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN or SANITY_API_READ_TOKEN in .env.local')
  process.exit(1)
}

if (projectId === 'placeholder-project-id') {
  console.error('Please configure NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local')
  process.exit(1)
}

console.log(`Using Sanity project: ${projectId}, dataset: ${dataset}`)

const client = createClient({projectId, dataset, apiVersion, token, useCdn: false})

async function uploadImageFromUrl(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = []
      res.on('data', (chunk) => chunks.push(chunk))
      res.on('end', async () => {
        try {
          const buffer = Buffer.concat(chunks)
          const asset = await client.assets.upload('image', buffer, {filename})
          resolve({_type: 'image', asset: {_type: 'reference', _ref: asset._id}, alt: filename})
        } catch (err) {
          reject(err)
        }
      })
      res.on('error', reject)
    }).on('error', reject)
  })
}

async function run() {
  console.log('Seeding 8 demo products to Sanity...')

  const now = new Date().toISOString()

  // Define 8 demo products with Unsplash images
  const productDefs = [
    {
      title: 'Blues Legend T-Shirt',
      slug: 'blues-legend-tshirt',
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
      altText: 'Black t-shirt with blues guitar graphic',
      description: 'Premium cotton t-shirt featuring iconic blues guitar artwork. Comfortable fit for everyday wear.',
      priceCents: 2999,
      compareAtPriceCents: 3999,
      onSale: true,
      category: 'apparel',
      featured: true,
      badges: ['bestseller', 'new'],
      inventoryQuantity: 47,
      options: [{name: 'Size', values: ['S', 'M', 'L', 'XL', '2XL']}, {name: 'Color', values: ['Black', 'Navy']}],
    },
    {
      title: 'Signature Guitar Pick Set',
      slug: 'signature-guitar-pick-set',
      imageUrl: 'https://images.unsplash.com/photo-1556449895-a33c9dba33dd?w=800&h=800&fit=crop',
      altText: 'Set of custom guitar picks',
      description: 'Limited edition signature guitar pick set. Six premium picks with custom design.',
      priceCents: 1299,
      category: 'accessories',
      featured: true,
      badges: ['limited'],
      inventoryQuantity: 8,
      lowStockThreshold: 10,
    },
    {
      title: 'Live Blues Album Vinyl',
      slug: 'live-blues-album-vinyl',
      imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&h=800&fit=crop',
      altText: 'Vinyl record album cover',
      description: 'Live recording from Austin Blues Club. High-quality 180g vinyl pressing.',
      priceCents: 3499,
      category: 'music',
      featured: true,
      badges: ['new'],
      inventoryQuantity: 23,
    },
    {
      title: 'Vintage Blues Hoodie',
      slug: 'vintage-blues-hoodie',
      imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop',
      altText: 'Black hoodie with vintage blues design',
      description: 'Cozy hoodie with vintage-inspired blues graphics. Perfect for cool evenings.',
      priceCents: 5499,
      compareAtPriceCents: 6999,
      onSale: true,
      category: 'apparel',
      featured: false,
      badges: ['back-in-stock'],
      inventoryQuantity: 15,
      options: [{name: 'Size', values: ['S', 'M', 'L', 'XL', '2XL']}],
    },
    {
      title: 'Concert Poster Print',
      slug: 'concert-poster-print',
      imageUrl: 'https://images.unsplash.com/photo-1499415479124-43c32433a620?w=800&h=800&fit=crop',
      altText: 'Vintage-style concert poster',
      description: 'Vintage-style concert poster. Museum-quality print on heavy archival paper.',
      priceCents: 1999,
      category: 'prints',
      featured: false,
      inventoryQuantity: 100,
      options: [{name: 'Size', values: ['12x18 in', '18x24 in', '24x36 in']}],
    },
    {
      title: 'Blues Master Baseball Cap',
      slug: 'blues-master-baseball-cap',
      imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop',
      altText: 'Black baseball cap with embroidered logo',
      description: 'Classic baseball cap with embroidered logo. Adjustable strap for perfect fit.',
      priceCents: 2799,
      category: 'accessories',
      featured: false,
      inventoryQuantity: 34,
      options: [{name: 'Color', values: ['Black', 'Navy', 'Khaki']}],
    },
    {
      title: 'Acoustic Sessions CD',
      slug: 'acoustic-sessions-cd',
      imageUrl: 'https://images.unsplash.com/photo-1611583184876-b7c12335e294?w=800&h=800&fit=crop',
      altText: 'CD album cover',
      description: 'Intimate acoustic recordings from the studio. Includes 12 original tracks.',
      priceCents: 1499,
      category: 'music',
      featured: false,
      inventoryQuantity: 67,
    },
    {
      title: 'Tour 2025 Long Sleeve',
      slug: 'tour-2025-long-sleeve',
      imageUrl: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&h=800&fit=crop',
      altText: 'Long sleeve shirt with tour dates',
      description: 'Exclusive tour merchandise with 2025 tour dates on the back. Soft, durable fabric.',
      priceCents: 3999,
      category: 'apparel',
      featured: false,
      badges: ['tour-exclusive'],
      inventoryQuantity: 28,
      options: [{name: 'Size', values: ['S', 'M', 'L', 'XL', '2XL']}],
    },
  ]

  const docs = []
  for (const def of productDefs) {
    console.log(`Uploading image for ${def.title}...`)
    const image = await uploadImageFromUrl(def.imageUrl, def.altText).catch((err) => {
      console.warn(`Failed to upload image for ${def.title}:`, err.message)
      return null
    })

    docs.push({
      _type: 'product',
      title: def.title,
      slug: {current: def.slug},
      description: [{
        _type: 'block',
        style: 'normal',
        children: [{_type: 'span', text: def.description}]
      }],
      images: image ? [image] : [],
      priceCents: def.priceCents,
      compareAtPriceCents: def.compareAtPriceCents,
      onSale: def.onSale || false,
      currency: 'USD',
      category: def.category,
      stockStatus: 'in_stock',
      featured: def.featured || false,
      badges: def.badges || [],
      inventoryQuantity: def.inventoryQuantity || -1,
      trackInventory: true,
      lowStockThreshold: def.lowStockThreshold || 5,
      options: def.options || [],
      createdAt: now,
    })
  }

  for (const doc of docs) {
    try {
      const exists = await client.fetch(`*[_type == "product" && slug.current == $slug][0]{_id}`, {slug: doc.slug.current})
      if (exists?._id) {
        await client.patch(exists._id).set(doc).commit()
        console.log('Updated', doc.title)
      } else {
        await client.create(doc)
        console.log('Created', doc.title)
      }
    } catch (e) {
      console.error('Failed for', doc.title, e.message)
    }
  }

  console.log('Done.')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})

