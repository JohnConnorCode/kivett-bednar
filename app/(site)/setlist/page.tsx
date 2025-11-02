import {Metadata} from 'next'
import Link from 'next/link'
import {client} from '@/sanity/lib/client'
import {setlistPageQuery, allSongsQuery} from '@/sanity/lib/queries'
import {AnimatedSection} from '@/components/animations/AnimatedSection'
import {AnimatedHero} from '@/components/ui/AnimatedHero'
import {ImageRevealScroll} from '@/components/ui/ImageRevealScroll'

export const metadata: Metadata = {
  title: 'Blues Set List | Kivett Bednar',
  description: 'A collection of classic blues songs',
}

export default async function SetlistPage() {
  const [setlistPage, songs] = await Promise.all([
    client.fetch(setlistPageQuery, {}, {next: {revalidate: 60}}),
    client.fetch(allSongsQuery, {}, {next: {revalidate: 60}}),
  ])

  return (
    <div className="min-h-screen">
      {/* Animated Hero with Sheet Music */}
      <AnimatedHero
        title={setlistPage?.heroHeading || 'Blues Setlist'}
        subtitle={songs && songs.length > 0 ? `${songs.length}${setlistPage?.subtitleSuffix || ' timeless classics from the great American songbook'}` : undefined}
        variant="setlist"
        backgroundImage={setlistPage?.heroImage?.asset?.url || '/images/gallery/orpheum-performance.jpg'}
        backgroundAlt={setlistPage?.heroImage?.alt || 'Kivett Bednar performing blues classics'}
      />

      {/* Image Reveal - Blues Performance */}
      <section className="bg-gradient-to-b from-bone to-charcoal-900/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ImageRevealScroll
              imageSrc={setlistPage?.performanceImage?.asset?.url || '/images/382702580_10225110781416892_2823231479166319016_n.jpg'}
              imageAlt={setlistPage?.performanceImage?.alt || 'Kivett performing blues classics'}
              direction="right"
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="bg-bone py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Intro text */}
            {setlistPage?.introText && (
              <div className="max-w-3xl mx-auto text-center mb-16">
                <AnimatedSection animation="fadeIn">
                  <p className="text-2xl text-charcoal-900/80 leading-relaxed whitespace-pre-wrap">
                    {setlistPage.introText}
                  </p>
                </AnimatedSection>
              </div>
            )}

            {/* Songs Grid */}
            {songs && songs.length > 0 && (
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-6">
                {songs.map((song: any, index: number) => (
                  <AnimatedSection
                    key={song._id}
                    animation="fadeUp"
                    delay={0.05 * index}
                  >
                    <div className="group relative">
                      <div className="flex items-baseline justify-between py-4 border-b-2 border-charcoal-900/10 group-hover:border-midnight-600/50 transition-all duration-300">
                        <div className="flex items-baseline gap-4">
                          <span className="text-charcoal-900/40 font-mono text-sm w-8">
                            {(index + 1).toString().padStart(2, '0')}
                          </span>
                          <span className="text-xl font-semibold text-charcoal-900 group-hover:text-midnight-500 transition-colors">
                            {song.title}
                          </span>
                        </div>
                        <span className="text-lg font-mono text-midnight-600 font-bold ml-4 shrink-0">
                          {song.key}
                        </span>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Reveal - Guitar */}
      <section className="bg-gradient-to-b from-bone to-midnight-500/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ImageRevealScroll
              imageSrc={setlistPage?.guitarImage?.asset?.url || '/images/16487687_1351833004875154_191765266250731543_o.jpg'}
              imageAlt={setlistPage?.guitarImage?.alt || 'Kivett performing on stage'}
              direction="left"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {(setlistPage?.ctaHeading || setlistPage?.ctaText) && (
        <section className="bg-gradient-to-b from-midnight-500/10 to-charcoal-900 py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection animation="scaleIn">
                <div className="bg-gradient-to-br from-midnight-500 to-charcoal-900 rounded-2xl p-12 text-center text-bone border-2 border-midnight-600/20">
                  {setlistPage.ctaHeading && (
                    <h2 className="text-4xl font-bold mb-4">
                      {setlistPage.ctaHeading}
                    </h2>
                  )}
                  {setlistPage.ctaText && (
                    <p className="text-xl text-bone/80 mb-8 max-w-2xl mx-auto whitespace-pre-wrap">
                      {setlistPage.ctaText}
                    </p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/lessons"
                      className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-midnight-600 text-bone font-bold hover:bg-midnight-700 transition-all transform hover:scale-105"
                    >
                      {setlistPage?.ctaBookLessonButtonText || 'Book a Lesson'}
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-bone text-bone font-semibold hover:bg-bone/10 transition-all"
                    >
                      {setlistPage?.ctaContactButtonText || 'Get in Touch'}
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
