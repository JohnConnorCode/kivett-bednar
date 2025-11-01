'use client'

import {motion} from 'framer-motion'
import {staggerContainer} from '@/lib/animations'
import {EventCard} from './EventCard'

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

export function ShowsList({events}: {events: Event[]}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-8"
    >
      {events.map((event: any) => (
        <EventCard key={event._id} event={event} />
      ))}
    </motion.div>
  )
}
