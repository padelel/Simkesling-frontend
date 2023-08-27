import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";

import {
  LoginOutlined,
  UploadOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

import { DatePicker, Space } from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";

import { Card } from "antd";
import { RcFile } from "antd/es/upload";
import api from "@/utils/HttpRequest";

const { RangePicker } = DatePicker;

const onChange = (
  value: DatePickerProps["value"] | RangePickerProps["value"],
  dateString: [string, string] | string
) => {
  console.log("Selected Time: ", value);
  console.log("Formatted Selected Time: ", dateString);
};

const onOk = (value: DatePickerProps["value"] | RangePickerProps["value"]) => {
  console.log("onOk: ", value);
};

const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 25 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const props: UploadProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  multiple: true,
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const tabListNoTitle = [
  {
    key: "limbahPadat",
    label: "Limbah Padat",
  },
  {
    key: "limbahCair",
    label: "Limbah Cair",
  },
];

const FormPengajuanLimbah: React.FC = () => {
  const [transporterOptions, setTransporterOptions] = useState<
    { value: string; label: string; id_transporter: number }[]
  >([]);
  const [selectedTransporter, setSelectedTransporter] = useState<number | null>(
    null
  );

  const getTransporterData = async () => {
    try {
      const response = await api.post("/user/transporter/data");
      const responseData = response.data.data.values;

      setTransporterOptions(
        responseData.map(
          (item: { nama_transporter: string; id_transporter: number }) => ({
            value: item.id_transporter.toString(),
            label: item.nama_transporter,
            id_transporter: item.id_transporter,
          })
        )
      );
    } catch (error) {
      console.error("Error fetching Transporter data:", error);
    }
  };

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isCheckboxChecked1, setIsCheckboxChecked1] = useState(false);

  const [activeTabKey2, setActiveTabKey2] = useState<string>("limbahPadat");

  const [fileManifest, setFileManifest] = useState<UploadFile[]>([]);
  const [fileLogbook, setFileLogbook] = useState<UploadFile[]>([]);
  const [limbah_padat_kategori, setlimbah_padat_kategori] = useState<any[]>([]);
  const [limbah_padat_catatan, setlimbah_padat_catatan] = useState<any[]>([]);
  const [limbah_padat_berat, setlimbah_padat_berat] = useState<any[]>([]);

  const [limbahPadatList, setLimbahPadatList] = useState<any[]>([]);

  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    periode: "",
    tahun: "",
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
  });

  const beforeUploadFileDynamic = (file: RcFile) => {
    return false;
  };

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(event);
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  // const handleChangeNumber = (
  //   event: Number>
  // ) => {
  //   console.log(event);
  //   setForm({
  //     ...form,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const handleChangeSelect = (val: any, name: string, event: any) => {
    const id_transporter = parseInt(val);
    setSelectedTransporter(id_transporter);
    setForm({
      ...form,
      [name]: val,
    });
  };

  const handleChangePeriode = (val: any, name: string, event: any) => {
    const id_periode = parseInt(val);
    setSelectedTransporter(id_periode);
    setForm({
      ...form,
      [name]: val,
    });
  };

  const handleSubmit = () => {
    console.log(form);
    console.log(fileLogbook);
    console.log(fileManifest);
  };

  const handleCheckboxChange = (e: any) => {
    const newStatus = e.target.checked ? 1 : 0; // Jika checkbox dicentang, set nilai 1. Jika tidak, set nilai 0.
    setForm({
      ...form,
      statustps: newStatus,
    });
    setIsCheckboxChecked(e.target.checked);
  };

  const handleCheckboxChange1 = (e: any) => {
    const newStatus1 = e.target.checked ? 1 : 0; // Jika checkbox dicentang, set nilai 1. Jika tidak, set nilai 0.
    setForm({
      ...form,
      statuspemusnah: newStatus1,
    });
    setIsCheckboxChecked1(e.target.checked);
  };

  const handleCheckboxChange2 = (e: any) => {
    const newStatus2 = e.target.checked ? 1 : 0; // Jika checkbox dicentang, set nilai 1. Jika tidak, set nilai 0.
    setForm({
      ...form,
      stastuslimbahcair: newStatus2,
    });
    setIsCheckboxChecked1(e.target.checked);
  };

  const handleAddRowDynamic = (
    add: Function,
    key: number = -1,
    name: number = -1
  ) => {
    limbahPadatList.push({
      kategori: "",
      catatan: "",
      berat: "",
    });
    add();
  };
  const handleRemoveRowDynamic = (
    remove: Function,
    key: number = -1,
    name: number = -1
  ) => {
    remove(name);

    let tmpLimbahPadatList = [...limbahPadatList];
    tmpLimbahPadatList.splice(name, 1);
    setLimbahPadatList(tmpLimbahPadatList);
  };
  const handleChangeLimbahPadatInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: number = -1,
    name: number = -1,
    isfrom: string
  ) => {
    console.log("---");
    console.log(event);
    console.log(key);
    console.log(name);
    let tmpLimbahPadatList = [...limbahPadatList];
    tmpLimbahPadatList[name][isfrom] = event.target.value;
    setLimbahPadatList(tmpLimbahPadatList);
    console.log("---[END]");
  };

  const handleNextButton = async () => {
    console.log(limbahPadatList);
    // Update the activeTabKey2 state
    setActiveTabKey2("limbahCair");
    console.log(form);
    console.log(fileLogbook);
    console.log(fileManifest);
  };

  const handleSubmitButton = async () => {
    console.log(form);
    let dataForm: any = new FormData();
    dataForm.append("id_transporter", form.namatransporter);
    dataForm.append("nama_pemusnah", form.namapemusnah);
    dataForm.append("metode_pemusnah", form.metodepemusnah);
    dataForm.append("berat_limbah_total", form.totallimbahpadat);
    dataForm.append("punya_penyimpanan_tps", form.statustps);
    dataForm.append("ukuran_penyimpanan_tps", 1);
    dataForm.append("punya_pemusnahan_sendiri", form.statuspemusnah);
    dataForm.append("ukuran_pemusnahan_sendiri", form.ukuranpemusnah);
    dataForm.append("limbah_b3_covid", form.totallimbahcovid);
    dataForm.append("limbah_b3_noncovid", form.totallimbahnoncovid);
    dataForm.append("debit_limbah_cair", form.debitlimbahcair);
    dataForm.append("kapasitas_ipal", form.kapasitasinpal);
    dataForm.append("memenuhi_syarat", form.stastuslimbahcair);
    dataForm.append("catatan", form.catatanlimbahcair);
    dataForm.append("periode", form.periode);
    dataForm.append("tahun", form.tahun);

    fileLogbook.forEach((file, index) => {
      dataForm.append("file_logbook[]", file.originFileObj);
      console.log(file);
      // return;
    });

    fileManifest.forEach((file, index) => {
      dataForm.append("file_manifest[]", file.originFileObj);
      console.log(file);
      // return;
    });

    limbahPadatList.forEach((val, index) => {
      val.kategori;
      val.catatan;
      val.berat;
      dataForm.append("limbah_padat_kategori[]", val.kategori);
      dataForm.append("limbah_padat_catatan[]", val.catatan);
      dataForm.append("limbah_padat_berat[]", val.berat);
      console.log(val);
      // return;
    });

    let responsenya = await api.post("/user/laporan-bulanan/create", dataForm);
  };

  const handlePreviousButton = () => {
    // Update the activeTabKey2 state
    setActiveTabKey2("limbahPadat");
  };

  useEffect(() => {
    getTransporterData();
    console.log(transporterOptions); // Add this line to log transporterOptions
  }, []);

  const contentListNoTitle: Record<string, React.ReactNode> = {
    limbahPadat: (
      <Form
        onFinish={handleNextButton}
        {...layout}
        name="control-hooks"
        style={{ maxWidth: 600 }}>
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          Pencatatan Limbah Padat
        </h2>
        <Form.Item
          name="form_transporter"
          label="Pilih Transporter"
          initialValue={form.namatransporter}
          rules={[{ required: true }]}>
          <Select
            value={form.namatransporter}
            onChange={(v) => handleChangeSelect(v, "namatransporter", event)}
            placeholder="Select a option and change input text above"
            allowClear
            options={transporterOptions}></Select>
        </Form.Item>
        <Form.Item
          name="form_namaPemusnah"
          label="Nama Pemusnah"
          rules={[{ required: true }]}>
          <Input
            onChange={handleChangeInput}
            value={form.namapemusnah}
            name="namapemusnah"
          />
        </Form.Item>
        <Form.Item
          name="form_metodePemusnahan"
          label="Metode Pemusnahan"
          rules={[{ required: true }]}>
          <Input
            onChange={handleChangeInput}
            value={form.metodepemusnah}
            name="metodepemusnah"
          />
        </Form.Item>
        <Divider />
        <Form.Item name="form_ukuranTPS" label="Memiliki TPS?">
          {/* rules={pemusnahValidationRules} */}
          <Checkbox
            style={{ marginLeft: 10 }}
            value={form.statustps}
            onChange={handleCheckboxChange}>
            Iya
          </Checkbox>
          <Input
            style={{ width: 100 }}
            onChange={handleChangeInput}
            disabled={!isCheckboxChecked}
            value={form.ukurantps}
            name="ukurantps"
          />{" "}
          Ukuran
        </Form.Item>
        <Form.Item
          name="form_ukuranPemusnah"
          label="Memiliki Pemusnah Mandiri?">
          {/* rules={pemusnahValidationRules1} */}
          <Checkbox
            style={{ marginLeft: 10 }}
            value={form.statuspemusnah}
            onChange={handleCheckboxChange1}>
            Iya
          </Checkbox>
          <Input
            style={{ width: 100 }}
            onChange={handleChangeInput}
            disabled={!isCheckboxChecked1}
            value={form.ukuranpemusnah}
            name="ukuranpemusnah"
          />{" "}
          Ukuran
        </Form.Item>
        <Divider />
        <Form.Item
          name="form_beratLimbah"
          label="Total Limbah Padat(Kg)"
          rules={[]}>
          <InputNumber
            onChange={(v) => handleChangeSelect(v, "totallimbahpadat", event)}
            value={form.totallimbahpadat}
            min={0}
            defaultValue={0}
          />
        </Form.Item>
        <Form.Item
          name="beratLimbahNonCovid"
          label="Total Limbah NonCovid(Kg)"
          rules={[]}>
          <InputNumber
            onChange={(v) =>
              handleChangeSelect(v, "totallimbahnoncovid", event)
            }
            value={form.totallimbahnoncovid}
            min={0}
            defaultValue={0}
          />
        </Form.Item>
        <Form.Item
          name="totalBeratLimbah"
          label="Total Limbah Covid(Kg)"
          rules={[]}>
          <InputNumber
            onChange={(v) => handleChangeSelect(v, "totallimbahcovid", event)}
            value={form.totallimbahcovid}
            min={0}
            defaultValue={0}
          />
        </Form.Item>
        <Divider />

        <Form.List name="detailLimbahDynamic">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, "form_kategoriLimbahPadat"]}
                    key={"form_kategoriLimbahPadat" + key}
                    rules={[
                      { required: true, message: "Masukan Kategori Limbah" },
                    ]}
                    initialValue={limbahPadatList[name].kategori}>
                    <Input
                      onChange={(v) =>
                        handleChangeLimbahPadatInput(v, key, name, "kategori")
                      }
                      value={limbahPadatList[name].kategori}
                      name={"kategoridetaillimbah" + key}
                      key={"kategoridetaillimbahKey" + key}
                      style={{ width: 150 }}
                      placeholder="Kategori"
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "form_catatanLimbahPadat"]}
                    key={"form_catatanLimbahPadat" + key}
                    rules={[{}]}
                    initialValue={limbahPadatList[name].catatan}>
                    <Input
                      onChange={(v) =>
                        handleChangeLimbahPadatInput(v, key, name, "catatan")
                      }
                      value={limbahPadatList[name].catatan}
                      name={"catatandetaillimbah" + key}
                      key={"catatandetaillimbahKey" + key}
                      style={{ width: 150 }}
                      placeholder="Catatan"
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "form_beratLimbahPadat"]}
                    key={"form_beratLimbahPadat" + key}
                    rules={[
                      { required: true, message: "Masukan Berat Limbah" },
                    ]}
                    initialValue={limbahPadatList[name].berat}>
                    <Input
                      onChange={(v) =>
                        handleChangeLimbahPadatInput(v, key, name, "berat")
                      }
                      style={{ width: 150 }}
                      value={limbahPadatList[name].berat}
                      name="beratdetaillimbah"
                      key={"beratdetaillimbahKey" + key}
                      placeholder="Berat"
                    />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={(v) => handleRemoveRowDynamic(remove, key, name)}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => handleAddRowDynamic(add)}
                  block
                  icon={<PlusOutlined />}>
                  Tambahkan List Detail Limbah Padat
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Divider />
        <h3>Upload Catatan</h3>
        <Form.Item label="Upload Manifest">
          <Upload
            multiple
            beforeUpload={(file) => beforeUploadFileDynamic(file)}
            fileList={fileManifest}
            onChange={(file) => setFileManifest(file.fileList)}>
            <Button icon={<UploadOutlined />}>
              Klik Untuk Upload MOU Transporter
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Upload Logbook">
          <Upload
            multiple
            beforeUpload={(file) => beforeUploadFileDynamic(file)}
            fileList={fileLogbook}
            onChange={(file) => setFileLogbook(file.fileList)}>
            <Button icon={<UploadOutlined />}>Klik Untuk Upload Logbook</Button>
          </Upload>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    ),
    limbahCair: (
      <Form
        onFinish={handleSubmitButton}
        {...layout}
        name="control-hooks"
        style={{ maxWidth: 600 }}>
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          Pencatatan Limbah Cair
        </h2>
        <Form.Item name="form_debitLimbah" label="Debit Limbah Cair">
          <Input
            onChange={handleChangeInput}
            name="debitlimbahcair"
            value={form.debitlimbahcair}
          />
        </Form.Item>
        <Form.Item name="form_kapasitasInpal" label="Kapasitas Inpal">
          <Input
            onChange={handleChangeInput}
            name="kapasitasinpal"
            value={form.kapasitasinpal}
          />
        </Form.Item>

        <Divider />

        <Form.Item name="form_ukuranTPS" label="Apakah Memenuhi Syarat?">
          <Checkbox
            style={{ marginLeft: 10 }}
            value={form.statuspemusnah}
            onChange={handleCheckboxChange2}>
            Iya
          </Checkbox>
        </Form.Item>

        <Form.Item name="form_catatan" label="Catatan">
          <TextArea
            style={{ width: 500, height: 75 }}
            placeholder="Masukan Catatan"
            onChange={handleChangeInput}
            name="catatanlimbahcair"
            value={form.catatanlimbahcair}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" onClick={handlePreviousButton}>
              Previous
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    ),
  };

  return (
    <>
      <Form>
        <br />
        <Space wrap>
          <Form.Item
            name="form_periode"
            initialValue={form.periode}
            rules={[{ required: true }]}
            label="Periode">
            <Select
              value={form.periode}
              placeholder="Pilih Bulan Periode"
              onChange={(v) => handleChangePeriode(v, "periode", event)}
              style={{ width: 200 }}
              // onChange={handleChange}
              options={[
                { value: "1", label: "Januari" },
                { value: "2", label: "Februari" },
                { value: "3", label: "Maret" },
                { value: "4", label: "April" },
                { value: "5", label: "Mei" },
                { value: "6", label: "Juni" },
                { value: "7", label: "Juli" },
                { value: "8", label: "Agustus" },
                { value: "9", label: "September" },
                { value: "10", label: "Oktober" },
                { value: "11", label: "November" },
                { value: "12", label: "Desember" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="form_tahun"
            label="Tahun"
            rules={[{ required: true }]}>
            <Input
              placeholder="Masukan Tahun"
              onChange={handleChangeInput}
              value={form.tahun}
              maxLength={4}
              name="tahun"
            />
          </Form.Item>
        </Space>
      </Form>
      <Card
        style={{ width: "100%" }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {contentListNoTitle[activeTabKey2]}
        </div>
      </Card>
    </>
  );
};

export default FormPengajuanLimbah;
