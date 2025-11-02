import {type ReactNode} from 'react'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery, uiTextQuery} from '@/sanity/lib/queries'
import {Header} from '@/components/ui/Header'
import {Footer} from '@/components/ui/Footer'

export default async function SiteLayout({
  children,
}: {
  children: ReactNode
}) {
  const [{data: settings}, {data: uiText}] = await Promise.all([
    sanityFetch({query: settingsQuery}),
    sanityFetch({query: uiTextQuery}),
  ])

  const navigation = [
    {title: uiText?.navShows || 'Shows', href: '/shows'},
    {title: uiText?.navLessons || 'Lessons', href: '/lessons'},
    {title: uiText?.navSetlist || 'Setlist', href: '/setlist'},
    {title: uiText?.navMerch || 'Merch', href: '/merch'},
    {title: uiText?.navContact || 'Contact', href: '/contact'},
  ]

  return (
    <>
      <Header siteName={uiText?.siteName} navigation={navigation} />
      <main>{children}</main>
      <Footer
        navigation={navigation}
        siteName={uiText?.siteName}
        siteTagline={uiText?.siteTagline}
        navigationHeading={uiText?.footerNavigationHeading}
        connectHeading={uiText?.footerConnectHeading}
        socialLinks={settings?.socialLinks}
        socialFacebookLabel={uiText?.socialFacebook}
        socialInstagramLabel={uiText?.socialInstagram}
        copyrightText={uiText?.footerCopyrightText}
      />
    </>
  )
}
