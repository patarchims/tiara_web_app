import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'

import { useQuery } from '@tanstack/react-query'

import { images } from '@/assets/images/images'
import Error from '@/components/error'
import { InformasiPasien } from '@/components/informasi_pasien'
import { LayoutBorderNo } from '@/components/layout_border_no'
import Loading from '@/components/loading'
import Text from '@/components/text'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { DiagnosaTable } from '@/features/pasien-pulang/rekam-medis/components/diagnosa-table'
import { InstruksiTable } from '@/features/pasien-pulang/rekam-medis/components/instruksi-table'
import { LaborTable } from '@/features/pasien-pulang/rekam-medis/components/labor-table'
import { RadiologiTable } from '@/features/pasien-pulang/rekam-medis/components/radiologi-table'
import { TextTitle } from '@/features/pasien-pulang/rekam-medis/components/text-title'
import { getAsesmenDokterPonek } from '@/services/asesmen-dokter-igd'
import { useGlobalStore } from '@/store/global.store'
import { usePasienStore } from '@/store/pasien.store'
import { Diagnosa, PemeriksaanFisikAsesmenDokterIgd, VitalSign } from '@/type'
import { constants } from '@/utils/constants'

import EditDiagnosa from './components/edit-diagnosa'
import EditPemeriksaanFisik from './components/edit-pemeriksaan-fisik'
import EditVitalSign from './components/edit-vital-sign'

interface AsesmenAwalMedisPonekProps {
  isReport?: boolean
  noreg?: string
  no?: string
}

export default function AsesmenAwalMedisPonek({
  isReport = false,
  no,
  noreg,
}: AsesmenAwalMedisPonekProps) {
  // store
  const { pasien } = usePasienStore((state) => state)
  const { dialogId, setDialogId, showDialog, setShowDialog } = useGlobalStore()
  const [showAdd, setShowAdd] = useState(true)

  const { data, isLoading, isError } = useQuery({
    queryKey: [constants.queryKey.rekamMedis.asesmenAwalMedisPonek, noreg],
    queryFn: () => getAsesmenDokterPonek({ noreg: noreg! }),
    enabled: !!noreg,
  })

  const res = data != null ? data.response : null

  // state for handling local crud without hit api
  const [tempDiagnosa, setTempDiagnosa] = useState<Diagnosa[]>([])
  const [tempVitalSign, setTempVitalSign] = useState<VitalSign>({
    gcs: '',
    kesadaran: '',
    nadi: '',
    pernafasan: '',
    spo2: '',
    suhu: '',
    td: '',
  })
  const [tempPemeriksaanFisik, setTempPemeriksaanFisik] =
    useState<PemeriksaanFisikAsesmenDokterIgd>({
      alat_kelamin: '',
      anggota_gerak: '',
      dada: '',
      ginjal: '',
      hati: '',
      jantung: '',
      kekuatan_otot: '',
      kelenjar_getah_bening: '',
      kepala: '',
      kulit: '',
      leher: '',
      limpa: '',
      mata: '',
      mulut: '',
      paru: '',
      perut: '',
      relfeks: '',
      rt_vt: '',
      tht: '',
    })

  useEffect(() => {
    if (res) {
      setTempDiagnosa(res.diagnosa)
      setTempVitalSign(res.vital_sign)
      setTempPemeriksaanFisik(res.pemeriksaan_fisik)
    }
  }, [res])

  window.onbeforeprint = () => {
    setShowAdd(false)
  }

  window.onafterprint = () => {
    setShowAdd(true)
  }

  if (isLoading) return <Loading />
  if (isError) return <Error />
  if (res == null) return

  return (
    <>
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
              ruangan={res.profil_pasien.ruangan}
              tanggalLahir={res.profil_pasien.tgl_lahir}
            />
          )}
          {/* Informasi Pasien */}

          {/* Subyektif */}
          <div className='border border-black my-2 p-2'>
            <p className='flex-1 font-semibold'>SUBYEKTIF</p>
            <Text
              kStyle='min-w-[250px]'
              k='Keluhan Utama'
              v={res.keluhan_utama ?? '-'}
            />
            <Text
              kStyle='min-w-[250px]'
              k='Riwayat Penyakit Sekarang'
              v={res.penyakit_sekarang ?? '-'}
            />
            <Text
              kStyle='min-w-[250px]'
              k='Riwayat Penyakit Dahulu'
              v={res.penyakit_dahulu ?? '-'}
            />
            <Text
              kStyle='min-w-[250px]'
              k='Riwayat Penyakit Keluarga'
              v={res.penyakit_keluarga ?? '-'}
            />
          </div>
          {/* Subyektif */}

          {/* Objektif */}
          <div className='border border-black my-2 p-2'>
            <div className='flex justify-between items-center'>
              <p className='flex-1 font-semibold'>OBJEKTIF</p>
              {showAdd && (
                <p
                  className='font-semibold'
                  onClick={() => {
                    setDialogId('dialog-edit-vital-sign-asesmen-awal-igd')
                    setShowDialog(true)
                  }}
                >
                  Edit
                </p>
              )}
            </div>
            <div className='flex justify-start items-start gap-[100px]'>
              <p>Tanda-Tanda Vital</p>
              <div className='flex items-start gap-4'>
                <div>
                  <div className='flex items-center gap-4'>
                    <p>GCS : {tempVitalSign.gcs ?? '-'}</p>
                  </div>
                  <Text
                    kStyle='min-w-[50px]'
                    k='TD'
                    v={tempVitalSign.td ?? '-'}
                  />
                  <Text
                    kStyle='min-w-[50px]'
                    k='Nadi'
                    v={tempVitalSign.nadi ?? '-'}
                  />
                  <Text
                    kStyle='min-w-[50px]'
                    k='Suhu'
                    v={tempVitalSign.suhu ?? '-'}
                  />
                </div>
                <div>
                  <Text
                    kStyle='min-w-[50px]'
                    k='Kesadaran'
                    v={tempVitalSign.kesadaran ?? '-'}
                  />
                  <Text
                    kStyle='min-w-[50px]'
                    k='Pernafasan'
                    v={tempVitalSign.pernafasan ?? '-'}
                  />
                  <Text
                    kStyle='min-w-[50px]'
                    k='SPO2'
                    v={tempVitalSign.spo2 ?? '-'}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Objektif */}

          {/* Pemeriksaan Fisik */}
          <div className='border border-black my-2 p-2'>
            <div className='flex items-center justify-between'>
              <p className='flex-1 font-semibold'>PEMERIKSAAN FISIK</p>
              {showAdd && (
                <p
                  className='font-semibold'
                  onClick={() => {
                    setDialogId(
                      'dialog-edit-pemeriksaan-fisik-asesmen-awal-igd',
                    )
                    setShowDialog(true)
                  }}
                >
                  Edit
                </p>
              )}
            </div>
            <div className='flex items-center gap-4'>
              <div className='flex-1'>
                <Text k='Kepala' v={tempPemeriksaanFisik.kepala ?? '-'} />
                <Text k='Mata' v={tempPemeriksaanFisik.mata ?? '-'} />
                <Text k='THT' v={tempPemeriksaanFisik.tht ?? '-'} />
                <Text k='Mulut' v={tempPemeriksaanFisik.mulut ?? '-'} />
                <Text k='Leher' v={tempPemeriksaanFisik.leher ?? '-'} />
                <Text k='Dada' v={tempPemeriksaanFisik.dada ?? '-'} />
                <Text k='Jantung' v={tempPemeriksaanFisik.jantung ?? '-'} />
                <Text k='Paru' v={tempPemeriksaanFisik.paru ?? '-'} />
                <Text k='Perut' v={tempPemeriksaanFisik.perut ?? '-'} />
                <Text k='Hati' v={tempPemeriksaanFisik.hati ?? '-'} />
              </div>
              <div className='flex-1'>
                <Text k='Limpa' v={tempPemeriksaanFisik.limpa ?? '-'} />
                <Text k='Ginjal' v={tempPemeriksaanFisik.ginjal ?? '-'} />
                <Text
                  k='Alat Kelamin'
                  v={tempPemeriksaanFisik.alat_kelamin ?? '-'}
                />
                <Text
                  k='Anggota Gerak'
                  v={tempPemeriksaanFisik.anggota_gerak ?? '-'}
                />
                <Text k='Refleks' v={tempPemeriksaanFisik.relfeks ?? '-'} />
                <Text
                  k='Kekuatan Otot'
                  v={tempPemeriksaanFisik.kekuatan_otot ?? '-'}
                />
                <Text k='Kulit' v={tempPemeriksaanFisik.kulit ?? '-'} />
                <Text
                  k='Kelenjar Getah Bening'
                  v={tempPemeriksaanFisik.kelenjar_getah_bening ?? '-'}
                />
                <Text k='RT/VT' v={tempPemeriksaanFisik.rt_vt ?? '-'} />
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <img
                src={res.image_lokalis}
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
            <div className='flex items-center justify-between'>
              <TextTitle title='Asesmen (Diagnosa Kerja)' />
              {showAdd && (
                <TextTitle
                  title='Edit'
                  onClick={() => {
                    setDialogId('dialog-edit-diagnosa-asesmen-awal-igd')
                    setShowDialog(true)
                  }}
                />
              )}
            </div>
            <DiagnosaTable data={res != null ? tempDiagnosa : []} />
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

            <p className='flex-1 my-2'>
              <p className='text-xs font-normal'>
                Cara Keluar Dari Rumah Sakit :  {res?.cara_keluar}. {res?.cara_keluar_detail}

              </p>
              <p className='text-xs font-normal'>
                Konsul Ke :  {res?.konsul_ke}
              </p>


              <br /><br />

              <p className='text-xs  font-bold'>
               {res?.terapi}
              </p>

            </p>


            <InstruksiTable data={res != null ? res.planning : []} />
          </div>
          {/* PLANNING */}

          {/* PROGNOSA */}
          <div className='border border-black my-2 p-2'>
            <Text k='Prognosa' v={res.prognosis ?? '-'} />
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
                  value={res.dokter ?? '-'}
                  className='w-[100px] h-[100px]'
                />
                <p className=''>({res.dokter ?? '-'})</p>
              </>
            )}
          </div>
        </div>
        {/* Dokter Yang Memeriksa */}

        {/* Dialog */}
      </LayoutBorderNo>
      <Dialog
        modal
        open={showDialog}
        onOpenChange={() => {
          setShowDialog(!showDialog)
        }}
      >
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <DialogContent className='min-h-screen max-w-screen-2xl'>
          {dialogId == 'dialog-edit-diagnosa-asesmen-awal-igd' && (
            <EditDiagnosa
              data={res != null ? tempDiagnosa : []}
              setData={setTempDiagnosa}
            />
          )}
          {dialogId == 'dialog-edit-vital-sign-asesmen-awal-igd' && (
            <EditVitalSign data={tempVitalSign} setData={setTempVitalSign} />
          )}
          {dialogId == 'dialog-edit-pemeriksaan-fisik-asesmen-awal-igd' && (
            <EditPemeriksaanFisik
              data={tempPemeriksaanFisik}
              setData={setTempPemeriksaanFisik}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
