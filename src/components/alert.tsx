import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useGlobalStore } from '@/store/global.store'

export function Alert() {
  const {
    showAlert,
    setShowAlert,
    alertDescription,
    dialogId,
    setDialogId,
    setShowDialog,
  } = useGlobalStore((state) => state)

  return (
    <AlertDialog open={showAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Peringatan</AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter
          onClick={() => {
            if (dialogId != 'dialog-detail-pasien') {
              setDialogId('dialog-detail-pasien')
            } else {
              setDialogId('')
            }
            setShowAlert(false)
            setShowDialog(false)
          }}
        >
          <AlertDialogAction className='w-full'>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
