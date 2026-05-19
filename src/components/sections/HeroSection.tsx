'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useProductStore } from '@/store/productStore'
import { usePromotionStore } from '@/store/promotionStore'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

const features = [
  { icon: '🌶️', title: 'EXTRA CHILI', desc: 'Bold heat crafted for spice lovers who crave intensity.', bg: '#2D7A3A' },
  { icon: '🍗', title: 'BOLD FLAVOUR', desc: 'Artisanal flavor dusting with extra energy and unique blends.', bg: '#E53935' },
  { icon: '🔥', title: 'SMOKEY SIDE', desc: 'Deep smoky notes reminiscent of traditional slow-fire cooking.', bg: '#F9A825' },
]

export default function HeroSection() {
  const [qty, setQty] = useState(2)
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const { addItem } = useCartStore()
  const { products } = useProductStore()
  const { flashSale } = usePromotionStore()

  const slides = products.filter(p => p.inStock)

  // Auto-slide every 3.5 seconds
  useEffect(() => {
    if (slides.length < 2) return
    const t = setInterval(() => {
      setDirection(1)
      setCurrent(c => (c + 1) % slides.length)
    }, 3500)
    return () => clearInterval(t)
  }, [slides.length])

  const go = (dir: number) => {
    setDirection(dir)
    setCurrent(c => (c + dir + slides.length) % slides.length)
  }

  const heroProduct = slides[current]
  if (!heroProduct) return null

  const displayPrice = flashSale?.isActive
    ? heroProduct.price * (1 - flashSale.discount / 100)
    : heroProduct.price

  const handleAddToCart = () => {
    addItem(heroProduct, qty)
    toast.success(`${qty}× ${heroProduct.name} added to cart! 🛒`)
  }

  return (
    <section className="relative overflow-hidden bg-cream min-h-[92vh] flex items-center">

      {/* ── Large green blob right side ── */}
      <div className="absolute right-0 top-0 w-[52%] h-full bg-gradient-to-bl from-green-50 via-lime-50 to-cream rounded-[100px_0_0_100px] -z-0" />

      {/* ── Sunburst center ── */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-0">
        <svg viewBox="0 0 500 500" className="w-[520px] h-[520px] opacity-[0.06]">
          {Array.from({ length: 20 }).map((_, i) => (
            <rect key={i} x="248" y="0" width="4" height="250" fill="#2D7A3A"
              transform={`rotate(${i * 18} 250 250)`} />
          ))}
        </svg>
      </div>

      {/* ── Decorative triangles top-left ── */}
      <div className="absolute top-12 left-28 pointer-events-none">
        <svg width="56" height="46" viewBox="0 0 56 46" fill="none">
          <polygon points="0,36 14,12 28,36" fill="#E53935" opacity="0.9" />
          <polygon points="20,44 30,26 40,44" fill="#E53935" opacity="0.6" />
          <polygon points="32,32 42,14 52,32" fill="#F9A825" opacity="0.75" />
        </svg>
      </div>

      {/* ── Dots ── */}
      <span className="absolute top-40 left-[37%] w-3 h-3 rounded-full bg-brand-gold opacity-60" />
      <span className="absolute top-56 left-[27%] w-2 h-2 rounded-full bg-brand-red opacity-45" />
      <span className="absolute bottom-32 left-16 w-2 h-2 rounded-full bg-brand-green opacity-35" />
      <span className="absolute top-28 right-[27%] w-2.5 h-2.5 rounded-full bg-brand-red opacity-45" />
      <span className="absolute bottom-40 right-[18%] w-2 h-2 rounded-full bg-brand-gold opacity-35" />
      <span className="absolute bottom-20 right-8 pointer-events-none opacity-30">
        <svg width="44" height="36" viewBox="0 0 44 36">
          <polygon points="0,28 12,8 24,28" fill="#E53935" />
          <polygon points="16,34 24,18 32,34" fill="#F9A825" />
        </svg>
      </span>

      {/* ── Main 3-col grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-14
                      grid grid-cols-1 lg:grid-cols-[400px_1fr_300px] gap-8 items-center py-16">

        {/* ══ LEFT ══ */}
        <div>
          {flashSale?.isActive && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-brand-red text-white font-black text-xs px-4 py-2 rounded-full mb-4 uppercase tracking-wider">
              ⚡ Flash Sale — {flashSale.discount}% OFF!
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-bebas text-[5.5rem] xl:text-[6.8rem] leading-[0.90] text-brand-dark mb-6">
            EAT OUR<br />GRILLED<br />POTATO<br />CHIPS
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-gray-500 leading-relaxed mb-8 max-w-[270px]">
            Satisfying savory artisanal chips without any hard‑to‑find ingredients. Crispy, bold, and made with love.
          </motion.p>

          {/* Buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex items-center gap-4 flex-wrap">
            <button onClick={handleAddToCart}
              className="flex items-center gap-3 bg-brand-dark text-white rounded-full pl-2 pr-7 py-2 font-black text-sm tracking-wide uppercase hover:bg-brand-green transition-all hover:scale-105 active:scale-95 shadow-lg">
              <span className="bg-brand-gold rounded-full w-10 h-10 flex items-center justify-center">
                <ShoppingCart size={17} className="text-brand-dark" />
              </span>
              ADD TO CART
            </button>

            {/* Qty stepper */}
            <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2.5 shadow-sm">
              <button onClick={() => setQty(q => q + 1)}
                className="w-8 h-8 rounded-full border-2 border-brand-dark font-black text-lg flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all">+</button>
              <span className="font-black text-lg min-w-[22px] text-center">{qty}</span>
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full border-2 border-brand-dark font-black text-lg flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all">−</button>
            </div>
          </motion.div>

          {/* Price */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-5 flex items-baseline gap-3">
            <span className="font-black text-3xl text-brand-green">{formatPrice(displayPrice)}</span>
            {flashSale?.isActive && (
              <span className="text-sm text-gray-400 line-through">{formatPrice(heroProduct.price)}</span>
            )}
          </motion.div>
        </div>

        {/* ══ CENTER — Slider ══ */}
        <div className="flex flex-col items-center gap-5">
          <div className="relative flex justify-center items-end h-[480px] lg:h-[560px] w-full">

            {/* CRISPY & TEASTY badge */}
            <motion.div animate={{ rotate: [-3, 0, -3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-0 bottom-[42%] z-20 drop-shadow-xl">
              <div className="bg-brand-gold text-brand-dark font-bebas text-[1.6rem] tracking-widest px-6 py-2 rounded-2xl shadow-md">
                CRISPY &amp;
              </div>
              <div className="bg-brand-red text-white font-bebas text-[1.6rem] tracking-widest px-6 py-2 rounded-2xl shadow-md mt-1.5">
                TEASTY
              </div>
            </motion.div>

            {/* Slide image */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={heroProduct.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 80, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction * -80, scale: 0.92 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-end justify-center z-10">
                {/* Floating animation wraps the image */}
                <motion.div animate={{ y: [0, -16, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                  <Image src={heroProduct.image} alt={heroProduct.name}
                    width={400} height={500}
                    className="object-contain drop-shadow-[0_32px_64px_rgba(0,0,0,0.20)]"
                    priority />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider controls */}
          <div className="flex items-center gap-4">
            <button onClick={() => go(-1)}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all">
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-3 bg-brand-green' : 'w-3 h-3 bg-gray-300 hover:bg-brand-green/50'}`} />
              ))}
            </div>

            <button onClick={() => go(1)}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all">
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Product name pill */}
          <AnimatePresence mode="wait">
            <motion.div key={heroProduct.id + '-name'}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="bg-white/80 backdrop-blur-sm px-5 py-1.5 rounded-full shadow-sm text-xs font-black tracking-widest text-brand-dark uppercase">
              {heroProduct.name}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ══ RIGHT — features ══ */}
        <div className="space-y-8">
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.13 }}
              className="flex items-start gap-4">
              <div className="w-13 h-13 rounded-full flex items-center justify-center text-xl flex-shrink-0 shadow-md"
                style={{ background: f.bg, width: 52, height: 52 }}>
                {f.icon}
              </div>
              <div>
                <h4 className="text-xs font-black tracking-widest text-brand-dark mb-1 uppercase">{f.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}