import { Edit } from 'lucide-react'

import { useQuery } from '@tanstack/react-query'

import Error from '@/components/error'
import { InformasiPasien } from '@/components/informasi_pasien'
import { LayoutBorderNo } from '@/components/layout_border_no'
import Loading from '@/components/loading'
import { SimpleColumn } from '@/components/simple-column'
import { getData } from '@/services/edukasi-terintegrasi'
import { useGlobalStore } from '@/store/global.store'
import { usePasienStore } from '@/store/pasien.store'
import { constants } from '@/utils/constants'

interface EdukasiTerintegrasiProps {
  isReport?: boolean
}

export function EdukasiTerintegrasi({
  isReport = false,
}: EdukasiTerintegrasiProps) {
  const { setDialogId, setShowDialog, setItem } = useGlobalStore(
    (state) => state,
  )
  const { pasien } = usePasienStore((state) => state)

  const { data, isLoading, isError } = useQuery({
    queryKey: [constants.queryKey.pasien.edukasiTerintegrasi.list],
    queryFn: () => getData(pasien!.no_rm),
  })

  const result = data?.response != null ? data.response : []

  if (isLoading) return <Loading />
  if (isError) return <Error />

  return (
    <LayoutBorderNo no='RM. 20 REV 2023' isReport={isReport}>
      {/* Content */}
      <div className='p-2'>
        <h1 className='text-center text-black font-semibold mb-4'>
          EDUKASI TERINTEGRASI PASIEN/KELUARGA
        </h1>

        {/* Informasi Pasien */}
        {pasien != null && (
          <InformasiPasien
            nama={pasien.nama_pasien}
            noRM={pasien.no_rm}
            ruangan={pasien.bagian}
            tanggalLahir={pasien.tgl_lahir}
          />
        )}
        {/* Informasi Pasien */}

        <div>
          {/* Header */}
          <div className='flex text-xs'>
            <SimpleColumn head name='Tanggal & Jam' className='w-[100px]' />
            <SimpleColumn head name='Informasi/Edukasi yang diberikan' />
            <SimpleColumn head name='Metode' />
            <SimpleColumn head name='Pemberi Informasi' />
            <SimpleColumn head name='Penerima Informasi' />
            <SimpleColumn head name='Evaluasi' isLast={isReport} />
            {!isReport && (
              <SimpleColumn head name='Action' isLast className='w-[100px]' />
            )}
          </div>
          {/* Header */}

          {/* Body */}

          {result.length > 0 &&
            result.map((item, index) => (
              <div className='flex text-xs text-wrap' key={index}>
                <SimpleColumn name={item.tanggal} className='w-[100px]' />
                <SimpleColumn name={item.informasi} />
                <SimpleColumn name={item.metode} />
                <SimpleColumn name={item.pemberi_informasi} />
                <SimpleColumn name={item.penerima_informasi} />
                <SimpleColumn name={item.evaluasi} isLast={isReport} />
                {!isReport && (
                  <SimpleColumn
                    isChild={
                      <Edit
                        className='hover:cursor-pointer'
                        onClick={() => {
                          setShowDialog(true)
                          setItem(item)
                          setDialogId('dialog-update-edukasi-terintegrasi')
                        }}
                      />
                    }
                    isLast
                    className='w-[100px]'
                  />
                )}
              </div>
            ))}
          {/* Body */}
        </div>
      </div>
      {/* Content */}
    </LayoutBorderNo>
  )
}
