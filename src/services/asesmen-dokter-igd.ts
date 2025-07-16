import type { AsesmenDokterIgd, Response } from '@/type'

import { get } from './api'

const getAsesmenDokterIgd = async ({
  noreg,
}: {
  noreg: string
}): Promise<Response<AsesmenDokterIgd>> => {
  const response = await get(`/v1/asesmen-dokter-igd/${noreg}`)

  return response.data
}

const getAsesmenDokterPonek = async ({
  noreg,
}: {
  noreg: string
}): Promise<Response<AsesmenDokterIgd>> => {
  const response = await get(`/v1/asesmen-dokter-ponek/${noreg}`)

  return response.data
}

export { getAsesmenDokterIgd, getAsesmenDokterPonek }
