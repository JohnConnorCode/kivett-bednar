import {Metadata} from 'next'
import Link from 'next/link'
import {ContactForm} from '@/components/ui/ContactForm'

export const metadata: Metadata = {
  title: 'Contact | Kivett Bednar',
  description: 'Get in touch',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-midnight-500 via-charcoal-900 to-midnight-500">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(240,200,62,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-bone">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed text-bone/90">
            Booking, lessons, collaborations, or just to say hello
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" className="w-full h-12 text-bone">
            <path d="M0,0 Q300,40 600,20 T1200,0 L1200,120 L0,120 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

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
                <div className="bg-gradient-to-br from-midnight-500 to-charcoal-900 rounded-2xl p-8 text-bone border-2 border-amber-600/20">
                  <h2 className="text-2xl font-bold mb-4">Direct Contact</h2>
                  <a
                    href="mailto:kivettbednar@gmail.com"
                    className="text-amber-600 hover:text-amber-500 transition-colors text-lg font-semibold break-all"
                  >
                    kivettbednar@gmail.com
                  </a>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-2xl p-8 border-2 border-charcoal-900/10">
                  <h2 className="text-2xl font-bold mb-4 text-charcoal-900">Follow Along</h2>
                  <div className="space-y-3">
                    <a
                      href="https://www.facebook.com/kivettbednar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-midnight-500 hover:text-amber-600 transition-colors font-semibold"
                    >
                      <span>→</span>
                      Facebook
                    </a>
                    <a
                      href="https://www.instagram.com/kivettbednar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-midnight-500 hover:text-amber-600 transition-colors font-semibold"
                    >
                      <span>→</span>
                      Instagram
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-2xl p-8 border-2 border-charcoal-900/10">
                  <h2 className="text-2xl font-bold mb-4 text-charcoal-900">Quick Links</h2>
                  <div className="space-y-3">
                    <Link
                      href="/shows"
                      className="flex items-center gap-3 text-midnight-500 hover:text-amber-600 transition-colors font-semibold"
                    >
                      <span>→</span>
                      Upcoming Shows
                    </Link>
                    <Link
                      href="/lessons"
                      className="flex items-center gap-3 text-midnight-500 hover:text-amber-600 transition-colors font-semibold"
                    >
                      <span>→</span>
                      Guitar Lessons
                    </Link>
                    <Link
                      href="/setlist"
                      className="flex items-center gap-3 text-midnight-500 hover:text-amber-600 transition-colors font-semibold"
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
    </div>
  )
}
