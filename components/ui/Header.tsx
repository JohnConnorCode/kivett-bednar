import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import {navigationQuery} from '@/sanity/lib/queries'

export async function Header() {
  const {data: navigation} = await sanityFetch({
    query: navigationQuery,
  })

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Kivett Bednar
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation?.main?.map((item: any, idx: number) => {
              const href = item.docRef
                ? `/${item.docRef.slug}`
                : item.href || '#'

              return (
                <Link
                  key={idx}
                  href={href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>

          {/* Mobile menu button - TODO: Add mobile menu */}
          <button className="md:hidden">
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
