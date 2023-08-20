import MainLayout from "@/components/dashboard/MainLayout";
import FormTambahAkun from "@/components/dashboard/puskesmas/FormTambahAkun";
import React from "react";

const TambahPuskesmas = () => {
  return (
    <MainLayout title="Tambah Puskesmas / Rumah Sakit">
      <h2 style={{ textAlign: "center" }}>Form Pengajuan Rumah Sakit</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <FormTambahAkun />;
      </div>
    </MainLayout>
  );
};

export default TambahPuskesmas;
