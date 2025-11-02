/**
 * Script to bulk upload 22 new performance images to Sanity
 * Run with: npx tsx scripts/upload-new-images.ts
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

async function uploadImage(imagePath: string): Promise<any> {
  const imageBuffer = fs.readFileSync(imagePath)
  const filename = path.basename(imagePath)

  console.log(`  📤 Uploading: ${filename}...`)

  const asset = await client.assets.upload('image', imageBuffer, {
    filename,
  })

  console.log(`  ✅ Uploaded: ${filename} (${asset._id})`)
  return asset
}

// List of all new images with metadata
const NEW_IMAGES = [
  {
    path: 'public/images/blues-kiv.jpg',
    description: 'Kivett performing blues',
    priority: 'high' as const,
    kivettCentered: true,
  },
  {
    path: 'public/images/IMG-0921.jpg',
    description: 'Performance photo',
    priority: 'high' as const,
    kivettCentered: true,
  },
  {
    path: 'public/images/kivett-high-res_magicstudio_ybv1se0lo5i-2.jpg',
    description: 'High quality Kivett portrait',
    priority: 'high' as const,
    kivettCentered: true,
  },
  {
    path: 'public/images/memphis-flyer-green-1-of-1.jpg',
    description: 'Memphis Flyer feature photo',
    priority: 'high' as const,
    kivettCentered: true,
  },
  {
    path: 'public/images/382702580_10225110781416892_2823231479166319016_n.jpg',
    description: 'Recent performance',
    priority: 'high' as const,
    kivettCentered: true,
  },
  {
    path: 'public/images/38696879_10212495556648941_4928380418454978560_o.jpg',
    description: 'Live performance',
    priority: 'medium' as const,
    kivettCentered: true,
  },
  {
    path: 'public/images/38518091_10212495556928948_4930564546763948032_o.jpg',
    description: 'Stage performance',
    priority: 'medium' as const,
    kivettCentered: true,
  },
  {
    path: 'public/images/37124646_10212749349148811_4768331034854948864_o.jpg',
    description: 'Concert photo',
    priority: 'medium' as const,
    kivettCentered: true,
  },
  {
    path: 'public/images/26910150_10211126011331164_9091562930595566163_o.jpg',
    description: 'Guitar performance',
    priority: 'medium' as const,
    kivettCentered: true,
  },
  {
    path: 'public/images/16487687_1351833004875154_191765266250731543_o.jpg',
    description: 'Blues performance',
    priority: 'medium' as const,
    kivettCentered: true,
  },
  {
    path: 'public/images/16486991_10208279632410298_2503941337142380558_o.jpg',
    description: 'Stage shot',
    priority: 'medium' as const,
    kivettCentered: true,
  },
  {
    path: 'public/images/12345438_10100487099276149_1793184209465297962_n.jpg',
    description: 'Live show',
    priority: 'medium' as const,
    kivettCentered: true,
  },
  {
    path: 'public/images/11411611_842554405792934_9066253418565814135_o.jpg',
    description: 'Performance',
    priority: 'low' as const,
    kivettCentered: false,
  },
  {
    path: 'public/images/11427342_842554332459608_3793828764294850940_o.jpg',
    description: 'Concert',
    priority: 'low' as const,
    kivettCentered: false,
  },
  {
    path: 'public/images/10386889_666568380058205_4706124177037425882_o.jpg',
    description: 'Guitar close-up',
    priority: 'medium' as const,
    kivettCentered: true,
  },
  {
    path: 'public/images/10333456_673649522683424_348538615123514518_o.jpg',
    description: 'Performance shot',
    priority: 'low' as const,
    kivettCentered: false,
  },
  {
    path: 'public/images/10321709_666559680059075_1761408545473889635_o.jpg',
    description: 'Stage performance',
    priority: 'low' as const,
    kivettCentered: false,
  },
  {
    path: 'public/images/10295926_673648962683480_8536316079830052602_o.jpg',
    description: 'Live blues',
    priority: 'low' as const,
    kivettCentered: false,
  },
  {
    path: 'public/images/10287016_666559580059085_1082025093293241076_o.jpg',
    description: 'Guitar performance',
    priority: 'low' as const,
    kivettCentered: false,
  },
  {
    path: 'public/images/1498971_673649736016736_7481906129436420006_o.jpg',
    description: 'Concert performance',
    priority: 'low' as const,
    kivettCentered: false,
  },
  // Also upload currently unused organized images
  {
    path: 'public/images/performance/orpheum-main.jpg',
    description: 'Orpheum Theatre main stage',
    priority: 'high' as const,
    kivettCentered: true,
  },
  {
    path: 'public/images/performance/waltz-brewing-promo.jpg',
    description: 'Waltz Brewing promotional photo',
    priority: 'medium' as const,
    kivettCentered: true,
  },
]

async function uploadAllImages() {
  console.log('🎸 Starting bulk image upload to Sanity...\n')
  console.log(`📁 Total images to upload: ${NEW_IMAGES.length}\n`)

  const uploadedImages: UploadedImage[] = []
  let successCount = 0
  let errorCount = 0

  for (const imageInfo of NEW_IMAGES) {
    try {
      const fullPath = path.join(process.cwd(), imageInfo.path)

      if (!fs.existsSync(fullPath)) {
        console.log(`  ⚠️  Skipping: ${imageInfo.path} (file not found)`)
        errorCount++
        continue
      }

      const asset = await uploadImage(fullPath)

      uploadedImages.push({
        filename: path.basename(imageInfo.path),
        assetId: asset._id,
        url: asset.url,
        description: imageInfo.description,
        priority: imageInfo.priority,
        kivettCentered: imageInfo.kivettCentered,
      })

      successCount++
    } catch (error) {
      console.error(`  ❌ Error uploading ${imageInfo.path}:`, error)
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 Upload Summary:')
  console.log('='.repeat(50))
  console.log(`✅ Successfully uploaded: ${successCount}`)
  console.log(`❌ Failed: ${errorCount}`)
  console.log(`📁 Total processed: ${NEW_IMAGES.length}`)
  console.log('='.repeat(50) + '\n')

  // Save asset references to a JSON file for later use
  const outputPath = path.join(process.cwd(), 'scripts/uploaded-images.json')
  fs.writeFileSync(outputPath, JSON.stringify(uploadedImages, null, 2))
  console.log(`💾 Asset references saved to: ${outputPath}\n`)

  // Print high-priority Kivett-centered images for hero slider
  console.log('🌟 HIGH PRIORITY IMAGES (for hero slider):')
  console.log('='.repeat(50))
  const highPriorityImages = uploadedImages.filter(img => img.priority === 'high' && img.kivettCentered)
  highPriorityImages.forEach((img, index) => {
    console.log(`${index + 1}. ${img.filename}`)
    console.log(`   Asset ID: ${img.assetId}`)
    console.log(`   Description: ${img.description}`)
    console.log(`   URL: ${img.url}`)
    console.log()
  })

  return uploadedImages
}

// Run the upload
uploadAllImages()
  .then(() => {
    console.log('✨ All done! Images are now in Sanity CDN.')
    console.log('👉 Next step: Update hero slider and galleries in Sanity Studio')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Fatal error:', error)
    process.exit(1)
  })
