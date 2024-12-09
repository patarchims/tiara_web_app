import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useSbar } from '@/hooks/cppt/use-sbar'

export default function SaveSbar() {
  const { formSaveSbar, onAddSbar } = useSbar()

  return (
    <>
      <div className='rounded-md border border-gray-400 h-[calc(80vh)] overflow-x-auto px-4 py-2'>
        <Form {...formSaveSbar}>
          <form
            onSubmit={formSaveSbar.handleSubmit(onAddSbar)}
            className='space-y-4'
          >
            <FormField
              control={formSaveSbar.control}
              name='situation'
              render={({ field }) => (
                <FormItem>
                  <Description desc='Situation: menggambarkan keadaan situasi yang terjadi seperti yang dialami pasien saat ini, keluhan utama pasien, dan mengapa perawat menghubungi dokter.' />
                  <FormControl>
                    <Textarea
                      placeholder='Isikan Situation disini.'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={formSaveSbar.control}
              name='background'
              render={({ field }) => (
                <FormItem>
                  <Description desc='Background membahas tentang apa yang melatarbelakangi kondisi pasien, tanda-tanda vital dan riwayat penyakit,kondisi yang akan datang, dan keadaan yang mengarah pada kondisi tersebut' />
                  <FormControl>
                    <Textarea
                      placeholder='Isikan Background disini.'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={formSaveSbar.control}
              name='asesmen'
              render={({ field }) => (
                <FormItem>
                  <Description desc='Assessment merupakan hasil pengkajian pasien dan kemungkinan masalah yang akan dihadapi pasien. Recommendation yaitu mengusulkan tindakan yang harus dilakukan terkait kondisi pasien saat ini' />
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
              control={formSaveSbar.control}
              name='recomendation'
              render={({ field }) => (
                <FormItem>
                  <Description desc='"Jelaskan rekomendasi Dokter/Perawat dalam perawatan pasien. Contoh: “Dokter jaga  merekomendasikan [rekomendasi]. Mohon dokter segera datang.”"' />
                  <FormControl>
                    <Textarea
                      placeholder='Isikan Recommendation disini.'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={formSaveSbar.control}
              name='instruksi_ppa'
              render={({ field }) => (
                <FormItem>
                  <Description desc='"Instruksi atau Arahan kepadan PPA (Profesional Pemberi Asuhan) adalah mereka yang secara langsung memberikan asuhan kepada pasien, antara lain dokter, perawat, bidan, ahli gizi, apoteker, psikolog klinis, fisioterapis dsb"' />
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
        onClick={formSaveSbar.handleSubmit(onAddSbar)}
        className='mt-4 w-full'
        type='submit'
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
