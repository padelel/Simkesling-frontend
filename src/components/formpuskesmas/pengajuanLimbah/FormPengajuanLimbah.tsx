import React, { useState } from "react";
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
  UploadProps,
  message,
} from "antd";

import { LoginOutlined, UploadOutlined } from "@ant-design/icons";

import { DatePicker, Space } from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";

import { Card } from "antd";

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

const FormPengajuanLimbah = () => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const [isCheckboxChecked1, setIsCheckboxChecked1] = useState(false);

  const handleCheckboxChange1 = (e) => {
    setIsCheckboxChecked1(e.target.checked);
  };

  const [rowCount, setRowCount] = useState(1);

  const handleAddRow = () => {
    setRowCount(rowCount + 1);
  };

  const renderRows = () => {
    const rows = [];

    for (let i = 0; i < rowCount; i++) {
      rows.push(
        <Space key={i} style={{ marginTop: 10 }} size="small">
          <Input style={{ width: 150 }} placeholder="Kategori" />
          <Input style={{ width: 150 }} placeholder="Catatan" />
          <InputNumber style={{ width: 150 }} placeholder="Berat" /> Kg
        </Space>
      );
    }

    return rows;
  };

  const contentListNoTitle: Record<string, React.ReactNode> = {
    limbahPadat: (
      <Form {...layout} name="control-hooks" style={{ maxWidth: 600 }}>
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          Pencatatan Limbah Padat
        </h2>
        <Form.Item
          name="transporter"
          label="Pilih Transporter"
          rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            allowClear>
            <Option value="Mudrock">Mudrock</Option>
            <Option value="John Cena">John Cena</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="metodePemusnahan"
          label="Metode Pemusnahan"
          rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Divider />
        <Form.Item name="ukuranTPS" label="Memiliki TPS?">
          <Checkbox style={{ marginLeft: 10 }} onChange={handleCheckboxChange}>
            Iya
          </Checkbox>
          <InputNumber disabled={!isCheckboxChecked} min={0} defaultValue={0} />{" "}
          /Ukuran (m2)
        </Form.Item>
        <Form.Item name="ukuranPemusnah" label="Memiliki Pemusnah Mandiri?">
          <Checkbox style={{ marginLeft: 10 }} onChange={handleCheckboxChange1}>
            Iya
          </Checkbox>
          <InputNumber
            disabled={!isCheckboxChecked1}
            min={0}
            defaultValue={0}
          />{" "}
          /Ukuran (m2)
        </Form.Item>

        <Divider />
        <Form.Item
          name="beratLimbah"
          label="Total Limbah Padat(Kg)"
          rules={[{ required: true }]}>
          <InputNumber min={1} defaultValue={1} />
        </Form.Item>
        <Form.Item
          name="beratLimbahNonCovid"
          label="Total Limbah NonCovid(Kg)"
          rules={[{ required: true }]}>
          <InputNumber min={1} defaultValue={1} />
        </Form.Item>
        <Form.Item
          name="totalBeratLimbah"
          label="Total Limbah Covid(Kg)"
          rules={[{ required: true }]}>
          <InputNumber min={1} defaultValue={1} />
        </Form.Item>
        <Divider />
        <div>
          <h3>Detail Limbah Padat</h3>
          <Button type="primary" onClick={handleAddRow}>
            Tambah Baris
          </Button>
        </div>
        <br />
        <Form.Item name="totalDetailLimbah" rules={[{ required: true }]}>
          {renderRows()}
        </Form.Item>

        <Divider />
        <h3>Upload Catatan</h3>

        <Form.Item label="Upload Manifest">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>
              Klik Untuk Upload MOU Transporter
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Upload Logbook">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Klik Untuk Upload Logbook</Button>
          </Upload>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    ),
    limbahCair: (
      <Form {...layout} name="control-hooks" style={{ maxWidth: 600 }}>
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          Pencatatan Limbah Cair
        </h2>
        <Form.Item
          name="debitLimbah"
          label="Debit Limbah Cair"
          rules={[{ required: true }]}>
          <InputNumber min={1} defaultValue={1} /> (Kg)
        </Form.Item>
        <Form.Item
          name="kapasitasInpal"
          label="Kapasitas Inpal"
          rules={[{ required: true }]}>
          <InputNumber min={1} defaultValue={1} /> (m3)
        </Form.Item>

        <Divider />

        <Form.Item name="ukuranTPS" label="Apakah Memenuhi Syarat?">
          <Checkbox style={{ marginLeft: 10 }} onChange={handleCheckboxChange}>
            Iya
          </Checkbox>
        </Form.Item>

        <Form.Item name="catatan" label="Catatan">
          <TextArea
            style={{ width: 500, height: 75 }}
            placeholder="Masukan Catatan"
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    ),
  };

  const [activeTabKey2, setActiveTabKey2] = useState<string>("limbahPadat");
  const onTab2Change = (key: string) => {
    setActiveTabKey2(key);
  };

  return (
    <>
      <Card
        style={{ width: "100%" }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        onTabChange={onTab2Change}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {contentListNoTitle[activeTabKey2]}
        </div>
      </Card>
    </>
  );
};

export default FormPengajuanLimbah;
