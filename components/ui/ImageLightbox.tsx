'use client'

import {useState, useEffect, useCallback} from 'react'
import Image from 'next/image'
import {X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut} from 'lucide-react'

type ImageLightboxProps = {
  images: Array<{url: string; alt: string}>
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
}

export function ImageLightbox({images, initialIndex = 0, isOpen, onClose}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({x: 50, y: 50})

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }, [images.length])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }, [images.length])

  // Reset zoom when changing images
  useEffect(() => {
    setIsZoomed(false)
    setZoomPosition({x: 50, y: 50})
  }, [currentIndex])

  // Reset index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
    }
  }, [isOpen, initialIndex])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handlePrevious, handleNext, onClose])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({x, y})
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
    if (!isZoomed) {
      setZoomPosition({x: 50, y: 50})
    }
  }

  if (!isOpen || images.length === 0) return null

  const currentImage = images[currentIndex]

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-surface/50 backdrop-blur-md border-b border-border">
          <div className="flex items-center gap-4">
            <span className="text-text-secondary text-sm uppercase tracking-wider">
              Image {currentIndex + 1} of {images.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Toggle */}
            <button
              onClick={toggleZoom}
              className="p-2 text-text-secondary hover:text-accent-primary transition-colors"
              aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
              title={isZoomed ? 'Zoom out' : 'Zoom in'}
            >
              {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-accent-primary transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="flex-1 relative flex items-center justify-center p-4 md:p-8">
          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-surface/80 backdrop-blur-sm border border-border text-text-primary hover:border-accent-primary hover:text-accent-primary transition-all z-20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-surface/80 backdrop-blur-sm border border-border text-text-primary hover:border-accent-primary hover:text-accent-primary transition-all z-20"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Main Image */}
          <div
            className={`relative max-w-full max-h-full ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            onClick={toggleZoom}
            onMouseMove={handleMouseMove}
            style={{
              width: '90%',
              height: '90%',
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={currentImage.url}
                alt={currentImage.alt}
                fill
                className="object-contain"
                sizes="90vw"
                style={
                  isZoomed
                    ? {
                        objectFit: 'cover',
                        objectPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        transform: 'scale(2)',
                        transformOrigin: 'center',
                      }
                    : undefined
                }
                priority
              />
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="p-4 bg-surface/50 backdrop-blur-md border-t border-border">
            <div className="flex gap-2 justify-center overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative w-16 h-16 flex-shrink-0 border-2 transition-all ${
                    index === currentIndex
                      ? 'border-accent-primary scale-110'
                      : 'border-border hover:border-accent-primary/50'
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="px-4 py-2 bg-surface/30 backdrop-blur-sm border-t border-border">
          <div className="flex items-center justify-center gap-6 text-xs text-text-muted uppercase tracking-wider">
            {images.length > 1 && (
              <>
                <span>
                  <kbd className="px-2 py-1 bg-background border border-border rounded text-text-secondary font-mono mx-1">←</kbd>
                  <kbd className="px-2 py-1 bg-background border border-border rounded text-text-secondary font-mono mx-1">→</kbd>
                  Navigate
                </span>
                <span className="text-border">|</span>
              </>
            )}
            <span>Click image to zoom</span>
            <span className="text-border">|</span>
            <span>
              <kbd className="px-2 py-1 bg-background border border-border rounded text-text-secondary font-mono mx-1">ESC</kbd>
              Close
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
