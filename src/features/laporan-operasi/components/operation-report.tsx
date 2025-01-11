import { useEffect } from 'react'
import QRCode from 'react-qr-code'

import { LayoutBorderNo } from '@/components/layout_border_no'
import { SimpleColumn } from '@/components/simple-column'
import Text from '@/components/text'
import { getLaporOperasi } from '@/services/laporan-operasi'
import { useOperasiStore } from '@/store/operasi'
import { LaporanOperasi } from '@/type'

import Checkbox from '../../../components/checkbox'
import DiagnosaWrapper from './diagnosa-wrapper'
import Item from './item'
import ItemCheckbox from './item-checkbox'

interface OperationReportProps {
  isReport?: boolean
  noreg?: string
}

const OperationReport = ({ isReport, noreg = '' }: OperationReportProps) => {
  const { data, setData } = useOperasiStore()

  useEffect(() => {
    if (noreg != '') {
      setData({} as LaporanOperasi)
      ;(async () => {
        const response = await getLaporOperasi({ noreg })
        if (response.metadata.code == 400) {
          setData({} as LaporanOperasi)
          return
        }
        setData(response.response)
      })()
    }
  }, [noreg])

  if (Object.keys(data).length != 0)
    return (
      <LayoutBorderNo isReport={isReport}>
        <div className='p-4'>
          <h3 className='font-bold text-center'>LAPORAN OPERASI</h3>

          {/* Info */}
          <div className='flex flex-col md:flex-row items-start gap-4 mt-4'>
            <div className='flex-1'>
              <Text k='Nama Pasien' v={data?.profil_pasien?.nama} />
              <Text k='Tanggal Lahir' v={data?.profil_pasien?.tgl_lahir} />
              <Text k='No. Rekam' v={data?.profil_pasien?.no_rm} />
            </div>
            <div className='flex-1'>
              <Text
                k='Nama Ahli Bedah'
                v={data?.ahli_bedah?.map((item) => item.nama).join(', ')}
              />
              <Text
                k='Nama Asisten'
                v={data?.asisten?.map((item) => item.nama).join(', ')}
              />
              <Text
                k='Nama Instrumen'
                v={data?.istrumen?.map((item) => item.nama).join(', ')}
              />
              <Text
                k='Nama Ahli Anastesi'
                v={data?.ahli_anastesi?.map((item) => item.nama).join(', ')}
              />
              <Text
                k='Nama Perawat'
                v={data?.perawat_anastesi?.map((item) => item.nama).join(', ')}
              />
            </div>
          </div>
          {/* Info */}

          {/* Table */}
          {/* Header */}
          <div className='flex mt-4'>
            <SimpleColumn
              name='Tanggal Operasi'
              className='text-xs flex-1 bg-green-200'
            />
            <SimpleColumn
              name='Jam Operasi Dimulai'
              className='text-xs flex-1 bg-green-200'
            />
            <SimpleColumn
              name='Jam Operasi Selesai'
              className='text-xs flex-1 bg-green-200'
            />
            <SimpleColumn
              isLast
              name='Lama Operasi Berlangsung'
              className='text-xs flex-1 bg-green-200'
            />
          </div>
          {/* Header */}

          {/* Body */}
          <div className='flex'>
            <SimpleColumn
              name={data?.tanggal_operasi}
              className='text-xs flex-1 border-t-0'
            />
            <SimpleColumn
              name={data?.jam_operasi_dimulai}
              className='text-xs flex-1 border-t-0'
            />
            <SimpleColumn
              name={data?.jam_operasi_selesai}
              className='text-xs flex-1 border-t-0'
            />
            <SimpleColumn
              isLast
              name={data?.lama_operasi_berlangsung}
              className='text-xs flex-1 border-t-0'
            />
          </div>
          {/* Body */}

          <DiagnosaWrapper title='A. DIAGNOSA PENYAKIT ( ICD 10 ) PRE BEDAH/OPERASI'>
            {data?.diagnosa_pre.map((item, idx) => (
              <Item
                key={idx}
                number={`${idx + 1}`}
                name={`${item.kode} ${item.deskripsi}`}
              />
            ))}
          </DiagnosaWrapper>

          <DiagnosaWrapper title='B. DIAGNOSA PENYAKIT ( ICD 10 ) POST BEDAH/OPERASI'>
            {data?.diagnosa_post.map((item, idx) => (
              <Item
                key={idx}
                number={`${idx + 1}`}
                name={`${item.kode} ${item.deskripsi}`}
              />
            ))}
          </DiagnosaWrapper>

          <DiagnosaWrapper title='C.PROCEDURE - TINDAKAN BEDAH ( ICD 9 )'>
            {data?.tindakan_operasi.map((item, idx) => (
              <Item
                key={idx}
                number={`${idx + 1}`}
                name={`${item.kode} ${item.deskripsi}`}
              />
            ))}
          </DiagnosaWrapper>

          <div className='border border-t-0 border-black p-2'>
            <ItemCheckbox title='Klasifikasi'>
              {data?.klasifikasi.map((i) => (
                <Checkbox title={i.nama} isChecked={i.is_active} key={i.nama} />
              ))}
            </ItemCheckbox>
            <ItemCheckbox title='Jenis Operasi'>
              {data?.jenis_operasi.map((i) => (
                <Checkbox title={i.nama} isChecked={i.is_active} key={i.nama} />
              ))}
            </ItemCheckbox>
            <ItemCheckbox title='Klasifikasi Luka'>
              {data?.klasifikasi_luka.map((i) => (
                <Checkbox title={i.nama} isChecked={i.is_active} key={i.nama} />
              ))}
            </ItemCheckbox>
            <ItemCheckbox title='Pengiriman Jaringan'>
              {data?.pengiriman_jaringan.map((i) => (
                <Checkbox title={i.nama} isChecked={i.is_active} key={i.nama} />
              ))}
              <p className='text-xs'>Jenis Jaringan: {data?.jenis_jaringan}</p>
            </ItemCheckbox>
          </div>
          {/* Table */}

          <div className='border p-2 border-t-0 border-black bg-green-200'>
            <div>
              <p className='text-xs'>URAIAN OPERASI</p>
              <p className='text-xs'>
                (posisi pasien, sayatan, jaringan yang tampak, kelainan
                jaringan/organ, jaringan yang dikeluarkan, jahitan, drainage,
                dan sebagainya)
              </p>
            </div>
          </div>
          <div className='border border-black p-2 border-t-0 min-h-[100px]'>
            <p className='text-xs whitespace-pre-wrap'>
              {data?.uraian_operasi}
            </p>
          </div>
        </div>

        {/* Dokter  */}
        <div className='flex justify-end p-4'>
          <div className='flex flex-col text-center justify-center items-center'>
            <p className='text-xs'>Pematangsiantar, {data?.tanggal}</p>
            {data != null && (
              <QRCode
                value={data?.ahli_bedah[0].nama}
                className='h-[100px] w-[100px] my-4'
              />
            )}
            <p className='text-xs underline'>{data?.ahli_bedah[0].nama}</p>
            <p className='text-xs'>Dokter Bedah - Operator</p>
          </div>
        </div>
        {/* Dokter  */}
      </LayoutBorderNo>
    )

  return (
    <div className='h-[80vh] flex items-center justify-center text-center'>
      <p className='font-medium'>Data tidak ditemukan.</p>
    </div>
  )
}

export default OperationReport
