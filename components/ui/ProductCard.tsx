'use client'

import Image from 'next/image'
import Link from 'next/link'
import {urlFor} from '@/lib/image-positioning'
import {useState, useEffect} from 'react'
import {getObjectPosition, type SanityImageWithPositioning} from '@/lib/image-positioning'

type Product = {
  _id: string
  title: string
  slug: string
  images: Array<SanityImageWithPositioning & {
    alt: string
  }>
  priceCents: number
  currency: string
}

export function ProductCard({product}: {product: Product}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const price = (product.priceCents / 100).toFixed(2)

  return (
    <Link
      href={`/merch/${product.slug}`}
      className="group block border rounded-lg overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 duration-200"
    >
      {product.images?.[0]?.asset && (
        <div className="relative aspect-square bg-muted">
          <Image
            src={urlFor(product.images[0].asset).width(600).height(600).url()}
            alt={product.images[0].alt || product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
            style={{
              objectPosition: getObjectPosition(product.images[0], isMobile)
            }}
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <p className="text-lg font-bold">
          {product.currency} ${price}
        </p>
      </div>
    </Link>
  )
}
