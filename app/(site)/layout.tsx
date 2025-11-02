import {type ReactNode} from 'react'
import {client} from '@/sanity/lib/client'
import {settingsQuery, uiTextQuery} from '@/sanity/lib/queries'
import {Header} from '@/components/ui/Header'
import {Footer} from '@/components/ui/Footer'

export default async function SiteLayout({
  children,
}: {
  children: ReactNode
}) {
  const [settings, uiText] = await Promise.all([
    client.fetch(settingsQuery, {}, {next: {revalidate: 60}}),
    client.fetch(uiTextQuery, {}, {next: {revalidate: 60}}),
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
    </>
  )
}
