import {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {client} from '@/sanity/lib/client'
import {sanityFetch} from '@/sanity/lib/live'
import {eventBySlugQuery, eventsSlugs} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'
import {PortableText} from '@portabletext/react'
import {formatInTimeZone} from 'date-fns-tz'
import {AnimatedSection} from '@/components/animations/AnimatedSection'
import {getObjectPosition} from '@/lib/image-positioning'
import {MapPin, Calendar, Clock, ExternalLink, Ticket} from 'lucide-react'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(eventsSlugs)
    // Query now returns slug if available, or _id as fallback
    return slugs.map((item: {slug: string}) => ({
      slug: item.slug,
    }))
  } catch (error) {
    console.warn('Failed to fetch event slugs for static generation:', error)
    // Return empty array to allow build to continue
    // Events will be generated on-demand instead
    return []
  }
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const event = await client.fetch(
    eventBySlugQuery,
    {slug},
    {next: {revalidate: 60}}
  )

  return {
    title: event?.title ? `${event.title} | Kivett Bednar` : 'Event | Kivett Bednar',
    description: event?.excerpt || 'Event details',
  }
}

export default async function EventPage({params}: Props) {
  const {slug} = await params
  const event = await sanityFetch({query: eventBySlugQuery, params: {slug}}).then((r) => r.data)

  if (!event) {
    notFound()
  }

  // Ensure required fields exist
  const startDateTime = event.startDateTime || new Date().toISOString()
  const timezone = event.timezone || 'America/Los_Angeles'

  const eventDate = formatInTimeZone(
    new Date(startDateTime),
    timezone,
    'EEEE, MMMM d, yyyy'
  )
  const eventTime = formatInTimeZone(
    new Date(startDateTime),
    timezone,
    'h:mm a zzz'
  )

  // Generate JSON-LD structured data for event
  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: event.title,
    startDate: startDateTime,
    endDate: event.endDateTime || startDateTime,
    location: {
      '@type': 'Place',
      name: event.venue,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.address || '',
        addressLocality: event.city,
        addressRegion: event.state || '',
        addressCountry: event.country,
      },
    },
    performer: {
      '@type': 'MusicGroup',
      name: 'Kivett Bednar',
    },
    offers: event.ticketUrl ? {
      '@type': 'Offer',
      url: event.ticketUrl,
      availability: event.isSoldOut
        ? 'https://schema.org/SoldOut'
        : 'https://schema.org/InStock',
    } : undefined,
    eventStatus: event.isCanceled
      ? 'https://schema.org/EventCancelled'
      : 'https://schema.org/EventScheduled',
  }

  // Determine hero image with fallback to default
  const heroImageDesktop = (event as any).heroImage?.asset?.url
    ? (event as any).heroImage
    : (event as any).coverImage?.asset?.url
    ? (event as any).coverImage
    : null

  const heroImageMobile = (event as any).heroImageMobile?.asset?.url
    ? (event as any).heroImageMobile
    : heroImageDesktop

  // Default hero image if none provided
  const defaultHeroImage = '/images/performance/stage-main.jpg'
  const hasHeroImage = heroImageDesktop?.asset?.url

  // Generate Google Maps link
  const venueAddress = `${event.venue}, ${event.address || ''}, ${event.city}, ${event.state || ''} ${event.country || ''}`
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueAddress)}`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(eventJsonLd)}}
      />

      <div className="min-h-screen">
        {/* Hero Section - Always show, use default if no image */}
        <div className="relative h-[60vh] md:h-[75vh] overflow-hidden bg-background">
          {/* Vintage grain overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none opacity-30 mix-blend-overlay vintage-grain" />

          {/* Desktop Image */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src={hasHeroImage ? urlFor(heroImageDesktop.asset).width(1920).height(1080).url() : defaultHeroImage}
              alt={hasHeroImage ? (heroImageDesktop.alt || event.title) : `${event.title} at ${event.venue}`}
              fill
              className="object-cover"
              sizes="100vw"
              style={{
                objectPosition: hasHeroImage ? getObjectPosition(heroImageDesktop, false) : 'center'
              }}
              priority
            />
          </div>

          {/* Mobile Image */}
          <div className="md:hidden absolute inset-0">
            <Image
              src={
                heroImageMobile?.asset?.url
                  ? urlFor(heroImageMobile.asset).width(800).height(1200).url()
                  : defaultHeroImage
              }
              alt={
                heroImageMobile?.asset?.url
                  ? (heroImageMobile.alt || event.title)
                  : `${event.title} at ${event.venue}`
              }
              fill
              className="object-cover"
              sizes="100vw"
              style={{
                objectPosition: heroImageMobile?.asset?.url
                  ? getObjectPosition(heroImageMobile, true)
                  : 'center'
              }}
              priority
            />
          </div>

          {/* Gradient Overlay - Enhanced for dramatic effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-black/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent z-10" />

          {/* Event Status Badges */}
          {event.isCanceled && (
            <div className="absolute top-8 right-8 z-20 bg-red-600 text-white px-6 py-3 rounded-lg text-xl font-bold tracking-wide shadow-2xl">
              CANCELED
            </div>
          )}
          {event.isSoldOut && !event.isCanceled && (
            <div className="absolute top-8 right-8 z-20 bg-accent-primary text-black px-6 py-3 rounded-lg text-xl font-bold tracking-wide shadow-2xl">
              SOLD OUT
            </div>
          )}

          {/* Event Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-16">
            <div className="container mx-auto max-w-6xl">
              <AnimatedSection animation="fadeUp">
                <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-4 drop-shadow-2xl">
                  {event.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-text-secondary text-xl md:text-2xl">
                  <span className="font-semibold">{eventDate}</span>
                  <span>•</span>
                  <span>{eventTime}</span>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <section className="bg-gradient-to-b from-background via-surface to-surface-elevated py-16 md:py-24 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-secondary rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                  {/* Excerpt */}
                  {event.excerpt && (
                    <AnimatedSection animation="fadeUp">
                      <div className="relative">
                        <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-primary to-accent-secondary rounded-full" />
                        <p className="text-2xl text-text-primary leading-relaxed border-l-4 border-accent-primary pl-8 py-6 bg-surface-elevated/30 rounded-r-xl shadow-lg">
                          {event.excerpt}
                        </p>
                      </div>
                    </AnimatedSection>
                  )}

                  {/* Description */}
                  {event.description && (
                    <AnimatedSection animation="fadeUp" delay={0.1}>
                      <div className="prose prose-lg max-w-none text-text-primary">
                        <PortableText value={event.description} />
                      </div>
                    </AnimatedSection>
                  )}

                  {/* Event Image - Show coverImage if different from hero, or as placeholder */}
                  {(event as any).coverImage?.asset?.url && (event as any).coverImage.asset.url !== heroImageDesktop?.asset?.url && (
                    <AnimatedSection animation="fadeUp" delay={0.15}>
                      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={urlFor((event as any).coverImage.asset).width(1200).height(675).url()}
                          alt={(event as any).coverImage.alt || `${event.title} performance`}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 66vw, 100vw"
                          style={{
                            objectPosition: getObjectPosition((event as any).coverImage, false)
                          }}
                        />
                      </div>
                    </AnimatedSection>
                  )}

                  {/* Lineup */}
                  {(event as any).lineup && (event as any).lineup.length > 0 && (
                    <AnimatedSection animation="fadeUp" delay={0.2}>
                      <div className="bg-surface-elevated rounded-2xl p-8 border-2 border-accent-primary/20 shadow-lg">
                        <h2 className="text-3xl font-bold text-text-primary mb-6">Lineup</h2>
                        <div className="space-y-6">
                          {(event as any).lineup.map((performer: any, index: number) => (
                            <div key={index} className="border-b border-border last:border-0 pb-4 last:pb-0">
                              <div className="flex items-baseline gap-3 mb-2">
                                <h3 className="text-xl font-bold text-text-primary">{performer.name}</h3>
                                {performer.role && (
                                  <span className="text-sm text-accent-primary font-semibold uppercase tracking-wide">
                                    {performer.role}
                                  </span>
                                )}
                              </div>
                              {performer.bio && (
                                <p className="text-text-secondary">{performer.bio}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>
                  )}

                  {/* Special Notes */}
                  {event.specialNotes && (
                    <AnimatedSection animation="fadeUp" delay={0.3}>
                      <div className="bg-surface-elevated border-l-4 border-accent-primary p-6 rounded-r-lg">
                        <h3 className="text-lg font-bold text-text-primary mb-2">Important Information</h3>
                        <p className="text-text-secondary whitespace-pre-wrap">{event.specialNotes}</p>
                      </div>
                    </AnimatedSection>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Event Info Card */}
                  <AnimatedSection animation="fadeUp" delay={0.2}>
                    <div className="bg-gradient-to-br from-surface to-surface-elevated rounded-2xl p-8 text-text-primary border-4 border-accent-primary/40 shadow-2xl sticky top-24 relative overflow-hidden">
                      {/* Decorative corner accent */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 rounded-bl-full" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-secondary/5 rounded-tr-full" />

                      <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-accent-primary mb-6 flex items-center gap-2">
                          <Calendar className="h-6 w-6" />
                          Event Details
                        </h2>

                        <div className="space-y-6 mb-8">
                          {/* Date & Time */}
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                              <Clock className="h-5 w-5 text-accent-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm text-text-muted uppercase tracking-wide mb-1">Date & Time</div>
                              <div className="text-lg font-semibold">{eventDate}</div>
                              <div className="text-text-secondary">{eventTime}</div>
                            </div>
                          </div>

                          {/* Venue with Map Link */}
                          <div className="flex gap-3 border-t border-border pt-6">
                            <div className="flex-shrink-0 w-10 h-10 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                              <MapPin className="h-5 w-5 text-accent-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm text-text-muted uppercase tracking-wide mb-1">Venue</div>
                              <div className="text-lg font-semibold">{event.venue}</div>
                              {event.address && <div className="text-text-secondary text-sm">{event.address}</div>}
                              <div className="text-text-secondary text-sm">
                                {event.city}{event.state && `, ${event.state}`}
                              </div>
                              <a
                                href={mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 mt-2 text-accent-primary hover:text-accent-primary/80 text-sm font-medium transition-colors"
                              >
                                <MapPin className="h-4 w-4" />
                                View on Map
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Ticket Button */}
                        {event.ticketUrl && !event.isCanceled && (
                          <a
                            href={event.ticketUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg font-bold uppercase tracking-wider transition-all mb-4 ${
                              event.isSoldOut
                                ? 'bg-surface-elevated border-2 border-accent-primary/30 text-text-muted cursor-not-allowed'
                                : 'bg-accent-primary text-black hover:bg-accent-primary/90 hover:shadow-lg hover:shadow-accent-primary/20'
                            }`}
                            aria-disabled={event.isSoldOut}
                          >
                            <Ticket className="h-5 w-5" />
                            {event.isSoldOut ? 'Sold Out' : 'Get Tickets'}
                            {!event.isSoldOut && <ExternalLink className="h-4 w-4" />}
                          </a>
                        )}

                        {/* Event Status Messages */}
                        {event.isCanceled && (
                          <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4 text-center">
                            <p className="font-semibold">This event has been canceled</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Back to Shows */}
                  <AnimatedSection animation="fadeUp" delay={0.3}>
                    <Link
                      href="/shows"
                      className="btn-secondary w-full text-center"
                    >
                      ← Back to All Shows
                    </Link>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>
      </div>
    </>
  )
}
