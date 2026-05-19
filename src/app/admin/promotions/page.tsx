'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePromotionStore, Coupon } from '@/store/promotionStore'
import toast from 'react-hot-toast'

const EMPTY_COUPON: Coupon = { code: '', discount: 10, type: 'percent', isActive: true, usageCount: 0 }

export default function PromotionsPage() {
  const { coupons, flashSale, addCoupon, toggleCoupon, deleteCoupon, setFlashSale } = usePromotionStore()
  const [showCouponModal, setShowCouponModal] = useState(false)
  const [newCoupon, setNewCoupon] = useState<Coupon>(EMPTY_COUPON)
  const [flashForm, setFlashForm] = useState({ title: '', discount: 20, hours: 24 })
  const [countdown, setCountdown] = useState('')

  // Countdown timer
  useEffect(() => {
    if (!flashSale?.isActive) return
    const tick = () => {
      const end = new Date(flashSale.endsAt).getTime()
      const now = Date.now()
      const diff = end - now
      if (diff <= 0) { setCountdown('Expired'); return }
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setCountdown(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`)
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [flashSale])

  const handleAddCoupon = () => {
    if (!newCoupon.code) { toast.error('Coupon code required!'); return }
    if (coupons.find(c => c.code === newCoupon.code.toUpperCase())) { toast.error('Code already exists!'); return }
    addCoupon({ ...newCoupon, code: newCoupon.code.toUpperCase() })
    toast.success('Coupon added! 🎉')
    setShowCouponModal(false)
    setNewCoupon(EMPTY_COUPON)
  }

  const handleStartFlash = () => {
    if (!flashForm.title) { toast.error('Enter a title!'); return }
    const endsAt = new Date(Date.now() + flashForm.hours * 3600000).toISOString()
    setFlashSale({ isActive: true, discount: flashForm.discount, endsAt, title: flashForm.title })
    toast.success('Flash sale started! 🔥')
  }

  const handleStopFlash = () => {
    setFlashSale(null)
    toast.success('Flash sale ended!')
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-bebas text-4xl text-brand-dark tracking-wide">Promotions & Settings</h1>
        <p className="text-gray-500 text-sm font-semibold mt-1">Manage coupons, flash sales, and site settings</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* === COUPON CODES === */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-black text-xl text-brand-dark">🏷️ Coupon Codes</h2>
              <p className="text-xs text-gray-400 font-semibold mt-0.5">{coupons.length} coupons · {coupons.filter(c => c.isActive).length} active</p>
            </div>
            <button onClick={() => setShowCouponModal(true)}
              className="bg-brand-dark text-white font-black text-xs px-5 py-2.5 rounded-full hover:bg-brand-green transition-all">
              + Add Coupon
            </button>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {coupons.map((coupon, i) => (
                <motion.div key={coupon.code} layout
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                    coupon.isActive ? 'border-green-100 bg-green-50' : 'border-gray-100 bg-gray-50 opacity-70'
                  }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black ${
                      coupon.isActive ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'
                    }`}>
                      {coupon.type === 'percent' ? '%' : '$'}
                    </div>
                    <div>
                      <p className="font-black text-sm text-brand-dark font-mono tracking-widest">{coupon.code}</p>
                      <p className="text-xs text-gray-500 font-semibold">
                        {coupon.discount}{coupon.type === 'percent' ? '%' : '$'} off · {coupon.usageCount} used
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => { toggleCoupon(coupon.code); toast.success(coupon.isActive ? 'Coupon disabled!' : 'Coupon enabled!') }}
                      className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${
                        coupon.isActive ? 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-600' : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}>
                      {coupon.isActive ? 'Disable' : 'Enable'}
                    </button>
                    <button onClick={() => { deleteCoupon(coupon.code); toast.success('Coupon deleted!') }}
                      className="w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-100 text-xs font-black">
                      ×
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* === FLASH SALE === */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="font-black text-xl text-brand-dark mb-1">⚡ Flash Sale</h2>
          <p className="text-xs text-gray-400 font-semibold mb-6">Set a limited-time discount with countdown timer</p>

          {flashSale?.isActive ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl p-6 text-white text-center mb-5">
              <div className="text-xs font-black uppercase tracking-widest mb-2 opacity-80">ACTIVE FLASH SALE</div>
              <div className="font-bebas text-2xl mb-1">{flashSale.title}</div>
              <div className="font-bebas text-6xl mb-3">{flashSale.discount}% OFF</div>
              <div className="bg-white/20 rounded-2xl px-6 py-3 inline-block">
                <div className="text-xs font-black opacity-80 mb-1">ENDS IN</div>
                <div className="font-mono font-black text-3xl tracking-widest">{countdown || '...'}</div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-5 text-center text-gray-400 mb-5">
              <div className="text-4xl mb-2">⚡</div>
              <p className="font-black">No active flash sale</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1.5">Sale Title</label>
              <input value={flashForm.title} onChange={e => setFlashForm({ ...flashForm, title: e.target.value })}
                placeholder="e.g. Weekend Crunch Sale!"
                className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-brand-red bg-gray-50" />
            </div>
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1.5">
                Discount: <span className="text-brand-red">{flashForm.discount}%</span>
              </label>
              <input type="range" min={5} max={70} value={flashForm.discount}
                onChange={e => setFlashForm({ ...flashForm, discount: Number(e.target.value) })}
                className="w-full accent-red-500" />
            </div>
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1.5">Duration (hours)</label>
              <div className="flex gap-2 flex-wrap">
                {[2, 6, 12, 24, 48].map(h => (
                  <button key={h} onClick={() => setFlashForm({ ...flashForm, hours: h })}
                    className={`px-4 py-2 rounded-full text-xs font-black transition-all ${
                      flashForm.hours === h ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}>
                    {h}h
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={handleStartFlash}
                className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white font-black py-3 rounded-full hover:opacity-90 transition-all">
                {flashSale?.isActive ? '🔄 Restart Sale' : '⚡ Start Flash Sale'}
              </button>
              {flashSale?.isActive && (
                <button onClick={handleStopFlash}
                  className="px-6 bg-gray-100 text-gray-600 font-black py-3 rounded-full hover:bg-gray-200 transition-all">
                  Stop
                </button>
              )}
            </div>
          </div>
        </div>

        {/* === SITE SETTINGS === */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="font-black text-xl text-brand-dark mb-1">⚙️ Site Settings</h2>
          <p className="text-xs text-gray-400 font-semibold mb-6">Brand colors and general settings</p>

          <div className="space-y-4">
            {[
              { label: 'Brand Name', value: 'SunMall', type: 'text' },
              { label: 'Tagline', value: 'Too Yummi Chips', type: 'text' },
              { label: 'Contact Email', value: 'hello@sunmall.com', type: 'email' },
              { label: 'Min. Order for Free Delivery ($)', value: '30', type: 'number' },
            ].map(field => (
              <div key={field.label}>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1.5">{field.label}</label>
                <input type={field.type} defaultValue={field.value}
                  className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-brand-green bg-gray-50" />
              </div>
            ))}
            <button onClick={() => toast.success('Settings saved! ✅')}
              className="w-full bg-brand-dark text-white font-black py-3 rounded-full hover:bg-brand-green transition-all text-sm">
              Save Settings →
            </button>
          </div>
        </div>

        {/* === BANNER EDITOR === */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="font-black text-xl text-brand-dark mb-1">🖼️ Banner Editor</h2>
          <p className="text-xs text-gray-400 font-semibold mb-6">Edit hero section text and appearance</p>

          <div className="bg-gradient-to-br from-green-50 to-lime-50 rounded-2xl p-5 mb-5">
            <p className="text-xs font-black text-green-600 uppercase tracking-widest mb-1">PREVIEW</p>
            <h3 className="font-bebas text-3xl text-brand-dark leading-tight mb-1" id="bannerPreview">EAT OUR GRILLED POTATO CHIPS</h3>
            <p className="text-sm text-gray-500" id="bannerSub">Satisfying savory artisanal chips. Crispy, bold, and made with love.</p>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Hero Heading', placeholder: 'EAT OUR GRILLED POTATO CHIPS', id: 'heading' },
              { label: 'Hero Subtext', placeholder: 'Satisfying savory artisanal chips...', id: 'sub' },
              { label: 'CTA Button Text', placeholder: 'Add to Cart', id: 'cta' },
            ].map(field => (
              <div key={field.id}>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1.5">{field.label}</label>
                <input placeholder={field.placeholder}
                  onChange={e => {
                    const el = document.getElementById(field.id === 'heading' ? 'bannerPreview' : 'bannerSub')
                    if (el) el.textContent = e.target.value || field.placeholder
                  }}
                  className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-brand-green bg-gray-50" />
              </div>
            ))}
            <button onClick={() => toast.success('Banner updated! 🎨')}
              className="w-full bg-brand-green text-white font-black py-3 rounded-full hover:bg-green-600 transition-all text-sm">
              Apply Banner →
            </button>
          </div>
        </div>

      </div>

      {/* Add Coupon Modal */}
      <AnimatePresence>
        {showCouponModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={e => e.target === e.currentTarget && setShowCouponModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bebas text-2xl text-brand-dark tracking-wide">New Coupon</h2>
                <button onClick={() => setShowCouponModal(false)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 text-lg">×</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1.5">Coupon Code</label>
                  <input value={newCoupon.code} onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                    placeholder="e.g. SAVE20"
                    className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm font-black font-mono tracking-widest focus:outline-none focus:border-brand-green uppercase" />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1.5">Discount Type</label>
                  <div className="flex gap-3">
                    {(['percent', 'fixed'] as const).map(t => (
                      <button key={t} onClick={() => setNewCoupon({ ...newCoupon, type: t })}
                        className={`flex-1 py-2.5 rounded-full text-xs font-black transition-all ${
                          newCoupon.type === t ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-500'
                        }`}>
                        {t === 'percent' ? '% Percent' : '$ Fixed'}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1.5">
                    Discount Value: <span className="text-brand-green">{newCoupon.discount}{newCoupon.type === 'percent' ? '%' : '$'}</span>
                  </label>
                  <input type="range" min={1} max={newCoupon.type === 'percent' ? 80 : 50} value={newCoupon.discount}
                    onChange={e => setNewCoupon({ ...newCoupon, discount: Number(e.target.value) })}
                    className="w-full accent-green-500" />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1.5">Expiry Date (optional)</label>
                  <input type="date" onChange={e => setNewCoupon({ ...newCoupon, expiresAt: e.target.value })}
                    className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-brand-green" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowCouponModal(false)}
                  className="flex-1 border-2 border-gray-200 text-gray-500 font-black py-3 rounded-full">Cancel</button>
                <button onClick={handleAddCoupon}
                  className="flex-1 bg-brand-dark text-white font-black py-3 rounded-full hover:bg-brand-green transition-all">
                  Add Coupon →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
