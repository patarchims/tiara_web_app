import React from 'react'

interface InformasiPasienProps {
  nama: string
  tanggalLahir: string
  noRM: string
  ruangan: string
  isDynamic?: boolean
  left?: React.ReactNode
  right?: React.ReactNode
}

export function InformasiPasien({
  nama,
  noRM,
  ruangan,
  tanggalLahir,
  isDynamic = false,
  left,
  right,
}: Partial<InformasiPasienProps>) {
  if (isDynamic) {
    return (
      <div className='mb-4 flex'>
        <div className='w-full border-y border-l border-r border-black px-2 py-1'>
          {left}
        </div>
        <div className='w-full border-y border-black border-r px-2 py-1'>
          {right}
        </div>
      </div>
    )
  }

  return (
    <div className='mb-4 flex'>
      <div className='w-full border-y border-l border-r border-black px-2 py-1'>
        <div className='flex items-center justify-start gap-4'>
          <p className='w-[120px] text-xs'>Nama Pasien</p>
          <p className='text-xs'>: {nama}</p>
        </div>
        <div className='flex items-center justify-start gap-4'>
          <p className='w-[120px] text-xs'>Tanggal Lahir</p>
          <p className='text-xs'>: {tanggalLahir}</p>
        </div>
      </div>
      <div className='w-full border-y border-black border-r px-2 py-1'>
        <div className='flex items-center '>
          <p className='w-[180px] text-xs'>Nomor Rekam Medis </p>
          <p className='text-xs'>: {noRM}</p>
        </div>
        <div className='flex items-center'>
          <p className='w-[180px] text-xs'>Ruangan</p>
          <p className='text-xs'>: {ruangan}</p>
        </div>
      </div>
    </div>
  )
}
