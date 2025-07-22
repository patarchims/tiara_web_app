import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import usePasienPulang from '@/hooks/pasien-pulang'
import type { Pasien, PasienPulang } from '@/type'

import RekamMedis from './rekam-medis'

export default function PasienPulang() {
  const {
    search,
    setSearch,
    searchPasien,
    data,
    setPasien,
    setDialogId,
    empty,
    dialogId,
    status,
  } = usePasienPulang()

  return (
    <>
      <form className='flex gap-4' onSubmit={searchPasien}>
        <Input
          className='w-full mb-4'
          placeholder='Cari Nomor Rekam Medis'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          className='w-[100px] bg-white text-black hover:bg-white/80'
          type='button'
        >
          Cari
        </Button>
      </form>

      <div className='grid grid-cols-3 gap-4'>
        {status == 'loading' && <Skeleton className='h-[50px]' />}
        {data != null && data.length > 0 ? (
          <div
            className='p-4 bg-white rounded-md shadow-md hover:cursor-pointer hover:-translate-y-1'
            onClick={() => {
              const p = data[0] as Partial<Pasien> & {
                nama: string
                noreg: string
              }
              p.nama_pasien = p.nama
              p.no_reg = p.noreg

              console.log('p ', p)
              setPasien(p as Pasien)
              setDialogId('dialog-rekam-medis')
            }}
          >
            {data[0].no_rm} {data[0].nama}
          </div>
        ) : null}
      </div>
      {empty && (
        <div>
          <p className='text-center text-white'>Data tidak ditemukan</p>
        </div>
      )}

      {/* RekamMedis */}
      {dialogId == 'dialog-rekam-medis' && <RekamMedis />}
      {/* RekamMedis */}
    </>
  )
}
