import { cn } from '@/lib/utils'

export const TextTitle = ({
  title,
  onClick,
}: {
  title: string
  onClick?: () => void
}) => {
  return (
    <div className='my-1'>
      <h3
        className={cn('text-xs font-medium', onClick && 'hover:cursor-pointer')}
        onClick={onClick}
      >
        {title}
      </h3>
    </div>
  )
}
