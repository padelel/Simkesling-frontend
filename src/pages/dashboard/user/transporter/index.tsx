import MainLayout from "@/components/MainLayout";
import { Button, Space, Modal, Tag, Input, Col, Row } from "antd";
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
  ReloadOutlined,
} from "@ant-design/icons";
import { MTransporter } from "../../../../models/MTransporter";
import { useTransporterStore } from "@/stores/transporterStore";
import { useRouter } from "next/router";
import { useGlobalStore } from "@/stores/globalStore";
import { parsingDate } from "@/utils/common";

interface DataType {
  statusBerlaku: any;
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
  const [dataSearch, setDataSearch] = useState<DataType[]>([]);
  const [data, setData] = useState<DataType[]>([]);
  const transporterStore = useTransporterStore();
  const router = useRouter();

  const columns: ColumnsType<DataType> = [
    {
      title: "Nama Transporter",
      dataIndex: "namaTransporter",
      defaultSortOrder: "ascend",
      sorter: (a: any, b: any) =>
        a.namaTransporter
          .toUpperCase()
          .localeCompare(b.namaTransporter.toUpperCase()),
    },
    {
      title: "Masa Berlaku MOU Akhir",
      dataIndex: "masaBerlakuBerakhir",
    },
    {
      title: "Status MOU",
      dataIndex: "statusBerlaku",
      render: (status: any) => {
        let sts = "-- ups --";
        let color = "-";
        if (status == "harih") {
          color = "volcano";
          sts = "Kadaluarsa";
        }
        if (status == "1bulan") {
          color = "orange";
          sts = "Segera Expire";
        }
        if (status == "belum") {
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
      render: (_: any, record: any) => {
        return parsingDate(record.created_at);
      },
    },
    {
      title: "Updated at",
      dataIndex: "updated_at",
      // defaultSortOrder: "descend",
      sorter: (a: any, b: any) => a.updated_at.localeCompare(b.updated_at),
      render: (_: any, record: any) => {
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
      render: (_: any, record: any) => {
        // console.log(record);

        const toFormPage = (param: MTransporter) => {
          if (transporterStore.simpenSementara) {
            transporterStore.simpenSementara(param);
            router.push(
              "/dashboard/user/transporter/form-transporter?action=edit&origin=transporter"
            );
          }
        };
        const toViewPage = (param: MTransporter) => {
          if (transporterStore.simpenSementara) {
            transporterStore.simpenSementara(param);
            router.push("/dashboard/user/transporter/view-transporter");
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
        masaBerlakuBerakhir: item.masa_berlaku_terakhir,
        tanggalPengajuan: item.created_at,
        tanggalBerakhir: item.tgl_akhir,
        statusBerlaku: item.masa_berlaku_sudah_berakhir,
        status: item.masa_berlaku_sudah_berakhir ? "KADALUARSA" : "BERLAKU",

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
    <MainLayout title="List Transporter">
      {/* <div>
        <Link
          href="/dashboard/user/pengajuantransporter/PagePengajuanTransporter"
          passHref>
          <Button type="primary">Tambah Transporter</Button>
        </Link>
      </div> */}
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

      <div
        style={{ marginTop: "20px", marginBottom: "20px", overflowX: "auto" }}
      >
        <Table
          scroll={{ x: 800 }} // Set a minimum width to trigger horizontal scrolling
          columns={columns}
          dataSource={data}
          onChange={onChange}
        />
      </div>
    </MainLayout>
  );
};

export default Index;
