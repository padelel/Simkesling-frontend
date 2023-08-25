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
import { MPengajuanTransporter } from "../../../../models/MPengajuanTransporter";
import { usePengajuanTransporterStore } from "@/stores/pengajuanTransporterStore";
import { useRouter } from "next/router";

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

// const data = [
//   {
//     namaTransporter: {{nama_transporter}},
//     tanggalPengajuan: {{created_at}},
//     status: {{statusactive_transporter_tmp}},
//   },
//   {
//     namaTransporter: {{nama_transporter}},
//     tanggalPengajuan: {{created_at}},
//     status: {{statusactive_transporter_tmp}},
//   },

// ];

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

const Index: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const pengajuanTransporterStore = usePengajuanTransporterStore();
  const router = useRouter();

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
      sorter: (a, b) => a.tanggalBerakhir.localeCompare(b.tanggalBerakhir),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record: MPengajuanTransporter) => {
        // console.log(record);

        const toFormPage = (param: MPengajuanTransporter) => {
          if (pengajuanTransporterStore.simpenSementara) {
            pengajuanTransporterStore.simpenSementara(param);
            router.push(
              "/dashboard/user/pengajuantransporter/PagePengajuanTransporter"
            );
          }
        };
        return (
          <Space size="middle">
            <Button
              onClick={() => toFormPage(record)}
              icon={<EditOutlined />}
              style={{ backgroundColor: "yellow" }}>
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
        );
      },
    },
  ];

  const getData = async () => {
    try {
      const response = await api.post("/user/transporter/data");
      const responseData = response.data.data.values;

      const transformedData = responseData.map((item: any) => ({
        ...item,
        namaTransporter: item.nama_transporter,
        tanggalPengajuan: item.created_at,
        tanggalBerakhir: item.tgl_akhir,

        key: item.id_transporter_tmp.toString(),
      }));

      setData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
    </MainLayout>
  );
};

export default Index;
