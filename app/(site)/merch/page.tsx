import {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {merchPageQuery} from '@/sanity/lib/queries'
import {MerchPageContent} from './MerchPageContent'

export const metadata: Metadata = {
  title: 'Merch | Kivett Bednar',
  description: 'Official merchandise and music',
}

// Revalidate every 60 seconds (ISR)
export const revalidate = 60

export default async function MerchPage() {
  let merchPage = null

  try {
    merchPage = await sanityFetch({query: merchPageQuery}).then((r) => r.data)
  } catch (error) {
    console.warn('Failed to fetch merch page data, using fallback content:', error)
  }

  return <MerchPageContent merchPage={merchPage} />
}
