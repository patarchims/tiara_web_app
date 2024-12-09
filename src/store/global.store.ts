import { create } from 'zustand'

import { DialogId } from '@/type'

interface GlobalState {
  showAlert: boolean
  showDialog: boolean
  alertDescription: string
  dialogDescription: string
  dialogId: DialogId
  item: unknown // for update data
  setAlertDescription: (val: string) => void
  setDialogDescription: (val: string) => void
  setShowDialog: (val: boolean) => void
  setShowAlert: (val: boolean) => void
  setDialogId: (val: DialogId) => void
  setItem: (val: unknown) => void
}

export const useGlobalStore = create<GlobalState>((set) => ({
  showAlert: false,
  alertDescription: '',
  showDialog: false,
  dialogDescription: '',
  dialogId: '',
  item: null,
  setAlertDescription: (val: string) => set(() => ({ alertDescription: val })),
  setDialogDescription: (val: string) =>
    set(() => ({ dialogDescription: val })),
  setShowAlert: (val: boolean) => set(() => ({ showAlert: val })),
  setShowDialog: (val: boolean) => set(() => ({ showDialog: val })),
  setDialogId: (val: DialogId) => set(() => ({ dialogId: val })),
  setItem: (val: unknown) => set(() => ({ item: val })),
}))
