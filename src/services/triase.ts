import type { Response, Triase } from '@/type'

import { get } from './api'

const getTriase = async ({
  noreg,
}: {
  noreg: string
}): Promise<Response<Triase>> => {
  const response = await get(`/v1/report-triase/${noreg}`)

  return response.data
}

export { getTriase }
