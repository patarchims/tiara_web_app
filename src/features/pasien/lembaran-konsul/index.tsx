import { useQuery } from '@tanstack/react-query'

import Error from '@/components/error'
import { InformasiPasien } from '@/components/informasi_pasien'
import { LayoutBorderNo } from '@/components/layout_border_no'
import Loading from '@/components/loading'
import Text from '@/components/text'
import { getLembarKonsul } from '@/services/lembar-konsul'
import { constants } from '@/utils/constants'
import { TextTitle } from '@/features/pasien-pulang/rekam-medis/components/text-title'
import { DiagnosaKerja } from './components/diagnosa-kerja'
import QRCode from 'react-qr-code'

interface LembaranKonsulProps {
  isReport?: boolean
  no?: string
  noreg?: string
}

export default function LembaranKonsul({
  isReport = false,
  no = '',
  noreg = '',
}: LembaranKonsulProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [constants.queryKey.rekamMedis.lembarKonsul, noreg],
    queryFn: () => getLembarKonsul({ noreg }),
    // enabled: !!noreg,
  })

  const res = data?.response != null ? data.response : null
  console.log(res)

  if (isLoading) return <Loading />
  if (isError) return <Error />

  return (
    <LayoutBorderNo no={no} isReport={isReport}>
      {/* Content */}
      <div className='p-2 text-xs'>
        <h1 className='text-center text-black font-semibold mb-4'>
          LEMBARAN KONSUL
        </h1>

        {/* Informasi Pasien */}
        {res != null && (
          <InformasiPasien
            isDynamic={true}
            left={
              <>
                <div className='flex items-center justify-start gap-4'>
                  <p className='w-[180px]'>Nama Pasien</p>
                  <p>: {res?.lembar_konsul?.nama_pasien}</p>
                </div>
                <div className='flex items-center justify-start gap-4'>
                  <p className='w-[180px]'>Tanggal Lahir</p>
                  <p>: {res?.lembar_konsul?.tanggal_lahir}</p>
                </div>
                <div className='flex items-center justify-start gap-4'>
                  <p className='w-[180px]'>Nomor Rekam Medis</p>
                  <p>: {res?.lembar_konsul?.no_rm}</p>
                </div>
              </>
            }
            right={
              <>
                <div className='flex items-center justify-start gap-4'>
                  <p className='w-[100px]'>No Reg</p>
                  <p>: {res?.lembar_konsul?.noreg}</p>
                </div>
                <div className='flex items-center justify-start gap-4'>
                  <p className='w-[100px]'>Ruangan</p>
                  <p>: {res?.lembar_konsul?.ruangan}</p>
                </div>
                <div className='flex items-center justify-start gap-4'>
                  <p className='w-[100px]'>Dokter</p>
                  <p>: {res?.lembar_konsul?.dokter}</p>
                </div>
              </>
            }
          />
        )}
        {/* Informasi Pasien */}

        {/* Jenis Konsultasi */}
        <div className='flex items-center border border-black p-2 mb-1'>
          <div className='flex-1'>
            <Text
              kStyle='min-w-[150px]'
              k='Jenis Konsultasi'
              v={res?.lembar_konsul?.jenis_konsultasi}
            />
          </div>
        </div>
        {/* Jenis Konsultasi */}

        {/* Dokter Yang Meminta Konsul */}
        <div className='border border-black p-2 mb-1'>
          <Text k='Dokter Yang Meminta Konsul' v={res?.lembar_konsul.dokter_meminta_konsul} />
          <Text k='Tanggal' v={res?.lembar_konsul.tanggal_konsul} />
          <p className='my-1'>Yth, T.S.DR/Konsultan </p>
          <div className='flex items-center gap-4'>
            <p>
              Mohon konsultasi pasien dengan Nama :{' '}
              {res?.lembar_konsul?.mohon_konsul_pasien}
            </p>
            <p>Umur : {res?.lembar_konsul?.umur_pasien}</p>
          </div>
          <p>yang kami rawat dengan,</p>
          <Text k='Iktisar klinik' v={res?.lembar_konsul?.iktisar_klinik} />


          <div className='flex items-center justify-between'>
            <TextTitle title='Diagnosa Kerja' />

          </div>
          <DiagnosaKerja data={res != null ? res.lembar_konsul.diagnosa_kerja : []} />
        </div>
        {/* Dokter */}
        {res != null && res.lembar_konsul?.dokter_meminta_konsul != '' && (
          <div className='p-2 mb-1 m-2 flex justify-end'>
            <div className='text-center text-center  flex flex-col gap-4 items-center text-center text-xs'>
              <QRCode value={res?.lembar_konsul?.dokter_meminta_konsul!} className='h-[50px] w-[50px]' />
              <p>({res?.lembar_konsul?.dokter_meminta_konsul})</p>
            </div>
          </div>
        )}
        {/* Dokter */}
        {/* Dokter Yang Meminta Konsul */}

        {/* Jawaban */}
        <div className='border border-black p-2 mb-1'>
          <p className='font-semibold text-center'>Jawaban</p>
          <Text k='Tanggal' v={res?.jawaban_konsul.tanggal} />
          <Text k='Penemuan' v={res?.jawaban_konsul.penemuan} />
          <Text k='Diagnosa' v={res?.jawaban_konsul.diagnosa} />
          <Text k='Terapi' v={res?.jawaban_konsul.terapi} />
          <Text k='Anjuran' v={res?.jawaban_konsul.anjuran} />
        </div>
        {/* Jawaban */}
      </div>
      {/* Content */}

      {/* Dokter */}
      {res != null && res?.lembar_konsul?.dokter != '' && (
        <div className='p-2 mb-1 m-2 flex justify-end'>
          <div className='text-center  flex flex-col gap-4 items-center text-center text-xs'>


            <QRCode value={res?.lembar_konsul?.dokter!} className='h-[50px] w-[50px]' />
            <p>({res?.lembar_konsul?.dokter})</p>
          </div>
        </div>
      )}
      {/* Dokter */}
    </LayoutBorderNo>
  )
}
