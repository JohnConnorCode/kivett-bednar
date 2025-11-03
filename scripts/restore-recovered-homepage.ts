/**
 * RESTORE RECOVERED HOMEPAGE
 * Restores the homepage document recovered from Sanity history
 * This includes ALL 9 hero slides with images and positioning
 */

import {createClient} from '@sanity/client'
import fs from 'fs'

const client = createClient({
  projectId: 'pydiurzn',
  dataset: 'production',
  token: 'skAjk1YBqRvhtmr0k8tpaUzqtL3AODFzt5umtNllJmuohXMRTrCsbBNwZfJ9zhuY67scazn3gr1fPCNp22wkZC6siNA1xYJ7v3Ri0JOCPwYL3Bg0QteGFtui8hp3lpDwYaEn4UKLop0VSrVfe3KiK6g9D60B5RWY8NIwtuRqBxfMtiRb7VDn',
  apiVersion: '2025-01-01',
  useCdn: false,
})

async function restoreRecoveredHomepage() {
  console.log('🔄 RESTORING RECOVERED HOMEPAGE\n')
  console.log('=' .repeat(70) + '\n')

  const recoveryFile = '/Users/johnconnor/Documents/GitHub/Kivett2/sanity-recovery/homepage-9-slides-2025-11-02T04-07-04.379156Z.json'

  try {
    // Read the recovered document
    console.log('📁 Reading recovered document...')
    const recoveredDoc = JSON.parse(fs.readFileSync(recoveryFile, 'utf-8'))

    console.log(`   Document ID: ${recoveredDoc._id}`)
    console.log(`   Document Type: ${recoveredDoc._type}`)
    console.log(`   Hero Slides: ${recoveredDoc.heroSlides?.length || 0}`)
    console.log(`   Created At: ${recoveredDoc._createdAt}`)
    console.log(`   Updated At: ${recoveredDoc._updatedAt}\n`)

    // Show all the hero slides that will be restored
    if (recoveredDoc.heroSlides) {
      console.log('📸 Hero Slides to Restore:\n')
      recoveredDoc.heroSlides.forEach((slide: any, i: number) => {
        console.log(`   ${i + 1}. ${slide.alt}`)
        console.log(`      Image: ${slide.image?.asset?._ref}`)
        if (slide.desktopPosition || slide.mobilePosition) {
          console.log(`      Desktop: ${slide.desktopPosition || 'default'} | Mobile: ${slide.mobilePosition || 'default'}`)
        }
        if (slide.image?.hotspot) {
          console.log(`      Hotspot: x=${slide.image.hotspot.x}, y=${slide.image.hotspot.y}`)
        }
      })
      console.log('')
    }

    // Restore the document
    console.log('⚡ Restoring to Sanity...\n')

    await client.createOrReplace(recoveredDoc)

    console.log('✅ HOMEPAGE RESTORED SUCCESSFULLY!\n')
    console.log('=' .repeat(70) + '\n')
    console.log('📊 RESTORED:')
    console.log(`   - Hero Heading: ${recoveredDoc.heroHeading}`)
    console.log(`   - Hero Subheading: ${recoveredDoc.heroSubheading}`)
    console.log(`   - Hero Tagline: ${recoveredDoc.heroTagline}`)
    console.log(`   - Hero Slides: ${recoveredDoc.heroSlides?.length || 0}`)
    console.log(`   - About Heading: ${recoveredDoc.aboutHeading}`)
    console.log(`   - Album Title: ${recoveredDoc.albumTitle}`)
    console.log(`   - Album Year: ${recoveredDoc.albumYear}\n`)

    console.log('🎯 Next Steps:')
    console.log('   1. Open Sanity Studio: http://localhost:3333')
    console.log('   2. Verify all 9 hero slides are visible')
    console.log('   3. Check that images and positioning are correct')
    console.log('   4. Test the homepage in the browser\n')

  } catch (error: any) {
    console.error('❌ Error restoring homepage:', error.message)
    throw error
  }
}

restoreRecoveredHomepage()
