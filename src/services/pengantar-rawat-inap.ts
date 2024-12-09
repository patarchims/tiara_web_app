import type { PengantarRawatInap, Response } from '@/type'

import { get } from './api'

const getPengantarRawatInap = async ({
  noreg,
}: {
  noreg: string
}): Promise<Response<PengantarRawatInap>> => {
  const response = await get(`/v1/pengantar-rawat-inap/${noreg}`)

  return response.data
}

export { getPengantarRawatInap }
