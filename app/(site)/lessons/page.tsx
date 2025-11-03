import {Metadata} from 'next'
import {client} from '@/sanity/lib/client'
import {lessonsPageQuery, settingsQuery} from '@/sanity/lib/queries'
import {AnimatedSection} from '@/components/animations/AnimatedSection'
import {AnimatedHero} from '@/components/ui/AnimatedHero'
import {SplitScreenImage} from '@/components/ui/SplitScreenImage'

export const metadata: Metadata = {
  title: 'Lessons | Kivett Bednar',
  description: 'Guitar and blues music lessons',
}

export default async function LessonsPage() {
  const [lessonsPage, settings] = await Promise.all([
    client.fetch(lessonsPageQuery, {}, {next: {revalidate: 60}}),
    client.fetch(settingsQuery, {}, {next: {revalidate: 60}}),
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
        title={lessonsPage.heroHeading || 'Guitar & Blues Lessons'}
        subtitle={lessonsPage.heroSubheading || lessonsPage.credentials || undefined}
        variant="lessons"
        backgroundImage={lessonsPage.heroImage?.asset?.url || '/images/gallery/guitar-portrait.jpg'}
        backgroundAlt={lessonsPage.heroImage?.alt || 'Kivett Bednar with guitar'}
      />

      {/* Teaching Philosophy - Split Screen */}
      <SplitScreenImage
        imageSrc={lessonsPage.philosophyImage?.asset?.url || '/images/portraits/guild-shirt.jpg'}
        imageAlt={lessonsPage.philosophyImage?.alt || 'Kivett with Guild guitar'}
        imagePosition="right"
        darkBg={false}
      >
        <h2 className="text-5xl font-bold mb-8 text-text-primary">
          {lessonsPage.philosophyHeading}
        </h2>
        <div className="space-y-6 text-xl text-text-secondary leading-relaxed whitespace-pre-wrap">
          {lessonsPage.philosophyText}
        </div>
      </SplitScreenImage>

      {/* CTA Box */}
      <section className="bg-surface py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <AnimatedSection animation="scaleIn">
              <div className="bg-gradient-to-br from-surface-elevated to-surface rounded-2xl p-12 text-text-primary flex flex-col justify-center border-2 border-accent-primary/20">
                <h3 className="text-3xl font-bold mb-6">{lessonsPage.ctaBoxHeading}</h3>
                <p className="text-lg mb-8 text-text-secondary">
                  {lessonsPage.ctaBoxText}
                </p>
                <div className="space-y-4">
                  {settings?.contactEmail && (
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="btn-primary block text-center"
                    >
                      {lessonsPage.emailButtonText || 'Email Me'}
                    </a>
                  )}
                  {settings?.bookingUrl && (
                    <a
                      href={settings.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary block text-center"
                    >
                      {lessonsPage.scheduleButtonText || 'Schedule a Lesson'}
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
        <section className="bg-background py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <AnimatedSection animation="fadeIn">
                <div className="bg-surface-elevated rounded-2xl p-12 border-2 border-accent-primary/20">
                  <h2 className="text-4xl font-bold mb-12 text-center text-text-primary">
                    {lessonsPage.learningItemsHeading || "What You'll Learn"}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {lessonsPage.learningItems.map((item: any, index: number) => (
                      <AnimatedSection key={item._key || index} animation="scaleIn" delay={0.15 * index}>
                        <div className="text-center group">
                          <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-accent-primary/40 flex items-center justify-center text-accent-primary font-bold text-lg group-hover:border-accent-primary group-hover:text-accent-primary transition-colors">
                            {index + 1}
                          </div>
                          <h3 className="text-2xl font-bold mb-3 text-text-primary">{item.title}</h3>
                          <p className="text-text-secondary leading-relaxed">{item.description}</p>
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
