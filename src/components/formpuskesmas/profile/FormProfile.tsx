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
import { MUser, User } from "@/models/MUser";
import apifile from "@/utils/HttpRequestFile";
import Notif from "@/utils/Notif";

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

  let tmpForm = {
    nama: "",
    noizin: "",
    id_kecamatan: "",
    id_kelurahan: "",
    alamat: "",
    telp: "",
    email: "",
    level: "",
    username: "",
    password: "",
    oldid: "",
  };
  const [form, setForm] = useState(tmpForm);

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

  const handleSubmit = async () => {
    console.log(form);
    console.log(fileTps);
    console.log(fileIpal);

    let dataForm: any = new FormData();
    dataForm.append("oldid", form.oldid);
    dataForm.append("nama_user", form.nama);
    dataForm.append("username", form.username);
    dataForm.append("password", form.password);
    dataForm.append("noreg_tempat", form.noizin);
    dataForm.append("level", form.level);
    dataForm.append("id_kecamatan", form.id_kecamatan);
    dataForm.append("id_kelurahan", form.id_kelurahan);
    dataForm.append("alamat_tempat", form.alamat);
    dataForm.append("notlp", form.telp);
    dataForm.append("email", form.email);

    if (fileTps.length > 0) {
      let file = fileTps[0];
      if (file.hasOwnProperty("blob")) {
        // @ts-ignore
        dataForm.append("file_izin_tps", file.blob);
      } else {
        dataForm.append("file_izin_tps", file.originFileObj);
      }
    }
    if (fileIpal.length > 0) {
      let file = fileIpal[0];
      if (file.hasOwnProperty("blob")) {
        // @ts-ignore
        dataForm.append("file_izin_ipal", file.blob);
      } else {
        dataForm.append("file_izin_ipal", file.originFileObj);
      }
    }

    let url = "/user/puskesmas-rumahsakit/update";
    try {
      if (globalStore.setLoading) globalStore.setLoading(true);
      let responsenya = await api.post(url, dataForm);
      Notif("success", "Success.!", "Berhasil Update Profil");
      getDataProfile();
    } catch (e) {
      console.error(e);
    } finally {
      if (globalStore.setLoading) globalStore.setLoading(false);
    }
  };

  const getFile = async (file: any) => {
    try {
      if (globalStore.setLoading) globalStore.setLoading(true);
      if (file == null) return null;
      let arrname = file.split("/");
      let filename = arrname[arrname.length - 1];
      const resp = await apifile.get(
        `${file}?${Math.random().toString().replaceAll(".", "")}`,
        {
          responseType: "arraybuffer",
        }
      ); // Set responseType to 'arraybuffer'
      const filenya = resp.data;
      const typefile = resp.headers["content-type"];

      // Create a Blob from the response data
      const blob = new Blob([filenya], { type: typefile });

      // Create a Blob URL
      const blobUrl = URL.createObjectURL(blob);
      return {
        uid: new Date().toISOString(),
        name: filename,
        status: "done",
        url: blobUrl,
        blob: blob,
      };
    } catch (error) {
      console.error("-- error in getfile --");
      console.error("Error fetching or processing data:", error);
    } finally {
      if (globalStore.setLoading) globalStore.setLoading(false);
    }
  };
  const [formInstance] = Form.useForm();
  const getDataProfile = async () => {
    await getKecamatanData();
    const resp = await api.post("/user/puskesmas-rumahsakit/data-profile");
    const user: User = resp.data.data.data;
    console.log(user);
    setForm({
      ...form,
      oldid: user.id_user?.toString() ?? "",
      username: user.username?.toString() ?? "",
      password: "",
      level: user.level?.toString() ?? "",
      nama: user.nama_user ?? "",
      noizin: user?.noreg_tempat ?? "",
      id_kecamatan: user?.id_kecamatan?.toString() ?? "",
      id_kelurahan: user?.id_kelurahan?.toString() ?? "",
      alamat: user?.alamat_tempat ?? "",
      telp: user?.notlp ?? "",
      email: user?.email ?? "",
    });
    const fileTps = await getFile(user?.izin_tps);
    const fileIpal = await getFile(user?.izin_ipal);
    if (fileTps) {
      setFileTps([fileTps] as any[]);
      formInstance.setFieldsValue({
        listFileTps: [fileTps],
      });
    }
    if (fileIpal) {
      setFileIpal([fileIpal] as any[]);
      formInstance.setFieldsValue({
        listFileIpal: [fileIpal],
      });
    }
    console.log(fileTps);

    console.log(fileIpal);
    //     listFileTps
    // listFileIpal
    // setFileTps(user?.izin_tps ?? [])
    // setFileIpal(user?.izin_ipal ?? [])
    formInstance.setFieldsValue({
      form_username: user?.username ?? "",
      form_password: "",
      form_nama: user?.nama_user ?? "",
      form_noIzin: user?.noreg_tempat ?? "",
      form_kecamatan: user?.id_kecamatan?.toString() ?? "",
      form_kelurahan: user?.id_kelurahan?.toString() ?? "",
      form_alamat: user?.alamat_tempat ?? "",
      form_notelp: user?.notlp ?? "",
      form_email: user?.email ?? "",
    });
    let id_kec = user?.id_kecamatan ?? 0;
    getKelurahanData(parseInt(id_kec.toString()));
  };

  useEffect(() => {
    console.log("profile");
    console.log(userLoginStore.user);

    getDataProfile();

    // setForm({
    //   ...form,
    //   nama: userLoginStore.user?.nama_user ?? "",
    //   noizin: userLoginStore.user?.noreg_tempat ?? "",
    //   id_kecamatan: userLoginStore.user?.id_kecamatan?.toString() ?? "",
    //   id_kelurahan: userLoginStore.user?.id_kelurahan?.toString() ?? "",
    //   alamat: userLoginStore.user?.alamat_tempat ?? "",
    //   telp: userLoginStore.user?.notlp ?? "",
    //   email: userLoginStore.user?.email ?? "",
    // });
    // formInstance.setFieldsValue({
    //   form_nama: userLoginStore.user?.nama_user ?? "",
    //   form_noIzin: userLoginStore.user?.noreg_tempat ?? "",
    //   form_kecamatan: userLoginStore.user?.id_kecamatan ?? "",
    //   form_kelurahan: userLoginStore.user?.id_kelurahan ?? "",
    //   form_alamat: userLoginStore.user?.alamat_tempat ?? "",
    //   form_notelp: userLoginStore.user?.notlp ?? "",
    //   form_email: userLoginStore.user?.email ?? "",
    // });
    // let id_kec = userLoginStore.user?.id_kecamatan ?? 0;
    // getKelurahanData(parseInt(id_kec.toString()));
  }, []);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>Profile Saya</h2>
        {/* <Button onClick={() => getDataProfile()}>GetProfile</Button> */}
      </div>
      <div style={{ justifyContent: "center" }}>
        <Form
          form={formInstance}
          onFinish={handleSubmit}
          {...layout}
          name="control-hooks"
        >
          <Form.Item
            name="form_username"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input
              onChange={handleChangeInput}
              value={form.username}
              name="username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password (silahkan isi jika ingin mengganti password)"
            rules={[]}
          >
            <Input.Password
              onChange={handleChangeInput}
              value={form.password}
              name="password"
            />
          </Form.Item>
          <Form.Item
            name="form_nama"
            label="Nama Puskemas/RS"
            rules={[{ required: true }]}
          >
            <Input onChange={handleChangeInput} value={form.nama} name="nama" />
          </Form.Item>
          <Form.Item
            name="form_noIzin"
            label="Nomor Izin"
            rules={[{ required: true }]}
          >
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
            rules={[{ required: true }]}
          >
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
            rules={[{ required: true }]}
          >
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
            rules={[{ required: true }]}
          >
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
            rules={[{ required: true }]}
          >
            <Input onChange={handleChangeInput} value={form.telp} name="telp" />
          </Form.Item>
          <Form.Item
            name="form_email"
            label="Email"
            rules={[{ required: true }]}
          >
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
                required: false,
                message: "Upload File TPS",
              },
            ]}
            label="Upload TPS"
            initialValue={fileTps}
          >
            <div>
              <Upload
                beforeUpload={(file: any) => beforeUploadFileDynamic(file)}
                fileList={fileTps}
                maxCount={1}
                onChange={(file: any) => setFileTps(file.fileList)}
              >
                <Button icon={<UploadOutlined />}>Klik Untuk Upload TPS</Button>
              </Upload>
            </div>
          </Form.Item>

          <Form.Item
            name="listFileIpal"
            rules={[
              {
                required: false,
                message: "Upload File IPAL",
              },
            ]}
            label="Upload IPAL"
            initialValue={fileIpal}
          >
            <div>
              <Upload
                beforeUpload={(file: any) => beforeUploadFileDynamic(file)}
                fileList={fileIpal}
                maxCount={1}
                onChange={(file: any) => setFileIpal(file.fileList)}
              >
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
