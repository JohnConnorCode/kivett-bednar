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

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Shows</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Catch me live at these upcoming performances
        </p>

        {events && events.length > 0 ? (
          <div className="grid gap-8">
            {events.map((event: any) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border rounded-lg bg-muted/20">
            <p className="text-muted-foreground text-lg">
              No upcoming shows scheduled at this time.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Check back soon for new dates!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
