import { useState } from 'react'

import { SimpleColumn } from '@/components/simple-column'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Diagnosa } from '@/type'

interface DiagnosaTableProps {
  data: Diagnosa[]
  isEdit?: boolean
  onEdit?: (item: Diagnosa) => void
  onDelete?: (diagnosa: string) => void
}

export function DiagnosaTable({
  data,
  isEdit,
  onEdit,
  onDelete,
}: DiagnosaTableProps) {
  // show pop up
  const [show, setShow] = useState(false)
  const [type, setType] = useState<'add' | 'edit' | ''>('')

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
            isLast={!isEdit}
            className2='text-xs'
          />
          {isEdit && (
            <SimpleColumn
              head
              name='Action'
              className='p-1 flex-1'
              isLast
              className2='text-xs'
            />
          )}
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
                isLast={!isEdit}
                className2='text-xs capitalize'
              />
              {isEdit && (
                <SimpleColumn
                  isChild={
                    <div className='text-xs flex gap-4'>
                      <p
                        onClick={() => {
                          if (onEdit) {
                            setShow(true)
                            setType('edit')
                            setTemp(item)
                          }
                        }}
                      >
                        Edit
                      </p>
                      <p
                        onClick={() => {
                          if (onDelete != null) {
                            onDelete(item.diagnosa)
                          }
                        }}
                      >
                        Delete
                      </p>
                    </div>
                  }
                  className='p-1 flex-1'
                  isLast
                  className2='text-xs'
                />
              )}
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
            <Button
              onClick={() => {
                if (onEdit && type == 'edit') {
                  onEdit(temp)
                }

                if (type == 'add') {
                  data.push(temp)
                }
                setShow(!show)
              }}
            >
              Simpan
            </Button>
          </DialogContent>
        </Dialog>

        {isEdit && (
          <Button
            className='mt-4 absolute right-4'
            onClick={() => {
              setType('add')
              setTemp({ description: '', diagnosa: '', table: '', type: '' })
              setShow(true)
            }}
          >
            Tambah
          </Button>
        )}
      </div>
    )
  } else {
    return <p className='text-xs text-center font-medium'>Tidak ada diagnosa</p>
  }
}
