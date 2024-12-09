import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Pasien } from '@/type'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const pasienColumns: ColumnDef<Pasien>[] = [
  {
    header: 'No.',
    cell: ({ row }) => <p>{row.index + 1}</p>,
  },
  {
    accessorKey: 'no_antrean',
    header: 'No Antrean',
  },
  {
    accessorKey: 'no_rm',
    header: 'No RM',
  },
  {
    accessorKey: 'tgl_lahir',
    header: 'Tanggal Lahir',
  },
  {
    accessorKey: 'nama_pasien',
    header: 'Nama Pasien',
  },

  {
    accessorKey: 'nama_dokter',
    header: 'DPJP',
  },
  {
    accessorKey: 'asesmen_dokter',
    header: 'Asesmen Dokter',
  },
  {
    accessorKey: 'asesmen_perawat',
    header: 'Asesmen Perawat',
  },
  {
    accessorKey: 'action',
    header: 'Asesmen',
    cell: ({ row }) => {
      const pasien = row.original
      let color = ''
      color =
        pasien.asesmen_dokter == '' && pasien.asesmen_perawat == ''
          ? 'bg-green-500'
          : pasien.asesmen_dokter != '' && pasien.asesmen_perawat != ''
            ? 'bg-[#DDDDDF]'
            : 'bg-[#FAE694]'

      return (
        <Button
          variant='outline'
          className={cn('text-black border border-black', color)}
        >
          PILIH
        </Button>
      )
    },
  },
]
