/**
 * Artistic curation of all images across the site
 * Hand-picked with creative judgment for a bluesy, professional aesthetic
 */

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'pydiurzn',
  dataset: 'production',
  token: 'skAjk1YBqRvhtmr0k8tpaUzqtL3AODFzt5umtNllJmuohXMRTrCsbBNwZfJ9zhuY67scazn3gr1fPCNp22wkZC6siNA1xYJ7v3Ri0JOCPwYL3Bg0QteGFtui8hp3lpDwYaEn4UKLop0VSrVfe3KiK6g9D60B5RWY8NIwtuRqBxfMtiRb7VDn',
  apiVersion: '2025-01-01',
  useCdn: false,
})

async function curateAllImages() {
  console.log('🎨 ARTISTIC CURATION: Creating a beautiful, bluesy aesthetic\n')
  console.log('=' .repeat(70) + '\n')

  try {
    // ========================================================================
    // HERO SLIDER - Tell a visual story (9 slides)
    // ========================================================================
    console.log('🎸 HERO SLIDER - Opening with impact...\n')

    const heroSlides = [
      {
        _key: 'hero-1',
        _type: 'object',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-7b0c18ed3066b1838125fe4f3394551d7630eec5-2980x2001-jpg', // High-res portrait - STUNNING OPENER
          },
        },
        alt: 'Kivett Bednar - Portland blues guitarist and musician',
      },
      {
        _key: 'hero-2',
        _type: 'object',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-bba95d0e1cb684d423219883dee769fbcc6ebb29-1510x1249-jpg', // Orpheum Theatre - iconic venue
          },
        },
        alt: 'Performing at the historic Orpheum Theatre',
      },
      {
        _key: 'hero-3',
        _type: 'object',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-946481b759a9e6e156153c18f113d812755db25c-960x741-jpg', // Blues-kiv - pure blues energy
          },
        },
        alt: 'Kivett performing gritty Texas blues',
      },
      {
        _key: 'hero-4',
        _type: 'object',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-f5a80b3637d1a90c2003cd4c3485a51bb31b3c48-1800x1799-jpg', // Recent performance - shows current work
          },
        },
        alt: 'Recent live performance',
      },
      {
        _key: 'hero-5',
        _type: 'object',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-5d00c0eea03d0d45e3a3cce04e214eebdb2a92fd-1400x933-jpg', // Memphis Flyer - press credibility
          },
        },
        alt: 'Featured in Memphis Flyer',
      },
      {
        _key: 'hero-6',
        _type: 'object',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-f1742d6f0944e2dbfe484abdfcfe54fadf79eaec-2048x1366-jpg', // Wide stage shot - expansive
          },
        },
        alt: 'Live blues performance',
      },
      {
        _key: 'hero-7',
        _type: 'object',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-3f91e71cac703f26ceb5d8b46c3c0730f9fd1791-1200x997-jpg', // Medium performance shot
          },
        },
        alt: 'Live performance energy',
      },
      {
        _key: 'hero-8',
        _type: 'object',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-7271c3b4fc924a8943b74d0f8c77399e2b192ee0-1000x973-jpg', // Guitar close-up - craft focus
          },
        },
        alt: 'Guitar performance detail',
      },
      {
        _key: 'hero-9',
        _type: 'object',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-46fd9566049235ae7e1131de99873d5fe0688094-960x960-jpg', // Square format - strong composition
          },
        },
        alt: 'Blues guitarist in action',
      },
    ]

    console.log('   ✓ Opening with stunning 2980x2001 high-res portrait')
    console.log('   ✓ Historic Orpheum Theatre for credibility')
    console.log('   ✓ Pure blues energy shot')
    console.log('   ✓ Recent performance showing current work')
    console.log('   ✓ Memphis Flyer press feature')
    console.log('   ✓ Wide expansive stage shot')
    console.log('   ✓ Medium performance energy')
    console.log('   ✓ Guitar craft close-up')
    console.log('   ✓ Strong square composition finale')
    console.log(`   Total: ${heroSlides.length} carefully curated slides\n`)

    await client
      .patch('homePage')
      .set({heroSlides})
      .commit()

    console.log('✅ Hero slider updated with artistic flow\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // ABOUT SECTION - Professional portrait
    // ========================================================================
    console.log('👤 ABOUT SECTION - Premium portrait...\n')

    const aboutImage = {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-7b0c18ed3066b1838125fe4f3394551d7630eec5-2980x2001-jpg', // Highest quality portrait
      },
      alt: 'Kivett Bednar - Musician, Amp Maker, Artist',
    }

    console.log('   ✓ Using highest resolution portrait (2980x2001)')
    console.log('   ✓ Professional, striking, perfect for About section\n')

    await client
      .patch('homePage')
      .set({aboutImage})
      .commit()

    console.log('✅ About section image set\n')
    console.log('=' .repeat(70) + '\n')

    console.log('🎉 ARTISTIC CURATION COMPLETE!\n')
    console.log('Your site now features:')
    console.log('  • 9 hand-picked hero slides telling a visual story')
    console.log('  • Premium portrait in About section')
    console.log('  • Professional, bluesy aesthetic throughout')
    console.log('  • Perfect balance of stage presence & intimacy\n')
    console.log('👉 Visit http://localhost:3000 to see the beautiful result')

  } catch (error) {
    console.error('❌ Error during curation:', error)
    throw error
  }
}

curateAllImages()
  .then(() => {
    console.log('\n✨ Curation complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error)
    process.exit(1)
  })
