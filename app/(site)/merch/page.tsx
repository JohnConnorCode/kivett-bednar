import {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {merchPageQuery} from '@/sanity/lib/queries'
import {MerchPageContent} from './MerchPageContent'

export const metadata: Metadata = {
  title: 'Merch | Kivett Bednar',
  description: 'Official merchandise and music',
}

export default async function MerchPage() {
  const merchPage = await sanityFetch({query: merchPageQuery}).then((r) => r.data)

  return <MerchPageContent merchPage={merchPage} />
}
