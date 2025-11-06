import {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {upcomingEventsQuery, showsPageQuery} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'
import {EventCard} from '@/components/ui/EventCard'
import {AnimatedHero} from '@/components/ui/AnimatedHero'
import {StaggeredImageGrid} from '@/components/ui/StaggeredImageGrid'
import {AnimatedSection} from '@/components/animations/AnimatedSection'

export const metadata: Metadata = {
  title: 'Shows | Kivett Bednar',
  description: 'Upcoming concerts and performances',
}

// Revalidate every 60 seconds (ISR)
export const revalidate = 60

export default async function ShowsPage() {
  let showsPage = null
  let events = null

  try {
    ;[showsPage, events] = await Promise.all([
      sanityFetch({query: showsPageQuery}).then((r) => r.data),
      sanityFetch({
        query: upcomingEventsQuery,
        params: {now: new Date().toISOString(), limit: 50},
      }).then((r) => r.data),
    ])
  } catch (error) {
    console.warn('Failed to fetch shows page data, using fallback content:', error)
  }

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
        title={showsPage?.heroHeading || 'Live Shows'}
        subtitle={showsPage?.heroSubheading || 'Catch authentic blues performances across the Pacific Northwest'}
        variant="shows"
        backgroundImage={showsPage?.heroImage?.asset?.url || undefined}
        backgroundAlt={showsPage?.heroImage?.alt || 'Kivett Bednar performing live blues'}
      />

      {/* Performance Photo Grid */}
      <section className="bg-gradient-to-b from-background to-surface py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fadeIn">
              <h2 className="text-5xl font-bold text-center text-text-primary mb-4">
                {showsPage?.performanceGalleryHeading || 'Live Performances'}
              </h2>
              <p className="text-xl text-center text-text-secondary mb-16">
                {showsPage?.performanceGallerySubheading || 'Moments from the stage'}
              </p>
            </AnimatedSection>
            {showsPage?.performanceImages && showsPage.performanceImages.length > 0 && (
              <StaggeredImageGrid
                images={showsPage.performanceImages
                  .filter((img: any) => img.image?.asset?.url)
                  .map((img: any) => ({
                    src: img.image.asset.url,
                    alt: img.alt || img.image?.alt || 'Performance photo',
                    caption: img.caption || '',
                  }))
                }
                columns={3}
              />
            )}
          </div>
        </div>
      </section>

      {/* Shows Content */}
      <div className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {events && events.length > 0 ? (
              <>
                <AnimatedSection animation="fadeIn">
                  <h2 className="text-4xl font-bold mb-8 text-text-primary">
                    {showsPage?.upcomingShowsHeading || 'Upcoming Shows'}
                  </h2>
                  <p className="text-text-secondary text-lg mb-8">
                    {events.length}{showsPage?.showCountPrefix || ' upcoming'} {events.length === 1 ? (showsPage?.showSingular || 'show') : (showsPage?.showPlural || 'shows')}
                  </p>
                </AnimatedSection>
                <div className="grid gap-8">
                  {events.map((event: any, index: number) => (
                    <AnimatedSection key={event._id} animation="fadeUp" delay={0.1 * index}>
                      <EventCard event={event} />
                    </AnimatedSection>
                  ))}
                </div>
              </>
            ) : (
              <AnimatedSection animation="fadeIn">
                <h2 className="text-4xl font-bold mb-8 text-text-primary">
                  {showsPage?.upcomingShowsHeading || 'Upcoming Shows'}
                </h2>
                <div className="text-center py-16 border-2 border-dashed border-border rounded-lg bg-surface">
                  <div className="text-6xl mb-4">🎸</div>
                  <p className="text-text-primary text-2xl font-semibold mb-2">
                    {showsPage?.emptyStateHeading || 'No upcoming shows scheduled'}
                  </p>
                  <p className="text-text-secondary mt-2">
                    {showsPage?.emptyStateText || 'Check back soon for new dates! Follow on social media for announcements.'}
                  </p>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
