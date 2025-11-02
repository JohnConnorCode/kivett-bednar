/**
 * Professional Content Update - Authentic Blues Voice
 * Updates all Sanity content with professionally crafted copy
 * Based on research from kivettbednar.com
 * Run with: npx tsx scripts/update-professional-content.ts
 */

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'pydiurzn',
  dataset: 'production',
  token: 'skAjk1YBqRvhtmr0k8tpaUzqtL3AODFzt5umtNllJmuohXMRTrCsbBNwZfJ9zhuY67scazn3gr1fPCNp22wkZC6siNA1xYJ7v3Ri0JOCPwYL3Bg0QteGFtui8hp3lpDwYaEn4UKLop0VSrVfe3KiK6g9D60B5RWY8NIwtuRqBxfMtiRb7VDn',
  apiVersion: '2025-01-01',
  useCdn: false,
})

async function updateProfessionalContent() {
  console.log('✨ PROFESSIONAL CONTENT UPDATE\n')
  console.log('Crafting authentic blues voice across all pages...\n')
  console.log('=' .repeat(70) + '\n')

  try {
    // ========================================================================
    // HOME PAGE - Complete content rewrite
    // ========================================================================
    console.log('🏠 HOME PAGE - Authentic Texas/Portland blues voice...\n')

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
        ctaLessonsText: 'Twenty years teaching experience. Berklee College of Music, magna cum laude. Build solid foundations in blues techniques, theory, and improvisation. Lessons via helpwith.co or direct contact.',
      })
      .commit()

    console.log('   ✓ Hero: "Gritty Texas Blues meets the heart of the Pacific Northwest"')
    console.log('   ✓ About: Austin origins, International Blues Competition placement')
    console.log('   ✓ Album: Authentic description of collaboration and sound')
    console.log('   ✓ CTA: Credibility-focused call to action')
    console.log('✅ Home page updated with professional copy\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // LESSONS PAGE - Teaching philosophy and credentials
    // ========================================================================
    console.log('📚 LESSONS PAGE - Educational credibility and approach...\n')

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
        ctaBoxText: `Contact me directly at kivettbednar@gmail.com or through my profile on helpwith.co. Let's build your blues foundation.`,

        credentials: 'Twenty years teaching experience • Berklee College of Music, magna cum laude • International Blues Competition placement',
      })
      .commit()

    console.log('   ✓ Hero: Working musician and educator positioning')
    console.log('   ✓ Philosophy: Authentic teaching approach from original site')
    console.log('   ✓ Learning items: Specific, credible descriptions')
    console.log('   ✓ Credentials: Achievement-focused without bragging')
    console.log('   ✓ CTA: Direct, personal contact invitation')
    console.log('✅ Lessons page updated with educational credibility\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // CONTACT PAGE - Accessible and personal
    // ========================================================================
    console.log('📧 CONTACT PAGE - Personal accessibility...\n')

    await client
      .patch('contactPage')
      .set({
        heroHeading: 'Get in Touch',
        heroSubheading: '(I will really get back to you.)\n\nBooking inquiries, lesson scheduling, collaborations, or just to say hello.',
      })
      .commit()

    console.log('   ✓ Signature parenthetical from original site')
    console.log('   ✓ Friendly, accessible tone')
    console.log('   ✓ Clear use cases for contact')
    console.log('✅ Contact page updated with personal touch\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // SETLIST PAGE - Blues authenticity
    // ========================================================================
    console.log('🎵 SETLIST PAGE - Blues standards expertise...\n')

    await client
      .patch('setlistPage')
      .set({
        heroHeading: 'Blues Standards & Originals',
        introText: 'A carefully curated collection from Chicago electric to Texas roadhouse. Each song arranged in its authentic key for maximum soul. These are the classics that shaped the blues.',

        ctaHeading: 'Want to Master These Classics?',
        ctaText: 'Learn authentic blues guitar with professional instruction. From foundational techniques to advanced improvisation—build your blues vocabulary with a Berklee graduate and working musician.',
      })
      .commit()

    console.log('   ✓ Authentic blues language (Chicago electric, Texas roadhouse)')
    console.log('   ✓ Emphasis on tradition and authenticity')
    console.log('   ✓ Clear connection to lessons offering')
    console.log('✅ Setlist page updated with blues credibility\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // SETTINGS - Enhanced social links
    // ========================================================================
    console.log('⚙️  SETTINGS - Complete social presence...\n')

    await client
      .patch('settings')
      .set({
        socialLinks: [
          {
            _key: 'facebook',
            platform: 'facebook',
            url: 'https://www.facebook.com/kivettbednar',
          },
          {
            _key: 'instagram',
            platform: 'instagram',
            url: 'https://www.instagram.com/kivettbednar',
          },
          {
            _key: 'bandcamp',
            platform: 'other',
            url: 'https://kivettbednar.bandcamp.com',
          },
        ],
      })
      .commit()

    console.log('   ✓ Facebook link')
    console.log('   ✓ Instagram link')
    console.log('   ✓ Bandcamp link added')
    console.log('✅ Settings updated with complete social presence\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // NAVIGATION - Proper menu structure
    // ========================================================================
    console.log('🧭 NAVIGATION - Menu structure...\n')

    await client.createOrReplace({
      _id: 'navigation',
      _type: 'navigation',
      main: [
        {
          _key: 'nav-home',
          _type: 'navItem',
          title: 'Home',
          href: '/',
        },
        {
          _key: 'nav-shows',
          _type: 'navItem',
          title: 'Shows',
          href: '/shows',
        },
        {
          _key: 'nav-lessons',
          _type: 'navItem',
          title: 'Lessons',
          href: '/lessons',
        },
        {
          _key: 'nav-setlist',
          _type: 'navItem',
          title: 'Setlist',
          href: '/setlist',
        },
        {
          _key: 'nav-contact',
          _type: 'navItem',
          title: 'Contact',
          href: '/contact',
        },
      ],
      footer: [
        {
          _key: 'footer-lessons',
          _type: 'navItem',
          title: 'Book a Lesson',
          href: '/lessons',
        },
        {
          _key: 'footer-setlist',
          _type: 'navItem',
          title: 'View Setlist',
          href: '/setlist',
        },
        {
          _key: 'footer-contact',
          _type: 'navItem',
          title: 'Contact',
          href: '/contact',
        },
      ],
    })

    console.log('   ✓ Main navigation: Home, Shows, Lessons, Setlist, Contact')
    console.log('   ✓ Footer navigation: Book a Lesson, View Setlist, Contact')
    console.log('✅ Navigation structure created\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // SAMPLE EVENTS - Authentic show listings
    // ========================================================================
    console.log('📅 SAMPLE EVENTS - Venue-appreciative show descriptions...\n')

    // Event 1: The Blue Diamond
    const event1 = await client.create({
      _type: 'event',
      title: 'Kivett Bednar Band at The Blue Diamond',
      startDateTime: new Date('2025-12-12T19:00:00-08:00').toISOString(),
      endDateTime: new Date('2025-12-12T22:00:00-08:00').toISOString(),
      timezone: 'America/Los_Angeles',
      venue: 'The Blue Diamond',
      address: '2016 NE Sandy Blvd',
      city: 'Portland',
      state: 'OR',
      country: 'US',
      ticketUrl: 'https://www.thebluediamondpdx.com',
      description: 'Home club with the best chef in Portland. KBB is hosting the night—expect deep blues and maybe some special guests. The Blue Diamond has been a staple of the Portland music scene for years.',
      isCanceled: false,
      isSoldOut: false,
    })

    console.log('   ✓ The Blue Diamond - "Home club" with authentic description')

    // Event 2: Waltz Brewing
    const event2 = await client.create({
      _type: 'event',
      title: 'Blues at Waltz Brewing',
      startDateTime: new Date('2025-12-08T19:00:00-08:00').toISOString(),
      endDateTime: new Date('2025-12-08T22:00:00-08:00').toISOString(),
      timezone: 'America/Los_Angeles',
      venue: 'Waltz Brewing',
      address: '1900 A St',
      city: 'Forest Grove',
      state: 'OR',
      country: 'US',
      description: 'The trio is out at Waltz Brewing in Forest Grove for the first time. Incredible beers at this little club. Good food too! Free show—just come enjoy some authentic blues.',
      isCanceled: false,
      isSoldOut: false,
    })

    console.log('   ✓ Waltz Brewing - Venue appreciation, food mention')

    // Event 3: Portland venue TBD
    const event3 = await client.create({
      _type: 'event',
      title: 'Kivett Bednar Trio - Portland Show',
      startDateTime: new Date('2025-12-29T19:00:00-08:00').toISOString(),
      endDateTime: new Date('2025-12-29T22:00:00-08:00').toISOString(),
      timezone: 'America/Los_Angeles',
      venue: 'Portland Music Venue',
      city: 'Portland',
      state: 'OR',
      country: 'US',
      description: 'Gritty Texas blues with Edwin Coleman III on drums and Jeff Langston on bass. Standards, originals, and the kind of blues that makes you feel it.',
      isCanceled: false,
      isSoldOut: false,
    })

    console.log('   ✓ Generic Portland show - Band members mentioned')
    console.log('✅ Created 3 sample events with authentic voice\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // SUMMARY
    // ========================================================================
    console.log('🎉 PROFESSIONAL CONTENT UPDATE COMPLETE!\n')
    console.log('All pages now feature:')
    console.log('  ✓ Authentic "bluesy minimalism" voice')
    console.log('  ✓ Texas/Portland geographic identity')
    console.log('  ✓ Achievement-focused without bragging')
    console.log('  ✓ Community and venue appreciation')
    console.log('  ✓ Professional credibility (Berklee, competition placement)')
    console.log('  ✓ Accessible, personal tone')
    console.log('  ✓ "Say less, mean more, prove everything"\n')

    console.log('Content updated:')
    console.log('  • Home page (hero, about, album, CTA)')
    console.log('  • Lessons page (philosophy, learning items, credentials)')
    console.log('  • Contact page (personal touch)')
    console.log('  • Setlist page (blues authenticity)')
    console.log('  • Settings (enhanced social links)')
    console.log('  • Navigation (main + footer menus)')
    console.log('  • Events (3 sample shows)\n')

    console.log('👉 Visit http://localhost:3000/studio to see updated content in Sanity')
    console.log('👉 Visit http://localhost:3000 to see it live on the site')

  } catch (error) {
    console.error('❌ Error updating content:', error)
    throw error
  }
}

updateProfessionalContent()
  .then(() => {
    console.log('\n✨ Content update complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error)
    process.exit(1)
  })
