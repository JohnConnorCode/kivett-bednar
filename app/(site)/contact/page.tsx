import {Metadata} from 'next'
import Link from 'next/link'
import {ContactForm} from '@/components/ui/ContactForm'
import {client} from '@/sanity/lib/client'
import {contactPageQuery, settingsQuery, uiTextQuery} from '@/sanity/lib/queries'
import {AnimatedHero} from '@/components/ui/AnimatedHero'
import {ImageRevealScroll} from '@/components/ui/ImageRevealScroll'
import {StaggeredImageGrid} from '@/components/ui/StaggeredImageGrid'
import {AnimatedSection} from '@/components/animations/AnimatedSection'

export const metadata: Metadata = {
  title: 'Contact | Kivett Bednar',
  description: 'Get in touch',
}

export default async function ContactPage() {
  const [contactPage, settings, uiText] = await Promise.all([
    client.fetch(contactPageQuery, {}, {next: {revalidate: 60}}),
    client.fetch(settingsQuery, {}, {next: {revalidate: 60}}),
    client.fetch(uiTextQuery, {}, {next: {revalidate: 60}}),
  ])

  return (
    <div className="min-h-screen">
      {/* Animated Hero with Vinyl Record */}
      <AnimatedHero
        title={contactPage?.heroHeading || 'Get in Touch'}
        subtitle={contactPage?.heroSubheading || undefined}
        variant="contact"
        backgroundImage={contactPage?.heroImage?.asset?.url || undefined}
        backgroundAlt={contactPage?.heroImage?.alt || 'Kivett Bednar on stage'}
      />

      {/* Content - Redesigned */}
      <div className="bg-gradient-to-b from-bone via-cream to-bone py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <div>
                <AnimatedSection animation="fadeUp">
                  <div className="bg-white rounded-2xl p-8 md:p-12 border-4 border-vintage-500/20 shadow-2xl">
                    <h2 className="text-4xl font-bold mb-8 text-charcoal-900">{contactPage?.formHeading || 'Send a Message'}</h2>
                    <ContactForm
                      labelName={uiText?.formLabelName || undefined}
                      labelEmail={uiText?.formLabelEmail || undefined}
                      labelSubject={uiText?.formLabelSubject || undefined}
                      labelMessage={uiText?.formLabelMessage || undefined}
                      buttonSubmit={uiText?.formButtonSubmit || undefined}
                      buttonSending={uiText?.formButtonSending || undefined}
                      successMessage={uiText?.formSuccessMessage || undefined}
                    />
                  </div>
                </AnimatedSection>
              </div>

              {/* Contact Info & Social */}
              <div className="space-y-8">
                {/* Direct Contact */}
                {settings?.contactEmail && (
                  <AnimatedSection animation="fadeUp" delay={0.2}>
                    <div className="bg-gradient-to-br from-charcoal-900 to-midnight-500 rounded-2xl p-8 text-bone border-4 border-vintage-500/30 shadow-2xl">
                      <h2 className="text-3xl font-bold mb-4 text-gold-500">{contactPage?.directContactHeading || 'Direct Contact'}</h2>
                      <a
                        href={`mailto:${settings.contactEmail}`}
                        className="text-bone hover:text-vintage-500 transition-colors text-lg font-semibold break-all block mb-6"
                      >
                        {settings.contactEmail}
                      </a>
                      <p className="text-bone/70 text-sm">
                        Whether you&apos;re booking a show, inquiring about lessons, or just want to say hello — I&apos;d love to hear from you.
                      </p>
                    </div>
                  </AnimatedSection>
                )}

                {/* Social Media */}
                {settings?.socialLinks && settings.socialLinks.length > 0 && (
                  <AnimatedSection animation="fadeUp" delay={0.3}>
                    <div className="bg-white rounded-2xl p-8 border-2 border-vintage-500/20 shadow-lg">
                      <h2 className="text-2xl font-bold mb-6 text-charcoal-900">{contactPage?.socialHeading || 'Follow Along'}</h2>
                      <div className="grid grid-cols-2 gap-4">
                        {settings.socialLinks.map((link: any) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-charcoal-900/5 rounded-lg hover:bg-vintage-500/10 border border-transparent hover:border-vintage-500/30 transition-all font-semibold capitalize text-charcoal-900 hover:text-vintage-500"
                          >
                            <span className="text-vintage-500">→</span>
                            {link.platform}
                          </a>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>
                )}

                {/* Call to Action */}
                <AnimatedSection animation="scaleIn" delay={0.4}>
                  <div className="bg-gradient-to-br from-vintage-500 to-vintage-700 rounded-2xl p-8 text-white shadow-2xl">
                    <h3 className="text-2xl font-bold mb-4">Looking for Live Blues?</h3>
                    <p className="mb-6 text-white/90">
                      Check out my upcoming shows and experience gritty Texas Blues meets the heart of the Pacific Northwest.
                    </p>
                    <Link
                      href="/shows"
                      className="inline-block px-8 py-4 bg-white text-vintage-500 font-bold rounded-lg hover:bg-bone transition-all transform hover:scale-105"
                    >
                      View Upcoming Shows →
                    </Link>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Single Gallery Section - Replaces redundant portrait sections */}
      {contactPage?.portraitGallery && contactPage.portraitGallery.length > 0 && (
        <section className="bg-charcoal-900 py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <AnimatedSection animation="fadeIn">
                <h2 className="text-5xl font-bold text-center text-bone mb-16">
                  {contactPage?.aboutHeading || 'Behind the Music'}
                </h2>
              </AnimatedSection>
              <StaggeredImageGrid
                images={contactPage.portraitGallery
                  .filter((img: any) => img.image?.asset?.url)
                  .map((img: any) => ({
                    src: img.image.asset.url,
                    alt: img.alt || img.image?.alt || 'Portrait photo',
                    caption: img.caption || '',
                  }))
                }
                columns={2}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
