import { SimpleColumn } from '@/components/simple-column'
import { ObatWaktuPulang } from '@/type'

export function ObatTable({ data }: { data: ObatWaktuPulang[] }) {
  if (data.length > 0) {
    return (
      <div className='mb-2'>
        <div className='flex'>
          <SimpleColumn
            head
            name='No.'
            className='w-[50px] p-1'
            className2='text-xs'
          />
          <SimpleColumn
            head
            name='Nama Obat'
            className='p-1 flex-1'
            className2='text-xs'
          />
          <SimpleColumn
            head
            name='Jumlah'
            className='p-1 flex-1'
            isLast
            className2='text-xs'
          />
        </div>
        {data != null &&
          data.length > 0 &&
          data.map((item, i) => (
            <div className='flex'>
              <SimpleColumn
                name={`${i + 1}`}
                className='w-[50px] p-1'
                className2='text-xs'
              />
              <SimpleColumn
                name={item.nama_obat}
                className='p-1 flex-1'
                className2='text-xs'
              />
              <SimpleColumn
                name={`${item.jumlah}`}
                className='p-1 flex-1'
                isLast
                className2='text-xs'
              />
            </div>
          ))}
      </div>
    )
  } else {
    return (
      <p className='text-xs text-center font-medium'>
        Tidak ada obat yang dibawa pulang
      </p>
    )
  }
}
