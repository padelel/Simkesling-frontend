import MainLayout from "@/components/admin/MainLayout";
import FormTambahAkun from "@/components/admin/puskesmas/FormTambahAkun";
import React from "react";

const TambahPuskesmas = () => {
  return (
    <MainLayout title="Tambah Puskesmas / Rumah Sakit">
      <h2 style={{ textAlign: "center" }}>Form Pengajuan Transporter</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <FormTambahAkun />;
      </div>
    </MainLayout>
  );
};

export default TambahPuskesmas;
