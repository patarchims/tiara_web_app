

import { useQuery } from '@tanstack/react-query'

import Error from '@/components/error'
import { InformasiPasien } from '@/components/informasi_pasien'
import { LayoutBorderNo } from '@/components/layout_border_no'
import Loading from '@/components/loading'

import { usePasienStore } from '@/store/pasien.store'
import { constants } from '@/utils/constants'
import { SimpleColumn } from '@/components/simple-column'
import { getPelaksanaanKeperawatan } from '@/services/pelaksanaan_keperawatan'

import QRCode from 'react-qr-code'

interface PelaksanaanKeperawatanProps {
    isReport?: boolean
    noreg?: string
    no?: string
    no_rm? : string
}

export default function PelaksanaanKeperawatan({
    isReport = false,
    no,
    noreg,
    no_rm,
}: PelaksanaanKeperawatanProps) {
    // store
    const { pasien } = usePasienStore((state) => state)

    const { data, isLoading, isError } = useQuery({
        queryKey: [constants.queryKey.rekamMedis.pelaksanaanKeperawatan, noreg, no_rm],
        queryFn: () => getPelaksanaanKeperawatan({ noreg: noreg!, no_rm:no_rm!}),
        enabled: !!noreg,
    })

    const result = data != null ? data.response : null




    if (isLoading) return <Loading />
    if (isError) return <Error />
    if (result == null) return

    return (
        <>
            <LayoutBorderNo isReport={isReport} no={no}>
                {/* Content */}
                <div className='p-2 text-xs'>
                    <h1 className='text-center text-black font-semibold mb-1'>
                        PELAKSANAAN KEPERAWATAN DAN PERKEMBANGAN PASIEN
                    </h1>

                    {/* Tanggal dan Jam */}
                 
                    {/* Tanggal dan Jam */}

                    {/* Informasi Pasien */}
                    {pasien != null && (
                        <InformasiPasien
                            nama={pasien.nama_pasien}
                            noRM={pasien.no_rm}
                            tanggalLahir={result.pasien.tgl_lahir}
                        />
                    )}
                    {/* Informasi Pasien */}


                              <div className='flex text-xs'>
                                <SimpleColumn head name='Tanggal & Jam' className='w-[100px]' />
                                <SimpleColumn
                                  head
                                  name='Berikan Catatan Perawat : Terapi Keperawatan, Observasi, Keperawatan, Penyuluhan Kesehatan, Kolaborasi'
                                  className='flex-[1]'
                                />
                                <SimpleColumn head name='Nama Perawat' className='w-[200px] border' />
                              
                              </div>


                    {result.intervensi.length > 0 &&
                            result.intervensi.map((item) => (
                            <div className='flex text-xs '>
                                <SimpleColumn name={item.insert_dttm} className='w-[100px]' />
                                <div className='flex flex-row   basis-1  flex-[1] text-center justify-center items-center p-2 border-y border-black border' >
                                    <table className="table-fixed  flex-[1] border-y border-black border">
  <thead>
    <tr>
      <th className="p-2 border-y border-black border-l">OBSERVASI</th>
    </tr>
  </thead>
  <tbody>
      <td>
     {
  item.siki.length > 0 && 
  item.siki
    .filter(siki => siki.kategori === 'Observasi')
    .map((siki, index) => (
      <div key={index} className='text-start p-1'>{siki.nama_siki}</div>
    ))
}
     </td>
  </tbody>

  <thead>
    <tr>
      <th className="p-2 border-y border-black border-l">TERAPEUTIK</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
         {
  item.siki.length > 0 && 
  item.siki
    .filter(siki => siki.kategori === 'Terapeutik')
    .map((siki, index) => (
      <div key={index} className='text-start p-1'>{siki.nama_siki}</div>
    ))
}
      </td>
    </tr>
  </tbody>
    <thead>
    <tr>
      <th className="p-2 border-y border-black border-l">EDUKASI</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
         {
  item.siki.length > 0 && 
  item.siki
    .filter(siki => siki.kategori === 'Edukasi')
    .map((siki, index) => (
      <div key={index} className='text-start p-1'>{siki.nama_siki}</div>
    ))
}
      </td>
    </tr>
  </tbody>

    <thead>
    <tr>
      <th className="p-2 border-y border-black border-l">KOLABORASI</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td> {
  item.siki.length > 0 && 
  item.siki
    .filter(siki => siki.kategori === 'Kolaborasi')
    .map((siki, index) => (
      <div key={index} className='text-start p-1'>{siki.nama_siki}</div>
    ))
}</td>
    </tr>
  </tbody>
    <thead>
    <tr>
      <th className="p-2 border-y border-black border-l">TINDAKAN</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td> {
  item.siki.length > 0 && 
  item.siki
    .filter(siki => siki.kategori === 'Tindakan')
    .map((siki, index) => (
      <div key={index} className='text-start p-1'>{siki.nama_siki}</div>
    ))
}</td>
    </tr>
  </tbody>
  
</table>
                                </div>
                             {item.nama_perawat != null && item.nama_perawat != '' && (
                                <div className='text-center flex flex-col items-center w-[200px] border'>
                                    <QRCode 
                                    value={item.nama_perawat ?? '-'}
                                    className='w-[100px] border-black'
                                    />
                                  <p className='text-xs font-semibold borde'>({item.nama_perawat})</p>
                            </div>
        )}
                                
                            </div>           
                            ))}
       

     


                    
                </div>
                {/* Content */}

            
            </LayoutBorderNo>

        </>
    )
}
