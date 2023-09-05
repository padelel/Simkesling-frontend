import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";

import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import api from "@/utils/HttpRequest";
import router from "next/router";
import { useTambahAkunStore } from "@/stores/pengajuanAkunStore";
import { useGlobalStore } from "@/stores/globalStore";
import cloneDeep from "clone-deep";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 14 },
  wrapperCol: { span: 17 },
};

const tailLayoutUpload = {
  wrapperCol: { offset: 8, span: 16 },
};

const FormTambahAkun: React.FC = () => {
  const globalStore = useGlobalStore();
  const tambahAkunStore = useTambahAkunStore();
  const [kecamatanOptions, setKecamatanOptions] = useState<
    { value: string; label: string; id_kecamatan: number }[]
  >([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState<number | null>(
    null
  );

  const [kelurahanOptions, setKelurahanOptions] = useState<
    { value: string; label: string; id_kelurahan: number }[]
  >([]);
  const [selectedKelurahan, setSelectedKelurahan] = useState<number | null>(
    null
  );

  const [getPassword, setPassword] = useState({
    required: true,
  });

  let tmpForm = {
    oldid: "",
    nama_user: "",
    noreg_tempat: "",
    level: "",
    id_kecamatan: "",
    id_kelurahan: "",
    alamat_tempat: "",
    notelp: "",
    email: "",
    username: "",
    password: "",
  };

  const [form, setForm] = useState(cloneDeep(tmpForm));

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
            id_kecamatan: item.id_kecamatan.toString(),
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
            id_kelurahan: item.id_kelurahan.toString(),
          })
        )
      );
    } catch (error) {
      console.error("Error fetching kelurahan data:", error);
    } finally {
      if (globalStore.setLoading) globalStore.setLoading(false);
    }
  };

  const [formInstance] = Form.useForm();

  // useEffect(() => {
  //   console.log(Object.values(tambahAkunStore));
  //   getKecamatanData();
  //   formInstance.setFieldsValue({
  //     form_namauser: tambahAkunStore.nama_user,
  //     form_username: tambahAkunStore.username,
  //     form_noreg: tambahAkunStore.noreg_tempat,
  //     level: tambahAkunStore.level,
  //     form_kecamatan: tambahAkunStore.id_kecamatan,
  //     form_kelurahan: tambahAkunStore.id_kelurahan,
  //     form_alamat: tambahAkunStore.alamat_tempat,
  //     form_nohp: tambahAkunStore.notlp,
  //     form_email: tambahAkunStore.email,
  //   });
  // }, []);

  const [dateRangeList, setDateRangeList] = useState<any[]>([]);

  // const [form, setForm] = useState({
  //   id_user: "",
  //   nama_user: "",
  //   noreg_tempat: "",
  //   level: "",
  //   id_kecamatan: "",
  //   id_kelurahan: "",
  //   alamat_tempat: "",
  //   notelp: "",
  //   email: "",
  //   username: "",
  //   password: "",
  // });

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

  useLayoutEffect(() => {
    getKecamatanData();
    console.log(router.query);
    console.log(Object.values(tambahAkunStore));
    console.log(tambahAkunStore);

    // jika create
    formInstance.resetFields();
    setForm(cloneDeep(tmpForm));

    if (router.query.action === "edit") {
      // jika edit set valuenya
      // jika idnya kosong (dia melakukan refresh) balikin ke table
      if (tambahAkunStore.id_user == null || tambahAkunStore.id_user == 0) {
        router.push("/dashboard/admin/manajemen/profil");
        return;
      }

      setPassword({
        required: false,
      });

      setForm({
        oldid: tambahAkunStore.id_user?.toString() ?? "",
        nama_user: tambahAkunStore.nama_user?.toString() ?? "",
        username: tambahAkunStore.username?.toString() ?? "",
        noreg_tempat: tambahAkunStore.noreg_tempat?.toString() ?? "",
        level: tambahAkunStore.level?.toString() ?? "",
        id_kecamatan: tambahAkunStore.id_kecamatan?.toString() ?? "",
        id_kelurahan: tambahAkunStore.id_kelurahan?.toString() ?? "",
        alamat_tempat: tambahAkunStore.alamat_tempat?.toString() ?? "",
        notelp: tambahAkunStore.nohp?.toString() ?? "",
        email: tambahAkunStore.email?.toString() ?? "",
        password: tambahAkunStore.email?.toString() ?? "",
      });

      formInstance.setFieldsValue({
        form_namauser: tambahAkunStore.nama_user,
        form_username: tambahAkunStore.username,
        form_noreg: tambahAkunStore.noreg_tempat,
        level: tambahAkunStore.level,
        form_kecamatan: tambahAkunStore.id_kecamatan,
        form_kelurahan: tambahAkunStore.id_kelurahan,
        form_alamat: tambahAkunStore.alamat_tempat,
        form_nohp: tambahAkunStore.notlp,
        form_email: tambahAkunStore.email,
      });

      getKelurahanData(tambahAkunStore.id_kecamatan ?? "0");

      // getFile(pengajuanTransporterStore.files);
      // getFilesHere();
    }
  }, []);

  // -- onSubmit
  const handleSubmit = async () => {
    console.log(form);

    let dataForm: any = new FormData();
    dataForm.append("oldid", form.oldid);
    dataForm.append("nama_user", form.nama_user);
    dataForm.append("username", form.username);
    dataForm.append("password", form.password);
    dataForm.append("noreg_tempat", form.noreg_tempat);
    dataForm.append("level", form.level);
    dataForm.append("id_kecamatan", form.id_kecamatan);
    dataForm.append("id_kelurahan", form.id_kelurahan);
    dataForm.append("alamat_tempat", form.alamat_tempat);
    dataForm.append("notlp", form.notelp);
    dataForm.append("email", form.email);

    let url = "/user/puskesmas-rumahsakit/create";
    if (router.query.action == "edit") {
      url = "/user/puskesmas-rumahsakit/update";
    }

    try {
      if (globalStore.setLoading) globalStore.setLoading(true);
      let responsenya = await api.post(url, dataForm);

      router.push("/dashboard/admin/manajemen/profil");
    } catch (e) {
      console.error(e);
    } finally {
      if (globalStore.setLoading) globalStore.setLoading(false);
    }
  };
  return (
    <>
      <Form
        {...layout}
        onFinish={handleSubmit}
        name="control-hooks"
        style={{ maxWidth: 600 }}
        form={formInstance}
      >
        <Form.Item
          name="form_namauser"
          label="Nama Instansi"
          rules={[{ required: true }]}
        >
          <Input
            onChange={handleChangeInput}
            value={form.nama_user}
            name="nama_user"
          />
        </Form.Item>
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
        <Form.Item name="password" label="Password" rules={[getPassword]}>
          <Input.Password
            onChange={handleChangeInput}
            value={form.password}
            name="password"
          />
        </Form.Item>
        <Form.Item
          name="form_noreg"
          label="Nomor registrasi / Nomor izin RS"
          rules={[{ required: false }]}
        >
          <Input
            onChange={handleChangeInput}
            value={form.noreg_tempat}
            name="noreg_tempat"
          />
        </Form.Item>
        <Form.Item
          name="level"
          label="Jenis Instansi"
          initialValue={form.level}
          rules={[{ required: true }]}
        >
          <Select
            style={{ width: 250 }}
            showSearch
            onChange={(v) => handleChangeSelect(v, "level", event)}
            placeholder="Silahkan Pilih Tipe Instansi"
            allowClear
            options={[
              { value: "3", label: "Puskesmas" },
              { value: "2", label: "Rumah Sakit" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="form_kecamatan"
          label="Kecamatan"
          initialValue={form.id_kecamatan}
          rules={[{ required: false }]}
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
          rules={[{ required: false }]}
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
          rules={[{ required: false }]}
        >
          <TextArea
            style={{ width: 250 }}
            showCount
            name="alamat_tempat"
            maxLength={300}
            onChange={handleChangeInput}
            value={form.alamat_tempat}
          />
        </Form.Item>
        <Form.Item
          name="form_nohp"
          label="Nomor Handphone"
          rules={[{ required: false }]}
        >
          <Input
            onChange={handleChangeInput}
            value={form.notelp}
            name="notelp"
          />
        </Form.Item>
        <Form.Item
          name="form_email"
          label="Email"
          rules={[{ required: false }]}
        >
          <Input onChange={handleChangeInput} value={form.email} name="email" />
        </Form.Item>

        <Form.Item {...tailLayoutUpload}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormTambahAkun;
