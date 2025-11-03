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

export const metadata: Metadata = {
  title: 'Kivett Bednar | Blues Guitarist & Musician',
  description: 'Gritty Texas Blues meets the heart of the Pacific Northwest',
}

export default async function HomePage() {
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
      />

      {/* About Section - Split Screen with Image */}
      {homePage.aboutImage?.asset?.url && (
        <SplitScreenImage
          imageSrc={homePage.aboutImage.asset.url}
          imageAlt={homePage.aboutImage?.alt || "Kivett Bednar with guitar - blues musician and performer"}
          imagePosition="left"
        >
        <h2 className="text-5xl font-bold mb-6 text-charcoal-900">
          {homePage.aboutHeading}
        </h2>
        <p className="text-xl mb-6 leading-relaxed text-charcoal-900/80">
          {homePage.aboutText}
        </p>
        <div className="flex gap-4">
          <Link
            href="/setlist"
            className="inline-flex items-center gap-2 px-6 py-3 bg-vintage-500 text-white font-semibold rounded-lg hover:bg-vintage-600 transition-all transform hover:scale-105"
          >
            {homePage.aboutButtonText || 'View Setlist'}
            <span>→</span>
          </Link>
        </div>
        </SplitScreenImage>
      )}

      {/* Upcoming Shows Section - MOVED UP */}
      {events && events.length > 0 && (
        <section className="py-24 bg-charcoal-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <AnimatedSection animation="fadeIn">
                <div className="flex justify-between items-end mb-12">
                  <h2 className="text-5xl font-bold text-bone">{homePage.upcomingShowsHeading || 'Upcoming Shows'}</h2>
                  <Link
                    href="/shows"
                    className="text-vintage-500 font-semibold hover:text-vintage-400 transition-colors"
                  >
                    {homePage.seeAllShowsLinkText || 'See all shows →'}
                  </Link>
                </div>
              </AnimatedSection>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {events.slice(0, 6).map((event: any, index: number) => (
                  <AnimatedSection key={event._id} animation="scaleIn" delay={0.1 * index}>
                    <EventCard event={event} />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Booking Section - NEW */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection animation="fadeIn">
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-charcoal-900 mb-6">Book Kivett for Your Event</h2>
                <p className="text-xl text-charcoal-900/70 max-w-2xl mx-auto">
                  Available for festivals, private events, and venue bookings. Professional blues performance with authentic Texas style meets Pacific Northwest soul.
                </p>
              </div>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-12">
              <AnimatedSection animation="fadeUp" delay={0.2}>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 text-charcoal-900">Get in Touch</h3>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full px-4 py-3 border border-charcoal-900/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-vintage-500"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 border border-charcoal-900/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-vintage-500"
                    />
                    <input
                      type="text"
                      placeholder="Event Date & Location"
                      className="w-full px-4 py-3 border border-charcoal-900/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-vintage-500"
                    />
                    <textarea
                      placeholder="Tell me about your event..."
                      rows={4}
                      className="w-full px-4 py-3 border border-charcoal-900/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-vintage-500"
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full px-8 py-4 bg-vintage-500 text-white font-bold rounded-lg hover:bg-vintage-600 transition-all transform hover:scale-105"
                    >
                      Send Inquiry
                    </button>
                  </form>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="fadeUp" delay={0.3}>
                <div className="space-y-6">
                  <div className="bg-charcoal-900 p-8 rounded-lg text-bone">
                    <h4 className="text-xl font-bold mb-4 text-gold-500">Perfect For</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <span className="text-vintage-500">→</span>
                        <span>Blues Festivals & Music Events</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-vintage-500">→</span>
                        <span>Private Parties & Celebrations</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-vintage-500">→</span>
                        <span>Corporate Events</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-vintage-500">→</span>
                        <span>Venue Residencies</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-vintage-500/20">
                    <p className="text-lg italic text-charcoal-900/70 mb-4">
                      &ldquo;Kivett brings authentic blues energy that connects with every audience. His performance at our festival was unforgettable.&rdquo;
                    </p>
                    <p className="font-semibold text-charcoal-900">— Festival Organizer</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Image Gallery with Parallax */}
      <section className="bg-gradient-to-b from-midnight-500 via-charcoal-900/50 to-bone py-32">
        <div className="container mx-auto px-4 mb-16">
          <AnimatedSection animation="fadeIn">
            <h2 className="text-5xl font-bold text-center text-bone mb-4">
              {homePage.gallerySectionHeading || 'Gallery'}
            </h2>
            <p className="text-xl text-center text-bone/70">
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

      {/* Newsletter Signup - NEW */}
      <section className="py-24 bg-bone">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection animation="scaleIn">
              <div className="bg-gradient-to-br from-charcoal-900 to-midnight-500 p-12 rounded-2xl border-4 border-vintage-500/30 text-center">
                <h2 className="text-4xl font-bold text-bone mb-4">Stay Connected</h2>
                <p className="text-xl text-bone/80 mb-8">Get the latest show announcements, new music releases, and exclusive content delivered to your inbox.</p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-vintage-500"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-vintage-500 text-white font-bold rounded-lg hover:bg-vintage-600 transition-all transform hover:scale-105 whitespace-nowrap"
                  >
                    Join the List
                  </button>
                </form>
                <p className="text-sm text-bone/60 mt-4">We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
