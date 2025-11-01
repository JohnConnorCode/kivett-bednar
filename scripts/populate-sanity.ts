/**
 * Script to populate Sanity Studio with initial content
 * Run with: npx tsx scripts/populate-sanity.ts
 */

import {createClient} from '@sanity/client'
import fs from 'fs'
import path from 'path'

const client = createClient({
  projectId: 'pydiurzn',
  dataset: 'production',
  token: 'skAjk1YBqRvhtmr0k8tpaUzqtL3AODFzt5umtNllJmuohXMRTrCsbBNwZfJ9zhuY67scazn3gr1fPCNp22wkZC6siNA1xYJ7v3Ri0JOCPwYL3Bg0QteGFtui8hp3lpDwYaEn4UKLop0VSrVfe3KiK6g9D60B5RWY8NIwtuRqBxfMtiRb7VDn',
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function uploadImage(imagePath: string): Promise<any> {
  const imageBuffer = fs.readFileSync(imagePath)
  const filename = path.basename(imagePath)

  return client.assets.upload('image', imageBuffer, {
    filename,
  })
}

async function populateContent() {
  console.log('🚀 Starting Sanity content population...\n')

  try {
    // 1. SETTINGS
    console.log('📝 Creating Settings document...')
    const settings = await client.createOrReplace({
      _id: 'settings',
      _type: 'settings',
      title: 'Kivett Bednar | Blues Guitarist & Musician',
      description: [
        {
          _key: '9f1a629887fd',
          _type: 'block',
          children: [
            {
              _key: '4a58edd077880',
              _type: 'span',
              marks: [],
              text: 'Gritty Texas Blues meets the heart of the Pacific Northwest. Musician, amp maker, and artist out of Austin, TX and Portland, OR.',
            },
          ],
          markDefs: [],
          style: 'normal',
        },
      ],
      contactEmail: 'kivettbednar@gmail.com',
      bookingUrl: 'https://helpwith.co',
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
      ],
    })
    console.log('✅ Settings created\n')

    // 2. HOME PAGE
    console.log('📝 Creating Home Page document...')

    // Upload hero images
    console.log('  Uploading hero images...')
    const heroImages = [
      '/Users/johnconnor/Documents/GitHub/Kivett2/public/images/hero/background-1.png',
      '/Users/johnconnor/Documents/GitHub/Kivett2/public/images/hero/performance-orpheum.jpg',
      '/Users/johnconnor/Documents/GitHub/Kivett2/public/images/hero/guitar-red.jpg',
      '/Users/johnconnor/Documents/GitHub/Kivett2/public/images/hero/rae-gordon-album.jpg',
    ]

    const uploadedImages = []
    for (const imagePath of heroImages) {
      if (fs.existsSync(imagePath)) {
        const asset = await uploadImage(imagePath)
        uploadedImages.push(asset)
        console.log(`    ✅ Uploaded ${path.basename(imagePath)}`)
      }
    }

    const homePage = await client.createOrReplace({
      _id: 'homePage',
      _type: 'homePage',
      heroSlides: uploadedImages.map((asset, index) => ({
        _key: `slide-${index}`,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
        alt: [
          'Kivett Bednar performing blues guitar',
          'Live performance at the Orpheum',
          'Kivett with vintage Guild guitar',
          'Rae Gordon Band album artwork',
        ][index],
      })),
      heroHeading: 'Kivett Bednar',
      heroSubheading: 'Blues • Guitar • Portland',
      heroTagline: 'Gritty Texas Blues meets the heart of the Pacific Northwest',
      aboutHeading: 'Musician, Amp Maker, Artist',
      aboutText:
        'Out of Austin, TX and Portland, OR, Kivett Bednar brings authentic blues with raw emotion and technical mastery. Twenty years of experience teaching at Berklee College of Music, performing, and crafting custom amplifiers.',
      albumTitle: 'Land of the Living',
      albumYear: '2014',
      albumFormat: 'Limited Edition Red Vinyl',
      albumDescription:
        'A journey through classic blues standards and original compositions, recorded live with the raw energy and authenticity that defines Pacific Northwest blues.',
      albumFeatures: [
        'Classic blues interpretations',
        'Live studio recordings',
        'Limited red vinyl pressing',
      ],
      ctaLessonsHeading: 'Learn the Blues',
      ctaLessonsText:
        'Twenty years teaching experience. Berklee graduate. Learn guitar, blues, and music theory from a professional.',
    })
    console.log('✅ Home Page created\n')

    // 3. LESSONS PAGE
    console.log('📝 Creating Lessons Page document...')
    const lessonsPage = await client.createOrReplace({
      _id: 'lessonsPage',
      _type: 'lessonsPage',
      heroHeading: 'Guitar Lessons',
      heroSubheading: 'Learn blues, theory, and improvisation from a Berklee graduate',
      philosophyHeading: 'My Approach',
      philosophyText:
        "We'll start at the beginning to make sure that your musical foundations are solid, and then we'll take a tour through Western harmony.\n\nYou'll understand music from a perspective that transcends your instrument, giving you the tools to grow as a musician for the rest of your life.\n\n\"Music is a language. Let's learn to speak it fluently.\"",
      learningItems: [
        {
          _key: 'item-1',
          title: 'Blues Techniques',
          description:
            'Authentic phrasing, bending, vibrato, and the feel that makes blues come alive',
        },
        {
          _key: 'item-2',
          title: 'Music Theory',
          description: 'Western harmony fundamentals that work across all genres and instruments',
        },
        {
          _key: 'item-3',
          title: 'Improvisation',
          description: 'Develop your ear and learn to express yourself spontaneously through music',
        },
        {
          _key: 'item-4',
          title: 'Composition',
          description: 'Songwriting techniques and arranging skills to create your own music',
        },
        {
          _key: 'item-5',
          title: 'Ear Training',
          description: 'Recognize intervals, chords, and progressions by ear',
        },
        {
          _key: 'item-6',
          title: 'Musical Concepts',
          description: 'Instrument-agnostic understanding that transcends technical ability',
        },
      ],
      ctaBoxHeading: 'Ready to Start?',
      ctaBoxText: 'Schedule your first lesson and begin your musical journey.',
      credentials: 'Twenty years teaching experience • Magna cum laude',
    })
    console.log('✅ Lessons Page created\n')

    // 4. CONTACT PAGE
    console.log('📝 Creating Contact Page document...')
    const contactPage = await client.createOrReplace({
      _id: 'contactPage',
      _type: 'contactPage',
      heroHeading: 'Get in Touch',
      heroSubheading: 'Booking, lessons, collaborations, or just to say hello',
    })
    console.log('✅ Contact Page created\n')

    // 5. SETLIST PAGE
    console.log('📝 Creating Setlist Page document...')
    const setlistPage = await client.createOrReplace({
      _id: 'setlistPage',
      _type: 'setlistPage',
      heroHeading: 'Blues Setlist',
      introText:
        'A carefully curated collection of blues standards, from Chicago electric to Texas roadhouse. Each song arranged in its authentic key for maximum soul.',
      ctaHeading: 'Want to learn these classics?',
      ctaText:
        'Master authentic blues guitar with professional instruction. Learn technique, phrasing, and improvisation from a Berklee graduate.',
    })
    console.log('✅ Setlist Page created\n')

    // 6. SONGS
    console.log('📝 Creating Song documents...')
    const songs = [
      {title: 'Smokestack Lightning', key: 'C#'},
      {title: 'Champagne and Reefer', key: 'A'},
      {title: 'Shake For Me', key: 'G'},
      {title: 'I Just Want to Make Love to You', key: 'A'},
      {title: 'The Sky is Crying', key: 'C'},
      {title: 'Boom Boom', key: 'E'},
      {title: 'Stormy Monday', key: 'G'},
      {title: 'Sweet Home Chicago', key: 'E'},
      {title: 'Pride and Joy', key: 'E'},
      {title: 'Texas Flood', key: 'G'},
      {title: 'Crossroads', key: 'A'},
      {title: 'Born Under a Bad Sign', key: 'C#'},
      {title: 'Hideaway', key: 'E'},
      {title: 'Got My Mojo Working', key: 'A'},
      {title: 'Key to the Highway', key: 'A'},
      {title: 'Further on Up the Road', key: 'E'},
      {title: 'The Thrill is Gone', key: 'Bm'},
      {title: 'Red House', key: 'B'},
      {title: 'Killing Floor', key: 'A'},
      {title: 'Hoochie Coochie Man', key: 'A'},
      {title: 'Five Long Years', key: 'C'},
      {title: 'Help Me', key: 'D'},
      {title: 'Every Day I Have the Blues', key: 'F'},
      {title: "Messin' with the Kid", key: 'E'},
      {title: 'Reconsider Baby', key: 'C'},
      {title: 'Before You Accuse Me', key: 'E'},
      {title: 'Have You Ever Loved a Woman', key: 'Gm'},
    ]

    for (let i = 0; i < songs.length; i++) {
      const song = songs[i]
      await client.create({
        _type: 'song',
        title: song.title,
        key: song.key,
        order: i + 1,
      })
    }
    console.log(`✅ Created ${songs.length} songs\n`)

    console.log('🎉 All content populated successfully!')
    console.log('\n✨ Your site is now fully connected to Sanity CMS!')
    console.log('🚀 Deploying to production...\n')
  } catch (error) {
    console.error('❌ Error populating content:', error)
    throw error
  }
}

// Run the script
populateContent()
