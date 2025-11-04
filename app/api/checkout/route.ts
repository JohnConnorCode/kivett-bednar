import {NextResponse} from 'next/server'
import Stripe from 'stripe'
import {client} from '@/sanity/lib/client'
import {productBySlugQuery} from '@/sanity/lib/queries'

let stripe: Stripe
if (process.env.STRIPE_ENABLED === 'true') {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-02-24.acacia' as any,
  })
}

export async function POST(req: Request) {
  if (process.env.STRIPE_ENABLED !== 'true') {
    return NextResponse.json({error: 'Checkout is disabled'}, {status: 501})
  }
  try {
    const {items} = await req.json()
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({error: 'Empty cart'}, {status: 400})
    }

    // Validate items against Sanity
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []
    for (const it of items) {
      const product = await client.fetch(productBySlugQuery, {slug: it.slug})
      if (!product) return NextResponse.json({error: 'Invalid product'}, {status: 400})
      const unitAmount = (product.priceCents as number) || it.priceCents
      line_items.push({
        quantity: it.quantity,
        price_data: {
          currency: (product.currency as string) || it.currency || 'USD',
          unit_amount: unitAmount,
          product_data: {
            name: product.title,
            images: product.images?.[0]?.asset?.url ? [product.images[0].asset.url] : [],
            metadata: {
              productId: product._id,
              slug: it.slug,
              options: it.options ? JSON.stringify(it.options) : '{}',
            },
          },
        },
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      shipping_address_collection: {allowed_countries: ['US', 'CA', 'GB', 'IE', 'DE', 'FR', 'ES', 'IT', 'AU', 'NZ']},
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/merch?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/cart?canceled=1`,
      metadata: {
        // Simple checksum for debugging
        cartSize: String(items.length),
      },
    })

    return NextResponse.json({id: session.id, url: session.url})
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({error: err.message || 'Checkout failed'}, {status: 500})
  }
}
