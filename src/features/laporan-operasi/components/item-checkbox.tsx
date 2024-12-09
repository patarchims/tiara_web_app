import { ReactNode } from 'react'

interface ItemCheckbox {
  title: string
  children?: ReactNode
}

const ItemCheckbox = ({ title, children }: ItemCheckbox) => {
  return (
    <div className='flex items-center gap-2 mb-2'>
      <p className='text-xs w-[100px]'>{title}</p>
      <>
        <p className='text-xs'>:</p>
        {children}
      </>
    </div>
  )
}

export default ItemCheckbox
