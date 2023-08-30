import MainLayout from "@/components/MainLayout";
import { Button, Space, Modal, Popconfirm, notification } from "antd";
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
import { MPengajuanTransporter } from "../../../../models/MPengajuanTransporter";
import { usePengajuanTransporterStore } from "@/stores/pengajuanTransporterStore";
import { useRouter } from "next/router";
import { useGlobalStore } from "@/stores/globalStore";
import cloneDeep from "clone-deep";
import { url } from "inspector";
import Search from "antd/es/input/Search";

type NotificationType = "success" | "info" | "warning" | "error";

interface DataType {
  status: any;
  namaTransporter: any;
  tanggalPengajuan: any;
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const Index: React.FC = () => {
  const [apicontext, contextHolder] = notification.useNotification();
  const [dataSearch, setDataSearch] = useState<DataType[]>([]);
  const openNotificationWithIcon = (type: NotificationType) => {
    apicontext[type]({
      message: "Transporter Berhasil Dihapus",
      description: "Transporter Telah Berhasil Dihapus",
      duration: 3,
    });
  };

  let tmpForm = {
    oldid: "",
  };

  const [form, setForm] = useState({ oldid: 0 });
  const [data, setData] = useState<DataType[]>([]);
  const pengajuanTransporterStore = usePengajuanTransporterStore();
  const globalStore = useGlobalStore();

  const router = useRouter();

  const { confirm } = Modal;
  const handleViewClick = (idTransporter: string) => {
    console.log("View clicked for id_transporter:", idTransporter);
  };

  const handleDelete = async (idTransporter: string) => {
    try {
      let dataForm: any = new FormData();
      console.log(idTransporter);
      dataForm.append("oldid", idTransporter);
      let url = "/user/pengajuan-transporter/delete";
      let responsenya = await api.post(url, dataForm);
      openNotificationWithIcon("error");
    } catch (error) {
      console.error("Error hapus Data:", error);
    } finally {
      getData();
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Nama Transporter",
      dataIndex: "namaTransporter",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.namaTransporter.length - b.namaTransporter.length,
    },
    {
      title: "Tanggal Pengajuan",
      dataIndex: "tanggalPengajuan",
      // defaultSortOrder: "descend",
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
          value: "o",
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

    {
      title: "Action",
      key: "action",
      render: (_, record: MPengajuanTransporter) => {
        // console.log(record);

        const toFormPage = (param: MPengajuanTransporter) => {
          if (pengajuanTransporterStore.simpenSementara) {
            pengajuanTransporterStore.simpenSementara(param);
            router.push(
              "/dashboard/user/pengajuantransporter/PagePengajuanTransporter?action=edit"
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
            <Button
              icon={<EyeOutlined />}
              type="primary"
              onClick={() => handleViewClick(record.id_transporter_tmp)}>
              View
            </Button>
            <Popconfirm
              title="Hapus Transporter"
              description="Apakah anda yakin untuk menghapus Transporter Anda?"
              onConfirm={() => {
                // setForm({ oldid: record.id_transporter_tmp }); // Set oldid when delete button is clicked
                handleDelete(record.id_transporter_tmp);
              }}>
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
    if (globalStore.setLoading) globalStore.setLoading(true);
    try {
      const response = await api.post("/user/pengajuan-transporter/data");
      const responseData = response.data.data.values;

      const transformedData = responseData.map((item: any) => ({
        ...item,
        namaTransporter: item.nama_transporter,
        tanggalPengajuan: item.created_at,
        status: item.statusactive_transporter_tmp,
        key: item.id_transporter_tmp.toString(),
      }));

      setData(transformedData);
      setDataSearch(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      if (globalStore.setLoading) globalStore.setLoading(false);
    }
  };

  const doSearch = async (e: any) => {
    // console.log(e.target.value);
    let tmpdata = dataSearch.filter((val) => {
      // console.log(val);
      return val.namaTransporter.toString().includes(e.target.value);
    });
    console.log(tmpdata);
    setData(cloneDeep(tmpdata));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MainLayout title="Pengajuan Transporter">
      {contextHolder}
      <div>
        <Link
          href="/dashboard/user/pengajuantransporter/PagePengajuanTransporter"
          passHref>
          <Button type="primary">Tambah Transporter</Button>
        </Link>
        <Button type="primary" onClick={() => getData()}>
          Refress
        </Button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Search
          style={{ width: 300 }}
          placeholder="Cari Nama Transporter"
          onChange={(e) => doSearch(e)}
        />
        <Table
          style={{ marginTop: 20 }}
          columns={columns}
          dataSource={data}
          onChange={onChange}
        />
        ;
      </div>
    </MainLayout>
  );
};

export default Index;
