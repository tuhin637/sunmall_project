'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, ShoppingCart, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { navLinks } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const pathname = usePathname()
  const { getTotalItems, toggleCart } = useCartStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const totalItems = getTotalItems()

  return (
    <nav className="sticky top-0 z-50 bg-cream border-b border-black/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="SunMall Logo"
            width={52}
            height={52}
            className="object-contain"
          />
          <span className="font-bebas text-3xl tracking-wide text-brand-dark leading-none">
            Sun<span className="text-brand-green">Mall</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'nav-link text-xs font-black tracking-widest text-brand-dark transition-colors hover:text-brand-green-light',
                  pathname === link.href && 'active text-brand-green-light'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button className="hidden md:flex items-center gap-2 bg-brand-dark text-white rounded-full px-5 py-2.5 text-xs font-bold tracking-wide hover:bg-brand-green transition-colors">
            <Search size={14} />
            Search
          </button>

          {/* Cart */}
          <button
            onClick={toggleCart}
            className="relative bg-brand-dark text-white rounded-full w-11 h-11 flex items-center justify-center hover:bg-brand-green transition-colors"
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-brand-dark"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-black/5 px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-sm font-black tracking-widest text-brand-dark hover:text-brand-green-light border-b border-black/5 last:border-0"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
