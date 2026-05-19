'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePromotionStore } from '@/store/promotionStore'
import Link from 'next/link'

export default function FlashSaleBanner() {
  const { flashSale } = usePromotionStore()
  const [countdown, setCountdown] = useState('')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!flashSale?.isActive) return
    const tick = () => {
      const diff = new Date(flashSale.endsAt).getTime() - Date.now()
      if (diff <= 0) { setCountdown(''); return }
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setCountdown(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`)
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [flashSale])

  if (!flashSale?.isActive || !visible || !countdown) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="relative bg-gradient-to-r from-red-500 via-orange-500 to-red-500 text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bebas text-xl tracking-wide">⚡ {flashSale.title}</span>
            <span className="bg-white/20 font-black text-sm px-3 py-0.5 rounded-full">
              {flashSale.discount}% OFF
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-black opacity-80">ENDS IN:</span>
            <span className="font-mono font-black text-lg tracking-widest bg-white/20 px-4 py-1 rounded-full">
              {countdown}
            </span>
            <Link href="/chips"
              className="bg-white text-red-500 font-black text-xs px-4 py-1.5 rounded-full hover:bg-cream transition-colors">
              Shop Now →
            </Link>
          </div>
          <button onClick={() => setVisible(false)}
            className="text-white/70 hover:text-white font-black text-lg absolute right-4 top-1/2 -translate-y-1/2">
            ×
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
