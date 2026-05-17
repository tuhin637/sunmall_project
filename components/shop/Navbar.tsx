'use client'
// components/shop/Navbar.tsx
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useState } from 'react'
import CartDrawer from './CartDrawer'

export default function Navbar() {
  const { getTotalItems, toggleCart } = useCartStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const totalItems = getTotalItems()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Chips' },
    { href: '/about', label: 'About' },
    { href: '/orders', label: 'My Orders' },
  ]

  return (
    <>
      <nav className="sticky top-0 z-50 bg-cream border-b border-black/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="SunMall" width={50} height={50} className="object-contain" />
            <span className="font-display text-2xl font-bold text-dark-green hidden sm:block">
              SunMall
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-10">
            {links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-brand-green transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm text-gray-400 hover:border-brand-green transition-colors">
              <Search size={16} />
              Search
            </button>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative bg-gray-900 text-white rounded-full w-11 h-11 flex items-center justify-center hover:bg-brand-green transition-colors"
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <button
              className="md:hidden ml-1"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden bg-cream border-t border-black/5 px-6 py-4 flex flex-col gap-4">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-bold uppercase tracking-widest text-gray-600 hover:text-brand-green"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <CartDrawer />
    </>
  )
}
