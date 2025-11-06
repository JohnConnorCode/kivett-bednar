export function Skeleton({
  className = '',
  variant = 'default',
}: {
  className?: string
  variant?: 'default' | 'text' | 'circular' | 'rectangular'
}) {
  const variantClasses = {
    default: 'rounded',
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
  }

  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-surface-elevated via-surface to-surface-elevated bg-[length:200%_100%] ${variantClasses[variant]} ${className}`}
      style={{animation: 'shimmer 2s infinite linear'}}
    />
  )
}

// Product card skeleton for merch page
export function ProductCardSkeleton() {
  return (
    <div className="block relative bg-surface border border-border overflow-hidden">
      {/* Image skeleton */}
      <div className="relative aspect-square bg-background">
        <Skeleton className="absolute inset-0" variant="rectangular" />
      </div>

      {/* Content skeleton */}
      <div className="relative p-6 bg-surface-elevated border-t border-border space-y-4">
        {/* Title skeleton */}
        <Skeleton className="h-7 w-3/4" />

        {/* Price skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-24" />
          </div>
          <Skeleton className="w-10 h-10" variant="rectangular" />
        </div>
      </div>
    </div>
  )
}

// Show card skeleton
export function ShowCardSkeleton() {
  return (
    <div className="bg-surface border border-border p-8">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 items-center">
        {/* Left: Date and venue */}
        <div className="space-y-4">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-8 w-full max-w-md" />
          <Skeleton className="h-6 w-3/4" />
        </div>

        {/* Right: CTA */}
        <div className="flex justify-end">
          <Skeleton className="h-14 w-40" />
        </div>
      </div>
    </div>
  )
}
