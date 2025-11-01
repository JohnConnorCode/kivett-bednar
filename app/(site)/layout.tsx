import {type ReactNode} from 'react'
import {Header} from '@/components/ui/Header'
import {Footer} from '@/components/ui/Footer'

export default function SiteLayout({children}: {children: ReactNode}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
