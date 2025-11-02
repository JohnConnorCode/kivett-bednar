/**
 * Gallery Images Population Script
 * Populates home page gallery with existing Sanity images
 */

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'pydiurzn',
  dataset: 'production',
  token: 'skAjk1YBqRvhtmr0k8tpaUzqtL3AODFzt5umtNllJmuohXMRTrCsbBNwZfJ9zhuY67scazn3gr1fPCNp22wkZC6siNA1xYJ7v3Ri0JOCPwYL3Bg0QteGFtui8hp3lpDwYaEn4UKLop0VSrVfe3KiK6g9D60B5RWY8NIwtuRqBxfMtiRb7VDn',
  apiVersion: '2025-01-01',
  useCdn: false,
})

async function populateGalleryImages() {
  console.log('\n🖼️  GALLERY IMAGES POPULATION\n')
  console.log('Populating home page gallery with existing images...\n')
  console.log('=' .repeat(70) + '\n')

  try {
    // Gallery images to use (existing in Sanity)
    const galleryImages = [
      {
        _key: 'gallery-1',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-492368684a18eec9770075f8d1045ab31cbfa37a-2048x1996-jpg'
          }
        },
        alt: 'Guitar craftsmanship and blues tradition',
        width: 2048,
        height: 1996,
      },
      {
        _key: 'gallery-2',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-021be207c1aef2e02019a840586fba49249bc994-1952x1952-jpg'
          }
        },
        alt: 'Concert energy and stage presence',
        width: 1952,
        height: 1952,
      },
      {
        _key: 'gallery-3',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-bad8dc94709b242b4df768eb4871a5901114ac91-894x1440-jpg'
          }
        },
        alt: 'Intimate blues performance',
        width: 894,
        height: 1440,
      },
      {
        _key: 'gallery-4',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-4768ec02539e5a3aba263d05a885c2aff62ebefc-960x846-jpg'
          }
        },
        alt: 'Live show atmosphere',
        width: 960,
        height: 846,
      },
      {
        _key: 'gallery-5',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-418d42236dbd40bce225d925931046ea55fc4aba-1080x1080-jpg'
          }
        },
        alt: 'Waltz Brewing performance',
        width: 1080,
        height: 1080,
      },
      {
        _key: 'gallery-6',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-6b49735c0c260218eb9ef1ba400d8ceb7600838c-1200x1071-jpg'
          }
        },
        alt: 'Stage performance with guitar',
        width: 1200,
        height: 1071,
      },
      {
        _key: 'gallery-7',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-ef5385756135b9edaa709af9369634abcf391800-2048x1366-jpg'
          }
        },
        alt: 'Wide angle stage shot',
        width: 2048,
        height: 1366,
      },
      {
        _key: 'gallery-8',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-946481b759a9e6e156153c18f113d812755db25c-960x741-jpg'
          }
        },
        alt: 'Classic blues performance',
        width: 960,
        height: 741,
      },
    ]

    await client
      .patch('homePage')
      .set({
        galleryImages: galleryImages,
      })
      .commit()

    console.log('   ✓ Added 8 gallery images')
    console.log('✅ Gallery images populated successfully\n')
    console.log('=' .repeat(70) + '\n')

  } catch (error) {
    console.error('❌ Error populating gallery images:', error)
    throw error
  }
}

populateGalleryImages()
  .then(() => {
    console.log('\n✨ Gallery population complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error)
    process.exit(1)
  })
