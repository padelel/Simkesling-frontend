import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
} from "antd";

import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import api from "@/pages/utils/HttpRequest";
import { useTambahAkunStore } from "@/stores/pengajuanAkunStore";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 17 },
};

const tailLayoutUpload = {
  wrapperCol: { offset: 8, span: 16 },
};

const FormTambahAkun: React.FC = () => {
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

  const getKecamatanData = async () => {
    try {
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
    }
  };

  const getKelurahanData = async (id_kecamatan: number) => {
    try {
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
    }
  };

  const [formInstance] = Form.useForm();

  useEffect(() => {
    console.log(Object.values(tambahAkunStore));
    getKecamatanData();
    formInstance.setFieldsValue({
      form_namauser: tambahAkunStore.nama_user,
      form_namatempat: tambahAkunStore.nama_tempat,
      form_tipe: tambahAkunStore.tipe_tempat,
      form_kecamatan: tambahAkunStore.id_kecamatan,
      form_kelurahan: tambahAkunStore.id_kelurahan,
      form_alamat: tambahAkunStore.alamat_tempat,
      form_nohp: tambahAkunStore.notlp,
      form_email: tambahAkunStore.email,
    });
  }, []);

  const [dateRangeList, setDateRangeList] = useState<any[]>([]);

  const [form, setForm] = useState({
    id_user: "",
    nama_user: "",
    nama_tempat: "",
    tipe_tempat: "",
    id_kecamatan: "",
    id_kelurahan: "",
    alamat_tempat: "",
    notelp: "",
    email: "",
  });

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(event);
    setForm({
      ...form,
      [event.target.name]: event.target.value,
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

  // -- onSubmit
  const handleSubmit = async () => {
    console.log(form);

    let dataForm: any = new FormData();
    dataForm.append("oldid", form.id_user);
    dataForm.append("nama_user", form.nama_user);
    dataForm.append("nama_tempat", form.nama_tempat);
    dataForm.append("tipe_tempat", form.tipe_tempat);
    dataForm.append("id_kecamatan", form.id_kecamatan);
    dataForm.append("id_kelurahan", form.id_kelurahan);
    dataForm.append("alamat_tempat", form.alamat_tempat);
    dataForm.append("notlp", form.notelp);
    dataForm.append("email", form.email);

    let responsenya = await api.post(
      "/user/puskesmas-rumahsakit/create",
      dataForm
    );
    console.log(dateRangeList);
  };
  return (
    <>
      <Form
        {...layout}
        onFinish={handleSubmit}
        name="control-hooks"
        style={{ maxWidth: 600 }}
        form={formInstance}>
        <Form.Item
          name="form_namauser"
          label="Nama User"
          rules={[{ required: true }]}>
          <Input
            onChange={handleChangeInput}
            value={form.nama_user}
            name="nama_user"
          />
        </Form.Item>
        <Form.Item
          name="form_namatempat"
          label="Nama Tempat"
          rules={[{ required: true }]}>
          <Input
            onChange={handleChangeInput}
            value={form.nama_tempat}
            name="nama_tempat"
          />
        </Form.Item>
        <Form.Item name="form_tipe" label="Tipe Instansi" rules={[{ required: true }]}>
          <Input onChange={handleChangeInput} value={form.tipe_tempat} name="tipe_tempat" />
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
          rules={[{ required: true }]}>
          <Input onChange={handleChangeInput} value={form.notelp} name="notelp" />
        </Form.Item>
        <Form.Item name="form_email" label="Email" rules={[{ required: true }]}>
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
