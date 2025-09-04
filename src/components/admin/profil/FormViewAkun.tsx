import React, { useEffect, useState } from "react";
import { useTambahAkunStore } from "@/stores/pengajuanAkunStore";
import router from "next/router";
import cloneDeep from "clone-deep";

const FormViewAkun: React.FC = () => {
  const tambahAkunStore = useTambahAkunStore();
  const [form, setForm] = useState({
    oldid: "",
    nama_user: "",
    noreg_tempat: "",
    level: "",
    id_kecamatan: "",
    id_kelurahan: "",
    kecamatan: "",
    kelurahan: "",
    alamat_tempat: "",
    notelp: "",
    email: "",
    username: "",
    password: "",
    link_manifest: "",
    link_logbook: "",
    link_lab_ipal: "",
    link_lab_lain: "",
    link_dokumen_lingkungan_rs: "",
    link_izin_transporter: "",
    link_mou_transporter: "",
    kapasitas_ipal: "",
  });

  useEffect(() => {
    if (!tambahAkunStore.id_user) {
      router.push("/dashboard/admin/manajemen/profil");
      return;
    }
    const akunStore = cloneDeep(tambahAkunStore);
    setForm({
      oldid: akunStore.id_user?.toString() || "",
      nama_user: akunStore.nama_user || "",
      username: akunStore.username || "",
      noreg_tempat: akunStore.noreg_tempat || "",
      level: akunStore.level?.toString() || "",
      id_kecamatan: akunStore.id_kecamatan?.toString() || "",
      id_kelurahan: akunStore.id_kelurahan?.toString() || "",
      kecamatan: akunStore.kecamatan || "",
      kelurahan: akunStore.kelurahan || "",
      alamat_tempat: akunStore.alamat_tempat || "",
      notelp: akunStore.nohp || "",
      email: akunStore.email || "",
      password: akunStore.email || "",
      link_manifest: akunStore.link_manifest || "",
      link_logbook: akunStore.link_logbook || "",
      link_lab_ipal: akunStore.link_lab_ipal || "",
      link_lab_lain: akunStore.link_lab_lain || "",
      link_dokumen_lingkungan_rs: akunStore.link_dokumen_lingkungan_rs || "",
      link_izin_transporter: akunStore.link_izin_transporter || "",
      link_mou_transporter: akunStore.link_mou_transporter || "",
      kapasitas_ipal: akunStore.kapasitas_ipal || "",
    });
  }, []);

  const renderLink = (url: string) =>
    url ? (
      <a href={url} target="_blank" rel="noopener noreferrer">
        Klik Disini!
      </a>
    ) : (
      "-"
    );

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Nama Instansi</td>
            <td>:</td>
            <td>
              <b>{form.nama_user}</b>
            </td>
          </tr>
          <tr>
            <td>Username</td>
            <td>:</td>
            <td>
              <b>{form.username}</b>
            </td>
          </tr>
          <tr>
            <td>Nomor Registrasi / Nomor Izin Rumah Sakit</td>
            <td>:</td>
            <td>
              <b>{form.noreg_tempat}</b>
            </td>
          </tr>
          <tr>
            <td>Jenis Instansi</td>
            <td>:</td>
            <td>
              <b>
                {form.level === "2" ? "Rumah Sakit" : "Puskesmas"}
              </b>
            </td>
          </tr>
          <tr>
            <td>Kecamatan</td>
            <td>:</td>
            <td>
              <b>{form.kecamatan}</b>
            </td>
          </tr>
          <tr>
            <td>Kelurahan</td>
            <td>:</td>
            <td>
              <b>{form.kelurahan}</b>
            </td>
          </tr>
          <tr>
            <td>Nomor HP</td>
            <td>:</td>
            <td>
              <b>{form.notelp}</b>
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>:</td>
            <td>
              <b>{form.email}</b>
            </td>
          </tr>
          <tr>
            <td>Kapasitas IPAL</td>
            <td>:</td>
            <td>
              <b>{form.kapasitas_ipal}</b>
            </td>
          </tr>
          <tr>
            <td>Link Manifest</td>
            <td>:</td>
            <td>{renderLink(form.link_manifest)}</td>
          </tr>
          <tr>
            <td>Link Logbook</td>
            <td>:</td>
            <td>{renderLink(form.link_logbook)}</td>
          </tr>
          <tr>
            <td>Link Lab IPAL</td>
            <td>:</td>
            <td>{renderLink(form.link_lab_ipal)}</td>
          </tr>
          <tr>
            <td>Link Lab Lain</td>
            <td>:</td>
            <td>{renderLink(form.link_lab_lain)}</td>
          </tr>
          <tr>
            <td>Link Dokumen Lingkungan Rumah Sakit</td>
            <td>:</td>
            <td>{renderLink(form.link_dokumen_lingkungan_rs)}</td>
          </tr>
          <tr>
            <td>Link Izin Transporter</td>
            <td>:</td>
            <td>{renderLink(form.link_izin_transporter)}</td>
          </tr>
          <tr>
            <td>Link MOU Transporter</td>
            <td>:</td>
            <td>{renderLink(form.link_mou_transporter)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FormViewAkun;
