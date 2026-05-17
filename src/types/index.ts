export interface Product {
  id: string
  name: string
  flavor: string
  price: number
  originalPrice?: number
  image: string
  badge?: string
  badgeColor?: string
  rating: number
  reviewCount: number
  tags: string[]
  description: string
  isNew?: boolean
  isBestseller?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}
