import {Metadata} from 'next'
import Link from 'next/link'
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

      {/* Content - Simplified Contact Info Only */}
      <div className="bg-gradient-to-b from-surface via-surface-elevated to-surface py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
                {/* Direct Contact */}
                {settings?.contactEmail && (
                  <AnimatedSection animation="fadeUp" delay={0.2}>
                    <div className="bg-gradient-to-br from-surface to-surface-elevated rounded-2xl p-8 text-text-primary border-4 border-accent-primary/30 shadow-2xl">
                      <h2 className="text-3xl font-bold mb-4 text-accent-primary">{contactPage?.directContactHeading || 'Direct Contact'}</h2>
                      <a
                        href={`mailto:${settings.contactEmail}`}
                        className="text-text-primary hover:text-accent-primary transition-colors text-lg font-semibold break-all block mb-6"
                      >
                        {settings.contactEmail}
                      </a>
                      <p className="text-text-secondary text-sm">
                        {contactPage?.directContactDescription || "Whether you're booking a show, inquiring about lessons, or just want to say hello — I'd love to hear from you."}
                      </p>
                    </div>
                  </AnimatedSection>
                )}

                {/* Social Media */}
                {settings?.socialLinks && settings.socialLinks.length > 0 && (
                  <AnimatedSection animation="fadeUp" delay={0.3}>
                    <div className="bg-surface-elevated rounded-2xl p-8 border-2 border-accent-primary/20 shadow-lg">
                      <h2 className="text-2xl font-bold mb-6 text-text-primary">{contactPage?.socialHeading || 'Follow Along'}</h2>
                      <div className="grid grid-cols-2 gap-4">
                        {settings.socialLinks.map((link: any) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-surface rounded-lg hover:bg-surface-elevated border border-border hover:border-accent-primary/50 transition-all font-semibold capitalize text-text-primary hover:text-accent-primary"
                          >
                            <span className="text-accent-primary">→</span>
                            {link.platform}
                          </a>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>
                )}

              {/* Call to Action */}
              <AnimatedSection animation="fadeUp" delay={0.4}>
                <div className="bg-surface rounded-2xl p-8 border-2 border-accent-primary/20 text-center shadow-2xl">
                  <h3 className="text-2xl font-bold mb-4 text-text-primary">
                    {contactPage?.ctaSectionHeading || 'Looking for Live Blues?'}
                  </h3>
                  <p className="mb-6 text-text-secondary">
                    {contactPage?.ctaSectionText || 'Check out my upcoming shows and experience gritty Texas Blues meets the heart of the Pacific Northwest.'}
                  </p>
                  <Link
                    href="/shows"
                    className="btn-primary"
                  >
                    {contactPage?.ctaSectionButtonText || 'View Upcoming Shows'} →
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>

      {/* Single Gallery Section - Replaces redundant portrait sections */}
      {(() => {
        const validImages = contactPage?.portraitGallery
          ?.filter((img: any) => img.image?.asset?.url)
          .map((img: any) => ({
            src: img.image.asset.url,
            alt: img.alt || img.image?.alt || 'Portrait photo',
            caption: img.caption || '',
          })) || []

        return validImages.length > 0 ? (
          <section className="bg-background py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <AnimatedSection animation="fadeIn">
                  <h2 className="text-5xl font-bold text-center text-text-primary mb-16">
                    {contactPage?.aboutHeading || 'Behind the Music'}
                  </h2>
                </AnimatedSection>
                <StaggeredImageGrid
                  images={validImages}
                  columns={2}
                />
              </div>
            </div>
          </section>
        ) : null
      })()}
    </div>
  )
}
