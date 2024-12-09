import { Printer } from 'lucide-react'
import { z } from 'zod'

import { match } from 'ts-pattern'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import OperationReport from '@/features/laporan-operasi/components/operation-report'
import { CPPTResume } from '@/features/pasien-pulang/rekam-medis/components/report-cppt-resume'
import RekamMedisGeneralConsent from '@/features/pasien-pulang/rekam-medis/components/report-rekam-medis'
import ReportResume from '@/features/pasien-pulang/rekam-medis/components/report-resume'
import AsesmenAwalMedis from '@/features/pasien/asesmen-awal-medis'
import { AsesmenKeperawatanBayi } from '@/features/pasien/asesmen-keperawatan-bayi'
import { AnalisaData } from '@/features/pasien/components/analisa-data'
import { AsesmenKeperawatanAnak } from '@/features/pasien/components/asesmen-keperawatan-anak'
import { AsesmenKeperawatanDewasa } from '@/features/pasien/components/asesmen-keperawatan-dewasa'
import { InstruksiMedisFarmakologi } from '@/features/pasien/components/instruksi-medis-farmakologi'
import { KontrolPasien } from '@/features/pasien/components/kontrol-pasien'
import { MonitoringCairan } from '@/features/pasien/components/monitoring-cairan'
import { ResikoJatuh } from '@/features/pasien/components/resiko-jatuh'
import { CPPT } from '@/features/pasien/cppt'
import { EdukasiTerintegrasi } from '@/features/pasien/edukasi-terintegrasi'
import FormPengantarRawatInap from '@/features/pasien/form-pengantar-rawat-inap'
import GeneralConsent from '@/features/pasien/general-consent'
import LembaranKonsul from '@/features/pasien/lembaran-konsul'
import Triase from '@/features/pasien/triase'

const searchSchema = z.object({
  no_rm: z.string().or(z.number()).optional(),
  noreg: z.string().or(z.number()).optional(),
  no: z.string().optional(),
})

export const Route = createFileRoute('/report/$report')({
  component: Report,
  validateSearch: searchSchema,
})

function Report() {
  const { report } = Route.useParams()
  const { noreg, no, no_rm } = Route.useSearch() as {
    noreg: string
    no: string
    no_rm: string
  }

  return (
    <div className='p-4 bg-white'>
      <Button
        onClick={() => {
          window.print()
        }}
        className='mb-4 w-full'
      >
        <Printer className='mr-2' /> Simpan Ke PDF
      </Button>
      {render(report.replace('_', '-'))}
    </div>
  )

  function render(report: string) {
    return match(report)
      .with('cppt', () => <CPPT isReport no_rm={no_rm} />)
      .with('edukasi-terintegrasi', () => <EdukasiTerintegrasi isReport />)
      .with('asesmen-keperawatan-dewasa', () => <AsesmenKeperawatanDewasa />)
      .with('asesmen-keperawatan-anak', () => <AsesmenKeperawatanAnak />)
      .with('asesmen-keperawatan-bayi', () => <AsesmenKeperawatanBayi />)
      .with('resiko-jatuh', () => <ResikoJatuh />)
      .with('analisa-data', () => <AnalisaData />)
      .with('kontrol-pasien', () => <KontrolPasien />)
      .with('instruksi-medis-farmakologi', () => <InstruksiMedisFarmakologi />)
      .with('monitoring-cairan', () => <MonitoringCairan />)
      .with('general-consent', () => <GeneralConsent isReport />)
      .with('general-consent-rekam-medis', () => (
        <RekamMedisGeneralConsent isReport noreg={noreg} no={no} />
      ))
      .with('resume-rekam-medis', () => (
        <ReportResume isReport noreg={noreg} no={no} />
      ))
      .with('asesmen-awal-medis', () => <AsesmenAwalMedis isReport />)
      .with('form-pengantar-rawat-inap-rekam-medis', () => (
        <FormPengantarRawatInap isReport noreg={noreg} no={no} />
      ))
      .with('asesmen-awal-medis-igd-rekam-medis', () => (
        <AsesmenAwalMedis isReport noreg={noreg} no={no} />
      ))
      .with('triase-rekam-medis', () => (
        <Triase isReport noreg={noreg} no={no} />
      ))
      .with('lembar-konsul-rekam-medis', () => (
        <LembaranKonsul isReport noreg={noreg} no={no} />
      ))
      .with('cppt-rekam-medis', () => (
        <CPPTResume isReport noreg={noreg} no={no} />
      ))
      .with('laporan-operasi', () => <OperationReport isReport noreg={noreg} />)
      .otherwise(() => null)
  }
}
