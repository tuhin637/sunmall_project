'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Coupon {
  code: string
  discount: number
  type: 'percent' | 'fixed'
  isActive: boolean
  usageCount: number
  expiresAt?: string
}

export interface FlashSale {
  isActive: boolean
  discount: number
  endsAt: string
  title: string
}

interface PromotionStore {
  coupons: Coupon[]
  flashSale: FlashSale | null
  addCoupon: (coupon: Coupon) => void
  toggleCoupon: (code: string) => void
  deleteCoupon: (code: string) => void
  validateCoupon: (code: string) => Coupon | null
  setFlashSale: (sale: FlashSale | null) => void
}

const defaultCoupons: Coupon[] = [
  { code: 'SAVE10', discount: 10, type: 'percent', isActive: true, usageCount: 23 },
  { code: 'FIRST20', discount: 20, type: 'percent', isActive: true, usageCount: 8 },
  { code: 'FLAT5', discount: 5, type: 'fixed', isActive: false, usageCount: 45 },
]

export const usePromotionStore = create<PromotionStore>()(
  persist(
    (set, get) => ({
      coupons: defaultCoupons,
      flashSale: null,

      addCoupon: (coupon) =>
        set({ coupons: [coupon, ...get().coupons] }),

      toggleCoupon: (code) =>
        set({
          coupons: get().coupons.map((c) =>
            c.code === code ? { ...c, isActive: !c.isActive } : c
          ),
        }),

      deleteCoupon: (code) =>
        set({ coupons: get().coupons.filter((c) => c.code !== code) }),

      validateCoupon: (code) => {
        const coupon = get().coupons.find(
          (c) => c.code.toUpperCase() === code.toUpperCase() && c.isActive
        )
        return coupon || null
      },

      setFlashSale: (sale) => set({ flashSale: sale }),
    }),
    { name: 'sunmall-promotions' }
  )
)
