/**
 * DEEP HISTORY RECOVERY
 * Uses Sanity's transactions API to find ALL versions of a document
 * Even those before createOrReplace operations
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

async function deepHistoryRecovery() {
  console.log('🔍 DEEP HISTORY RECOVERY\n')
  console.log('=' .repeat(70) + '\n')

  try {
    // Step 1: Get ALL transactions for homePage
    console.log('📜 Fetching ALL transactions for homePage...\n')

    const response = await fetch(
      `https://pydiurzn.api.sanity.io/v2025-01-01/data/transactions/production/homePage`,
      {
        headers: {
          'Authorization': `Bearer skAjk1YBqRvhtmr0k8tpaUzqtL3AODFzt5umtNllJmuohXMRTrCsbBNwZfJ9zhuY67scazn3gr1fPCNp22wkZC6siNA1xYJ7v3Ri0JOCPwYL3Bg0QteGFtui8hp3lpDwYaEn4UKLop0VSrVfe3KiK6g9D60B5RWY8NIwtuRqBxfMtiRb7VDn`
        }
      }
    )

    const ndjson = await response.text()
    const transactions = ndjson
      .split('\n')
      .filter(line => line.trim())
      .map(line => JSON.parse(line))

    console.log(`Found ${transactions.length} transactions\n`)

    // Step 2: For each transaction, get the document state
    const versions: any[] = []

    for (const transaction of transactions) {
      const transactionId = transaction.id
      const timestamp = transaction.timestamp

      console.log(`Checking transaction ${transactionId} from ${new Date(timestamp).toLocaleString()}...`)

      // Get document at this transaction
      const historyResponse = await fetch(
        `https://pydiurzn.api.sanity.io/v2025-01-01/data/history/production/documents/homePage?transaction=${transactionId}&excludeContent=false`,
        {
          headers: {
            'Authorization': `Bearer skAjk1YBqRvhtmr0k8tpaUzqtL3AODFzt5umtNllJmuohXMRTrCsbBNwZfJ9zhuY67scazn3gr1fPCNp22wkZC6siNA1xYJ7v3Ri0JOCPwYL3Bg0QteGFtui8hp3lpDwYaEn4UKLop0VSrVfe3KiK6g9D60B5RWY8NIwtuRqBxfMtiRb7VDn`
          }
        }
      )

      const historyData = await historyResponse.json()

      if (historyData.documents && historyData.documents.length > 0) {
        const doc = historyData.documents[0]
        const slideCount = doc.heroSlides?.length || 0

        console.log(`   → ${slideCount} hero slides`)

        versions.push({
          transactionId,
          timestamp,
          document: doc,
          heroSlideCount: slideCount
        })
      }
    }

    // Step 3: Find the best version (most hero slides)
    console.log('\n' + '=' .repeat(70) + '\n')
    console.log('📊 VERSION SUMMARY:\n')

    versions.sort((a, b) => b.heroSlideCount - a.heroSlideCount)

    versions.forEach((v, i) => {
      console.log(`${i + 1}. ${new Date(v.timestamp).toLocaleString()} - ${v.heroSlideCount} slides`)
    })

    const bestVersion = versions[0]

    if (bestVersion && bestVersion.heroSlideCount >= 6) {
      console.log('\n' + '=' .repeat(70))
      console.log('\n✅ FOUND BEST VERSION!\n')
      console.log(`   Date: ${new Date(bestVersion.timestamp).toLocaleString()}`)
      console.log(`   Hero slides: ${bestVersion.heroSlideCount}`)
      console.log(`   Transaction: ${bestVersion.transactionId}\n`)

      // Save it
      const recoveryDir = path.join(process.cwd(), 'sanity-recovery')
      if (!fs.existsSync(recoveryDir)) {
        fs.mkdirSync(recoveryDir, { recursive: true })
      }

      const filename = `homepage-RECOVERED-${bestVersion.heroSlideCount}-slides.json`
      const filepath = path.join(recoveryDir, filename)

      fs.writeFileSync(filepath, JSON.stringify(bestVersion.document, null, 2))

      console.log(`📁 Saved to: ${filepath}\n`)

      // Show slide details
      console.log('Hero Slides:\n')
      bestVersion.document.heroSlides?.forEach((slide: any, i: number) => {
        console.log(`  ${i + 1}. ${slide.alt || 'No alt'}`)
        console.log(`     Image: ${slide.image?.asset?._ref || 'MISSING'}`)
        if (slide.desktopPosition || slide.mobilePosition) {
          console.log(`     Position: Desktop=${slide.desktopPosition}, Mobile=${slide.mobilePosition}`)
        }
      })

      console.log('\n' + '=' .repeat(70))
      console.log('\n🔧 TO RESTORE:\n')
      console.log(`   npx tsx scripts/restore-from-backup.ts "${filepath}"`)

      return bestVersion.document

    } else {
      console.log('\n⚠️  Could not find version with enough slides')
    }

  } catch (error: any) {
    console.error('❌ Error:', error.message)
    throw error
  }
}

deepHistoryRecovery()
