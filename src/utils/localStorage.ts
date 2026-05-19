export function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.error('Storage save error:', e)
  }
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch (e) {
    return fallback
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(key)
}

export const STORAGE_KEYS = {
  CART: 'sunmall-cart',
  PRODUCTS: 'sunmall-products',
  ORDERS: 'sunmall-orders',
  CUSTOMERS: 'sunmall-customers',
  COUPONS: 'sunmall-coupons',
  ADMIN_AUTH: 'sunmall-admin-auth',
  SETTINGS: 'sunmall-settings',
} as const
