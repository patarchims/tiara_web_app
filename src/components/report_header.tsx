import { images } from '@/assets/images/images'
import { config } from '@/config/config'

export function ReportHeader() {
  return (
    <>
      <div className='flex items-center justify-between px-4 py-2'>
        <div>
          <img
            src={images.logo}
            alt='logo'
            style={{ height: 150, width: 150 }}
            className='object-contain'
          />
        </div>
        <div className='text-center mx-[50px]'>
          <h1 className='font-bold text-xl'>{config.appName}</h1>
          <p className='font-medium'>{config.address}</p>
          <p className='font-medium'>Email : {config.email}</p>
          <p className='font-medium'>Website : {config.website}</p>
          {config.akreditasi != '' && (
            <p className='font-medium'>Akreditasi {config.akreditasi}</p>
          )}
        </div>
        <div className='w-[150px]' />
      </div>
      <div className='m-4 h-1 bg-black  border border-black' />
    </>
  )
}
