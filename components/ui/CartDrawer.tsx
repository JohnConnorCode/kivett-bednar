'use client'

import Link from 'next/link'
import Image from 'next/image'
import {useCart} from './CartContext'
import {useEffect, useState} from 'react'

type PromoCodeData = {
  code: string
  discountType: string
  discountCents: number
  description: string
}

export function CartDrawer({open, onClose}: {open: boolean; onClose: () => void}) {
  const {items, totalCents, updateQty, removeItem} = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<PromoCodeData | null>(null)
  const [promoError, setPromoError] = useState('')
  const [promoLoading, setPromoLoading] = useState(false)

  // Handle Escape key to close drawer
  useEffect(() => {
    if (!open) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return

    setPromoLoading(true)
    setPromoError('')

    try {
      const response = await fetch('/api/promo-code', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          code: promoCode.trim(),
          cartTotal: totalCents,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setPromoError(data.error || 'Failed to apply promo code')
        setAppliedPromo(null)
      } else {
        setAppliedPromo(data)
        setPromoError('')
      }
    } catch (error) {
      setPromoError('Failed to apply promo code')
      setAppliedPromo(null)
    } finally {
      setPromoLoading(false)
    }
  }

  const removePromoCode = () => {
    setAppliedPromo(null)
    setPromoCode('')
    setPromoError('')
  }

  const finalTotal = appliedPromo ? totalCents - appliedPromo.discountCents : totalCents

  return (
    <div className={`fixed inset-0 z-[200] ${open ? '' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className={`absolute right-0 top-0 h-full w-full sm:w-[28rem] bg-surface text-text-primary shadow-xl transition-transform flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <h2 id="cart-drawer-title" className="text-xl font-bold">Your Cart</h2>
          <button
            className="text-sm hover:underline"
            onClick={onClose}
            aria-label="Close cart"
          >
            Close
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto flex-1 overscroll-contain">
          {items.length === 0 ? (
            <div className="text-text-secondary">Your cart is empty.</div>
          ) : (
            items.map((it) => {
              const optKey = it.options ? Object.entries(it.options).map(([k, v]) => `${k}: ${v}`).join(', ') : ''
              return (
                <div key={it.productId + optKey} className="flex gap-3 items-center">
                  {it.imageUrl && (
                    <div className="relative w-16 h-16 bg-muted rounded flex-shrink-0">
                      <Image src={it.imageUrl} alt={it.title} fill className="object-cover rounded" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold leading-tight">
                      <Link href={`/merch/${it.slug}`} onClick={onClose}>
                        {it.title}
                      </Link>
                    </div>
                    {optKey && <div className="text-xs text-text-secondary">{optKey}</div>}
                    <div className="flex items-center gap-2 mt-2">
                      <label className="sr-only" htmlFor={`qty-${it.productId}-${optKey}`}>
                        Quantity for {it.title}
                      </label>
                      <input
                        id={`qty-${it.productId}-${optKey}`}
                        type="number"
                        min={1}
                        value={it.quantity}
                        onChange={(e) => updateQty(it.productId, Math.max(1, Number(e.target.value)), optKey)}
                        className="w-14 border rounded px-2 py-1 text-sm"
                        aria-label={`Quantity for ${it.title}`}
                      />
                      <button
                        className="text-red-600 text-xs"
                        onClick={() => removeItem(it.productId, optKey)}
                        aria-label={`Remove ${it.title} from cart`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="font-semibold whitespace-nowrap flex-shrink-0">{it.currency} ${(it.priceCents / 100).toFixed(2)}</div>
                </div>
              )
            })
          )}
        </div>
        <div className="p-4 border-t bg-surface-elevated flex-shrink-0 safe-bottom space-y-4">
          {/* Promo Code Section */}
          {items.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-bold text-text-muted">
                Promo Code
              </label>
              {!appliedPromo ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && applyPromoCode()}
                    placeholder="Enter code"
                    className="flex-1 bg-surface border border-border px-3 py-2 text-sm uppercase tracking-wider focus:border-accent-primary focus:outline-none transition-all"
                    disabled={promoLoading}
                  />
                  <button
                    onClick={applyPromoCode}
                    disabled={promoLoading || !promoCode.trim()}
                    className="px-4 py-2 bg-accent-primary text-black font-bold text-sm uppercase tracking-wider hover:bg-accent-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {promoLoading ? 'Applying...' : 'Apply'}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 px-3 py-2">
                  <div className="flex-1">
                    <div className="font-bold text-green-500 text-sm uppercase tracking-wider">
                      {appliedPromo.code}
                    </div>
                    {appliedPromo.description && (
                      <div className="text-xs text-text-secondary">{appliedPromo.description}</div>
                    )}
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-text-muted hover:text-red-500 transition-colors"
                    aria-label="Remove promo code"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              {promoError && (
                <div className="text-xs text-red-500">{promoError}</div>
              )}
            </div>
          )}

          {/* Totals */}
          {items.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-semibold">${(totalCents / 100).toFixed(2)}</span>
              </div>
              {appliedPromo && appliedPromo.discountCents > 0 && (
                <div className="flex justify-between text-sm text-green-500">
                  <span>Discount ({appliedPromo.code})</span>
                  <span className="font-semibold">-${(appliedPromo.discountCents / 100).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                <span>Total</span>
                <span>${(finalTotal / 100).toFixed(2)}</span>
              </div>
            </div>
          )}

          <Link href="/cart" onClick={onClose} className="btn-primary w-full block text-center">
            View Cart / Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}

