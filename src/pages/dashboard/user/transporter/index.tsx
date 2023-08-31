import MainLayout from "@/components/MainLayout";
import { Button, Space, Modal } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import api from "../../../../utils/HttpRequest";
import {
  LoginOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { MTransporter } from "../../../../models/MTransporter";
import { useTransporterStore } from "@/stores/transporterStore";
import { useRouter } from "next/router";
import { useGlobalStore } from "@/stores/globalStore";
import { parsingDate } from "@/utils/common";

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
  pagination: any,
  filters: any,
  sorter: any,
  extra: any
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const { confirm } = Modal;

const showDeleteConfirm = () => {
  confirm({
    title: "Yakin Delete?",
    icon: <ExclamationCircleFilled />,
    content: "",
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
  const globalStore = useGlobalStore();
  const [data, setData] = useState<DataType[]>([]);
  const transporterStore = useTransporterStore();
  const router = useRouter();

  const columns: ColumnsType<DataType> = [
    {
      title: "Nama Transporter",
      dataIndex: "namaTransporter",
      defaultSortOrder: "descend",
      sorter: (a: any, b: any) => a.namaTransporter - b.namaTransporter,
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      defaultSortOrder: "descend",
      sorter: (a: any, b: any) => a.created_at.localeCompare(b.created_at),
      render: (_: any, record: MTransporter) => {
        return parsingDate(record.created_at);
      },
    },
    {
      title: "Updated at",
      dataIndex: "updated_at",
      defaultSortOrder: "descend",
      sorter: (a: any, b: any) => a.updated_at.localeCompare(b.updated_at),
      render: (_: any, record: MTransporter) => {
        return parsingDate(record.updated_at);
      },
    },
    // {
    //   title: "Tanggal Pengajuan",
    //   dataIndex: "tanggalPengajuan",
    //   defaultSortOrder: "descend",
    //   sorter: (a: any, b: any) =>
    //     a.tanggalPengajuan.localeCompare(b.tanggalPengajuan),
    // },
    // {
    //   title: "Tanggal Berakhir",
    //   dataIndex: "tanggalBerakhir",
    //   defaultSortOrder: "descend",
    //   sorter: (a: any, b: any) =>
    //     a.tanggalBerakhir.localeCompare(b.tanggalBerakhir),
    // },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: MTransporter) => {
        // console.log(record);

        const toFormPage = (param: MTransporter) => {
          if (transporterStore.simpenSementara) {
            transporterStore.simpenSementara(param);
            router.push(
              "/dashboard/user/transporter/form-transporter?action=edit&origin=transporter"
            );
          }
        };
        return (
          <Space size="middle">
            <Button
              onClick={() => toFormPage(record)}
              icon={<EditOutlined />}
              style={{ backgroundColor: "yellow" }}
            >
              Edit
            </Button>
            <Button icon={<EyeOutlined />} type="primary">
              View
            </Button>
            <Button
              onClick={showDeleteConfirm}
              icon={<DeleteOutlined />}
              type="primary"
              danger
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const getData = async () => {
    if (globalStore.setLoading) globalStore.setLoading(true);
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
    } finally {
      if (globalStore.setLoading) globalStore.setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MainLayout title="List Transporter">
      {/* <div>
        <Link
          href="/dashboard/user/pengajuantransporter/PagePengajuanTransporter"
          passHref>
          <Button type="primary">Tambah Transporter</Button>
        </Link>
      </div> */}

      <div
        style={{ marginTop: "20px", marginBottom: "20px", overflowX: "auto" }}
      >
        <Table
          style={{ minWidth: 800 }} // Set a minimum width to trigger horizontal scrolling
          columns={columns}
          dataSource={data}
          onChange={onChange}
        />
      </div>
    </MainLayout>
  );
};

export default Index;
