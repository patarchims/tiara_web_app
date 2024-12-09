import QRCode from 'react-qr-code'

import { useQuery } from '@tanstack/react-query'

import Error from '@/components/error'
import { LayoutBorderNo } from '@/components/layout_border_no'
import Loading from '@/components/loading'
import Text from '@/components/text'
import { DiagnosaTable } from '@/features/pasien-pulang/rekam-medis/components/diagnosa-table'
import { InstruksiTable } from '@/features/pasien-pulang/rekam-medis/components/instruksi-table'
import { getPengantarRawatInap } from '@/services/pengantar-rawat-inap'
import { constants } from '@/utils/constants'

interface FormPengantarRawatInapProps {
  isReport?: boolean
  no?: string
  noreg?: string
}

export default function FormPengantarRawatInap({
  isReport = false,
  no = '',
  noreg = '',
}: FormPengantarRawatInapProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [constants.queryKey.rekamMedis.pengantarRawatInap, noreg],
    queryFn: () => getPengantarRawatInap({ noreg: noreg }),
    enabled: !!noreg,
  })

  const res = data != null ? data.response : null
  const gcs =
    res != null
      ? Number(res?.pemeriksaan_fisik?.e) +
        Number(res?.pemeriksaan_fisik?.m) +
        Number(res?.pemeriksaan_fisik?.v)
      : 0
  const formattedNamaDpjp =
    res != null
      ? res?.nama_dpjp.replace('-', '').split(' ').slice(1).join(' ')
      : ''

  if (isLoading) return <Loading />
  if (isError) return <Error />

  return (
    <LayoutBorderNo no={no} isReport={isReport}>
      {/* Content */}
      <div className='p-2'>
        <h1 className='text-center text-black font-semibold text-xs mb-4'>
          FORM PENGANTAR RAWAT INAP
        </h1>
      </div>

      <div className='p-2 mb-1'>
        <p className='font-semibold text-xs'>Data Penerima</p>
        <Text k='Bagian' v={res?.bagian} />
        <Text k='Mohon' v={res?.mohon} />
      </div>

      <div className='p-2 mb-1'>
        <p className='font-semibold text-xs'>Data Pasien</p>
        <Text k='Nama Pasien' v={res?.nama_pasien} />
        <Text k='Jenis Kelamin' v={res?.jenis_kelamin} />
        <Text k='Tgl Lahir' v={res?.tgl_lahir} />
        <Text k='Alamat' v={res?.alamat} />
        <Text k='Nomor RM' v={res?.no_rm} />
        <Text k='Nama DPJP' v={formattedNamaDpjp} />
        <p className='my-2 font-semibold text-xs'>Diagnosa</p>
        <DiagnosaTable data={res != null ? res.diagnosa : []} />
        <div className='my-2'>
          <p className='font-semibold text-xs'>Pemeriksaan</p>
          <div className=''>
            <div className=''>
              <Text k='SENS' v={res?.pemeriksaan_fisik?.sens} />
              <Text k='TD' v={res?.pemeriksaan_fisik?.tekanan_darah} />
            </div>
            <div className='flex gap-1 items-start'>
              <Text k='GCS' v={gcs.toString()} />
              <div className='flex gap-1 ml-4'>
                <p className='text-xs'>E : {res?.pemeriksaan_fisik?.e}</p>
                <p className='text-xs'>M : {res?.pemeriksaan_fisik?.m}</p>
                <p className='text-xs'>V : {res?.pemeriksaan_fisik?.v}</p>
              </div>
            </div>
            <div>
              <Text k='RR' v={res?.pemeriksaan_fisik?.rr} />
              <Text k='Temp' v={res?.pemeriksaan_fisik?.temp} />
            </div>
            <div>
              <Text k='HR' v={res?.pemeriksaan_fisik?.hr} />
            </div>
            <div></div>
          </div>
        </div>
        <Text k='Keluhan' v={res?.keluhan_utama} />
        <p className='my-2 font-semibold text-xs'>Instruksi</p>
        <InstruksiTable data={res != null ? res.instruksi : []} />
        <Text
          kStyle='my-2 font-semibold text-xs'
          k='Dokter IGD/POLI'
          v={formattedNamaDpjp}
        />
      </div>
      {/* Content */}

      {/* Petugas Triase */}
      <div className='p-2 mb-1 m-2 flex items-center justify-end'>
        <div className='flex flex-col items-center justify-center gap-4 text-center'>
          {res != null && res.nama_dpjp != '' && formattedNamaDpjp != null ? (
            <>
              <p className='text-xs font-semibold'>
                Pematangsiantar,{res?.tanggal}
              </p>
              <div>
                <p className='text-xs font-semibold'>
                  Dokter penanggung jawab pelayanan
                </p>
              </div>
              <QRCode
                value={formattedNamaDpjp}
                className='h-[100px] w-[100px]'
              />
              <p className='text-xs font-semibold'>({formattedNamaDpjp})</p>
            </>
          ) : (
            <div className='h-[100px]' />
          )}
        </div>
      </div>
      {/* Petugas Triase */}
    </LayoutBorderNo>
  )
}
