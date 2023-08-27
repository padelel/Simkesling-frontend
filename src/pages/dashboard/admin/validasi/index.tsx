import MainLayout from "@/components/admin/MainLayout";
import { Button, Space } from "antd";
import Link from "next/link";
import React from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import {
  LoginOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ModalValidasiTransporter from "@/components/admin/validasi/ModalValidasiTransporter";

interface DataType {
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
    title: "Nama Transporter",
    dataIndex: "namaTransporter",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.namaTransporter - b.namaTransporter,
  },
  {
    title: "Tanggal Pengajuan",
    dataIndex: "tanggalPengajuan",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.tanggalPengajuan.localeCompare(b.tanggalPengajuan),
  },
  {
    title: "Status Pengajuan",
    dataIndex: "status",
    filters: [
      {
        text: "Menunggu",
        value: "Menunggu",
      },
      {
        text: "Ditolak",
        value: "Ditolak",
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value: string, record) => record.status.indexOf(value) === 0,
    sorter: (a, b) => a.status - b.status,
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <ModalValidasiTransporter/>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    namaTransporter: "John Brown",
    tanggalPengajuan: "17-08-2023",
    status: "Menunggu",
  },
  {
    key: "2",
    namaTransporter: "Aohn Brown",
    tanggalPengajuan: "19-08-2023",
    status: "Menunggu",
  },
  {
    key: "3",
    namaTransporter: "Pohn Brown",
    tanggalPengajuan: "27-08-2023",
    status: "Ditolak",
  },
  {
    key: "4",
    namaTransporter: "Kohn Brown",
    tanggalPengajuan: "17-09-2023",
    status: "Ditolak",
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

const index = () => {
  return (
    <MainLayout title="Pengajuan Transporter">

      <div style={{ marginTop: "20px" }}>
        <Table columns={columns} dataSource={data} onChange={onChange} />;
      </div>
    </MainLayout>
  );
};

export default index;
