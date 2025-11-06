import {Skeleton, ShowCardSkeleton} from '@/components/ui/Skeleton'

export default function ShowsLoading() {
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
            {/* Section heading */}
            <div className="mb-12 space-y-4">
              <Skeleton className="h-12 w-64" />
              <Skeleton className="h-6 w-96" />
            </div>

            {/* Shows List Skeleton */}
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <ShowCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
