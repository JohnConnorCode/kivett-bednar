/**
 * Migration script to fix Shows Page performance images structure
 *
 * OLD STRUCTURE (broken):
 * performanceImages: [
 *   { _type: "image", asset: {...}, alt: "...", caption: "..." }
 * ]
 *
 * NEW STRUCTURE (correct):
 * performanceImages: [
 *   {
 *     _type: "performanceImage",
 *     image: { _type: "image", asset: {...} },
 *     alt: "...",
 *     caption: "..."
 *   }
 * ]
 *
 * Run with: npx sanity@latest migration run fix-shows-page-images
 */

import {defineMigration, at, setIfMissing, unset} from 'sanity/migrate'

export default defineMigration({
  title: 'Fix Shows Page performance images structure',
  documentTypes: ['showsPage'],

  migrate: {
    document(doc, context) {
      // Only process showsPage documents
      if (doc._type !== 'showsPage') {
        return doc
      }

      // Check if performanceImages exists and needs migration
      const performanceImages = doc.performanceImages as any[]
      if (!performanceImages || !Array.isArray(performanceImages)) {
        return doc
      }

      // Check if first item is old format (direct image type)
      const needsMigration = performanceImages.some(
        (item: any) => item._type === 'image'
      )

      if (!needsMigration) {
        // Already in correct format
        return doc
      }

      // Transform old format to new format
      const migratedImages = performanceImages
        .filter((item: any) => item._type === 'image')
        .map((oldItem: any, index: number) => ({
          _key: oldItem._key || `perf-migrated-${index}`,
          _type: 'performanceImage',
          image: {
            _type: 'image',
            asset: oldItem.asset,
            hotspot: oldItem.hotspot,
            crop: oldItem.crop,
          },
          alt: oldItem.alt || 'Performance photo',
          caption: oldItem.caption || oldItem.alt || 'Performance',
        }))

      return {
        ...doc,
        performanceImages: migratedImages,
      }
    },
  },
})
