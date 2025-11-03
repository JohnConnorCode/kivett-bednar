'use client'

import Image from 'next/image'
import Link from 'next/link'
import {format} from 'date-fns'
import {formatInTimeZone} from 'date-fns-tz'
import {urlFor} from '@/lib/image-positioning'
import {useState, useEffect} from 'react'
import {getObjectPosition, type SanityImageWithPositioning} from '@/lib/image-positioning'

type Event = {
  _id: string
  title: string
  slug?: string
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

  const eventLink = event.slug ? `/shows/${event.slug}` : null

  const cardContent = (
    <>
      {/* Image Section */}
      {event.coverImage?.asset && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={urlFor(event.coverImage.asset).width(600).height(400).url()}
            alt={event.coverImage.alt || event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            style={{
              objectPosition: getObjectPosition(event.coverImage, isMobile)
            }}
          />

          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Canceled overlay */}
          {event.isCanceled && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
              <span className="text-white text-3xl font-black tracking-wider uppercase">
                CANCELED
              </span>
            </div>
          )}

          {/* Sold Out badge */}
          {event.isSoldOut && !event.isCanceled && (
            <div className="absolute top-4 right-4 bg-accent-primary text-black px-4 py-2 text-sm font-bold tracking-wider uppercase z-20">
              SOLD OUT
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="relative p-6 bg-surface-elevated">
        {/* Date and Time */}
        <div className="text-sm font-bold text-accent-primary mb-3 tracking-wider uppercase">
          {eventDate} • {eventTime}
        </div>

        {/* Event Title */}
        <h3 className="text-2xl font-bold mb-3 text-text-primary group-hover:text-accent-primary transition-colors">
          {event.title}
        </h3>

        {/* Venue Info */}
        <div className="text-text-secondary mb-6">
          <p className="font-semibold text-text-primary">{event.venue}</p>
          <p className="text-sm">{event.city}{event.state && `, ${event.state}`}</p>
        </div>

        {/* View Details indicator */}
        {eventLink && !event.isCanceled && (
          <div className="inline-flex items-center gap-2 text-accent-primary font-semibold group-hover:gap-3 transition-all">
            <span>View Details</span>
            <span>→</span>
          </div>
        )}
      </div>
    </>
  )

  if (eventLink) {
    return (
      <article className="group relative border border-border overflow-hidden hover:shadow-2xl hover:border-accent-primary transition-all hover:-translate-y-1 duration-300 bg-surface">
        <Link href={eventLink} className="block">
          {cardContent}
        </Link>
      </article>
    )
  }

  return (
    <article className="group relative border border-border overflow-hidden hover:shadow-2xl hover:border-accent-primary transition-all hover:-translate-y-1 duration-300 bg-surface">
      {cardContent}
    </article>
  )
}
