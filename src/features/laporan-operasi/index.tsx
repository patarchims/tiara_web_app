import { Link } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useLaporanOperasi from '@/hooks/laporan-operasi'
import { useOperasiStore } from '@/store/operasi'
import type { LaporanOperasi } from '@/type'

const LaporanOperasi = () => {
  const { search, setSearch, searchPasien, empty } = useLaporanOperasi()
  const { data, setData } = useOperasiStore()

  const to = 'Laporan Operasi'.replace(/\s+/g, '-').toLowerCase()

  return (
    <>
      <div className='flex gap-4'>
        <Input
          className='w-full mb-4'
          placeholder='Cari Nomor Registrasi'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          className='w-[100px] bg-white text-black hover:bg-white/80'
          onClick={searchPasien}
        >
          Cari
        </Button>
      </div>

      <div className='grid grid-cols-3 gap-4'>
        {Object.keys(data).length != 0 && (
          <Link to={`/report/${to}`} onClick={() => setData(data)}>
            <div className='p-4 bg-white rounded-md shadow-md hover:cursor-pointer hover:-translate-y-1'>
              {data?.profil_pasien?.no_rm} {data?.profil_pasien?.nama}
            </div>
          </Link>
        )}
      </div>
      {empty && (
        <div>
          <p className='text-center text-white'>Data tidak ditemukan</p>
        </div>
      )}
    </>
  )
}

export default LaporanOperasi
