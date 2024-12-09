import { z } from 'zod'

import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { saveEt, updateEt } from '@/services/edukasi-terintegrasi'
import { useAuthStore } from '@/store/auth.store'
import { useGlobalStore } from '@/store/global.store'
import { usePasienStore } from '@/store/pasien.store'
import { EdukasiTerintegrasi, Meta } from '@/type'
import { constants } from '@/utils/constants'

// zod schema
const formSaveSchema = z.object({
  informasi: z.string(),
  metode: z.string(),
  pemberi_informasi: z.string(),
  penerima_informasi: z.string(),
  evaluasi: z.string(),
  no_rm: z.string(),
  no_reg: z.string(),
})

const formUpdateSchema = z.object({
  informasi: z.string(),
  metode: z.string(),
  pemberi_informasi: z.string(),
  penerima_informasi: z.string(),
  evaluasi: z.string(),
  id: z.number(),
})

// export type for services
export type AddEdukasiTerintegrasiReq = z.infer<typeof formSaveSchema>
export type UpdateEdukasiTerintegrasiReq = z.infer<typeof formUpdateSchema>

export function useEdukasiTerintegrasi() {
  const authState = useAuthStore((state) => state)
  const { pasien } = usePasienStore((state) => state)
  const { item, setShowAlert, setAlertDescription } = useGlobalStore(
    (state) => state,
  )

  const formSaveEt = useForm<AddEdukasiTerintegrasiReq>({
    resolver: zodResolver(formSaveSchema),
    defaultValues: {
      informasi: '',
      metode: '',
      pemberi_informasi: '',
      penerima_informasi: '',
      evaluasi: '',
      no_reg: pasien?.no_reg,
      no_rm: pasien?.no_rm,
    },
  })

  const selectedItem = item as EdukasiTerintegrasi

  const formUpdateEt = useForm<UpdateEdukasiTerintegrasiReq>({
    resolver: zodResolver(formUpdateSchema),
    defaultValues: {
      informasi: selectedItem?.informasi ?? '',
      metode: selectedItem?.metode ?? '',
      pemberi_informasi: selectedItem?.pemberi_informasi ?? '',
      penerima_informasi: selectedItem?.penerima_informasi ?? '',
      evaluasi: selectedItem?.evaluasi ?? '',
      id: selectedItem?.id ?? -1,
    },
  })

  // react query
  const queryClient = useQueryClient()
  const mutateSave = useMutation({ mutationFn: saveEt })
  const mutateUpdate = useMutation({ mutationFn: updateEt })

  async function onAddEt(values: AddEdukasiTerintegrasiReq) {
    try {
      const response = await mutateSave.mutateAsync(values)
      queryClient.invalidateQueries({
        queryKey: [constants.queryKey.pasien.edukasiTerintegrasi.list],
      })
      setAlertDescription(response.metadata.message)
      setShowAlert(true)
    } catch (error) {
      console.log('error on add edukasi terintegrasi', error)
      const err = error as AxiosError & {
        response: { data: { metadata: Meta } }
      }
      const data = err.response?.data ?? {}
      const meta = data.metadata as Meta
      setAlertDescription(meta.message ?? constants.message.error)
      setShowAlert(true)
    }
  }

  async function onUpdateEt(values: UpdateEdukasiTerintegrasiReq) {
    try {
      const response = await mutateUpdate.mutateAsync(values)
      queryClient.invalidateQueries({
        queryKey: [constants.queryKey.pasien.edukasiTerintegrasi.list],
      })
      setAlertDescription(response.metadata.message)
      setShowAlert(true)
    } catch (error) {
      console.log('error on update edukasi terintegrasi', error)
      const err = error as AxiosError & {
        response: { data: { metadata: Meta } }
      }
      const data = err.response?.data ?? {}
      const meta = data.metadata as Meta
      setAlertDescription(meta.message ?? constants.message.error)
      setShowAlert(true)
    }
  }

  return {
    authState,
    formSaveEt,
    formUpdateEt,
    onAddEt,
    onUpdateEt,
    selectedItem,
  }
}
