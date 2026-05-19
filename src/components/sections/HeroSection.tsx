'use client'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useProductStore } from '@/store/productStore'
import { usePromotionStore } from '@/store/promotionStore'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

const features = [
  {
    icon: '🌶️',
    title: 'EXTRA CHILI',
    desc: 'Bold heat crafted for spice lovers who crave intensity.',
    bg: '#2D7A3A',
  },
  {
    icon: '🍗',
    title: 'BOLD FLAVOUR',
    desc: 'Artisanal flavor dusting with extra energy and unique blends.',
    bg: '#E53935',
  },
  {
    icon: '🔥',
    title: 'SMOKEY SIDE',
    desc: 'Deep smoky notes reminiscent of traditional slow-fire cooking.',
    bg: '#F9A825',
  },
]

export default function HeroSection() {
  const [qty, setQty] = useState(2)
  const { addItem } = useCartStore()
  const { products } = useProductStore()
  const { flashSale } = usePromotionStore()

  const heroProduct = products.find(p => p.isFeatured && p.inStock) || products[0]
  const displayPrice = heroProduct
    ? flashSale?.isActive
      ? heroProduct.price * (1 - flashSale.discount / 100)
      : heroProduct.price
    : 0

  if (!heroProduct) return null

  const handleAddToCart = () => {
    addItem(heroProduct, qty)
    toast.success(`${qty}× ${heroProduct.name} added to cart! 🛒`)
  }

  return (
    <section className="relative overflow-hidden bg-cream min-h-[90vh] flex items-center">

      {/* ── Decorative triangles (top-left) ── */}
      <div className="absolute top-10 left-32 pointer-events-none select-none">
        <svg width="48" height="40" viewBox="0 0 48 40" fill="none">
          <polygon points="0,30 12,10 24,30" fill="#E53935" opacity="0.85" />
          <polygon points="16,38 24,22 32,38" fill="#E53935" opacity="0.65" />
          <polygon points="28,28 36,12 44,28" fill="#F9A825" opacity="0.75" />
        </svg>
      </div>

      {/* ── Decorative triangles (bottom-right) ── */}
      <div className="absolute bottom-20 right-10 pointer-events-none select-none opacity-40">
        <svg width="40" height="34" viewBox="0 0 40 34">
          <polygon points="0,26 10,8 20,26" fill="#E53935" />
          <polygon points="14,32 22,18 30,32" fill="#F9A825" />
        </svg>
      </div>

      {/* ── Small floating dots ── */}
      <span className="absolute top-36 left-[38%] w-3 h-3 rounded-full bg-brand-gold opacity-60" />
      <span className="absolute top-52 left-[28%] w-2 h-2 rounded-full bg-brand-red opacity-50" />
      <span className="absolute bottom-28 left-20 w-2 h-2 rounded-full bg-brand-green opacity-40" />
      <span className="absolute top-24 right-[28%] w-2.5 h-2.5 rounded-full bg-brand-red opacity-50" />
      <span className="absolute bottom-36 right-[22%] w-2 h-2 rounded-full bg-brand-gold opacity-40" />

      {/* ── Main grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-14 grid grid-cols-1 lg:grid-cols-[420px_1fr_300px] gap-6 items-center py-16">

        {/* ═══ LEFT COLUMN ═══ */}
        <div>
          {flashSale?.isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-brand-red text-white font-black text-xs px-4 py-2 rounded-full mb-4 uppercase tracking-wider"
            >
              ⚡ Flash Sale — {flashSale.discount}% OFF!
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-bebas text-[5.5rem] xl:text-[6.5rem] leading-[0.92] text-brand-dark mb-6"
          >
            EAT OUR<br />GRILLED<br />POTATO<br />CHIPS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-gray-500 leading-relaxed mb-8 max-w-[280px]"
          >
            Satisfying savory artisanal chips without any hard-to-find
            ingredients. Crispy, bold, and made with love.
          </motion.p>

          {/* Cart row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex items-center gap-4 flex-wrap"
          >
            {/* Add to Cart button */}
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-3 bg-brand-dark text-white rounded-full pl-2 pr-6 py-2 font-black text-sm tracking-wide uppercase hover:bg-brand-green transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              <span className="bg-brand-gold rounded-full w-10 h-10 flex items-center justify-center">
                <ShoppingCart size={17} className="text-brand-dark" />
              </span>
              ADD TO CART
            </button>

            {/* Qty stepper  +  N  − */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty(q => q + 1)}
                className="w-9 h-9 rounded-full border-2 border-brand-dark font-black text-lg flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all"
              >
                +
              </button>
              <span className="font-black text-lg min-w-[24px] text-center">{qty}</span>
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-full border-2 border-brand-dark font-black text-lg flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all"
              >
                −
              </button>
            </div>
          </motion.div>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-5 flex items-baseline gap-3"
          >
            <span className="font-black text-3xl text-brand-green">
              {formatPrice(displayPrice)}
            </span>
            {flashSale?.isActive && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(heroProduct.price)}
              </span>
            )}
          </motion.div>
        </div>

        {/* ═══ CENTER — hero product image ═══ */}
        <div className="flex justify-center items-end relative h-[480px] lg:h-[560px]">

          {/* Sunburst rays behind the bag */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
              viewBox="0 0 400 400"
              className="w-[420px] h-[420px] opacity-[0.08]"
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <rect
                  key={i}
                  x="198" y="0" width="4" height="200"
                  fill="#2D7A3A"
                  transform={`rotate(${i * 22.5} 200 200)`}
                />
              ))}
            </svg>
          </div>

          {/* CRISPY & TEASTY badge */}
          <motion.div
            animate={{ rotate: [-3, 0, -3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-2 bottom-[44%] z-20 drop-shadow-lg"
          >
            <div className="bg-brand-gold text-brand-dark font-bebas text-2xl tracking-widest px-6 py-2 rounded-2xl shadow-md">
              CRISPY &amp;
            </div>
            <div className="bg-brand-red text-white font-bebas text-2xl tracking-widest px-6 py-2 rounded-2xl shadow-md mt-1.5">
              TEASTY
            </div>
          </motion.div>

          {/* Floating product bag */}
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 flex items-end justify-center w-full h-full"
          >
            <Image
              src={heroProduct.image}
              alt={heroProduct.name}
              width={420}
              height={520}
              className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.18)]"
              priority
            />
          </motion.div>
        </div>

        {/* ═══ RIGHT — feature list ═══ */}
        <div className="space-y-7">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.13 }}
              className="flex items-start gap-4"
            >
              {/* Coloured circle icon */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 shadow-sm"
                style={{ background: f.bg }}
              >
                {f.icon}
              </div>
              <div>
                <h4 className="text-xs font-black tracking-widest text-brand-dark mb-1 uppercase">
                  {f.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}