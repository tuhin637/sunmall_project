'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, defaultProducts } from '@/data/products'

interface ProductStore {
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
  toggleStock: (id: string) => void
  toggleFeatured: (id: string) => void
  setDiscount: (id: string, discount: number) => void
  getFeaturedProducts: () => Product[]
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: defaultProducts,

      addProduct: (product) =>
        set({ products: [product, ...get().products] }),

      updateProduct: (id, updates) =>
        set({
          products: get().products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }),

      deleteProduct: (id) =>
        set({ products: get().products.filter((p) => p.id !== id) }),

      toggleStock: (id) =>
        set({
          products: get().products.map((p) =>
            p.id === id ? { ...p, inStock: !p.inStock } : p
          ),
        }),

      toggleFeatured: (id) =>
        set({
          products: get().products.map((p) =>
            p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
          ),
        }),

      setDiscount: (id, discount) =>
        set({
          products: get().products.map((p) =>
            p.id === id ? { ...p, discount } : p
          ),
        }),

      getFeaturedProducts: () =>
        get().products.filter((p) => p.isFeatured && p.inStock),
    }),
    { name: 'sunmall-products' }
  )
)
