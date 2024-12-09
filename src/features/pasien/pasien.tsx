import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import Error from '@/components/error'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { getPasienByPelayanan } from '@/services/pasien'
import { getPelayanan } from '@/services/pelayanan'
import { useAuthStore } from '@/store/auth.store'
import { constants } from '@/utils/constants'

import { DetailPasien } from './components/detail-pasien'
import { pasienColumns } from './components/table/pasien-columns'
import { PasienDataTable } from './components/table/pasien-data-table'

export default function Pasien() {
  // store
  const authState = useAuthStore((state) => state)

  // state
  const [bagian, setBagian] = useState<string>(authState.user?.kd_bagian ?? '')

  const { data: list } = useQuery({
    queryKey: [constants.queryKey.pelayanan.list],
    queryFn: getPelayanan,
    staleTime: Infinity,
  })

  const {
    data: listPasien,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [constants.queryKey.pasien.byPelayanan, bagian],
    queryFn: () => getPasienByPelayanan({ kd_bagian: bagian }),
  })

  return (
    <>
      <div className='pelayanan-container flex items-center gap-2 overflow-x-auto  h-[50px] mb-4'>
        {list?.response.map((item) => (
          <Button
            onClick={() => setBagian(item.kd_bagian)}
            variant={bagian != item.kd_bagian ? undefined : 'outline'}
            key={item.kd_bagian}
            className='transition-all ease-in hover:-translate-y-1 border'
          >
            {item.bagian}
          </Button>
        ))}
      </div>

      {/* Tabel */}
      {isLoading ? (
        <Skeleton className='flex h-[calc(100vh-30vh)] rounded-md border' />
      ) : isError ? (
        <Error className='text-red-500' />
      ) : (
        <PasienDataTable
          columns={pasienColumns}
          data={listPasien?.response ?? []}
        />
      )}
      {/* Tabel */}

      {/* Detail */}
      <DetailPasien />
      {/* Detail */}
    </>
  )
}
