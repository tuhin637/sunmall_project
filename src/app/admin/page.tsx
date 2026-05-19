'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@sunmall.com')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const router = useRouter()

  const handleLogin = async () => {
    if (!email || !password) { toast.error('Fill in all fields!'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const success = login(email, password)
    setLoading(false)
    if (success) {
      toast.success('Welcome back, Admin! 🎉')
      router.push('/admin/dashboard')
    } else {
      toast.error('Wrong credentials! Try sunmall123')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-cream to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <Image src="/images/logo.png" alt="SunMall" width={72} height={72} className="object-contain" />
          </div>
          <h1 className="font-bebas text-4xl text-brand-dark tracking-wide">
            Sun<span className="text-brand-green">Mall</span> Admin
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-semibold">Dashboard Login</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h2 className="font-black text-xl text-brand-dark mb-6">Sign In</h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-black text-gray-500 tracking-widest uppercase block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-brand-green transition-colors"
                placeholder="admin@sunmall.com"
              />
            </div>
            <div>
              <label className="text-xs font-black text-gray-500 tracking-widest uppercase block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-brand-green transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-700 font-semibold">
              💡 Demo: email = admin@sunmall.com / password = sunmall123
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-brand-dark text-white font-black py-4 rounded-full text-sm tracking-widest uppercase hover:bg-brand-green transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6 font-semibold">
          © 2024 SunMall Food Brand. Admin Panel.
        </p>
      </div>
    </div>
  )
}
