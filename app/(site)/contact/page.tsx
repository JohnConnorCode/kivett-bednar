import {Metadata} from 'next'
import Link from 'next/link'
import {ContactForm} from '@/components/ui/ContactForm'
import {sanityFetch} from '@/sanity/lib/live'
import {contactPageQuery, settingsQuery} from '@/sanity/lib/queries'
import {AnimatedHero} from '@/components/ui/AnimatedHero'
import {ImageRevealScroll} from '@/components/ui/ImageRevealScroll'
import {StaggeredImageGrid} from '@/components/ui/StaggeredImageGrid'
import {AnimatedSection} from '@/components/animations/AnimatedSection'

export const metadata: Metadata = {
  title: 'Contact | Kivett Bednar',
  description: 'Get in touch',
}

export default async function ContactPage() {
  const [{data: contactPage}, {data: settings}] = await Promise.all([
    sanityFetch({query: contactPageQuery}),
    sanityFetch({query: settingsQuery}),
  ])

  return (
    <div className="min-h-screen">
      {/* Animated Hero with Vinyl Record */}
      <AnimatedHero
        title={contactPage?.heroHeading || 'Get in Touch'}
        subtitle={contactPage?.heroSubheading}
        variant="contact"
        backgroundImage="/images/gallery/hero-stage-compressed.jpg"
        backgroundAlt="Kivett Bednar on stage"
      />

      {/* Content */}
      <div className="bg-bone py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-8 md:p-12 border-2 border-charcoal-900/10">
                  <h2 className="text-3xl font-bold mb-8 text-charcoal-900">Send a Message</h2>
                  <ContactForm />
                </div>
              </div>

              {/* Contact Info & Social */}
              <div className="space-y-8">
                {/* Direct Contact */}
                {settings?.contactEmail && (
                  <div className="bg-gradient-to-br from-midnight-500 to-charcoal-900 rounded-2xl p-8 text-bone border-2 border-indigo-700/20">
                    <h2 className="text-2xl font-bold mb-4">Direct Contact</h2>
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="text-indigo-700 hover:text-indigo-600 transition-colors text-lg font-semibold break-all"
                    >
                      {settings.contactEmail}
                    </a>
                  </div>
                )}

                {/* Social Media */}
                {settings?.socialLinks && settings.socialLinks.length > 0 && (
                  <div className="bg-white rounded-2xl p-8 border-2 border-charcoal-900/10">
                    <h2 className="text-2xl font-bold mb-4 text-charcoal-900">Follow Along</h2>
                    <div className="space-y-3">
                      {settings.socialLinks.map((link: any) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-midnight-500 hover:text-indigo-700 transition-colors font-semibold capitalize"
                        >
                          <span>→</span>
                          {link.platform}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Links */}
                <div className="bg-white rounded-2xl p-8 border-2 border-charcoal-900/10">
                  <h2 className="text-2xl font-bold mb-4 text-charcoal-900">Quick Links</h2>
                  <div className="space-y-3">
                    <Link
                      href="/shows"
                      className="flex items-center gap-3 text-midnight-500 hover:text-indigo-700 transition-colors font-semibold"
                    >
                      <span>→</span>
                      Upcoming Shows
                    </Link>
                    <Link
                      href="/lessons"
                      className="flex items-center gap-3 text-midnight-500 hover:text-indigo-700 transition-colors font-semibold"
                    >
                      <span>→</span>
                      Guitar Lessons
                    </Link>
                    <Link
                      href="/setlist"
                      className="flex items-center gap-3 text-midnight-500 hover:text-indigo-700 transition-colors font-semibold"
                    >
                      <span>→</span>
                      Blues Setlist
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portrait Image Section */}
      <section className="bg-gradient-to-b from-bone to-charcoal-900 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <AnimatedSection animation="fadeIn">
              <h2 className="text-5xl font-bold text-center text-bone mb-16">
                About Kivett
              </h2>
            </AnimatedSection>
            <ImageRevealScroll
              imageSrc="/images/performance/waltz-brewing-promo.jpg"
              imageAlt="Kivett Bednar portrait"
              direction="up"
            />
          </div>
        </div>
      </section>

      {/* Portrait Grid */}
      <section className="bg-charcoal-900 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <StaggeredImageGrid
              images={[
                {
                  src: '/images/portraits/guild-shirt.jpg',
                  alt: 'Kivett with Guild guitar',
                  caption: 'Blues Musician',
                },
                {
                  src: '/images/gallery/guitar-portrait.jpg',
                  alt: 'Portrait with guitar',
                  caption: 'Guitar Teacher',
                },
                {
                  src: '/images/hero/guitar-red.jpg',
                  alt: 'Performance shot',
                  caption: 'Live Performer',
                },
                {
                  src: '/images/performance/stage-main.png',
                  alt: 'On stage',
                  caption: 'Pacific Northwest Blues',
                },
              ]}
              columns={2}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
