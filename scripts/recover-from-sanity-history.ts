/**
 * RECOVER FROM SANITY HISTORY
 * Sanity keeps a complete history of all document changes!
 * This script fetches the document history and lets you restore previous versions
 * Run with: npx tsx scripts/recover-from-sanity-history.ts
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

async function recoverFromHistory() {
  console.log('🔍 CHECKING SANITY DOCUMENT HISTORY\n')
  console.log('=' .repeat(70) + '\n')

  try {
    // Get history for homePage document
    console.log('📜 Fetching history for homePage document...\n')

    const history = await client.fetch(
      `*[_id == "homePage"] | order(_updatedAt desc) [0...10] {
        _id,
        _updatedAt,
        _rev,
        "heroSlideCount": count(heroSlides),
        heroSlides[0...2] {
          alt,
          "hasImage": defined(image.asset._ref)
        }
      }`
    )

    console.log(`Found ${history.length} versions:\n`)

    history.forEach((version: any, index: number) => {
      const date = new Date(version._updatedAt).toLocaleString()
      console.log(`${index + 1}. Version from ${date}`)
      console.log(`   Hero slides: ${version.heroSlideCount || 0}`)
      console.log(`   Revision: ${version._rev}`)
      console.log('')
    })

    // Find version with most hero slides (likely the original)
    const bestVersion = history.reduce((best: any, current: any) => {
      const currentCount = current.heroSlideCount || 0
      const bestCount = best?.heroSlideCount || 0
      return currentCount > bestCount ? current : best
    }, null)

    if (bestVersion && bestVersion.heroSlideCount > 6) {
      console.log('🎯 FOUND BETTER VERSION!\n')
      console.log(`   Best version from: ${new Date(bestVersion._updatedAt).toLocaleString()}`)
      console.log(`   Hero slides: ${bestVersion.heroSlideCount}`)
      console.log(`   Revision: ${bestVersion._rev}\n`)

      // Fetch the complete document at that revision
      console.log('📥 Fetching complete document at that revision...\n')

      const fullDocument = await client.fetch(
        `*[_id == "homePage" && _rev == $rev][0]`,
        { rev: bestVersion._rev }
      )

      if (fullDocument) {
        // Save to file
        const recoveryDir = path.join(process.cwd(), 'sanity-recovery')
        if (!fs.existsSync(recoveryDir)) {
          fs.mkdirSync(recoveryDir, { recursive: true })
        }

        const recoveryFile = path.join(
          recoveryDir,
          `homePage-${bestVersion.heroSlideCount}-slides-${bestVersion._rev}.json`
        )

        fs.writeFileSync(recoveryFile, JSON.stringify(fullDocument, null, 2))

        console.log(`✅ RECOVERY SUCCESSFUL!\n`)
        console.log(`📁 Saved to: ${recoveryFile}\n`)
        console.log(`Hero slides in recovered version: ${fullDocument.heroSlides?.length || 0}\n`)

        // Show hero slide details
        if (fullDocument.heroSlides) {
          console.log('Hero slides:')
          fullDocument.heroSlides.forEach((slide: any, i: number) => {
            console.log(`  ${i + 1}. ${slide.alt || 'No alt text'}`)
            console.log(`     Image: ${slide.image?.asset?._ref ? '✓' : '✗'}`)
            if (slide.desktopPosition || slide.mobilePosition) {
              console.log(`     Positioning: Desktop=${slide.desktopPosition || 'default'}, Mobile=${slide.mobilePosition || 'default'}`)
            }
          })
        }

        console.log('\n' + '=' .repeat(70))
        console.log('\n⚠️  TO RESTORE THIS VERSION:\n')
        console.log('Option 1 - Restore via script:')
        console.log(`   npx tsx scripts/restore-specific-version.ts "${recoveryFile}"\n`)
        console.log('Option 2 - Manual restore in Sanity Studio:')
        console.log('   1. Open http://localhost:3333')
        console.log('   2. Go to HomePage document')
        console.log('   3. Click "Review changes" or "History" tab')
        console.log(`   4. Find version from ${new Date(bestVersion._updatedAt).toLocaleString()}`)
        console.log('   5. Click "Restore this revision"\n')

        return fullDocument
      }
    } else {
      console.log('⚠️  No version with more than 6 hero slides found in recent history.\n')
      console.log('Options:')
      console.log('1. Check Sanity Studio manually: http://localhost:3333')
      console.log('   - Open HomePage document')
      console.log('   - Click History tab')
      console.log('   - Scroll through versions to find one with 8 slides\n')
      console.log('2. Contact Sanity support to recover from deeper history')
      console.log('3. Manually re-add the missing hero slides\n')
    }

  } catch (error: any) {
    console.error('❌ Error fetching history:', error.message)

    if (error.message.includes('Insufficient permissions')) {
      console.log('\n⚠️  This token might not have history access.')
      console.log('Try viewing history in Sanity Studio instead:')
      console.log('   1. Open http://localhost:3333')
      console.log('   2. Go to HomePage document')
      console.log('   3. Click "Review changes" or "History" tab')
      console.log('   4. Find a version with 8 hero slides')
      console.log('   5. Click "Restore this revision"')
    }

    throw error
  }
}

recoverFromHistory()
