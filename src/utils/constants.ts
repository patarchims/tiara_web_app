export const constants = {
  queryKey: {
    pelayanan: {
      list: 'list-pelayanan',
    },
    pasien: {
      byPelayanan: 'list-pasien-by-pelayanan',
      cppt: {
        report: 'report',
      },
      edukasiTerintegrasi: {
        list: 'list-edukasi-terintegrasi',
      },
    },
    pasienPulang: 'pasien-pulang',

    dashboard: {
      jumlah: 'dashboard-jumlah',
    },
    pemberiInformasi: {
      list: 'list-pemberi-informasi',
    },
    rekamMedis: {
      list: 'list-rekam-medis',
      listRegisterPasien: 'list-register-pasien',
      rekamMedis: 'report-rekam-medis',
      resumeMedis: 'report-resume-medis',
      generalConsent: 'report-general-consent',
      pengantarRawatInap: 'report-pengantar-rawat-inap',
      asesmenDokterIgd: 'report-asesmen-dokter-igd',
      triase: 'report-triase',
      triasePonek: 'report-triase-ponek',
      asesmenAwalMedisPonek: 'asesmen-awal-medis-ponek',
      lembarKonsul: 'report-lembar-konsul',
      pelaksanaanKeperawatan: 'pelaksanaan-keperawatan',
    },
  },
  message: {
    loading: 'Sedang memuat data, mohon tunggu sebentar.',
    error: 'Terjadi kesalahan!',
  },
  version: 'v0.0.1',
}
