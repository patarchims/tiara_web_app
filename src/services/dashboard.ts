import type { Response } from '@/type'

import { post } from './api'

const getDashboard = async ({
  kd_bagian = '',
}: {
  kd_bagian: string
}): Promise<Response<{ jumlah_pasien: number }>> => {
  const response = await post('/v1/dashboard', { kd_bagian })

  return response.data
}

export { getDashboard }
