import {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {lessonsPageQuery, settingsQuery} from '@/sanity/lib/queries'
import {AnimatedSection} from '@/components/animations/AnimatedSection'
import {AnimatedHero} from '@/components/ui/AnimatedHero'

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
      />

      {/* Main Content */}
      <div className="bg-bone py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Teaching Philosophy */}
            <div className="grid lg:grid-cols-2 gap-16 mb-24">
              <AnimatedSection animation="slideLeft">
                <h2 className="text-5xl font-bold mb-8 text-charcoal-900">
                  {lessonsPage.philosophyHeading}
                </h2>
                <div className="space-y-6 text-xl text-charcoal-900/80 leading-relaxed whitespace-pre-wrap">
                  {lessonsPage.philosophyText}
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slideRight" delay={0.2}>
                <div className="bg-gradient-to-br from-midnight-500 to-charcoal-900 rounded-2xl p-12 text-bone flex flex-col justify-center border-2 border-amber-600/20">
                <h3 className="text-3xl font-bold mb-6">{lessonsPage.ctaBoxHeading}</h3>
                <p className="text-lg mb-8 text-bone/80">
                  {lessonsPage.ctaBoxText}
                </p>
                <div className="space-y-4">
                  {settings?.contactEmail && (
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="block text-center px-8 py-4 rounded-lg bg-amber-600 text-charcoal-900 font-bold hover:bg-amber-500 transition-all transform hover:scale-105"
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

            {/* What You'll Learn */}
            {lessonsPage.learningItems && lessonsPage.learningItems.length > 0 && (
              <AnimatedSection animation="fadeIn">
                <div className="bg-white rounded-2xl p-12 border-2 border-charcoal-900/10">
                  <h2 className="text-4xl font-bold mb-12 text-center text-charcoal-900">
                    What You&apos;ll Learn
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {lessonsPage.learningItems.map((item: any, index: number) => (
                      <AnimatedSection key={item._key || index} animation="scaleIn" delay={0.15 * index}>
                        <div className="text-center group">
                          <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-midnight-500/20 flex items-center justify-center text-midnight-500 font-bold text-lg group-hover:border-amber-600 group-hover:text-amber-600 transition-colors">
                            {index + 1}
                          </div>
                          <h3 className="text-2xl font-bold mb-3 text-charcoal-900">{item.title}</h3>
                          <p className="text-charcoal-900/70 leading-relaxed">{item.description}</p>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
