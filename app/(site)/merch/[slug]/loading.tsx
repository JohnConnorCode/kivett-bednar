import {Skeleton} from '@/components/ui/Skeleton'

export default function ProductLoading() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <div className="relative bg-background border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Accent line */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-px w-12" />
              <Skeleton className="h-4 w-32" />
            </div>

            {/* Title */}
            <Skeleton className="h-20 w-full max-w-2xl" />

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-6 w-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="bg-surface py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {/* Images Section Skeleton */}
              <div className="space-y-6">
                {/* Main Image */}
                <Skeleton className="aspect-square w-full" variant="rectangular" />

                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="aspect-square" variant="rectangular" />
                  ))}
                </div>
              </div>

              {/* Details Section Skeleton */}
              <div className="space-y-8">
                {/* Description */}
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Purchase Section Skeleton */}
                <div className="bg-surface-elevated border border-border p-8 space-y-6">
                  <Skeleton className="h-8 w-48" />

                  {/* Options skeleton */}
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-12 w-full" />
                  </div>

                  {/* Quantity skeleton */}
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-12 w-32" />
                  </div>

                  {/* Add to cart button skeleton */}
                  <Skeleton className="h-14 w-full" />
                </div>

                {/* Shipping Info Skeleton */}
                <div className="bg-background/50 border border-border p-6">
                  <div className="flex gap-3">
                    <Skeleton className="w-6 h-6 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                </div>

                {/* Additional Info Skeleton */}
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-background/30 border border-border p-4 space-y-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
