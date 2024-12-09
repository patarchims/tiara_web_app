import type { PemberiInformasi, Response } from '@/type'

import { get } from './api'

const getPemberiInformasi = async (): Promise<Response<PemberiInformasi[]>> => {
  const response = await get('/v1/pemberi-informasi')

  return response.data
}

export { getPemberiInformasi }
