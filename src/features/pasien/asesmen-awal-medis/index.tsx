import QRCode from 'react-qr-code'

import { useQuery } from '@tanstack/react-query'

import { images } from '@/assets/images/images'
import Error from '@/components/error'
import { InformasiPasien } from '@/components/informasi_pasien'
import { LayoutBorderNo } from '@/components/layout_border_no'
import Loading from '@/components/loading'
import Text from '@/components/text'
import { DiagnosaTable } from '@/features/pasien-pulang/rekam-medis/components/diagnosa-table'
import { InstruksiTable } from '@/features/pasien-pulang/rekam-medis/components/instruksi-table'
import { LaborTable } from '@/features/pasien-pulang/rekam-medis/components/labor-table'
import { RadiologiTable } from '@/features/pasien-pulang/rekam-medis/components/radiologi-table'
import { TextTitle } from '@/features/pasien-pulang/rekam-medis/components/text-title'
import { getAsesmenDokterIgd } from '@/services/asesmen-dokter-igd'
import { usePasienStore } from '@/store/pasien.store'
import { constants } from '@/utils/constants'

interface AsesmenAwalMedisProps {
  isReport?: boolean
  noreg?: string
  no?: string
}

export default function AsesmenAwalMedis({
  isReport = false,
  no,
  noreg,
}: AsesmenAwalMedisProps) {
  const { pasien } = usePasienStore((state) => state)

  const { data, isLoading, isError } = useQuery({
    queryKey: [constants.queryKey.rekamMedis.asesmenDokterIgd, noreg],
    queryFn: () => getAsesmenDokterIgd({ noreg: noreg! }),
    enabled: !!noreg,
  })

  const res = data != null ? data.response : null

  if (isLoading) return <Loading />
  if (isError) return <Error />

  return (
    <LayoutBorderNo isReport={isReport} no={no}>
      {/* Content */}
      <div className='p-2 text-xs'>
        <h1 className='text-center text-black font-semibold mb-1'>
          ASESMEN AWAL MEDIS
        </h1>

        {/* Tanggal dan Jam */}
        <div className='flex items-center gap-4 border border-black my-2 p-2'>
          <p className='flex-1'>
            Tanggal / Jam:{' '}
            {res != null ? (res.tanggal != '' ? res.tanggal : '-') : ''}
          </p>
        </div>
        {/* Tanggal dan Jam */}

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

        {/* Subyektif */}
        <div className='border border-black my-2 p-2'>
          <p className='flex-1 font-semibold'>SUBYEKTIF</p>
          <Text
            kStyle='min-w-[250px]'
            k='Keluhan Utama'
            v={res?.keluhan_utama ?? '-'}
          />
          <Text
            kStyle='min-w-[250px]'
            k='Riwayat Penyakit Sekarang'
            v={res?.penyakit_sekarang ?? '-'}
          />
          <Text
            kStyle='min-w-[250px]'
            k='Riwayat Penyakit Dahulu'
            v={res?.penyakit_dahulu ?? '-'}
          />
          <Text
            kStyle='min-w-[250px]'
            k='Riwayat Penyakit Keluarga'
            v={res?.penyakit_keluarga ?? '-'}
          />
        </div>
        {/* Subyektif */}

        {/* Objektif */}
        <div className='border border-black my-2 p-2'>
          <p className='flex-1 font-semibold'>OBJEKTIF</p>
          <div className='flex justify-start items-start gap-[100px]'>
            <p>Tanda-Tanda Vital</p>
            <div className='flex items-start gap-4'>
              <div>
                <div className='flex items-center gap-4'>
                  <p>GCS {res?.vital_sign?.gcs ?? '-'}</p>
                </div>
                <Text
                  kStyle='min-w-[50px]'
                  k='TD'
                  v={res?.vital_sign?.td ?? '-'}
                />
                <Text
                  kStyle='min-w-[50px]'
                  k='Nadi'
                  v={res?.vital_sign?.nadi ?? '-'}
                />
                <Text
                  kStyle='min-w-[50px]'
                  k='Suhu'
                  v={res?.vital_sign?.suhu ?? '-'}
                />
              </div>
              <div>
                <Text
                  kStyle='min-w-[50px]'
                  k='Kesadaran'
                  v={res?.vital_sign?.kesadaran ?? '-'}
                />
                <Text
                  kStyle='min-w-[50px]'
                  k='Pernafasan'
                  v={res?.vital_sign?.pernafasan ?? '-'}
                />
                <Text
                  kStyle='min-w-[50px]'
                  k='SPO2'
                  v={res?.vital_sign?.spo2 ?? '-'}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Objektif */}

        {/* Pemeriksaan Fisik */}
        <div className='border border-black my-2 p-2'>
          <p className='flex-1 font-semibold'>PEMERIKSAAN FISIK</p>
          <div className='flex items-center gap-4'>
            <div className='flex-1'>
              <Text k='Kepala' v={res?.pemeriksaan_fisik?.kepala ?? '-'} />
              <Text k='Mata' v={res?.pemeriksaan_fisik?.mata ?? '-'} />
              <Text k='THT' v={res?.pemeriksaan_fisik?.tht ?? '-'} />
              <Text k='Mulut' v={res?.pemeriksaan_fisik?.mulut ?? '-'} />
              <Text k='Leher' v={res?.pemeriksaan_fisik?.leher ?? '-'} />
              <Text k='Dada' v={res?.pemeriksaan_fisik?.dada ?? '-'} />
              <Text k='Jantung' v={res?.pemeriksaan_fisik?.jantung ?? '-'} />
              <Text k='Paru' v={res?.pemeriksaan_fisik?.paru ?? '-'} />
              <Text k='Perut' v={res?.pemeriksaan_fisik?.perut ?? '-'} />
              <Text k='Hati' v={res?.pemeriksaan_fisik?.hati ?? '-'} />
            </div>
            <div className='flex-1'>
              <Text k='Limpa' v={res?.pemeriksaan_fisik?.limpa ?? '-'} />
              <Text k='Ginjal' v={res?.pemeriksaan_fisik?.ginjal ?? '-'} />
              <Text
                k='Alat Kelamin'
                v={res?.pemeriksaan_fisik?.alat_kelamin ?? '-'}
              />
              <Text
                k='Anggota Gerak'
                v={res?.pemeriksaan_fisik?.anggota_gerak ?? '-'}
              />
              <Text k='Refleks' v={res?.pemeriksaan_fisik?.relfeks ?? '-'} />
              <Text
                k='Kekuatan Otot'
                v={res?.pemeriksaan_fisik?.kekuatan_otot ?? '-'}
              />
              <Text k='Kulit' v={res?.pemeriksaan_fisik?.kulit ?? '-'} />
              <Text
                k='Kelenjar Getah Bening'
                v={res?.pemeriksaan_fisik?.kelenjar_getah_bening ?? '-'}
              />
              <Text k='RT/VT' v={res?.pemeriksaan_fisik?.rt_vt ?? '-'} />
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <img
              src={res?.image_lokalis}
              alt='anatomi tubuh'
              className='object-contain h-[300px]'
            />
            <img
              src={images.keterangan}
              alt='keterangan'
              className='object-contain h-[200px]'
            />
          </div>
        </div>
        {/* Pemeriksaan Fisik */}

        {/* Pemeriksaan Penunjang */}
        <div className='border border-black my-2 p-2'>
          <p className='flex-1 font-semibold'>PEMERIKSAAN PENUNJANG</p>
          <div>
            <TextTitle title='Laboratorium' />
            <LaborTable data={res != null ? res.labor : []} />
          </div>
          <div>
            <TextTitle title='Pemeriksaan Lain' />
            <RadiologiTable data={res != null ? res.radiologi : []} />
          </div>
        </div>
        {/* Pemeriksaan Penunjang */}

        {/* Asesmen */}
        <div className='border border-black my-2 p-2'>
          <TextTitle title='Asesmen (Diagnosa Kerja)' />
          <DiagnosaTable data={res != null ? res.diagnosa : []} />
        </div>
        {/* Asesmen */}

        {/* PLANNING */}
        <div className='border border-black my-2 p-2'>
          <p className='flex-1 font-semibold'>
            PLANNING :{' '}
            <span className='text-xs font-normal'>
              Penatalaksanaan / Pengobatan / Rencana Tindakan / Konsultasi
            </span>
          </p>
          <InstruksiTable data={res != null ? res.planning : []} />
        </div>
        {/* PLANNING */}

        {/* PROGNOSA */}
        <div className='border border-black my-2 p-2'>
          <Text k='Prognosa' v={res?.prognosis ?? '-'} />
        </div>
        {/* PROGNOSA */}
      </div>
      {/* Content */}

      {/* Dokter Yang Memeriksa */}
      <div className='p-2 mb-1 m-2'>
        <div className='flex flex-col gap-4 items-center text-center text-xs'>
          {res != null && res.dokter != '' && (
            <>
              <p className='text-sm'>Dokter Yang Memeriksa</p>
              <QRCode
                value={res?.dokter ?? '-'}
                className='w-[100px] h-[100px]'
              />
              <p className=''>({res?.dokter ?? '-'})</p>
            </>
          )}
        </div>
      </div>
      {/* Dokter Yang Memeriksa */}
    </LayoutBorderNo>
  )
}
