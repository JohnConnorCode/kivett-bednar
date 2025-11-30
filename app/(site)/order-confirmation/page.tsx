"use client"

import {useEffect, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useCart} from '@/components/ui/CartContext'
import {motion} from 'framer-motion'
import {CheckCircle, Package, Truck, ChevronRight} from 'lucide-react'

type OrderData = {
  orderId: string
  items: any[]
  totalCents: number
  shippingInfo: any
  orderDate: string
}

export default function OrderConfirmationPage() {
  const {clear} = useCart()
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Load order from sessionStorage
    const storedOrder = sessionStorage.getItem('lastOrder')
    if (storedOrder) {
      const data = JSON.parse(storedOrder)
      setOrderData(data)
      // Clear cart after successful order
      clear()
      // Clear session storage
      sessionStorage.removeItem('lastOrder')
      // Trigger content animation after a brief delay
      setTimeout(() => setShowContent(true), 300)
    }
  }, [clear])

  if (!orderData) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <motion.div
          initial={{opacity: 0, scale: 0.95}}
          animate={{opacity: 1, scale: 1}}
          className="bg-surface-elevated border border-border p-16 max-w-2xl mx-auto text-center"
        >
          <h1 className="font-bebas text-4xl uppercase tracking-wide text-text-primary mb-4">
            No Order Found
          </h1>
          <p className="text-text-secondary mb-8">
            We couldn&apos;t find your order information.
          </p>
          <Link href="/merch" className="btn-primary inline-flex">
            Browse Merch
          </Link>
        </motion.div>
      </div>
    )
  }

  const orderDate = new Date(orderData.orderDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated Success Icon */}
            <motion.div
              initial={{scale: 0, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.1
              }}
              className="mb-6"
            >
              <div className="relative w-28 h-28 mx-auto">
                {/* Pulsing ring */}
                <motion.div
                  initial={{scale: 1, opacity: 0.5}}
                  animate={{scale: 1.5, opacity: 0}}
                  transition={{duration: 1.5, repeat: Infinity, repeatDelay: 0.5}}
                  className="absolute inset-0 rounded-full bg-green-500/30"
                />
                {/* Main circle */}
                <div className="relative w-28 h-28 bg-green-600/20 border-2 border-green-500 rounded-full flex items-center justify-center">
                  <motion.div
                    initial={{pathLength: 0, opacity: 0}}
                    animate={{pathLength: 1, opacity: 1}}
                    transition={{delay: 0.3, duration: 0.5, ease: 'easeOut'}}
                  >
                    <CheckCircle className="w-14 h-14 text-green-500" strokeWidth={2} />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.4}}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px bg-accent-primary w-12" />
                <span className="text-accent-primary text-sm uppercase tracking-wider font-bold">
                  Order Confirmed
                </span>
                <div className="h-px bg-accent-primary w-12" />
              </div>
            </motion.div>

            <motion.h1
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.5}}
              className="font-bebas text-6xl md:text-7xl uppercase tracking-wide text-text-primary mb-4"
            >
              Thank You!
            </motion.h1>

            <motion.p
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.6}}
              className="text-xl text-text-secondary mb-8"
            >
              Your order has been received and is being processed.
              <br />
              A confirmation email has been sent to{' '}
              <span className="text-accent-primary font-bold">
                {orderData.shippingInfo.email}
              </span>
            </motion.p>

            <motion.div
              initial={{opacity: 0, scale: 0.9}}
              animate={{opacity: 1, scale: 1}}
              transition={{delay: 0.7, type: 'spring', stiffness: 200}}
              className="inline-block bg-surface-elevated border-2 border-accent-primary px-8 py-4 pulse-gold"
            >
              <div className="text-sm text-text-muted uppercase tracking-wider mb-1">
                Order Number
              </div>
              <div className="font-bebas text-3xl text-accent-primary tracking-wider">
                {orderData.orderId}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-surface py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Order Details */}
              <motion.div
                initial={{opacity: 0, x: -30}}
                animate={showContent ? {opacity: 1, x: 0} : {}}
                transition={{delay: 0.1}}
                className="bg-surface-elevated border border-border p-8 border-glow"
              >
                <h2 className="font-bebas text-2xl uppercase tracking-wide text-text-primary mb-6 flex items-center gap-3">
                  <Package className="w-6 h-6 text-accent-primary icon-hover" />
                  Order Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-text-muted uppercase tracking-wide mb-1">
                      Order Date
                    </div>
                    <div className="text-text-primary">{orderDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-muted uppercase tracking-wide mb-1">
                      Order Total
                    </div>
                    <div className="text-2xl font-bold text-accent-primary">
                      ${(orderData.totalCents / 100).toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-text-muted uppercase tracking-wide mb-1">
                      Payment Status
                    </div>
                    <div className="inline-flex items-center gap-2 bg-green-600/20 text-green-500 px-3 py-1 text-sm font-bold uppercase tracking-wide">
                      <CheckCircle className="w-4 h-4" />
                      Confirmed
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Shipping Address */}
              <motion.div
                initial={{opacity: 0, x: 30}}
                animate={showContent ? {opacity: 1, x: 0} : {}}
                transition={{delay: 0.2}}
                className="bg-surface-elevated border border-border p-8 border-glow"
              >
                <h2 className="font-bebas text-2xl uppercase tracking-wide text-text-primary mb-6 flex items-center gap-3">
                  <Truck className="w-6 h-6 text-accent-primary icon-hover" />
                  Shipping Address
                </h2>
                <div className="text-text-secondary">
                  <div className="font-bold text-text-primary mb-2">
                    {orderData.shippingInfo.firstName} {orderData.shippingInfo.lastName}
                  </div>
                  <div>{orderData.shippingInfo.address}</div>
                  <div>
                    {orderData.shippingInfo.city}, {orderData.shippingInfo.state}{' '}
                    {orderData.shippingInfo.zipCode}
                  </div>
                  <div className="mt-2">{orderData.shippingInfo.country}</div>
                </div>
              </motion.div>
            </div>

            {/* Order Items */}
            <motion.div
              initial={{opacity: 0, y: 30}}
              animate={showContent ? {opacity: 1, y: 0} : {}}
              transition={{delay: 0.3}}
              className="bg-surface-elevated border border-border p-8 mb-8"
            >
              <h2 className="font-bebas text-3xl uppercase tracking-wide text-text-primary mb-6">
                Order Items
              </h2>
              <div className="space-y-4">
                {orderData.items.map((it, index) => {
                  const optKey = it.options
                    ? Object.entries(it.options)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(', ')
                    : ''
                  return (
                    <motion.div
                      key={it.productId + optKey}
                      initial={{opacity: 0, x: -20}}
                      animate={showContent ? {opacity: 1, x: 0} : {}}
                      transition={{delay: 0.4 + index * 0.1}}
                      className="flex gap-4 items-start pb-4 border-b border-border last:border-b-0 last:pb-0 group"
                    >
                      {it.imageUrl && (
                        <div className="relative w-24 h-24 bg-background border border-border flex-shrink-0 overflow-hidden">
                          <Image
                            src={it.imageUrl}
                            alt={it.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-bebas text-xl uppercase tracking-wide text-text-primary group-hover:text-accent-primary transition-colors">
                          {it.title}
                        </h3>
                        {optKey && (
                          <div className="text-sm text-text-muted uppercase tracking-wide">
                            {optKey}
                          </div>
                        )}
                        <div className="text-sm text-text-secondary mt-2">
                          Quantity: {it.quantity}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-accent-primary">
                          ${((it.priceCents * it.quantity) / 100).toFixed(2)}
                        </div>
                        <div className="text-sm text-text-muted">
                          ${(it.priceCents / 100).toFixed(2)} each
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="font-bebas text-2xl uppercase tracking-wide text-text-primary">
                    Total
                  </span>
                  <span className="text-4xl font-bold text-accent-primary">
                    ${(orderData.totalCents / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{opacity: 0, y: 30}}
              animate={showContent ? {opacity: 1, y: 0} : {}}
              transition={{delay: 0.5}}
              className="bg-background/50 border border-border p-8 mb-8"
            >
              <h2 className="font-bebas text-2xl uppercase tracking-wide text-text-primary mb-4">
                What&apos;s Next?
              </h2>
              <ul className="space-y-3 text-text-secondary">
                {[
                  `You'll receive an order confirmation email at ${orderData.shippingInfo.email}`,
                  'Your order will be processed and shipped within 3-5 business days',
                  "You'll receive tracking information once your order ships"
                ].map((text, i) => (
                  <motion.li
                    key={i}
                    initial={{opacity: 0, x: -20}}
                    animate={showContent ? {opacity: 1, x: 0} : {}}
                    transition={{delay: 0.6 + i * 0.1}}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={showContent ? {opacity: 1, y: 0} : {}}
              transition={{delay: 0.8}}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/merch"
                className="group inline-flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-primary/90 text-black font-bold text-lg uppercase tracking-wider px-8 py-4 transition-all duration-300 active:scale-95"
              >
                Continue Shopping
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/shows" className="btn-secondary inline-flex justify-center">
                View Upcoming Shows
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
