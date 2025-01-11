import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

interface CheckBoxProps {
  title: string
  isChecked?: boolean
  className?: string
  titleClassName?: string
}

const Checkbox = ({
  title,
  isChecked = false,
  className,
  titleClassName,
}: CheckBoxProps) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className='h-4 w-4 border border-black'>
        {isChecked && <Check size={14} />}
      </div>
      <p className={cn('text-xs', titleClassName)}>{title}</p>
    </div>
  )
}

export default Checkbox
