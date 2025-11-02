/**
 * Script to update home page hero slider with new high-priority images
 * Run with: npx tsx scripts/update-hero-slider.ts
 */

import {createClient} from '@sanity/client'
import fs from 'fs'
import path from 'path'

const client = createClient({
  projectId: 'pydiurzn',
  dataset: 'production',
  token: 'skAjk1YBqRvhtmr0k8tpaUzqtL3AODFzt5umtNllJmuohXMRTrCsbBNwZfJ9zhuY67scazn3gr1fPCNp22wkZC6siNA1xYJ7v3Ri0JOCPwYL3Bg0QteGFtui8hp3lpDwYaEn4UKLop0VSrVfe3KiK6g9D60B5RWY8NIwtuRqBxfMtiRb7VDn',
  apiVersion: '2025-01-01',
  useCdn: false,
})

interface UploadedImage {
  filename: string
  assetId: string
  url: string
  description: string
  priority: 'high' | 'medium' | 'low'
  kivettCentered: boolean
}

async function updateHeroSlider() {
  console.log('🎸 Updating Home Page Hero Slider...\n')

  try {
    // Read the uploaded images data
    const uploadedImagesPath = path.join(process.cwd(), 'scripts/uploaded-images.json')
    const uploadedImages: UploadedImage[] = JSON.parse(fs.readFileSync(uploadedImagesPath, 'utf-8'))

    console.log(`📁 Found ${uploadedImages.length} uploaded images\n`)

    // Get high-priority Kivett-centered images for hero slider
    const heroImages = uploadedImages
      .filter((img) => img.priority === 'high' && img.kivettCentered)
      .slice(0, 8) // Use top 8 images

    console.log(`🌟 Selected ${heroImages.length} images for hero slider:\n`)
    heroImages.forEach((img, index) => {
      console.log(`${index + 1}. ${img.filename}`)
      console.log(`   ${img.description}`)
    })
    console.log()

    // Create hero slides array
    const heroSlides = heroImages.map((img, index) => ({
      _key: `slide-${index}`,
      _type: 'object',
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: img.assetId,
        },
      },
      alt: img.description,
    }))

    // Update the homePage document
    console.log('📝 Updating homePage document in Sanity...\n')

    const result = await client
      .patch('homePage')
      .set({heroSlides})
      .commit()

    console.log('✅ Hero slider updated successfully!\n')
    console.log('📊 Summary:')
    console.log(`   - Total slides: ${heroSlides.length}`)
    console.log(`   - Document ID: ${result._id}`)
    console.log(`   - Updated at: ${result._updatedAt}\n`)

    console.log('🎉 Done! The home page hero slider now features:')
    heroImages.forEach((img, index) => {
      console.log(`   ${index + 1}. ${img.description} (${img.filename})`)
    })
    console.log()
    console.log('👉 Visit http://localhost:3000 to see the updated hero slider')
    console.log('👉 Visit http://localhost:3000/studio to edit content in Sanity Studio')

  } catch (error) {
    console.error('❌ Error updating hero slider:', error)
    throw error
  }
}

// Run the update
updateHeroSlider()
  .then(() => {
    console.log('\n✨ All done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error)
    process.exit(1)
  })
