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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-brand-green text-xs font-black tracking-[4px] uppercase mb-2">Why SunMall?</p>
          <h2 className="font-bebas text-5xl text-brand-dark tracking-wide">
            Crafted with Passion
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="font-bebas text-4xl text-brand-dark tracking-wide">{stat.value}</div>
              <div className="text-xs text-gray-500 font-bold tracking-widest uppercase mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-8 bg-brand-dark rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="text-green-400 text-xs font-black tracking-[4px] uppercase mb-2">Limited Offer</p>
            <h3 className="font-bebas text-4xl lg:text-5xl text-white tracking-wide">
              Free Delivery<br className="hidden lg:block" /> on Orders Over $30
            </h3>
          </div>
          <div className="text-center">
            <div className="font-bebas text-6xl text-brand-gold tracking-wide">FREE</div>
            <p className="text-gray-400 text-sm font-bold">Delivery included</p>
          </div>
          <button className="bg-brand-green text-white font-black text-sm tracking-widest uppercase px-8 py-4 rounded-full hover:bg-green-600 transition-colors whitespace-nowrap">
            Shop Now →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
