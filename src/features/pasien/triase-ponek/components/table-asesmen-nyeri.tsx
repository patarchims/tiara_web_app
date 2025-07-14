import { Check } from 'lucide-react'

import { SimpleColumn } from '@/components/simple-column'
import { cn } from '@/lib/utils'

export default function TableAsesmenNyeri({
  skalaTriase,
}: {
  skalaTriase: string
}) {
  return (
    <>
      <div className='flex'>
        <div className='flex-[0.5] border-y border-black border-l p-2 bg-gray-100'>
          <div className='flex items-center justify-center'>
            <Check size={16} />
          </div>
        </div>
        <SimpleColumn head className2='text-xs' name='Skala Triase' />
        <SimpleColumn
          head
          className2='text-xs'
          className='flex-[2]'
          name='Keterangan'
        />
        <SimpleColumn head className2='text-xs' name='Respon Time' isLast />
      </div>
      <Item
        isChecked={skalaTriase.includes('Resusitasi')}
        skala='ATS 1'
        keterangan='Resusitasi (Alur Merah)'
        response='Segera'
        className='bg-red-500'
      />
      <Item
        isChecked={skalaTriase.includes('Emergency / Gawat Darurat')}
        skala='ATS 2'
        keterangan='Emergency / Gawat Darurat (Alur Kuning)'
        response='10 Menit'
        className='bg-yellow-300'
      />
      <Item
        isChecked={skalaTriase.includes('Urgent / Darurat')}
        skala='ATS 3'
        keterangan='Urgent / Darurat (Alur Kuning)'
        response='30 Menit'
        className='bg-yellow-300'
      />
      <Item
        isChecked={skalaTriase.includes('Semi / Darurat')}
        skala='ATS 4'
        keterangan='Semi / Darurat (Alur Hijau)'
        response='60 Menit'
        className='bg-green-500'
      />
      <Item
        isChecked={skalaTriase.includes('Tidak Darurat')}
        skala='ATS 5'
        keterangan='Tidak Darurat (Alur Hijau)'
        response='120 Menit'
        className='bg-green-500'
      />
    </>
  )
}

function Item({
  isChecked,
  skala,
  keterangan,
  response,
  className,
}: {
  isChecked: boolean
  skala: string
  keterangan: string
  response: string
  className?: string
}) {
  return (
    <div className={cn('flex', className)}>
      <div className='flex-[0.5] border-y border-black border-l p-2'>
        {isChecked ? (
          <div className='flex items-center justify-center'>
            <Check size={16} />
          </div>
        ) : null}
      </div>
      <SimpleColumn className2='text-xs' name={skala} />
      <div className='flex-[2] border-y border-black border-l p-2'>
        <p className='text-xs'>{keterangan}</p>
      </div>
      <SimpleColumn className2='text-xs' name={response} isLast />
    </div>
  )
}
