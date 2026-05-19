'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useProductStore } from '@/store/productStore'
import { Product } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

const CATEGORIES = ['veggie-stix', 'potato-chips'] as const
const EMPTY_PRODUCT: Omit<Product, 'id'> = {
  name: '', flavor: '', category: 'potato-chips', price: 0, image: '/images/sour-cream.png',
  rating: 5, reviewCount: 0, tags: [], description: '', inStock: true,
}

const IMAGE_OPTIONS = [
  { label: 'Sour Cream & Onion', value: '/images/sour-cream.png' },
  { label: 'Black Barbeque', value: '/images/black-bbq.png' },
  { label: 'Golden Sea Salt', value: '/images/golden-salt.png' },
  { label: 'Cheese & Herbs', value: '/images/cheese-herbs.png' },
]

export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, toggleStock, toggleFeatured, setDiscount } = useProductStore()
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [form, setForm] = useState<Omit<Product, 'id'>>(EMPTY_PRODUCT)
  const [discountModal, setDiscountModal] = useState<{ id: string; current: number } | null>(null)
  const [discountVal, setDiscountVal] = useState(0)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.flavor.toLowerCase().includes(search.toLowerCase())
    const matchCat = filterCat === 'all' || p.category === filterCat
    return matchSearch && matchCat
  })

  const openAdd = () => { setEditProduct(null); setForm(EMPTY_PRODUCT); setShowModal(true) }
  const openEdit = (p: Product) => { setEditProduct(p); setForm({ ...p }); setShowModal(true) }

  const handleSave = () => {
    if (!form.name || !form.price) { toast.error('Name and price are required!'); return }
    if (editProduct) {
      updateProduct(editProduct.id, form)
      toast.success('Product updated! ✅')
    } else {
      addProduct({ ...form, id: Date.now().toString() })
      toast.success('Product added! 🎉')
    }
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    deleteProduct(id)
    setDeleteConfirm(null)
    toast.success('Product deleted!')
  }

  const handleDiscount = () => {
    if (!discountModal) return
    setDiscount(discountModal.id, discountVal)
    setDiscountModal(null)
    toast.success(`Discount set to ${discountVal}%!`)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-bebas text-4xl text-brand-dark tracking-wide">Product Management</h1>
          <p className="text-gray-500 text-sm font-semibold mt-1">{products.length} products total</p>
        </div>
        <button onClick={openAdd}
          className="bg-brand-dark text-white font-black text-sm px-6 py-3 rounded-full hover:bg-brand-green transition-all flex items-center gap-2">
          <span className="text-lg">+</span> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search products..."
          className="flex-1 border-2 border-gray-100 rounded-2xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-brand-green bg-white" />
        <div className="flex gap-2">
          {['all', ...CATEGORIES].map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${filterCat === cat ? 'bg-brand-dark text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
              {cat === 'all' ? 'All' : cat.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <AnimatePresence>
          {filtered.map((p, i) => (
            <motion.div key={p.id}
              layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.05 }}
              className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow">

              {/* Image + Badges */}
              <div className="relative h-40 bg-cream rounded-2xl mb-4 overflow-hidden">
                <Image src={p.image} alt={p.name} fill className="object-contain p-3" />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {p.isFeatured && <span className="bg-brand-gold text-brand-dark text-[9px] font-black px-2 py-0.5 rounded-full">⭐ FEATURED</span>}
                  {p.discount && p.discount > 0 && <span className="bg-brand-red text-white text-[9px] font-black px-2 py-0.5 rounded-full">-{p.discount}% OFF</span>}
                </div>
                <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${p.inStock ? 'bg-green-400' : 'bg-red-400'}`} />
              </div>

              {/* Info */}
              <div className="mb-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-black text-base text-brand-dark leading-tight">{p.name}</h3>
                  <span className="font-black text-brand-green text-base whitespace-nowrap">{formatPrice(p.price)}</span>
                </div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{p.flavor} · {p.category.replace('-', ' ')}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</p>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button onClick={() => toggleStock(p.id)}
                  className={`text-xs font-black py-2 rounded-full transition-all ${p.inStock ? 'bg-green-50 text-green-700 hover:bg-green-100' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}>
                  {p.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                </button>
                <button onClick={() => toggleFeatured(p.id)}
                  className={`text-xs font-black py-2 rounded-full transition-all ${p.isFeatured ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                  {p.isFeatured ? '⭐ Featured' : '☆ Set Featured'}
                </button>
              </div>
              <button onClick={() => { setDiscountModal({ id: p.id, current: p.discount || 0 }); setDiscountVal(p.discount || 0) }}
                className="w-full bg-amber-50 text-amber-700 text-xs font-black py-2 rounded-full hover:bg-amber-100 transition-all mb-3">
                🏷️ Set Discount {p.discount ? `(${p.discount}%)` : ''}
              </button>

              {/* Edit / Delete */}
              <div className="flex gap-2">
                <button onClick={() => openEdit(p)}
                  className="flex-1 border-2 border-brand-dark text-brand-dark text-xs font-black py-2 rounded-full hover:bg-brand-dark hover:text-white transition-all">
                  ✏️ Edit
                </button>
                <button onClick={() => setDeleteConfirm(p.id)}
                  className="flex-1 border-2 border-red-200 text-brand-red text-xs font-black py-2 rounded-full hover:bg-brand-red hover:text-white transition-all">
                  🗑️ Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <div className="text-6xl mb-4">📦</div>
          <p className="font-black text-lg">No products found</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={e => e.target === e.currentTarget && setShowModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              className="bg-white rounded-3xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bebas text-3xl text-brand-dark tracking-wide">
                  {editProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={() => setShowModal(false)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 text-lg">×</button>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Product Name', key: 'name', type: 'text', placeholder: 'e.g. Sour Cream & Onion' },
                  { label: 'Flavor / Type', key: 'flavor', type: 'text', placeholder: 'e.g. Veggie Stix' },
                  { label: 'Price ($)', key: 'price', type: 'number', placeholder: '12.30' },
                  { label: 'Description', key: 'description', type: 'text', placeholder: 'Short product description' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest block mb-1.5">{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder}
                      value={(form as Record<string, unknown>)[field.key] as string}
                      onChange={e => setForm({ ...form, [field.key]: field.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value })}
                      className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-brand-green" />
                  </div>
                ))}
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest block mb-1.5">Category</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as Product['category'] })}
                    className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-brand-green">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c.replace('-', ' ')}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest block mb-1.5">Product Image</label>
                  <select value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
                    className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-brand-green">
                    {IMAGE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <div className="mt-2 h-24 bg-cream rounded-2xl relative overflow-hidden">
                    <Image src={form.image} alt="preview" fill className="object-contain p-2" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest block mb-1.5">Tags (comma separated)</label>
                  <input type="text" placeholder="Crispy, Tangy, Veggie"
                    value={form.tags.join(', ')}
                    onChange={e => setForm({ ...form, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                    className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-brand-green" />
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.inStock} onChange={e => setForm({ ...form, inStock: e.target.checked })} className="w-4 h-4 accent-green-600" />
                    <span className="text-sm font-bold">In Stock</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={!!form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} className="w-4 h-4 accent-yellow-500" />
                    <span className="text-sm font-bold">Featured</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={!!form.isNew} onChange={e => setForm({ ...form, isNew: e.target.checked })} className="w-4 h-4 accent-blue-500" />
                    <span className="text-sm font-bold">New</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setShowModal(false)}
                  className="flex-1 border-2 border-gray-200 text-gray-500 font-black py-3 rounded-full hover:bg-gray-50 transition-all">Cancel</button>
                <button onClick={handleSave}
                  className="flex-1 bg-brand-dark text-white font-black py-3 rounded-full hover:bg-brand-green transition-all">
                  {editProduct ? 'Save Changes' : 'Add Product'} →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Discount Modal */}
      <AnimatePresence>
        {discountModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl">
              <h2 className="font-bebas text-2xl text-brand-dark mb-4">Set Discount</h2>
              <div className="flex items-center gap-4 mb-6">
                <input type="range" min={0} max={80} value={discountVal} onChange={e => setDiscountVal(Number(e.target.value))}
                  className="flex-1 accent-brand-green" />
                <span className="font-bebas text-4xl text-brand-red w-16 text-center">{discountVal}%</span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setDiscountModal(null)}
                  className="flex-1 border-2 border-gray-200 text-gray-500 font-black py-3 rounded-full">Cancel</button>
                <button onClick={handleDiscount}
                  className="flex-1 bg-brand-red text-white font-black py-3 rounded-full hover:bg-red-700 transition-all">Apply</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center">
              <div className="text-5xl mb-4">🗑️</div>
              <h2 className="font-black text-xl text-brand-dark mb-2">Delete Product?</h2>
              <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)}
                  className="flex-1 border-2 border-gray-200 font-black py-3 rounded-full">Cancel</button>
                <button onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 bg-brand-red text-white font-black py-3 rounded-full">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
