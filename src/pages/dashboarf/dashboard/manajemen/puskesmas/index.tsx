import MainLayout from "@/components/dashboard/MainLayout";
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

interface DataType {
  status: any;
  namaPuskesmas: any;
  username: any;
  key: React.Key;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Nama Puskesmas / Rumah Sakit",
    dataIndex: "namaPuskesmas",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.namaPuskesmas - b.namaPuskesmas,
  },
  {
    title: "Username Puskesmas / Rumah Sakit",
    dataIndex: "username",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.username - b.username,
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined />} style={{ backgroundColor: "yellow" }}>
          Edit Password
        </Button>
        <Button icon={<EyeOutlined />} type="primary">
          View
        </Button>
        <Button icon={<DeleteOutlined />} type="primary" danger>
          Delete
        </Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    namaPuskesmas: "Jati Waringin",
    username: "jatwar",
  },
  {
    key: "2",
    namaPuskesmas: "Gatot Subroto",
    username: "gatsu",
  },
  {
    key: "3",
    namaPuskesmas: "Majelis Repam",
    username: "mapam",
  },
  {
    key: "4",
    namaPuskesmas: "Waduuh",
    username: "wdh",
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
    <MainLayout title="Tabel Puskesmas / Rumah Sakit">
      <div>
        <Link
          href="/admin/manajemenpuskesmas/TambahPuskesmas"
          passHref>
          <Button type="primary">Tambah Akun</Button>
        </Link>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Table columns={columns} dataSource={data} onChange={onChange} />;
      </div>
    </MainLayout>
  );
};

export default index;
