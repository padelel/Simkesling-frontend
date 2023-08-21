import MainLayout from "@/components/MainLayout";
import { Table } from "antd";
import React from "react";
import { Button, Modal, Space } from "antd";
import Link from "next/link";

import type { ColumnsType, TableProps } from "antd/es/table";
import {
  LoginOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";

interface DataType {
  status: any;
  namaTransporter: any;
  tanggalPengajuan: any;
  tanggalBerakhir: any;
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
    title: "Tanggal Berakhir",
    dataIndex: "tanggalBerakhir",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.tanggalPengajuan.localeCompare(b.tanggalBerakhir),
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined />} style={{ backgroundColor: "yellow" }}>
          Edit
        </Button>
        <Button icon={<EyeOutlined />} type="primary">
          View
        </Button>
        <Button
          onClick={showDeleteConfirm}
          icon={<DeleteOutlined />}
          type="primary"
          danger>
          Delete
        </Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    namaTransporter: "John Brown",
    tanggalPengajuan: "17-08-2023",
    tanggalBerakhir: "17-08-2025",
  },
  {
    key: "2",
    namaTransporter: "Aohn Brown",
    tanggalPengajuan: "19-08-2023",
    tanggalBerakhir: "19-08-2025",
  },
  {
    key: "3",
    namaTransporter: "Pohn Brown",
    tanggalPengajuan: "27-08-2023",
    tanggalBerakhir: "27-08-2025",
  },
  {
    key: "4",
    namaTransporter: "Kohn Brown",
    tanggalPengajuan: "17-09-2023",
    tanggalBerakhir: "17-09-2025",
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

const { confirm } = Modal;

const showDeleteConfirm = () => {
  confirm({
    title: "Are you sure delete this task?",
    icon: <ExclamationCircleFilled />,
    content: "Some descriptions",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

const index = () => {
  return (
    <MainLayout title="Daftar Transporter">
      <div style={{ marginTop: "20px" }}>
        <Table columns={columns} dataSource={data} onChange={onChange} />;
      </div>
    </MainLayout>
  );
};

export default index;
