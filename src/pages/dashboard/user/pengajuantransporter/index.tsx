import MainLayout from "@/components/MainLayout";
import { Button, Space, Modal } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import api from "../../../utils/HttpRequest";
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

const index: React.FC = () => {
  const [datanya, setDatanya] = useState("");

  const getData = async () => {
    let responsenya = await api.post("/user/pengajuan-transporter/data");
    console.log(responsenya);
    console.log(setDatanya);
    setDatanya(JSON.stringify(responsenya.data, null, 4));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MainLayout title="Pengajuan Transporter">
      <div>
        <Link
          href="/dashboard/user/pengajuantransporter/PagePengajuanTransporter"
          passHref>
          <Button type="primary">Tambah Transporter</Button>
        </Link>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Table columns={columns} dataSource={data} onChange={onChange} />;
      </div>
      <pre>{datanya}</pre>
    </MainLayout>
  );
};

export default index;
