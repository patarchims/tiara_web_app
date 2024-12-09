import { useState } from 'react'
import { match } from 'ts-pattern'

import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import Error from '@/components/error'
import Layout from '@/components/layout'
import Sidebar from '@/components/sidebar'
import Dashboard from '@/features/dashboard/dashboard'
import LaporanOperasi from '@/features/laporan-operasi'
import PasienPulang from '@/features/pasien-pulang'
import Pasien from '@/features/pasien/pasien'
import { getDashboard } from '@/services/dashboard'
import { useAuthStore } from '@/store/auth.store'
import { constants } from '@/utils/constants'

export const Route = createFileRoute('/')({
  component: Home,
})

const menu: string[] = [
  'Dashboard',
  'Antrean Pasien',
  'Pasien Pulang',
  'Laporan Operasi',
]

function Home() {
  const authState = useAuthStore((state) => state)

  if (!authState.isLogin) {
    // if not logged in, navigate to login page
    window.location.replace('/login')
  }

  // selected tab
  const [index, setIndex] = useState(0)

  const {
    data: dashboard,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [constants.queryKey.dashboard],
    queryFn: () => getDashboard({ kd_bagian: authState.user!.kd_bagian }),
  })

  return (
    <Layout showHeader>
      <div className='flex'>
        {/* Sidebar */}
        <Sidebar menu={menu} index={index} setIndex={(i) => setIndex(i)} />
        {/* Sidebar */}

        {/* Main Content */}
        <main className='h-[calc(100vh-5rem)] overflow-y-scroll w-full p-4 bg-gradient-to-b from-blue-500  to-[#0066CB] mt-2 mx-2 rounded-md'>
          <h1 className='font-semibold  text-3xl mb-2 text-white'>
            {renderTitleByIndex(index)}
          </h1>
          {isError ? <Error className='text-white' /> : renderByIndex(index)}
        </main>
        {/* Main Content */}
      </div>
    </Layout>
  )

  function renderByIndex(index: number) {
    return match(index)
      .with(0, () => (
        <Dashboard
          isLoading={isLoading}
          count={dashboard?.response.jumlah_pasien ?? 0}
          onClickJumlahPasien={() => setIndex(1)}
        />
      ))
      .with(1, () => <Pasien />)
      .with(2, () => <PasienPulang />)
      .with(3, () => <LaporanOperasi />)
      .otherwise(() => null)
  }

  function renderTitleByIndex(index: number) {
    return menu[index]
  }
}
