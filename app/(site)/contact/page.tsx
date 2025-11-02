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

      {/* Content */}
      <div className="bg-bone py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-8 md:p-12 border-2 border-charcoal-900/10">
                  <h2 className="text-3xl font-bold mb-8 text-charcoal-900">{contactPage?.formHeading || 'Send a Message'}</h2>
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
              </div>

              {/* Contact Info & Social */}
              <div className="space-y-8">
                {/* Direct Contact */}
                {settings?.contactEmail && (
                  <div className="bg-gradient-to-br from-midnight-500 to-charcoal-900 rounded-2xl p-8 text-bone border-2 border-midnight-600/20">
                    <h2 className="text-2xl font-bold mb-4">{contactPage?.directContactHeading || 'Direct Contact'}</h2>
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="text-midnight-600 hover:text-midnight-700 transition-colors text-lg font-semibold break-all"
                    >
                      {settings.contactEmail}
                    </a>
                  </div>
                )}

                {/* Social Media */}
                {settings?.socialLinks && settings.socialLinks.length > 0 && (
                  <div className="bg-white rounded-2xl p-8 border-2 border-charcoal-900/10">
                    <h2 className="text-2xl font-bold mb-4 text-charcoal-900">{contactPage?.socialHeading || 'Follow Along'}</h2>
                    <div className="space-y-3">
                      {settings.socialLinks.map((link: any) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-midnight-500 hover:text-midnight-600 transition-colors font-semibold capitalize"
                        >
                          <span>→</span>
                          {link.platform}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Links */}
                <div className="bg-white rounded-2xl p-8 border-2 border-charcoal-900/10">
                  <h2 className="text-2xl font-bold mb-4 text-charcoal-900">{contactPage?.quickLinksHeading || 'Quick Links'}</h2>
                  <div className="space-y-3">
                    <Link
                      href="/shows"
                      className="flex items-center gap-3 text-midnight-500 hover:text-midnight-600 transition-colors font-semibold"
                    >
                      <span>→</span>
                      {contactPage?.quickLinkShowsText || 'Upcoming Shows'}
                    </Link>
                    <Link
                      href="/lessons"
                      className="flex items-center gap-3 text-midnight-500 hover:text-midnight-600 transition-colors font-semibold"
                    >
                      <span>→</span>
                      {contactPage?.quickLinkLessonsText || 'Guitar Lessons'}
                    </Link>
                    <Link
                      href="/setlist"
                      className="flex items-center gap-3 text-midnight-500 hover:text-midnight-600 transition-colors font-semibold"
                    >
                      <span>→</span>
                      {contactPage?.quickLinkSetlistText || 'Blues Setlist'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portrait Image Section */}
      <section className="bg-gradient-to-b from-bone to-charcoal-900 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <AnimatedSection animation="fadeIn">
              <h2 className="text-5xl font-bold text-center text-bone mb-16">
                {contactPage?.aboutHeading || 'About Kivett'}
              </h2>
            </AnimatedSection>
            {contactPage?.portraitImage?.asset?.url && (
              <ImageRevealScroll
                imageSrc={contactPage.portraitImage.asset.url}
                imageAlt={contactPage.portraitImage?.alt || 'Kivett Bednar portrait'}
                direction="up"
              />
            )}
          </div>
        </div>
      </section>

      {/* Portrait Grid */}
      <section className="bg-charcoal-900 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {contactPage?.portraitGallery && contactPage.portraitGallery.length > 0 && (
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
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
