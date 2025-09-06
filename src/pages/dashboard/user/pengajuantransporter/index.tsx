import MainLayout from "@/components/MainLayout";
import {
  Button,
  Space,
  Modal,
  Popconfirm,
  notification,
  Tag,
  Row,
  Col,
  Input,
  Table,
} from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import api from "@/utils/HttpRequest";
import {
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  ReloadOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { MPengajuanTransporter } from "@/models/MPengajuanTransporter";
import { usePengajuanTransporterStore } from "@/stores/pengajuanTransporterStore";
import { useRouter } from "next/router";
import { useGlobalStore } from "@/stores/globalStore";
import { parsingDate } from "@/utils/common";

type NotificationType = "success" | "info" | "warning" | "error";

interface PengajuanTransporterData {
  id_transporter_tmp: number;
  nama_transporter: string;
  created_at: string;
  status_transporter_tmp: string;
  catatan: string;
  // Properti yang ditransformasi
  namaTransporter: string;
  tanggalPengajuan: string;
  status: string;
  key: string;
}

const Index: React.FC = () => {
  const [apicontext, contextHolder] = notification.useNotification();
  const [data, setData] = useState<PengajuanTransporterData[]>([]);
  const [filteredData, setFilteredData] = useState<PengajuanTransporterData[]>([]);
  const [search, setSearch] = useState("");
  
  const pengajuanTransporterStore = usePengajuanTransporterStore();
  const globalStore = useGlobalStore();
  const router = useRouter();

  const openNotificationWithIcon = (type: NotificationType) => {
    apicontext[type]({
      message: "Transporter Berhasil Dihapus",
      description: "Transporter Telah Berhasil Dihapus",
      duration: 3,
    });
  };

  const { confirm } = Modal;

  const handleDelete = async (idTransporter: string) => {
    try {
      const dataForm = new FormData();
      dataForm.append("oldid", idTransporter);
      await api.post("/user/pengajuan-transporter/delete", dataForm);
      openNotificationWithIcon("success");
    } catch (error) {
      console.error("Error hapus Data:", error);
    } finally {
      getData();
    }
  };

  const columns: ColumnsType<PengajuanTransporterData> = [
    {
      title: "Nama Transporter",
      dataIndex: "namaTransporter",
      sorter: (a, b) =>
        a.namaTransporter
          .toUpperCase()
          .localeCompare(b.namaTransporter.toUpperCase()),
    },
    {
      title: "Tanggal Pengajuan",
      dataIndex: "tanggalPengajuan",
      sorter: (a, b) =>
        b.tanggalPengajuan.localeCompare(a.tanggalPengajuan),
    },
    {
      title: "Status Pengajuan",
      dataIndex: "status",
      render: (status: string) => {
        const statusConfig: Record<string, { color: string; text: string }> = {
          "0": { color: "volcano", text: "DITOLAK" },
          "1": { color: "geekblue", text: "MENUNGGU" },
          "2": { color: "green", text: "DITERIMA" },
        };
        
        const config = statusConfig[status] || { color: "-", text: "-- UPS --" };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Catatan",
      dataIndex: "catatan",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record: PengajuanTransporterData) => {
        const toFormPage = () => {
          if (pengajuanTransporterStore.simpenSementara) {
            pengajuanTransporterStore.simpenSementara(record as MPengajuanTransporter);
            router.push(
              "/dashboard/user/pengajuantransporter/PagePengajuanTransporter?action=edit"
            );
          }
        };
        
        const toViewPage = () => {
          if (pengajuanTransporterStore.simpenSementara) {
            pengajuanTransporterStore.simpenSementara(record as MPengajuanTransporter);
            router.push(
              "/dashboard/user/pengajuantransporter/view-pengajuan-transporter"
            );
          }
        };
        
        return (
          <Space size="middle">
            <Button
              onClick={toFormPage}
              icon={<EditOutlined />}
              style={{ backgroundColor: "yellow" }}
            >
              Edit
            </Button>
            <Button
              onClick={toViewPage}
              icon={<EyeOutlined />}
              type="primary"
            >
              View
            </Button>
            <Popconfirm
              title="Hapus Transporter"
              description="Apakah anda yakin untuk menghapus Transporter Anda?"
              onConfirm={() => handleDelete(record.id_transporter_tmp?.toString() ?? "")}
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
    if (globalStore.setLoading) globalStore.setLoading(true);
    try {
      const response = await api.post("/user/pengajuan-transporter/data");
      const responseData = response.data.data.values;

      const transformedData = responseData.map((item: any) => ({
        ...item,
        namaTransporter: item.nama_transporter,
        tanggalPengajuan: parsingDate(item.created_at),
        status: item.status_transporter_tmp,
        catatan: item.catatan,
        key: item.id_transporter_tmp.toString(),
      }));

      setData(transformedData);
      setFilteredData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      if (globalStore.setLoading) globalStore.setLoading(false);
    }
  };

  // Fungsi pencarian yang dioptimalkan
  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchValue = event.target.value;
    setSearch(searchValue);
    
    // Filter data berdasarkan input pencarian
    if (searchValue.trim() === "") {
      setFilteredData(data); // Jika pencarian kosong, tampilkan semua data
    } else {
      const lowercaseSearch = searchValue.toLowerCase();
      const filtered = data.filter(
        (item) =>
          item.namaTransporter.toLowerCase().includes(lowercaseSearch) ||
          item.status.toLowerCase().includes(lowercaseSearch)
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MainLayout title="Pengajuan Transporter">
      {contextHolder}
      <Row justify="end" style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Input
            onChange={handleChangeInput}
            value={search}
            name="search"
            placeholder="Cari nama atau status"
            allowClear
          />
        </Col>
        <Col>
          <Button
            icon={<ReloadOutlined />}
            style={{ marginLeft: 15, backgroundColor: "orange" }}
            onClick={getData}
          >
            Reload
          </Button>
        </Col>
      </Row>
      
      <div style={{ margin: "20px 0", display: "flex", justifyContent: "center" }}>
        <Link
          href="/dashboard/user/pengajuantransporter/PagePengajuanTransporter"
          passHref
        >
          <Button
            type="primary"
            size="large"
            icon={<PlusCircleOutlined />}
            style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
          >
            Tambah Transporter
          </Button>
        </Link>
      </div>

      <div style={{ overflowX: "auto" }}>
        <Table
          scroll={{ x: 800 }}
          columns={columns}
          dataSource={filteredData}
          rowKey="key"
          pagination={{ pageSize: 10 }}
        />
      </div>
    </MainLayout>
  );
};

export default Index;
