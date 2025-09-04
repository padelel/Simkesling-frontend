import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  UploadFile,
  message,
  Card,
} from "antd";
import cloneDeep from "clone-deep";
import {
  RightCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import api from "@/utils/HttpRequest";
import { useLaporanBulananStore } from "@/stores/laporanBulananStore";
import router from "next/router";
import { useGlobalStore } from "@/stores/globalStore";
import apifile from "@/utils/HttpRequestFile";
import Notif from "@/utils/Notif";
import jwtDecode from "jwt-decode";

const { Option } = Select;
const { TextArea } = Input;

const FormViewLaporan: React.FC = () => {
  const globalStore = useGlobalStore();
  const laporanBulananStore = useLaporanBulananStore();
  const [formInstance] = Form.useForm();

  const [transporterOptions, setTransporterOptions] = useState<
    { value: string; label: string; id_transporter: number }[]
  >([]);
  const [selectedTransporter, setSelectedTransporter] = useState<number | null>(null);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isCheckboxChecked1, setIsCheckboxChecked1] = useState(false);
  const [isCheckboxCheckedSyarat, setIsCheckboxCheckedSyarat] = useState(false);

  const [activeTabKey2, setActiveTabKey2] = useState<string>("limbahPadat");
  const [fileManifest, setFileManifest] = useState<UploadFile[]>([]);
  const [fileLogbook, setFileLogbook] = useState<UploadFile[]>([]);
  const [limbahPadatList, setLimbahPadatList] = useState<any[]>([]);

  const tmpForm = {
    oldid: "",
    periode: "",
    tahun: "",
    idtransporter: 0,
    namatransporter: "",
    namapemusnah: "",
    metodepemusnah: "",
    statustps: 0,
    ukurantps: "",
    statuspemusnah: 0,
    ukuranpemusnah: "",
    totallimbahpadat: 0,
    totallimbahnoncovid: 0,
    totallimbahcovid: 0,
    debitlimbahcair: "",
    kapasitasinpal: "",
    stastuslimbahcair: 0,
    catatanlimbahcair: "",
  };
  const [form, setForm] = useState(cloneDeep(tmpForm));

  // Fetch transporter data
  const getTransporterData = async () => {
    try {
      const response = await api.post("/user/transporter/data");
      const responseData = response.data.data.values;
      setTransporterOptions(
        responseData.map(
          (item: { nama_transporter: string; id_transporter: number }) => ({
            value: item.id_transporter,
            label: item.nama_transporter,
            id_transporter: item.id_transporter,
          })
        )
      );
    } catch (error) {
      console.error("Error fetching Transporter data:", error);
    }
  };

  // Fetch file from server and convert to blob
  const getFile = async (file: any) => {
    try {
      if (globalStore.setLoading) globalStore.setLoading(true);
      let arrname = file.split("/");
      let filename = arrname[arrname.length - 1];
      const resp = await apifile.get(
        `${file}?${Math.random().toString().replaceAll(".", "")}`,
        { responseType: "arraybuffer" }
      );
      const filenya = resp.data;
      const typefile = resp.headers["content-type"];
      const blob = new Blob([filenya], { type: typefile });
      const blobUrl = URL.createObjectURL(blob);
      return {
        uid: new Date().toISOString(),
        name: filename,
        status: "done",
        url: blobUrl,
        blob: blob,
      };
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    } finally {
      if (globalStore.setLoading) globalStore.setLoading(false);
    }
  };

  // Fetch manifest files
  const getFilesManifest = async () => {
    let arrfile: any[] = [];
    for (const val of laporanBulananStore.file_manifest ?? []) {
      let tmpfile = await getFile(val.file1);
      if (tmpfile) arrfile.push(tmpfile);
    }
    setFileManifest(arrfile);
    formInstance.setFieldsValue({ form_manifest: arrfile });
  };

  // Fetch logbook files
  const getFilesLogbook = async () => {
    let arrfile: any[] = [];
    for (const val of laporanBulananStore.file_logbook ?? []) {
      let tmpfile = await getFile(val.file1);
      if (tmpfile) arrfile.push(tmpfile);
    }
    setFileLogbook(arrfile);
    formInstance.setFieldsValue({ form_logbook: arrfile });
  };

  // Fetch limbah padat list
  const getListHere = async () => {
    let arrList: any[] = [];
    for (const val of laporanBulananStore.b3padat ?? []) {
      arrList.push({
        kategori: val.kategori,
        catatan: val.catatan,
        berat: val.total,
      });
    }
    setLimbahPadatList(arrList);
    formInstance.setFieldsValue({ detailLimbahDynamic: arrList });
  };

  useLayoutEffect(() => {
    let token = localStorage.getItem("token");
    let user: any = jwtDecode(token ?? "");
    if (!user) {
      router.push("/");
      return;
    }
    getTransporterData();
    formInstance.resetFields();
    setForm(cloneDeep(tmpForm));
    setLimbahPadatList([]);
    formInstance.setFieldsValue({
      form_tahun: new Date().getFullYear(),
      form_periode: new Date().getMonth() + 1,
    });
    setForm({
      ...form,
      periode: new Date().getFullYear().toString(),
      tahun: (new Date().getMonth() + 1).toString(),
    });

    if (
      laporanBulananStore.id_laporan_bulanan == null ||
      laporanBulananStore.id_laporan_bulanan == 0
    ) {
      if (user.level == "1") {
        router.push("/dashboard/admin/manajemen/laporan");
      } else {
        router.push("/dashboard/user/limbah");
      }
      return;
    }

    setForm({
      ...form,
      oldid: laporanBulananStore.id_laporan_bulanan?.toString() ?? "",
      periode: laporanBulananStore.periode?.toString() ?? "",
      tahun: laporanBulananStore.tahun?.toString() ?? "",
      idtransporter: parseInt(laporanBulananStore.id_transporter?.toString() ?? "0") ?? 0,
      namatransporter: laporanBulananStore.nama_transporter?.toString() ?? "",
      namapemusnah: laporanBulananStore.nama_pemusnah?.toString() ?? "",
      metodepemusnah: laporanBulananStore.metode_pemusnah?.toString() ?? "",
      catatanlimbahcair: laporanBulananStore.catatan?.toString() ?? "",
      totallimbahpadat: parseInt(laporanBulananStore.berat_limbah_total?.toString() ?? ""),
      totallimbahcovid: parseInt(laporanBulananStore.limbah_b3_covid?.toString() ?? ""),
      totallimbahnoncovid: parseInt(laporanBulananStore.limbah_b3_noncovid?.toString() ?? ""),
      debitlimbahcair: laporanBulananStore.debit_limbah_cair?.toString() ?? "",
      kapasitasinpal: laporanBulananStore.kapasitas_ipal?.toString() ?? "",
      statustps: laporanBulananStore.punya_penyimpanan_tps && [1, "1"].includes(laporanBulananStore.punya_penyimpanan_tps) ? 1 : 0,
      ukurantps: laporanBulananStore.ukuran_penyimpanan_tps?.toString() || "",
      statuspemusnah: laporanBulananStore.punya_pemusnahan_sendiri && [1, "1"].includes(laporanBulananStore.punya_pemusnahan_sendiri) ? 1 : 0,
      ukuranpemusnah: laporanBulananStore.ukuran_pemusnahan_sendiri?.toString() || "",
      stastuslimbahcair: laporanBulananStore.memenuhi_syarat && [1, "1"].includes(laporanBulananStore.memenuhi_syarat) ? 1 : 0,
    });

    setIsCheckboxChecked(
      laporanBulananStore.punya_penyimpanan_tps && [1, "1"].includes(laporanBulananStore.punya_penyimpanan_tps)
    );
    setIsCheckboxChecked1(
      laporanBulananStore.punya_pemusnahan_sendiri && [1, "1"].includes(laporanBulananStore.punya_pemusnahan_sendiri)
    );

    formInstance.setFieldsValue({
      form_periode: laporanBulananStore.periode,
      form_tahun: laporanBulananStore.tahun,
      form_transporter: laporanBulananStore.id_transporter,
      form_namaPemusnah: laporanBulananStore.nama_pemusnah,
      form_metodePemusnahan: laporanBulananStore.metode_pemusnah,
      form_statusTps: laporanBulananStore.punya_penyimpanan_tps && [1, "1"].includes(laporanBulananStore.punya_penyimpanan_tps),
      form_ukuranTps: laporanBulananStore.ukuran_penyimpanan_tps,
      form_statusPemusnah: laporanBulananStore.punya_pemusnahan_sendiri && [1, "1"].includes(laporanBulananStore.punya_pemusnahan_sendiri),
      form_ukuranPemusnah: laporanBulananStore.ukuran_pemusnahan_sendiri,
      form_beratLimbah: laporanBulananStore.berat_limbah_total,
      form_beratLimbahNonCovid: laporanBulananStore.limbah_b3_noncovid,
      form_beratLimbahCovid: laporanBulananStore.limbah_b3_covid,
      form_debitLimbah: laporanBulananStore.debit_limbah_cair,
      form_kapasitasInpal: laporanBulananStore.kapasitas_ipal,
      form_statussyaratipal: laporanBulananStore.memenuhi_syarat && [1, "1"].includes(laporanBulananStore.memenuhi_syarat),
      form_catatan: laporanBulananStore.catatan,
    });

    getFilesManifest();
    getFilesLogbook();
    getListHere();
  }, []);

  return (
    <div>
      <Row>
        <Col>
          <table>
            <tbody>
              <tr><td>Nama Transporter</td><td>:</td><td>{form.namatransporter}</td></tr>
              <tr><td>Nama Pemusnah</td><td>:</td><td>{form.namapemusnah}</td></tr>
              <tr><td>Metode Pemusnah</td><td>:</td><td>{form.metodepemusnah}</td></tr>
              <tr><td>Ukuran TPS (&#13217;)</td><td>:</td><td>{form.ukurantps}</td></tr>
              <tr><td>Ukuran Pemusnah Mandiri (&#13217;)</td><td>:</td><td>{form.ukuranpemusnah}</td></tr>
              <tr><td>Total Limbah Padat (Kg)</td><td>:</td><td>{form.totallimbahpadat}</td></tr>
              <tr><td>Total Limbah Non Covid (Kg)</td><td>:</td><td>{form.totallimbahnoncovid}</td></tr>
              <tr><td>Total Limbah Covid (Kg)</td><td>:</td><td>{form.totallimbahcovid}</td></tr>
            </tbody>
          </table>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col>
          <table cellPadding={5} cellSpacing={0} border={1}>
            <thead>
              <tr>
                <th>Kategori</th>
                <th>Catatan</th>
                <th>Berat</th>
              </tr>
            </thead>
            <tbody>
              {limbahPadatList.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.kategori}</td>
                  <td>{item.catatan}</td>
                  <td>{item.berat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col>
          <table>
            <tbody>
              <tr>
                <td>File Manifest</td>
                <td>:</td>
                <td>
                  <ul>
                    {fileManifest.map((item, idx) => (
                      <li key={idx}>
                        {item.url && (
                          <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                        )}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td>File Logbook</td>
                <td>:</td>
                <td>
                  <ul>
                    {fileLogbook.map((item, idx) => (
                      <li key={idx}>
                        {item.url && (
                          <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                        )}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td colSpan={3}><Divider /></td>
              </tr>
              <tr><td>Debit Limbah Cair (L)</td><td>:</td><td>{form.debitlimbahcair}</td></tr>
              <tr><td>Kapasitas Ipal</td><td>:</td><td>{form.kapasitasinpal}</td></tr>
              <tr><td>Catatan Limbah Cair</td><td>:</td><td>{form.catatanlimbahcair}</td></tr>
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
};

export default FormViewLaporan;
