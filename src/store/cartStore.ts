'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/data/products'
import { Coupon } from '@/store/promotionStore'

interface CartItem {
  product: Product
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  coupon: Coupon | null
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  applyCoupon: (coupon: Coupon) => void
  removeCoupon: () => void
  getTotalItems: () => number
  getSubtotal: () => number
  getDiscount: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      coupon: null,

      addItem: (product, quantity = 1) => {
        const items = get().items
        const existing = items.find((i) => i.product.id === product.id)
        if (existing) {
          set({ items: items.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i) })
        } else {
          set({ items: [...items, { product, quantity }] })
        }
      },

      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.product.id !== productId) }),

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) { get().removeItem(productId); return }
        set({ items: get().items.map((i) => i.product.id === productId ? { ...i, quantity } : i) })
      },

      clearCart: () => set({ items: [], coupon: null }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      applyCoupon: (coupon) => set({ coupon }),
      removeCoupon: () => set({ coupon: null }),

      getTotalItems: () => get().items.reduce((t, i) => t + i.quantity, 0),

      getSubtotal: () =>
        get().items.reduce((t, i) => t + i.product.price * i.quantity, 0),

      getDiscount: () => {
        const { coupon, getSubtotal } = get()
        if (!coupon) return 0
        const sub = getSubtotal()
        return coupon.type === 'percent' ? (sub * coupon.discount) / 100 : coupon.discount
      },

      getTotalPrice: () => {
        const { getSubtotal, getDiscount } = get()
        return Math.max(0, getSubtotal() - getDiscount())
      },
    }),
    { name: 'sunmall-cart' }
  )
)
