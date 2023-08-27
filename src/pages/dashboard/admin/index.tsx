import React from "react";
// import Chart from "react-apexcharts";
import MainLayout from "@/components/MainLayout";
import Diagram from "@/components/admin/dashboard/Diagram";
import { Col, Row } from "antd";
import TabelNotifikasi from "@/components/admin/dashboard/TabelNotifikasi";
import CardTahunan from "@/components/admin/dashboard/CardTahunan";
import CardBulanan from "@/components/admin/dashboard/Cardbulanan";
import dynamic from "next/dynamic";

const DashboardPage: React.FC = () => {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

  const series = [
    {
      name: "Temperature in Fahrenheit", //will be displayed on the y-axis
      data: [43, 53, 50, 57],
    },
  ];
  const options = {
    chart: {
      id: "simple-bar",
    },
    xaxis: {
      categories: [1, 2, 3, 4], //will be displayed on the x-asis
    },
  };
  return (
    <MainLayout title="Dashboard">
      {/* <Diagram /> */}
      <h2>Grafik</h2>
      <Row>
        <Col>
          {typeof window !== undefined && (
            <Chart options={options} type="bar" series={series} />
          )}
        </Col>
        <Col>
          {typeof window !== undefined && (
            <Chart options={options} type="line" series={series} />
          )}
        </Col>
        <Col>
          {typeof window !== undefined && (
            <Chart options={options} type="bar" series={series} />
          )}
        </Col>
      </Row>
      <h2>Total Laporan Sepanjang Tahun</h2>
      <Row>
        <CardTahunan />
      </Row>
      <h2>Total Laporan Per Bulan</h2>
      <Row>
        <CardBulanan />
      </Row>
      <h2>History Navigasi</h2>
      <Row>
        <TabelNotifikasi />
      </Row>
    </MainLayout>
  );
};

export default DashboardPage;
