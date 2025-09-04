export interface MUser {
  id_user: number;
  username: string;
  nama_user: string;
  level: string;
  noreg_tempat: string;
  tipe_tempat: string;
  nama_tempat: string;
  alamat_tempat: string;
  id_kelurahan: number;
  id_kecamatan: number;
  kelurahan: string;
  kecamatan: string;
  notlp: number;
  nohp: string;
  email: string;
  izin_ipal: string;
  izin_tps: string;
  status_user: string;
  statusactive_user: string;
  user_created: string;
  user_updated: string;
  uid: string;
  created_at: string;
  updated_at: string;
  link_manifest: string;
  link_logbook: string;
  link_lab_ipal: string;
  link_lab_lain: string;
  link_dokumen_lingkungan_rs: string;
  link_izin_transporter: string;
  link_mou_transporter: string;
  kapasitas_ipal: string;

  simpenBentaran?: Function;
}
