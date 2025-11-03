/**
 * SET DEFAULT TEXT SIZES
 * Sets default text size values for hero heading if not already set
 */

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'pydiurzn',
  dataset: 'production',
  token: 'skAjk1YBqRvhtmr0k8tpaUzqtL3AODFzt5umtNllJmuohXMRTrCsbBNwZfJ9zhuY67scazn3gr1fPCNp22wkZC6siNA1xYJ7v3Ri0JOCPwYL3Bg0QteGFtui8hp3lpDwYaEn4UKLop0VSrVfe3KiK6g9D60B5RWY8NIwtuRqBxfMtiRb7VDn',
  apiVersion: '2025-01-01',
  useCdn: false,
})

async function setDefaultTextSizes() {
  console.log('🎨 SETTING DEFAULT TEXT SIZES\n')
  console.log('=' .repeat(70) + '\n')

  try {
    const homePage = await client.fetch(`*[_id == "homePage"][0]`)

    if (!homePage) {
      console.log('⚠️  No homePage found')
      return
    }

    console.log('Current values:')
    console.log(`  Desktop: ${homePage.heroHeadingDesktopSize || 'not set'}`)
    console.log(`  Mobile: ${homePage.heroHeadingMobileSize || 'not set'}\n`)

    // Only set if not already set
    const updates: any = {}

    if (!homePage.heroHeadingDesktopSize) {
      updates.heroHeadingDesktopSize = 'text-8xl'
    }

    if (!homePage.heroHeadingMobileSize) {
      updates.heroHeadingMobileSize = 'text-5xl'
    }

    if (Object.keys(updates).length > 0) {
      console.log('Setting defaults...\n')

      await client
        .patch('homePage')
        .set(updates)
        .commit()

      console.log('✅ DEFAULT TEXT SIZES SET!\n')
      console.log('New values:')
      console.log(`  Desktop: ${updates.heroHeadingDesktopSize || homePage.heroHeadingDesktopSize}`)
      console.log(`  Mobile: ${updates.heroHeadingMobileSize || homePage.heroHeadingMobileSize}\n`)
      console.log('=' .repeat(70))
      console.log('\n📝 You can now adjust these in Sanity Studio:\n')
      console.log('   1. Open http://localhost:3333')
      console.log('   2. Go to Home Page')
      console.log('   3. Find "Hero Heading Size (Desktop)" and "Hero Heading Size (Mobile)"')
      console.log('   4. Choose from the dropdown options\n')
    } else {
      console.log('✅ Text sizes already set!\n')
      console.log('=' .repeat(70))
      console.log('\n📝 Adjust them in Sanity Studio:\n')
      console.log('   1. Open http://localhost:3333')
      console.log('   2. Go to Home Page')
      console.log('   3. Find "Hero Heading Size (Desktop)" and "Hero Heading Size (Mobile)"')
      console.log('   4. Choose from the dropdown options\n')
    }

  } catch (error: any) {
    console.error('❌ Error:', error.message)
    throw error
  }
}

setDefaultTextSizes()
