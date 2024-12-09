import {
  AddEdukasiTerintegrasiReq,
  UpdateEdukasiTerintegrasiReq,
} from '@/hooks/edukasi-terintegrasi'
import type { EdukasiTerintegrasi, Response } from '@/type'

import { get, post, put } from './api'

const getData = async (
  no_rm: string,
): Promise<Response<EdukasiTerintegrasi[]>> => {
  const response = await get(`/v1/edukasi-terintegrasi/${no_rm}`)

  return response.data
}

const saveEt = async (
  data: AddEdukasiTerintegrasiReq,
): Promise<Response<unknown>> => {
  const response = await post(`/v1/edukasi-terintegrasi`, data)

  return response.data
}

const updateEt = async (
  data: UpdateEdukasiTerintegrasiReq,
): Promise<Response<unknown>> => {
  const response = await put(`/v1/edukasi-terintegrasi`, data)

  return response.data
}

export { getData, saveEt, updateEt }
