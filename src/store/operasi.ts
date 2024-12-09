import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { LaporanOperasi } from '@/type'

interface LaporanOperasiState {
  data: LaporanOperasi
  setData: (v: LaporanOperasi) => void
}

export const useOperasiStore = create<LaporanOperasiState>()(
  persist(
    (set) => ({
      data: {} as LaporanOperasi,
      setData: (v: LaporanOperasi) => set({ data: v }),
    }),
    { name: 'operasi-store' },
  ),
)
