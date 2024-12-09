import type { RegisterPasien, ReportGeneralConsent, Response } from '@/type'

import { get, post } from './api'

const getGeneralConsent = async (
  no_reg: string,
  bagian: string,
): Promise<Response<ReportGeneralConsent>> => {
  const response = await get(`/v1/general-consent/${no_reg}/${bagian}`)

  return response.data
}

const getRegisterPasien = async ({
  no_rm,
}: {
  no_rm: string
}): Promise<Response<RegisterPasien[]>> => {
  const response = await post(`/v1/register-pasien`, { no_rm: no_rm })

  return response.data
}

export { getGeneralConsent, getRegisterPasien }
