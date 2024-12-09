import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useSoap } from '@/hooks/cppt/use-soap'

export default function SaveSoap() {
  const { formSaveSoap, onAddSoap } = useSoap()

  return (
    <>
      <div className='rounded-md border border-gray-400 h-[calc(80vh)] overflow-x-auto px-4 py-2'>
        <Form {...formSaveSoap}>
          <form
            onSubmit={formSaveSoap.handleSubmit(onAddSoap)}
            className='space-y-4'
          >
            <FormField
              control={formSaveSoap.control}
              name='subjektif'
              render={({ field }) => (
                <FormItem>
                  <Description desc='Subjective: Informasi berupa ungkapan yang di terima dari dokter/perawat setelah diberikan tindakan.' />
                  <FormControl>
                    <Textarea
                      placeholder='Isikan Subjektif disini.'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={formSaveSoap.control}
              name='objektif'
              render={({ field }) => (
                <FormItem>
                  <Description desc='Objective: Informasi yang di dapat dalam bentuk hasil pengamatan, penilaian, pengukuran, yang diberi oleh perawat setelah tindakan.' />
                  <FormControl>
                    <Textarea
                      placeholder='Isikan Objektif disini.'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={formSaveSoap.control}
              name='asesmen'
              render={({ field }) => (
                <FormItem>
                  <Description desc='Assesment: Membandingkan antara informasi subjective dan objective dengan tujuan & kriteria hasil. Kemudian, terbentuk kesimpulan jika masalah teratasi, atau teratasi sebagian, atau tidak.' />
                  <FormControl>
                    <Textarea
                      placeholder='Isikan Assesment disini.'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={formSaveSoap.control}
              name='plan'
              render={({ field }) => (
                <FormItem>
                  <Description desc='Plan: Rencana keperawatan lanjutan yang akan dilakukan berdasarkan hasil analisa.' />
                  <FormControl>
                    <Textarea placeholder='Isikan Plan disini.' {...field} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={formSaveSoap.control}
              name='instruksi_ppa'
              render={({ field }) => (
                <FormItem>
                  <Description desc='Instruksi atau Arahan kepada PPA (Profesional Pemberi Asuhan) adalah mereka yang secara langsung memberikan asuhan kepada pasien, antara lain dokter, perawat, bidan, ahli gizi, apoteker, psikolog klinis, fisioterapis dsb' />
                  <FormControl>
                    <Textarea placeholder='Isikan PPA disini.' {...field} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <Button
        onClick={formSaveSoap.handleSubmit(onAddSoap)}
        className='mt-4 w-full'
      >
        SIMPAN
      </Button>
    </>
  )
}

function Description({ desc }: { desc: string }) {
  return (
    <div className='p-2 border rounded-md bg-orange-300 my-4 font-medium'>
      {desc}
    </div>
  )
}
