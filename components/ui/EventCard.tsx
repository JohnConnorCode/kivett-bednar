import Image from 'next/image'
import {format} from 'date-fns'
import {formatInTimeZone} from 'date-fns-tz'
import {urlFor} from '@/sanity/lib/image'

type Event = {
  _id: string
  title: string
  startDateTime: string
  timezone: string
  venue: string
  city: string
  state?: string
  ticketUrl?: string
  coverImage?: {
    asset: any
    alt?: string
  }
  isCanceled?: boolean
  isSoldOut?: boolean
}

export function EventCard({event}: {event: Event}) {
  const eventDate = formatInTimeZone(
    new Date(event.startDateTime),
    event.timezone,
    'MMM d, yyyy'
  )
  const eventTime = formatInTimeZone(
    new Date(event.startDateTime),
    event.timezone,
    'h:mm a'
  )

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 duration-200">
      {event.coverImage?.asset && (
        <div className="relative aspect-video">
          <Image
            src={urlFor(event.coverImage.asset).width(600).height(400).url()}
            alt={event.coverImage.alt || event.title}
            fill
            className="object-cover"
          />
          {event.isCanceled && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">CANCELED</span>
            </div>
          )}
          {event.isSoldOut && !event.isCanceled && (
            <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold">
              SOLD OUT
            </div>
          )}
        </div>
      )}
      <div className="p-6">
        <div className="text-sm text-muted-foreground mb-2">
          {eventDate} • {eventTime}
        </div>
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <div className="text-muted-foreground mb-4">
          <p className="font-medium">{event.venue}</p>
          <p>{event.city}{event.state && `, ${event.state}`}</p>
        </div>
        {event.ticketUrl && !event.isCanceled && (
          <a
            href={event.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors"
          >
            {event.isSoldOut ? 'Waitlist' : 'Get Tickets'}
          </a>
        )}
      </div>
    </div>
  )
}
