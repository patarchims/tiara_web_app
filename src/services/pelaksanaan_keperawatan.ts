import type { Keperawatan, Response } from '@/type'

import { post } from './api'

const getPelaksanaanKeperawatan = async ({
  noreg = '',
  no_rm = '',
}: {
  noreg: string
  no_rm : string
}): Promise<Response<Keperawatan>> => {
  const response = await post('/v2/report-intervensi', { noreg, no_rm })

  return response.data
}

export { getPelaksanaanKeperawatan }
