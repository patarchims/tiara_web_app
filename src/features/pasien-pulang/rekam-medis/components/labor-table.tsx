import { Labor, Penlab } from '@/type'

export function LaborTable({ data }: { data: Labor[] }) {
  if (data.length > 0) {
    return (
      <div className='border border-black'>
        {data.map((item: Labor, index) => (
          <div key={`labor-${index}`}>
            <div className='p-1 bg-gray-300'>
              <p className='text-xs'>{item?.tanggal ?? 'tanggal'}</p>
            </div>
            <div className=' p-1 bg-gray-400'>
              <h3 className='font-bold text-xs'>
                {item?.nama_kelompok ?? 'nama kelompok'}
              </h3>
            </div>
            <div>
              <div className='flex items-start justify-between'>
                <div className='w-full text-center border-r border-black'>
                  <div className='border-b border-black'>
                    <h3 className='font-medium py-1 text-xs'>Deskripsi</h3>
                  </div>
                  {item.penlab.map((item: Penlab, index) => (
                    <p
                      key={`labor-penlab-deskripsi-${index}`}
                      className='text-start  px-2 text-xs'
                    >
                      {item.pemeriksaan_deskripsi}
                    </p>
                  ))}
                </div>
                <div className='w-full text-center border-r border-black'>
                  <div className='border-b border-black'>
                    <h3 className='font-medium py-1 text-xs'>Normal</h3>
                  </div>
                  {item.penlab.map((item, index) => (
                    <p
                      key={`labor-normal-${index}`}
                      className='text-start  px-2 text-xs'
                    >
                      {item.normal} {item.satuan}
                    </p>
                  ))}
                </div>
                <div className='w-full text-center border-black'>
                  <div className='border-b border-black'>
                    <h3 className='font-medium py-1 text-xs'>Hasil</h3>
                  </div>
                  {item.penlab.map((item, index) => (
                    <p
                      key={`labor-hasil-${index}`}
                      className='text-start  px-2 text-xs'
                    >
                      {item.hasil} {item.satuan}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  } else {
    return (
      <p className='text-xs text-center font-medium'>
        Tidak ada pemeriksaan labor
      </p>
    )
  }
}
