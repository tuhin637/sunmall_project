'use client'
// components/shop/CartDrawer.tsx
import { useCartStore } from '@/store/cartStore'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotalPrice } = useCartStore()

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="font-display text-2xl font-bold">Your Cart 🛒</h2>
          <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingBag size={64} className="text-gray-200" />
              <p className="text-gray-400 font-bold text-lg">Your cart is empty</p>
              <button
                onClick={toggleCart}
                className="bg-dark-green text-white rounded-full px-8 py-3 font-bold hover:bg-brand-green transition-colors"
              >
                Shop Now
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{product.name}</p>
                  <p className="text-brand-green font-black text-lg">৳{product.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center font-bold hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="font-black w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center font-bold hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(product.id)}
                  className="self-start p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-bold">Total</span>
              <span className="font-display text-2xl font-bold">৳{getTotalPrice().toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={toggleCart}
              className="block w-full bg-dark-green text-white text-center rounded-full py-4 font-black text-lg hover:bg-brand-green transition-colors"
            >
              Proceed to Checkout →
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
