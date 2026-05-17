// types/index.ts

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  original_price?: number
  image_url: string
  category: string
  flavor: string
  stock: number
  rating: number
  reviews_count: number
  is_featured: boolean
  is_active: boolean
  created_at: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  user_id: string
  items: OrderItem[]
  total_amount: number
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  payment_method: string
  payment_status: 'unpaid' | 'paid' | 'refunded'
  transaction_id?: string
  shipping_address: ShippingAddress
  created_at: string
}

export interface OrderItem {
  product_id: string
  product_name: string
  product_image: string
  quantity: number
  price: number
}

export interface ShippingAddress {
  full_name: string
  phone: string
  address: string
  city: string
  district: string
  postal_code: string
}

export interface User {
  id: string
  email: string
  name: string
  role: 'customer' | 'admin'
  avatar_url?: string
  created_at: string
}

export interface DashboardStats {
  total_revenue: number
  total_orders: number
  total_products: number
  total_customers: number
  recent_orders: Order[]
  monthly_sales: { month: string; revenue: number }[]
}
