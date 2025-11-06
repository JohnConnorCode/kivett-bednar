'use client'

import Link from 'next/link'
import Image from 'next/image'
import {useCart} from './CartContext'
import {useEffect} from 'react'

export function CartDrawer({open, onClose}: {open: boolean; onClose: () => void}) {
  const {items, totalCents, updateQty, removeItem} = useCart()

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
        <div className="p-4 border-t bg-surface-elevated flex-shrink-0 safe-bottom">
          <div className="flex justify-between mb-3">
            <span>Subtotal</span>
            <span className="font-semibold">${(totalCents / 100).toFixed(2)}</span>
          </div>
          <Link href="/cart" onClick={onClose} className="btn-primary w-full block text-center">
            View Cart / Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}

