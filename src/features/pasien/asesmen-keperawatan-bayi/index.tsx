import { InformasiPasien } from '@/components/informasi_pasien'
import { LayoutBorderNo } from '@/components/layout_border_no'
import { SimpleColumn } from '@/components/simple-column'
import Text from '@/components/text'
import { usePasienStore } from '@/store/pasien.store'

export function AsesmenKeperawatanBayi() {
  const { pasien } = usePasienStore((state) => state)

  return (
    <LayoutBorderNo no='RM.RI ?'>
      {/* Content */}
      <div className='p-2'>
        <h1 className='text-center text-black font-semibold mb-1'>
          ASESMEN AWAL KEPERWATAN BAYI BARU LAHIR
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

        <div className='w-full flex items-start gap-4'>
          <div className='flex-1'>
            <Text k='Ayah' />
            <Text k='Umur' />
            <Text k='Pekerjaan' />
            <Text k='Riwayat Penyakit' />
            <Text k='Nama Ibu' />
            <Text k='Pekerjaan' />
            <Text k='Perkawinan Ke' />
            <Text k='Riwayat Penyakit' />
            <Text k='Pengkajian' />
            <Text k='Penanggung Jawab' />
            <Text k='Usia' />
            <Text k='Pekerjaan' />
            <Text k='Taksiran Usia Persalinan' />
            <Text k='Bayi Lahir Dengan' />
            <Text k='Iktisar Persalinan' />
            <Text k='Tanggal Kelahiran Bayi' />
            <Text k='Jenis Kelamin' />
            <Text k='Menangis' />
          </div>
          <div className='flex-1'>
            <Text k='Dr. Obgyn' />
            <Text k='Dr. Anak' />
          </div>
        </div>
        <div className='py-2' />
        <Text k='Riwayat kelahiran yang lalu' />
        {/* Tabel */}
        <div className='p-2'>
          {/* Header */}
          <div className='flex'>
            <SimpleColumn className2='text-xs' name='No' />
            <SimpleColumn className2='text-xs' name='Tahun Kelahiran' />
            <SimpleColumn className2='text-xs' name='Sek' />
            <SimpleColumn className2='text-xs' name='BB Lahir' />
            <SimpleColumn className2='text-xs' name='Keadaan Bayi' />
            <SimpleColumn className2='text-xs' name='Komplikasi Kehamilan' />
            <SimpleColumn className2='text-xs' name='Komplikasi Persalinan' />
            <SimpleColumn className2='text-xs' isLast name='Jenis Persalinan' />
          </div>
          {/* Header */}
          {/* Body */}
          {[1, 2, 3, 4, 5].map((item) => (
            <div className='flex' key={item}>
              <SimpleColumn name='' />
              <SimpleColumn name='A' />
              <SimpleColumn name='A' />
              <SimpleColumn name='A' />
              <SimpleColumn name='A' />
              <SimpleColumn name='A' />
              <SimpleColumn name='A' />
              <SimpleColumn isLast />
            </div>
          ))}
          {/* Body */}
        </div>
        {/* Tabel */}
      </div>
      {/* Content */}
    </LayoutBorderNo>
  )
}
