import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'pydiurzn',
  dataset: 'production',
  token: 'skAjk1YBqRvhtmr0k8tpaUzqtL3AODFzt5umtNllJmuohXMRTrCsbBNwZfJ9zhuY67scazn3gr1fPCNp22wkZC6siNA1xYJ7v3Ri0JOCPwYL3Bg0QteGFtui8hp3lpDwYaEn4UKLop0VSrVfe3KiK6g9D60B5RWY8NIwtuRqBxfMtiRb7VDn',
  apiVersion: '2025-01-01',
  useCdn: false,
})

async function checkContactGallery() {
  const contactPage = await client.fetch('*[_id == "contactPage"][0]')

  console.log('Current Contact Page Gallery Status:\n')
  console.log('Portrait Gallery:', contactPage?.portraitGallery?.length || 0, 'images')

  if (contactPage?.portraitGallery) {
    console.log('\nGallery Images:')
    contactPage.portraitGallery.forEach((img: any, i: number) => {
      console.log(`  ${i + 1}. ${img.alt || 'No alt'}`)
      console.log(`     Image: ${img.image?.asset?._ref ? '✓' : '✗ MISSING'}`)
    })
  } else {
    console.log('⚠️  No gallery found!')
  }
}

checkContactGallery()
