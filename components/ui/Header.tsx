'use client'

import Link from 'next/link'
import {useState} from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    {title: 'Shows', href: '/shows'},
    {title: 'Lessons', href: '/lessons'},
    {title: 'Setlist', href: '/setlist'},
    {title: 'Merch', href: '/merch'},
    {title: 'Contact', href: '/contact'},
  ]

  return (
    <header className="bg-charcoal-900 border-b border-amber-600/20 sticky top-0 z-50 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-bone hover:text-amber-600 transition-colors tracking-tight">
            KIVETT BEDNAR
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-bone/80 hover:text-amber-600 transition-colors font-medium uppercase tracking-wider text-sm"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-bone"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-amber-600/20 mt-2 pt-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-bone/80 hover:text-amber-600 transition-colors font-medium uppercase tracking-wider text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
