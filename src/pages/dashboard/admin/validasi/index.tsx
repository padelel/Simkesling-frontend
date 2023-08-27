import MainLayout from "@/components/admin/MainLayout";
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
      title: "Status Pengajuan",
      dataIndex: "status",
      filters: [
        {
          text: "Menunggu",
          value: "1",
        },
        {
          text: "Ditolak",
          value: "0",
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      render: (status: string) => {
        if (status === "1") {
          return "Menunggu";
        } else if (status === "0") {
          return "Ditolak";
        } else if (status === "2") {
          return "Aktif";
        }
        return "Unknown"; // Handle other cases if needed
      },
      sorter: (a, b) => a.status.localeCompare(b.status),
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record: MPengajuanTransporter) => {
    //     // console.log(record);

    //     const toFormPage = (param: MPengajuanTransporter) => {
    //       if (pengajuanTransporterStore.simpenSementara) {
    //         pengajuanTransporterStore.simpenSementara(param);
    //         router.push(
    //           "/dashboard/admin/manajemen/transporter/PengajuanTransporter"
    //         );
    //       }
    //     };
    //     return (
    //       <Space size="middle">
    //         <ModalValidasiTransporter />
    //       </Space>
    //     );
    //   },
    // },

    {
      title: "Action",
      key: "action",
      render: (_, record: MPengajuanTransporter) => {
        // console.log(record);

        const toFormPage = (param: MPengajuanTransporter) => {
          if (pengajuanTransporterStore.simpenSementara) {
            pengajuanTransporterStore.simpenSementara(param);
            router.push(
              "/dashboard/admin/manajemen/transporter/PengajuanTransporter?action=validasi"
            );
          }
        };
        return (
          <Space size="middle">
            <Button
              onClick={() => toFormPage(record)}
              icon={<EditOutlined />}
              style={{ backgroundColor: "yellow" }}>
              Validasi
            </Button>
          </Space>
        );
      },
    },
  ];

  const getData = async () => {
    try {
      const response = await api.post("/user/pengajuan-transporter/data");
      const responseData = response.data.data.values;
      console.log(responseData);

      const transformedData = responseData.map((item: any) => ({
        ...item,
        namaTransporter: item.catatan,
        tanggalPengajuan: item.created_at,
        status: item.status_transporter_tmp,
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

      <div style={{ marginTop: "20px" }}>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
    </MainLayout>
  );
};

export default Index;
