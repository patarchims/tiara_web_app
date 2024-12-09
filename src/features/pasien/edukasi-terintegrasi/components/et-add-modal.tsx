import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useEdukasiTerintegrasi } from '@/hooks/edukasi-terintegrasi'
import { getPemberiInformasi } from '@/services/pemberi-informasi'
import { PemberiInformasi } from '@/type'
import { constants } from '@/utils/constants'
import { useDebounce } from '@/utils/debounce'

export default function EtAddModal() {
  const [text, setText] = useState('')
  const [show, setShow] = useState(false)

  const { formSaveEt, onAddEt } = useEdukasiTerintegrasi()

  const { data, status } = useQuery({
    queryKey: [constants.queryKey.pemberiInformasi.list],
    queryFn: getPemberiInformasi,
    staleTime: Infinity,
  })

  const [tempData, setTempData] = useState<PemberiInformasi[]>([])

  const res = useDebounce(text, 1000)

  useEffect(() => {
    if (status == 'success') {
      if (text == '') {
        setTempData(data!.response)
        return
      }

      if (res) {
        const newData = data!.response
          .filter((item) => item.nama.toLowerCase().includes(res))
          .map((item) => item)
        setTempData(newData)
      }
    }
  }, [res])

  return (
    <>
      <div className='rounded-md border border-gray-400 h-[calc(80vh)] overflow-x-auto px-4 py-2'>
        <Form {...formSaveEt}>
          <form
            onSubmit={formSaveEt.handleSubmit(onAddEt)}
            className='space-y-4'
          >
            <FormField
              control={formSaveEt.control}
              name='informasi'
              render={({ field }) => (
                <FormItem>
                  <Description desc='Informasi / Edukasi yang diberikan' />
                  <FormControl>
                    <Textarea
                      placeholder='Isikan Informasi disini.'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={formSaveEt.control}
              name='metode'
              render={({ field }) => (
                <FormItem>
                  <Description desc='Metode -> contoh :  Diskusi / Lisan, Leafleat / Brosur, Demonstrasi' />
                  <FormControl>
                    <Textarea placeholder='Isikan Metode disini.' {...field} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={formSaveEt.control}
              name='pemberi_informasi'
              render={({ field }) => (
                <FormItem>
                  <Description desc='Pemberi Informasi' />
                  <FormControl>
                    <>
                      <Input
                        {...field}
                        value={text}
                        onChange={(e) => {
                          setText(e.target.value)
                        }}
                        placeholder='Pemberi Informasi'
                        onClick={() => {
                          setShow(true)
                        }}
                      />
                      {show && (
                        <div className='max-h-[300px] overflow-y-scroll mb-2 border rounded-md mt-4 p-2 w-full'>
                          {tempData.length > 0 ? (
                            tempData.map(
                              (item: PemberiInformasi, index: number) => (
                                <p
                                  key={index}
                                  className='text-md py-2 w-full hover:underline hover:cursor-pointer'
                                  onClick={() => {
                                    setText(item.nama)
                                    formSaveEt.setValue(
                                      'pemberi_informasi',
                                      item.nama,
                                    )

                                    setShow(false)
                                  }}
                                >
                                  {item.nama}
                                </p>
                              ),
                            )
                          ) : (
                            <p className='text-center text-xs'>
                              Tidak ada data
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={formSaveEt.control}
              name='penerima_informasi'
              render={({ field }) => (
                <FormItem>
                  <Description desc='Penerima Informasi' />
                  <FormControl>
                    <Textarea
                      placeholder='Isikan Penerima Informasi disini.'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={formSaveEt.control}
              name='evaluasi'
              render={({ field }) => (
                <FormItem>
                  <Description desc='Evaluasi -> contoh : Mengerti , Re-Edukasi , Re-tgl' />
                  <FormControl>
                    <Textarea
                      placeholder='Isikan Evaluasi disini.'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <Button
        onClick={formSaveEt.handleSubmit(onAddEt)}
        className='mt-4 w-full'
      >
        SIMPAN
      </Button>
    </>
  )
}

function Description({ desc }: { desc: string }) {
  return (
    <div className='p-2 border rounded-md bg-orange-300 my-4 font-medium'>
      {desc}
    </div>
  )
}
