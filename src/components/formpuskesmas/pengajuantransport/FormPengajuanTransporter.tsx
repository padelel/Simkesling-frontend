import React, { useLayoutEffect, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  Upload,
  UploadFile,
  notification,
  DatePicker,
  Space,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import api from "@/utils/HttpRequest";
import { usePengajuanTransporterStore } from "@/stores/pengajuanTransporterStore";
import apifile from "@/utils/HttpRequestFile";
import router from "next/router";
import { useGlobalStore } from "@/stores/globalStore";
import jwtDecode from "jwt-decode";

type NotificationType = "success" | "info" | "warning" | "error";

interface FileData {
  uid: string;
  name: string;
  status: string;
  url: string;
  blob?: Blob;
}

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 17 },
};

const tailLayoutUpload = {
  wrapperCol: { offset: 8, span: 16 },
};

const tailLayoutUpload1 = {
  wrapperCol: { span: 100 },
};

const FormPengajuanTransporter: React.FC = () => {
  const [formInstance] = Form.useForm();
  const globalStore = useGlobalStore();
  const pengajuanTransporterStore = usePengajuanTransporterStore();
  const [notificationApi, contextHolder] = notification.useNotification();

  const [kecamatanOptions, setKecamatanOptions] = useState<{ value: string; label: string }[]>([]);
  const [kelurahanOptions, setKelurahanOptions] = useState<{ value: string; label: string }[]>([]);

  const showNotification = (type: NotificationType, message: string, description: string) => {
    notificationApi[type]({ message, description });
  };

  const getKecamatanData = async () => {
    try {
      globalStore.setLoading?.(true);
      const response = await api.post("/user/kecamatan/data");
      const responseData = response.data.data.values;
      setKecamatanOptions(
        responseData.map((item: any) => ({
          value: item.id_kecamatan.toString(),
          label: item.nama_kecamatan,
        }))
      );
    } catch (error) {
      console.error("Error fetching kecamatan data:", error);
      showNotification("error", "Gagal Memuat", "Gagal memuat data kecamatan.");
    } finally {
      globalStore.setLoading?.(false);
    }
  };

  const getKelurahanData = async (id_kecamatan: number) => {
    try {
      globalStore.setLoading?.(true);
      const response = await api.post(`/user/kelurahan/data?id_kecamatan=${id_kecamatan}`);
      const responseData = response.data.data.values;
      setKelurahanOptions(
        responseData.map((item: any) => ({
          value: item.id_kelurahan.toString(),
          label: item.nama_kelurahan,
        }))
      );
    } catch (error) {
      console.error("Error fetching kelurahan data:", error);
      showNotification("error", "Gagal Memuat", "Gagal memuat data kelurahan.");
    } finally {
      globalStore.setLoading?.(false);
    }
  };

  const getFileAsBlob = async (fileUrl: string): Promise<FileData | undefined> => {
    try {
      const arrname = fileUrl.split("/");
      const filename = arrname[arrname.length - 1];
      const resp = await apifile.get(
        `${fileUrl}?${Math.random().toString().replaceAll(".", "")}`,
        { responseType: "arraybuffer" }
      );
      
      const fileData = resp.data;
      const fileType = resp.headers["content-type"];
      const blob = new Blob([fileData], { type: fileType });
      const blobUrl = URL.createObjectURL(blob);
      
      return {
        uid: new Date().toISOString(),
        name: filename,
        status: "done",
        url: blobUrl,
        blob: blob,
      };
    } catch (error) {
      console.error("Error fetching or processing file:", error);
      return undefined;
    }
  };

  const handleKecamatanChange = (value: string) => {
    if (value) {
      getKelurahanData(parseInt(value));
    }
    formInstance.setFieldsValue({ form_kelurahan: null });
    setKelurahanOptions([]);
  };

  const handleSubmit = async (values: any) => {
    globalStore.setLoading?.(true);
    try {
      const dataForm = new FormData();
      const isEdit = router.query.action === "edit";

      dataForm.append("oldid", isEdit ? pengajuanTransporterStore.id_transporter_tmp?.toString() ?? "" : "");
      dataForm.append("nama_transporter", values.form_namatransporter ?? "");
      dataForm.append("npwp_transporter", values.form_npwp ?? "");
      dataForm.append("id_kecamatan", values.form_kecamatan ?? "");
      dataForm.append("id_kelurahan", values.form_kelurahan ?? "");
      dataForm.append("alamat_transporter", values.form_alamat ?? "");
      dataForm.append("notlp", values.form_nohp ?? "");
      dataForm.append("nohp", values.form_nohp ?? "");
      dataForm.append("email", values.form_email ?? "");
      dataForm.append("nama_pemusnah", values.form_nama_pemusnah ?? "");
      dataForm.append("metode_pemusnah", values.form_metode_pemusnah ?? "");
      dataForm.append("link_input_izin", values.form_link_input_izin ?? "");
      dataForm.append("link_input_mou_transporter", values.form_link_input_mou_transporter ?? "");

      values.listMouDynamic?.forEach((item: any) => {
        const fileInfo = item.fileMOU?.[0];
        if (fileInfo) {
          const fileToAppend = fileInfo.originFileObj || fileInfo.blob;
          if (fileToAppend) {
            dataForm.append("file_mou[]", fileToAppend, fileInfo.name);
          }
        }

        const rangeDates = item.masaBerlaku;
        if (rangeDates && rangeDates.length === 2) {
          const tglMulai = rangeDates[0].format("YYYY-MM-DD");
          const tglAkhir = rangeDates[1].format("YYYY-MM-DD");
          dataForm.append(`tgl_mulai[]`, tglMulai);
          dataForm.append(`tgl_akhir[]`, tglAkhir);
        }
      });

      let url = "/user/pengajuan-transporter/create";
      if (isEdit) {
        url = "/user/pengajuan-transporter/update";
      }

      await api.post(url, dataForm);
      
      showNotification(
        "success",
        isEdit ? "Update Transporter" : "Tambah Transporter",
        isEdit 
          ? "Transporter Berhasil Diupdate, silahkan tunggu validasi Admin"
          : "Transporter Berhasil Ditambahkan, silahkan tunggu validasi Admin"
      );
      
      router.push("/dashboard/user/pengajuantransporter");
    } catch (error) {
      console.error("Error submitting form:", error);
      showNotification("error", "Gagal Submit", "Terjadi kesalahan saat mengirim data.");
    } finally {
      globalStore.setLoading?.(false);
    }
  };

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
    const user: any = jwtDecode(token);

    getKecamatanData();

    const action = router.query.action as string;
    if (action === "edit") {
      if (!pengajuanTransporterStore.id_transporter_tmp) {
        const redirectPath = user.level === "1" 
          ? "/dashboard/admin/manajemen/transporter"
          : "/dashboard/user/pengajuantransporter";
        router.push(redirectPath);
        return;
      }

      const populateForm = async () => {
        globalStore.setLoading?.(true);
        const storeData = pengajuanTransporterStore;
        
        if (storeData.id_kecamatan) {
          await getKelurahanData(parseInt(storeData.id_kecamatan));
        }

        const listData = await Promise.all(
          storeData.files?.map(async (file) => {
            const fileObject = await getFileAsBlob(file.file1);
            return {
              fileMOU: fileObject ? [fileObject] : [],
              masaBerlaku: [dayjs(file.tgl_mulai), dayjs(file.tgl_akhir)],
            };
          }) || []
        );

        formInstance.setFieldsValue({
          form_namatransporter: storeData.nama_transporter,
          form_npwp: storeData.npwp_transporter,
          form_kecamatan: storeData.id_kecamatan,
          form_kelurahan: storeData.id_kelurahan,
          form_alamat: storeData.alamat_transporter,
          form_nohp: storeData.nohp,
          form_email: storeData.email,
          form_nama_pemusnah: storeData.nama_pemusnah,
          form_metode_pemusnah: storeData.metode_pemusnah,
          form_link_input_izin: storeData.link_input_izin,
          form_link_input_mou_transporter: storeData.link_input_mou_transporter,
          listMouDynamic: listData,
        });
        globalStore.setLoading?.(false);
      };

      populateForm();
    } else {
      formInstance.resetFields();
    }
  }, []);

  return (
    <>
      {contextHolder}
      <Form
        {...layout}
        form={formInstance}
        name="control-hooks"
        onFinish={handleSubmit}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="form_namatransporter" label="Nama Transporter" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="form_npwp" label="NPWP" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="form_kecamatan" label="Kecamatan" rules={[{ required: true }]}>
          <Select
            showSearch
            placeholder="Silahkan Pilih Kecamatan"
            onChange={handleKecamatanChange}
            options={kecamatanOptions}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            allowClear
          />
        </Form.Item>
        <Form.Item name="form_kelurahan" label="Kelurahan" rules={[{ required: true }]}>
          <Select
            showSearch
            placeholder="Silahkan Pilih Kelurahan"
            options={kelurahanOptions}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            allowClear
          />
        </Form.Item>
        <Form.Item name="form_alamat" label="Alamat" rules={[{ required: true }]}>
          <TextArea showCount maxLength={300} />
        </Form.Item>
        <Form.Item name="form_nohp" label="Nomor Handphone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="form_email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="form_nama_pemusnah"
          label="Nama Pemusnah"
          rules={[{ required: true, message: "Nama pemusnah wajib diisi" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="form_metode_pemusnah"
          label="Metode Pemusnah"
          rules={[{ required: true, message: "Metode pemusnah wajib diisi" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="form_link_input_izin"
          label="Link Input Izin"
          rules={[{ required: true, message: "Link input izin wajib diisi" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="form_link_input_mou_transporter"
          label="Link Input MOU Transporter"
          rules={[
            {
              required: true,
              message: "Link input mou transporter wajib diisi",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Divider />

        <Form.List name="listMouDynamic">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} direction="vertical" size="middle" style={{ display: "flex", justifyContent: "center" }}>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                  <Form.Item
                    {...restField}
                    name={[name, "fileMOU"]}
                    label="Upload MOU"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                    rules={[{ required: true, message: "File MOU wajib diunggah" }]}
                  >
                    <Upload beforeUpload={() => false} maxCount={1}>
                      <Button icon={<UploadOutlined />}>Klik Untuk Upload MOU Transporter</Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "masaBerlaku"]}
                    label="Masa Berlaku MOU"
                    rules={[{ required: true, message: "Masa berlaku MOU wajib diisi" }]}
                  >
                    <RangePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
                  </Form.Item>
                  <Divider />
                </Space>
              ))}
              <Form.Item {...tailLayoutUpload1}>
                <Button
                  block
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  style={{
                    backgroundColor: "#FFFF00",
                    borderColor: "#FFFF00",
                    color: "black",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Klik Untuk Menambahkan MOU Transporter
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item {...tailLayoutUpload}>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            icon={<CheckCircleOutlined />}
            style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormPengajuanTransporter
