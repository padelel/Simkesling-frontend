import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";

import { LoginOutlined, UploadOutlined } from "@ant-design/icons";
import api from "@/utils/HttpRequest";
import { DatePicker, Space } from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { useUserLoginStore } from "@/stores/userLoginStore";
import { useGlobalStore } from "@/stores/globalStore";

const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 6 },
};

const tailLayout = {
  wrapperCol: { offset: 12, span: 16 },
};

const FormProfile = () => {
  const [kecamatanOptions, setKecamatanOptions] = useState<
    { value: string; label: string; id_kecamatan: number }[]
  >([]);
  const [kelurahanOptions, setKelurahanOptions] = useState<
    { value: string; label: string; id_kelurahan: number }[]
  >([]);
  const [selectedKelurahan, setSelectedKelurahan] = useState<number | null>(
    null
  );
  const [selectedKecamatan, setSelectedKecamatan] = useState<number | null>(
    null
  );
  const globalStore = useGlobalStore();
  const userLoginStore = useUserLoginStore();
  const [fileTps, setFileTps] = useState<UploadFile[]>([]);
  const [fileIpal, setFileIpal] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    noizin: "",
    id_kecamatan: "",
    id_kelurahan: "",
    alamat: "",
    telp: "",
    email: "",
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
  const handleChangeSelect = (val: any, name: string, event: any) => {
    // console.log(val);
    // console.log(event.target);
    setForm({
      ...form,
      [name]: val,
    });
  };

  const getKecamatanData = async () => {
    try {
      if (globalStore.setLoading) globalStore.setLoading(true);
      const response = await api.post("/user/kecamatan/data");
      const responseData = response.data.data.values;

      setKecamatanOptions(
        responseData.map(
          (item: { nama_kecamatan: string; id_kecamatan: number }) => ({
            value: item.id_kecamatan.toString(),
            label: item.nama_kecamatan,
            id_kecamatan: item.id_kecamatan,
          })
        )
      );
    } catch (error) {
      console.error("Error fetching kecamatan data:", error);
    } finally {
      if (globalStore.setLoading) globalStore.setLoading(false);
    }
  };

  const getKelurahanData = async (id_kecamatan: number) => {
    try {
      if (globalStore.setLoading) globalStore.setLoading(true);
      const response = await api.post(
        `/user/kelurahan/data?id_kecamatan=${id_kecamatan}`
      );
      const responseData = response.data.data.values;

      setKelurahanOptions(
        responseData.map(
          (item: { nama_kelurahan: string; id_kelurahan: number }) => ({
            value: item.id_kelurahan.toString(),
            label: item.nama_kelurahan,
            id_kelurahan: item.id_kelurahan,
          })
        )
      );
    } catch (error) {
      console.error("Error fetching kelurahan data:", error);
    } finally {
      if (globalStore.setLoading) globalStore.setLoading(false);
    }
  };

  const handleKecamatanSelectChange = (value: any, name: any, event: any) => {
    const id_kecamatan = parseInt(value);
    setSelectedKecamatan(id_kecamatan);
    setSelectedKelurahan(null);
    getKelurahanData(id_kecamatan);
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleKelurahanSelectChange = (
    value: string,
    name: any,
    event: any
  ) => {
    setSelectedKelurahan(parseInt(value));
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log(form);
    console.log(fileTps);
    console.log(fileIpal);
  };

  const [formInstance] = Form.useForm();

  useEffect(() => {
    getKecamatanData();

    // console.log("nin");
    // console.log(userLoginStore.user);
    setForm({
      ...form,
      nama: userLoginStore.user?.nama_user ?? "",
      noizin: userLoginStore.user?.noreg_tempat ?? "",
      id_kecamatan: userLoginStore.user?.id_kecamatan?.toString() ?? "",
      id_kelurahan: userLoginStore.user?.id_kelurahan?.toString() ?? "",
      alamat: userLoginStore.user?.alamat_tempat ?? "",
      telp: userLoginStore.user?.notlp ?? "",
      email: userLoginStore.user?.email ?? "",
    });
    formInstance.setFieldsValue({
      form_nama: userLoginStore.user?.nama_user ?? "",
      form_noIzin: userLoginStore.user?.noreg_tempat ?? "",
      form_kecamatan: userLoginStore.user?.id_kecamatan ?? "",
      form_kelurahan: userLoginStore.user?.id_kelurahan ?? "",
      form_alamat: userLoginStore.user?.alamat_tempat ?? "",
      form_notelp: userLoginStore.user?.notlp ?? "",
      form_email: userLoginStore.user?.email ?? "",
    });
    getKelurahanData(parseInt(userLoginStore.user?.id_kecamatan ?? "0"));
  }, []);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>Profile Saya</h2>
      </div>
      <div style={{ justifyContent: "center" }}>
        <Form
          form={formInstance}
          onFinish={handleSubmit}
          {...layout}
          name="control-hooks">
          <Form.Item
            name="form_nama"
            label="Nama Puskemas/RS"
            rules={[{ required: true }]}>
            <Input onChange={handleChangeInput} value={form.nama} name="nama" />
          </Form.Item>
          <Form.Item
            name="form_noIzin"
            label="Nomor Izin"
            rules={[{ required: true }]}>
            <Input
              onChange={handleChangeInput}
              value={form.noizin}
              name="noizin"
            />
          </Form.Item>
          <Form.Item
            name="form_kecamatan"
            label="Kecamatan"
            initialValue={form.id_kecamatan}
            rules={[{ required: true }]}>
            <Select
              style={{ width: 250 }}
              showSearch
              value={form.id_kecamatan}
              onChange={(v) =>
                handleKecamatanSelectChange(v, "id_kecamatan", event)
              }
              placeholder="Silahkan Pilih Kecamatan"
              allowClear
              options={kecamatanOptions}
            />
          </Form.Item>
          <Form.Item
            name="form_kelurahan"
            label="Kelurahan"
            initialValue={form.id_kelurahan}
            rules={[{ required: true }]}>
            <Select
              style={{ width: 250 }}
              showSearch
              value={form.id_kelurahan}
              onChange={(v) =>
                handleKelurahanSelectChange(v, "id_kelurahan", event)
              }
              placeholder="Silahkan Pilih Kelurahan"
              allowClear
              options={kelurahanOptions}
            />
          </Form.Item>

          <Form.Item
            name="form_alamat"
            label="Alamat"
            rules={[{ required: true }]}>
            <TextArea
              name="alamat"
              showCount
              maxLength={300}
              onChange={handleChangeInput}
              value={form.alamat}
            />
          </Form.Item>
          <Form.Item
            name="form_notelp"
            label="Nomor Telepon"
            rules={[{ required: true }]}>
            <Input onChange={handleChangeInput} value={form.telp} name="telp" />
          </Form.Item>
          <Form.Item
            name="form_email"
            label="Email"
            rules={[{ required: true }]}>
            <Input
              onChange={handleChangeInput}
              value={form.email}
              name="email"
            />
          </Form.Item>

          <Form.Item
            name="listFileTps"
            rules={[
              {
                required: true,
                message: "Upload File TPS",
              },
            ]}
            label="Upload TPS">
            <div>
              <Upload
                beforeUpload={(file) => beforeUploadFileDynamic(file)}
                fileList={fileTps}
                maxCount={1}
                onChange={(file) => setFileTps(file.fileList)}>
                <Button icon={<UploadOutlined />}>Klik Untuk Upload TPS</Button>
              </Upload>
            </div>
          </Form.Item>

          <Form.Item
            name="listFileIpal"
            rules={[
              {
                required: true,
                message: "Upload File IPAL",
              },
            ]}
            label="Upload IPAL">
            <div>
              <Upload
                beforeUpload={(file) => beforeUploadFileDynamic(file)}
                fileList={fileIpal}
                maxCount={1}
                onChange={(file) => setFileIpal(file.fileList)}>
                <Button icon={<UploadOutlined />}>
                  Klik Untuk Upload IPAL
                </Button>
              </Upload>
            </div>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      ;
    </>
  );
};

export default FormProfile;
