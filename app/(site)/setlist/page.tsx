import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Blues Set List | Kivett Bednar',
  description: 'A collection of classic blues songs',
}

export default function SetlistPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Blues Set List</h1>
      <p>Set list coming soon...</p>
    </div>
  )
}
