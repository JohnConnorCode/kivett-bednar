import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import {navigationQuery} from '@/sanity/lib/queries'

export async function Footer() {
  const {data: navigation} = await sanityFetch({
    query: navigationQuery,
  })

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-4">Kivett Bednar</h3>
            <p className="text-sm text-muted-foreground">
              Gritty Texas Blues meets the heart of the Pacific Northwest
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navigation?.footer?.map((item: any, idx: number) => {
                const href = item.docRef
                  ? `/${item.docRef.slug}`
                  : item.href || '#'

                return (
                  <li key={idx}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Social - TODO: Add from settings */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {/* Placeholder social links */}
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Facebook
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Kivett Bednar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
