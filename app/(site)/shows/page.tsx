import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Shows | Kivett Bednar',
  description: 'Upcoming concerts and performances',
}

export default function ShowsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Shows</h1>
      <p>Events coming soon...</p>
    </div>
  )
}
