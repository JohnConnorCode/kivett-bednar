import {Metadata} from 'next'
import {notFound} from 'next/navigation'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  return {
    title: `Product | Kivett Bednar`,
    description: 'Product details',
  }
}

export default async function ProductPage({params}: Props) {
  const {slug} = await params

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Product: {slug}</h1>
      <p>Product details coming soon...</p>
    </div>
  )
}
