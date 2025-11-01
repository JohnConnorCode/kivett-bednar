import {Metadata} from 'next'
import {ModuleRenderer} from '@/components/modules/ModuleRenderer'
import {sanityFetch} from '@/sanity/lib/live'
import {pageBySlugQuery} from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Kivett Bednar | Blues Guitarist & Musician',
  description: 'Gritty Texas Blues meets the heart of the Pacific Northwest',
}

export default async function HomePage() {
  // Try to fetch a page with slug 'home', fallback to placeholder
  const {data: page} = await sanityFetch({
    query: pageBySlugQuery,
    params: {slug: 'home'},
  })

  if (page?.modules) {
    return <ModuleRenderer modules={page.modules} />
  }

  // Placeholder if no home page exists yet
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="text-6xl font-bold mb-6">Kivett Bednar</h1>
      <p className="text-2xl text-muted-foreground mb-8">
        Gritty Texas Blues meets the heart of the Pacific Northwest
      </p>
      <p className="text-muted-foreground">
        Create a page with slug &quot;home&quot; in Sanity Studio to customize this page.
      </p>
    </div>
  )
}
