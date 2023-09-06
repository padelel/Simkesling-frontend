import MainLayout from "@/components/MainLayout";
import { Button, Space, Modal, Tag, Row, Col, Input } from "antd";
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
  ReloadOutlined,
} from "@ant-design/icons";
import { MPengajuanTransporter } from "../../../../../models/MPengajuanTransporter";
import { usePengajuanTransporterStore } from "@/stores/pengajuanTransporterStore";
import { useRouter } from "next/router";
import { parsingDate } from "@/utils/common";

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
  const globalStore = useGlobalStore();
  const [data, setData] = useState<DataType[]>([]);
  const pengajuanTransporterStore = usePengajuanTransporterStore();
  const router = useRouter();

  const columns: ColumnsType<DataType> = [
    {
      title: "Nama Transporter",
      dataIndex: "namaTransporter",
      defaultSortOrder: "descend",
      sorter: (a: any, b: any) =>
        b.namaTransporter.length - a.namaTransporter.length,
    },
    // {
    //   title: "Nama Puskesmas/RS",
    //   dataIndex: "namaTempat",
    //   // defaultSortOrder: "descend",
    //   sorter: (a: any, b: any) => a.namaTempat.length - b.namaTempat.length,
    // },
    {
      title: "Masa Berlaku MOU",
      dataIndex: "masaBerlakuBerakhir",
      // defaultSortOrder: "descend",
      // sorter: (a: any, b: any) => a.namaTempat.length - b.namaTempat.length,
    },
    {
      title: "Status MOU",
      dataIndex: "statusBerlaku",
      // defaultSortOrder: "descend",
      // sorter: (a: any, b: any) => a.namaTempat.length - b.namaTempat.length,
      render: (status: any) => {
        let sts = "-- ups --";
        let color = "-";
        if (status == true) {
          color = "volcano";
          sts = "Kadaluarsa";
        }
        if (status == false) {
          color = "green";
          sts = "Berlaku";
        }

        return (
          <>
            <Tag color={color}>{sts.toUpperCase()}</Tag>
          </>
        );
      },
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      // defaultSortOrder: "descend",
      sorter: (a: any, b: any) => a.created_at.localeCompare(b.created_at),
      render: (_: any, record: MPengajuanTransporter) => {
        return parsingDate(record.created_at);
      },
    },
    {
      title: "Updated at",
      dataIndex: "updated_at",
      // defaultSortOrder: "descend",
      sorter: (a: any, b: any) => a.updated_at.localeCompare(b.updated_at),
      render: (_: any, record: MPengajuanTransporter) => {
        return parsingDate(record.updated_at);
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: MPengajuanTransporter) => {
        // console.log(record);

        const toFormPage = (param: MPengajuanTransporter) => {
          if (pengajuanTransporterStore.simpenSementara) {
            pengajuanTransporterStore.simpenSementara(param);
            router.push(
              "/dashboard/admin/manajemen/transporter/PengajuanTransporter?action=edit"
            );
          }
        };
        const toViewPage = (param: MPengajuanTransporter) => {
          if (pengajuanTransporterStore.simpenSementara) {
            pengajuanTransporterStore.simpenSementara(param);
            router.push(
              "/dashboard/admin/manajemen/transporter/ViewPengajuanTransporter"
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
            <Button
              onClick={() => toViewPage(record)}
              icon={<EyeOutlined />}
              type="primary"
            >
              View
            </Button>
            {/* <Button
              onClick={showDeleteConfirm}
              icon={<DeleteOutlined />}
              type="primary"
              danger
            >
              Delete
            </Button> */}
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
        namaTempat: `${item.user.nama_user} (${item.user.tipe_tempat})`,
        status: item.status_transporter,
        tanggalBerakhir: item.tgl_akhir,
        statusBerlaku: item.masa_berlaku_sudah_berakhir,
        masaBerlakuBerakhir: item.masa_berlaku_terakhir,
        key: item.id_transporter_tmp.toString(),
      }));

      setData(transformedData);
      setData2(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      if (globalStore.setLoading) globalStore.setLoading(false);
    }
  };

  // -- search -- \\
  const [search, setSearch] = useState("");
  const [data2, setData2] = useState<DataType[]>([]);
  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(event);
    setSearch(event.target.value);
  };
  const doSearch = () => {
    const tmpData = data2.filter((val) => {
      if (
        val.namaTransporter
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        val.status.toString().toLowerCase().includes(search.toLowerCase())
      ) {
        return true;
      }
    });
    setData(tmpData);
  };

  useEffect(() => {
    doSearch();
  }, [search]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <MainLayout title="Manajemen Transporter">
      <Row justify="end">
        <Col span={6}>
          <Input
            onChange={handleChangeInput}
            value={search}
            name="search"
            placeholder="Search"
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

      {/* <div style={{ display: "flex", justifyContent: "center" }}>
        <Link
          href="/dashboard/admin/manajemen/transporter/PengajuanTransporter"
          passHref
        >
          <Button type="primary">Tambah Transporter</Button>
        </Link>
      </div> */}

      <div style={{ marginTop: "20px" }}>
        <Table
          scroll={{ x: 800 }}
          columns={columns}
          dataSource={data}
          onChange={onChange}
        />
      </div>
    </MainLayout>
  );
};

export default Index;
