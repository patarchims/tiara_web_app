import QRCode from 'react-qr-code'

import { useQuery } from '@tanstack/react-query'

import { images } from '@/assets/images/images'
import Checkbox from '@/components/checkbox'
import Error from '@/components/error'
import { InformasiPasien } from '@/components/informasi_pasien'
import { LayoutBorderNo } from '@/components/layout_border_no'
import Loading from '@/components/loading'
import Text from '@/components/text'
import { getTriase } from '@/services/triase'
import { usePasienStore } from '@/store/pasien.store'
import type { Triase } from '@/type'
import { constants } from '@/utils/constants'

import TableAsesmenNyeri from './components/table-asesmen-nyeri'

interface TriaseProps {
  isReport?: boolean
  no?: string
  noreg?: string
}

export default function Triase({
  isReport = false,
  no = '',
  noreg = '',
}: TriaseProps) {
  const { pasien } = usePasienStore((state) => state)

  const { data, isLoading, isError } = useQuery({
    queryKey: [constants.queryKey.rekamMedis.triase, noreg],
    queryFn: () => getTriase({ noreg }),
    enabled: !!noreg,
  })

  const res = data?.response != null ? data.response : null

  if (isLoading) return <Loading />
  if (isError) return <Error />

  if (res == null) return

  return (
    <LayoutBorderNo no={no} isReport={isReport}>
      {/* Content */}
      <div className='p-2'>
        <h1 className='text-center text-black font-semibold mb-4'>TRIASE</h1>

        {/* Informasi Pasien */}
        {pasien != null && (
          <InformasiPasien
            nama={res.nama_pasien}
            noRM={res.no_rm}
            ruangan={res.ruangan}
            tanggalLahir={res.tgl_lahir}
          />
        )}
        {/* Informasi Pasien */}

        {/* Detail Kedatangan Pasien */}
        <div className='flex flex-col md:flex-row items-start md:items-center border border-black p-2 mb-1'>
          <div className='flex-1'>
            <Text kStyle='min-w-[150px]' k='Tanggal Masuk' v={res.tgl_masuk} />
          </div>
          <div className='flex-1'>
            <Text
              kStyle='min-w-[150px]'
              k='Jam Kedatangan'
              v={res.jam_kedatangan}
            />
          </div>
          <div className='flex-1'>
            <Text
              kStyle='min-w-[150px]'
              k='Jam Pemeriksaan'
              v={res.jam_pemeriksaan}
            />
          </div>
        </div>
        {/* Detail Kedatangan Pasien */}

        {/* Alasan Kedatangan */}
        <div className='border border-black p-2 mb-1'>
          <Text
            kStyle='font-semibold'
            k='Alasan Kedatangan'
            v={res.alasan_datang}
          />
          <Text
            kStyle='font-semibold'
            k='Penyebab Cedera'
            v={res.penyebab_cedera}
          />
        </div>
        {/* Alasan Kedatangan */}

        {/* Keluhan Utama */}
        <div className='border border-black p-2 mb-1'>
          <Text
            kStyle='font-semibold'
            k='Keluhan Utama'
            v={res.keluhan_utama}
          />
        </div>
        {/* Keluhan Utama */}

        {/* Tanda Vital */}
        <div className='border border-black p-2 mb-1'>
          <p className='text-xs font-semibold'>Tanda Vital</p>
          <div className='flex flex-col md:flex-row'>
            <div className='flex flex-1 items-center gap-2 p-2'>
              <div className='flex-1'>
                <div className='flex items-center gap-4'>
                  <p className='min-w-[150px] text-xs'>
                    GCS : {res.triase.gcs}
                  </p>
                </div>
                <Text kStyle='min-w-[150px]' k='TD' v={res.triase.td} />
                <Text kStyle='min-w-[150px]' k='Nadi' v={res.triase.nadi} />
              </div>
            </div>
            <div className='flex  flex-1 items-center gap-2 p-2'>
              <div className='flex-1'>
                <Text kStyle='min-w-[150px]' k='Pupil' v={res.triase.pupil} />
                <Text
                  kStyle='min-w-[150px]'
                  k='Pernafasan'
                  v={res.triase.pernafasan}
                />
                <Text kStyle='min-w-[150px]' k='Suhu' v={res.triase.suhu} />
              </div>
            </div>
            <div className='flex  flex-1 items-center gap-2 p-2'>
              <div className='flex-1'>
                <Text
                  kStyle='min-w-[150px]'
                  k='Refleks Cahaya'
                  v={res.triase.refleks}
                />
                <Text kStyle='min-w-[150px]' k='SpO2' v={res.triase.spo2} />
                <Text kStyle='min-w-[150px]' k='Akrla' v={res.triase.akral} />
              </div>
            </div>
          </div>
        </div>
        {/* Tanda Vital */}

        <div className='border border-black p-2 mb-1'>
          <Text
            kStyle='font-semibold'
            k='Status Alergi'
            v={res.status_alergi}
          />
        </div>

        <div className='border border-black p-2 mb-1'>
          <Text
            kStyle='font-semibold'
            k='Gangguan Perilaku'
            v={res.gangguan_perilaku}
          />
        </div>

        <div className='border border-black p-2 mb-1'>
          <Text
            kStyle='font-semibold'
            k='Status Kehamilan (Khusus Obgyn)'
            v={res.status_kehamilan}
          />
          <Text kStyle='font-semibold' k='HIS' v={''} />
          <Text
            kStyle='font-semibold'
            k='Lendir/Darah dari jalan lahir'
            v={''}
          />
          <p className='text-xs'>
            (Jika ada HIS dan lendir darah lakukan asesmen kebidanan)
          </p>
        </div>

        <div className='border border-black p-2 mb-1'>
          <p className='text-xs font-semibold'>Pemeriksaan Fisik</p>
          <Text k='Jalan Nafas' v={res.jalan_nafas} />
          <Text k='Pernafasan' v={res.pernafasan} />
          <Text k='Sirkulasi' v={res.sirkulasi} />
          <Text k='Kesadaran' v={res.kesadaran} />
          <Text k='Nyeri' v={res.nyeri} />
        </div>

        {/* Asesmen Nyeri */}
        <div className='border border-black p-2 mb-1'>
          <p className='text-xs font-semibold mb-1'>Asesmen Nyeri</p>
          <div className='flex flex-col md:flex-row border border-black mb-1'>
            <div className='flex-1 border md:border-r-black p-2'>
              <Checkbox
                title='Usia < 1 Tahun (NIPS)'
                className='mb-1'
                titleClassName='font-bold'
              />
              <div className='flex gap-4'>
                <div>
                  <Checkbox title='0 (tidak nyeri)' className='mb-1' />
                  <Checkbox title='1 - 2 (ringan)' className='mb-1' />
                </div>
                <div>
                  <Checkbox title='3 - 4 (sedang)' className='mb-1' />
                  <Checkbox title='4 (berat)' className='mb-1' />
                </div>
              </div>
            </div>
            <div className='flex-1 border md:border-r-black p-2'>
              <Checkbox
                title='Usia 1 - 3 Tahun (FLACCS)'
                className='mb-1'
                titleClassName='font-bold'
              />
              <div className='flex gap-4'>
                <div>
                  <Checkbox title='0 (tidak nyeri)' className='mb-1' />
                  <Checkbox title='1 - 3 (ringan)' className='mb-1' />
                </div>
                <div>
                  <Checkbox title='4 - 6 (sedang)' className='mb-1' />
                  <Checkbox title='7 - 10 (berat)' className='mb-1' />
                </div>
              </div>
            </div>
            <div className='flex-1 border p-2'>
              <Checkbox
                title='Comfort Scale (pasien tidak sadar)'
                className='mb-1'
                titleClassName='font-bold'
              />
              <div className='flex gap-4'>
                <div>
                  <Checkbox title='9-18 (nyeri kontrol)' className='mb-1' />
                  <Checkbox title='19 - 26 (ringan)' className='mb-1' />
                </div>
                <div>
                  <Checkbox title='27 - 35 (sedang)' className='mb-1' />
                  <Checkbox title='>35 (berat)' className='mb-1' />
                </div>
              </div>
            </div>
          </div>
          <Checkbox
            title='Usia > 3 Tahun (Wong Baker Combined Numeric Rating Scale)'
            className='mb-4'
            titleClassName='font-bold'
          />
          <div className='flex items-center my-5'>
            <div className='flex flex-1 gap-4 justify-around'>
              {/* {res.gambar_nyeri.map((item, index) => (
                <img
                  key={index}
                  src={item.image_url}
                  alt={'nyeri icon'}
                  className={cn('h-[80px] w-[80px] object-contain')}
                />
              ))} */}
              <img
                alt='skala nyeri icon'
                src={images.skalaNyeri}
                className='object-contain h-[180px] w-[600px]'
              />
            </div>
            <div className='flex-[0.3]'>
              <Checkbox
                title='0 (tidak nyeri)'
                className='mb-2'
                isChecked={res.skor_nyeri == 0}
              />
              <Checkbox
                title='1 - 3 (ringan)'
                className='mb-2'
                isChecked={res.skor_nyeri >= 1 && res.skor_nyeri <= 3}
              />
              <Checkbox
                title='4 - 6 (sedang)'
                className='mb-2'
                isChecked={res.skor_nyeri >= 4 && res.skor_nyeri <= 6}
              />
              <Checkbox
                title='7 - 10 (berat)'
                className='mb-2'
                isChecked={res.skor_nyeri >= 7 && res.skor_nyeri <= 10}
              />
            </div>
          </div>
          <TableAsesmenNyeri skalaTriase={res.skala_triase} />
        </div>
        {/* Asesmen Nyeri */}
      </div>
      {/* Content */}

      {/* Petugas Triase */}
      <div className='p-2 mb-1 m-2'>
        {res != null && res.petugas_triase != '' && (
          <div className='text-center flex flex-col items-center gap-2'>
            <p className='text-xs font-semibold'>Petugas Triase</p>
            <QRCode
              value={res.petugas_triase ?? ''}
              className='w-[100px] h-[100px]'
            />
            <p className='text-xs font-semibold'>({res.petugas_triase})</p>
          </div>
        )}
      </div>
      {/* Petugas Triase */}
    </LayoutBorderNo>
  )
}
