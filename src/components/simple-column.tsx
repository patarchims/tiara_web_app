import { ReactNode } from 'react'
import QRCode from 'react-qr-code'

import { cn } from '@/lib/utils'

interface SimpleColumnProps {
  name?: string
  isLast?: boolean
  head?: boolean
  className?: string
  className2?: string
  hasQR?: boolean
  isChild?: ReactNode
}

export function SimpleColumn({
  name,
  head,
  isLast,
  className = 'flex-1',
  className2 = '',
  hasQR = false,
  isChild,
}: SimpleColumnProps) {
  if (isChild)
    return (
      <div
        className={cn(
          'flex flex-col gap-2 text-center justify-center items-center p-2 border-y border-black border-l',
          isLast && 'border-r',
          className,
          head && 'bg-gray-100',
        )}
      >
        {isChild}
      </div>
    )

  return (
    <div
      className={cn(
        'flex flex-col gap-2 text-center justify-center items-center p-2 border-y border-black border-l',
        isLast && 'border-r',
        className,
        head && 'bg-gray-100',
      )}
    >
      {hasQR && <QRCode value={name!} className='h-[50px] w-[50px]' />}
      {name != '' ? <p className={cn(className2)}>{name}</p> : null}
    </div>
  )
}
