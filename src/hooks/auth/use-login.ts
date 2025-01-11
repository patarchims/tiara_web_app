import { z } from 'zod'

import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { login } from '@/services/auth'
import { useAuthStore } from '@/store/auth.store'
import { Meta } from '@/type'
import { constants } from '@/utils/constants'

import { useToast } from '../use-toast'

export function useLogin() {
  const authState = useAuthStore((state) => state)

  const { toast } = useToast()

  const [status, setStatus] = useState<'loading' | ''>('')

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, 'password length min 3 character'),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'tabitagultom@gmail.com',
      password: '12345',
      // email: '',
      // password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setStatus('loading')
      const response = await login(values)
      if (response.response) {
        authState.setIsLogin(true)
        authState.setUser(response.response)
      }
      setStatus('')
    } catch (error) {
      const err = error as AxiosError & {
        response: { data: { metadata: Meta } }
      }
      const data = err.response?.data ?? {}
      const meta = data.metadata as Meta
      toast({
        variant: 'destructive',
        title: constants.message.error,
        description: meta.message ?? 'error',
      })
      setStatus('')
    }
  }

  return { authState, status, form, onSubmit }
}
