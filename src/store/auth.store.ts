import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { User } from '@/type'

interface AuthState {
  isLogin: boolean
  user: User | null
  setIsLogin: (val: boolean) => void
  setUser: (u: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,
      user: null,
      setIsLogin: (val: boolean) => set(() => ({ isLogin: val })),
      setUser: (u: User) => set(() => ({ user: u })),
    }),
    { name: 'auth-store' },
  ),
)
