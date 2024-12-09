import type { Pelayanan, Response } from '@/type'

import { get } from './api'

const getPelayanan = async (): Promise<Response<Pelayanan[]>> => {
  const response = await get('/v1/pelayanan')

  return response.data
}

export { getPelayanan }
