import { createFileRoute } from '@tanstack/react-router'

import Triase from '@/features/pasien/triase'

export const Route = createFileRoute('/view')({
  component: Render,
})

function Render() {
  return <Triase />
}
