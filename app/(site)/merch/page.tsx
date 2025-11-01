import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Merch | Kivett Bednar',
  description: 'Official merchandise and apparel',
}

export default function MerchPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Merch</h1>
      <p>Products coming soon...</p>
    </div>
  )
}
