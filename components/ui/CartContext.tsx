'use client'

import {createContext, useContext, useEffect, useMemo, useState} from 'react'
import {CartItem, loadCart, saveCart, cartTotalCents} from '@/lib/cart'

type CartState = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, optionsKey?: string) => void
  updateQty: (productId: string, qty: number, optionsKey?: string) => void
  clear: () => void
  totalCents: number
}

const Ctx = createContext<CartState | null>(null)

function optionsKey(options?: Record<string, string>) {
  if (!options) return ''
  return Object.entries(options)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join('|')
}

export function CartProvider({children}: {children: React.ReactNode}) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    setItems(loadCart())
  }, [])

  useEffect(() => {
    saveCart(items)
  }, [items])

  const api: CartState = useMemo(
    () => ({
      items,
      addItem: (item) => {
        setItems((prev) => {
          const key = optionsKey(item.options)
          const idx = prev.findIndex(
            (i) => i.productId === item.productId && optionsKey(i.options) === key,
          )
          if (idx >= 0) {
            const next = [...prev]
            next[idx] = {...next[idx], quantity: next[idx].quantity + item.quantity}
            return next
          }
          return [...prev, item]
        })
      },
      removeItem: (productId, optKey = '') => {
        setItems((prev) => prev.filter((i) => !(i.productId === productId && optionsKey(i.options) === optKey)))
      },
      updateQty: (productId, qty, optKey = '') => {
        setItems((prev) =>
          prev.map((i) => (i.productId === productId && optionsKey(i.options) === optKey ? {...i, quantity: qty} : i)),
        )
      },
      clear: () => setItems([]),
      totalCents: cartTotalCents(items),
    }),
    [items],
  )

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useCart() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

