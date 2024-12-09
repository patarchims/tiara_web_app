import type { Response, User } from '@/type'

import { post } from './api'

type LoginRequest = {
  email: string
  password: string
}

const login = async ({
  email,
  password,
}: LoginRequest): Promise<Response<User>> => {
  const response = await post('/v1/login', { email, password })

  return response.data
}

export { login }
