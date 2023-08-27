import { create } from "zustand";
import { MLaporanBulanan } from "../models/MLaporanBulanan";
import cloneDeep from "clone-deep";

const tmpLaporanBulanan = {
  id_laporan_bulanan: 0,
  id_transporter: "",
  id_user: "",
  nama_transporter: "",
  nama_pemusnah: "",
  metode_pemusnah: "",
  berat_limbah_total: "",
  punya_penyimpanan_tps: "",
  ukuran_penyimpanan_tps: "",
  punya_pemusnahan_sendiri: "",
  ukuran_pemusnahan_sendiri: "",
  limbah_b3_covid: "",
  limbah_b3_noncovid: "",
  debit_limbah_cair: "",
  kapasitas_ipal: "",
  memenuhi_syarat: "",
  catatan: "",
  periode: "",
  periode_nama: "",
  tahun: "",
  status_laporan_bulanan: "",
  statusactive_laporan_bulanan: "",
  user_created: "",
  user_updated: "",
  uid: "",
  created_at: "",
  updated_at: "",
  b3padat: [],
  file_manifest: [],
  file_logbook: [],
};

export const useLaporanBulananStore = create<MLaporanBulanan>((set) => ({
  ...tmpLaporanBulanan,
  simpenSementara: (payload: MLaporanBulanan) => {
    // kosongin dulu semua
    set(cloneDeep(tmpLaporanBulanan));

    // set ulang datanya dari payload
    set({ ...payload });
  },
}));
