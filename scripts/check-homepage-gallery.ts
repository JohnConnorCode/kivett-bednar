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
]

async function checkHomepageGallery() {
  console.log('🔍 CHECKING HOMEPAGE GALLERY IN HISTORY\n')
  console.log('=' .repeat(70) + '\n')

  const versions: any[] = []

  for (const {id: transactionId, date} of transactionIds) {
    console.log(`Checking version from ${date}...`)

    try {
      const doc = await client.request({
        url: `/data/history/production/documents/homePage?time=${date}`,
        method: 'GET',
      })

      if (doc && doc.documents && doc.documents.length > 0) {
        const document = doc.documents[0]
        const galleryCount = document.galleryImages?.length || 0

        console.log(`   → ${galleryCount} gallery images`)

        if (galleryCount > 0) {
          versions.push({
            transactionId,
            date,
            galleryCount,
            document
          })
        }
      }
    } catch (error: any) {
      console.log(`   ✗ No version`)
    }
  }

  if (versions.length > 0) {
    console.log('\n' + '=' .repeat(70) + '\n')
    console.log('📊 VERSIONS WITH GALLERY:\n')

    versions.sort((a, b) => b.galleryCount - a.galleryCount)

    versions.forEach((v, i) => {
      console.log(`${i + 1}. ${v.date} - ${v.galleryCount} images`)
    })

    const bestVersion = versions[0]

    console.log('\n' + '=' .repeat(70))
    console.log('\n✅ BEST VERSION FOUND!\n')
    console.log(`   Date: ${bestVersion.date}`)
    console.log(`   Gallery images: ${bestVersion.galleryCount}\n`)

    // Save it
    const recoveryDir = path.join(process.cwd(), 'sanity-recovery')
    const filename = `homepage-with-${bestVersion.galleryCount}-gallery-images.json`
    const filepath = path.join(recoveryDir, filename)

    fs.writeFileSync(filepath, JSON.stringify(bestVersion.document, null, 2))

    console.log(`📁 Saved to: ${filepath}\n`)

    // Show gallery details
    if (bestVersion.document.galleryImages) {
      console.log('Gallery Images:\n')
      bestVersion.document.galleryImages.forEach((img: any, i: number) => {
        console.log(`  ${i + 1}. ${img.alt || 'No alt'}`)
        console.log(`     Image: ${img.image?.asset?._ref || 'MISSING'}`)
      })
    }

    console.log('\n' + '=' .repeat(70))
    console.log('\n🔧 RESTORING GALLERY NOW...\n')

    // Just update the gallery field using patch
    await client
      .patch('homePage')
      .set({ galleryImages: bestVersion.document.galleryImages })
      .commit()

    console.log('✅ HOMEPAGE GALLERY RESTORED!\n')

  } else {
    console.log('\n⚠️  No versions with gallery found')
  }
}

checkHomepageGallery()
