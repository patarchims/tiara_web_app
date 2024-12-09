import { ReactNode } from 'react'

interface DiagnosaWrapperProps {
  title: string
  children: ReactNode
}

const DiagnosaWrapper = ({ title, children }: DiagnosaWrapperProps) => {
  return (
    <div>
      <div className='p-2 border border-black border-t-0 bg-green-200'>
        <p className='text-xs'>{title}</p>
      </div>
      {children}
    </div>
  )
}

export default DiagnosaWrapper
