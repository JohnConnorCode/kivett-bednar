import {NextRequest, NextResponse} from 'next/server'
import Stripe from 'stripe'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') as string

  let event: Stripe.Event
  if (process.env.STRIPE_ENABLED === 'true') {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {apiVersion: '2025-02-24.acacia' as any})
      event = stripe.webhooks.constructEvent(body, sig, secret || '')
    } catch (err: any) {
      return new NextResponse(`Webhook Error: ${err.message}`, {status: 400})
    }
  } else {
    return NextResponse.json({error: 'Stripe webhooks are disabled'}, {status: 501})
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      if (process.env.STRIPE_ENABLED === 'true') {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {apiVersion: '2025-02-24.acacia' as any})
        // Retrieve line items
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
        // Build Gelato items from metadata
        const items: any[] = []
        for (const li of lineItems.data) {
          const prodId = (li.price?.product as any)?.id // may be undefined when using product_data
          // when using product_data, metadata is on price?.product? not available; fetch the Price expanded? Simpler: parse from description if not available
          // Safer: retrieve the Price with expand? Alternatively, we stored metadata on product_data, Stripe attaches it to the generated Product
          let productMeta: Record<string, any> | null = null
          if (li.price && typeof li.price.product === 'string') {
            const price = await stripe.prices.retrieve(li.price.id, {expand: ['product']})
            const prod = price.product as Stripe.Product
            productMeta = (prod.metadata || null) as any
          } else if (li.price && (li.price.product as any)?.metadata) {
            productMeta = ((li.price.product as any).metadata || null) as any
          }
          if (!productMeta) continue
          const productId = productMeta.productId
          const slug = productMeta.slug
          const options = JSON.parse(productMeta.options || '{}')

          // Fetch full product from Sanity
          const {client: sanityClient} = await import('@/sanity/lib/client')
          const {productBySlugQuery} = await import('@/sanity/lib/queries')
          // Note: import type system differs in route; using dynamic import above
          const product = await sanityClient.fetch(productBySlugQuery, {slug})
          if (!product || !product.gelatoProductUid) continue
          const files = (product.printAreas || [])
            .filter((pa: any) => pa?.artwork?.asset?.url)
            .map((pa: any) => ({type: pa.areaName || 'front', url: pa.artwork.asset.url}))
          items.push({
            productUid: product.gelatoProductUid,
            quantity: li.quantity || 1,
            attributes: options,
            files,
          })
        }

        // Build recipient from shipping_details
        const sd = session.shipping_details
        const recipient = {
          addressLine1: sd?.address?.line1 || '',
          city: sd?.address?.city || '',
          country: sd?.address?.country || 'US',
          postalCode: sd?.address?.postal_code || '',
          state: sd?.address?.state || undefined,
          name: sd?.name || undefined,
          email: session.customer_details?.email || undefined,
        }

        const {createGelatoOrder} = await import('@/lib/gelato')
        let gelatoOrderId: string | undefined
        try {
          const gelato = await createGelatoOrder({recipient, items, marketplaceOrderId: session.id})
          gelatoOrderId = gelato?.orderId || gelato?.id
        } catch (e) {
          console.error('Gelato order error', e)
        }

        // Create order in Sanity with full item details
        try {
          const {createClient} = await import('next-sanity')
          const {projectId, dataset, apiVersion} = await import('@/sanity/lib/api')
          const {token} = await import('@/sanity/lib/token')
          const writeClient = createClient({projectId, dataset, apiVersion, token, useCdn: false})

          // Build order items from line items
          const orderItems = []
          let totalCents = 0

          for (const li of lineItems.data) {
            const productMeta = await (async () => {
              if (li.price && typeof li.price.product === 'string') {
                const price = await stripe.prices.retrieve(li.price.id, {expand: ['product']})
                return (price.product as Stripe.Product).metadata || {}
              } else if (li.price && (li.price.product as any)?.metadata) {
                return (li.price.product as any).metadata || {}
              }
              return {}
            })()

            const itemTotalCents = (li.amount_total || 0)
            totalCents += itemTotalCents

            orderItems.push({
              productId: productMeta.productId || '',
              productTitle: li.description || 'Unknown Product',
              productSlug: productMeta.slug || '',
              quantity: li.quantity || 1,
              priceCents: li.price?.unit_amount || 0,
              options: productMeta.options || '{}',
              gelatoProductUid: productMeta.gelatoProductUid || '',
              imageUrl: productMeta.imageUrl || '',
            })
          }

          await writeClient.create({
            _type: 'order',
            stripeSessionId: session.id,
            email: session.customer_details?.email || null,
            name: session.customer_details?.name || null,
            phone: session.customer_details?.phone || null,
            address: {
              line1: session.shipping_details?.address?.line1 || null,
              line2: session.shipping_details?.address?.line2 || null,
              city: session.shipping_details?.address?.city || null,
              state: session.shipping_details?.address?.state || null,
              postalCode: session.shipping_details?.address?.postal_code || null,
              country: session.shipping_details?.address?.country || null,
            },
            items: orderItems,
            totalCents,
            currency: session.currency?.toUpperCase() || 'USD',
            gelatoOrderId: gelatoOrderId || null,
            status: gelatoOrderId ? 'submitted' : 'pending',
            createdAt: new Date().toISOString(),
          })

          console.log(`Created order in Sanity for session ${session.id}`, {
            itemCount: orderItems.length,
            totalCents,
            gelatoOrderId,
          })
        } catch (e) {
          console.error('Failed to create Sanity order', e)
        }
      }
    }
    return NextResponse.json({received: true})
  } catch (err: any) {
    return new NextResponse(`Handler Error: ${err.message}`, {status: 500})
  }
}
