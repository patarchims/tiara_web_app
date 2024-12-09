import { Check } from 'lucide-react'

interface CheckBoxProps {
  title: string
  isChecked?: boolean
}

const Checkbox = ({ title, isChecked = false }: CheckBoxProps) => {
  return (
    <div className='flex items-center gap-2'>
      <div className='h-4 w-4 border border-black'>
        {isChecked && <Check size={14} />}
      </div>
      <p className='text-xs'>{title}</p>
    </div>
  )
}

export default Checkbox
