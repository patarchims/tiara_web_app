import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Pasien } from '@/type'

interface PasienState {
  pasien: Pasien | null
  setPasien: (value: Pasien | null) => void
}

export const usePasienStore = create<PasienState>()(
  persist(
    (set) => ({
      pasien: null,
      setPasien: (value: Pasien | null) => set(() => ({ pasien: value })),
    }),
    { name: 'pasien-store' },
  ),
)
