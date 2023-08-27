export interface MUser {
    id_user: number;
    username: string;
    nama_user: string;
    level: string;
    noreg_tempat: string;
    tipe_tempat: string;
    nama_tempat: string;
    alamat_tempat: string;
    id_kelurahan: null;
    id_kecamatan: null;
    kelurahan: string;
    kecamatan: string;
    notlp: null;
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

    simpenBentaran?: Function;
}
