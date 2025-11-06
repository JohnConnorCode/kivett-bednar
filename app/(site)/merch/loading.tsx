import {Skeleton, ProductCardSkeleton} from '@/components/ui/Skeleton'

export default function MerchLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <div className="relative bg-background border-b border-border overflow-hidden">
        <Skeleton className="absolute inset-0" variant="rectangular" />

        <div className="container mx-auto px-4 py-24 md:py-40 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            {/* Accent line */}
            <div className="flex items-center justify-center gap-4">
              <Skeleton className="h-px w-16" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-px w-16" />
            </div>

            {/* Heading */}
            <Skeleton className="h-24 w-full max-w-2xl mx-auto" />

            {/* Subheading */}
            <Skeleton className="h-6 w-full max-w-xl mx-auto" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Filters Skeleton */}
            <div className="mb-16">
              <div className="bg-surface/50 border border-border/50 p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Category Filter */}
                  <div className="flex-1">
                    <Skeleton className="h-4 w-48 mb-4" />
                    <div className="flex flex-wrap gap-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-12 w-32" />
                      ))}
                    </div>
                  </div>

                  {/* Sort */}
                  <div className="w-full lg:w-72">
                    <Skeleton className="h-4 w-32 mb-4" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>

                {/* Results Count */}
                <div className="mt-8 pt-8 border-t border-border/50">
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            </div>

            {/* Products Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
