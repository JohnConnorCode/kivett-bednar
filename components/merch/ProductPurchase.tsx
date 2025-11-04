"use client"

import {useState} from 'react'
import {useCart} from '@/components/ui/CartContext'

type ProductOption = {name: string; values: string[]}

export function PurchaseSection({
  product,
}: {
  product: {
    _id: string
    title: string
    slug: string
    priceCents: number
    currency: string
    options: ProductOption[]
    imageUrl?: string
  }
}) {
  const [selected, setSelected] = useState<Record<string, string>>({})
  const {addItem} = useCart()
  const price = product.priceCents ? (product.priceCents / 100).toFixed(2) : '0.00'

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div />
          <div>
            {product.options?.map((opt) => (
              <div key={opt.name} className="mb-4">
                <label className="block font-semibold mb-2">{opt.name}</label>
                <div className="flex gap-2 flex-wrap">
                  {opt.values?.map((val) => (
                    <button
                      key={val}
                      className={`px-3 py-2 border rounded ${
                        selected[opt.name] === val ? 'bg-accent-primary/20 border-accent-primary' : ''
                      }`}
                      onClick={() => setSelected((s) => ({...s, [opt.name]: val}))}
                      type="button"
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button
              className="btn-primary"
              onClick={() =>
                addItem({
                  productId: product._id,
                  title: product.title,
                  slug: product.slug,
                  imageUrl: product.imageUrl,
                  priceCents: product.priceCents,
                  currency: product.currency || 'USD',
                  quantity: 1,
                  options: Object.keys(selected).length ? selected : undefined,
                })
              }
              type="button"
            >
              Add to cart — {product.currency} ${price}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
