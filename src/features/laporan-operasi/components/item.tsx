const Item = ({ number, name }: { number: string; name: string }) => {
  return (
    <div className='border border-black border-t-0 flex items-center'>
      <div className='p-2 w-[40px] flex justify-center border-r border-black'>
        <p className='text-xs'>{number}</p>
      </div>
      <p className='text-xs ml-2'>{name}</p>
    </div>
  )
}

export default Item
