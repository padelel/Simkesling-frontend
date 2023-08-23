import React from "react";
import { useState, createContext, useContext } from "react";
import MainLayout from "@/components/MainLayout";
import { UserContext } from "./about.context";
import {
  useBearStore,
  usePengajuanTransporterStore,
} from "@/stores/pengajuanTransporterStore";
import { Controls } from "@/components/aboutComponent";
const AboutPage: React.FC = () => {
  // const userContext = useContext(UserContext);
  const bears = useBearStore((state: any) => state.bears);
  const pengajuanTransporterStore = usePengajuanTransporterStore();

  return (
    <MainLayout>
      <h1>ini about {bears}</h1>
      <h1>ini about {pengajuanTransporterStore.id_transporter_tmp}</h1>
      {/* <button onClick={() => pengajuanTransporterStore.cekData()}>
        klik me
      </button> */}
      {/* <Controls></Controls> */}
      {/* <h2>{userContext.name}</h2> */}
    </MainLayout>
  );
};

export default AboutPage;
