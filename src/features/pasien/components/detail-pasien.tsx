import { Printer, Sidebar } from 'lucide-react'

import { useState } from 'react'
import { match } from 'ts-pattern'

import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Link } from '@tanstack/react-router'

import { images } from '@/assets/images/images'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useAuthStore } from '@/store/auth.store'
import { useGlobalStore } from '@/store/global.store'
import { usePasienStore } from '@/store/pasien.store'
import { Pasien } from '@/type'
import { constants } from '@/utils/constants'

import { AsesmenKeperawatanBayi } from '../asesmen-keperawatan-bayi'
import { CPPT } from '../cppt'
import { CpptAddModal } from '../cppt/components/cppt-add-modal'
import UpdateSbar from '../cppt/components/update-sbar'
import UpdateSoap from '../cppt/components/update-soap'
import { EdukasiTerintegrasi } from '../edukasi-terintegrasi'
import EtAddModal from '../edukasi-terintegrasi/components/et-add-modal'
import EtUpdateModal from '../edukasi-terintegrasi/components/et-update-modal'
import GeneralConsent from '../general-consent'
import Triase from '../triase'
import { AnalisaData } from './analisa-data'
import { AsesmenKeperawatanAnak } from './asesmen-keperawatan-anak'
import { AsesmenKeperawatanDewasa } from './asesmen-keperawatan-dewasa'
import { InstruksiMedisFarmakologi } from './instruksi-medis-farmakologi'
import { KontrolPasien } from './kontrol-pasien'
import { MonitoringCairan } from './monitoring-cairan'
import { ResikoJatuh } from './resiko-jatuh'

export function DetailPasien() {
  // store
  const { user } = useAuthStore((state) => state)
  const { pasien } = usePasienStore((state) => state)
  const { showDialog, dialogId, setDialogId, setShowDialog } = useGlobalStore(
    (state) => state,
  )

  // state
  const [showSideBar, setShowSideBar] = useState(true)

  // selected menu
  const [
    menu,
    // setMenu
  ] = useState<Menu[]>(initalMenu)
  const [selectedMenu, setSelectedMenu] = useState<Menu>(Menu.CPPT)

  // to report path
  const to = selectedMenu.replace(/\s+/g, '-').toLowerCase()

  return (
    <>
      {/* Dialog Detail Pasien  */}
      <Dialog
        modal
        open={dialogId == 'dialog-detail-pasien'}
        onOpenChange={() => {
          setSelectedMenu(Menu.CPPT)
          setDialogId('')
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
                <div className='h-[200px] border flex flex-col justify-center items-center text-center'>
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
                      {/* {pasien?.nama_pasien[0]} */}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className='py-2'>{pasien?.nama_pasien}</h3>
                  <p className='text-xs'>{pasien?.no_rm}</p>
                  <p className='text-xs'>{pasien?.no_reg}</p>
                  <p className='text-xs'>{constants.version}</p>
                </div>
                {/* Profile Pasien */}
                <div className='h-[350px] w-full p-2 overflow-x-scroll'>
                  {Object.values(menu).map((item, i) => (
                    <Button
                      variant={selectedMenu != item ? 'outline' : 'default'}
                      className='w-full mb-2 hover:translate-x-1 transition-all ease-in-out text-[10px] font-semibold'
                      key={i}
                      onClick={() => {
                        setSelectedMenu(item)
                        // setShowSideBar((prev) => !prev)
                      }}
                    >
                      {item}
                    </Button>
                  ))}
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
                    {selectedMenu == 'CPPT'
                      ? 'CATATAN PERKEMBANGAN PASIEN TERINTEGRASI'
                      : selectedMenu}
                  </h3>
                </div>
                <Link to={`/report/${to}`} target='_blank'>
                  <Printer className='text-white mr-10 hover:cursor-pointer' />
                </Link>{' '}
              </div>
              {/* AppBar */}
              <div className='w-full border h-[calc(100vh-32px)] overflow-y-scroll'>
                <div className='p-2'>{render(selectedMenu, pasien!)}</div>
              </div>
            </div>
            {/* Right Content */}
            {/* FAB */}
            <FAB />
            {/* FAB */}
          </div>
        </DialogContent>
      </Dialog>
      {/* Dialog Detail Pasien  */}

      <Dialog
        modal
        open={showDialog}
        onOpenChange={() => {
          setShowDialog(!showDialog)
          if (dialogId != 'dialog-rekam-medis') {
            setDialogId('dialog-rekam-medis')
          } else {
            setDialogId('')
          }
        }}
      >
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <DialogContent className='min-h-screen max-w-screen-2xl'>
          {dialogId == 'dialog-pasien-add-data' &&
            selectedMenu == Menu.CPPT && <CpptAddModal />}
          {dialogId == 'dialog-update-cppt-soap' &&
            selectedMenu == Menu.CPPT && <UpdateSoap />}
          {dialogId == 'dialog-update-cppt-sbar' &&
            selectedMenu == Menu.CPPT && <UpdateSbar />}
          {dialogId == 'dialog-pasien-add-data' &&
            selectedMenu == Menu.EDUKASI_TERINTEGRASI && <EtAddModal />}
          {dialogId == 'dialog-update-edukasi-terintegrasi' &&
            selectedMenu == Menu.EDUKASI_TERINTEGRASI && <EtUpdateModal />}
        </DialogContent>
      </Dialog>
    </>
  )

  function FAB() {
    let show = true

    if (
      pasien?.bagian !== user?.bagian ||
      selectedMenu === Menu.GENERAL_CONSENT ||
      selectedMenu === Menu.TRIASE
    ) {
      show = false
    }

    return (
      <div className='relative'>
        {show && (
          <Button
            onClick={() => {
              setShowDialog(true)
              setDialogId('dialog-pasien-add-data')
            }}
            className='absolute right-0 bottom-[20px]'
          >
            Tambah Data
          </Button>
        )}
      </div>
    )
  }
}

enum Menu {
  CPPT = 'CPPT',
  ASESMEN_KEPERAWATAN_DEWASA = 'ASESMEN KEPERAWATAN DEWASA',
  ASESMEN_KEPERAWATAN_ANAK = 'ASESMEN KEPERAWATAN ANAK',
  ASESMEN_KEPERAWATAN_BAYI = 'ASESMEN KEPERAWATAN BAYI',
  RESIKO_JATUH = 'RESIKO JATUH',
  ANALISA_DATA = 'ANALISA DATA',
  KONTROL_PASIEN = 'KONTROL PASIEN',
  INSTRUKSI_MEDIS_FARMAKOLOGI = 'INSTRUKSI MEDIS FARMAKOLOGI',
  MONITORING_CAIRAN = 'MONITORING CAIRAN',
  GENERAL_CONSENT = 'GENERAL CONSENT',
  EDUKASI_TERINTEGRASI = 'EDUKASI TERINTEGRASI',
  TRIASE = 'TRIASE',
}

const initalMenu = [
  Menu.CPPT,
  Menu.EDUKASI_TERINTEGRASI,
  Menu.GENERAL_CONSENT,
  Menu.TRIASE,
]

function render(menu: Menu, pasien: Pasien) {
  return match(menu)
    .with(Menu.CPPT, () => <CPPT />)
    .with(Menu.ASESMEN_KEPERAWATAN_DEWASA, () => <AsesmenKeperawatanDewasa />)
    .with(Menu.ASESMEN_KEPERAWATAN_ANAK, () => <AsesmenKeperawatanAnak />)
    .with(Menu.ASESMEN_KEPERAWATAN_BAYI, () => <AsesmenKeperawatanBayi />)
    .with(Menu.RESIKO_JATUH, () => <ResikoJatuh />)
    .with(Menu.ANALISA_DATA, () => <AnalisaData />)
    .with(Menu.KONTROL_PASIEN, () => <KontrolPasien />)
    .with(Menu.INSTRUKSI_MEDIS_FARMAKOLOGI, () => <InstruksiMedisFarmakologi />)
    .with(Menu.MONITORING_CAIRAN, () => <MonitoringCairan />)
    .with(Menu.EDUKASI_TERINTEGRASI, () => <EdukasiTerintegrasi />)
    .with(Menu.GENERAL_CONSENT, () => <GeneralConsent />)
    .with(Menu.TRIASE, () => <Triase noreg={pasien.no_reg} />)
    .otherwise(() => null)
}
