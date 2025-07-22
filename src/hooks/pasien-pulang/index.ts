import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'

import { toast } from '@/hooks/use-toast'
import { getPasienPulang } from '@/services/pasien-pulang'
import { useGlobalStore } from '@/store/global.store'
import { usePasienStore } from '@/store/pasien.store'
import type { PasienPulang } from '@/type'
import { constants } from '@/utils/constants'

export default function usePasienPulang() {
  // store
  const { setPasien } = usePasienStore((state) => state)
  const { dialogId, setDialogId, setShowAlert, setAlertDescription } =
    useGlobalStore((state) => state)

  // state
  const [search, setSearch] = useState('')
  const [data, setData] = useState<PasienPulang[] | []>([])
  const [empty, setEmpty] = useState(false)
  const [status, setStatus] = useState<'loading' | ''>('')

  const searchPasien = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setData([])
      setEmpty(false)
      setStatus('loading')
      if (search == '') {
        setAlertDescription('Nomor Rekam Medis tidak boleh kosong')
        setShowAlert(true)
        return
      }
      const res = await getPasienPulang({ no_rm: search })
      if (res) {
        if (res.response.length == 0) setEmpty(true)
        else setData(res.response)
      }
      setStatus('')
    } catch (error) {
      setStatus('')
      setEmpty(false)
      const err = error as AxiosError
      toast({
        variant: 'destructive',
        title: constants.message.error,
        description: err?.message ?? 'error',
      })
    }
  }

  useEffect(() => {
    if (search == '') {
      setEmpty(false)
      setData([])
    }
  }, [search])

  return {
    search,
    data,
    empty,
    dialogId,
    status,
    setSearch,
    searchPasien,
    setPasien,
    setDialogId,
  }
}
