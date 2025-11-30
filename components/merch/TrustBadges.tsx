'use client'

import {Shield, Truck, RefreshCw, Award} from 'lucide-react'

interface TrustBadgesProps {
  variant?: 'horizontal' | 'vertical' | 'compact'
  showAll?: boolean
}

const badges = [
  {
    icon: Shield,
    title: 'Secure Checkout',
    description: '256-bit SSL encryption',
  },
  {
    icon: Award,
    title: 'Official Merch',
    description: 'Authentic merchandise',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    description: 'Ships within 2-3 days',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-day return policy',
  },
]

export function TrustBadges({variant = 'horizontal', showAll = true}: TrustBadgesProps) {
  const displayBadges = showAll ? badges : badges.slice(0, 2)

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-4 text-text-muted text-sm">
        {displayBadges.map((badge) => (
          <div key={badge.title} className="flex items-center gap-1.5">
            <badge.icon className="w-4 h-4 text-accent-primary" />
            <span>{badge.title}</span>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'vertical') {
    return (
      <div className="space-y-3">
        {displayBadges.map((badge) => (
          <div
            key={badge.title}
            className="flex items-center gap-3 p-3 bg-surface rounded border border-border"
          >
            <div className="w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
              <badge.icon className="w-5 h-5 text-accent-primary" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">{badge.title}</p>
              <p className="text-text-muted text-xs">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {displayBadges.map((badge) => (
        <div
          key={badge.title}
          className="flex flex-col items-center text-center p-4 bg-surface rounded border border-border hover:border-accent-primary/30 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center mb-3">
            <badge.icon className="w-6 h-6 text-accent-primary" />
          </div>
          <p className="text-white font-medium text-sm">{badge.title}</p>
          <p className="text-text-muted text-xs mt-1">{badge.description}</p>
        </div>
      ))}
    </div>
  )
}

export function SecureBadge() {
  return (
    <div className="flex items-center gap-2 text-sm text-text-muted">
      <Shield className="w-4 h-4 text-green-500" />
      <span>Secure checkout powered by Stripe</span>
    </div>
  )
}
