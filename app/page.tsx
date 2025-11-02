import {Metadata} from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {sanityFetch} from '@/sanity/lib/live'
import {upcomingEventsQuery, homePageQuery} from '@/sanity/lib/queries'
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
  const [{data: homePage}, {data: events}] = await Promise.all([
    sanityFetch({query: homePageQuery}),
    sanityFetch({
      query: upcomingEventsQuery,
      params: {
        now: new Date().toISOString(),
        limit: 3,
      },
    }),
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
        slides={homePage.heroSlides}
        heading={homePage.heroHeading}
        subheading={homePage.heroSubheading}
        tagline={homePage.heroTagline || 'Gritty Texas Blues meets the heart of the Pacific Northwest'}
      />

      {/* About Section - Split Screen with Image */}
      <SplitScreenImage
        imageSrc="/images/kivett-high-res_magicstudio_ybv1se0lo5i-2.jpg"
        imageAlt="Kivett Bednar - Musician, Amp Maker, Artist"
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-midnight-500 text-bone font-semibold rounded-lg hover:bg-indigo-700 hover:text-charcoal-900 transition-all transform hover:scale-105"
          >
            View Setlist
            <span>→</span>
          </Link>
        </div>
      </SplitScreenImage>

      {/* Parallax Image Section */}
      <ParallaxImageSection
        images={[
          {src: '/images/10321709_666559680059075_1761408545473889635_o.jpg', alt: 'Dramatic stage performance', position: 'left'},
          {src: '/images/10386889_666568380058205_4706124177037425882_o.jpg', alt: 'Guitar craftsmanship detail', position: 'right', offset: 150},
        ]}
      >
        <div className="text-center py-32">
          <AnimatedSection animation="fadeIn">
            <h2 className="text-6xl font-bold text-charcoal-900 mb-6">
              Gritty Texas Blues
            </h2>
            <p className="text-2xl text-indigo-700 font-semibold">
              Meets the Heart of the Pacific Northwest
            </p>
          </AnimatedSection>
        </div>
      </ParallaxImageSection>

      {/* Latest Album/Music Section */}
      <SplitScreenImage
        imageSrc="/images/details/album-cover.jpg"
        imageAlt="Rae Gordon Band - Better Than I Was album cover"
        imagePosition="right"
        darkBg={true}
      >
        <h2 className="text-5xl font-bold mb-6">{homePage.albumTitle}</h2>
        {(homePage.albumYear || homePage.albumFormat) && (
          <p className="text-2xl mb-6 text-indigo-700 font-semibold">
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
                <div className="w-1 h-1 bg-indigo-700 rounded-full"></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}
      </SplitScreenImage>

      {/* Performance Image Reveal */}
      <section className="py-24 bg-gradient-to-b from-charcoal-900 to-midnight-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fadeIn">
              <h2 className="text-5xl font-bold text-center text-bone mb-12">
                Live Performances
              </h2>
            </AnimatedSection>
            <ImageRevealScroll
              imageSrc="/images/performance/orpheum-main.jpg"
              imageAlt="Performing at the historic Orpheum Theatre"
              direction="up"
            />
          </div>
        </div>
      </section>

      {/* Floating Image Gallery with Parallax */}
      <section className="bg-gradient-to-b from-midnight-500 via-charcoal-900/50 to-bone py-32">
        <div className="container mx-auto px-4 mb-16">
          <AnimatedSection animation="fadeIn">
            <h2 className="text-5xl font-bold text-center text-bone mb-4">
              Gallery
            </h2>
            <p className="text-xl text-center text-bone/70">
              Moments from the stage and studio
            </p>
          </AnimatedSection>
        </div>
        <FloatingGallery
          images={[
            {
              src: '/images/10386889_666568380058205_4706124177037425882_o.jpg',
              alt: 'Guitar craftsmanship and blues tradition',
              width: 2048,
              height: 1996,
            },
            {
              src: '/images/37124646_10212749349148811_4768331034854948864_o.jpg',
              alt: 'Concert energy and stage presence',
              width: 1952,
              height: 1952,
            },
            {
              src: '/images/16486991_10208279632410298_2503941337142380558_o.jpg',
              alt: 'Intimate blues performance',
              width: 894,
              height: 1440,
            },
            {
              src: '/images/12345438_10100487099276149_1793184209465297962_n.jpg',
              alt: 'Live show atmosphere',
              width: 960,
              height: 846,
            },
            {
              src: '/images/performance/waltz-brewing-promo.jpg',
              alt: 'Waltz Brewing performance',
              width: 1080,
              height: 1080,
            },
            {
              src: '/images/38518091_10212495556928948_4930564546763948032_o.jpg',
              alt: 'Stage performance with guitar',
              width: 1200,
              height: 1071,
            },
            {
              src: '/images/16487687_1351833004875154_191765266250731543_o.jpg',
              alt: 'Wide angle stage shot',
              width: 2048,
              height: 1366,
            },
            {
              src: '/images/blues-kiv.jpg',
              alt: 'Classic blues performance',
              width: 960,
              height: 741,
            },
          ]}
        />
      </section>

      {/* Upcoming Shows Section */}
      {events && events.length > 0 && (
        <section className="py-24 bg-bone">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection animation="fadeIn">
                <div className="flex justify-between items-end mb-12">
                  <h2 className="text-5xl font-bold text-charcoal-900">Upcoming Shows</h2>
                  <Link
                    href="/shows"
                    className="text-midnight-500 font-semibold hover:text-indigo-700 transition-colors"
                  >
                    See all shows →
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
              className="inline-block px-8 py-4 bg-indigo-700 text-charcoal-900 font-bold rounded-lg hover:bg-indigo-600 transition-all transform hover:scale-105 text-lg"
            >
              Schedule Your First Lesson
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
