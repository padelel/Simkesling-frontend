import React, { useState } from "react";
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

import { DatePicker, Space } from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import { RcFile, UploadChangeParam } from "antd/es/upload";

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
  const [fileTps, setFileTps] = useState<UploadFile[]>([]);
  const [fileIpal, setFileIpal] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    noizin: "",
    kecamatan: "",
    kelurahan: "",
    alamat: "",
    email: "",
    ipal: "",
    tps: "",
  });

  const beforeUploadFileDynamic = (file: RcFile) => {
    return false;
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = () => {
    console.log(form);
    console.log(fileTps);
    console.log(fileIpal);
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>Profile Saya</h2>
      </div>
      <div style={{ justifyContent: "center" }}>
        <Form onFinish={handleSubmit} {...layout} name="control-hooks">
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
            initialValue={form.kecamatan}
            rules={[{ required: true }]}>
            <Select
              value={form.kecamatan}
              onChange={(v) => handleChangeSelect(v, "kecamatan", event)}
              placeholder="Silahkan Pilih Kecamatan"
              allowClear>
              <Option value="Kelapa Dua">Kelapa Dua</Option>
              <Option value="Citayam">Citayam</Option>
              <Option value="Srengseng Sawah">Srengseng Sawah</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="form_kelurahan"
            label="Kelurahan"
            initialValue={form.kelurahan}
            rules={[{ required: true }]}>
            <Select
              value={form.kelurahan}
              onChange={(v) => handleChangeSelect(v, "kelurahan", event)}
              placeholder="Silahkan Pilih Kecamatan"
              allowClear>
              <Option value="Pasir Gunung Selatan">Pasir Gunung Selatan</Option>
              <Option value="Pasir Gunung Utara">Pasir Gunung Utara</Option>
            </Select>
          </Form.Item>

          <Form.Item name="alamat" label="Alamat" rules={[{ required: true }]}>
            <TextArea
              name="alamat"
              showCount
              maxLength={300}
              onChange={handleChangeInput}
              value={form.alamat}
            />
          </Form.Item>
          <Form.Item
            name="noTelp"
            label="Nomor Telepon"
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
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
                onChange={(file) => setFileTps(file.fileList)}
                multiple>
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
                onChange={(file) => setFileIpal(file.fileList)}
                multiple>
                <Button icon={<UploadOutlined />}>
                  Klik Untuk Upload IPAL
                </Button>
              </Upload>
            </div>
          </Form.Item>

          {/* <Form.Item label="Upload Izin IPAL">
            <Upload name="ipal" beforeUpload={(file) => false}>
              <Button icon={<UploadOutlined />}>
                Klik Untuk Upload IPAL Transporter
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Upload Izin TPS">
            <Upload name="tps" beforeUpload={(file) => false}>
              <Button icon={<UploadOutlined />}>
                Klik Untuk Upload TPS Transporter
              </Button>
            </Upload>
          </Form.Item> */}

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
