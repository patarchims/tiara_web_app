import CardDashboard from '@/components/card_dashboard'
import { Skeleton } from '@/components/ui/skeleton'

interface DashboardProps {
  count: number
  onClickJumlahPasien: () => void
  isLoading: boolean
}

export default function Dashboard({
  count,
  onClickJumlahPasien,
  isLoading = false,
}: DashboardProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
      {isLoading ? (
        <Skeleton className='h-[100px] rounded-md' />
      ) : (
        <CardDashboard
          title='Jumlah Pasien'
          count={count}
          onClick={onClickJumlahPasien}
        />
      )}
    </div>
  )
}
