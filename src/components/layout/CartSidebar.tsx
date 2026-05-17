'use client'
import Image from 'next/image'
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function CartSidebar() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()

  const handleCheckout = () => {
    toast.success('Order placed! 🎉 Thank you for shopping!')
    clearCart()
    toggleCart()
  }

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="font-bebas text-2xl tracking-wide">Your Cart</h2>
                <p className="text-xs text-gray-500 font-semibold">{items.length} item{items.length !== 1 ? 's' : ''}</p>
              </div>
              <button
                onClick={toggleCart}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
                  <ShoppingBag size={64} strokeWidth={1} />
                  <p className="font-bold text-lg">Your cart is empty</p>
                  <p className="text-sm text-center">Add some delicious chips to get started!</p>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex gap-4 bg-cream rounded-2xl p-4"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-sm text-brand-dark truncate">{item.product.name}</p>
                        <p className="text-xs text-gray-500 mb-2">{item.product.flavor}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="text-brand-dark hover:text-brand-red transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-black min-w-[16px] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="text-brand-dark hover:text-brand-green transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="font-black text-sm text-brand-green">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-300 hover:text-brand-red transition-colors self-start mt-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-600">Subtotal</span>
                  <span className="font-black text-xl">{formatPrice(getTotalPrice())}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-brand-dark text-white font-black py-4 rounded-full text-sm tracking-wider hover:bg-brand-green transition-colors uppercase"
                >
                  Checkout — {formatPrice(getTotalPrice())}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
