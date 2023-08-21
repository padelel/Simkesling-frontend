import React from "react";
import MainLayout from "@/components/dashboard/MainLayout";
import { Button, Space, Modal } from "antd";
import Link from "next/link";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Excel } from "antd-table-saveas-excel";
import {
  LoginOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import ShowFile from "@/components/dashboard/laporan/ShowFile";
import ModalView from "@/components/dashboard/laporan/ModalView";

interface DataType {
  metodePemusnahan: any;
  beratLimbah: any;
  tanggalPengangkutan: any;
  nomorLaporan: any;
  status: any;
  namaTransporter: any;
  tanggalPengajuan: any;
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Nomor Laporan",
    dataIndex: "nomorLaporan",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.nomorLaporan - b.nomorLaporan,
  },
  {
    title: "Tanggal Pengangkutan",
    dataIndex: "tanggalPengangkutan",
    defaultSortOrder: "descend",
    sorter: (a, b) =>
      a.tanggalPengangkutan.localeCompare(b.tanggalPengangkutan),
  },
  {
    title: "Nama Transporter",
    dataIndex: "namaTransporter",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.namaTransporter.localeCompare(b.namaTransporter),
  },
  {
    title: "Berat Limbah",
    dataIndex: "beratLimbah",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.beratLimbah - b.beratLimbah,
  },
  {
    title: "Metode Pemusnahan",
    dataIndex: "metodePemusnahan",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.metodePemusnahan.localeCompare(b.metodePemusnahan),
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
          <ModalView />
      </Space>
    ),
  },
];

const kolom = [
  {
    title: "Nomor Laporan",
    dataIndex: "nomorLaporan",
    defaultSortOrder: "descend",
  },
  {
    title: "Tanggal Pengangkutan",
    dataIndex: "tanggalPengangkutan",
    defaultSortOrder: "descend",
  },
  {
    title: "Nama Transporter",
    dataIndex: "namaTransporter",
    defaultSortOrder: "descend",
  },
  {
    title: "Berat Limbah",
    dataIndex: "beratLimbah",
    defaultSortOrder: "descend",
  },
  {
    title: "Metode Pemusnahan",
    dataIndex: "metodePemusnahan",
    defaultSortOrder: "descend",
  },
]

const data = [
  {
    key: "1",
    nomorLaporan: "128673123",
    tanggalPengangkutan: "17-08-2023",
    namaTransporter: "John Brown",
    beratLimbah: 30,
    metodePemusnahan: "Pembakaran",
  },
  {
    key: "2",
    nomorLaporan: "128673129",
    tanggalPengangkutan: "17-09-2023",
    namaTransporter: "John Brown",
    beratLimbah: 35,
    metodePemusnahan: "Pembakaran",
  },
  {
    key: "3",
    nomorLaporan: "128673129",
    tanggalPengangkutan: "17-08-2023",
    namaTransporter: "Denis Brown",
    beratLimbah: 40,
    metodePemusnahan: "Pembakaran",
  },
  {
    key: "4",
    nomorLaporan: "128673123",
    tanggalPengangkutan: "17-10-2023",
    namaTransporter: "John Brown",
    beratLimbah: 50,
    metodePemusnahan: "Pembakaran",
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const handlePrint = () => {
  const excel = new Excel();
  excel
    .addSheet("sheet 1")
    .addColumns(kolom)
    .addDataSource(data, {
      str2Percent: true
    })
    .saveAs("Excel.xlsx");
};

const index = () => {
  return (
    <MainLayout title="Tabel Laporan">
      <div>
        <Button type="primary" onClick={handlePrint}>Export Excel</Button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
    </MainLayout>
  );
};

export default index;
