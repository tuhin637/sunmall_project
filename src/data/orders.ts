export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  address: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  date: string
  couponCode?: string
  discount?: number
}

export const defaultOrders: Order[] = [
  {
    id: 'ORD-001',
    customerId: 'c1',
    customerName: 'Arif Rahman',
    customerEmail: 'arif@email.com',
    customerPhone: '+880 1711-234567',
    address: '45 Dhanmondi, Dhaka 1209',
    items: [
      { productId: '1', productName: 'Sour Cream & Onion', productImage: '/images/sour-cream.png', price: 12.30, quantity: 2 },
      { productId: '3', productName: 'Golden Sea Salt', productImage: '/images/golden-salt.png', price: 10.50, quantity: 1 },
    ],
    total: 35.10,
    status: 'delivered',
    date: '2024-12-10',
  },
  {
    id: 'ORD-002',
    customerId: 'c2',
    customerName: 'Nusrat Jahan',
    customerEmail: 'nusrat@email.com',
    customerPhone: '+880 1812-345678',
    address: '12 Gulshan-2, Dhaka 1212',
    items: [
      { productId: '4', productName: 'Cheese & Herbs', productImage: '/images/cheese-herbs.png', price: 15.89, quantity: 3 },
    ],
    total: 47.67,
    status: 'shipped',
    date: '2024-12-12',
    couponCode: 'SAVE10',
    discount: 5,
  },
  {
    id: 'ORD-003',
    customerId: 'c3',
    customerName: 'Rakib Hossain',
    customerEmail: 'rakib@email.com',
    customerPhone: '+880 1911-456789',
    address: '78 Uttara Sector-7, Dhaka 1230',
    items: [
      { productId: '2', productName: 'Black Barbeque', productImage: '/images/black-bbq.png', price: 12.30, quantity: 1 },
      { productId: '1', productName: 'Sour Cream & Onion', productImage: '/images/sour-cream.png', price: 12.30, quantity: 2 },
    ],
    total: 36.90,
    status: 'processing',
    date: '2024-12-14',
  },
  {
    id: 'ORD-004',
    customerId: 'c4',
    customerName: 'Sadia Islam',
    customerEmail: 'sadia@email.com',
    customerPhone: '+880 1612-567890',
    address: '23 Bashundhara R/A, Dhaka 1229',
    items: [
      { productId: '3', productName: 'Golden Sea Salt', productImage: '/images/golden-salt.png', price: 10.50, quantity: 4 },
    ],
    total: 42.00,
    status: 'pending',
    date: '2024-12-15',
  },
  {
    id: 'ORD-005',
    customerId: 'c5',
    customerName: 'Tanvir Ahmed',
    customerEmail: 'tanvir@email.com',
    customerPhone: '+880 1511-678901',
    address: '56 Mirpur-10, Dhaka 1216',
    items: [
      { productId: '4', productName: 'Cheese & Herbs', productImage: '/images/cheese-herbs.png', price: 15.89, quantity: 1 },
      { productId: '2', productName: 'Black Barbeque', productImage: '/images/black-bbq.png', price: 12.30, quantity: 2 },
    ],
    total: 40.49,
    status: 'cancelled',
    date: '2024-12-13',
  },
]
