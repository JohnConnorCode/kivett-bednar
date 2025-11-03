/**
 * RESTORE CONTENT - Restore to content from commit c392479
 * This restores all Sanity content to the state before the update-professional-content script
 * Run with: npx tsx scripts/restore-content.ts
 */

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'pydiurzn',
  dataset: 'production',
  token: 'skAjk1YBqRvhtmr0k8tpaUzqtL3AODFzt5umtNllJmuohXMRTrCsbBNwZfJ9zhuY67scazn3gr1fPCNp22wkZC6siNA1xYJ7v3Ri0JOCPwYL3Bg0QteGFtui8hp3lpDwYaEn4UKLop0VSrVfe3KiK6g9D60B5RWY8NIwtuRqBxfMtiRb7VDn',
  apiVersion: '2025-01-01',
  useCdn: false,
})

async function restoreContent() {
  console.log('🔄 RESTORING CONTENT TO PREVIOUS STATE\n')
  console.log('Restoring all pages to content from before reset...\n')
  console.log('=' .repeat(70) + '\n')

  try {
    // ========================================================================
    // HOME PAGE - Restore original content
    // ========================================================================
    console.log('🏠 HOME PAGE - Restoring original content...\n')

    await client
      .patch('homePage')
      .set({
        heroHeading: 'Kivett Bednar',
        heroSubheading: 'Blues Guitarist • Austin, TX • Portland, OR',
        heroTagline: 'Gritty Texas Blues meets the heart of the Pacific Northwest',

        aboutHeading: 'Musician, Amp Maker, Artist',
        aboutText: `Grew up in Austin's blues scene, sneaking into Antone's to hear the legends. Now based in Portland, bringing that same raw energy to the Pacific Northwest.

Third place out of 400 bands at the 2017 International Blues Competition in Memphis. Berklee College of Music, magna cum laude. Twenty years teaching experience.

Not just a musician—builds custom tube amps, creates visual art, and keeps the blues alive through teaching and performing.`,

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
        ctaLessonsText: 'Twenty years teaching experience. Berklee College of Music, magna cum laude. Build solid foundations in blues techniques, theory, and improvisation.',
        aboutButtonText: 'View Setlist',
      })
      .commit()

    console.log('✅ Home page content restored\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // LESSONS PAGE - Restore original content
    // ========================================================================
    console.log('📚 LESSONS PAGE - Restoring original content...\n')

    await client
      .patch('lessonsPage')
      .set({
        heroHeading: 'Guitar Lessons with Kivett Bednar',
        heroSubheading: 'Learn blues techniques, music theory, and improvisation from a working musician and Berklee graduate',

        philosophyHeading: 'Solid Foundations, Intentional Creation',
        philosophyText: `We start with foundational concepts and build through Western harmony. You'll develop a cross-instrumental understanding that transcends your specific instrument.

Solid musical foundations first. Then we explore blues phrasing, improvisation, composition, and the theory that connects it all.

The goal: intentionality in your artistic creation. Understanding why something works, not just how to play it.`,

        learningItems: [
          {
            _key: 'item-1',
            title: 'Blues Techniques',
            description: 'Authentic phrasing, bending, vibrato, and the feel that makes blues come alive. Learn from someone who grew up in the tradition.',
          },
          {
            _key: 'item-2',
            title: 'Music Theory',
            description: 'Western harmony fundamentals that work across all genres. Functional understanding, not just memorized rules.',
          },
          {
            _key: 'item-3',
            title: 'Improvisation',
            description: 'Build vocabulary, develop your ear, and learn to express yourself spontaneously. From simple blues licks to complex solos.',
          },
          {
            _key: 'item-4',
            title: 'Composition',
            description: 'Songwriting techniques and arranging skills. Create original material with intention and purpose.',
          },
          {
            _key: 'item-5',
            title: 'Ear Training',
            description: 'Recognize intervals, chords, and progressions by ear. Transcribe solos, internalize what you hear.',
          },
          {
            _key: 'item-6',
            title: 'Guitar Craft',
            description: 'Tone, touch, and technique. The physical aspects of playing that bring your musical ideas to life.',
          },
        ],

        ctaBoxHeading: 'Ready to Start Learning?',
        ctaBoxText: `Contact me directly at kivettbednar@gmail.com. Let's build your blues foundation.`,

        credentials: 'Twenty years teaching experience • Berklee College of Music, magna cum laude • International Blues Competition placement',
      })
      .commit()

    console.log('✅ Lessons page content restored\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // CONTACT PAGE - Restore original content
    // ========================================================================
    console.log('📧 CONTACT PAGE - Restoring original content...\n')

    await client
      .patch('contactPage')
      .set({
        heroHeading: 'Get in Touch',
        heroSubheading: '(I will really get back to you.)\n\nBooking inquiries, lesson scheduling, collaborations, or just to say hello.',
      })
      .commit()

    console.log('✅ Contact page content restored\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // SETLIST PAGE - Restore original content
    // ========================================================================
    console.log('🎵 SETLIST PAGE - Restoring original content...\n')

    await client
      .patch('setlistPage')
      .set({
        heroHeading: 'Blues Standards & Originals',
        introText: 'A carefully curated collection from Chicago electric to Texas roadhouse. Each song arranged in its authentic key for maximum soul. These are the classics that shaped the blues.',

        ctaHeading: 'Want to Master These Classics?',
        ctaText: 'Learn authentic blues guitar with professional instruction. From foundational techniques to advanced improvisation—build your blues vocabulary with a Berklee graduate and working musician.',
      })
      .commit()

    console.log('✅ Setlist page content restored\n')
    console.log('=' .repeat(70) + '\n')

    console.log('🎉 ALL CONTENT SUCCESSFULLY RESTORED!\n')
    console.log('Your site content has been restored to its previous state.\n')
    console.log('NOTE: Hero slides need to be restored manually in Sanity Studio.\n')

  } catch (error) {
    console.error('❌ Error restoring content:', error)
    throw error
  }
}

restoreContent()
