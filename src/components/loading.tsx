import { LoaderCircle } from 'lucide-react'

import { cn } from '@/lib/utils'
import { constants } from '@/utils/constants'

export default function Loading({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'h-[calc(100vh-10rem)] flex flex-1 justify-center items-center flex-col gap-2',
        className,
      )}
    >
      <LoaderCircle className='animate-spin' />
      <p className='text-md'>{constants.message.loading}</p>
    </div>
  )
}
