"use client"

import {useEffect, useState} from 'react'
import {useSearchParams} from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {useCart} from '@/components/ui/CartContext'

type OrderData = {
  orderId: string
  items: any[]
  totalCents: number
  shippingInfo: any
  orderDate: string
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const {clear} = useCart()
  const [orderData, setOrderData] = useState<OrderData | null>(null)

  useEffect(() => {
    // Load order from sessionStorage
    const storedOrder = sessionStorage.getItem('lastOrder')
    if (storedOrder) {
      const data = JSON.parse(storedOrder)
      setOrderData(data)
      // Clear cart after successful order
      clear()
      // Clear session storage
      sessionStorage.removeItem('lastOrder')
    }
  }, [clear])

  if (!orderData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-surface-elevated border border-border p-16 max-w-2xl mx-auto text-center">
          <h1 className="font-bebas text-4xl uppercase tracking-wide text-text-primary mb-4">
            No Order Found
          </h1>
          <p className="text-text-secondary mb-8">
            We couldn't find your order information.
          </p>
          <Link href="/merch" className="btn-primary inline-flex">
            Browse Merch
          </Link>
        </div>
      </div>
    )
  }

  const orderDate = new Date(orderData.orderDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-6">
              <div className="w-24 h-24 bg-green-600/20 border-2 border-green-600 rounded-full flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-12 h-12 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px bg-accent-primary w-12" />
              <span className="text-accent-primary text-sm uppercase tracking-wider font-bold">
                Order Confirmed
              </span>
              <div className="h-px bg-accent-primary w-12" />
            </div>

            <h1 className="font-bebas text-6xl md:text-7xl uppercase tracking-wide text-text-primary mb-4">
              Thank You!
            </h1>

            <p className="text-xl text-text-secondary mb-8">
              Your order has been received and is being processed.
              <br />
              A confirmation email has been sent to{' '}
              <span className="text-accent-primary font-bold">
                {orderData.shippingInfo.email}
              </span>
            </p>

            <div className="inline-block bg-surface-elevated border border-accent-primary px-8 py-4">
              <div className="text-sm text-text-muted uppercase tracking-wider mb-1">
                Order Number
              </div>
              <div className="font-bebas text-3xl text-accent-primary tracking-wider">
                {orderData.orderId}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-surface py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Order Details */}
              <div className="bg-surface-elevated border border-border p-8">
                <h2 className="font-bebas text-2xl uppercase tracking-wide text-text-primary mb-6 flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-accent-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  Order Details
                </h2>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-text-muted uppercase tracking-wide mb-1">
                      Order Date
                    </div>
                    <div className="text-text-primary">{orderDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-muted uppercase tracking-wide mb-1">
                      Order Total
                    </div>
                    <div className="text-2xl font-bold text-accent-primary">
                      ${(orderData.totalCents / 100).toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-text-muted uppercase tracking-wide mb-1">
                      Payment Status
                    </div>
                    <div className="inline-block bg-green-600/20 text-green-600 px-3 py-1 text-sm font-bold uppercase tracking-wide">
                      Confirmed
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-surface-elevated border border-border p-8">
                <h2 className="font-bebas text-2xl uppercase tracking-wide text-text-primary mb-6 flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-accent-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                  Shipping Address
                </h2>
                <div className="text-text-secondary">
                  <div className="font-bold text-text-primary mb-2">
                    {orderData.shippingInfo.firstName} {orderData.shippingInfo.lastName}
                  </div>
                  <div>{orderData.shippingInfo.address}</div>
                  <div>
                    {orderData.shippingInfo.city}, {orderData.shippingInfo.state}{' '}
                    {orderData.shippingInfo.zipCode}
                  </div>
                  <div className="mt-2">{orderData.shippingInfo.country}</div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-surface-elevated border border-border p-8 mb-8">
              <h2 className="font-bebas text-3xl uppercase tracking-wide text-text-primary mb-6">
                Order Items
              </h2>
              <div className="space-y-4">
                {orderData.items.map((it) => {
                  const optKey = it.options
                    ? Object.entries(it.options)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(', ')
                    : ''
                  return (
                    <div
                      key={it.productId + optKey}
                      className="flex gap-4 items-start pb-4 border-b border-border last:border-b-0 last:pb-0"
                    >
                      {it.imageUrl && (
                        <div className="relative w-24 h-24 bg-background border border-border flex-shrink-0">
                          <Image src={it.imageUrl} alt={it.title} fill className="object-cover" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-bebas text-xl uppercase tracking-wide text-text-primary">
                          {it.title}
                        </h3>
                        {optKey && (
                          <div className="text-sm text-text-muted uppercase tracking-wide">
                            {optKey}
                          </div>
                        )}
                        <div className="text-sm text-text-secondary mt-2">
                          Quantity: {it.quantity}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-accent-primary">
                          ${((it.priceCents * it.quantity) / 100).toFixed(2)}
                        </div>
                        <div className="text-sm text-text-muted">
                          ${(it.priceCents / 100).toFixed(2)} each
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="font-bebas text-2xl uppercase tracking-wide text-text-primary">
                    Total
                  </span>
                  <span className="text-4xl font-bold text-accent-primary">
                    ${(orderData.totalCents / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-background/50 border border-border p-8 mb-8">
              <h2 className="font-bebas text-2xl uppercase tracking-wide text-text-primary mb-4">
                What's Next?
              </h2>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    You'll receive an order confirmation email at {orderData.shippingInfo.email}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Your order will be processed and shipped within 3-5 business days</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    You'll receive tracking information once your order ships
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/merch" className="btn-primary inline-flex justify-center">
                Continue Shopping
              </Link>
              <Link href="/shows" className="btn-secondary inline-flex justify-center">
                View Upcoming Shows
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
