import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'pydiurzn',
  dataset: 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
})

async function createMerchPage() {
  console.log('📝 Creating Merch Page document...')

  const merchPage = {
    _id: 'merchPage',
    _type: 'merchPage',
    heroHeading: 'Merch',
    heroSubheading: 'Official Kivett Bednar gear and music',
    contentHeading: 'Shop',
    contentSubheading: 'Explore official merchandise',
    emptyStateHeading: 'Merch Store Opening Soon!',
    emptyStateText: 'T-shirts, vinyl records, and exclusive gear coming your way. Check back for updates or follow on social media for the launch announcement.',
    emptyStateButton1Text: 'Get Notified',
    emptyStateButton1Link: '/contact',
    emptyStateButton2Text: 'See Live Shows',
    emptyStateButton2Link: '/shows',
  }

  try {
    await client.createOrReplace(merchPage)
    console.log('✅ Merch Page created successfully')
  } catch (error) {
    console.error('❌ Error creating merch page:', error)
    throw error
  }
}

createMerchPage()
