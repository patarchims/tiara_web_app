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
      lembarKonsul: 'report-lembar-konsul',
    },
  },
  message: {
    loading: 'Sedang memuat data, mohon tunggu sebentar.',
    error: 'Terjadi kesalahan!',
  },
}
