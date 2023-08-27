import MainLayout from "@/components/MainLayout";
import { Button, Space, Modal } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import api from "@/utils/HttpRequest";
import {
  LoginOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { MPengajuanTransporter } from "../../../../../models/MPengajuanTransporter";
import { useTambahAkunStore } from "@/stores/pengajuanAkunStore";
import { useRouter } from "next/router";
import { MUser } from "@/models/MTambahAkun";

interface DataType {
  namaUser: any;
  namaTempat: any;
  tipeTempat: any;
  alamat: any;
  kecamatan: any;
  kelurahan: any;
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
  const tambahAkunStore = useTambahAkunStore();
  const router = useRouter();

  const columns: ColumnsType<DataType> = [
    {
      title: "Nama Pengguna",
      dataIndex: "namaUser",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.namaUser - b.namaUser,
    },
    {
      title: "Nama Puskesmas / Rumah Sakit",
      dataIndex: "namaTempat",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.namaTempat - b.namaTempat,
    },
    {
      title: "Tipe Instansi",
      dataIndex: "tipeTempat",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.tipeTempat - b.tipeTempat,
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.alamat - b.alamat,
    },
    {
      title: "Kecamatan",
      dataIndex: "kecamatan",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.kecamatan - b.kecamatan,
    },
    {
      title: "Kelurahan",
      dataIndex: "kelurahan",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.kelurahan - b.kelurahan,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record: MPengajuanTransporter) => {
        // console.log(record);

        const toFormPage = (param: MUser) => {
          if (tambahAkunStore.simpenBentaran) {
            tambahAkunStore.simpenBentaran(param);
            router.push("/dashboard/admin/manajemen/profil/TambahAkun");
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
      const response = await api.post("/user/puskesmas-rumahsakit/data");
      const responseData = response.data.data.values;

      const transformedData = responseData.map((item: any) => ({
        ...item,
        namaUser: item.nama_user,
        namaTempat: item.nama_tempat,
        tipeTempat: item.tipe_tempat,
        alamat: item.alamat_tempat,
        kecamatan: item.kecamatan,
        kelurahan: item.kelurahan,
        key: item.id_user.toString(),
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
    <MainLayout title="Manajemen Akun Puskesmas / Rumah Sakit">
      <div>
        <Link href="/dashboard/admin/manajemen/profil/TambahAkun" passHref>
          <Button type="primary">Tambah Akun Puskesmas / Rumah Sakit</Button>
        </Link>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
    </MainLayout>
  );
};

export default Index;
