import React, { useEffect } from "react";
import { useState, createContext, useContext } from "react";
import MainLayout from "@/components/MainLayout";
import { useUserLoginStore } from "@/stores/userLoginStore";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import dynamic from "next/dynamic";
import cloneDeep from "clone-deep";
import api from "@/utils/HttpRequest";

const DashboardPageCopy: React.FC = () => {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const userLoginStore = useUserLoginStore();
  const messageLimbah = "Anda belum mengisi data limbah periode";
  const [pesan, setPesan] = useState("");
  const [lapor, setLapor] = useState(false);

  const [formInstance] = Form.useForm();

  const tmpSeries = [
    {
      name: "Berat Total Limbah", //will be displayed on the y-axis
      data: [],
    },
  ];

  const [series, setSeries] = useState(cloneDeep(tmpSeries));
  const options = {
    chart: {
      id: "simple-bar",
    },
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
  };

  let tmpForm = {
    periode: "",
    tahun: "",
  };

  const [form, setForm] = useState(cloneDeep(tmpForm));

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
    dataForm.append("periode", form.periode);
    dataForm.append("tahun", form.tahun);
    let url = "/user/dashboard-user/data";
    let responsenya = await api.post(url, dataForm);
    let tmpData = cloneDeep(tmpSeries);
    tmpData[0].data = responsenya.data.data.values.total_limbah_chart_year;
    setSeries(tmpData);
    let tmpPesan = "";
    if (responsenya.data.data.values.sudah_lapor) {
      tmpPesan = `Anda Sudah Mengisi Laporan Pada Periode ${responsenya.data.data.values.laporan_periode_nama} ${responsenya.data.data.values.laporan_periode_tahun}`;
    } else {
      tmpPesan = `Anda Belum Mengisi Laporan Pada Periode ${responsenya.data.data.values.laporan_periode_nama} ${responsenya.data.data.values.laporan_periode_tahun}`;
    }
    setPesan(tmpPesan);
    setLapor(responsenya.data.data.values.sudah_lapor);
    console.log(responsenya);
  };

  // Gaya khusus untuk card peringatan (warning)
  const warningCardStyle = {
    backgroundColor: "#ffc107", // Warna peringatan (warning)
    borderColor: "#ffc107",
    color: "#333", // Warna teks
  };

  const warningCardHeadStyle = {
    backgroundColor: "#ffc107", // Warna latar kepala card
    color: "#333", // Warna teks kepala card
  };

  const warningCardBodyStyle = {
    padding: "12px", // Atur padding sesuai keinginan Anda
  };

  useEffect(() => {
    hitDashboard();
  }, []);

  return (
    <MainLayout title={"Dashboard"}>
      <h1>Dashboard {userLoginStore.user?.nama_user}</h1>

      <h2>Total Laporan Sepanjang Tahun</h2>

      <Form form={formInstance}>
        <br />
        <Space wrap>
          <Form.Item
            name="form_periode"
            rules={[{ required: true }]}
            label="Periode">
            <Select
              placeholder="Pilih Bulan Periode"
              onChange={(v) => handleChangePeriode(v, "periode", event)}
              style={{ width: 200 }}
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
          <Form.Item
            name="form_tahun"
            label="Tahun"
            rules={[{ required: true }]}>
            <Input
              placeholder="Masukan Tahun"
              onChange={handleChangeInput}
              maxLength={4}
              name="tahun"
            />
          </Form.Item>
          <Button onClick={hitDashboard}>Hit</Button>
        </Space>
      </Form>

      {!lapor && (
        <Alert
          message="Pemberitahuan"
          description={pesan}
          type="warning"
          showIcon
        />
      )}
      {lapor && (
        <Alert
          message="Pemberitahuan"
          description={pesan}
          type="success"
          showIcon
        />
      )}

      <Row>
        <Col>
          {typeof window !== undefined && (
            <Chart options={options} type="bar" width={700} series={series} />
          )}
        </Col>
      </Row>
    </MainLayout>
  );
};

export default DashboardPageCopy;
