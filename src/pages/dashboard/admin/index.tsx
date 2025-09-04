import React, { useEffect, useState } from "react";
import MainLayout from "@/components/MainLayout";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tag,
} from "antd";
import dynamic from "next/dynamic";
import cloneDeep from "clone-deep";
import api from "@/utils/HttpRequest";
import { useGlobalStore } from "@/stores/globalStore";

const DashboardPage: React.FC = () => {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const globalStore = useGlobalStore();

  const [data, setData] = useState<any[]>([]);
  const [formInstance] = Form.useForm();
  const [chartWidth, setChartWidth] = useState(800);
  const [chartHeight, setChartHeight] = useState(400);
  const [judulChart, setJudulChart] = useState("");

  const tmpForm = {
    laporan_periode: "",
    laporan_periode_nama: "",
    laporan_periode_tahun: "",
    total_laporan_perperiode: 0,
    total_puskesmas_rs_belum_lapor: 0,
    total_puskesmas_rs_sudah_lapor: 0,
    total_transporter: 0,
    total_puskesmas_rs: 0,
  };
  const [form, setForm] = useState(cloneDeep(tmpForm));

  const tmpSeries = [
    { name: "Total Puskesmas Belum Lapor", data: [] },
    { name: "Total Puskesmas", data: [] },
    { name: "Total Puskesmas Sudah Lapor", data: [] },
  ];
  const [series, setSeries] = useState(cloneDeep(tmpSeries));

  const chartOptions = {
    chart: { id: "simple-bar" },
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
    yaxis: { title: { text: "Jumlah Laporan" } },
    title: {
      text: `Grafik Pelaporan Limbah Puskesmas & RS ${judulChart}`,
      align: "center" as "center",
    },
  };

  const columns = [
    {
      title: "Nama Tempat",
      dataIndex: "namaUser",
      sorter: (a: any, b: any) =>
        a.namaUser.toUpperCase().localeCompare(b.namaUser.toUpperCase()),
    },
    {
      title: "Jenis Instansi",
      dataIndex: "namaTempat",
      sorter: (a: any, b: any) =>
        a.namaTempat.toUpperCase().localeCompare(b.namaTempat.toUpperCase()),
    },
    {
      title: "Kecamatan",
      dataIndex: "kec",
      sorter: (a: any, b: any) =>
        a.kec.toUpperCase().localeCompare(b.kec.toUpperCase()),
    },
    {
      title: "Kelurahan",
      dataIndex: "kel",
      sorter: (a: any, b: any) =>
        a.kel.toUpperCase().localeCompare(b.kel.toUpperCase()),
    },
    {
      title: "Status Laporan",
      dataIndex: "sudahLapor",
      render: (status: boolean) => {
        const color = status ? "green" : "volcano";
        const text = status ? "Sudah Lapor" : "Belum Lapor";
        return <Tag color={color}>{text.toUpperCase()}</Tag>;
      },
    },
  ];

  const handleChangePeriode = (val: any, name: string) => {
    setForm({ ...form, [name]: val });
  };

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const hitDashboard = async () => {
    if (globalStore.setLoading) globalStore.setLoading(true);
    try {
      const dataForm = new FormData();
      dataForm.append("periode", form.laporan_periode);
      dataForm.append("tahun", form.laporan_periode_tahun);

      const response = await api.post("/user/dashboard-admin/data", dataForm);
      const values = response.data.data.values;

      const updatedSeries = cloneDeep(tmpSeries);
      updatedSeries[1].data = values.total_chart_puskesmas_rs;
      updatedSeries[2].data = values.total_chart_puskesmas_rs_sudah_lapor;
      updatedSeries[0].data = values.total_chart_puskesmas_rs_belum_lapor;
      setSeries(updatedSeries);

      setJudulChart(values.laporan_periode_tahun);

      setForm({
        laporan_periode: values.laporan_periode,
        laporan_periode_nama: values.laporan_periode_nama,
        laporan_periode_tahun: values.laporan_periode_tahun,
        total_laporan_perperiode: values.total_laporan_perperiode,
        total_puskesmas_rs_belum_lapor: values.total_puskesmas_rs_belum_lapor,
        total_puskesmas_rs_sudah_lapor: values.total_puskesmas_rs_sudah_lapor,
        total_transporter: values.total_transporter,
        total_puskesmas_rs: values.total_puskesmas_rs,
      });

      const notifData = values.notif_user_laporan_bulanan.map((item: any) => ({
        ...item,
        namaUser: item.nama_user,
        namaTempat: item.tipe_tempat,
        kec: item.kecamatan,
        kel: item.kelurahan,
        sudahLapor: item.sudah_lapor,
      }));

      setData(notifData);
    } catch (e) {
      console.error(e);
    } finally {
      if (globalStore.setLoading) globalStore.setLoading(false);
    }
  };

  useEffect(() => {
    hitDashboard();

    const handleResize = () => {
      if (window.innerWidth < 700) {
        setChartWidth(300);
        setChartHeight(400);
      } else {
        setChartWidth(800);
        setChartHeight(400);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <MainLayout title="Dashboard">
      <Spin spinning={globalStore.isloading}>
        <Form form={formInstance}>
          <br />
          <Space wrap>
            <Form.Item name="form_periode" label="Periode">
              <Select
                placeholder="Pilih Bulan Periode"
                onChange={(v) => handleChangePeriode(v, "laporan_periode")}
                style={{ width: 200 }}
                allowClear
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
                allowClear
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
          <Row justify="space-between">
            <Col>
              <Card
                title="Total Instansi Kesehatan"
                style={{ width: 300, backgroundColor: "burlywood" }}
              >
                <h1>{form.total_puskesmas_rs}</h1>
              </Card>
            </Col>
            <Col>
              <Card
                title="Total Instansi Sudah Lapor"
                style={{ width: 300, backgroundColor: "coral" }}
              >
                <h1>{form.total_puskesmas_rs_sudah_lapor}</h1>
              </Card>
            </Col>
            <Col>
              <Card
                title="Total Instansi Belum Lapor"
                style={{ width: 300, backgroundColor: "salmon" }}
              >
                <h1>{form.total_puskesmas_rs_belum_lapor}</h1>
              </Card>
            </Col>
            <Col>
              <Card
                title="Total Transporter"
                style={{ width: 300, backgroundColor: "hotpink" }}
              >
                <h1>{form.total_transporter}</h1>
              </Card>
            </Col>
          </Row>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Row>
              <Col>
                {typeof window !== undefined && (
                  <Chart
                    options={chartOptions}
                    type="bar"
                    width={chartWidth}
                    height={chartHeight}
                    series={series}
                  />
                )}
              </Col>
            </Row>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <h4 style={{ textAlign: "center" }}>
                      Notifikasi Laporan Limbah
                    </h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Table
                      scroll={{ x: 800 }}
                      columns={columns}
                      dataSource={data}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Space>
      </Spin>
    </MainLayout>
  );
};

export default DashboardPage;
