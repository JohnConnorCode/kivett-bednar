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
import {ParallaxImageSection} from '@/components/ui/ParallaxImageSection'
import {ImageRevealScroll} from '@/components/ui/ImageRevealScroll'

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
            className="inline-flex items-center gap-2 px-6 py-3 bg-midnight-500 text-bone font-semibold rounded-lg hover:bg-midnight-600 hover:text-charcoal-900 transition-all transform hover:scale-105"
          >
            {homePage.aboutButtonText || 'View Setlist'}
            <span>→</span>
          </Link>
        </div>
        </SplitScreenImage>
      )}

      {/* Parallax Image Section */}
      <ParallaxImageSection
        images={homePage.parallaxImages && homePage.parallaxImages.length > 0
          ? homePage.parallaxImages
              .filter((img: any) => img.image?.asset?.url)
              .map((img: any) => ({
                src: img.image.asset.url,
                alt: img.alt || img.image?.alt || 'Performance image',
                position: img.position || 'left',
                offset: img.offset || 0
              }))
          : []
        }
      >
        <div className="text-center py-32">
          <AnimatedSection animation="fadeIn">
            <h2 className="text-6xl font-bold text-charcoal-900 mb-6">
              {homePage.parallaxHeading || 'Gritty Texas Blues'}
            </h2>
            <p className="text-2xl text-midnight-600 font-semibold">
              {homePage.parallaxSubheading || 'Meets the Heart of the Pacific Northwest'}
            </p>
          </AnimatedSection>
        </div>
      </ParallaxImageSection>

      {/* Latest Album/Music Section */}
      {(homePage as any).albumCoverImage?.asset?.url && (
        <SplitScreenImage
          imageSrc={(homePage as any).albumCoverImage.asset.url}
          imageAlt={(homePage as any).albumCoverImage?.alt || "Rae Gordon Band - Better Than I Was album cover"}
          imagePosition="right"
          darkBg={true}
        >
        <h2 className="text-5xl font-bold mb-6">{homePage.albumTitle}</h2>
        {(homePage.albumYear || homePage.albumFormat) && (
          <p className="text-2xl mb-6 text-midnight-600 font-semibold">
            {[homePage.albumYear, homePage.albumFormat].filter(Boolean).join(' • ')}
          </p>
        )}
        <p className="text-lg mb-8 leading-relaxed text-bone/80">
          {homePage.albumDescription}
        </p>
        {homePage.albumFeatures && homePage.albumFeatures.length > 0 && (
          <div className="space-y-4">
            {homePage.albumFeatures.map((feature: string, index: number) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-1 h-1 bg-midnight-600 rounded-full"></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}
        </SplitScreenImage>
      )}

      {/* Performance Image Reveal */}
      <section className="py-24 bg-gradient-to-b from-charcoal-900 to-midnight-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fadeIn">
              <h2 className="text-5xl font-bold text-center text-bone mb-12">
                {homePage.performanceSectionHeading || 'Live Performances'}
              </h2>
            </AnimatedSection>
            {homePage.performanceImage?.asset?.url && (
              <ImageRevealScroll
                imageSrc={homePage.performanceImage.asset.url}
                imageAlt={homePage.performanceImage?.alt || "Performing at the historic Orpheum Theatre"}
                direction="up"
              />
            )}
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

      {/* Upcoming Shows Section */}
      {events && events.length > 0 && (
        <section className="py-24 bg-bone">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection animation="fadeIn">
                <div className="flex justify-between items-end mb-12">
                  <h2 className="text-5xl font-bold text-charcoal-900">{homePage.upcomingShowsHeading || 'Upcoming Shows'}</h2>
                  <Link
                    href="/shows"
                    className="text-midnight-500 font-semibold hover:text-midnight-600 transition-colors"
                  >
                    {homePage.seeAllShowsLinkText || 'See all shows →'}
                  </Link>
                </div>
              </AnimatedSection>
              <div className="grid gap-8">
                {events.slice(0, 3).map((event: any, index: number) => (
                  <AnimatedSection key={event._id} animation="fadeUp" delay={0.1 * index}>
                    <EventCard event={event} />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-midnight-500 to-charcoal-900 text-bone">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection animation="fadeUp">
            <h2 className="text-5xl font-bold mb-6">{homePage.ctaLessonsHeading}</h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto text-bone/80">
              {homePage.ctaLessonsText}
            </p>
            <Link
              href="/lessons"
              className="inline-block px-8 py-4 bg-midnight-600 text-bone font-bold rounded-lg hover:bg-midnight-700 transition-all transform hover:scale-105 text-lg"
            >
              {homePage.ctaLessonsButtonText || 'Schedule Your First Lesson'}
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
