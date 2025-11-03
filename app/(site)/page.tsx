import {Metadata} from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {client} from '@/sanity/lib/client'
import {upcomingEventsQuery, homePageQuery, uiTextQuery} from '@/sanity/lib/queries'
import {EventCard} from '@/components/ui/EventCard'
import {HeroSlider} from '@/components/ui/HeroSlider'
import {AnimatedSection} from '@/components/animations/AnimatedSection'
import {FloatingGallery} from '@/components/ui/FloatingGallery'
import {SplitScreenImage} from '@/components/ui/SplitScreenImage'
import {NewsletterForm} from '@/components/ui/NewsletterForm'

// Helper function to extract YouTube video ID from URL or return ID as-is
function getYouTubeId(urlOrId: string): string {
  if (!urlOrId) return '75M50Bfksa0' // Default fallback

  // If it's already just an ID (11 characters, alphanumeric), return it
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
    return urlOrId
  }

  // Try to extract from various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = urlOrId.match(pattern)
    if (match) return match[1]
  }

  // If no pattern matches, return the input (might be just an ID)
  return urlOrId
}

export const metadata: Metadata = {
  title: 'Kivett Bednar | Blues Guitarist & Musician',
  description: 'Gritty Texas Blues meets the heart of the Pacific Northwest',
}

export default async function HomePage() {
  console.log('[HomePage] Starting data fetch...')
  const fetchStart = Date.now()

  // Fetch home page content and upcoming shows
  const [homePage, events, uiText] = await Promise.all([
    client.fetch(homePageQuery, {}, {next: {revalidate: 60}}),
    client.fetch(
      upcomingEventsQuery,
      {
        now: new Date().toISOString(),
        limit: 3,
      },
      {next: {revalidate: 60}}
    ),
    client.fetch(uiTextQuery, {}, {next: {revalidate: 60}}),
  ])

  console.log(`[HomePage] Data fetch completed in ${Date.now() - fetchStart}ms`)

  // Fallback if no content in Sanity yet
  if (!homePage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading content from Sanity Studio...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <HeroSlider
        slides={homePage.heroSlides || undefined}
        heading={homePage.heroHeading || undefined}
        subheading={homePage.heroSubheading || undefined}
        tagline={homePage.heroTagline || 'Gritty Texas Blues meets the heart of the Pacific Northwest'}
        buttonText={homePage.heroButtonText || undefined}
      />

      {/* Featured Video Section */}
      <section className="py-24 bg-gradient-to-b from-background to-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fadeIn">
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-text-primary mb-4">
                  {homePage.featuredVideoHeading || 'Live Performance'}
                </h2>
                <p className="text-xl text-text-secondary">
                  {homePage.featuredVideoSubheading || 'Experience the authentic blues sound'}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" delay={0.2}>
              <div className="aspect-video relative overflow-hidden rounded-lg shadow-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(homePage.featuredVideoUrl || '')}`}
                  title="Kivett Bednar Live Performance"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* About Section - Split Screen with Image */}
      {homePage.aboutImage?.asset?.url && (
        <SplitScreenImage
          imageSrc={homePage.aboutImage.asset.url}
          imageAlt={homePage.aboutImage?.alt || "Kivett Bednar with guitar - blues musician and performer"}
          imagePosition="left"
        >
        <AnimatedSection animation="fadeUp">
          <h2 className="text-5xl font-bold mb-6 text-text-primary">
            {homePage.aboutHeading}
          </h2>
        </AnimatedSection>
        <AnimatedSection animation="fadeUp" delay={0.15}>
          <p className="text-xl mb-6 leading-relaxed text-text-secondary">
            {homePage.aboutText}
          </p>
        </AnimatedSection>
        <AnimatedSection animation="fadeUp" delay={0.3}>
          <div className="flex gap-4">
            <Link
              href="/setlist"
              className="btn-primary"
            >
              {homePage.aboutButtonText || 'View Setlist'}
              <span>→</span>
            </Link>
          </div>
        </AnimatedSection>
        </SplitScreenImage>
      )}

      {/* Upcoming Shows Section - MOVED UP */}
      {events && events.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <AnimatedSection animation="fadeIn">
                <div className="flex justify-between items-end mb-12">
                  <h2 className="text-5xl font-bold text-text-primary">{homePage.upcomingShowsHeading || 'Upcoming Shows'}</h2>
                  <Link
                    href="/shows"
                    className="text-accent-primary font-semibold hover:text-accent-primary/80 transition-colors"
                  >
                    {homePage.seeAllShowsLinkText || 'See all shows →'}
                  </Link>
                </div>
              </AnimatedSection>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {events.slice(0, 6).map((event: any, index: number) => (
                  <AnimatedSection key={event._id} animation="fadeUp" delay={0.1 * index}>
                    <EventCard event={event} />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Booking Section */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection animation="fadeIn">
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-text-primary mb-6">
                  {homePage.bookingSectionHeading || 'Book Kivett for Your Event'}
                </h2>
                <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                  {homePage.bookingSectionIntro || 'Available for festivals, private events, and venue bookings. Professional blues performance with authentic Texas style meets Pacific Northwest soul.'}
                </p>
              </div>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-12">
              <AnimatedSection animation="fadeUp" delay={0.2}>
                <div className="bg-gradient-to-br from-surface to-surface-elevated p-8 rounded-lg shadow-lg text-text-primary">
                  <h3 className="text-2xl font-bold mb-6 text-accent-primary">
                    {homePage.bookingInquiriesHeading || 'Booking Inquiries'}
                  </h3>
                  <div className="space-y-6">
                    <p className="text-lg">
                      {homePage.bookingInquiriesText || 'For booking inquiries, please contact Kivett directly via email:'}
                    </p>
                    <a
                      href="mailto:kivettbednar@gmail.com"
                      className="btn-primary w-full text-center text-xl"
                    >
                      kivettbednar@gmail.com
                    </a>
                    <div className="border-t border-border pt-6 mt-6">
                      <h4 className="font-bold text-accent-primary mb-3">
                        {homePage.bookingInquiryListHeading || 'Include in Your Inquiry:'}
                      </h4>
                      <ul className="space-y-2 text-text-secondary">
                        {(homePage.bookingInquiryItems || [
                          'Event date and location',
                          'Type of event (festival, private party, venue, etc.)',
                          'Expected audience size',
                          'Performance duration needed',
                        ]).map((item: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-accent-primary mt-1">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="fadeUp" delay={0.3}>
                <div className="space-y-6">
                  <div className="bg-surface-elevated p-8 rounded-lg text-text-primary">
                    <h4 className="text-xl font-bold mb-4 text-accent-primary">
                      {homePage.bookingPerfectForHeading || 'Perfect For'}
                    </h4>
                    <ul className="space-y-3">
                      {(homePage.bookingEventTypes || [
                        'Blues Festivals & Music Events',
                        'Private Parties & Celebrations',
                        'Corporate Events',
                        'Venue Residencies',
                      ]).map((eventType: string, index: number) => (
                        <li key={index} className="flex items-center gap-3">
                          <span className="text-accent-primary">→</span>
                          <span>{eventType}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-surface p-8 rounded-lg shadow-lg border-2 border-accent-primary/20">
                    <p className="text-lg italic text-text-secondary mb-4">
                      &ldquo;{homePage.bookingTestimonialQuote || 'Kivett brings authentic blues energy that connects with every audience. His performance at our festival was unforgettable.'}&rdquo;
                    </p>
                    <p className="font-semibold text-text-primary">
                      {homePage.bookingTestimonialAttribution || '— Festival Organizer'}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Image Gallery with Parallax */}
      <section className="bg-gradient-to-b from-background via-surface to-surface-elevated py-32">
        <div className="container mx-auto px-4 mb-16">
          <AnimatedSection animation="fadeIn">
            <h2 className="text-5xl font-bold text-center text-text-primary mb-4">
              {homePage.gallerySectionHeading || 'Gallery'}
            </h2>
            <p className="text-xl text-center text-text-secondary">
              {homePage.gallerySectionSubheading || 'Moments from the stage and studio'}
            </p>
          </AnimatedSection>
        </div>
        {homePage.galleryImages && homePage.galleryImages.length > 0 && (
          <FloatingGallery
            images={homePage.galleryImages
              .filter((img: any) => img.image?.asset?.url)
              .map((img: any) => ({
                src: img.image.asset.url,
                alt: img.alt || img.image?.alt || 'Gallery image',
                width: img.width || 1200,
                height: img.height || 800,
              }))
            }
          />
        )}
      </section>

      {/* Studio Video Section */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fadeIn">
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-text-primary mb-4">
                  {homePage.studioSectionHeading || 'In The Studio'}
                </h2>
                <p className="text-xl text-text-secondary">
                  {homePage.studioSectionSubheading || 'Behind the scenes of creating authentic Texas blues'}
                </p>
              </div>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-8">
              <AnimatedSection animation="fadeUp" delay={0.2}>
                <div className="aspect-video relative overflow-hidden rounded-lg shadow-xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(homePage.studioVideo1Url || '')}`}
                    title="Kivett Bednar Studio Session 1"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </AnimatedSection>
              <AnimatedSection animation="fadeUp" delay={0.3}>
                <div className="aspect-video relative overflow-hidden rounded-lg shadow-xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(homePage.studioVideo2Url || '')}`}
                    title="Kivett Bednar Studio Session 2"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection animation="fadeUp">
              <div className="bg-gradient-to-br from-surface to-surface-elevated p-12 rounded-2xl border-4 border-accent-primary/30 text-center">
                <h2 className="text-4xl font-bold text-text-primary mb-4">
                  {homePage.newsletterHeading || 'Stay Connected'}
                </h2>
                <p className="text-xl text-text-secondary mb-8">
                  {homePage.newsletterText || 'Get the latest show announcements, new music releases, and exclusive content delivered to your inbox.'}
                </p>
                <NewsletterForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
