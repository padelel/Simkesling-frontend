import React, { useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
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

import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { DatePicker, Space } from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import { RcFile, UploadChangeParam } from "antd/es/upload";

const { RangePicker } = DatePicker;

// const onChange = (
//   value: DatePickerProps["value"] | RangePickerProps["value"],
//   dateString: [string, string] | string
// ) => {
//   console.log("Selected Time: ", value);
//   console.log("Formatted Selected Time: ", dateString);
// };

// const onOk = (value: DatePickerProps["value"] | RangePickerProps["value"]) => {
//   console.log("onOk: ", value);
// };

const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const tailLayoutUpload = {
  wrapperCol: { offset: 8, span: 16 },
};

const FormPengajuanTransporter = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileListList, setFileListList] = useState<UploadFile[][]>([]);
  const [dateRangeList, setDateRangeList] = useState<any[]>([]);

  const [uploading, setUploading] = useState(false);
  const [rowCount, setRowCount] = useState(1);

  const [showMOUFields, setShowMOUFields] = useState(false);

  const toggleMOUFields = () => {
    setShowMOUFields(!showMOUFields);
  };

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file as RcFile);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch("https://www.mocky.io/v2/5cc8019d300000980a055e76", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  // name: itu index 0 1 2 3 4 5 urut
  // key: itu name yang nambah terus 1 3 7 8 9 10
  const handleAddRowDynamic = (add: Function) => {
    fileListList.push([]);
    dateRangeList.push([]);
    console.log(fileListList);
    add();
  };
  const handleRemoveRowDynamic = (
    remove: Function,
    name: number,
    key: number
  ) => {
    console.log("----");
    console.log(key);
    console.log(name);
    remove(name);

    let tmpFileListList = [...fileListList];
    tmpFileListList.splice(name, 1);
    setFileListList(tmpFileListList);

    let tmpDateRangeList = [...dateRangeList];
    tmpDateRangeList.splice(name, 1);
    setDateRangeList(tmpDateRangeList);

    console.log(tmpFileListList);
    console.log(tmpDateRangeList);
    console.log("----[END]");
  };

  const beforeUploadFileDynamic = (file: RcFile, key: number) => {
    return false;
  };
  const onChangeFileDynamic = (
    file: UploadChangeParam<UploadFile<any>>,
    key: number,
    name: number
  ) => {
    let tmpFileListList = [...fileListList];
    tmpFileListList[name] = [file.file];
    setFileListList(tmpFileListList);
  };
  const onRemoveFileDynamic = (
    file: UploadFile<any>,
    key: number,
    name: number
  ) => {
    let tmpFileListList = [...fileListList];
    const index = tmpFileListList[name].indexOf(file);
    // const newFileList = tmpFileListList[name].slice();
    // newFileList.splice(index, 1);
    tmpFileListList[name].splice(index, 1);
    setFileListList(tmpFileListList);
  };

  // -- rangeDate
  const onChangeRangeDateDynamic = (
    value: null | (Dayjs | null)[],
    dateStrings: string[],
    // value: DatePickerProps["value"] | RangePickerProps["value"],
    // dateString: [string, string] | string,
    key: number,
    name: number
  ) => {
    console.log(value);
    console.log(dateStrings);
    console.log(name);
    let tmpDateRangeList = [...dateRangeList];
    let tmpval: dayjs.Dayjs[] = [];
    if (value) {
      tmpval = [dayjs(dateStrings[0]), dayjs(dateStrings[1])];
    }
    console.log(tmpval);
    tmpDateRangeList[name] = tmpval;
    setDateRangeList(tmpDateRangeList);
  };

  // -- onSubmit
  const handleOnSubmit = (event: any) => {
    console.log(event);
    console.log(fileListList);
    console.log(dateRangeList);
  };
  return (
    <>
      <Form {...layout} name="control-hooks" style={{ maxWidth: 600 }}>
        <Form.Item
          name="namaTransporter"
          label="Nama Transporter"
          rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="npwp" label="NPWP" rules={[{ required: true }]}>
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
          name="nohp"
          label="Nomor Handphone"
          rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Divider />

        <Form.List name="listMouDynamic">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  direction="vertical"
                  size="middle"
                  key={"spaceKey" + key}
                  style={{ display: "flex", justifyContent: "center" }}>
                  <MinusCircleOutlined
                    onClick={() => handleRemoveRowDynamic(remove, name, key)}
                  />

                  <Form.Item
                    rules={[
                      {
                        required: fileListList[name]
                          ? fileListList[name].length == 0
                          : true,
                        message: "Upload File MOU",
                      },
                    ]}
                    label="Upload MOU"
                    name={"fileMOU" + key}
                    key={"fileMOUKey" + key}>
                    <div>
                      <br />
                      <Upload
                        beforeUpload={(file) =>
                          beforeUploadFileDynamic(file, key)
                        }
                        onChange={(v) => onChangeFileDynamic(v, key, name)}
                        onRemove={(v) => onRemoveFileDynamic(v, key, name)}
                        fileList={fileListList[name]}
                        maxCount={1}
                        name={"upload" + key}
                        key={"uploadKey" + key}>
                        <Button icon={<UploadOutlined />}>
                          Klik Untuk Upload MOU Transporter
                        </Button>
                      </Upload>
                    </div>
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: dateRangeList[name]
                          ? dateRangeList[name].length == 0
                          : true,
                        message: "Masukan Tanggal Berlaku MOU",
                      },
                    ]}
                    initialValue={dateRangeList[name]}
                    label="Masa Berlaku MOU"
                    name={"masaBerlaku" + key}
                    key={"masaBerlakuKey" + key}>
                    <div>
                      <RangePicker
                        format="YYYY-MM-DD"
                        onChange={(v1, v2) =>
                          onChangeRangeDateDynamic(v1, v2, key, name)
                        }
                        name={"rangePicker" + key}
                        key={"rangePickerKey" + key}
                      />
                    </div>
                  </Form.Item>
                  <Divider />
                </Space>
              ))}
              <Form.Item {...tailLayout}>
                <Button
                  type="dashed"
                  onClick={() => handleAddRowDynamic(add)}
                  block
                  icon={<PlusOutlined />}>
                  Tambahkan MOU Transporter
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item {...tailLayoutUpload}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={(event) => handleOnSubmit(event)}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormPengajuanTransporter;
