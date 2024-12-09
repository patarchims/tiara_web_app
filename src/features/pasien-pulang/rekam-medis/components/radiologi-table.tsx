import React from 'react'

import { Radiologi } from '@/type'
import { formatDate } from '@/utils/formatDate'

export function RadiologiTable({ data }: { data: Radiologi[] }) {
  if (data.length > 0) {
    return (
      <div className='border border-black'>
        {data.map((item, index) => (
          <div key={`radiologi-kelompok-${index}`} className='bg-gray-300'>
            <p className='p-2 text-xs font-medium'>
              {item.nama_kelompok} - {formatDate(item.tanggal)}
            </p>
            <div key={index + 7}>
              {item.radiologi.map((item, index) => (
                <React.Fragment key={`item-radiologi-${index}`}>
                  <div>
                    <div className='border-t border-b border-black'>
                      <h3 className='text-center font-bold py-2 text-xs'>
                        Pemeriksaan :{' '}
                      </h3>
                    </div>
                    <div className='border-b bg-white'>
                      <p className='p-2 text-xs'>
                        {item.pemeriksaan_deskripsi}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className='border-t border-b border-black'>
                      <h3 className='text-center font-bold py-2 text-xs'>
                        Uraian :{' '}
                      </h3>
                    </div>
                    <div className='border-b bg-white'>
                      <p className='p-2 text-xs'>{item.uraian}</p>
                    </div>
                  </div>
                  <div>
                    <div className='border-t border-b border-black'>
                      <h3 className='text-center font-bold py-2 text-xs'>
                        Hasil :{' '}
                      </h3>
                    </div>
                    <div className='border-b bg-white'>
                      <p className='p-2 text-xs'>{item.hasil}</p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  } else {
    return (
      <p className='text-xs font-medium text-center'>
        Tidak ada pemeriksaan lain
      </p>
    )
  }
}
