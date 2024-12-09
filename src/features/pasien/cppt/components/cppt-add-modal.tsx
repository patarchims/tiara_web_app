import { useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import Sbar from './save-sbar'
import Soap from './save-soap'

export function CpptAddModal() {
  const [tabVal, setTabVal] = useState('SOAP')

  return (
    <Tabs
      value={tabVal}
      onValueChange={(value) => setTabVal(value)}
      defaultValue='SOAP'
      className='w-full'
    >
      <TabsList className='w-full'>
        <TabsTrigger className='w-full' value='SOAP'>
          SOAP
        </TabsTrigger>
        <TabsTrigger className='w-full' value='SBAR'>
          SBAR
        </TabsTrigger>
      </TabsList>

      <TabsContent className='w-full' value='SOAP'>
        <Soap />
      </TabsContent>

      <TabsContent className='w-full' value='SBAR'>
        <Sbar />
      </TabsContent>
    </Tabs>
  )
}
