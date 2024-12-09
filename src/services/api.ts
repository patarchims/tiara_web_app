/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

import * as Sentry from '@sentry/react'

import { User } from '@/type'

let token: string

const authStore = JSON.parse(localStorage.getItem('auth-store')!)
if (authStore != null) {
  const { user }: { user: User } = authStore.state
  token = user.token
}

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}/app`,
  timeout: 3000,
})

// instance interceptors request
instance.interceptors.request.use(async (req) => {
  if (token != '') {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

// instance interceptor response
instance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    Sentry.captureException(error?.metadata?.message)
    return Promise.reject(error)
  },
)

const get = (url: string, params?: any) => {
  return instance.get(url, { params })
}

const post = (url: string, data: any, config?: any) => {
  return instance.post(url, data, config)
}

const put = (url: string, data: any, config?: any) => {
  return instance.put(url, data, config)
}

const postFormData = (url: string, data: any) => {
  // loop through data and convert to form data
  const formData = new FormData()
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key])
  })
  return instance.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

const deleteApi = (url: string) => {
  return instance.delete(url)
}

export { get, post, postFormData, put, deleteApi }
