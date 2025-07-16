import { Edit } from 'lucide-react'

import { useQuery } from '@tanstack/react-query'

import Error from '@/components/error'
import { InformasiPasien } from '@/components/informasi_pasien'
import { LayoutBorderNo } from '@/components/layout_border_no'
import Loading from '@/components/loading'
import { SimpleColumn } from '@/components/simple-column'
import { getReportCppt } from '@/services/cppt'
import { useAuthStore } from '@/store/auth.store'
import { useGlobalStore } from '@/store/global.store'
import { usePasienStore } from '@/store/pasien.store'
import { constants } from '@/utils/constants'

interface CPPTProps {
  isReport?: boolean
  no_rm?: string
}

export function CPPT({ isReport = false, no_rm = '' }: CPPTProps) {
  const { setDialogId, setShowDialog, setItem } = useGlobalStore(
    (state) => state,
  )
  const { pasien } = usePasienStore((state) => state)
  const { user } = useAuthStore((state) => state)

  const { data, isLoading, isError } = useQuery({
    queryKey: [constants.queryKey.pasien.cppt.report],
    queryFn: () => getReportCppt(no_rm != '' ? no_rm : pasien!.no_rm),
  })

  const result = data?.response != null ? data?.response : []

  if (isLoading) return <Loading />
  if (isError) return <Error />

  return (
    <LayoutBorderNo no='RM.RI ?' isReport={isReport}>
      {/* Content */}
      <div className='p-2'>
        <h1 className='text-center text-black font-semibold mb-4'>
          CATATAN PERKEMBANGAN PASIEN TERINTEGRASI
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

          {result.length > 0 &&
            result.map((item) => (
              <div className='flex text-xs' key={item.id}>
                <SimpleColumn name={item.tanggal} className='w-[100px]' />
                <SimpleColumn
                  name={item.pemberi_asuhan}
                  className='flex-[0.5]'
                />
                <SimpleColumn
                  isChild={
                    <>
                      {item.situation != '' ? (
                        <>
                          <Item k='S' value={item.situation} />
                          <Item k='B' value={item.background} />
                          <Item k='A' value={item.asesmen} />
                          <Item k='R' value={item.recommendation} />
                        </>
                      ) : (
                        <>
                          <Item k='S' value={item.subjektif} />
                          <Item k='O' value={item.objektif} />
                          <Item k='A' value={item.asesmen} />
                          <Item k='P' value={item.plan} />
                        </>
                      )}
                    </>
                  }
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
                {!isReport && pasien?.bagian === user?.bagian && (
                  <SimpleColumn
                    isChild={
                      <Edit
                        className='hover:cursor-pointer'
                        onClick={() => {
                          setShowDialog(true)
                          console.log('selected cppt item', item)
                          setItem(item)
                          if (item.subjektif != '') {
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

const Item = ({ k, value }: { k: string; value: string }) => {
  return (
    <span className='flex flex-shrink-0 gap-1'>
      <strong>{k}</strong> :{' '}
      <p className='text-xs text-black text-left'>{value}</p>
    </span>
  )
}
