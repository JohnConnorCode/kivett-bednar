import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Lessons | Kivett Bednar',
  description: 'Guitar and blues music lessons',
}

export default function LessonsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Lessons</h1>
      <p>Teaching information coming soon...</p>
    </div>
  )
}
