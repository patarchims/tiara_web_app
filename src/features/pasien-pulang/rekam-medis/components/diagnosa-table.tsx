import { SimpleColumn } from '@/components/simple-column'
import { Diagnosa } from '@/type'

export function DiagnosaTable({ data }: { data: Diagnosa[] }) {
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
            name='Kode'
            className='p-1 flex-1'
            className2='text-xs'
          />
          <SimpleColumn
            head
            name='Deskripsi'
            className='p-1 flex-1'
            isLast
            className2='text-xs'
          />
          <SimpleColumn
            head
            name='Diagnosa'
            className='p-1 flex-1'
            isLast
            className2='text-xs'
          />
        </div>
        {data != null &&
          data.length > 0 &&
          data.map((item, i) => (
            <div className='flex' key={i}>
              <SimpleColumn
                name={`${i + 1}`}
                className='w-[50px] p-1'
                className2='text-xs'
              />
              <SimpleColumn
                name={item.diagnosa}
                className='p-1 flex-1 items-start'
                className2='text-xs'
              />
              <SimpleColumn
                name={`${item.description}`}
                className='p-1 flex-1 items-start'
                isLast
                className2='text-xs'
              />
              <SimpleColumn
                name={`${item.type}`}
                className='p-1 flex-1 items-start'
                isLast
                className2='text-xs capitalize'
              />
            </div>
          ))}
      </div>
    )
  } else {
    return <p className='text-xs text-center font-medium'>Tidak ada diagnosa</p>
  }
}
