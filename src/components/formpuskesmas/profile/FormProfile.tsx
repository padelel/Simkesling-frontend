import React from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  UploadProps,
  message,
} from "antd";

import { LoginOutlined, UploadOutlined } from "@ant-design/icons";

import { DatePicker, Space } from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";

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

const FormProfile = () => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>Profile Saya</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form {...layout} name="control-hooks" style={{ maxWidth: 600 }}>
          <Form.Item
            name="namaPuskesmas"
            label="Nama Puskemas/RS"
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="noIzin"
            label="Nomor Izin"
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="kecamatan"
            label="Kecamatan"
            rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              allowClear>
              <Option value="Kelapa Dua">Kelapa Dua</Option>
              <Option value="Citayam">Citayam</Option>
              <Option value="Srengseng Sawah">Srengseng Sawah</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="kelurahan"
            label="Kelurahan"
            rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              allowClear>
              <Option value="Pasir Gunung Selatan">Pasir Gunung Selatan</Option>
              <Option value="Tugu">Tugu</Option>
              <Option value="Kukusan">Kukusan</Option>
            </Select>
          </Form.Item>
          <Form.Item name="alamat" label="Alamat" rules={[{ required: true }]}>
            <TextArea showCount maxLength={300} />
          </Form.Item>
          <Form.Item
            name="noTelp"
            label="Nomor Telepon"
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Upload MOU">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>
                Klik Untuk Upload MOU Transporter
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Upload Izin IPAL">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>
                Klik Untuk Upload IPAL Transporter
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Upload Izin TPS">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>
                Klik Untuk Upload TPS Transporter
              </Button>
            </Upload>
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
