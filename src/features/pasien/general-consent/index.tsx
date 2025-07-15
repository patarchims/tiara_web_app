import QRCode from 'react-qr-code'

import { useQuery } from '@tanstack/react-query'

import Error from '@/components/error'
import { LayoutBorderNo } from '@/components/layout_border_no'
import Loading from '@/components/loading'
import { config } from '@/config/config'
import { getGeneralConsent } from '@/services/general-consent'
import { usePasienStore } from '@/store/pasien.store'
import { constants } from '@/utils/constants'

import { TextField } from './components/text-field'

interface GeneralConsentProps {
  isReport?: boolean
}

export default function GeneralConsent({
  isReport = false,
}: GeneralConsentProps) {
  const { pasien } = usePasienStore((state) => state)

  const { data, isLoading, isError } = useQuery({
    queryKey: [constants.queryKey.rekamMedis.generalConsent, pasien!.no_reg],
    queryFn: () => getGeneralConsent(pasien!.no_reg, pasien!.kd_bagian),
  })

  const res = data?.response

  if (isLoading) return <Loading />
  if (isError) return <Error />

  return (
    <LayoutBorderNo isReport={isReport}>
      <div className='p-4 text-xs'>
        <h3 className='font-bold text-center py-3'>
          PERSETUJUAN UMUM / GENERAL CONSENT
        </h3>
        <div className='px-5'>
          <p>
            Pasien atau wali diminta membaca/memahami dan mengisi informasi
            berikut
          </p>
          <TextField title='Nama Pasien' value={res?.pasien?.nama_pasien} />
          <TextField title='Tanggal Lahir' value={res?.pasien?.tgl_lahir} />
          <TextField title='Nomor Rekam Medis' value={res?.pasien?.no_rm} />
          <TextField title='Alamat' value={res?.pasien?.alamat} />
          <TextField title='No.HP' value={res?.pasien?.no_hp} />
        </div>
        <div className='px-5 py-5'>
          <p>Sebagai Pasien/Penanggung jawab</p>
          <TextField title='Nama' value={res?.penanggung_jawab?.nama} />
          <TextField
            title='Tanggal Lahir'
            value={res?.penanggung_jawab?.tgl_lahir}
          />
          <TextField title='Alamat' value={res?.penanggung_jawab?.alamat} />
          <TextField title='No.HP' value={res?.penanggung_jawab?.no_hp} />
        </div>

        {/* I */}
        <div className='p-5'>
          <div>
            <p>
              Selaku <strong>Pasien/Penanggung jawab Pasien</strong>{' '}
              {config.appName}, dengan ini menyatakan persetujuan :
            </p>
            <p className='font-medium ml-2'>
              I.{' '}
              <strong className='ml-4'>
                PERSETUJUAN UNTUK PERAWATAN DAN PENGOBATAN
              </strong>
            </p>
            <div className='ml-8 flex gap-5'>
              <p>1.</p>
              <p>
                Saya mengetahui bahwa saya memiliki kondisi yang membutuhkan
                perawatan medis, saya mengijinkan dokter dan professional
                kesehatan lainnya untuk melakukan prosedur diagnose Dan untuk
                memberikan pengobatan medis seperti yang diperlukan dalam
                penilaian Professional mereka. Prosedur diagnostic dan perawatan
                medis termaksud tetapi tidak terbatas pada elektrokardiogram,
                X-rey, tes darah, terapi fisik dan pemberian obat.
              </p>
            </div>
            <div className='ml-8 flex gap-5'>
              <p>2.</p>
              <p>
                Saya sadar bahwa praktir kedokteran bukanlah ilmu pasti dan saya
                mengakui bahwa tidak ada jaminan atas hasil apapun terhadap
                perawatan prosedur atau pemeriksaan apapun kepada saya.
              </p>
            </div>
            <div className='ml-8'>
              <div className='flex gap-5'>
                <p>3.</p>
                <p>Saya mengerti dan memahami bahwa :</p>
              </div>
              <div className='ml-8'>
                <div className='ml-5 flex items-start'>
                  <p>a.</p>
                  <span className='ml-5'>
                    <p>
                      Saya memiliki hak untuk mengajukan pertanyaan tentang
                      pengobatan yang diusulkan termaksud identitas setiap orang
                      yang memberikan atau mengamati pengobatan setiap hari.
                    </p>
                  </span>
                </div>
                <div className='ml-5 flex items-start'>
                  <p>b.</p>
                  <span className='ml-5'>
                    <p>
                      Saya mengerti dan memahami bahwa saya memiliki hak untuk
                      persetujuan atau menolak persetujuan untuk setiap prosedur
                      atau terapi.
                    </p>
                  </span>
                </div>
                <div className='ml-5 flex items-start'>
                  <p>c.</p>
                  <span className='ml-5'>
                    <p>
                      Saya mengerti bahwa banyak dokter pada staf medis rumah
                      sakit yang bukan untuk karyawan tetapi staf
                      independen/tamu telah diberi hak untuk menggunakan
                      fasilitas untuk perawatan pasien mereka.
                    </p>
                  </span>
                </div>
                <div className='ml-5 flex items-start'>
                  <p>d.</p>
                  <span className='ml-5'>
                    <p>
                      Jika diperlukan saya akan berpastisipasi dalam pemilihan
                      dokter yang akan bertanggung jawab untuk perawatan saya
                      selama dalam perawatan di Rumah Sakit.
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* I */}

        {/* II */}
        <div className='my-[50px]'>
          <p className='font-medium ml-2'>
            II.
            <strong className='ml-4'>PERSETUJUAN PELEPASAN INFORMASI</strong>
          </p>
          <p className='ml-8 mb-2'>
            Saya memahami informasi yang ada dalam diri saya, termaksud
            Diagnosis, Hasil laboratorium, dan hasil tes diagnostic yang akan
            digunakan untuk keperawatan medis, Rumah Sakit Tiara akan menjamin
            kerahasiannya.
          </p>
          <p className='ml-8 mb-2'>
            Saya memberi wewenang kepada {config.appName} memberi informasi
            tentang diagnosis hasil pelayanan dan pengobatan bila diperlukan
            untuk memproses klaim asuransi/BPJS/Jamkesda/perusahaan dan atau
            lembaga pemerintah
          </p>
          <div className='ml-16'>
            <p>
              Saya memberi wewenang kepada {config.appName} untuk memberikan
              informasi tentang diagnosis hasil pelayanan dan pengobatan kepada
              saya kepada anggota keluarga saya dan kepada:
            </p>
            <p>1.</p>
            <p>2.</p>
          </div>
        </div>
        {/* II */}

        {/* III */}
        <div className='my-[50px]'>
          <p className='font-medium'>
            III.
            <strong className='ml-4'>HAK DAN KEWAJIBAN</strong>
          </p>
          <p className='ml-8 mb-2'>
            Saya telah memahami hak dan kewajiban saya sebagai pasien{' '}
            {config.appName}
            melalui Leaflet dan banner yang telah disediakan.
          </p>
        </div>
        {/* III */}

        {/* IV */}
        <div className='my-[50px]'>
          <p className='font-medium ml'>
            IV.
            <strong className='ml-4'>PRIVASI</strong>
          </p>
          <p className='ml-8 mb-2'>
            Saya memahami dan mengetahui bahwa petugas Rumah Sakit tetap menjaga
            privasi saya saat diperiksa oleh dokter / perawat dengan menutup
            tirai saat melakukan pemeriksaan.
          </p>
        </div>
        {/* IV */}

        {/* V */}
        <div className='my-[50px]'>
          <p className='font-medium'>
            V.
            <strong className='ml-4'>HAL LAIN LAIN</strong>
          </p>
          <p className='ml-8 mb-2'>
            <span className='mr-4'>✓</span>
            Saya memahami aturan yang berlaku di {config.appName}.
          </p>
          <p className='ml-8 mb-2'>
            <span className='mr-4'>✓</span>
            Saya telah memahami bahwa {config.appName} tidak bertanggung jawab
            atas semua kehilangan barang-barang milik saya
          </p>
        </div>
        {/* V */}

        {/* VI */}
        <div className='my-[50px]'>
          <p className='font-medium'>
            VI.
            <strong className='ml-4'>INFORMASI BIAYA</strong>
          </p>
          <p className='ml-8 mb-2'>
            Saya memahami tentang informasi biaya pengobatan atau biaya tindakan
            dan biaya pemeriksaan diagnostic yang dijelaskan oleh petugas RS
            Tiara
          </p>
        </div>
        {/* VI */}

        {/* Tanda Tangan */}
        <div className='ml-4'>
          <h3 className='font-bold text-center'>TANDA TANGAN</h3>
          <p>
            Dengan tandatangan saya dibawah ini, saya menyatakan bahwa saya
            telah membaca dan memahami item pada{' '}
            <strong>Persetujuan Umum/General Consent.</strong>
          </p>
          <div className='py-10' />
          <div className='flex items-end justify-between'>
            <div className='w-full text-center flex flex-col justify-between items-center gap-4'>
              <p className='font-medium'>Petugas {config.appName}</p>
              {res != null ? (
                res.petugas ? (
                  <>
                    <QRCode
                      value={res.petugas}
                      className='h-[100px] w-[100px]'
                    />
                    <p>( {res.petugas} )</p>
                  </>
                ) : (
                  <div className='h-[140px]' />
                )
              ) : (
                <div className='h-[100px]' />
              )}
            </div>
            <div className='w-full text-center items-center flex flex-col gap-4'>
              <p>Pematangsiantar, {res?.tanggal}</p>
              <p className='font-medium'>Pasien/Penanggung Jawab</p>
              {res != null && res.penanggung_jawab.nama != '' ? (
                <>
                  {res.penanggung_jawab.nama != null ? (
                    <QRCode
                      value={res.penanggung_jawab.nama}
                      className='h-[100px] w-[100px]'
                    />
                  ) : (
                    <div className='h-[100px]' />
                  )}
                  <p>( {res.penanggung_jawab.nama} )</p>
                </>
              ) : (
                <>
                  {pasien?.nama_pasien != null ? (
                    <QRCode
                      value={pasien.nama_pasien}
                      className='h-[100px] w-[100px]'
                    />
                  ) : (
                    <div className='h-[100px]' />
                  )}
                  <p>( {pasien!.nama_pasien} )</p>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Tanda Tangan */}
      </div>
    </LayoutBorderNo>
  )
}
