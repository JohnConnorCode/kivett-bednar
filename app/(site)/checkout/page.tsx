"use client"

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {useCart} from '@/components/ui/CartContext'
import Link from 'next/link'
import Image from 'next/image'

export default function CheckoutPage() {
  const {items, totalCents} = useCart()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate a mock order ID
    const orderId = `KBM-${Date.now().toString().slice(-8)}`

    // Store order data in sessionStorage for confirmation page
    sessionStorage.setItem(
      'lastOrder',
      JSON.stringify({
        orderId,
        items,
        totalCents,
        shippingInfo: formData,
        orderDate: new Date().toISOString(),
      })
    )

    // Navigate to confirmation
    router.push(`/order-confirmation?id=${orderId}`)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-surface-elevated border border-border p-16 max-w-2xl mx-auto text-center">
          <h1 className="font-bebas text-4xl uppercase tracking-wide text-text-primary mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-text-secondary mb-8">
            Add some items to your cart before checking out.
          </p>
          <Link href="/merch" className="btn-primary inline-flex">
            Browse Merch
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px bg-accent-primary w-12" />
              <span className="text-accent-primary text-sm uppercase tracking-wider font-bold">
                Secure Checkout
              </span>
            </div>
            <h1 className="font-bebas text-5xl md:text-6xl uppercase tracking-wide text-text-primary">
              Checkout
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-surface py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Shipping Form */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Contact Information */}
                  <div className="bg-surface-elevated border border-border p-8">
                    <h2 className="font-bebas text-3xl uppercase tracking-wide text-text-primary mb-6">
                      Contact Information
                    </h2>
                    <div>
                      <label className="block text-sm uppercase tracking-wider font-bold text-text-primary mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-background border border-border px-4 py-3 text-text-primary focus:border-accent-primary focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-surface-elevated border border-border p-8">
                    <h2 className="font-bebas text-3xl uppercase tracking-wide text-text-primary mb-6">
                      Shipping Address
                    </h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm uppercase tracking-wider font-bold text-text-primary mb-3">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full bg-background border border-border px-4 py-3 text-text-primary focus:border-accent-primary focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm uppercase tracking-wider font-bold text-text-primary mb-3">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full bg-background border border-border px-4 py-3 text-text-primary focus:border-accent-primary focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm uppercase tracking-wider font-bold text-text-primary mb-3">
                          Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="w-full bg-background border border-border px-4 py-3 text-text-primary focus:border-accent-primary focus:outline-none transition-colors"
                          placeholder="Street address"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm uppercase tracking-wider font-bold text-text-primary mb-3">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full bg-background border border-border px-4 py-3 text-text-primary focus:border-accent-primary focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm uppercase tracking-wider font-bold text-text-primary mb-3">
                            State/Region *
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            className="w-full bg-background border border-border px-4 py-3 text-text-primary focus:border-accent-primary focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm uppercase tracking-wider font-bold text-text-primary mb-3">
                            ZIP / Postal Code *
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            required
                            className="w-full bg-background border border-border px-4 py-3 text-text-primary focus:border-accent-primary focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm uppercase tracking-wider font-bold text-text-primary mb-3">
                            Country *
                          </label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                            className="w-full bg-background border border-border px-4 py-3 text-text-primary focus:border-accent-primary focus:outline-none transition-colors"
                          >
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="GB">United Kingdom</option>
                            <option value="AU">Australia</option>
                            <option value="DE">Germany</option>
                            <option value="FR">France</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Notice */}
                  <div className="bg-background/50 border border-border p-6">
                    <div className="flex gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-accent-primary flex-shrink-0"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <h4 className="font-bold text-text-primary mb-1 uppercase tracking-wide text-sm">
                          Demo Mode
                        </h4>
                        <p className="text-text-secondary text-sm">
                          This is a demo checkout flow. Payment processing will be integrated soon.
                          Complete the form to see the order confirmation page.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-surface-elevated border border-border p-8 sticky top-4">
                    <h2 className="font-bebas text-3xl uppercase tracking-wide text-text-primary mb-6">
                      Order Summary
                    </h2>

                    {/* Items */}
                    <div className="space-y-4 mb-6 pb-6 border-b border-border">
                      {items.map((it) => {
                        const optKey = it.options
                          ? Object.entries(it.options)
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(', ')
                          : ''
                        return (
                          <div key={it.productId + optKey} className="flex gap-3">
                            {it.imageUrl && (
                              <div className="relative w-16 h-16 bg-background border border-border flex-shrink-0">
                                <Image
                                  src={it.imageUrl}
                                  alt={it.title}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute -top-2 -right-2 bg-accent-primary text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                                  {it.quantity}
                                </div>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-bold text-text-primary truncate">
                                {it.title}
                              </div>
                              {optKey && (
                                <div className="text-xs text-text-muted">{optKey}</div>
                              )}
                              <div className="text-sm font-bold text-accent-primary mt-1">
                                ${((it.priceCents * it.quantity) / 100).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Totals */}
                    <div className="space-y-3 mb-6 pb-6 border-b border-border">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Subtotal</span>
                        <span className="font-bold text-text-primary">
                          ${(totalCents / 100).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Shipping</span>
                        <span className="font-bold text-accent-primary">Free</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Tax</span>
                        <span className="text-text-muted">$0.00</span>
                      </div>
                    </div>

                    <div className="flex justify-between mb-6">
                      <span className="font-bebas text-xl uppercase tracking-wide text-text-primary">
                        Total
                      </span>
                      <span className="text-3xl font-bold text-accent-primary">
                        ${(totalCents / 100).toFixed(2)}
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-accent-primary hover:bg-accent-primary/90 disabled:bg-accent-primary/50 text-black font-bold text-lg uppercase tracking-wider py-4 transition-all duration-300 mb-3"
                    >
                      {isSubmitting ? 'Processing...' : 'Place Order'}
                    </button>

                    <Link
                      href="/cart"
                      className="block text-center text-text-muted hover:text-accent-primary text-sm uppercase tracking-wide transition-colors"
                    >
                      ← Return to Cart
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
