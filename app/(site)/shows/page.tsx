import {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {upcomingEventsQuery} from '@/sanity/lib/queries'
import {EventCard} from '@/components/ui/EventCard'
import {AnimatedHero} from '@/components/ui/AnimatedHero'

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

      {/* Animated Hero with Spotlight Effect */}
      <AnimatedHero
        title="Live Shows"
        subtitle="Catch authentic blues performances across the Pacific Northwest"
        variant="shows"
      />

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
