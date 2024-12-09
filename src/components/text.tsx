import { cn } from '@/lib/utils'

const Text = ({
  k = '',
  v = '',
  kStyle,
  vStyle,
}: {
  k?: string
  v?: string
  kStyle?: string
  vStyle?: string
}) => {
  return (
    <div className='flex items-center gap-4'>
      <p className={cn('min-w-[200px] text-xs', kStyle)}>{k}</p>
      <p className={cn('text-xs', vStyle)}>
        {k == '' ? '' : ':'} {v}
      </p>
    </div>
  )
}
export default Text
