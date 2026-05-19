'use client'
import { motion } from 'framer-motion'

const stats = [
  { value: '50+', label: 'Flavours', icon: '🌶️' },
  { value: '100K+', label: 'Happy Snackers', icon: '😋' },
  { value: '0g', label: 'Trans Fat', icon: '✅' },
  { value: '4.9★', label: 'Rating', icon: '⭐' },
]

export default function FeaturesSection() {
  return (
    <section className="py-16 px-6 lg:px-12 bg-cream">
      <div className="max-w-7xl mx-auto">

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-white rounded-3xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
              <div className="font-bebas text-4xl text-brand-dark tracking-wide">{stat.value}</div>
              <div className="text-[10px] text-gray-400 font-black tracking-[3px] uppercase mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Free delivery banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-brand-dark rounded-3xl p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">

          {/* subtle glow */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-brand-green opacity-10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-10 w-48 h-48 rounded-full bg-brand-gold opacity-10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <p className="text-brand-green text-[10px] font-black tracking-[4px] uppercase mb-2">Limited Offer</p>
            <h3 className="font-bebas text-4xl lg:text-5xl text-white tracking-wide leading-tight">
              Free Delivery<br className="hidden lg:block" /> on Orders Over $30
            </h3>
          </div>

          <div className="relative z-10 text-center">
            <div className="font-bebas text-7xl text-brand-gold tracking-wide leading-none">FREE</div>
            <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mt-1">Delivery included</p>
          </div>

          <button className="relative z-10 bg-brand-green text-white font-black text-xs tracking-[3px] uppercase px-8 py-4 rounded-full hover:bg-green-500 hover:scale-105 active:scale-95 transition-all shadow-lg whitespace-nowrap">
            Shop Now →
          </button>
        </motion.div>
      </div>
    </section>
  )
}