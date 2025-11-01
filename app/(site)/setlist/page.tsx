import {Metadata} from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blues Set List | Kivett Bednar',
  description: 'A collection of classic blues songs',
}

const songs = [
  {title: 'Smokestack Lightning', key: 'C#'},
  {title: 'Champagne and Reefer', key: 'A'},
  {title: 'Shake For Me', key: 'G'},
  {title: 'I Just Want to Make Love to You', key: 'A'},
  {title: 'The Sky is Crying', key: 'C'},
  {title: 'Boom Boom', key: 'E'},
  {title: 'Stormy Monday', key: 'G'},
  {title: 'Sweet Home Chicago', key: 'E'},
  {title: 'Pride and Joy', key: 'E'},
  {title: 'Texas Flood', key: 'G'},
  {title: 'Crossroads', key: 'A'},
  {title: 'Born Under a Bad Sign', key: 'C#'},
  {title: 'Hideaway', key: 'E'},
  {title: 'Got My Mojo Working', key: 'A'},
  {title: 'Key to the Highway', key: 'A'},
  {title: 'Further on Up the Road', key: 'E'},
  {title: 'The Thrill is Gone', key: 'Bm'},
  {title: 'Red House', key: 'B'},
  {title: 'Killing Floor', key: 'A'},
  {title: 'Hoochie Coochie Man', key: 'A'},
  {title: 'Five Long Years', key: 'C'},
  {title: 'Help Me', key: 'D'},
  {title: 'Every Day I Have the Blues', key: 'F'},
  {title: 'Messin\' with the Kid', key: 'E'},
  {title: 'Reconsider Baby', key: 'C'},
  {title: 'Before You Accuse Me', key: 'E'},
  {title: 'Have You Ever Loved a Woman', key: 'Gm'},
]

export default function SetlistPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-charcoal-900 via-midnight-500 to-charcoal-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(240,200,62,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-bone">
          <div className="text-6xl mb-6">♫</div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            Blues Setlist
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed text-amber-600 font-light">
            27 timeless classics from the great American songbook
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" className="w-full h-12 text-bone">
            <path d="M0,0 Q300,40 600,20 T1200,0 L1200,120 L0,120 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Content Section */}
      <div className="bg-bone py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Intro text */}
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-2xl text-charcoal-900/80 leading-relaxed">
                A carefully curated collection of blues standards, from Chicago electric to
                Texas roadhouse. Each song arranged in its authentic key for maximum soul.
              </p>
            </div>

            {/* Songs Grid */}
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-6">
              {songs.map((song, index) => (
                <div
                  key={index}
                  className="group relative"
                >
                  <div className="flex items-baseline justify-between py-4 border-b-2 border-charcoal-900/10 group-hover:border-amber-600/50 transition-all duration-300">
                    <div className="flex items-baseline gap-4">
                      <span className="text-charcoal-900/40 font-mono text-sm w-8">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="text-xl font-semibold text-charcoal-900 group-hover:text-midnight-500 transition-colors">
                        {song.title}
                      </span>
                    </div>
                    <span className="text-lg font-mono text-amber-600 font-bold ml-4 shrink-0">
                      {song.key}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-24 relative">
              <div className="bg-gradient-to-br from-midnight-500 to-charcoal-900 rounded-2xl p-12 text-center text-bone border-2 border-amber-600/20">
                <div className="text-5xl mb-6">🎸</div>
                <h2 className="text-4xl font-bold mb-4">
                  Want to learn these classics?
                </h2>
                <p className="text-xl text-bone/80 mb-8 max-w-2xl mx-auto">
                  Master authentic blues guitar with professional instruction.
                  Learn technique, phrasing, and improvisation from a Berklee graduate.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/lessons"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-amber-600 text-charcoal-900 font-bold hover:bg-amber-500 transition-all transform hover:scale-105"
                  >
                    Book a Lesson
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-bone text-bone font-semibold hover:bg-bone/10 transition-all"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
