import MainLayout from "@/components/MainLayout";
import { Button, Space, Modal, Input } from "antd";
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
import { MLaporanBulanan } from "@/models/MLaporanBulanan";
import { useLaporanBulananStore } from "@/stores/laporanBulananStore";
import { useGlobalStore } from "@/stores/globalStore";
import cloneDeep from "clone-deep";
import Search from "antd/es/input/Search";

interface DataType {
  namaTransporter: any;
  tanggalPelaporan: any;
  beratLimbahTotal: any;

  key: React.Key;
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
  const [dataSearch, setDataSearch] = useState<DataType[]>([]);
  const laporanBulananStore = useLaporanBulananStore();
  const globalStore = useGlobalStore();
  const router = useRouter();

  const columns: ColumnsType<DataType> = [
    {
      title: "Tanggal Pelaporan",
      dataIndex: "tanggalPelaporan",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.tanggalPelaporan - b.namaTransporter,
    },
    {
      title: "Nama Transporter",
      dataIndex: "namaTransporter",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.namaTransporter - b.namaTransporter,
    },
    {
      title: "Berat Limbah Total",
      dataIndex: "beratLimbahTotal",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.beratLimbahTotal.localeCompare(b.beratLimbahTotal),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record: MLaporanBulanan) => {
        // console.log(record);

        const toFormPage = (param: MLaporanBulanan) => {
          if (laporanBulananStore.simpenSementara) {
            laporanBulananStore.simpenSementara(param);
            router.push("/dashboard/user/limbah/PageTambahLimbah?action=edit");
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
    if (globalStore.setLoading) globalStore.setLoading(true);
    try {
      const response = await api.post("/user/laporan-bulanan/data");
      const responseData = response.data.data.values;

      const transformedData = responseData.map((item: any) => ({
        ...item,
        tanggalPelaporan: item.created_at,
        namaTransporter: item.nama_transporter,
        beratLimbahTotal: item.berat_limbah_total,
        key: item.id_laporan_bulanan.toString(),
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
      return val.beratLimbahTotal.toString().includes(e.target.value);
    });
    console.log(tmpdata);
    setData(cloneDeep(tmpdata));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MainLayout title="Laporan Limbah">
      <div>
        <Link
          href="/dashboard/user/limbah/PageTambahLimbah?action=create"
          passHref>
          <Button type="primary">Tambah Pelaporan Limbah</Button>
        </Link>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Search
          style={{ width: 300 }}
          placeholder="Cari berdasarkasn Berat"
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
