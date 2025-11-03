import Link from 'next/link'

interface FooterProps {
  navigation?: Array<{title: string; href: string}>
  siteName?: string
  siteTagline?: string
  navigationHeading?: string
  connectHeading?: string
  socialLinks?: Array<{platform: string; url: string}>
  socialFacebookLabel?: string
  socialInstagramLabel?: string
  copyrightText?: string
}

export function Footer({
  navigation,
  siteName,
  siteTagline,
  navigationHeading,
  connectHeading,
  socialLinks,
  socialFacebookLabel,
  socialInstagramLabel,
  copyrightText,
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  const navItems = navigation || [
    {title: 'Shows', href: '/shows'},
    {title: 'Lessons', href: '/lessons'},
    {title: 'Setlist', href: '/setlist'},
    {title: 'Merch', href: '/merch'},
    {title: 'Contact', href: '/contact'},
  ]

  // Fallback social links if not provided from settings
  const defaultSocialLinks = [
    {platform: 'facebook', url: 'https://www.facebook.com/kivettbednar'},
    {platform: 'instagram', url: 'https://www.instagram.com/kivettbednar'},
  ]

  const social = socialLinks && socialLinks.length > 0 ? socialLinks : defaultSocialLinks

  const getPlatformLabel = (platform: string) => {
    const normalized = platform.toLowerCase()
    if (normalized === 'facebook') return socialFacebookLabel || 'Facebook'
    if (normalized === 'instagram') return socialInstagramLabel || 'Instagram'
    // Capitalize first letter as fallback
    return platform.charAt(0).toUpperCase() + platform.slice(1)
  }

  return (
    <footer className="bg-background border-t border-border text-text-primary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-4">{siteName || 'Kivett Bednar'}</h3>
            <p className="text-sm text-text-muted">
              {siteTagline || 'Gritty Texas Blues meets the heart of the Pacific Northwest'}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-text-secondary uppercase tracking-wide">
              {navigationHeading || 'Navigation'}
            </h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-accent-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-text-secondary uppercase tracking-wide">
              {connectHeading || 'Connect'}
            </h4>
            <div className="flex flex-col gap-2">
              {social.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent-primary transition-colors text-sm"
                >
                  {getPlatformLabel(link.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-text-muted">
          <p>
            {copyrightText
              ? copyrightText.replace('{year}', currentYear.toString())
              : `© ${currentYear} Kivett Bednar. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  )
}
