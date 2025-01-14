import { useState } from 'react'

import { SimpleColumn } from '@/components/simple-column'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Diagnosa } from '@/type'

interface DiagnosaKerjaProps {
  data: Diagnosa[]
}

export function DiagnosaKerja({
  data,
}: DiagnosaKerjaProps) {
  // show pop up
  const [show, setShow] = useState(false)

  // handle input
  const [temp, setTemp] = useState<Diagnosa>({
    description: '',
    diagnosa: '',
    table: '',
    type: '',
  })

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
            className2='text-xs'
          />
          <SimpleColumn
            head
            name='Diagnosa'
            className='p-1 flex-1'

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
                className2='text-xs'
              />
              <SimpleColumn
                name={`${item.type}`}
                className='p-1 flex-1 items-start'
                className2='text-xs capitalize'
              />

            </div>
          ))}

        <Dialog
          modal
          open={show}
          onOpenChange={() => {
            setShow(!show)
          }}
        >
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          <DialogContent className='max-w-screen-2xl'>
            <div className='mt-[50px] p-4 flex gap-4'>
              <Input
                placeholder='Kode'
                value={temp?.diagnosa}
                onChange={(e) => {
                  setTemp({ ...temp, diagnosa: e.target.value })
                }}
              />
              <Input
                placeholder='Deskripsi'
                value={temp?.description}
                onChange={(e) => {
                  setTemp({ ...temp, description: e.target.value })
                }}
              />
              <Input
                placeholder='Diagnosa'
                value={temp?.type}
                onChange={(e) => {
                  setTemp({ ...temp, type: e.target.value })
                }}
              />
            </div>

          </DialogContent>
        </Dialog>


      </div>
    )
  } else {
    return <p className='text-xs text-center font-medium'>Tidak ada diagnosa</p>
  }
}
