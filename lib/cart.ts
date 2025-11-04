export type CartItem = {
  productId: string
  title: string
  slug: string
  imageUrl?: string
  priceCents: number
  currency: string
  quantity: number
  // optional variant selections (Size: M, Color: Black)
  options?: Record<string, string>
}

const STORAGE_KEY = 'kb_cart_v1'

export function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed
  } catch {}
  return []
}

export function saveCart(items: CartItem[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function cartTotalCents(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0)
}

