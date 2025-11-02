/**
 * Client-safe image positioning utilities
 * Can be used in both client and server components
 */

import createImageUrlBuilder from '@sanity/image-url'

// Client-safe configuration from public env vars
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

const builder = createImageUrlBuilder({projectId, dataset})

/**
 * Client-safe URL builder for Sanity images
 * Uses public environment variables only
 */
export function urlFor(source: any) {
  return builder.image(source)
}

/**
 * Type definitions for Sanity image data
 */
export interface SanityHotspot {
  x: number  // 0-1, horizontal focal point
  y: number  // 0-1, vertical focal point
  width: number
  height: number
}

export interface SanityCrop {
  top: number
  bottom: number
  left: number
  right: number
}

export type PositionValue =
  | 'top-left' | 'top-center' | 'top-right'
  | 'center-left' | 'center' | 'center-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface SanityImageWithPositioning {
  asset?: {
    url?: string
    _id?: string
  }
  hotspot?: SanityHotspot
  crop?: SanityCrop
  desktopPosition?: PositionValue
  mobilePosition?: PositionValue
  alt?: string
}

/**
 * Convert position value to CSS objectPosition
 */
function positionValueToCSS(position: PositionValue): string {
  const map: Record<PositionValue, string> = {
    'top-left': '0% 0%',
    'top-center': '50% 0%',
    'top-right': '100% 0%',
    'center-left': '0% 50%',
    'center': '50% 50%',
    'center-right': '100% 50%',
    'bottom-left': '0% 100%',
    'bottom-center': '50% 100%',
    'bottom-right': '100% 100%',
  }
  return map[position] || '50% 50%'
}

/**
 * Convert Sanity hotspot to CSS objectPosition
 * Hotspot x/y are 0-1 values representing the focal point
 */
function hotspotToObjectPosition(hotspot: SanityHotspot): string {
  const x = Math.round(hotspot.x * 100)
  const y = Math.round(hotspot.y * 100)
  return `${x}% ${y}%`
}

/**
 * Get CSS objectPosition from image data
 * Priority: explicit position override → hotspot → fallback
 *
 * @param image - Sanity image object with optional positioning data
 * @param isMobile - Whether to use mobile-specific positioning
 * @returns CSS objectPosition string (e.g., "50% 30%")
 */
export function getObjectPosition(
  image: SanityImageWithPositioning | null | undefined,
  isMobile = false
): string {
  if (!image) return '50% 50%'

  // Priority 1: Explicit position override
  const positionOverride = isMobile
    ? image.mobilePosition
    : image.desktopPosition

  if (positionOverride) {
    return positionValueToCSS(positionOverride)
  }

  // Priority 2: Hotspot data
  if (image.hotspot) {
    return hotspotToObjectPosition(image.hotspot)
  }

  // Fallback: center center
  return '50% 50%'
}
