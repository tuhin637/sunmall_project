'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')

  const handleSubscribe = () => {
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email!')
      return
    }
    toast.success('Subscribed! Get ready for crispy deals 🎉')
    setEmail('')
  }

  return (
    <section className="py-16 px-6 lg:px-12 bg-cream">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-green rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden"
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

          <div className="relative z-10">
            <p className="text-green-200 text-xs font-black tracking-[4px] uppercase mb-3">Newsletter</p>
            <h2 className="font-bebas text-5xl text-white tracking-wide mb-4">
              Get Crispy Deals<br />In Your Inbox
            </h2>
            <p className="text-green-100 text-sm mb-8 max-w-md mx-auto">
              Subscribe for exclusive offers, new flavour launches, and early access to limited edition packs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                placeholder="your@email.com"
                className="flex-1 bg-white rounded-full px-6 py-4 text-sm font-bold text-brand-dark outline-none focus:ring-2 focus:ring-brand-gold"
              />
              <button
                onClick={handleSubscribe}
                className="bg-brand-dark text-white font-black text-sm tracking-wide uppercase px-8 py-4 rounded-full hover:bg-brand-gold hover:text-brand-dark transition-all whitespace-nowrap"
              >
                Subscribe →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
