import {NextResponse} from 'next/server'
import {client} from '@/sanity/lib/client'
import {promoCodeByCodeQuery} from '@/sanity/lib/queries'

export async function POST(req: Request) {
  try {
    const {code, cartTotal} = await req.json()

    if (!code) {
      return NextResponse.json({error: 'Code is required'}, {status: 400})
    }

    // Fetch promo code
    const promoCode = await client.fetch(promoCodeByCodeQuery, {
      code: code.toUpperCase(),
    })

    if (!promoCode) {
      return NextResponse.json({error: 'Invalid promo code'}, {status: 404})
    }

    // Check if code is still valid
    const now = new Date()
    if (promoCode.validFrom && new Date(promoCode.validFrom) > now) {
      return NextResponse.json({error: 'This promo code is not yet valid'}, {status: 400})
    }

    if (promoCode.validUntil && new Date(promoCode.validUntil) < now) {
      return NextResponse.json({error: 'This promo code has expired'}, {status: 400})
    }

    // Check usage limit
    if (promoCode.maxUses !== -1 && promoCode.currentUses >= promoCode.maxUses) {
      return NextResponse.json({error: 'This promo code has reached its usage limit'}, {status: 400})
    }

    // Check minimum purchase
    if (promoCode.minimumPurchaseCents && cartTotal < promoCode.minimumPurchaseCents) {
      const minAmount = (promoCode.minimumPurchaseCents / 100).toFixed(2)
      return NextResponse.json(
        {error: `Minimum purchase of $${minAmount} required`},
        {status: 400}
      )
    }

    // Calculate discount
    let discountCents = 0
    if (promoCode.discountType === 'percentage') {
      discountCents = Math.round((cartTotal * promoCode.discountValue) / 100)
    } else if (promoCode.discountType === 'fixed') {
      discountCents = promoCode.discountValue
    } else if (promoCode.discountType === 'free_shipping') {
      discountCents = 0 // Would be calculated based on shipping cost
    }

    return NextResponse.json({
      success: true,
      code: promoCode.code,
      discountType: promoCode.discountType,
      discountCents,
      description: promoCode.description,
    })
  } catch (error: any) {
    console.error('Promo code error:', error)
    return NextResponse.json({error: error.message || 'Failed to validate promo code'}, {status: 500})
  }
}
