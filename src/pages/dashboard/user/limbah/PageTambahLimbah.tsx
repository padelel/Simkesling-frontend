import MainLayout from "@/components/MainLayout";
import FormPengajuanLimbah from "@/components/formpuskesmas/pengajuanLimbah/FormPengajuanLimbah";
import React from "react";

const PageTambahLimbah = () => {
  return (
    <MainLayout title="Form Laporan Limbah">
      <FormPengajuanLimbah />
    </MainLayout>
  );
};

export default PageTambahLimbah;
