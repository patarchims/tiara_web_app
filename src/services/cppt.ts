import { AddCpptSbarReq, UpdateCpptSbarReq } from '@/hooks/cppt/use-sbar'
import { AddCpptSoapReq, UpdateCpptSoapReq } from '@/hooks/cppt/use-soap'
import type { Cppt, CpptByNoreg, Response } from '@/type'

import { get, post, put } from './api'

const getReportCppt = async (id: string): Promise<Response<Cppt[]>> => {
  const response = await get(`/v1/cppt/${id}`)

  return response.data
}

const getReportCpptByNoreg = async (
  noreg: string,
): Promise<Response<CpptByNoreg>> => {
  const response = await get(`/v1/report-cppt/${noreg}`)

  return response.data
}

const saveCpptSoap = async (
  data: AddCpptSoapReq,
): Promise<Response<unknown>> => {
  const response = await post('/v1/cppt-soap', data)

  return response.data
}

const updateCpptSoap = async (
  data: UpdateCpptSoapReq,
): Promise<Response<unknown>> => {
  const response = await put('/v1/cppt-soap', data)

  return response.data
}

const saveCpptSbar = async (
  data: AddCpptSbarReq,
): Promise<Response<unknown>> => {
  const response = await post('/v1/cppt-sbar', data)

  return response.data
}

const updateCpptSbar = async (
  data: UpdateCpptSbarReq,
): Promise<Response<unknown>> => {
  const response = await put('/v1/cppt-sbar', data)

  return response.data
}

export {
  getReportCppt,
  getReportCpptByNoreg,
  saveCpptSoap,
  saveCpptSbar,
  updateCpptSoap,
  updateCpptSbar,
}
