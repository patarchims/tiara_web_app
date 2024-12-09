import { useQuery } from '@tanstack/react-query'

import Error from '@/components/error'
import { InformasiPasien } from '@/components/informasi_pasien'
import { LayoutBorderNo } from '@/components/layout_border_no'
import Loading from '@/components/loading'
import { SimpleColumn } from '@/components/simple-column'
import { getReportCpptByNoreg } from '@/services/cppt'
import { useAuthStore } from '@/store/auth.store'
// import { useGlobalStore } from '@/store/global.store'
import { usePasienStore } from '@/store/pasien.store'
import { CpptByNoreg } from '@/type'
import { constants } from '@/utils/constants'

// import { Edit } from 'lucide-react'

interface CPPTResumeProps {
  isReport?: boolean
  noreg?: string
  no?: string
}

export function CPPTResume({
  isReport = false,
  noreg = '',
  no = '',
}: CPPTResumeProps) {
  // const { setDialogId, setShowDialog, setItem } = useGlobalStore(
  //   (state) => state
  // )
  const { pasien } = usePasienStore((state) => state)
  const { user } = useAuthStore((state) => state)

  const { data, isLoading, isError } = useQuery({
    queryKey: [constants.queryKey.pasien.cppt.report, noreg],
    queryFn: () => getReportCpptByNoreg(noreg),
  })

  const result = data?.response != null ? data?.response : ({} as CpptByNoreg)

  if (isLoading) return <Loading />
  if (isError) return <Error />

  return (
    <LayoutBorderNo no={no} isReport={isReport}>
      {/* Content */}
      <div className='p-2'>
        <h1 className='text-center text-black font-semibold mb-4'>
          CATATAN PERKEMBANGAN PASIEN TERINTEGRASI
        </h1>

        {/* Informasi Pasien */}
        {result.profil_pasien != null && (
          <InformasiPasien
            nama={result.profil_pasien.nama}
            noRM={pasien?.no_rm ?? ''}
            ruangan={result.profil_pasien.ruangan}
            tanggalLahir={result.profil_pasien.tgl_lahir}
          />
        )}
        {/* Informasi Pasien */}

        <div>
          {/* Header */}
          <div className='flex text-xs'>
            <SimpleColumn head name='Tanggal & Jam' className='w-[100px]' />
            <SimpleColumn
              head
              name='Professional Pemberi Asuhan'
              className='flex-[0.5]'
            />
            <SimpleColumn head name='Hasil Asesmen' className='flex-1' />
            <SimpleColumn head name='Instruksi PPA' className='flex-[0.5]' />
            <SimpleColumn
              head
              name='Verifikasi DPJP'
              isLast={isReport || pasien?.bagian !== user?.bagian}
              className='flex-[0.5]'
            />
            {!isReport && pasien?.bagian === user?.bagian && (
              <SimpleColumn head name='Action' isLast className='w-[100px]' />
            )}
          </div>
          {/* Header */}

          {/* Body */}

          {result.cppt.length > 0 &&
            result.cppt.map((item) => (
              <div className='flex text-xs' key={item.id}>
                <SimpleColumn name={item.tanggal} className='w-[100px]' />
                <SimpleColumn
                  name={item.pemberi_asuhan}
                  className='flex-[0.5]'
                />
                <SimpleColumn
                  name={item.cppt}
                  className='justify-start items-start flex-1'
                  className2='text-left'
                />
                <SimpleColumn
                  name={item.instruksi_ppa}
                  className='flex-[0.5]'
                />
                <SimpleColumn
                  name={item.dpjp}
                  hasQR
                  isLast={isReport || pasien?.bagian !== user?.bagian}
                  className='flex-[0.5]'
                />
                {/* {!isReport && pasien?.bagian === user?.bagian && (
                  <SimpleColumn
                    isChild={
                      <Edit
                        className='hover:cursor-pointer'
                        onClick={() => {
                          setShowDialog(true)
                          console.log('selected cppt item', item)
                          setItem(item)
                          if (item.cppt.includes('Subjektif')) {
                            setDialogId('dialog-update-cppt-soap')
                          } else {
                            setDialogId('dialog-update-cppt-sbar')
                          }
                        }}
                      />
                    }
                    isLast
                    className='w-[100px]'
                  />
                )} */}
              </div>
            ))}
          {/* Body */}
        </div>
      </div>
      {/* Content */}
    </LayoutBorderNo>
  )
}
