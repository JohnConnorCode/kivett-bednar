"use client"

import Link from 'next/link'
import Image from 'next/image'
import {useCart} from '@/components/ui/CartContext'
import {useRouter} from 'next/navigation'
import {PromoCodeInput} from '@/components/ui/PromoCodeInput'
import {useState} from 'react'

export default function CartPage() {
  const {items, totalCents, updateQty, removeItem, clear} = useCart()
  const router = useRouter()
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [promoCode, setPromoCode] = useState('')
  const [promoDescription, setPromoDescription] = useState('')

  const handleApplyPromo = (discountCents: number, code: string, description?: string) => {
    setPromoDiscount(discountCents)
    setPromoCode(code)
    setPromoDescription(description || '')
  }

  const handleRemovePromo = () => {
    setPromoDiscount(0)
    setPromoCode('')
    setPromoDescription('')
  }

  const finalTotal = Math.max(0, totalCents - promoDiscount)

  const proceedToCheckout = () => {
    router.push('/checkout')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px bg-accent-primary w-12" />
              <span className="text-accent-primary text-sm uppercase tracking-wider font-bold">
                Shopping Cart
              </span>
            </div>
            <h1 className="font-bebas text-6xl md:text-7xl uppercase tracking-wide text-text-primary">
              Your Cart
            </h1>
            {items.length > 0 && (
              <p className="text-text-secondary mt-4">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-surface py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {items.length === 0 ? (
              <div className="text-center py-24">
                <div className="bg-surface-elevated border border-border p-16 max-w-2xl mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-24 h-24 mx-auto text-text-muted mb-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                  <h2 className="font-bebas text-4xl uppercase tracking-wide text-text-primary mb-4">
                    Your cart is empty
                  </h2>
                  <p className="text-text-secondary mb-8">
                    Looks like you haven&apos;t added any items to your cart yet.
                  </p>
                  <Link href="/merch" className="btn-primary inline-flex">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {items.map((it) => {
                    const optKey = it.options
                      ? Object.entries(it.options)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(', ')
                      : ''
                    return (
                      <div
                        key={it.productId + optKey}
                        className="bg-surface-elevated border border-border p-6 flex gap-6 items-start"
                      >
                        {/* Image */}
                        {it.imageUrl && (
                          <Link href={`/merch/${it.slug}`} className="flex-shrink-0">
                            <div className="relative w-32 h-32 bg-background border border-border overflow-hidden group">
                              <Image
                                src={it.imageUrl}
                                alt={it.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                          </Link>
                        )}

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <Link href={`/merch/${it.slug}`}>
                            <h3 className="font-bebas text-2xl uppercase tracking-wide text-text-primary hover:text-accent-primary transition-colors">
                              {it.title}
                            </h3>
                          </Link>
                          {optKey && (
                            <div className="text-sm text-text-muted uppercase tracking-wide mt-1">
                              {optKey}
                            </div>
                          )}

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-4 mt-4">
                            <span className="text-sm uppercase tracking-wide text-text-secondary">
                              Quantity
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQty(it.productId, Math.max(1, it.quantity - 1), optKey)
                                }
                                className="w-8 h-8 border border-border hover:border-accent-primary hover:text-accent-primary transition-colors flex items-center justify-center"
                              >
                                −
                              </button>
                              <div className="w-12 h-8 border border-border bg-background flex items-center justify-center text-text-primary font-bold">
                                {it.quantity}
                              </div>
                              <button
                                onClick={() => updateQty(it.productId, it.quantity + 1, optKey)}
                                className="w-8 h-8 border border-border hover:border-accent-primary hover:text-accent-primary transition-colors flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(it.productId, optKey)}
                              className="ml-auto text-sm text-accent-red hover:text-red-400 uppercase tracking-wide font-bold transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right flex-shrink-0">
                          <div className="text-2xl font-bold text-accent-primary">
                            ${((it.priceCents * it.quantity) / 100).toFixed(2)}
                          </div>
                          <div className="text-sm text-text-muted mt-1">
                            {it.currency} ${(it.priceCents / 100).toFixed(2)} each
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-surface-elevated border border-border p-8 sticky top-24">
                    <h2 className="font-bebas text-3xl uppercase tracking-wide text-text-primary mb-6">
                      Order Summary
                    </h2>

                    <div className="space-y-4 mb-6 pb-6 border-b border-border">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Subtotal</span>
                        <span className="font-bold text-text-primary">
                          ${(totalCents / 100).toFixed(2)}
                        </span>
                      </div>
                      {promoDiscount > 0 && (
                        <div className="flex justify-between text-accent-primary">
                          <span>
                            Discount
                            {promoDescription && (
                              <span className="text-xs block text-text-muted mt-0.5">
                                {promoDescription}
                              </span>
                            )}
                          </span>
                          <span className="font-bold">
                            -${(promoDiscount / 100).toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Shipping</span>
                        <span className="text-text-muted text-sm">Calculated at checkout</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Tax</span>
                        <span className="text-text-muted text-sm">Calculated at checkout</span>
                      </div>
                    </div>

                    {/* Promo Code Input */}
                    <div className="mb-6">
                      <PromoCodeInput
                        cartTotal={totalCents}
                        onApply={handleApplyPromo}
                        onRemove={handleRemovePromo}
                        currentCode={promoCode}
                      />
                    </div>

                    <div className="flex justify-between mb-6">
                      <span className="font-bebas text-xl uppercase tracking-wide text-text-primary">
                        Total
                      </span>
                      <span className="text-3xl font-bold text-accent-primary">
                        ${(finalTotal / 100).toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={proceedToCheckout}
                      className="w-full bg-accent-primary hover:bg-accent-primary/90 text-black font-bold text-lg uppercase tracking-wider py-4 transition-all duration-300 mb-3"
                    >
                      Proceed to Checkout
                    </button>

                    <button
                      onClick={clear}
                      className="w-full border border-border hover:border-accent-red hover:text-accent-red text-text-secondary font-bold uppercase tracking-wide py-3 transition-all duration-200"
                    >
                      Clear Cart
                    </button>

                    <Link
                      href="/merch"
                      className="block text-center text-text-muted hover:text-accent-primary mt-6 text-sm uppercase tracking-wide transition-colors"
                    >
                      ← Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

