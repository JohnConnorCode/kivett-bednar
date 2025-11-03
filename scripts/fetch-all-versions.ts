/**
 * FETCH ALL VERSIONS FROM SANITY HISTORY
 * Uses proper server-side API calls to get document at each transaction
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

const transactionIds = [
  // These are BEFORE my destructive createOrReplace on Nov 3
  { id: 'SREve7bOUfTqn6uTH1KM2k', date: '2025-11-02T04:01:26.613207Z' },
  { id: 'uU5Y9pmGe5l1IKNuwo9OUB', date: '2025-11-02T04:07:04.379156Z' },
  { id: 'T0zY3vaSb7fEMNaeV15iqy', date: '2025-11-02T04:07:05.642716Z' },
  { id: 'uU5Y9pmGe5l1IKNuwoB7u3', date: '2025-11-02T04:56:01.794573Z' },
  { id: 'uU5Y9pmGe5l1IKNuwoDBu7', date: '2025-11-02T05:19:38.994105Z' },
  { id: 'uU5Y9pmGe5l1IKNuwoF97i', date: '2025-11-02T05:46:21.319481Z' },
  { id: 'SREve7bOUfTqn6uTH1WQLa', date: '2025-11-02T08:17:30.265370Z' },
  { id: 'SREve7bOUfTqn6uTH1WdFa', date: '2025-11-02T08:30:07.906640Z' },
  { id: 'SREve7bOUfTqn6uTH1oHbu', date: '2025-11-02T14:19:12.086566Z' },
  { id: 'uU5Y9pmGe5l1IKNuworU6b', date: '2025-11-02T14:28:26.943720Z' },
  { id: 'SREve7bOUfTqn6uTH1omPa', date: '2025-11-02T14:32:32.780986Z' },
  { id: 'uU5Y9pmGe5l1IKNuwp2Qgj', date: '2025-11-02T16:00:42.568938Z' },
  { id: 'SREve7bOUfTqn6uTH0Quck', date: '2025-11-01T16:17:21.759708Z' },
  { id: 'SREve7bOUfTqn6uTH0NwRO', date: '2025-11-01T15:58:32.748271Z' },
  { id: 'uU5Y9pmGe5l1IKNuwmfTux', date: '2025-11-01T15:45:10.431622Z' },
]

async function fetchAllVersions() {
  console.log('🔍 FETCHING ALL DOCUMENT VERSIONS\n')
  console.log('=' .repeat(70) + '\n')

  const versions: any[] = []

  for (const {id: transactionId, date} of transactionIds) {
    console.log(`Fetching version from ${date}...`)

    try {
      // Use Sanity client to fetch document at this time
      const doc = await client.request({
        url: `/data/history/production/documents/homePage?time=${date}`,
        method: 'GET',
      })

      if (doc && doc.documents && doc.documents.length > 0) {
        const document = doc.documents[0]
        const slideCount = document.heroSlides?.length || 0

        console.log(`   → ${slideCount} hero slides`)

        versions.push({
          transactionId,
          date,
          slideCount,
          document
        })
      }
    } catch (error: any) {
      console.log(`   ✗ Error: ${error.message}`)
    }
  }

  console.log('\n' + '=' .repeat(70) + '\n')
  console.log('📊 ALL VERSIONS:\n')

  // Sort by slide count descending
  versions.sort((a, b) => b.slideCount - a.slideCount)

  versions.forEach((v, i) => {
    console.log(`${i + 1}. ${v.date} - ${v.slideCount} slides`)
  })

  const bestVersion = versions[0]

  if (bestVersion) {
    console.log('\n' + '=' .repeat(70))
    console.log('\n✅ BEST VERSION FOUND!\n')
    console.log(`   Date: ${bestVersion.date}`)
    console.log(`   Hero slides: ${bestVersion.slideCount}`)
    console.log(`   Transaction: ${bestVersion.transactionId}\n`)

    // Save it
    const recoveryDir = path.join(process.cwd(), 'sanity-recovery')
    if (!fs.existsSync(recoveryDir)) {
      fs.mkdirSync(recoveryDir, { recursive: true })
    }

    const filename = `homepage-${bestVersion.slideCount}-slides-${bestVersion.date.replace(/:/g, '-')}.json`
    const filepath = path.join(recoveryDir, filename)

    fs.writeFileSync(filepath, JSON.stringify(bestVersion.document, null, 2))

    console.log(`📁 Saved to: ${filepath}\n`)

    // Show slide details
    if (bestVersion.document.heroSlides) {
      console.log('Hero Slides:\n')
      bestVersion.document.heroSlides.forEach((slide: any, i: number) => {
        console.log(`  ${i + 1}. ${slide.alt || 'No alt'}`)
        console.log(`     Image ref: ${slide.image?.asset?._ref || 'MISSING'}`)
        if (slide.desktopPosition || slide.mobilePosition) {
          console.log(`     Positions: ${slide.desktopPosition || 'default'} / ${slide.mobilePosition || 'default'}`)
        }
        if (slide.image?.hotspot) {
          console.log(`     Hotspot: x=${slide.image.hotspot.x}, y=${slide.image.hotspot.y}`)
        }
      })
    }

    console.log('\n' + '=' .repeat(70))
    console.log('\n🔧 TO RESTORE THIS VERSION:\n')
    console.log(`   npx tsx scripts/restore-from-backup.ts "${filepath}"`)
    console.log('\n   This will restore ALL hero slides with their images and positioning!\n')

    return bestVersion
  }
}

fetchAllVersions()
