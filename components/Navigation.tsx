'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FlaskConical, Menu, X, ShoppingBag, User, LogIn } from 'lucide-react'
import { useCart } from './CartContext'
import { useAuth } from './AuthContext'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '/', label: 'Home' },
  { href: '/find', label: 'Find Yours' },
  { href: '/peptides', label: 'Database' },
  { href: '/suppliers', label: 'Shop' },
  { href: '/stacks', label: 'Stacks' },
  { href: '/compare', label: 'Compare' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { itemCount, setIsOpen } = useCart()
  const { user, loading: authLoading } = useAuth()

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-base-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
              <div className="relative">
                <FlaskConical className="h-6 w-6 sm:h-7 sm:w-7 text-neon-teal transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 blur-lg bg-neon-teal/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-white">
                Peptide<span className="text-neon-teal">Guide</span>
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const active = isActiveLink(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      active
                        ? 'text-neon-teal bg-neon-teal/10 border border-neon-teal/20'
                        : 'text-slate-400 hover:text-white border border-transparent'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            {/* Auth + Theme + Cart + Mobile toggle */}
            <div className="flex items-center gap-0.5">
              {!authLoading && (
                user ? (
                  <Link
                    href="/account"
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white border border-transparent hover:border-white/10 transition-all"
                  >
                    <User className="h-3.5 w-3.5" />
                    <span className="max-w-[120px] truncate">{user.email}</span>
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950 hover:shadow-lg hover:shadow-neon-teal/20 transition-all"
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    Sign In
                  </Link>
                )
              )}
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-slate-400 hover:text-white transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] rounded-full bg-neon-teal text-base-950 text-[9px] font-bold flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 -mr-2 text-slate-400 hover:text-white"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/5 bg-base-950/98 backdrop-blur-xl">
            <div className="px-4 py-2 space-y-0.5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActiveLink(link.href)
                      ? 'text-neon-teal bg-neon-teal/10'
                      : 'text-slate-400 hover:text-white active:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/5 mt-1 pt-1">
                {user ? (
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white active:bg-white/5 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    My Account
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-medium text-neon-teal active:bg-neon-teal/10 transition-colors"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-14 sm:h-16" />
    </>
  )
}
