import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGlobalStore } from '@/store/global.store'
import { PemeriksaanFisikAsesmenDokterIgd } from '@/type'

interface EditPemeriksaanFisikProps {
  data: PemeriksaanFisikAsesmenDokterIgd
  setData: React.Dispatch<
    React.SetStateAction<PemeriksaanFisikAsesmenDokterIgd>
  >
}

const EditPemeriksaanFisik = ({ data, setData }: EditPemeriksaanFisikProps) => {
  const { setShowDialog } = useGlobalStore((state) => state)

  // handle input
  const [temp, setTemp] = useState<PemeriksaanFisikAsesmenDokterIgd>(data)

  return (
    <div>
      <h3 className='mt-4 text-2xl font-semibold'>Edit Pemeriksaan Fisik</h3>
      <div className='flex gap-4 p-4'>
        <div className='flex-1'>
          <Label>Kepala : </Label>
          <Input
            className='mb-2'
            placeholder='Kepala'
            value={temp?.kepala}
            onChange={(e) => {
              setTemp({ ...temp, kepala: e.target.value })
            }}
          />
          <Label>Mata : </Label>
          <Input
            className='mb-2'
            placeholder='Mata'
            value={temp?.mata}
            onChange={(e) => {
              setTemp({ ...temp, mata: e.target.value })
            }}
          />
          <Label>THT : </Label>
          <Input
            className='mb-2'
            placeholder='THT'
            value={temp?.tht}
            onChange={(e) => {
              setTemp({ ...temp, tht: e.target.value })
            }}
          />
          <Label>Mulut : </Label>
          <Input
            className='mb-2'
            placeholder='Mulut'
            value={temp?.mulut}
            onChange={(e) => {
              setTemp({ ...temp, mulut: e.target.value })
            }}
          />
          <Label>Leher : </Label>
          <Input
            className='mb-2'
            placeholder='Leher'
            value={temp?.leher}
            onChange={(e) => {
              setTemp({ ...temp, leher: e.target.value })
            }}
          />
          <Label>Dada : </Label>
          <Input
            className='mb-2'
            placeholder='Dada'
            value={temp?.dada}
            onChange={(e) => {
              setTemp({ ...temp, dada: e.target.value })
            }}
          />
          <Label>Jantung : </Label>
          <Input
            className='mb-4'
            placeholder='Jantung'
            value={temp?.jantung}
            onChange={(e) => {
              setTemp({ ...temp, jantung: e.target.value })
            }}
          />
          <Label>Paru : </Label>
          <Input
            className='mb-4'
            placeholder='Paru'
            value={temp?.paru}
            onChange={(e) => {
              setTemp({ ...temp, paru: e.target.value })
            }}
          />
          <Label>Perut : </Label>
          <Input
            className='mb-4'
            placeholder='Perut'
            value={temp?.perut}
            onChange={(e) => {
              setTemp({ ...temp, perut: e.target.value })
            }}
          />
          <Label>Hati : </Label>
          <Input
            className='mb-4'
            placeholder='Hati'
            value={temp?.hati}
            onChange={(e) => {
              setTemp({ ...temp, hati: e.target.value })
            }}
          />
        </div>
        <div className='flex-1'>
          <Label>Limpa : </Label>
          <Input
            className='mb-2'
            placeholder='Limpa'
            value={temp?.limpa}
            onChange={(e) => {
              setTemp({ ...temp, limpa: e.target.value })
            }}
          />
          <Label>Ginjal : </Label>
          <Input
            className='mb-2'
            placeholder='Ginjal'
            value={temp?.ginjal}
            onChange={(e) => {
              setTemp({ ...temp, ginjal: e.target.value })
            }}
          />
          <Label>Alat Kelamin : </Label>
          <Input
            className='mb-2'
            placeholder='Alat Kelamin'
            value={temp?.alat_kelamin}
            onChange={(e) => {
              setTemp({ ...temp, alat_kelamin: e.target.value })
            }}
          />
          <Label>Anggota Gerak : </Label>
          <Input
            className='mb-2'
            placeholder='Anggota Gerak'
            value={temp?.anggota_gerak}
            onChange={(e) => {
              setTemp({ ...temp, anggota_gerak: e.target.value })
            }}
          />
          <Label>Refleks : </Label>
          <Input
            className='mb-2'
            placeholder='Refleks'
            value={temp?.relfeks}
            onChange={(e) => {
              setTemp({ ...temp, relfeks: e.target.value })
            }}
          />
          <Label>Kekuatan Otot : </Label>
          <Input
            className='mb-2'
            placeholder='Kekuatan Otot'
            value={temp?.kekuatan_otot}
            onChange={(e) => {
              setTemp({ ...temp, kekuatan_otot: e.target.value })
            }}
          />
          <Label>Kulit : </Label>
          <Input
            className='mb-4'
            placeholder='Kulit'
            value={temp?.kulit}
            onChange={(e) => {
              setTemp({ ...temp, kulit: e.target.value })
            }}
          />
          <Label>Kelenjar Getah Bening : </Label>
          <Input
            className='mb-4'
            placeholder='Kelenjar Getah Bening'
            value={temp?.kelenjar_getah_bening}
            onChange={(e) => {
              setTemp({ ...temp, kelenjar_getah_bening: e.target.value })
            }}
          />
          <Label>RT/VT : </Label>
          <Input
            className='mb-4'
            placeholder='RT/VT'
            value={temp?.rt_vt}
            onChange={(e) => {
              setTemp({ ...temp, rt_vt: e.target.value })
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

export default EditPemeriksaanFisik
