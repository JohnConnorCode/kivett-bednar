import Link from 'next/link'

export async function Footer() {
  const navigation = [
    {title: 'Shows', href: '/shows'},
    {title: 'Lessons', href: '/lessons'},
    {title: 'Setlist', href: '/setlist'},
    {title: 'Merch', href: '/merch'},
    {title: 'Contact', href: '/contact'},
  ]

  return (
    <footer className="bg-charcoal-900 border-t border-sky-500/20 text-bone">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-4">Kivett Bednar</h3>
            <p className="text-sm text-bone/60">
              Gritty Texas Blues meets the heart of the Pacific Northwest
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-sky-500 uppercase tracking-wide">Navigation</h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-bone/70 hover:text-sky-500 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-sky-500 uppercase tracking-wide">Connect</h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.facebook.com/kivettbednar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bone/70 hover:text-sky-500 transition-colors text-sm"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/kivettbednar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bone/70 hover:text-sky-500 transition-colors text-sm"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-sky-500/20 text-center text-sm text-bone/50">
          <p>&copy; {new Date().getFullYear()} Kivett Bednar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
