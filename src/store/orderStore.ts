'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Order, OrderStatus, defaultOrders } from '@/data/orders'

interface OrderStore {
  orders: Order[]
  addOrder: (order: Order) => void
  updateStatus: (orderId: string, status: OrderStatus) => void
  deleteOrder: (orderId: string) => void
  getOrdersByCustomer: (customerId: string) => Order[]
  getTotalRevenue: () => number
  getOrdersByStatus: (status: OrderStatus) => Order[]
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: defaultOrders,

      addOrder: (order) =>
        set({ orders: [order, ...get().orders] }),

      updateStatus: (orderId, status) =>
        set({
          orders: get().orders.map((o) =>
            o.id === orderId ? { ...o, status } : o
          ),
        }),

      deleteOrder: (orderId) =>
        set({ orders: get().orders.filter((o) => o.id !== orderId) }),

      getOrdersByCustomer: (customerId) =>
        get().orders.filter((o) => o.customerId === customerId),

      getTotalRevenue: () =>
        get().orders
          .filter((o) => o.status !== 'cancelled')
          .reduce((sum, o) => sum + o.total, 0),

      getOrdersByStatus: (status) =>
        get().orders.filter((o) => o.status === status),
    }),
    { name: 'sunmall-orders' }
  )
)
