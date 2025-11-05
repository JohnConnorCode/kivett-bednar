/**
 * Script to add demo products to Sanity
 * Run with: npx tsx scripts/add-demo-products.ts
 */

import {client} from '../sanity/lib/client'

const demoProducts = [
  {
    _type: 'product',
    title: 'Classic Blues T-Shirt',
    slug: {current: 'classic-blues-tshirt'},
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Premium cotton t-shirt featuring original Kivett Bednar artwork. Comfortable, durable, and perfect for concerts or casual wear. The design captures the essence of blues music with a modern twist.',
          },
        ],
      },
    ],
    priceCents: 2999,
    currency: 'USD',
    category: 'apparel',
    stockStatus: 'in_stock',
    featured: true,
    options: [
      {
        name: 'Size',
        values: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Color',
        values: ['Black', 'Navy', 'Charcoal'],
      },
    ],
    shippingNotes: 'Ships within 3-5 business days. Free shipping on orders over $50.',
    seo: {
      title: 'Classic Blues T-Shirt | Kivett Bednar Official Merch',
      description:
        'Premium cotton t-shirt with original Kivett Bednar artwork. Available in multiple sizes and colors.',
    },
  },
  {
    _type: 'product',
    title: 'Live Blues Album - Vinyl',
    slug: {current: 'live-blues-album-vinyl'},
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Experience the raw energy of live blues performance. This limited edition vinyl captures the best moments from Kivett Bednar\'s legendary live shows. Includes 12 classic blues tracks remastered for vinyl.',
          },
        ],
      },
    ],
    priceCents: 3499,
    currency: 'USD',
    category: 'music',
    stockStatus: 'low_stock',
    featured: true,
    shippingNotes: 'Limited edition pressing. Ships within 1-2 business days in protective packaging.',
    seo: {
      title: 'Live Blues Album Vinyl | Kivett Bednar',
      description: 'Limited edition vinyl featuring live performances. Premium audio quality.',
    },
  },
  {
    _type: 'product',
    title: 'Guitar Pick Set',
    slug: {current: 'guitar-pick-set'},
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Professional quality guitar picks used by Kivett Bednar. Set includes 6 picks in various gauges (.60mm, .73mm, 1.0mm). Made from premium celluloid for superior tone and grip.',
          },
        ],
      },
    ],
    priceCents: 999,
    currency: 'USD',
    category: 'accessories',
    stockStatus: 'in_stock',
    featured: false,
    shippingNotes: 'Ships within 1-2 business days.',
    seo: {
      title: 'Professional Guitar Pick Set | Kivett Bednar',
      description: 'Premium celluloid guitar picks in multiple gauges.',
    },
  },
  {
    _type: 'product',
    title: 'Blues Concert Poster',
    slug: {current: 'blues-concert-poster'},
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Limited edition concert poster featuring stunning original artwork. High-quality print on premium archival paper. Perfect for framing and displaying your love of blues music.',
          },
        ],
      },
    ],
    priceCents: 1999,
    currency: 'USD',
    category: 'prints',
    stockStatus: 'in_stock',
    featured: false,
    options: [
      {
        name: 'Size',
        values: ['18x24', '24x36'],
      },
    ],
    shippingNotes: 'Shipped flat in protective tube. Ships within 2-3 business days.',
    seo: {
      title: 'Blues Concert Poster | Kivett Bednar Official Art',
      description: 'Limited edition concert poster on premium archival paper.',
    },
  },
  {
    _type: 'product',
    title: 'Hoodie - Tour Edition',
    slug: {current: 'hoodie-tour-edition'},
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Premium heavyweight hoodie featuring exclusive tour artwork. Made from soft, brushed fleece with a comfortable regular fit. Features include drawstring hood, kangaroo pocket, and ribbed cuffs.',
          },
        ],
      },
    ],
    priceCents: 5499,
    currency: 'USD',
    category: 'apparel',
    stockStatus: 'in_stock',
    featured: true,
    options: [
      {
        name: 'Size',
        values: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        name: 'Color',
        values: ['Black', 'Charcoal'],
      },
    ],
    shippingNotes: 'Ships within 3-5 business days. Free shipping on orders over $50.',
    seo: {
      title: 'Tour Edition Hoodie | Kivett Bednar Merch',
      description: 'Premium heavyweight hoodie with exclusive tour artwork.',
    },
  },
  {
    _type: 'product',
    title: 'Digital Album Download',
    slug: {current: 'digital-album-download'},
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Instant access to the complete digital album in high-quality MP3 and FLAC formats. Includes full album artwork and liner notes. Download link sent immediately upon purchase.',
          },
        ],
      },
    ],
    priceCents: 999,
    currency: 'USD',
    category: 'music',
    stockStatus: 'in_stock',
    featured: false,
    shippingNotes: 'Digital download - instant delivery. Download link valid for 30 days.',
    seo: {
      title: 'Digital Album Download | Kivett Bednar',
      description: 'High-quality digital album download in MP3 and FLAC formats.',
    },
  },
  {
    _type: 'product',
    title: 'Leather Guitar Strap',
    slug: {current: 'leather-guitar-strap'},
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Handcrafted genuine leather guitar strap with embossed logo. Features adjustable length (40-60 inches), suede backing for comfort, and heavy-duty rivets. Built to last a lifetime.',
          },
        ],
      },
    ],
    priceCents: 4999,
    currency: 'USD',
    category: 'accessories',
    stockStatus: 'in_stock',
    featured: false,
    options: [
      {
        name: 'Color',
        values: ['Brown', 'Black', 'Tan'],
      },
    ],
    shippingNotes: 'Handcrafted to order. Ships within 5-7 business days.',
    seo: {
      title: 'Leather Guitar Strap | Kivett Bednar Gear',
      description: 'Handcrafted genuine leather guitar strap with embossed logo.',
    },
  },
  {
    _type: 'product',
    title: 'Baseball Cap',
    slug: {current: 'baseball-cap'},
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Classic baseball cap with embroidered logo. 100% cotton twill construction with adjustable strap. Perfect for keeping the sun out of your eyes at outdoor shows.',
          },
        ],
      },
    ],
    priceCents: 2499,
    currency: 'USD',
    category: 'accessories',
    stockStatus: 'in_stock',
    featured: false,
    options: [
      {
        name: 'Color',
        values: ['Black', 'Navy', 'Olive'],
      },
    ],
    shippingNotes: 'Ships within 2-3 business days.',
    seo: {
      title: 'Baseball Cap | Kivett Bednar Official Merch',
      description: '100% cotton baseball cap with embroidered logo.',
    },
  },
]

async function addDemoProducts() {
  console.log('Adding demo products to Sanity...')

  for (const product of demoProducts) {
    try {
      const result = await client.create(product)
      console.log(`✓ Created: ${product.title} (${result._id})`)
    } catch (error: any) {
      console.error(`✗ Failed to create ${product.title}:`, error.message)
    }
  }

  console.log('\nDemo products added! Please add images in Sanity Studio.')
  console.log('Note: Products require at least one image to be valid.')
}

addDemoProducts().catch(console.error)
