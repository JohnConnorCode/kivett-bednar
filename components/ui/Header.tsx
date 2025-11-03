'use client'

import Link from 'next/link'
import {useState, useEffect} from 'react'
import {usePathname} from 'next/navigation'

interface HeaderProps {
  siteName?: string
  navigation?: Array<{title: string; href: string}>
}

export function Header({siteName, navigation}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    setMounted(true)
  }, [])

  // Fallback navigation if not provided from CMS
  const navItems = navigation || [
    {title: 'Shows', href: '/shows'},
    {title: 'Lessons', href: '/lessons'},
    {title: 'Setlist', href: '/setlist'},
    {title: 'Merch', href: '/merch'},
    {title: 'Contact', href: '/contact'},
  ]

  const logoText = siteName || 'KIVETT BEDNAR'

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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-out ${
        isScrolled ? 'shadow-lg shadow-black/50' : ''
      }`}
      style={{
        backgroundColor: isScrolled
          ? 'rgba(26, 26, 26, 0.95)' // surface/95 - Dark cinematic
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(61, 61, 61, 0.3)' : 'none', // border color
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - White text with strong shadow for visibility over images */}
          <Link
            href="/"
            className={`text-2xl font-bold tracking-tight transition-all duration-500 text-white hover:text-accent-primary ${
              !mounted || (isHomePage && !isScrolled) ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            style={{
              textShadow: isScrolled
                ? '0 1px 2px rgba(0,0,0,0.5)'
                : '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.5)'
            }}
          >
            {logoText}
          </Link>

          {/* Desktop Navigation - Dark cinematic theme */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium uppercase tracking-wider text-sm transition-all duration-300 ${
                  isScrolled
                    ? 'text-white/90 hover:text-accent-primary'
                    : 'text-white hover:text-accent-primary'
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

        {/* Mobile Navigation - Enhanced glassy background when open */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-border/30 mt-2 pt-4 -mx-4 px-4" style={{
            background: 'rgba(26, 26, 26, 0.95)',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            isolation: 'isolate'
          }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-white/90 hover:text-accent-primary transition-colors font-medium uppercase tracking-wider text-sm"
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
