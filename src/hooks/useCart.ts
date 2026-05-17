'use client'
import { useCartStore } from '@/store/cartStore'
import { Product } from '@/types'
import toast from 'react-hot-toast'

export function useCart() {
  const store = useCartStore()

  const addToCart = (product: Product, quantity = 1) => {
    store.addItem(product, quantity)
    toast.success(`${product.name} added to cart! 🛒`)
  }

  const removeFromCart = (productId: string) => {
    store.removeItem(productId)
    toast.success('Item removed from cart')
  }

  return {
    ...store,
    addToCart,
    removeFromCart,
  }
}
