import { create } from "zustand";
import { MUser } from "../models/MTambahAkun";
import cloneDeep from "clone-deep";

const tmpTambahAkun = {
  id_user: 0,
  username: "",
  nama_user: "",
  level: "",
  noreg_tempat: "",
  tipe_tempat: "",
  nama_tempat: "",
  alamat_tempat: "",
  id_kelurahan: 0,
  id_kecamatan: 0,
  kelurahan: "",
  kecamatan: "",
  notlp: null,
  nohp: "",
  email: "",
  izin_ipal: "",
  izin_tps: "",
  status_user: "",
  statusactive_user: "",
  user_created: "",
  user_updated: "",
  uid: "",
  created_at: "",
  updated_at: "",
};
export const useTambahAkunStore = create<MUser>((set) => ({
  ...tmpTambahAkun,
  simpenBentaran: (payload: MUser) => {
    // kosongin dulu semua
    set(cloneDeep(tmpTambahAkun));

    // set ulang datanya dari payload
    set({ ...payload });
  },
}));

export const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () =>
    set((state: { bears: number }) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
