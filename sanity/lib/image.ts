import createImageUrlBuilder from '@sanity/image-url'
import {client} from './client'

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Re-export positioning utilities for server components
export {
  getObjectPosition,
  type SanityHotspot,
  type SanityCrop,
  type PositionValue,
  type SanityImageWithPositioning,
} from '@/lib/image-positioning'
