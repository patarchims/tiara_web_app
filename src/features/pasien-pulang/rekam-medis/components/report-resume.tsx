import QRCode from 'react-qr-code'

import { useQuery } from '@tanstack/react-query'

import Error from '@/components/error'
import { LayoutBorderNo } from '@/components/layout_border_no'
import Loading from '@/components/loading'
import { getResumeMedis } from '@/services/rekam-medis'
import { constants } from '@/utils/constants'

import { DiagnosaTable } from './diagnosa-table'
import { LaborTable } from './labor-table'
import { ObatTable } from './obat-table'
import { RadiologiTable } from './radiologi-table'
import { TextField } from './text-field'
import { TextTitle } from './text-title'

interface ReportResumeProps {
  isReport?: boolean
  noreg?: string
  no?: string
}

export default function ReportResume({
  isReport = false,
  noreg = '',
  no,
}: ReportResumeProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [constants.queryKey.rekamMedis.resumeMedis, noreg],
    // queryFn: () => getResumeMedis('20220629043274'),
    queryFn: () => getResumeMedis(noreg),
    enabled: !!noreg,
  })

  const res = data != null ? data.response : null

  if (isLoading) return <Loading />
  if (isError) return <Error />

  return (
    <LayoutBorderNo isReport={isReport} no={no}>
      <div className='p-4'>
        <h3 className='font-bold text-center py-3'>
          RINGKASAN PERAWATAN PASIEN PULANG / RESUME
        </h3>

        <div className='flex items-center gap-4 border p-2 mb-4'>
          <div className='flex-1'>
            <TextField title='Nama' value={res?.nama_pasien} />
            <TextField title='Tanggal Lahir' value={res?.tanggal_lahir} />
            <TextField title='Nomor Rekam Medis' value={res?.no_rm} />
            <TextField title='Tanggal Masuk' value={res?.tgl_masuk} />
            <TextField title='Tanggal Keluar' value={res?.tgl_keluar} />
          </div>
          <div className='flex-1'>
            <TextField title='No. Register' value={res?.no_register} />
            <TextField title='Jenis Kelamin' value={res?.jenis_kelamin} />
            <TextField title='Alamat' value={res?.alamat} />
            <TextField
              title='Ruangan/Kelas'
              value={`${res?.ruang}/${res?.kelas}`}
            />
            <TextField title='Dokter Merawat' value={res?.dokter_merawat} />
          </div>
        </div>

        <div className='border p-2 mb-4'>
          <TextTitle title='Diagnosa' />
          <DiagnosaTable data={res != null ? res.diagnosa : []} />
        </div>

        {/* <div className='flex items-center gap-4 border p-2 mb-4'>
          <div className='flex-1'>
            <TextField title='Diagnosa Masuk' value='' />
            <TextField title='Diagnosa Utama' value='' />
            <TextField title='Diagnosa Lain' value='' />
            <TextField title='Jenis Tindakan' value='' />
          </div>
          <div className='flex-1'>
            <TextField title='Kode ICD' value='' />
            <TextField title='Kode ICD' value='' />
            <TextField title='Kode ICD' value='' />
            <TextField title='Kode ICD' value='' />
            <TextField title='ICD9CM' value='' />
          </div>
        </div> */}

        <div className='flex items-center gap-4 border p-2 mb-4'>
          <div className='flex-1'>
            <TextTitle title='Riwayat Penyakit' />
            <p className='text-xs'>{res?.riwayat_penyakit}</p>
            <div>
              <TextTitle title='Pemeriksaan Fisik' />
              <div className='flex items-start  gap-4'>
                <div className='flex-1'>
                  <TextField title='TB' value={res?.pemeriksaan_fisik?.tb} />
                  <TextField title='TD' value={res?.pemeriksaan_fisik?.td} />
                  <TextField title='BB' value={res?.pemeriksaan_fisik?.bb} />
                  <TextField
                    title='Nadi'
                    value={res?.pemeriksaan_fisik?.nadi}
                  />
                </div>
                <div className='flex-1'>
                  <TextField
                    title='Suhu'
                    value={res?.pemeriksaan_fisik?.suhu}
                  />
                  <TextField
                    title='Spo2'
                    value={res?.pemeriksaan_fisik?.spo2}
                  />
                  <TextField
                    title='Pernafasan'
                    value={res?.pemeriksaan_fisik?.penafasan}
                  />
                </div>
              </div>
            </div>
            <div>
              <TextTitle title='Laboratorium' />
              <LaborTable data={res != null ? res.labor : []} />
            </div>
            <div>
              <TextTitle title='Pemeriksaan Lain' />
              <RadiologiTable data={res != null ? res.radiologi : []} />
            </div>
            <div>
              <TextTitle
                title={`Pemberian Medika mentosa & Obat waktu pulang`}
              />
              <ObatTable data={res != null ? res.obat_waktu_pulang : []} />
            </div>
            <TextField
              title='Keadaan waktu pulang/keluar'
              value={res?.keadaan}
            />
            <div className='flex gap-4'>
              <TextField title='Kontrol Ulang' value={''} />
              <div>
                <TextField title='Tempat' value={''} />
                <TextField title='Tanggal/Jam' value={''} />
              </div>
            </div>
            <TextField title='Instruksi Pelayanan' value='' />
            <TextField title='Kesehatan yang diperlukan pasien' value='' />
          </div>
        </div>

        {/* Tanda Tangan */}
        <div className='ml-4'>
          <div className='py-10' />
          <div className='flex items-end justify-between'>
            <div className='w-full text-center flex flex-col justify-between items-center gap-4'>
              {res != null && res.nama_pasien != '' ? (
                <>
                  <p className='text-sm font-medium'>Pasien / Keluarga</p>
                  {res.nama_pasien != null ? (
                    <QRCode
                      value={res.nama_pasien}
                      className='h-[100px] w-[100px]'
                    />
                  ) : (
                    <div className='h-[100px]' />
                  )}
                  <p className='text-sm'>( {res.nama_pasien} )</p>
                </>
              ) : (
                <div className='h-[100px]' />
              )}
            </div>
            <div className='w-full text-center items-center flex flex-col gap-4'>
              {res != null && res.dokter_merawat != '' ? (
                <>
                  <p className='text-sm font-medium'>Dokter Yang Merawat</p>
                  {res.dokter_merawat != null ? (
                    <QRCode
                      value={res.dokter_merawat}
                      className='h-[100px] w-[100px]'
                    />
                  ) : (
                    <div className='h-[100px]' />
                  )}
                  <p className='text-sm'>( {res.dokter_merawat} )</p>
                </>
              ) : (
                <div className='h-[100px]' />
              )}
            </div>
          </div>
        </div>
        {/* Tanda Tangan */}
      </div>
    </LayoutBorderNo>
  )
}
