import {NextRequest, NextResponse} from 'next/server'
import Stripe from 'stripe'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') as string

  let event: Stripe.Event
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {apiVersion: '2024-06-20'})
    event = stripe.webhooks.constructEvent(body, sig, secret || '')
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, {status: 400})
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      // TODO: Call Gelato order creation here using session details
      console.log('Stripe checkout completed', session.id)
    }
    return NextResponse.json({received: true})
  } catch (err: any) {
    return new NextResponse(`Handler Error: ${err.message}`, {status: 500})
  }
}

