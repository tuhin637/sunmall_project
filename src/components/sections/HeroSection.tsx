'use client'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { heroProduct, features } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function HeroSection() {
  const [qty, setQty] = useState(1)
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    addItem(heroProduct, qty)
    toast.success(`${qty}× ${heroProduct.name} added to cart! 🛒`)
  }

  return (
    <section className="relative overflow-hidden min-h-[88vh]">
      {/* Green arc background */}
      <div className="absolute right-0 top-0 w-[55%] h-full bg-gradient-to-br from-green-50 to-lime-50 rounded-[80px_0_0_80px] -z-0" />

      {/* Decorative dots */}
      <div className="absolute top-28 left-1/3 w-3 h-3 bg-brand-red rounded-full opacity-70" />
      <div className="absolute top-48 left-[30%] w-2 h-2 bg-brand-gold rounded-full opacity-50" />
      <div className="absolute top-20 right-1/4 w-2.5 h-2.5 bg-brand-red rounded-full opacity-60" />
      <div className="absolute bottom-32 left-16 w-2 h-2 bg-brand-green rounded-full opacity-40" />

      {/* Decorative triangles */}
      <div className="absolute top-16 left-28 w-5 h-5 bg-brand-red opacity-80"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'rotate(20deg)' }} />
      <div className="absolute top-24 left-36 w-3 h-3 bg-brand-gold opacity-60"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'rotate(-10deg)' }} />
      <div className="absolute top-12 right-20 w-4 h-4 bg-brand-red opacity-50"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'rotate(45deg)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center min-h-[88vh]">

        {/* LEFT — Text */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-bebas text-7xl xl:text-8xl leading-none text-brand-dark mb-5"
          >
            EAT OUR<br />GRILLED<br />POTATO<br />CHIPS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-gray-500 leading-relaxed mb-8 max-w-xs"
          >
            Satisfying savory artisanal chips without any hard-to-find ingredients.
            Crispy, bold, and made with love.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex items-center flex-wrap gap-4"
          >
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-3 bg-brand-dark text-white rounded-full px-7 py-4 font-black text-sm tracking-wide uppercase hover:bg-brand-green transition-all hover:scale-105 active:scale-95"
            >
              <span className="bg-brand-gold rounded-full w-9 h-9 flex items-center justify-center">
                <ShoppingCart size={16} className="text-brand-dark" />
              </span>
              Add to Cart
            </button>

            {/* Quantity control */}
            <div className="flex items-center gap-3 bg-white rounded-full px-4 py-3 shadow-sm">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-8 h-8 rounded-full border-2 border-brand-dark font-black text-lg flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all"
              >−</button>
              <span className="font-black text-base min-w-[20px] text-center">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-8 h-8 rounded-full border-2 border-brand-dark font-black text-lg flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all"
              >+</button>
            </div>

            <span className="font-black text-xl text-brand-green">{formatPrice(heroProduct.price)}</span>
          </motion.div>
        </div>

        {/* CENTER — Product image */}
        <div className="flex justify-center items-center relative">
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            {/* Badge: Crispy & Tasty */}
            <motion.div
              animate={{ rotate: [-4, 0, -4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-10 bottom-40 z-20"
            >
              <div className="bg-brand-gold text-brand-dark font-bebas text-xl tracking-widest px-5 py-2 rounded-xl shadow-md">
                CRISPY &amp;
              </div>
              <div className="bg-brand-red text-white font-bebas text-xl tracking-widest px-5 py-2 rounded-xl shadow-md mt-1">
                TEASTY
              </div>
            </motion.div>

            <Image
              src="/images/sour-cream.png"
              alt="Sour Cream & Onion Veggie Stix"
              width={380}
              height={460}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
        </div>

        {/* RIGHT — Features */}
        <div className="space-y-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
              className="flex items-start gap-4"
            >
              <div className={`${f.color} w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0`}>
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
