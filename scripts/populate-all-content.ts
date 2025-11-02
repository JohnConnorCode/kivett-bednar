/**
 * Complete Content Population Script
 * Uploads all images to Sanity and populates all page content
 * Run with: npx tsx scripts/populate-all-content.ts
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

// Helper function to upload image from file system
async function uploadImage(imagePath: string, altText: string): Promise<any> {
  const fullPath = path.join(process.cwd(), 'public', imagePath)

  if (!fs.existsSync(fullPath)) {
    console.log(`   ⚠️  Image not found: ${imagePath}`)
    return null
  }

  try {
    const buffer = fs.readFileSync(fullPath)
    const asset = await client.assets.upload('image', buffer, {
      filename: path.basename(imagePath),
    })

    console.log(`   ✓ Uploaded: ${imagePath}`)
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: altText,
    }
  } catch (error) {
    console.log(`   ❌ Error uploading ${imagePath}:`, error)
    return null
  }
}

async function populateAllContent() {
  console.log('\n🎨 COMPLETE CONTENT POPULATION\n')
  console.log('Uploading all images and populating all Sanity content...\n')
  console.log('=' .repeat(70) + '\n')

  try {
    // ========================================================================
    // HOME PAGE - Complete image and text population
    // ========================================================================
    console.log('🏠 HOME PAGE - Uploading images and updating content...\n')

    // Upload images first
    const aboutImage = await uploadImage(
      'images/kivett-high-res_magicstudio_ybv1se0lo5i-2.jpg',
      'Kivett Bednar portrait'
    )

    const performanceImage = await uploadImage(
      'images/performance/orpheum-main.jpg',
      'Kivett performing at the Orpheum'
    )

    // Parallax images
    const parallaxImage1 = await uploadImage(
      'images/hero/guitar-red.jpg',
      'Red guitar detail'
    )
    const parallaxImage2 = await uploadImage(
      'images/portraits/guild-shirt.jpg',
      'Kivett with Guild guitar'
    )

    // Gallery images
    const gallery1 = await uploadImage('images/gallery/hero-stage-compressed.jpg', 'Stage performance')
    const gallery2 = await uploadImage('images/performance/orpheum-main.jpg', 'Orpheum performance')
    const gallery3 = await uploadImage('images/hero/guitar-red.jpg', 'Red guitar close-up')
    const gallery4 = await uploadImage('images/portraits/traced-portrait.png', 'Artistic portrait')
    const gallery5 = await uploadImage('images/portraits/guild-shirt.jpg', 'With Guild guitar')
    const gallery6 = await uploadImage('images/performance/waltz-brewing-promo.jpg', 'Waltz Brewing show')

    // Update home page with all fields
    await client
      .patch('homePage')
      .set({
        // Existing text content (from previous script)
        heroHeading: 'Kivett Bednar',
        heroSubheading: 'Blues Guitarist • Austin, TX • Portland, OR',
        heroTagline: 'Gritty Texas Blues meets the heart of the Pacific Northwest',
        aboutHeading: 'Musician, Amp Maker, Artist',
        aboutText: `Grew up in Austin's blues scene, sneaking into Antone's to hear the legends. Now based in Portland, bringing that same raw energy to the Pacific Northwest.

Third place out of 400 bands at the 2017 International Blues Competition in Memphis. Berklee College of Music, magna cum laude. Twenty years teaching experience.

Not just a musician—builds custom tube amps, creates visual art, and keeps the blues alive through teaching and performing.`,

        // Images
        ...(aboutImage && {aboutImage}),

        // Album section
        albumTitle: 'Land of the Living',
        albumYear: '2014',
        albumFormat: 'Limited Edition Red Vinyl (500 copies)',
        albumDescription: 'Collaboration with Anthony Pausic (drums). Blending blues traditions with guitar tones from heavier influences like doom and stoner-rock. Raw, authentic, and distinctly Pacific Northwest.',
        albumFeatures: [
          'Blues standards and original compositions',
          'Live-recorded energy and authenticity',
          'Red vinyl limited to 500 copies',
        ],

        ctaLessonsHeading: 'Learn Authentic Blues Guitar',
        ctaLessonsText: 'Twenty years teaching experience. Berklee College of Music, magna cum laude. Build solid foundations in blues techniques, theory, and improvisation. Lessons via helpwith.co or direct contact.',

        // New parallax section
        parallaxHeading: 'Gritty Texas Blues',
        parallaxSubheading: 'Meets the Heart of the Pacific Northwest',
        parallaxImages: [
          parallaxImage1 && {
            _key: 'parallax-1',
            ...parallaxImage1,
            position: 'left',
            offset: 0,
          },
          parallaxImage2 && {
            _key: 'parallax-2',
            ...parallaxImage2,
            position: 'right',
            offset: 100,
          },
        ].filter(Boolean),

        // Performance section
        performanceSectionHeading: 'Live Performances',
        ...(performanceImage && {performanceImage}),

        // Gallery section
        gallerySectionHeading: 'Gallery',
        gallerySectionSubheading: 'Moments from the stage and studio',
        galleryImages: [
          gallery1 && {_key: 'gallery-1', ...gallery1, width: 600, height: 400},
          gallery2 && {_key: 'gallery-2', ...gallery2, width: 500, height: 750},
          gallery3 && {_key: 'gallery-3', ...gallery3, width: 700, height: 500},
          gallery4 && {_key: 'gallery-4', ...gallery4, width: 550, height: 650},
          gallery5 && {_key: 'gallery-5', ...gallery5, width: 650, height: 550},
          gallery6 && {_key: 'gallery-6', ...gallery6, width: 600, height: 800},
        ].filter(Boolean),

        upcomingShowsHeading: 'Upcoming Shows',
      })
      .commit()

    console.log('✅ Home page populated with all content\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // SHOWS PAGE - Complete population
    // ========================================================================
    console.log('📅 SHOWS PAGE - Uploading images and creating content...\n')

    const showsHeroImage = await uploadImage(
      'images/gallery/orpheum-performance.jpg',
      'Live performance'
    )

    const perf1 = await uploadImage('images/performance/orpheum-main.jpg', 'Orpheum Theatre performance')
    const perf2 = await uploadImage('images/performance/waltz-brewing-promo.jpg', 'Waltz Brewing show')
    const perf3 = await uploadImage('images/gallery/hero-stage-compressed.jpg', 'Stage shot')
    const perf4 = await uploadImage('images/hero/guitar-red.jpg', 'Guitar close-up')
    const perf5 = await uploadImage('images/portraits/guild-shirt.jpg', 'With Guild guitar')
    const perf6 = await uploadImage('images/portraits/traced-portrait.png', 'Performance portrait')

    await client.createOrReplace({
      _id: 'showsPage',
      _type: 'showsPage',
      heroHeading: 'Live Shows',
      heroSubheading: 'Catch authentic blues performances across Portland and the Pacific Northwest. From intimate clubs to festival stages, bringing Texas-style blues with heart.',
      ...(showsHeroImage && {heroImage: showsHeroImage}),

      performanceGalleryHeading: 'Live Performances',
      performanceGallerySubheading: 'Moments from the stage',
      performanceImages: [
        perf1 && {_key: 'perf-1', ...perf1, caption: 'Orpheum Theatre'},
        perf2 && {_key: 'perf-2', ...perf2, caption: 'Waltz Brewing'},
        perf3 && {_key: 'perf-3', ...perf3, caption: 'Stage presence'},
        perf4 && {_key: 'perf-4', ...perf4, caption: 'Guitar work'},
        perf5 && {_key: 'perf-5', ...perf5, caption: 'Guild guitar'},
        perf6 && {_key: 'perf-6', ...perf6, caption: 'In performance'},
      ].filter(Boolean),

      upcomingShowsHeading: 'Upcoming Shows',
      emptyStateHeading: 'No upcoming shows scheduled',
      emptyStateText: 'Check back soon for new performance dates, or follow on social media for announcements.',
    })

    console.log('✅ Shows page populated with all content\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // LESSONS PAGE - Images
    // ========================================================================
    console.log('📚 LESSONS PAGE - Uploading images...\n')

    const lessonsHeroImage = await uploadImage(
      'images/gallery/guitar-portrait.jpg',
      'Guitar instruction'
    )
    const philosophyImage = await uploadImage(
      'images/portraits/guild-shirt.jpg',
      'Teaching philosophy'
    )
    const teachingImage = await uploadImage(
      'images/hero/guitar-red.jpg',
      'Guitar technique'
    )
    const lessonsPerformanceImage = await uploadImage(
      'images/performance/orpheum-main.jpg',
      'Live performance'
    )

    await client
      .patch('lessonsPage')
      .set({
        ...(lessonsHeroImage && {heroImage: lessonsHeroImage}),
        ...(philosophyImage && {philosophyImage}),
        ...(teachingImage && {teachingImage}),
        ...(lessonsPerformanceImage && {performanceImage: lessonsPerformanceImage}),
        learningItemsHeading: "What You'll Learn",
      })
      .commit()

    console.log('✅ Lessons page images uploaded\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // CONTACT PAGE - Images and headings
    // ========================================================================
    console.log('📧 CONTACT PAGE - Uploading images and headings...\n')

    const contactHeroImage = await uploadImage(
      'images/gallery/hero-stage-compressed.jpg',
      'Contact Kivett Bednar'
    )
    const portraitImage = await uploadImage(
      'images/performance/waltz-brewing-promo.jpg',
      'Kivett Bednar portrait'
    )

    const portrait1 = await uploadImage('images/portraits/guild-shirt.jpg', 'With Guild guitar')
    const portrait2 = await uploadImage('images/portraits/traced-portrait.png', 'Artistic portrait')
    const portrait3 = await uploadImage('images/performance/orpheum-main.jpg', 'Live performance')
    const portrait4 = await uploadImage('images/hero/guitar-red.jpg', 'Guitar detail')

    await client
      .patch('contactPage')
      .set({
        ...(contactHeroImage && {heroImage: contactHeroImage}),
        ...(portraitImage && {portraitImage}),
        portraitGallery: [
          portrait1 && {_key: 'portrait-1', ...portrait1},
          portrait2 && {_key: 'portrait-2', ...portrait2},
          portrait3 && {_key: 'portrait-3', ...portrait3},
          portrait4 && {_key: 'portrait-4', ...portrait4},
        ].filter(Boolean),
        formHeading: 'Send a Message',
        directContactHeading: 'Direct Contact',
        socialHeading: 'Follow Along',
        quickLinksHeading: 'Quick Links',
        aboutHeading: 'About Kivett',
      })
      .commit()

    console.log('✅ Contact page populated with all content\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // SETLIST PAGE - Images
    // ========================================================================
    console.log('🎵 SETLIST PAGE - Uploading images...\n')

    const setlistHeroImage = await uploadImage(
      'images/gallery/orpheum-performance.jpg',
      'Blues standards setlist'
    )
    const setlistPerformanceImage = await uploadImage(
      'images/performance/orpheum-main.jpg',
      'Live blues performance'
    )
    const guitarImage = await uploadImage(
      'images/portraits/guild-shirt.jpg',
      'Guild guitar'
    )

    await client
      .patch('setlistPage')
      .set({
        ...(setlistHeroImage && {heroImage: setlistHeroImage}),
        ...(setlistPerformanceImage && {performanceImage: setlistPerformanceImage}),
        ...(guitarImage && {guitarImage}),
      })
      .commit()

    console.log('✅ Setlist page images uploaded\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // SUMMARY
    // ========================================================================
    console.log('🎉 COMPLETE CONTENT POPULATION SUCCESSFUL!\n')
    console.log('All pages now have:')
    console.log('  ✓ All images uploaded to Sanity')
    console.log('  ✓ All text content populated')
    console.log('  ✓ All array fields configured')
    console.log('  ✓ Professional copy throughout\n')

    console.log('Pages populated:')
    console.log('  • Home page (parallax, gallery, performance sections)')
    console.log('  • Shows page (hero, performance gallery, empty states)')
    console.log('  • Lessons page (all section images)')
    console.log('  • Contact page (hero, portrait gallery, section headings)')
    console.log('  • Setlist page (all section images)\n')

    console.log('👉 Visit http://localhost:3000/studio to see all content in Sanity')
    console.log('👉 Visit http://localhost:3000 to see the fully CMS-driven site')

  } catch (error) {
    console.error('❌ Error populating content:', error)
    throw error
  }
}

populateAllContent()
  .then(() => {
    console.log('\n✨ Content population complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error)
    process.exit(1)
  })
