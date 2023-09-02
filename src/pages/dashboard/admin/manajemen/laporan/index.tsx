import React, { useEffect, useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button, Space, Modal } from "antd";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Excel } from "antd-table-saveas-excel";
import api from "@/utils/HttpRequest";
import ModalView from "@/components/admin/laporan/ModalView";
import { useRouter } from "next/router";
import { CSVLink, CSVDownload } from "react-csv";
import cloneDeep from "clone-deep";
import { MLaporanBulanan } from "@/models/MLaporanBulanan";
import { useLaporanBulananStore } from "@/stores/laporanBulananStore";
import {
  LoginOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { parsingDate } from "@/utils/common";

// interface DataType {
//   idUser: any;
//   namaPemusnah: any;
//   metodePemusnahan: any;
//   ukuranPenyimpananTps: any;
//   ukuranPemusnahanSendiri: any;
//   beratLimbah: any;
//   limbahB3Covid: any;
//   limbahB3NonCovid: any;
//   debitLimbahCair: any;
//   kapasitasIpal: any;
//   memenuhiSyarat: any;
//   catatan: any;
//   periode: any;
//   namaTransporter: any;
//   tanggalPengajuan: any;
//   key: React.Key;
// }

// const data = [
//   {
//     key: "1",
//     nomorLaporan: "128673123",
//     tanggalPengangkutan: "17-08-2023",
//     namaTransporter: "John Brown",
//     beratLimbah: 30,
//     metodePemusnahan: "Pembakaran",
//   },
//   {
//     key: "2",
//     nomorLaporan: "128673129",
//     tanggalPengangkutan: "17-09-2023",
//     namaTransporter: "John Brown",
//     beratLimbah: 35,
//     metodePemusnahan: "Pembakaran",
//   },
//   {
//     key: "3",
//     nomorLaporan: "128673129",
//     tanggalPengangkutan: "17-08-2023",
//     namaTransporter: "Denis Brown",
//     beratLimbah: 40,
//     metodePemusnahan: "Pembakaran",
//   },
//   {
//     key: "4",
//     nomorLaporan: "128673123",
//     tanggalPengangkutan: "17-10-2023",
//     namaTransporter: "John Brown",
//     beratLimbah: 50,
//     metodePemusnahan: "Pembakaran",
//   },
// ];

// const onChange: TableProps<DataType>["onChange"] = (
const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
  console.log("params", pagination, filters, sorter, extra);
};

const Index: React.FC = () => {
  const laporanBulananStore = useLaporanBulananStore();
  const [data, setData] = useState<any[]>([]);
  const [datacsv, setDatacsv] = useState<any[]>([]);
  const router = useRouter();

  const handleGenerateCsv = () => {
    // const excel = new Excel();
    // excel
    //   .addSheet("sheet 1")
    //   .addColumns(kolom)
    //   .addDataSource(data, {
    //     str2Percent: true,
    //   })
    //   .saveAs("Excel.xlsx");

    let dataCsv = data.map((v) => {
      let val = cloneDeep(v);
      let user = cloneDeep(val.user);
      for (let key in user) {
        if (!val.hasOwnProperty(key)) {
          val[key] = user[key];
        }
      }
      delete val["file_logbook"];
      delete val["file_manifest"];
      delete val["user"];
      return val;
    });
    setDatacsv(dataCsv);
    console.log(dataCsv);
  };

  const columns: any = [
    {
      title: "Nama Puskesmas",
      dataIndex: "namaTempat",
      // defaultSortOrder: "descend",
      sorter: (a: any, b: any) =>
        a.namaTempat.toUpperCase().localeCompare(b.namaTempat.toUpperCase()),
    },
    {
      title: "Nama Transporter",
      dataIndex: "namaTransporter",
      // defaultSortOrder: "descend",
      sorter: (a: any, b: any) =>
        a.namaTransporter
          .toUpperCase()
          .localeCompare(b.namaTransporter.toUpperCase()),
    },
    {
      title: "Nama Pemusnah",
      dataIndex: "namaPemusnah",
      // defaultSortOrder: "descend",
      sorter: (a: any, b: any) =>
        a.namaPemusnah
          .toUpperCase()
          .localeCompare(b.namaPemusnah.toUpperCase()),
    },
    {
      title: "Tahun",
      dataIndex: "tahun",
      // defaultSortOrder: "descend",
      sorter: (a: any, b: any) =>
        a.tahun.toUpperCase().localeCompare(b.tahun.toUpperCase()),
    },
    {
      title: "periode",
      dataIndex: "periode",
      // defaultSortOrder: "descend",
      sorter: (a: any, b: any) =>
        a.periode.toUpperCase().localeCompare(b.periode.toUpperCase()),
    },
    {
      title: "Tanggal Pengajuan",
      dataIndex: "tanggalPengajuan",
      // defaultSortOrder: "descend",
      sorter: (a: any, b: any) =>
        a.tanggalPengajuan
          .toUpperCase()
          .localeCompare(b.tanggalPengajuan.toUpperCase()),
    },
    {
      title: "Tanggal Revisi",
      dataIndex: "tanggalRevisi",
      // defaultSortOrder: "descend",
      sorter: (a: any, b: any) =>
        a.tanggalRevisi
          .toUpperCase()
          .localeCompare(b.tanggalRevisi.toUpperCase()),
    },
    // {
    //   title: "Metode Pemusnahan",
    //   dataIndex: "metodePemusnahan",
    //   defaultSortOrder: "descend",
    //   sorter: (a: any, b: any) => a.metodePemusnahan - b.metodePemusnahan,
    // },
    // {
    //   title: "Berat Limbah Padat",
    //   dataIndex: "beratLimbah",
    //   // defaultSortOrder: "descend",
    //   sorter: (a: any, b: any) => b.beratLimbah.localeCompare(a.beratLimbah),
    // },
    // {
    //   title: "Debit Limbah Cair",
    //   dataIndex: "debitLimbahCair",
    //   // defaultSortOrder: "descend",
    //   sorter: (a: any, b: any) =>
    //     b.debitLimbahCair.localeCompare(a.debitLimbahCair),
    // },
    // {
    //   title: "Limbah B3 Non Covid",
    //   dataIndex: "limbahB3NonCovid",
    //   defaultSortOrder: "descend",
    //   sorter: (a: any, b: any) =>
    //     a.limbahB3NonCovid.localeCompare(b.limbahB3NonCovid),
    // },

    {
      title: "Action",
      key: "action",
      // fixed: "right",
      render: (_, record: MLaporanBulanan) => {
        // console.log(record);
        const toViewPage = (param: MLaporanBulanan) => {
          if (laporanBulananStore.simpenSementara) {
            laporanBulananStore.simpenSementara(param);
            router.push("/dashboard/admin/manajemen/laporan/ViewLaporan");
          }
        };
        return (
          <Space size="middle">
            <Button
              onClick={() => toViewPage(record)}
              icon={<EyeOutlined />}
              type="primary">
              View
            </Button>
          </Space>
        );
      },
    },
  ];

  const getData = async () => {
    try {
      const response = await api.post("/user/laporan-bulanan/data");
      const responseData = response.data.data.values;

      const transformedData = responseData.map((item: any) => ({
        ...item,
        idUser: item.id_user,
        namaTempat: item.user.nama_user,
        namaTransporter: item.nama_transporter,
        namaPemusnah: item.nama_pemusnah,
        metodePemusnahan: item.metode_pemusnah,
        ukuranPenyimpananTps: item.ukuran_penyimpanan_tps,
        ukuranPemusnahanSendiri: item.ukuran_pemusnahan_sendiri,
        beratLimbah: item.berat_limbah_total,
        limbahB3Covid: item.limbah_b3_covid,
        limbahB3NonCovid: item.limbah_b3_noncovid,
        debitLimbahCair: item.debit_limbah_cair,
        kapasitasIpal: item.kapasitasIpal,
        memenuhiSyarat: item.memenuhi_syarat,
        catatan: item.catatan,
        periode: item.periode_nama,
        tahun: item.tahun,
        tanggalPengajuan: parsingDate(item.created_at),
        tanggalRevisi: parsingDate(item.updated_at),
        key: new Date().toISOString().toString(),
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
    <MainLayout title="Tabel Laporan">
      <div>
        {/* <Button type="primary" onClick={handleGenerateCsv}>
          Export Excel
        </Button> */}
        {/* <CSVDownload data={datacsv} target="_blank" /> */}
        <CSVLink
          data={data}
          asyncOnClick={true}
          filename={`Laporan Limbah - ${new Date().toISOString()}.csv`}
          onClick={async (event: any, done: () => void) => {
            await handleGenerateCsv();
            done();
          }}>
          Export Excel
        </CSVLink>
      </div>

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
