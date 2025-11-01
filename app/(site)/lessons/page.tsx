import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Lessons | Kivett Bednar',
  description: 'Guitar and blues music lessons',
}

export default function LessonsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-midnight-500 via-charcoal-900 to-midnight-500">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(240,200,62,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-bone">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            Guitar Lessons
          </h1>
          <p className="text-2xl md:text-3xl max-w-3xl mx-auto leading-relaxed text-amber-600 font-light mb-8">
            Learn blues, theory, and improvisation from a Berklee graduate
          </p>
          <p className="text-xl text-bone/80 max-w-2xl mx-auto">
            Twenty years teaching experience • <em>Magna cum laude</em>
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" className="w-full h-12 text-bone">
            <path d="M0,0 Q300,40 600,20 T1200,0 L1200,120 L0,120 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-bone py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Teaching Philosophy */}
            <div className="grid lg:grid-cols-2 gap-16 mb-24">
              <div>
                <h2 className="text-5xl font-bold mb-8 text-charcoal-900">
                  My Approach
                </h2>
                <div className="space-y-6 text-xl text-charcoal-900/80 leading-relaxed">
                  <p>
                    We&apos;ll start at the beginning to make sure that your musical foundations are solid,
                    and then we&apos;ll take a tour through Western harmony.
                  </p>
                  <p>
                    You&apos;ll understand music from a perspective that transcends your instrument,
                    giving you the tools to grow as a musician for the rest of your life.
                  </p>
                  <p className="text-2xl font-semibold text-midnight-500 pt-4">
                    &ldquo;Music is a language. Let&apos;s learn to speak it fluently.&rdquo;
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-midnight-500 to-charcoal-900 rounded-2xl p-12 text-bone flex flex-col justify-center border-2 border-amber-600/20">
                <h3 className="text-3xl font-bold mb-6">Ready to Start?</h3>
                <p className="text-lg mb-8 text-bone/80">
                  Schedule your first lesson and begin your musical journey.
                </p>
                <div className="space-y-4">
                  <a
                    href="mailto:kivettbednar@gmail.com"
                    className="block text-center px-8 py-4 rounded-lg bg-amber-600 text-charcoal-900 font-bold hover:bg-amber-500 transition-all transform hover:scale-105"
                  >
                    Email Me
                  </a>
                  <a
                    href="https://helpwith.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center px-8 py-4 rounded-lg border-2 border-bone text-bone font-semibold hover:bg-bone/10 transition-all"
                  >
                    Schedule on Helpwith.co
                  </a>
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-2xl p-12 border-2 border-charcoal-900/10">
              <h2 className="text-4xl font-bold mb-12 text-center text-charcoal-900">
                What You&apos;ll Learn
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Blues Techniques',
                    desc: 'Authentic phrasing, bending, vibrato, and the feel that makes blues come alive'
                  },
                  {
                    title: 'Music Theory',
                    desc: 'Western harmony fundamentals that work across all genres and instruments'
                  },
                  {
                    title: 'Improvisation',
                    desc: 'Develop your ear and learn to express yourself spontaneously through music'
                  },
                  {
                    title: 'Composition',
                    desc: 'Songwriting techniques and arranging skills to create your own music'
                  },
                  {
                    title: 'Ear Training',
                    desc: 'Recognize intervals, chords, and progressions by ear'
                  },
                  {
                    title: 'Musical Concepts',
                    desc: 'Instrument-agnostic understanding that transcends technical ability\n'
                  },
                ].map((item, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-midnight-500/20 flex items-center justify-center text-midnight-500 font-bold text-lg group-hover:border-amber-600 group-hover:text-amber-600 transition-colors">
                      {index + 1}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-charcoal-900">{item.title}</h3>
                    <p className="text-charcoal-900/70 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Credentials Banner */}
            <div className="mt-16 bg-gradient-to-r from-midnight-500/10 to-amber-600/10 rounded-2xl p-8 border-2 border-midnight-500/20">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
                <div>
                  <h3 className="text-2xl font-bold text-charcoal-900 mb-2">
                    Berklee College of Music
                  </h3>
                  <p className="text-xl text-charcoal-900/70">
                    Graduated <em>magna cum laude</em> • 20 years teaching experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
