'use client'

import {Calendar, Share2} from 'lucide-react'

interface EventActionsProps {
  title: string
  eventUrl: string
  venue: string
  startDate: string
  endDate: string
  description: string
  location: string
}

export function EventActions({
  title,
  eventUrl,
  venue,
  startDate,
  endDate,
  description,
  location,
}: EventActionsProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'Event',
          text: `Check out ${title || 'this event'} at ${venue || 'venue'}`,
          url: eventUrl,
        })
      } catch (err) {
        // User canceled share
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(eventUrl)
      alert('Link copied to clipboard!')
    }
  }

  const handleAddToCalendar = () => {
    const eventData = {
      title: title || 'Event',
      location: location || venue || 'TBD',
      startDate,
      endDate,
      description: description || title || 'Event',
    }

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Kivett Bednar//Events//EN
BEGIN:VEVENT
UID:${eventData.title.replace(/\s+/g, '-')}-${Date.now()}@kivettbednar.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${eventData.title}
LOCATION:${eventData.location}
DESCRIPTION:${eventData.description}
DTSTART:${new Date(eventData.startDate).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${new Date(eventData.endDate).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
END:VEVENT
END:VCALENDAR`
    const blob = new Blob([icsContent], {type: 'text/calendar'})
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${(title || 'event').replace(/\s+/g, '-')}.ics`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={handleShare}
        className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-background hover:bg-accent-primary/10 border border-border hover:border-accent-primary text-text-secondary hover:text-accent-primary rounded transition-all"
        aria-label="Share event"
      >
        <Share2 className="w-4 h-4" />
        <span className="text-xs font-medium uppercase tracking-wide hidden sm:inline">Share</span>
      </button>
      <button
        onClick={handleAddToCalendar}
        className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-background hover:bg-accent-primary/10 border border-border hover:border-accent-primary text-text-secondary hover:text-accent-primary rounded transition-all"
        aria-label="Add to calendar"
      >
        <Calendar className="w-4 h-4" />
        <span className="text-xs font-medium uppercase tracking-wide hidden sm:inline">Calendar</span>
      </button>
    </div>
  )
}
