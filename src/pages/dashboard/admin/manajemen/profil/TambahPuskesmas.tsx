import MainLayout from "@/components/admin/MainLayout";
import FormTambahAkun from "@/components/admin/profil/FormTambahAkun";
import React from "react";

const TambahPuskesmas = () => {
  return (
    <MainLayout title="Tambah Puskesmas / Rumah Sakit">
      <h2 style={{ textAlign: "center" }}>Form Tambah Rumah Sakit</h2>
      <div style={{ justifyContent: "center" }}>
        <FormTambahAkun />
      </div>
    </MainLayout>
  );
};

export default TambahPuskesmas;
