import {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {upcomingEventsQuery} from '@/sanity/lib/queries'
import {EventCard} from '@/components/ui/EventCard'

export const metadata: Metadata = {
  title: 'Shows | Kivett Bednar',
  description: 'Upcoming concerts and performances',
}

export default async function ShowsPage() {
  const {data: events} = await sanityFetch({
    query: upcomingEventsQuery,
    params: {
      now: new Date().toISOString(),
      limit: 50,
    },
  })

  // Generate JSON-LD structured data for events
  const eventsJsonLd = events?.map((event: any) => ({
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: event.title,
    startDate: event.startDateTime,
    location: {
      '@type': 'Place',
      name: event.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.city,
      },
    },
    performer: {
      '@type': 'MusicGroup',
      name: 'Kivett Bednar',
    },
    offers: event.ticketUrl
      ? {
          '@type': 'Offer',
          url: event.ticketUrl,
          availability: event.isSoldOut
            ? 'https://schema.org/SoldOut'
            : 'https://schema.org/InStock',
        }
      : undefined,
    eventStatus: event.isCanceled
      ? 'https://schema.org/EventCancelled'
      : 'https://schema.org/EventScheduled',
  }))

  return (
    <>
      {eventsJsonLd && eventsJsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(eventsJsonLd)}}
        />
      )}

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-midnight-500 via-charcoal-900 to-midnight-500">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-bone">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            Live Shows
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed text-bone/90">
            Catch authentic blues performances across the Pacific Northwest
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" className="w-full h-12 text-bone">
            <path d="M0,0 Q300,40 600,20 T1200,0 L1200,120 L0,120 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Shows Content */}
      <div className="bg-bone py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {events && events.length > 0 ? (
              <>
                <div className="mb-8">
                  <p className="text-charcoal-900/60 text-lg">
                    {events.length} upcoming {events.length === 1 ? 'show' : 'shows'}
                  </p>
                </div>
                <div className="grid gap-8">
                  {events.map((event: any) => (
                    <EventCard key={event._id} event={event} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16 border-2 border-dashed border-charcoal-900/20 rounded-lg bg-bone">
                <div className="text-6xl mb-4">🎸</div>
                <p className="text-charcoal-900/80 text-2xl font-semibold mb-2">
                  No upcoming shows scheduled
                </p>
                <p className="text-charcoal-900/60 mt-2">
                  Check back soon for new dates! Follow on social media for announcements.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
