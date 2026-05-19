'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useProductStore } from '@/store/productStore'
import ProductCard from '@/components/ui/ProductCard'

export default function ProductsSection() {
  const { products } = useProductStore()
  const featured = products.filter(p => p.isFeatured && p.inStock).slice(0, 4)
  const display = featured.length > 0 ? featured : products.slice(0, 4)

  return (
    <section className="relative bg-brand-green rounded-t-[48px] py-16 px-6 lg:px-12 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(ellipse, #4CAF50 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10"
        style={{ background: 'conic-gradient(from 0deg, #F9A825, #4CAF50, #F9A825)' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-green-300 text-xs font-black tracking-[4px] uppercase mb-1">Our Collection</p>
            <h2 className="font-bebas text-5xl text-white tracking-wide leading-none">
              Popular<br />Flavours 🔥
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Link href="/chips"
              className="hidden md:block border-2 border-white/30 text-white font-black text-xs tracking-widest uppercase px-6 py-3 rounded-full hover:bg-white hover:text-brand-green transition-all">
              View All Chips →
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {display.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/chips"
            className="inline-block border-2 border-white/30 text-white font-black text-xs tracking-widest uppercase px-8 py-3 rounded-full hover:bg-white hover:text-brand-green transition-all">
            View All Chips →
          </Link>
        </div>
      </div>
    </section>
  )
}
