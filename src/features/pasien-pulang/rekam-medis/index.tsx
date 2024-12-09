import { Printer, Sidebar } from 'lucide-react'

import { useEffect, useState } from 'react'

import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

import { images } from '@/assets/images/images'
import Error from '@/components/error'
import Loading from '@/components/loading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import AsesmenAwalMedis from '@/features/pasien/asesmen-awal-medis'
import FormPengantarRawatInap from '@/features/pasien/form-pengantar-rawat-inap'
import LembaranKonsul from '@/features/pasien/lembaran-konsul'
import Triase from '@/features/pasien/triase'
import { getRegisterPasien } from '@/services/general-consent'
import { getRekamMedisUrl } from '@/services/rekam-medis'
import { useGlobalStore } from '@/store/global.store'
import { usePasienStore } from '@/store/pasien.store'
import { RekamMedisLink } from '@/type'
import { constants } from '@/utils/constants'
import { useDebounce } from '@/utils/debounce'

import { CPPTResume } from './components/report-cppt-resume'
import RekamMedisGeneralConsent from './components/report-rekam-medis'
import ReportResume from './components/report-resume'

export default function RekamMedis() {
  // store
  const { pasien } = usePasienStore((state) => state)
  const { dialogId, setDialogId } = useGlobalStore((state) => state)

  // state
  const [showSideBar, setShowSideBar] = useState(true)
  const [text, setText] = useState('')
  const [selectedMenu, setSelectedMenu] = useState<string>('')
  const [tempData, setTempData] = useState<RekamMedisLink[] | []>([])
  const [selectedNoreg, setSelectedNoreg] = useState<string>('')

  // query

  const { data } = useQuery({
    queryKey: [constants.queryKey.rekamMedis.list],
    queryFn: getRekamMedisUrl,
  })

  const {
    data: pasienRegister,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [constants.queryKey.rekamMedis.listRegisterPasien, pasien?.no_rm],
    queryFn: () => getRegisterPasien({ no_rm: pasien!.no_rm }),
  })

  const refetch = (noreg: string) => {
    setSelectedNoreg(noreg)
  }

  // to report path
  const to = selectedMenu.replace(/\s+/g, '-').toLowerCase()

  // no report
  const no =
    tempData
      .find((item) => item.nama_rm == selectedMenu)
      ?.kode_rm.replace(/\s+/g, ' ') ?? ''

  useEffect(() => {
    if (data != null && data.response != null) {
      setTempData(data.response)
      setSelectedMenu(data.response[0].nama_rm)
    }
  }, [data])

  const res = useDebounce(text, 1000)
  useEffect(() => {
    if (res) {
      const newData = data!.response
        .filter((item) => item.nama_rm.toLowerCase().includes(res))
        .map((item) => item)
      setTempData(newData)
    }
  }, [res])

  if (isLoading) return <Loading className='text-white' />
  if (isError) return <Error className='text-red-[500]' />

  return (
    <>
      {/* Dialog Detail Pasien  */}
      <Dialog
        modal
        open={dialogId == 'dialog-rekam-medis'}
        onOpenChange={() => {
          setDialogId('')
          setSelectedNoreg('')
          setSelectedMenu(tempData.length > 0 ? tempData[0].nama_rm : '')
        }}
      >
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <DialogContent className='min-h-screen max-w-screen-2xl'>
          <div className='flex'>
            {/* Left Content */}
            {showSideBar && (
              <div className='w-[250px] border p-4'>
                {/* Profile Pasien */}
                <div className='h-[200px] border flex flex-col justify-center items-center text-center mb-4'>
                  <Avatar className='h-[100px] w-[100px]'>
                    <AvatarImage
                      src={
                        pasien?.jenis_kelamin == 'Laki-Laki'
                          ? images.man
                          : images.woman
                      }
                      alt='pasien photos'
                    />
                    <AvatarFallback className='text-2xl'>
                      {/* {pasien?.nama_pasien} */}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className='py-2'>{pasien?.nama_pasien}</h3>
                </div>
                {/* Profile Pasien */}
                <div className='px-1 w-full'>
                  {/* Search Input */}
                  <Input
                    value={text}
                    className='focus-visible:ring-0 focus-visible:ring-offset-0 text-xs'
                    placeholder='Cari Rekam Medis'
                    onChange={(e) => {
                      setText(e.target.value)
                    }}
                  />
                  {/* Search Input */}
                  <div className='overflow-y-scroll mb-2 rounded-md mt-4 p-1 w-full h-[calc(100vh-300px)]'>
                    {tempData.length > 0 &&
                      tempData.map((item: RekamMedisLink, index: number) => (
                        <Button
                          variant={
                            selectedMenu != item.nama_rm ? 'outline' : 'default'
                          }
                          className='w-full mb-2 hover:translate-x-1 transition-all ease-in-out text-[10px] font-semibold'
                          key={index}
                          onClick={() => {
                            setText('')
                            setSelectedMenu(item.nama_rm)
                            setSelectedNoreg('')
                          }}
                        >
                          {item.nama_rm}
                        </Button>
                      ))}
                  </div>
                </div>
              </div>
            )}
            {/* Left Content */}
            {/* Right Content */}
            <div className='w-full'>
              {/* AppBar */}
              <div className='h-[50px] px-2 w-full bg-primaryColor flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Sidebar
                    className='text-white hover:cursor-pointer'
                    onClick={() => setShowSideBar((prev) => !prev)}
                  />
                  <h3 className='text-lg font-medium text-white'>
                    {selectedMenu}
                  </h3>
                </div>
                {/* Print */}
                <Link
                  disabled={selectedNoreg == ''}
                  to={`/report/${to}-rekam-medis`}
                  search={{ noreg: selectedNoreg, no: no }}
                  target='_blank'
                >
                  <Printer className='text-white mr-10 hover:cursor-pointer' />
                </Link>{' '}
                {/* Print */}
              </div>
              {/* AppBar */}
              <div className='w-full border h-[calc(100vh-32px)] overflow-y-scroll p-4'>
                {/* Select No Reg */}
                <div className='flex items-center gap-2'>
                  <div />
                  <Select onValueChange={refetch} value={selectedNoreg}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Pilih data kunjungan' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {pasienRegister != null &&
                          pasienRegister.response.map((item, index) => (
                            <SelectItem key={index} value={item.noreg}>
                              {item.tanggal} - {item.noreg}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {/* Select No Reg */}

                {/* Report */}
                <div className='p-2 mt-4'>
                  {selectedMenu == 'GENERAL CONSENT' && selectedNoreg != '' && (
                    <RekamMedisGeneralConsent noreg={selectedNoreg} />
                  )}
                  {selectedMenu == 'RESUME' && selectedNoreg != '' && (
                    <ReportResume noreg={selectedNoreg} />
                  )}
                  {selectedMenu == 'FORM PENGANTAR RAWAT INAP' &&
                    selectedNoreg != '' && (
                      <FormPengantarRawatInap noreg={selectedNoreg} />
                    )}
                  {selectedMenu == 'ASESMEN AWAL MEDIS IGD' &&
                    selectedNoreg != '' && (
                      <AsesmenAwalMedis noreg={selectedNoreg} />
                    )}
                  {selectedMenu == 'TRIASE' && selectedNoreg != '' && (
                    <Triase noreg={selectedNoreg} />
                  )}
                  {selectedMenu == 'LEMBAR KONSUL' && selectedNoreg != '' && (
                    <LembaranKonsul noreg={selectedNoreg} />
                  )}
                  {selectedMenu == 'CPPT' && selectedNoreg != '' && (
                    <CPPTResume noreg={selectedNoreg} />
                  )}
                </div>
                {/* Report */}
              </div>
            </div>
            {/* Right Content */}
          </div>
        </DialogContent>
      </Dialog>
      {/* Dialog Detail Pasien  */}
    </>
  )
}
