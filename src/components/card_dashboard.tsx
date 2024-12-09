export default function CardDashboard({
  title,
  count,
  onClick,
}: {
  title: string
  count: number
  onClick?: () => void
}) {
  return (
    <div
      className='border bg-primaryColor shadow-sm transition-all ease-in-out rounded-md p-4 hover:-translate-y-1 hover:cursor-pointer h-[100px]'
      onClick={onClick}
    >
      <h3 className='text-xl font-medium text-white'>{title}</h3>
      <h1 className='text-3xl font-bold text-white'>{count}</h1>
    </div>
  )
}
