'use client'

import Image from 'next/image'
import {format} from 'date-fns'
import {formatInTimeZone} from 'date-fns-tz'
import {urlFor} from '@/lib/image-positioning'
import {useState, useEffect} from 'react'
import {getObjectPosition, type SanityImageWithPositioning} from '@/lib/image-positioning'

type Event = {
  _id: string
  title: string
  startDateTime: string
  timezone: string
  venue: string
  city: string
  state?: string
  ticketUrl?: string
  coverImage?: SanityImageWithPositioning & {
    alt?: string
  }
  isCanceled?: boolean
  isSoldOut?: boolean
}

export function EventCard({event}: {event: Event}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
    <div className="group relative border-2 border-vintage-500/20 rounded-lg overflow-hidden hover:shadow-2xl hover:border-vintage-500/40 transition-all hover:-translate-y-2 duration-300 bg-bone">
      {/* Vintage paper texture on card */}
      <div className="absolute inset-0 vintage-paper opacity-30 pointer-events-none" />

      {event.coverImage?.asset && (
        <div className="relative aspect-video overflow-hidden">
          {/* Vintage grain overlay on image */}
          <div className="absolute inset-0 z-10 pointer-events-none opacity-15 mix-blend-overlay vintage-grain" />

          <Image
            src={urlFor(event.coverImage.asset).width(600).height(400).url()}
            alt={event.coverImage.alt || event.title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-105"
            style={{
              objectPosition: getObjectPosition(event.coverImage, isMobile)
            }}
          />

          {/* Vintage overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 via-transparent to-vintage-500/5" />

          {event.isCanceled && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
              <span className="text-white text-2xl font-bold tracking-wide" style={{fontFamily: 'var(--font-heading)'}}>CANCELED</span>
            </div>
          )}
          {event.isSoldOut && !event.isCanceled && (
            <div className="absolute top-4 right-4 bg-vintage-500 text-white px-4 py-2 rounded-md text-sm font-bold tracking-wide shadow-lg z-20" style={{fontFamily: 'var(--font-heading)'}}>
              SOLD OUT
            </div>
          )}
        </div>
      )}
      <div className="relative p-6 bg-gradient-to-b from-bone to-cream">
        <div className="text-sm font-semibold text-vintage-600 mb-2 tracking-wide uppercase" style={{fontFamily: 'var(--font-heading)'}}>
          {eventDate} • {eventTime}
        </div>
        <h3 className="text-2xl font-bold mb-3 text-charcoal-900 group-hover:text-vintage-600 transition-colors" style={{fontFamily: 'var(--font-heading)'}}>
          {event.title}
        </h3>
        <div className="text-charcoal-900/70 mb-4">
          <p className="font-semibold text-charcoal-900">{event.venue}</p>
          <p className="text-sm">{event.city}{event.state && `, ${event.state}`}</p>
        </div>
        {event.ticketUrl && !event.isCanceled && (
          <a
            href={event.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-vintage-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-vintage-600 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
            style={{fontFamily: 'var(--font-heading)'}}
          >
            {event.isSoldOut ? 'Join Waitlist →' : 'Get Tickets →'}
          </a>
        )}
      </div>

      {/* Vintage border accent - appears on hover */}
      <div className="absolute inset-0 border-2 border-vintage-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-lg pointer-events-none" />
    </div>
  )
}
