'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  isAdminLoggedIn: boolean
  adminEmail: string | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const ADMIN_EMAIL = 'admin@sunmall.com'
const ADMIN_PASSWORD = 'sunmall123'

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAdminLoggedIn: false,
      adminEmail: null,

      login: (email, password) => {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          set({ isAdminLoggedIn: true, adminEmail: email })
          return true
        }
        return false
      },

      logout: () => set({ isAdminLoggedIn: false, adminEmail: null }),
    }),
    { name: 'sunmall-admin-auth' }
  )
)
