'use client'

import {useState} from 'react'
import Image, {ImageProps} from 'next/image'

interface ImageWithSkeletonProps extends Omit<ImageProps, 'onLoad'> {
  skeletonClassName?: string
}

export function ImageWithSkeleton({
  className = '',
  skeletonClassName = '',
  alt,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-surface-elevated ${className}`}>
        <div className="text-center p-4">
          <svg
            className="w-12 h-12 mx-auto text-text-muted/30 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Skeleton loader */}
      {!isLoaded && (
        <div
          className={`absolute inset-0 skeleton ${skeletonClassName}`}
          aria-hidden="true"
        />
      )}

      <Image
        {...props}
        alt={alt}
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  )
}
