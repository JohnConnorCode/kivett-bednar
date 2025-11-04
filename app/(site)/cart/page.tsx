"use client"

import Link from 'next/link'
import Image from 'next/image'
import {useCart} from '@/components/ui/CartContext'

export default function CartPage() {
  const {items, totalCents, updateQty, removeItem, clear} = useCart()

  const checkout = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({items}),
      })
      const data = await res.json()
      if (data?.url) {
        window.location.href = data.url
      }
    } catch (e) {
      console.error(e)
      alert('Unable to start checkout')
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-text-secondary">
          Your cart is empty. <Link className="underline" href="/merch">Continue shopping</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {items.map((it) => {
              const optKey = it.options ? Object.entries(it.options).map(([k, v]) => `${k}: ${v}`).join(', ') : ''
              return (
                <div key={it.productId + optKey} className="flex gap-4 items-center border-b pb-4">
                  {it.imageUrl && (
                    <div className="relative w-24 h-24 bg-muted rounded">
                      <Image src={it.imageUrl} alt={it.title} fill className="object-cover rounded" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="font-semibold">
                      <Link href={`/merch/${it.slug}`}>{it.title}</Link>
                    </div>
                    {optKey && <div className="text-sm text-text-secondary">{optKey}</div>}
                    <div className="flex items-center gap-3 mt-2">
                      <label className="text-sm">Qty</label>
                      <input
                        type="number"
                        min={1}
                        value={it.quantity}
                        onChange={(e) => updateQty(it.productId, Math.max(1, Number(e.target.value)), optKey)}
                        className="w-16 border rounded px-2 py-1"
                      />
                      <button className="text-red-600 text-sm" onClick={() => removeItem(it.productId, optKey)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="font-semibold">{it.currency} ${(it.priceCents / 100).toFixed(2)}</div>
                </div>
              )
            })}
          </div>
          <div className="border rounded-lg p-6 bg-surface-elevated">
            <h2 className="text-xl font-bold mb-4">Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span className="font-semibold">${(totalCents / 100).toFixed(2)}</span>
            </div>
            <p className="text-sm text-text-secondary mb-4">Shipping & taxes calculated at checkout</p>
            <button className="btn-primary w-full" onClick={checkout}>
              Checkout
            </button>
            <button className="btn-secondary w-full mt-3" onClick={clear}>
              Clear cart
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

