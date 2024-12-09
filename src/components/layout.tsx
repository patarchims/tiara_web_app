import { ReactNode } from 'react'

import { Toaster } from '@/components/ui/toaster'

import { Alert } from './alert'
import Header from './header'

const Layout = ({
  children,
  showHeader = false,
}: {
  children: ReactNode
  showHeader?: boolean
}) => {
  return (
    <>
      {showHeader && <Header />}
      <div className='max-width'>{children}</div>
      <Alert />
      <Toaster />
    </>
  )
}
export default Layout
