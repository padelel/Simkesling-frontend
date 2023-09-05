import MainLayout from "@/components/MainLayout";
import { Button, Space, Modal, Popconfirm, notification } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import api from "@/utils/HttpRequest";
import { useGlobalStore } from "@/stores/globalStore";
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
  noregTempat: any;
  tipeTempat: string;
  alamat: any;
  kecamatan: any;
  kelurahan: any;
}

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

type NotificationType = "success" | "info" | "warning" | "error";

const Index: React.FC = () => {
  const globalStore = useGlobalStore();
  const [apicontext, contextHolder] = notification.useNotification();
  const [data, setData] = useState<DataType[]>([]);
  const tambahAkunStore = useTambahAkunStore();
  const router = useRouter();
  const openNotificationWithIcon = (type: NotificationType) => {
    apicontext[type]({
      message: "Akun Berhasil Dihapus",
      description: "Akun Telah Berhasil Dihapus",
      duration: 3,
    });
  };

  const handleDelete = async (idAkun: string) => {
    try {
      let dataForm: any = new FormData();
      console.log(idAkun);
      dataForm.append("oldid", idAkun);
      let url = "/user/puskesmas-rumahsakit/delete";
      let responsenya = await api.post(url, dataForm);
      openNotificationWithIcon("success");
    } catch (error) {
      console.error("Error hapus Data:", error);
    } finally {
      getData();
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Nama Puskesmas / Rumah Sakit",
      dataIndex: "namaUser",
      defaultSortOrder: "ascend",
      sorter: (a: any, b: any) =>
        a.namaUser.toUpperCase().localeCompare(b.namaUser.toUpperCase()),
    },
    // {
    //   title: "Nomor Registrasi / Nomor Izin RS",
    //   dataIndex: "noregTempat",
    //   defaultSortOrder: "descend",
    //   sorter: (a, b) => a.noregTempat - b.noregTempat,
    // },
    {
      title: "Tipe Instansi",
      dataIndex: "tipeTempat",
      // defaultSortOrder: "descend",
      sorter: (a: any, b: any) =>
        a.tipeTempat.toUpperCase().localeCompare(b.tipeTempat.toUpperCase()),
      onFilter: (value: string, record) => record.tipeTempat.startsWith(value),
      filters: [
        { text: "Rumah Sakit", value: "Rumah Sakit" },
        { text: "Puskesmas", value: "Puskesmas" },
      ],
    },
    // {
    //   title: "Alamat",
    //   dataIndex: "alamat",
    //   defaultSortOrder: "descend",
    //   sorter: (a, b) => a.alamat - b.alamat,
    // },
    {
      title: "Kecamatan",
      dataIndex: "kecamatan",
      // defaultSortOrder: "descend",
      // sorter: (a, b) => a.kecamatan.length - b.kecamatan.length,
    },
    {
      title: "Kelurahan",
      dataIndex: "kelurahan",
      // defaultSortOrder: "descend",
      // sorter: (a, b) => a.kelurahan.length - b.kelurahan.length,
    },

    {
      title: "Action",
      key: "action",
      // fixed: "right",
      render: (_, record: MPengajuanTransporter) => {
        // console.log(record);

        const toFormPage = (param: MPengajuanTransporter) => {
          if (tambahAkunStore.simpenBentaran) {
            tambahAkunStore.simpenBentaran(param);
            router.push(
              "/dashboard/admin/manajemen/profil/TambahAkun?action=edit"
            );
          }
        };
        const toViewPage = (param: MPengajuanTransporter) => {
          if (tambahAkunStore.simpenBentaran) {
            tambahAkunStore.simpenBentaran(param);
            router.push("/dashboard/admin/manajemen/profil/ViewAkun");
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
            <Button
              onClick={() => toViewPage(record)}
              icon={<EyeOutlined />}
              type="primary"
            >
              View
            </Button>
            <Popconfirm
              title="Hapus Transporter"
              description="Apakah anda yakin untuk menghapus ?"
              onConfirm={() => {
                // setForm({ oldid: record.id_transporter_tmp }) // Set oldid when delete button is clicked
                handleDelete(record.id_user?.toString() ?? "");
              }}
            >
              <Button icon={<DeleteOutlined />} type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const getData = async () => {
    try {
      if (globalStore.setLoading) globalStore.setLoading(true);
      const response = await api.post("/user/puskesmas-rumahsakit/data");
      const responseData = response.data.data.values;

      const transformedData = responseData.map((item: any) => ({
        ...item,
        namaUser: item.nama_user,
        noregTempat: item.noreg_tempat,
        tipeTempat: item.tipe_tempat,
        alamat: item.alamat_tempat,
        kecamatan: item.kecamatan,
        kelurahan: item.kelurahan,
        key: item.id_user.toString(),
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
    <MainLayout title="Manajemen Akun Puskesmas / Rumah Sakit">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link href="/dashboard/admin/manajemen/profil/TambahAkun" passHref>
          <Button type="primary">Tambah Akun Puskesmas / Rumah Sakit</Button>
        </Link>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Table
          // style={{ minWidth: 800 }}
          columns={columns}
          scroll={{ x: 800 }}
          dataSource={data}
          onChange={onChange}
        />
      </div>
    </MainLayout>
  );
};

export default Index;
