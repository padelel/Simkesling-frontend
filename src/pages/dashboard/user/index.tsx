import React from "react";
import { useState, createContext, useContext } from "react";
import MainLayout from "@/components/MainLayout";
import { useUserLoginStore } from "@/stores/userLoginStore";

const DashboardPage: React.FC = () => {
  const userLoginStore = useUserLoginStore();
  return (
    <MainLayout title={"Dashboard"}>
      <h1>Dashboard {userLoginStore.user?.nama_user}</h1>
    </MainLayout>
  );
};

export default DashboardPage;
