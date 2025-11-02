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

export default async function ShowsPage() {
  const [{data: showsPage}, {data: events}] = await Promise.all([
    sanityFetch({query: showsPageQuery}),
    sanityFetch({
      query: upcomingEventsQuery,
      params: {
        now: new Date().toISOString(),
        limit: 50,
      },
    }),
  ])

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
        backgroundImage={showsPage?.heroImage?.asset?.url || '/images/hero/performance-orpheum.jpg'}
        backgroundAlt={showsPage?.heroImage?.alt || 'Kivett Bednar performing live at the Orpheum Theatre'}
      />

      {/* Performance Photo Grid */}
      <section className="bg-gradient-to-b from-charcoal-900 to-midnight-500 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fadeIn">
              <h2 className="text-5xl font-bold text-center text-bone mb-4">
                {showsPage?.performanceGalleryHeading || 'Live Performances'}
              </h2>
              <p className="text-xl text-center text-bone/70 mb-16">
                {showsPage?.performanceGallerySubheading || 'Moments from the stage'}
              </p>
            </AnimatedSection>
            <StaggeredImageGrid
              images={showsPage?.performanceImages && showsPage.performanceImages.length > 0
                ? showsPage.performanceImages.map((img: any) => ({
                    src: img.image?.asset?.url || '/images/placeholder.jpg',
                    alt: img.alt || img.image?.alt || 'Performance photo',
                    caption: img.caption || '',
                  }))
                : [
                    {
                      src: '/images/performance/orpheum-main.jpg',
                      alt: 'Historic Orpheum Theatre performance',
                      caption: 'Orpheum Theatre',
                    },
                    {
                      src: '/images/382702580_10225110781416892_2823231479166319016_n.jpg',
                      alt: 'Recent live performance',
                      caption: 'Live Energy',
                    },
                    {
                      src: '/images/38696879_10212495556648941_4928380418454978560_o.jpg',
                      alt: 'Blues performance in action',
                      caption: 'Blues Power',
                    },
                    {
                      src: '/images/37124646_10212749349148811_4768331034854948864_o.jpg',
                      alt: 'Concert energy and presence',
                      caption: 'Stage Presence',
                    },
                    {
                      src: '/images/26910150_10211126011331164_9091562930595566163_o.jpg',
                      alt: 'Guitar-focused performance',
                      caption: 'Guitar Craft',
                    },
                    {
                      src: '/images/16487687_1351833004875154_191765266250731543_o.jpg',
                      alt: 'Wide stage shot blues performance',
                      caption: 'Pacific Northwest Blues',
                    },
                  ]
              }
              columns={3}
            />
          </div>
        </div>
      </section>

      {/* Shows Content */}
      <div className="bg-bone py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {events && events.length > 0 ? (
              <>
                <AnimatedSection animation="fadeIn">
                  <h2 className="text-4xl font-bold mb-8 text-charcoal-900">
                    {showsPage?.upcomingShowsHeading || 'Upcoming Shows'}
                  </h2>
                  <p className="text-charcoal-900/60 text-lg mb-8">
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
                <h2 className="text-4xl font-bold mb-8 text-charcoal-900">
                  {showsPage?.upcomingShowsHeading || 'Upcoming Shows'}
                </h2>
                <div className="text-center py-16 border-2 border-dashed border-charcoal-900/20 rounded-lg bg-bone">
                  <div className="text-6xl mb-4">🎸</div>
                  <p className="text-charcoal-900/80 text-2xl font-semibold mb-2">
                    {showsPage?.emptyStateHeading || 'No upcoming shows scheduled'}
                  </p>
                  <p className="text-charcoal-900/60 mt-2">
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
