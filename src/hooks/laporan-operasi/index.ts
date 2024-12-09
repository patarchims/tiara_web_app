import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'

import { getLaporOperasi } from '@/services/laporan-operasi'
import { useGlobalStore } from '@/store/global.store'
import { useOperasiStore } from '@/store/operasi'
import { LaporanOperasi } from '@/type'
import { constants } from '@/utils/constants'

import { toast } from '../use-toast'

export default function useLaporanOperasi() {
  // store
  const { setShowAlert, setAlertDescription } = useGlobalStore((state) => state)
  const operasiStore = useOperasiStore((state) => state)

  // state
  // const [search, setSearch] = useState('20241106082921')
  const [search, setSearch] = useState('')
  const [empty, setEmpty] = useState(false)

  const searchPasien = async () => {
    try {
      operasiStore.setData({} as LaporanOperasi)
      setEmpty(false)
      if (search == '') {
        setAlertDescription('Nomor Registrasi tidak boleh kosong')
        setShowAlert(true)
        return
      }

      const res = await getLaporOperasi({
        noreg: search,
      })
      if (res) {
        if (res.response == null) {
          setEmpty(true)
        } else {
          operasiStore.setData(res.response)
        }
      }
    } catch (error) {
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
      operasiStore.setData({} as LaporanOperasi)
    }
  }, [search])

  return { search, operasiStore, empty, setSearch, searchPasien }
}
