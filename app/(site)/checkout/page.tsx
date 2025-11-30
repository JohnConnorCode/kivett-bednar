"use client"

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {useCart} from '@/components/ui/CartContext'
import {useFormValidation} from '@/hooks/useFormValidation'
import {FormField} from '@/components/ui/FormField'
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

  // Form validation
  const {errors, touched, validateAll, handleBlur, handleChange: validateChange} = useFormValidation({
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    firstName: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    address: {
      required: true,
      minLength: 5,
      maxLength: 100,
    },
    city: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    state: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    zipCode: {
      required: true,
      pattern: /^[0-9]{5}(-[0-9]{4})?$/,
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    validateChange(name, value)
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    handleBlur(name, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    if (!validateAll(formData)) {
      // Scroll to first error
      const firstError = document.querySelector('[aria-invalid="true"]')
      if (firstError) {
        firstError.scrollIntoView({behavior: 'smooth', block: 'center'})
      }
      return
    }

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
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
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
    <div className="min-h-screen bg-background pt-20">
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
                    <FormField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      required
                      placeholder="your@email.com"
                      error={errors.email}
                      touched={touched.email}
                      autoComplete="email"
                    />
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-surface-elevated border border-border p-8">
                    <h2 className="font-bebas text-3xl uppercase tracking-wide text-text-primary mb-6">
                      Shipping Address
                    </h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          label="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          required
                          error={errors.firstName}
                          touched={touched.firstName}
                          autoComplete="given-name"
                        />
                        <FormField
                          label="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          required
                          error={errors.lastName}
                          touched={touched.lastName}
                          autoComplete="family-name"
                        />
                      </div>

                      <FormField
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        required
                        placeholder="Street address"
                        error={errors.address}
                        touched={touched.address}
                        autoComplete="street-address"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          label="City"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          required
                          error={errors.city}
                          touched={touched.city}
                          autoComplete="address-level2"
                        />
                        <FormField
                          label="State/Region"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          required
                          error={errors.state}
                          touched={touched.state}
                          autoComplete="address-level1"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          label="ZIP / Postal Code"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          required
                          error={errors.zipCode}
                          touched={touched.zipCode}
                          autoComplete="postal-code"
                        />
                        <div>
                          <label htmlFor="country" className="block text-sm uppercase tracking-wider font-bold text-text-primary mb-3">
                            Country <span className="text-accent-red">*</span>
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-background border border-border px-4 py-3 text-text-primary focus:border-accent-primary focus:outline-none transition-colors"
                            autoComplete="country"
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
                  <div className="bg-surface-elevated border border-border p-8 sticky top-24">
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
