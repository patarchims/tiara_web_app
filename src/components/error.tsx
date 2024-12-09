import { cn } from '@/lib/utils'
import { constants } from '@/utils/constants'

export default function Error({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'h-[calc(100vh-10rem)] flex flex-1 justify-center items-center flex-col gap-2',
        className,
      )}
    >
      <p className='text-md text-red-500'>{constants.message.error}</p>
    </div>
  )
}
