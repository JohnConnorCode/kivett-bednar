'use client'

import Link from 'next/link'
import {useState, useEffect} from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navigation = [
    {title: 'Shows', href: '/shows'},
    {title: 'Lessons', href: '/lessons'},
    {title: 'Setlist', href: '/setlist'},
    {title: 'Merch', href: '/merch'},
    {title: 'Contact', href: '/contact'},
  ]

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-charcoal-900 border-b border-blue-600/20 backdrop-blur-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - White text with strong shadow for visibility over images */}
          <Link
            href="/"
            className={`text-2xl font-bold tracking-tight transition-all duration-300 ${
              isScrolled
                ? 'text-white hover:text-blue-400'
                : 'text-white hover:text-blue-300'
            }`}
            style={{
              textShadow: isScrolled
                ? '0 1px 2px rgba(0,0,0,0.5)'
                : '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.5)'
            }}
          >
            KIVETT BEDNAR
          </Link>

          {/* Desktop Navigation - Adaptive text color */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium uppercase tracking-wider text-sm transition-all duration-300 ${
                  isScrolled
                    ? 'text-white/90 hover:text-blue-400'
                    : 'text-white hover:text-blue-300'
                }`}
                style={{
                  textShadow: isScrolled
                    ? '0 1px 2px rgba(0,0,0,0.3)'
                    : '0 1px 3px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.5)'
                }}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button - Always white for visibility */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              textShadow: isScrolled
                ? '0 1px 2px rgba(0,0,0,0.5)'
                : '0 2px 4px rgba(0,0,0,0.8)'
            }}
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

        {/* Mobile Navigation - Solid background when open */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-blue-600/20 mt-2 pt-4 bg-charcoal-900/95 backdrop-blur-lg -mx-4 px-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-white/90 hover:text-blue-400 transition-colors font-medium uppercase tracking-wider text-sm"
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
