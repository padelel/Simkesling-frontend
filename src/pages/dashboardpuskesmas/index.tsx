import React from "react";
import { useState, createContext, useContext } from "react";
import MainLayout from "@/components/MainLayout";

const DashboardPage: React.FC = () => {
  return (
    <MainLayout title={"Dashboard"}>
      <h1>Dashboard</h1>
    </MainLayout>
  );
};

export default DashboardPage;
