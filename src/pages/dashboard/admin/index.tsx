import React, { useEffect, useState } from "react";
// import Chart from "react-apexcharts";
import MainLayout from "@/components/MainLayout";
import Diagram from "@/components/admin/dashboard/Diagram";
import { Button, Card, Col, Form, Input, Row, Select, Space } from "antd";
import TabelNotifikasi from "@/components/admin/dashboard/TabelNotifikasi";
import CardTahunan from "@/components/admin/dashboard/CardTahunan";
import CardBulanan from "@/components/admin/dashboard/Cardbulanan";
import dynamic from "next/dynamic";
import cloneDeep from "clone-deep";
import api from "@/utils/HttpRequest";

const DashboardPage: React.FC = () => {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const [tahunChart, setTahunChart] = useState("");
  const [periode, setPeriode] = useState("");
  const [formInstance] = Form.useForm();
  const [chartWidth, setChartWidth] = useState(800);
  const [chartHeight, setChartHeight] = useState(400);
  const [judulChart, setJudulChart] = useState("");
  const options = {
    chart: {
      id: "simple-bar",
    },
    colors: ["#feb019d9", "#008ffbd9", "#00e396d9"],
    xaxis: {
      categories: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
    },
    yaxis: {
      title: {
        text: "Jumlah Laporan",
      },
    },
    title: {
      text: `Grafik Pelaporan Limbah Puskesmas & RS ${judulChart}`, // Judul chart "Berat Total Limbah"
      align: "center",
    },
  };

  let tmp_form = {
    laporan_periode: "",
    laporan_periode_nama: "",
    laporan_periode_tahun: "",
    total_laporan_perperiode: 0,
    total_puskesmas_rs_belum_lapor: 0,
    total_puskesmas_rs_sudah_lapor: 0,
    total_transporter: 0,
    total_puskesmas_rs: 0,
  };
  const [form, setForm] = useState(cloneDeep(tmp_form));

  const tmpSeries = [
    {
      name: "Total Puskesmas Belum Lapor", //will be displayed on the y-axis
      data: [],
    },
    {
      name: "Total Puskesmas", //will be displayed on the y-axis
      data: [],
    },
    {
      name: "Total Puskesmas Sudah Lapor", //will be displayed on the y-axis
      data: [],
    },
  ];

  const [series, setSeries] = useState(cloneDeep(tmpSeries));

  const handleChangePeriode = (val: any, name: string, event: any) => {
    const periode = parseInt(val);
    console.log(val);
    console.log(periode);
    setForm({
      ...form,
      [name]: val,
    });
  };

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // console.log(event);
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const hitDashboard = async () => {
    let dataForm: any = new FormData();
    dataForm.append("periode", form.laporan_periode);
    dataForm.append("tahun", form.laporan_periode_tahun);
    let url = "/user/dashboard-admin/data";
    let responsenya = await api.post(url, dataForm);
    let tmpData = cloneDeep(tmpSeries);
    tmpData[1].data = responsenya.data.data.values.total_chart_puskesmas_rs;
    tmpData[2].data =
      responsenya.data.data.values.total_chart_puskesmas_rs_sudah_lapor;
    tmpData[0].data =
      responsenya.data.data.values.total_chart_puskesmas_rs_belum_lapor;
    setSeries(tmpData);
    let tahun = responsenya.data.data.values.laporan_periode_tahun;
    setJudulChart(tahun);
    console.log(tahunChart);
    setForm({
      laporan_periode: responsenya.data.data.values.laporan_periode,
      laporan_periode_nama: responsenya.data.data.values.laporan_periode_nama,
      laporan_periode_tahun: responsenya.data.data.values.laporan_periode_tahun,
      total_laporan_perperiode:
        responsenya.data.data.values.total_laporan_perperiode,
      total_puskesmas_rs_belum_lapor:
        responsenya.data.data.values.total_puskesmas_rs_belum_lapor,
      total_puskesmas_rs_sudah_lapor:
        responsenya.data.data.values.total_puskesmas_rs_sudah_lapor,
      total_transporter: responsenya.data.data.values.total_transporter,
      total_puskesmas_rs: responsenya.data.data.values.total_puskesmas_rs,
    });
  };
  useEffect(() => {
    hitDashboard();

    const handleResize = () => {
      // Periksa lebar layar dan atur lebar chart sesuai dengan kondisi tertentu
      if (window.innerWidth < 700) {
        setChartWidth(300);
        setChartHeight(400);
      } else {
        setChartWidth(800);
      }
    };

    // Tambahkan event listener untuk mengikuti perubahan ukuran layar
    window.addEventListener("resize", handleResize);

    // Panggil handleResize saat komponen pertama kali dimuat
    handleResize();

    // Hapus event listener saat komponen dibongkar
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <MainLayout title="Dashboard">
      <Form form={formInstance}>
        <br />
        <Space wrap>
          <Form.Item name="form_periode" label="Periode">
            <Select
              placeholder="Pilih Bulan Periode"
              onChange={(v) => handleChangePeriode(v, "laporan_periode", event)}
              style={{ width: 200 }}
              allowClear={true}
              onClear={(v) => handleChangePeriode("", "laporan_periode", event)}
              // onChange={handleChange}
              options={[
                { value: 1, label: "Januari" },
                { value: 2, label: "Februari" },
                { value: 3, label: "Maret" },
                { value: 4, label: "April" },
                { value: 5, label: "Mei" },
                { value: 6, label: "Juni" },
                { value: 7, label: "Juli" },
                { value: 8, label: "Agustus" },
                { value: 9, label: "September" },
                { value: 10, label: "Oktober" },
                { value: 11, label: "November" },
                { value: 12, label: "Desember" },
              ]}
            />
          </Form.Item>
          <Form.Item name="form_tahun" label="Tahun">
            <Input
              placeholder="Masukan Tahun"
              onChange={handleChangeInput}
              maxLength={4}
              name="laporan_periode_tahun"
              allowClear={true}
              onClear={handleChangeInput}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={hitDashboard}>
              Filter
            </Button>
          </Form.Item>
        </Space>
      </Form>
      <Space direction="vertical" size={16}>
        <Row>
          <Col>
            <Card title="Total Instansi Kesehatan" style={{ width: 300 }}>
              <h1>{form.total_puskesmas_rs}</h1>
            </Card>
          </Col>
          <Col>
            <Card title="Total Instansi Sudah Lapor" style={{ width: 300 }}>
              <h1>{form.total_puskesmas_rs_sudah_lapor}</h1>
            </Card>
          </Col>
          <Col>
            <Card title="Total Instansi Belum Lapor" style={{ width: 300 }}>
              <h1>{form.total_puskesmas_rs_belum_lapor}</h1>
            </Card>
          </Col>
          <Col>
            <Card title="Total Transporter" style={{ width: 300 }}>
              <h1>{form.total_transporter}</h1>
            </Card>
          </Col>
        </Row>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Row>
            <Col>
              {typeof window !== undefined && (
                <Chart
                  options={options}
                  type="bar"
                  width={chartWidth}
                  height={chartHeight}
                  series={series}
                />
              )}
            </Col>
          </Row>
        </div>
      </Space>
    </MainLayout>
  );
};

export default DashboardPage;
