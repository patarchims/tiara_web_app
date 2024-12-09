import type {
  RekamMedisLink,
  Response,
  RingkasanPerawatanPasienPulang,
} from '@/type'

import { get } from './api'

const getRekamMedisUrl = async (): Promise<Response<RekamMedisLink[]>> => {
  const response = await get(`/v1/rekam-medis`)

  return response.data
}

const getResumeMedis = async (
  no_reg: string,
): Promise<Response<RingkasanPerawatanPasienPulang>> => {
  const response = await get(`/v1/resume-medis/${no_reg}`)

  return response.data
}

export { getRekamMedisUrl, getResumeMedis }
