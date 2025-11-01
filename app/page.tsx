import {Metadata} from 'next'
import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import {upcomingEventsQuery} from '@/sanity/lib/queries'
import {EventCard} from '@/components/ui/EventCard'
import {HeroSlider} from '@/components/ui/HeroSlider'

export const metadata: Metadata = {
  title: 'Kivett Bednar | Blues Guitarist & Musician',
  description: 'Gritty Texas Blues meets the heart of the Pacific Northwest',
}

export default async function HomePage() {
  // Fetch upcoming shows for display
  const {data: events} = await sanityFetch({
    query: upcomingEventsQuery,
    params: {
      now: new Date().toISOString(),
      limit: 3,
    },
  })

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* About Section */}
      <section className="py-24 bg-bone">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl font-bold mb-6 text-charcoal-900">
                  Musician, Amp Maker, Artist
                </h2>
                <p className="text-xl mb-6 leading-relaxed text-charcoal-900/80">
                  Out of Austin, TX and Portland, OR, Kivett Bednar brings authentic blues with
                  raw emotion and technical mastery. Twenty years of experience teaching at
                  Berklee College of Music, performing, and crafting custom amplifiers.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/setlist"
                    className="text-midnight-500 font-semibold hover:text-amber-600 transition-colors flex items-center gap-2"
                  >
                    View Setlist
                    <span>→</span>
                  </Link>
                </div>
              </div>
              <div className="relative bg-gradient-to-br from-midnight-500 to-charcoal-900 rounded-lg aspect-square flex items-center justify-center overflow-hidden border border-amber-600/20">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(45deg, transparent 45%, rgba(240,200,62,0.1) 50%, transparent 55%)',
                    backgroundSize: '20px 20px'
                  }} />
                </div>
                <div className="text-center p-8 relative z-10">
                  <div className="text-bone/40 text-sm uppercase tracking-widest">Photo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Album/Music Section */}
      <section className="py-24 bg-charcoal-900 text-bone">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-center">Land of the Living</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative bg-midnight-500/30 rounded-lg aspect-square flex items-center justify-center border-2 border-amber-600/30 overflow-hidden">
                <div className="absolute inset-0">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at center, rgba(240,200,62,0.05) 0%, transparent 70%)',
                  }} />
                </div>
                <div className="text-center p-8 relative z-10">
                  <div className="w-32 h-32 mx-auto border-2 border-bone/20 rounded-full flex items-center justify-center mb-4">
                    <div className="text-bone/40 text-sm uppercase tracking-widest">Vinyl</div>
                  </div>
                  <p className="text-bone/60 text-sm uppercase tracking-wide">Land of the Living</p>
                </div>
              </div>
              <div>
                <p className="text-2xl mb-6 text-amber-600 font-semibold">
                  2014 • Limited Edition Red Vinyl
                </p>
                <p className="text-lg mb-8 leading-relaxed text-bone/80">
                  A journey through classic blues standards and original compositions,
                  recorded live with the raw energy and authenticity that defines
                  Pacific Northwest blues.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-amber-600 rounded-full"></div>
                    <span>Classic blues interpretations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-amber-600 rounded-full"></div>
                    <span>Live studio recordings</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-amber-600 rounded-full"></div>
                    <span>Limited red vinyl pressing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Shows Section */}
      {events && events.length > 0 && (
        <section className="py-24 bg-bone">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-end mb-12">
                <h2 className="text-5xl font-bold text-charcoal-900">Upcoming Shows</h2>
                <Link
                  href="/shows"
                  className="text-midnight-500 font-semibold hover:text-amber-600 transition-colors"
                >
                  See all shows →
                </Link>
              </div>
              <div className="grid gap-8">
                {events.slice(0, 3).map((event: any) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-midnight-500 to-charcoal-900 text-bone">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Learn the Blues</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-bone/80">
            Twenty years teaching experience. Berklee graduate.
            Learn guitar, blues, and music theory from a professional.
          </p>
          <Link
            href="/lessons"
            className="inline-block px-8 py-4 bg-amber-600 text-charcoal-900 font-bold rounded-lg hover:bg-amber-500 transition-all transform hover:scale-105 text-lg"
          >
            Schedule Your First Lesson
          </Link>
        </div>
      </section>
    </div>
  )
}
