export const TextField = ({
  title,
  value,
}: {
  title: string
  value?: string
}) => {
  return (
    <div className='my-1'>
      <div className='flex items-center'>
        <div className='min-w-[150px]'>
          <p className='text-xs'>{title ?? ''}</p>
        </div>
        <div>
          <p className='text-xs'>{value != '' ? `: ${value}` : ''}</p>
        </div>
      </div>
    </div>
  )
}
