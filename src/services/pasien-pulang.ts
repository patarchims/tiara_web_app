import type { PasienPulang, Response } from '@/type'

import { get } from './api'

const getPasienPulang = async ({
  no_rm = '',
}: {
  no_rm: string
}): Promise<Response<PasienPulang[]>> => {
  const response = await get(`v1/cari-pasien-pulang/${no_rm}`)

  return response.data
}

export { getPasienPulang }
