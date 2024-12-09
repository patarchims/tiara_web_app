import Lottie from 'lottie-react'
import { LoaderCircle } from 'lucide-react'

import { createFileRoute } from '@tanstack/react-router'

import { images } from '@/assets/images/images'
import { loginAnimation } from '@/assets/lottie-files/lottie-files'
import Layout from '@/components/layout'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLogin } from '@/hooks/auth/use-login'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  const { authState, form, onSubmit, status } = useLogin()

  if (authState.isLogin) {
    // if user logged in, navigate to dashboard
    window.location.replace('/')
  }

  return (
    <Layout>
      <main className='min-h-screen w-full flex bg-primaryColor'>
        <section className='w-[400px] flex items-center justify-center'>
          <div className='h-[400px] w-full p-4'>
            <img
              src={images.logo}
              className='h-[150px] w-[150px] mx-auto mb-4 -mt-10'
            />
            <h1 className='text-2xl font-bold mb-4 text-white'>Masuk</h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-white'>Email</FormLabel>
                      <FormControl>
                        <Input type='email' placeholder='email' {...field} />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-white'>Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <Button
                  disabled={status == 'loading'}
                  type='submit'
                  className='w-full bg-blue-700 hover:bg-blue-400'
                >
                  {status == 'loading' ? (
                    <LoaderCircle className='animate-spin' />
                  ) : (
                    'Masuk'
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </section>
        <div className='hidden md:flex flex-1 items-center justify-center'>
          <Lottie animationData={loginAnimation} style={{ height: 500 }} />
        </div>
      </main>
    </Layout>
  )
}
