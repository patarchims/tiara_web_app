import QRCode from 'react-qr-code'
import { P, match } from 'ts-pattern'

import { useQuery } from '@tanstack/react-query'

import Error from '@/components/error'
import { InformasiPasien } from '@/components/informasi_pasien'
import { LayoutBorderNo } from '@/components/layout_border_no'
import Loading from '@/components/loading'
import Text from '@/components/text'
import { cn } from '@/lib/utils'
import { getTriase } from '@/services/triase'
import { usePasienStore } from '@/store/pasien.store'
import { constants } from '@/utils/constants'

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

  return (
    <LayoutBorderNo no={no} isReport={isReport}>
      {/* Content */}
      <div className='p-2'>
        <h1 className='text-center text-black font-semibold mb-4'>TRIASE</h1>

        {/* Informasi Pasien */}
        {pasien != null && (
          <InformasiPasien
            nama={res?.nama_pasien}
            noRM={res?.no_rm}
            // ruangan={res?.}
            tanggalLahir={res?.tgl_lahir}
          />
        )}
        {/* Informasi Pasien */}

        {/* Detail Kedatangan Pasien */}
        <div className='flex flex-col md:flex-row items-start md:items-center border border-black p-2 mb-1'>
          <div className='flex-1'>
            <Text kStyle='min-w-[150px]' k='Tanggal Masuk' v={res?.tgl_masuk} />
          </div>
          <div className='flex-1'>
            <Text kStyle='min-w-[150px]' k='Jam Kedatangan' v={''} />
          </div>
          <div className='flex-1'>
            <Text
              kStyle='min-w-[150px]'
              k='Jam Pemeriksaan'
              v={res?.jam_pemeriksaan}
            />
          </div>
        </div>
        {/* Detail Kedatangan Pasien */}

        {/* Alasan Kedatangan */}
        <div className='border border-black p-2 mb-1'>
          <Text
            kStyle='font-semibold'
            k='Alasan Kedatangan'
            v={res?.alasan_datang}
          />
          <Text
            kStyle='font-semibold'
            k='Penyebab Cedera'
            v={res?.penyebab_cedera}
          />
        </div>
        {/* Alasan Kedatangan */}

        {/* Keluhan Utama */}
        <div className='border border-black p-2 mb-1'>
          <Text
            kStyle='font-semibold'
            k='Keluhan Utama'
            v={res?.keluhan_utama}
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
                  <p className='min-w-[150px] text-xs'>GCS {res?.triase.gcs}</p>
                </div>
                <Text kStyle='min-w-[150px]' k='TD' v={res?.triase.td} />
                <Text kStyle='min-w-[150px]' k='Nadi' v={res?.triase.nadi} />
              </div>
            </div>
            <div className='flex  flex-1 items-center gap-2 p-2'>
              <div className='flex-1'>
                <Text kStyle='min-w-[150px]' k='Pupil' v={res?.triase.pupil} />
                <Text
                  kStyle='min-w-[150px]'
                  k='Pernafasan'
                  v={res?.triase.pernafasan}
                />
                <Text kStyle='min-w-[150px]' k='Suhu' v={res?.triase.suhu} />
              </div>
            </div>
            <div className='flex  flex-1 items-center gap-2 p-2'>
              <div className='flex-1'>
                <Text
                  kStyle='min-w-[150px]'
                  k='Refleks Cahaya'
                  v={res?.triase.refleks}
                />
                <Text kStyle='min-w-[150px]' k='SpO2' v={res?.triase.spo2} />
                <Text kStyle='min-w-[150px]' k='Akrla' v={res?.triase.akral} />
              </div>
            </div>
          </div>
        </div>
        {/* Tanda Vital */}

        <div className='border border-black p-2 mb-1'>
          <Text
            kStyle='font-semibold'
            k='Status Alergi'
            v={res?.status_alergi}
          />
        </div>

        <div className='border border-black p-2 mb-1'>
          <Text
            kStyle='font-semibold'
            k='Gangguan Perilaku'
            v={res?.gangguan_perilaku}
          />
        </div>

        <div className='border border-black p-2 mb-1'>
          <Text
            kStyle='font-semibold'
            k='Status Kehamilan (Khusus Obgyn)'
            v={res?.status_kehamilan}
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
          <Text k='Jalan Nafas' v={res?.jalan_nafas} />
          <Text k='Pernafasan' v={res?.pernafasan} />
          <Text k='Sirkulasi' v={res?.sirkulasi} />
          <Text k='Kesadaran' v={res?.kesadaran} />
          <Text k='Nyeri' v={res?.nyeri} />
        </div>

        {/* Asesmen Nyeri */}
        <div className='border border-black p-2 mb-1'>
          <p className='text-xs font-semibold'>Asesmen Nyeri</p>
          <div className={'flex gap-4 justify-around my-2'}>
            {res?.gambar_nyeri.map((item, index) => (
              <img
                key={index}
                src={item.image_url}
                alt={'nyeri icon'}
                className={cn(
                  'h-[80px] w-[80px] object-contain',
                  checkScore(res?.skor_nyeri, item.skor)
                    ? 'grayscale-0'
                    : 'grayscale',
                )}
              />
            ))}
          </div>
          {res?.nyeri && (
            <p className='text-center my-2 text-xs font-semibold'>
              Nyeri : {res?.nyeri}
            </p>
          )}
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
              value={res?.petugas_triase ?? ''}
              className='w-[100px] h-[100px]'
            />
            <p className='text-xs font-semibold'>({res?.petugas_triase})</p>
          </div>
        )}
      </div>
      {/* Petugas Triase */}
    </LayoutBorderNo>
  )
}
function checkScore(skor_nyeri: number, skor_gambar_nyeri: number): boolean {
  return match({ skor_nyeri, skor_gambar_nyeri })
    .with(
      {
        skor_gambar_nyeri: 0,
        skor_nyeri: P.when((n) => n === 0 || n === 1),
      },
      () => true,
    )
    .with(
      {
        skor_gambar_nyeri: 1,
        skor_nyeri: P.when((n) => n === 2 || n === 3),
      },
      () => true,
    )
    .with(
      {
        skor_gambar_nyeri: 2,
        skor_nyeri: P.when((n) => n === 4 || n === 5),
      },
      () => true,
    )
    .with(
      {
        skor_gambar_nyeri: 3,
        skor_nyeri: P.when((n) => n === 6 || n === 7),
      },
      () => true,
    )
    .with(
      {
        skor_gambar_nyeri: 4,
        skor_nyeri: P.when((n) => n === 8 || n === 9),
      },
      () => true,
    )
    .with(
      {
        skor_gambar_nyeri: 5,
        skor_nyeri: 10,
      },
      () => true,
    )
    .otherwise(() => false)
}
