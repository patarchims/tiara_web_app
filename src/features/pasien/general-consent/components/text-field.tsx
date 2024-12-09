export const TextField = ({
  title,
  value,
}: {
  title: string
  value?: string
}) => {
  return (
    <div className='px-8 mt-5'>
      <div className='flex items-center'>
        <div className='min-w-[250px]'>
          <p className='text-xs'>{title ?? ''}</p>
        </div>
        <div>
          <p className='text-xs'>: {value ?? ''}</p>
        </div>
      </div>
    </div>
  )
}
