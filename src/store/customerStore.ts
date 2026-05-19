'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Customer, defaultCustomers } from '@/data/customers'

interface CustomerStore {
  customers: Customer[]
  toggleBlock: (id: string) => void
  searchCustomers: (query: string) => Customer[]
}

export const useCustomerStore = create<CustomerStore>()(
  persist(
    (set, get) => ({
      customers: defaultCustomers,

      toggleBlock: (id) =>
        set({
          customers: get().customers.map((c) =>
            c.id === id ? { ...c, isBlocked: !c.isBlocked } : c
          ),
        }),

      searchCustomers: (query) =>
        get().customers.filter(
          (c) =>
            c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.email.toLowerCase().includes(query.toLowerCase())
        ),
    }),
    { name: 'sunmall-customers' }
  )
)
