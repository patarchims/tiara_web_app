import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGlobalStore } from '@/store/global.store'
import { VitalSign } from '@/type'

interface EditVitalSignProps {
  data: VitalSign
  setData: React.Dispatch<React.SetStateAction<VitalSign>>
}

const EditVitalSign = ({ data, setData }: EditVitalSignProps) => {
  const { setShowDialog } = useGlobalStore((state) => state)

  // handle input
  const [temp, setTemp] = useState<VitalSign>(data)

  return (
    <div>
      <h3 className='mt-4 text-2xl font-semibold'>Edit Vital Sign</h3>
      <div className='flex gap-4 mt-[50px] p-4'>
        <div className='flex-1'>
          <Label>GCS : </Label>
          <Input
            className='mb-2'
            placeholder='GCS'
            value={temp?.gcs}
            onChange={(e) => {
              setTemp({ ...temp, gcs: e.target.value })
            }}
          />
          <Label>TD : </Label>
          <Input
            className='mb-2'
            placeholder='TD'
            value={temp?.td}
            onChange={(e) => {
              setTemp({ ...temp, td: e.target.value })
            }}
          />
          <Label>Nadi : </Label>
          <Input
            className='mb-2'
            placeholder='Nadi'
            value={temp?.nadi}
            onChange={(e) => {
              setTemp({ ...temp, nadi: e.target.value })
            }}
          />
          <Label>Suhu : </Label>
          <Input
            className='mb-2'
            placeholder='Suhu'
            value={temp?.suhu}
            onChange={(e) => {
              setTemp({ ...temp, suhu: e.target.value })
            }}
          />
        </div>
        <div className='flex-1'>
          <Label>Kesadaran : </Label>
          <Input
            className='mb-2'
            placeholder='Kesadaran'
            value={temp?.kesadaran}
            onChange={(e) => {
              setTemp({ ...temp, kesadaran: e.target.value })
            }}
          />
          <Label>Pernafasan : </Label>
          <Input
            className='mb-2'
            placeholder='Pernafasan'
            value={temp?.pernafasan}
            onChange={(e) => {
              setTemp({ ...temp, pernafasan: e.target.value })
            }}
          />
          <Label>SPO2 : </Label>
          <Input
            className='mb-4'
            placeholder='SPO2'
            value={temp?.spo2}
            onChange={(e) => {
              setTemp({ ...temp, spo2: e.target.value })
            }}
          />
        </div>
      </div>
      <Button
        onClick={() => {
          setData(temp)
          setShowDialog(false)
        }}
        className='w-full'
      >
        Simpan
      </Button>
    </div>
  )
}

export default EditVitalSign
