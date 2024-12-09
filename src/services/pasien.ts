import type { Pasien, Response } from '@/type'

import { post } from './api'

const getPasienByPelayanan = async ({
  kd_bagian = '',
}: {
  kd_bagian: string
}): Promise<Response<Pasien[]>> => {
  const response = await post('/v1/antrean-pasien', { kd_bagian })

  return response.data
}

export { getPasienByPelayanan }
