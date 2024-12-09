import { z } from 'zod'

import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { match } from 'ts-pattern'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { saveCpptSbar, updateCpptSbar } from '@/services/cppt'
import { useAuthStore } from '@/store/auth.store'
import { useGlobalStore } from '@/store/global.store'
import { usePasienStore } from '@/store/pasien.store'
import { Cppt, Meta } from '@/type'
import { constants } from '@/utils/constants'

// zod schema
const formSaveSchema = z.object({
  kelompok: z.string(),
  kd_bagian: z.string(),
  no_reg: z.string(),
  situation: z.string(),
  background: z.string(),
  recomendation: z.string(),
  dpjp: z.string(),
  asesmen: z.string(),
  instruksi_ppa: z.string(),
  pelayanan: z.string(),
})

const formUpdateSchema = z.object({
  situation: z.string(),
  background: z.string(),
  recomendation: z.string(),
  asesmen: z.string(),
  instruksi_ppa: z.string(),
  id: z.number(),
})

// export type for services
export type AddCpptSbarReq = z.infer<typeof formSaveSchema>
export type UpdateCpptSbarReq = z.infer<typeof formUpdateSchema>

export function useSbar() {
  const authState = useAuthStore((state) => state)
  const { item, setShowAlert, setAlertDescription } = useGlobalStore(
    (state) => state,
  )
  const pasienState = usePasienStore((state) => state)

  const formSaveSbar = useForm<z.infer<typeof formSaveSchema>>({
    resolver: zodResolver(formSaveSchema),
    defaultValues: {
      no_reg: pasienState.pasien?.no_reg,
      kd_bagian: authState.user?.kd_bagian,
      kelompok: authState.user?.ket_person,
      dpjp: pasienState.pasien?.kd_dokter,
      pelayanan: pasienState.pasien?.pelayanan,
      situation: '',
      background: '',
      asesmen: '',
      recomendation: '',
      instruksi_ppa: '',
    },
  })

  //mapping for default value input
  const tempItem = (item as Cppt) ?? null
  const cppt = tempItem != null ? tempItem.cppt.trim().split('\n') : ''
  let situation, background, asesmen, rekomendation

  for (let i = 0; i < cppt.length; i++) {
    const temp = cppt[i]
    const [key, value] = temp.split(':').map((str) => str.trim())
    match(key)
      .with('Situation', () => {
        situation = value
      })
      .with('Background', () => {
        background = value
      })
      .with('Asesmen', () => {
        asesmen = value
      })
      .with('Rekomendation', () => {
        rekomendation = value
      })
  }

  const formUpdateSbar = useForm<z.infer<typeof formUpdateSchema>>({
    resolver: zodResolver(formUpdateSchema),
    defaultValues: {
      situation: situation,
      background: background,
      asesmen: asesmen,
      recomendation: rekomendation,
      instruksi_ppa: tempItem?.instruksi_ppa ?? '',
      id: tempItem?.id ?? -1,
    },
  })

  // export type for services
  const queryClient = useQueryClient()
  const mutateSave = useMutation({ mutationFn: saveCpptSbar })
  const mutateUpdate = useMutation({ mutationFn: updateCpptSbar })

  async function onAddSbar(values: z.infer<typeof formSaveSchema>) {
    try {
      const response = await mutateSave.mutateAsync(values)
      queryClient.invalidateQueries({
        queryKey: [constants.queryKey.pasien.cppt.report],
      })
      setAlertDescription(response.metadata.message)
      setShowAlert(true)
    } catch (error) {
      console.log('error on add cppt sbar', error)
      const err = error as AxiosError & {
        response: { data: { metadata: Meta } }
      }
      const data = err.response?.data ?? {}
      const meta = data.metadata as Meta
      setAlertDescription(meta.message ?? constants.message.error)
      setShowAlert(true)
    }
  }

  async function onUpdateSbar(values: z.infer<typeof formUpdateSchema>) {
    try {
      const response = await mutateUpdate.mutateAsync(values)
      queryClient.invalidateQueries({
        queryKey: [constants.queryKey.pasien.cppt.report],
      })
      setAlertDescription(response.metadata.message)
      setShowAlert(true)
    } catch (error) {
      console.log('error on update cppt sbar', error)
      const err = error as AxiosError & {
        response: { data: { metadata: Meta } }
      }
      const data = err.response?.data ?? {}
      const meta = data.metadata as Meta
      setAlertDescription(meta.message ?? constants.message.error)
      setShowAlert(true)
    }
  }

  return { authState, formSaveSbar, formUpdateSbar, onAddSbar, onUpdateSbar }
}
