import React, { useEffect, useState } from "react";
import MainLayout from "@/components/admin/MainLayout";
import { Button, Space, Modal } from "antd";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Excel } from "antd-table-saveas-excel";
import api from "../../../../utils/HttpRequest";
import ModalView from "@/components/admin/laporan/ModalView";
import { useRouter } from "next/router";

interface DataType {
  idUser: any;
  namaPemusnah: any;
  metodePemusnahan: any;
  ukuranPenyimpananTps: any;
  ukuranPemusnahanSendiri: any;
  beratLimbah: any;
  limbahB3Covid: any;
  limbahB3NonCovid: any;
  debitLimbahCair: any;
  kapasitasIpal: any;
  memenuhiSyarat: any;
  catatan: any;
  periode: any;
  namaTransporter: any;
  tanggalPengajuan: any;
  key: React.Key;
}

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

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};


const index: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const router = useRouter();

  const handlePrint = () => {
    const excel = new Excel();
    excel
      .addSheet("sheet 1")
      .addColumns(kolom)
      .addDataSource(data, {
        str2Percent: true
      })
      .saveAs("Excel.xlsx");
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Nama Transporter",
      dataIndex: "namaTransporter",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.namaTransporter - b.namaTransporter,
    },
    {
      title: "Nama Pemusnah",
      dataIndex: "namaPemusnah",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.namaPemusnah - b.namaPemusnah,
    },
    {
      title: "Metode Pemusnahan",
      dataIndex: "metodePemusnahan",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.metodePemusnahan - b.metodePemusnahan,
    },
    {
      title: "Berat Limbah",
      dataIndex: "beratLimbah",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.beratLimbah - b.beratLimbah,
    },
    {
      title: "Limbah B3 Covid",
      dataIndex: "limbahB3Covid",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.limbahB3Covid.localeCompare(b.limbahB3Covid),
    },
    {
      title: "Limbah B3 Non Covid",
      dataIndex: "limbahB3NonCovid",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.limbahB3NonCovid.localeCompare(b.limbahB3NonCovid),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <ModalView />
        </Space>
      ),
    },
  ];

  const kolom = [
    {
      title: "Id User",
      dataIndex: "idUser",
      defaultSortOrder: "descend",
    },
    {
      title: "Nama Transporter",
      dataIndex: "namaTransporter",
      defaultSortOrder: "descend",
    },
    {
      title: "Nama Pemusnah",
      dataIndex: "namaPemusnah",
      defaultSortOrder: "descend",
    },
    {
      title: "Metode Pemusnahan",
      dataIndex: "metodePemusnahan",
      defaultSortOrder: "descend",
    },
    {
      title: "Ukuran Penyimpanan TPS",
      dataIndex: "ukuranPenyimpananTps",
      defaultSortOrder: "descend",
    },
    {
      title: "Ukuran Pemusnahan Sendiri",
      dataIndex: "ukuranPemusnahanSendiri",
      defaultSortOrder: "descend",
    },
    {
      title: "Berat Limbah",
      dataIndex: "beratLimbah",
      defaultSortOrder: "descend",
    },
    {
      title: "Limbah B3 Covid",
      dataIndex: "limbahB3Covid",
      defaultSortOrder: "descend",
    },
    {
      title: "Limbah B3 Non Covid",
      dataIndex: "limbahB3NonCovid",
      defaultSortOrder: "descend",
    },
    {
      title: "Debit Limbah Cair",
      dataIndex: "debitLimbahCair",
      defaultSortOrder: "descend",
    },
    {
      title: "Kapasitas IPAL",
      dataIndex: "kapasitasIpal",
      defaultSortOrder: "descend",
    },
    {
      title: "Memenuhi Syarat",
      dataIndex: "memenuhiSyarat",
      defaultSortOrder: "descend",
    },
    {
      title: "Catatan",
      dataIndex: "catatan",
      defaultSortOrder: "descend",
    },
    {
      title: "Periode",
      dataIndex: "periode",
      defaultSortOrder: "descend",
    },
    {
      title: "Tahun",
      dataIndex: "tahun",
      defaultSortOrder: "descend",
    },
    {
      title: "Tanggal Pengajuan",
      dataIndex: "tanggalPengajuan",
      defaultSortOrder: "descend",
    },
  ]

  const getData = async () => {
    try {
      const response = await api.post("/user/laporan-bulanan/data");
      const responseData = response.data.data.values;

      const transformedData = responseData.map((item: any) => ({
        ...item,
        idUser: item.id_user,
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
        tanggalPengajuan: item.updated_at,
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
    <MainLayout title="Tabel Laporan">
      <div>
        <Button type="primary" onClick={handlePrint}>Export Excel</Button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
    </MainLayout>
  );
};

export default index;
