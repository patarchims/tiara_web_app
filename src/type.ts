export type DialogId =
  | 'dialog-detail-pasien'
  | 'dialog-rekam-medis'
  | 'dialog-pasien-add-data'
  | 'dialog-update-cppt-soap'
  | 'dialog-update-cppt-sbar'
  | 'dialog-update-edukasi-terintegrasi'
  | 'dialog-edit-diagnosa-asesmen-awal-igd'
  | 'dialog-edit-vital-sign-asesmen-awal-igd'
  | 'dialog-edit-pemeriksaan-fisik-asesmen-awal-igd'
  | ''

export interface Meta {
  message: string
  code: number
}


export interface AsesmenDokterRanap {
  dokter: string
  tanggal: string
  prognosis: string
  image_lokalis: string
  keluhan_utama: string
  penyakit_sekarang: string
  penyakit_keluarga: string
  penyakit_dahulu: string
  pemeriksaan_fisik: PemeriksaanFisikAsesmenDokterIgd
  vital_sign: VitalSign
  labor: Labor[]
  radiologi: Radiologi[]
  planning: InstruksiPengantarRawatInap[]
  diagnosa: Diagnosa[]
  profil_pasien: ProfilPasien
  konsul_ke: string
  terapi: string
}


export interface Response<T> {
  metadata: Meta
  response: T
}

export interface User {
  nama: string
  bagian: string
  kd_bagian: string
  ket_person: string
  photo: string
  token: string
  refresh_token: string
}

export interface Pelayanan {
  kd_bagian: string
  bagian: string
}

export interface Pasien {
  tgl_lahir: string
  no_antrean: string
  jenis_kelamin: string
  debitur: string
  kd_debitur: string
  no_reg: string
  no_rm: string
  keterangan: string
  nama_pasien: string
  kd_bagian: string
  bagian: string
  pelayanan: string
  nama_dokter: string
  kd_dokter: string
  kamar: string
  kasur: string
  asesmen_dokter: string
  asesmen_perawat: string
}

export interface Cppt {
  id: number
  tanggal: string
  instruksi_ppa: string
  dpjp: string
  pemberi_asuhan: string
  subjektif: string
  situation: string
  background: string
  objektif: string
  asesmen: string
  plan: string
  recommendation: string
}

export interface CpptByNoreg {
  profil_pasien: ProfilPasien
  cppt: Cppt[]
}

export interface EdukasiTerintegrasi {
  id: number
  tanggal: string
  informasi: string
  metode: string
  pemberi_informasi: string
  penerima_informasi: string
  evaluasi: string
}


export interface PelaksanaanKeperawatan {
  insert_dttm: string
  insert_pc: string
  noreg: string
  person: string
  nama_perawat: string
  no_daskep: string
  kode_sdki: string
  no_rm: string
  siki: Siki[]
  tindakan: Tindakan[]
}

export interface PemberiInformasi {
  nama: string
  jenik_kelamin: string
}

export interface ReportGeneralConsent {
  pelayanan: string
  tanggal: string
  petugas: string
  pasien: Partial<Pasien> & {
    alamat: string
    no_hp: string
  }
  penanggung_jawab: PenanggungJawab
}

export interface PenanggungJawab {
  nama: string
  tgl_lahir: string
  alamat: string
  no_hp: string
}

export interface RekamMedisLink {
  nama_rm: string
  kode_rm: string
  link_url: string
}

export interface Keperawatan {
  intervensi: PelaksanaanKeperawatan[]
  pasien: Partial<Pasien> & {
    alamat: string
    no_hp: string
    tgl_lahir: string
  }
}

export interface PelaksanaanKeperawatan {
  insert_dttm: string
  insert_pc: string
  noreg: string
  person: string
  nama_perawat: string
  no_daskep: string
  kode_sdki: string
  no_rm: string
  siki: Siki[]
  tindakan: Tindakan[]
}


export interface Siki {
  insert_dttm: string
  no_daskep: string
  id_siki: number
  kode_siki: string
  nama_siki: string
  kategori: string
  no_urut: number
}

export interface Tindakan {
  id: number
  insert_dttm: string
  no_daskep: string
  user_id: string
  kd_bagian: string
  deskripsi: string
  perawat: Partial<Perawat>
  bagian: Partial<Bagian>
}


export interface Bagian {
  Bagian: string
  Pelayanan: string
}

export interface Perawat {
  id_perawat: string
  nama: string
  alamat: string
  jenis_kelamin: string
  status: string
}

export interface RegisterPasien {
  tanggal: string
  no_rm: string
  noreg: string
  nama: string
  kunjungan: string
  keterangan: string
  pelayanan: string
  bagian: string
}

export interface RingkasanPerawatanPasienPulang {
  nama_pasien: string
  no_register: string
  tanggal_lahir: string
  tgl_masuk: string
  jam_masuk: string
  tgl_keluar: string
  jam_keluar: string
  no_rm: string
  jenis_kelamin: string
  ruang: string
  kelas: string
  dokter_merawat: string
  alamat: string
  keadaan: string
  obat_waktu_pulang: ObatWaktuPulang[]
  labor: Labor[]
  radiologi: Radiologi[]
  fisioterapi: Fisoterapi[]
  gizi: Gizi[]
  pemeriksaan_fisik: PemeriksaanFisik
  riwayat_penyakit: string
  diagnosa: Diagnosa[]
}

export interface ObatWaktuPulang {
  tgl_keluar: string
  nama_obat: string
  jumlah: number
}

export interface BasePemeriksaan {
  tanggal: string
  nama_kelompok: string
}

export interface PemeriksaanUraianHasil {
  pemeriksaan_deskripsi: string
  uraian: string
  hasil: string
}

export interface Labor extends BasePemeriksaan {
  penlab: Penlab[]
}

export interface Penlab extends PemeriksaanUraianHasil {
  satuan: string
  normal: string
}

export interface Radiologi extends BasePemeriksaan {
  radiologi: PemeriksaanUraianHasil[]
}
export interface Fisoterapi extends BasePemeriksaan {
  fisioterapi: PemeriksaanUraianHasil[]
}
export interface Gizi extends BasePemeriksaan {
  gizi: PemeriksaanUraianHasil[]
}

export interface PemeriksaanFisik {
  tb: string
  td: string
  bb: string
  nadi: string
  suhu: string
  spo2: string
  penafasan: string
}

export interface Diagnosa {
  diagnosa: string
  description: string
  type: string
  table: string
}

export interface PengantarRawatInap {
  tanggal: string
  bagian: string
  mohon: string
  nama_pasien: string
  jenis_kelamin: string
  keluhan_utama: string
  tgl_lahir: string
  alamat: string
  no_rm: string
  nama_dpjp: string
  diagnosa: DiagnosaPengantarRawatInap[]
  pemeriksaan_fisik: PemeriksaanFisikPengantarRawatInap
  instruksi: InstruksiPengantarRawatInap[]
}

export interface DiagnosaPengantarRawatInap {
  diagnosa: string
  description: string
  type: string
  table: string
}

export interface PemeriksaanFisikPengantarRawatInap {
  sens: string
  e: string
  m: string
  v: string
  tekanan_darah: string
  rr: string
  temp: string
  hr: string
}

export interface InstruksiPengantarRawatInap {
  tgl_keluar: string
  nama_obat: string
  jumlah: number
}

export interface AsesmenDokterIgd {
  dokter: string
  tanggal: string
  prognosis: string
  image_lokalis: string
  keluhan_utama: string
  penyakit_sekarang: string
  penyakit_keluarga: string
  penyakit_dahulu: string
  pemeriksaan_fisik: PemeriksaanFisikAsesmenDokterIgd
  vital_sign: VitalSign
  labor: Labor[]
  radiologi: Radiologi[]
  planning: InstruksiPengantarRawatInap[]
  diagnosa: Diagnosa[]
  profil_pasien: ProfilPasien
  konsul_ke: string
  terapi: string
  cara_keluar: string
  cara_keluar_detail: string
}

export interface PemeriksaanFisikAsesmenDokterIgd {
  kepala: string
  mata: string
  tht: string
  mulut: string
  leher: string
  dada: string
  jantung: string
  paru: string
  perut: string
  hati: string
  limpa: string
  ginjal: string
  alat_kelamin: string
  anggota_gerak: string
  relfeks: string
  kekuatan_otot: string
  kulit: string
  kelenjar_getah_bening: string
  rt_vt: string
}

export interface VitalSign {
  gcs: string
  kesadaran: string
  nadi: string
  pernafasan: string
  spo2: string
  suhu: string
  td: string
}

export interface Triase {
  nama_pasien: string
  tgl_lahir: string
  no_rm: string
  tgl_masuk: string
  jam_pemeriksaan: string
  jam_kedatangan: string
  alasan_datang: string
  penyebab_cedera: string
  keluhan_utama: string
  triase: {
    gcs: string
    td: string
    nadi: string
    pupil: string
    pernafasan: string
    suhu: string
    refleks: string
    spo2: string
    akral: string
  }
  status_alergi: string
  gangguan_perilaku: string
  status_kehamilan: string
  jalan_nafas: string
  pernafasan: string
  sirkulasi: string
  kesadaran: string
  status_lendir: string
  his: string
  nyeri: string
  skor_nyeri: number
  petugas_triase: string
  gambar_nyeri: GambarNyeri[]
  ruangan: string
  skala_triase: string
}

export interface GambarNyeri {
  skor: number
  image_url: string
}

export interface LembarKonsul {
  profil_pasien: ProfilPasien
  lembar_konsul: {
    nama_pasien: string
    tanggal_lahir: string
    no_rm: string
    noreg: string
    ruangan: string
    dokter: string
    jenis_konsultasi: string
    dokter_meminta_konsul: string
    tanggal_konsul: string
    mohon_konsul_pasien: string
    umur_pasien: string
    iktisar_klinik: string
    diagnosa_kerja: Diagnosa[]
  },
  jawaban_konsul: JawabanKonsul
}


export interface JawabanKonsul {
  tanggal: string,
  penemuan: string,
  diagnosa: string,
  terapi: string,
  anjuran: string
}

export interface PasienPulang {
  no_rm: string
  tanggal: string
  pelayanan: string
  noreg: string
  nama: string
}

export interface LaporanOperasi {
  profil_pasien: ProfilPasien
  ahli_bedah: AhliAnastesi[]
  asisten: Asisten[]
  istrumen: Asisten[]
  ahli_anastesi: AhliAnastesi[]
  perawat_anastesi: AhliAnastesi[]
  tanggal_operasi: string
  jam_operasi_dimulai: string
  jam_operasi_selesai: string
  lama_operasi_berlangsung: string
  klasifikasi: JenisOperasi[]
  jenis_operasi: JenisOperasi[]
  klasifikasi_luka: JenisOperasi[]
  pengiriman_jaringan: JenisOperasi[]
  jenis_jaringan: string
  uraian_operasi: string
  tindakan_operasi: TindakanOperasi[]
  diagnosa_pre: TindakanOperasi[]
  diagnosa_post: TindakanOperasi[]
  tanggal: string
}

export interface AhliAnastesi {
  nama: string
}

export interface Asisten {
  nama: string
  ket: string
}

export interface JenisOperasi {
  nama: string
  is_active: boolean
}

export interface ProfilPasien {
  tgl_lahir: string
  jenis_kelamin: string
  nama: string
  ruangan: string
  no_reg: string
  no_rm?: string
}

export interface TindakanOperasi {
  keterangan: string
  kode: string
  deskripsi: string
}
