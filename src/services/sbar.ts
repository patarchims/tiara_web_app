import type { Cppt,Response } from '@/type'

import { get,} from './api'

const onGetSbar = async (noreg: string): Promise<Response<Cppt[]>> => {
  const response = await get(`/v1/sbar/${noreg}`)

  return response.data
}

export {
  onGetSbar
}
