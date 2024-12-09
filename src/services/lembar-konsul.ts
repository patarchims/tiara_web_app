import type { LembarKonsul, Response } from '@/type'

import { get } from './api'

const getLembarKonsul = async ({
  noreg,
}: {
  noreg: string
}): Promise<Response<LembarKonsul>> => {
  const response = await get(`/v1/lembar-konsul/${noreg}`)

  return response.data
}

export { getLembarKonsul }
