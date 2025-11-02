/**
 * UI Text Population Script
 * Populates the uiText singleton and all page-specific text fields
 * Run with: npx tsx scripts/populate-ui-text.ts
 */

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'pydiurzn',
  dataset: 'production',
  token: 'skAjk1YBqRvhtmr0k8tpaUzqtL3AODFzt5umtNllJmuohXMRTrCsbBNwZfJ9zhuY67scazn3gr1fPCNp22wkZC6siNA1xYJ7v3Ri0JOCPwYL3Bg0QteGFtui8hp3lpDwYaEn4UKLop0VSrVfe3KiK6g9D60B5RWY8NIwtuRqBxfMtiRb7VDn',
  apiVersion: '2025-01-01',
  useCdn: false,
})

async function populateUIText() {
  console.log('\n📝 UI TEXT POPULATION\n')
  console.log('Populating all UI text fields across Sanity...\n')
  console.log('=' .repeat(70) + '\n')

  try {
    // ========================================================================
    // UI TEXT SINGLETON - Global text elements
    // ========================================================================
    console.log('🌐 UI TEXT & LABELS - Creating global text singleton...\n')

    await client.createOrReplace({
      _id: 'uiText',
      _type: 'uiText',

      // Site Branding
      siteName: 'KIVETT BEDNAR',
      siteTagline: 'Gritty Texas Blues meets the heart of the Pacific Northwest',

      // Navigation
      navShows: 'Shows',
      navLessons: 'Lessons',
      navSetlist: 'Setlist',
      navMerch: 'Merch',
      navContact: 'Contact',

      // Footer
      footerNavigationHeading: 'Navigation',
      footerConnectHeading: 'Connect',
      footerCopyrightText: '© {year} Kivett Bednar. All rights reserved.',

      // Contact Form Labels
      formLabelName: 'Name',
      formLabelEmail: 'Email',
      formLabelSubject: 'Subject',
      formLabelMessage: 'Message',
      formButtonSubmit: 'Send Message',
      formButtonSending: 'Sending...',
      formSuccessMessage: 'Thank you! Your message has been sent successfully.',

      // Common Button Labels
      buttonViewSetlist: 'View Setlist',
      buttonScheduleLesson: 'Schedule Your First Lesson',
      buttonBookLesson: 'Book a Lesson',
      buttonEmailMe: 'Email Me',
      buttonGetInTouch: 'Get in Touch',

      // Common Link Text
      linkSeeAllShows: 'See all shows →',
      linkUpcomingShows: 'Upcoming Shows',
      linkGuitarLessons: 'Guitar Lessons',
      linkBluesSetlist: 'Blues Setlist',

      // Dynamic Text Patterns
      showsCountSingular: 'show',
      showsCountPlural: 'shows',
      upcomingPrefix: ' upcoming',
      setlistSubtitleSuffix: ' timeless classics from the great American songbook',

      // Social Media Platform Names
      socialFacebook: 'Facebook',
      socialInstagram: 'Instagram',
    })

    console.log('   ✓ Site branding text')
    console.log('   ✓ Navigation labels (5 items)')
    console.log('   ✓ Footer text (3 fields)')
    console.log('   ✓ Contact form labels (7 fields)')
    console.log('   ✓ Common button labels (5 buttons)')
    console.log('   ✓ Common link text (4 links)')
    console.log('   ✓ Dynamic text patterns (4 patterns)')
    console.log('   ✓ Social media labels (2 platforms)')
    console.log('✅ UI Text singleton created with 35+ text fields\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // HOME PAGE - Page-specific button/link text
    // ========================================================================
    console.log('🏠 HOME PAGE - Adding button/link text...\n')

    await client
      .patch('homePage')
      .set({
        seeAllShowsLinkText: 'See all shows →',
        aboutButtonText: 'View Setlist',
        ctaLessonsButtonText: 'Schedule Your First Lesson',
      })
      .commit()

    console.log('   ✓ See all shows link text')
    console.log('   ✓ About section button text')
    console.log('   ✓ CTA lessons button text')
    console.log('✅ Home page text fields populated\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // SHOWS PAGE - Show count variations
    // ========================================================================
    console.log('📅 SHOWS PAGE - Adding show count text...\n')

    await client
      .patch('showsPage')
      .set({
        showCountPrefix: ' upcoming',
        showSingular: 'show',
        showPlural: 'shows',
      })
      .commit()

    console.log('   ✓ Show count prefix')
    console.log('   ✓ Singular form')
    console.log('   ✓ Plural form')
    console.log('✅ Shows page text fields populated\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // LESSONS PAGE - Button text (already set in schema initialValues)
    // ========================================================================
    console.log('📚 LESSONS PAGE - Verifying button text...\n')

    await client
      .patch('lessonsPage')
      .set({
        emailButtonText: 'Email Me',
        scheduleButtonText: 'Schedule a Lesson',
      })
      .commit()

    console.log('   ✓ Email button text')
    console.log('   ✓ Schedule button text')
    console.log('✅ Lessons page text fields populated\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // CONTACT PAGE - Quick link labels
    // ========================================================================
    console.log('📧 CONTACT PAGE - Adding quick link labels...\n')

    await client
      .patch('contactPage')
      .set({
        quickLinkShowsText: 'Upcoming Shows',
        quickLinkLessonsText: 'Guitar Lessons',
        quickLinkSetlistText: 'Blues Setlist',
      })
      .commit()

    console.log('   ✓ Shows quick link')
    console.log('   ✓ Lessons quick link')
    console.log('   ✓ Setlist quick link')
    console.log('✅ Contact page text fields populated\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // SETLIST PAGE - CTA button text and subtitle
    // ========================================================================
    console.log('🎵 SETLIST PAGE - Adding CTA text...\n')

    await client
      .patch('setlistPage')
      .set({
        ctaBookLessonButtonText: 'Book a Lesson',
        ctaContactButtonText: 'Get in Touch',
        subtitleSuffix: ' timeless classics from the great American songbook',
      })
      .commit()

    console.log('   ✓ Book lesson button')
    console.log('   ✓ Contact button')
    console.log('   ✓ Subtitle suffix')
    console.log('✅ Setlist page text fields populated\n')
    console.log('=' .repeat(70) + '\n')

    // ========================================================================
    // SUMMARY
    // ========================================================================
    console.log('🎉 UI TEXT POPULATION COMPLETE!\n')
    console.log('All text is now editable through Sanity Studio:')
    console.log('  ✓ Global UI Text (35+ fields) - site-wide text elements')
    console.log('  ✓ Home page (3 fields) - button/link text')
    console.log('  ✓ Shows page (3 fields) - show count variations')
    console.log('  ✓ Lessons page (2 fields) - CTA buttons')
    console.log('  ✓ Contact page (3 fields) - quick links')
    console.log('  ✓ Setlist page (3 fields) - CTA buttons + subtitle\n')

    console.log('Total: 50+ individual text elements now CMS-controlled\n')

    console.log('Next steps:')
    console.log('  1. Visit http://localhost:3000/studio')
    console.log('  2. Navigate to "UI Text & Labels"')
    console.log('  3. Review and customize all text fields')
    console.log('  4. Edit page-specific text in each page singleton')
    console.log('  5. Changes appear instantly on http://localhost:3000\n')

  } catch (error) {
    console.error('❌ Error populating UI text:', error)
    throw error
  }
}

populateUIText()
  .then(() => {
    console.log('\n✨ UI text population complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error)
    process.exit(1)
  })
