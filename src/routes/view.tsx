import { createFileRoute } from '@tanstack/react-router'

import OperationReport from '@/features/laporan-operasi/components/operation-report'

export const Route = createFileRoute('/view')({
  component: Render,
})

function Render() {
  return <OperationReport />
}
