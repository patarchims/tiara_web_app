import { z } from 'zod'

import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { match } from 'ts-pattern'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { saveCpptSoap, updateCpptSoap } from '@/services/cppt'
import { useAuthStore } from '@/store/auth.store'
import { useGlobalStore } from '@/store/global.store'
import { usePasienStore } from '@/store/pasien.store'
import { Cppt, Meta } from '@/type'
import { constants } from '@/utils/constants'

// zod schema
const formSaveSchema = z.object({
  kelompok: z.string(),
  kd_bagian: z.string(),
  noreg: z.string(),
  dpjp: z.string(),
  subjektif: z.string(),
  objektif: z.string(),
  asesmen: z.string(),
  plan: z.string(),
  instruksi_ppa: z.string(),
  pelayanan: z.string(),
})

const formUpdateSchema = z.object({
  subjektif: z.string(),
  objektif: z.string(),
  asesmen: z.string(),
  plan: z.string(),
  instruksi_ppa: z.string(),
  id: z.number(),
})

// export type for services
export type AddCpptSoapReq = z.infer<typeof formSaveSchema>
export type UpdateCpptSoapReq = z.infer<typeof formUpdateSchema>

export function useSoap() {
  const authState = useAuthStore((state) => state)
  const { item, setShowAlert, setAlertDescription } = useGlobalStore(
    (state) => state,
  )
  const pasienState = usePasienStore((state) => state)

  const formSaveSoap = useForm<AddCpptSoapReq>({
    resolver: zodResolver(formSaveSchema),
    defaultValues: {
      kelompok: authState.user?.ket_person,
      kd_bagian: authState.user?.kd_bagian,
      noreg: pasienState.pasien?.no_reg,
      dpjp: pasienState.pasien?.kd_dokter,
      pelayanan: pasienState.pasien?.pelayanan,
      subjektif: '',
      objektif: '',
      asesmen: '',
      plan: '',
      instruksi_ppa: '',
    },
  })

  const tempItem = item as Cppt
  const cppt = tempItem != null ? tempItem.cppt.trim().split('\n') : ''
  let subjektif, objective, asesmen, plan

  for (let i = 0; i < cppt.length; i++) {
    const temp = cppt[i]
    const [key, value] = temp.split(':').map((str) => str.trim())
    match(key)
      .with('Subjektif', () => {
        subjektif = value
      })
      .with('Objective', () => {
        objective = value
      })
      .with('Asesmen', () => {
        asesmen = value
      })
      .with('Plan', () => {
        plan = value
      })
  }

  const formUpdateSoap = useForm<UpdateCpptSoapReq>({
    resolver: zodResolver(formUpdateSchema),
    defaultValues: {
      subjektif: subjektif,
      asesmen: asesmen,
      id: tempItem?.id ?? -1,
      instruksi_ppa: tempItem?.instruksi_ppa ?? '',
      objektif: objective,
      plan: plan,
    },
  })

  // react query
  const queryClient = useQueryClient()
  const mutateSave = useMutation({ mutationFn: saveCpptSoap })
  const mutateUpdate = useMutation({ mutationFn: updateCpptSoap })

  async function onAddSoap(values: AddCpptSoapReq) {
    try {
      const response = await mutateSave.mutateAsync(values)
      queryClient.invalidateQueries({
        queryKey: [constants.queryKey.pasien.cppt.report],
      })
      setAlertDescription(response.metadata.message)
      setShowAlert(true)
    } catch (error) {
      console.log('error on add cppt soap', error)
      const err = error as AxiosError & {
        response: { data: { metadata: Meta } }
      }
      const data = err.response?.data ?? {}
      const meta = data.metadata as Meta
      setAlertDescription(meta.message ?? constants.message.error)
      setShowAlert(true)
    }
  }

  async function onUpdateSoap(values: UpdateCpptSoapReq) {
    try {
      const response = await mutateUpdate.mutateAsync(values)
      queryClient.invalidateQueries({
        queryKey: [constants.queryKey.pasien.cppt.report],
      })
      setAlertDescription(response.metadata.message)
      setShowAlert(true)
    } catch (error) {
      console.log('error on update cppt soap', error)
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
    formSaveSoap,
    onAddSoap,
    formUpdateSoap,
    onUpdateSoap,
  }
}
