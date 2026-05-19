'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import CartSidebar from '@/components/layout/CartSidebar'
import Footer from '@/components/layout/Footer'
import { useProductStore } from '@/store/productStore'
import { useCartStore } from '@/store/cartStore'
import { usePromotionStore } from '@/store/promotionStore'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/data/products'
import toast from 'react-hot-toast'

const CATEGORIES = [
  { key: 'all', label: '🍟 All Chips' },
  { key: 'veggie-stix', label: '🥬 Veggie Stix' },
  { key: 'potato-chips', label: '🥔 Potato Chips' },
]

const SORTS = [
  { key: 'featured', label: '⭐ Featured' },
  { key: 'price-asc', label: '💲 Price: Low' },
  { key: 'price-desc', label: '💰 Price: High' },
  { key: 'rating', label: '⭐ Rating' },
]

export default function ChipsPage() {
  const { products } = useProductStore()
  const { addItem } = useCartStore()
  const { flashSale } = usePromotionStore()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('featured')
  const [qty, setQty] = useState<Record<string, number>>({})

  const getQty = (id: string) => qty[id] || 1
  const setProductQty = (id: string, v: number) => setQty(q => ({ ...q, [id]: Math.max(1, v) }))

  const displayPrice = (p: Product) => {
    if (flashSale?.isActive && p.inStock) {
      return p.price * (1 - flashSale.discount / 100)
    }
    return p.price
  }

  const filtered = products
    .filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.flavor.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      const matchCat = category === 'all' || p.category === category
      return matchSearch && matchCat
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return displayPrice(a) - displayPrice(b)
      if (sort === 'price-desc') return displayPrice(b) - displayPrice(a)
      if (sort === 'rating') return b.rating - a.rating
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
    })

  const handleAdd = (p: Product) => {
    addItem(p, getQty(p.id))
    toast.success(`${getQty(p.id)}× ${p.name} added! 🛒`)
  }

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <CartSidebar />

      {/* Flash Sale Banner */}
      <AnimatePresence>
        {flashSale?.isActive && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-center py-3 px-4 overflow-hidden">
            <p className="font-black text-sm">
              ⚡ {flashSale.title} — {flashSale.discount}% OFF Everything! Limited time only!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-brand-green to-green-600 py-16 px-6 lg:px-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          <p className="text-green-200 text-xs font-black tracking-[4px] uppercase mb-3">Our Collection</p>
          <h1 className="font-bebas text-6xl lg:text-8xl text-white tracking-wide mb-4">All Chips 🍟</h1>
          <p className="text-green-100 text-sm max-w-md mx-auto">Artisanal, bold, and made for snack lovers. Explore our full range of flavours.</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          {/* Search */}
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Search flavours, tags..."
            className="flex-1 border-2 border-gray-100 bg-white rounded-2xl px-5 py-3 text-sm font-semibold focus:outline-none focus:border-brand-green" />

          {/* Category */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button key={cat.key} onClick={() => setCategory(cat.key)}
                className={`px-5 py-3 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${
                  category === cat.key ? 'bg-brand-dark text-white' : 'bg-white text-gray-500 hover:bg-gray-100 border-2 border-gray-100'
                }`}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="bg-white border-2 border-gray-100 rounded-2xl px-5 py-3 text-xs font-black focus:outline-none focus:border-brand-green">
            {SORTS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
        </div>

        {/* Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 font-bold">
            Showing <span className="text-brand-dark font-black">{filtered.length}</span> products
            {search && ` for "${search}"`}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filtered.map((p, i) => {
              const salePrice = displayPrice(p)
              const hasDiscount = salePrice < p.price || (p.discount && p.discount > 0)
              return (
                <motion.div key={p.id} layout
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-3xl overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">

                  {/* Image */}
                  <div className="relative h-52 bg-cream overflow-hidden">
                    <Image src={p.image} alt={p.name} fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {p.isNew && <span className="bg-blue-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">NEW</span>}
                      {p.isBestseller && <span className="bg-brand-green text-white text-[9px] font-black px-2 py-0.5 rounded-full">BESTSELLER</span>}
                      {flashSale?.isActive && <span className="bg-brand-red text-white text-[9px] font-black px-2 py-0.5 rounded-full">⚡ -{flashSale.discount}%</span>}
                      {!flashSale?.isActive && p.discount && p.discount > 0 && (
                        <span className="bg-brand-red text-white text-[9px] font-black px-2 py-0.5 rounded-full">-{p.discount}%</span>
                      )}
                    </div>

                    {/* Stock */}
                    {!p.inStock && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="bg-white text-brand-dark font-black text-sm px-4 py-2 rounded-full">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">{p.flavor}</p>
                    <h3 className="font-black text-lg text-brand-dark leading-tight mb-2">{p.name}</h3>
                    <p className="text-xs text-gray-400 mb-3 line-clamp-2">{p.description}</p>

                    {/* Tags */}
                    <div className="flex gap-1 flex-wrap mb-4">
                      {p.tags.map(t => (
                        <span key={t} className="text-[9px] font-black bg-cream text-gray-500 px-2 py-0.5 rounded-full uppercase">{t}</span>
                      ))}
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {'★'.repeat(p.rating).split('').map((s, i) => (
                        <span key={i} className="text-brand-gold text-sm">{s}</span>
                      ))}
                      <span className="text-xs text-gray-400 ml-1">({p.reviewCount})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-black text-2xl text-brand-dark">{formatPrice(salePrice)}</span>
                      {hasDiscount && salePrice < p.price && (
                        <span className="text-sm text-gray-400 line-through">{formatPrice(p.price)}</span>
                      )}
                    </div>

                    {/* Qty + Add */}
                    {p.inStock ? (
                      <div className="flex gap-2">
                        <div className="flex items-center gap-2 bg-cream rounded-full px-3 py-2">
                          <button onClick={() => setProductQty(p.id, getQty(p.id) - 1)}
                            className="text-brand-dark font-black text-base hover:text-brand-red transition-colors">−</button>
                          <span className="font-black text-sm min-w-[16px] text-center">{getQty(p.id)}</span>
                          <button onClick={() => setProductQty(p.id, getQty(p.id) + 1)}
                            className="text-brand-dark font-black text-base hover:text-brand-green transition-colors">+</button>
                        </div>
                        <button onClick={() => handleAdd(p)}
                          className="flex-1 bg-brand-dark text-white font-black text-xs rounded-full hover:bg-brand-green transition-all uppercase tracking-wide">
                          Add to Cart
                        </button>
                      </div>
                    ) : (
                      <button disabled className="w-full bg-gray-100 text-gray-400 font-black text-xs py-3 rounded-full uppercase cursor-not-allowed">
                        Out of Stock
                      </button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-24 text-gray-400">
            <div className="text-7xl mb-5">🔍</div>
            <h3 className="font-black text-2xl mb-2">No chips found</h3>
            <p className="text-sm">Try a different search or category</p>
            <button onClick={() => { setSearch(''); setCategory('all') }}
              className="mt-6 bg-brand-dark text-white font-black px-8 py-3 rounded-full hover:bg-brand-green transition-all text-sm">
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  )
}
