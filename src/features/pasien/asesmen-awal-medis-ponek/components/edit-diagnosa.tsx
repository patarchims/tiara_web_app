import { DiagnosaTable } from '@/features/pasien-pulang/rekam-medis/components/diagnosa-table'
import { Diagnosa } from '@/type'

const EditDiagnosa = ({
  data,
  setData,
}: {
  data: Diagnosa[]
  setData: React.Dispatch<React.SetStateAction<Diagnosa[]>>
}) => {
  return (
    <div className='mt-[100px]'>
      <DiagnosaTable
        data={data ?? []}
        isEdit
        onEdit={(d: Diagnosa) => {
          const newData = data.map((item) =>
            item.diagnosa == d.diagnosa ? item : d,
          )
          console.log(newData)
          setData(newData)
        }}
        onDelete={(diagnosa: string) => {
          const newData = data.filter((item) => item.diagnosa != diagnosa)
          setData(newData)
        }}
      />
    </div>
  )
}

export default EditDiagnosa
