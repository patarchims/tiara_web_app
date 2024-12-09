import type { LaporanOperasi, Response } from '@/type'

import { get } from './api'

const getLaporOperasi = async ({
  noreg,
}: {
  noreg: string
}): Promise<Response<LaporanOperasi>> => {
  const response = await get(`/v1/laporan-operasi/${noreg}`)

  return response.data
}

export { getLaporOperasi }
