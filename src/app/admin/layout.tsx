'use client'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/products', label: 'Products', icon: '🛍️' },
  { href: '/admin/orders', label: 'Orders', icon: '📦' },
  { href: '/admin/customers', label: 'Customers', icon: '👥' },
  { href: '/admin/promotions', label: 'Promotions', icon: '🎁' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdminLoggedIn, logout, adminEmail } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isAdminLoggedIn && pathname !== '/admin') {
      router.push('/admin')
    }
  }, [isAdminLoggedIn, pathname, router])

  if (pathname === '/admin') return <>{children}</>
  if (!isAdminLoggedIn) return null

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully!')
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark min-h-screen flex flex-col fixed left-0 top-0 z-40">
        {/* Brand */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="SunMall" width={40} height={40} className="object-contain" />
            <div>
              <h1 className="font-bebas text-2xl text-white tracking-wide leading-none">
                Sun<span className="text-brand-gold">Mall</span>
              </h1>
              <p className="text-gray-400 text-[10px] font-bold tracking-wider">ADMIN PANEL</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                pathname === item.href
                  ? 'bg-brand-green text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white text-xs font-black">A</div>
            <div className="min-w-0">
              <p className="text-white text-xs font-black truncate">Admin</p>
              <p className="text-gray-500 text-[10px] truncate">{adminEmail}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-gray-400 hover:text-white text-xs font-bold py-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
