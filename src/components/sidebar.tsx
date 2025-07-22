import { ClipboardPlus, File, LayoutDashboard, Users } from 'lucide-react'

import { match } from 'ts-pattern'

import { constants } from '@/utils/constants'

import { Button } from './ui/button'

interface SidebarProp {
  index: number
  setIndex: (index: number) => void
  menu: string[]
}

function renderIcon(index: number) {
  return match(index)
    .with(0, () => <LayoutDashboard />)
    .with(1, () => <Users />)
    .with(2, () => <File />)
    .with(3, () => <ClipboardPlus />)
    .otherwise(() => null)
}

export default function Sidebar({ index, setIndex, menu }: SidebarProp) {
  return (
    <section className='h-[calc(100vh-5rem)]  m-2 rounded-md p-4 flex flex-col items-center justify-between bg-gradient-to-b from-blue-500  to-blue-700'>
      <div className='w-full flex flex-col gap-2'>
        {menu.map((item, idx) => (
          <Button
            key={idx}
            variant={index == idx ? 'outline' : undefined}
            className='w-full flex justify-start hover:translate-x-1 transition-all ease-in-out'
            onClick={() => setIndex(idx)}
          >
            {renderIcon(idx)}
            <p className='text-xs'>{item}</p>
          </Button>
        ))}
      </div>
      <p className='text-white text-xs'>{constants.version}</p>
    </section>
  )
}
