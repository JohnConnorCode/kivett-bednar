import {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {lessonsPageQuery, settingsQuery} from '@/sanity/lib/queries'
import {AnimatedSection} from '@/components/animations/AnimatedSection'
import {AnimatedHero} from '@/components/ui/AnimatedHero'
import {ImageRevealScroll} from '@/components/ui/ImageRevealScroll'
import {SplitScreenImage} from '@/components/ui/SplitScreenImage'

export const metadata: Metadata = {
  title: 'Lessons | Kivett Bednar',
  description: 'Guitar and blues music lessons',
}

export default async function LessonsPage() {
  const [{data: lessonsPage}, {data: settings}] = await Promise.all([
    sanityFetch({query: lessonsPageQuery}),
    sanityFetch({query: settingsQuery}),
  ])

  // Fallback if no content yet
  if (!lessonsPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading lessons content from Sanity Studio...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Animated Hero */}
      <AnimatedHero
        title={lessonsPage.heroHeading}
        subtitle={lessonsPage.heroSubheading || lessonsPage.credentials}
        variant="lessons"
        backgroundImage="/images/gallery/guitar-portrait.jpg"
        backgroundAlt="Kivett Bednar with guitar"
      />

      {/* Image Reveal - Teaching */}
      <section className="bg-gradient-to-b from-bone to-charcoal-900/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ImageRevealScroll
              imageSrc="/images/hero/guitar-red.jpg"
              imageAlt="Kivett Bednar teaching guitar"
              direction="left"
            />
          </div>
        </div>
      </section>

      {/* Teaching Philosophy - Split Screen */}
      <SplitScreenImage
        imageSrc="/images/portraits/guild-shirt.jpg"
        imageAlt="Kivett with Guild guitar"
        imagePosition="right"
        darkBg={false}
      >
        <h2 className="text-5xl font-bold mb-8 text-charcoal-900">
          {lessonsPage.philosophyHeading}
        </h2>
        <div className="space-y-6 text-xl text-charcoal-900/80 leading-relaxed whitespace-pre-wrap">
          {lessonsPage.philosophyText}
        </div>
      </SplitScreenImage>

      {/* Image Reveal - Performance */}
      <section className="bg-gradient-to-b from-bone to-midnight-500/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ImageRevealScroll
              imageSrc="/images/performance/orpheum-main.jpg"
              imageAlt="Kivett Bednar live performance"
              direction="right"
            />
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="bg-bone py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <AnimatedSection animation="scaleIn">
              <div className="bg-gradient-to-br from-midnight-500 to-charcoal-900 rounded-2xl p-12 text-bone flex flex-col justify-center border-2 border-sky-500/20">
                <h3 className="text-3xl font-bold mb-6">{lessonsPage.ctaBoxHeading}</h3>
                <p className="text-lg mb-8 text-bone/80">
                  {lessonsPage.ctaBoxText}
                </p>
                <div className="space-y-4">
                  {settings?.contactEmail && (
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="block text-center px-8 py-4 rounded-lg bg-sky-500 text-charcoal-900 font-bold hover:bg-sky-400 transition-all transform hover:scale-105"
                    >
                      Email Me
                    </a>
                  )}
                  {settings?.bookingUrl && (
                    <a
                      href={settings.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center px-8 py-4 rounded-lg border-2 border-bone text-bone font-semibold hover:bg-bone/10 transition-all"
                    >
                      Schedule a Lesson
                    </a>
                  )}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      {lessonsPage.learningItems && lessonsPage.learningItems.length > 0 && (
        <section className="bg-charcoal-900 py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <AnimatedSection animation="fadeIn">
                <div className="bg-midnight-500/30 rounded-2xl p-12 border-2 border-sky-500/20">
                  <h2 className="text-4xl font-bold mb-12 text-center text-bone">
                    What You&apos;ll Learn
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {lessonsPage.learningItems.map((item: any, index: number) => (
                      <AnimatedSection key={item._key || index} animation="scaleIn" delay={0.15 * index}>
                        <div className="text-center group">
                          <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-sky-500/40 flex items-center justify-center text-sky-500 font-bold text-lg group-hover:border-sky-400 group-hover:text-sky-400 transition-colors">
                            {index + 1}
                          </div>
                          <h3 className="text-2xl font-bold mb-3 text-bone">{item.title}</h3>
                          <p className="text-bone/70 leading-relaxed">{item.description}</p>
                        </div>
                      </AnimatedSection>
                    ))}
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
