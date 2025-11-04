import {type ReactNode} from 'react'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery, uiTextQuery} from '@/sanity/lib/queries'
import {Header} from '@/components/ui/Header'
import {CartProvider} from '@/components/ui/CartContext'
import {Footer} from '@/components/ui/Footer'

export default async function SiteLayout({
  children,
}: {
  children: ReactNode
}) {
  const [settings, uiText] = await Promise.all([
    sanityFetch({query: settingsQuery}).then((r) => r.data),
    sanityFetch({query: uiTextQuery}).then((r) => r.data),
  ])

  const navigation = [
    {title: uiText?.navShows || 'Shows', href: '/shows'},
    {title: uiText?.navLessons || 'Lessons', href: '/lessons'},
    {title: uiText?.navSetlist || 'Setlist', href: '/setlist'},
    {title: uiText?.navMerch || 'Merch', href: '/merch'},
    {title: uiText?.navContact || 'Contact', href: '/contact'},
  ]

  return (
    <CartProvider>
      <Header siteName={uiText?.siteName || undefined} navigation={navigation} />
      <main>{children}</main>
      <Footer
        navigation={navigation}
        siteName={uiText?.siteName || undefined}
        siteTagline={uiText?.siteTagline || undefined}
        navigationHeading={uiText?.footerNavigationHeading || undefined}
        connectHeading={uiText?.footerConnectHeading || undefined}
        socialLinks={(settings?.socialLinks?.filter((link) =>
          link.platform !== null && link.url !== null
        ) as Array<{platform: string; url: string}> | undefined) || undefined}
        socialFacebookLabel={uiText?.socialFacebook || undefined}
        socialInstagramLabel={uiText?.socialInstagram || undefined}
        copyrightText={uiText?.footerCopyrightText || undefined}
      />
    </CartProvider>
  )
}
