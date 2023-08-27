import React, { useLayoutEffect, useState } from "react";
import {
    Button,
    Divider,
    Form,
    Input,
    Popconfirm,
    Select,
    Upload,
    UploadFile,
    UploadProps, notification
} from "antd";
import {
    UploadOutlined,
    PlusOutlined,
    MinusCircleOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { Space } from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import api from "@/pages/utils/HttpRequest";
import { usePengajuanTransporterStore } from "@/stores/pengajuanTransporterStore";
import apifile from "@/pages/utils/HttpRequestFile";
import router from "next/router";
import cloneDeep from "clone-deep";
import { NotificationType, layout, tailLayout, tailLayoutUpload } from "./FormPengajuanTransporter";

export const FormPengajuanTransporter: React.FC = () => {
    const [apimessage, contextHolder] = notification.useNotification();

    const [formListKey, setFormListKey] = useState(new Date().toISOString());
    const pengajuanTransporterStore = usePengajuanTransporterStore();
    const [kecamatanOptions, setKecamatanOptions] = useState<
        { value: string; label: string; id_kecamatan: number; }[]
    >([]);
    const [selectedKecamatan, setSelectedKecamatan] = useState<number | null>(
        null
    );

    const [kelurahanOptions, setKelurahanOptions] = useState<
        { value: string; label: string; id_kelurahan: number; }[]
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
                    (item: { nama_kecamatan: string; id_kecamatan: number; }) => ({
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
                    (item: { nama_kelurahan: string; id_kelurahan: number; }) => ({
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

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [fileListList, setFileListList] = useState<UploadFile[][]>([]);
    const [dateRangeList, setDateRangeList] = useState<any[]>([]);

    let tmpForm = {
        status_transporter: "",
        oldid: "",
        namatransporter: "",
        npwp: "",
        id_kecamatan: "",
        id_kelurahan: "",
        alamat: "",
        telp: "",
        email: "",
    };

    const [form, setForm] = useState(cloneDeep(tmpForm));

    const [uploading, setUploading] = useState(false);
    const [rowCount, setRowCount] = useState(1);

    const [showMOUFields, setShowMOUFields] = useState(false);

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
        tmpFileListList[name].splice(index, 1);
        setFileListList(tmpFileListList);
    };

    // -- rangeDate
    const onChangeRangeDateDynamic = (
        value: null | (Dayjs | null)[],
        dateStrings: string[],
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

    const handleChangeSelect = (val: any, name: any, event: any) => { };

    // -- onSubmit
    const handleSubmit = async () => {

        const openNotificationWithIcon = (type: NotificationType) => {
            apimessage[type]({
                message: 'Notification Title',
                type: 'success',
                description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            });
        };
        openNotificationWithIcon();

        console.log(form);

        let dataForm: any = new FormData();
        dataForm.append("oldid", form.oldid);
        dataForm.append("nama_transporter", form.namatransporter);
        dataForm.append("npwp_transporter", form.npwp);
        dataForm.append("id_kecamatan", form.id_kecamatan);
        dataForm.append("id_kelurahan", form.id_kelurahan);
        dataForm.append("alamat_transporter", form.alamat);
        dataForm.append("notlp", form.telp);
        dataForm.append("nohp", "-");
        dataForm.append("email", form.email);

        console.log(fileListList);

        // Append tgl_mulai and tgl_akhir based on dateRangeList
        fileListList.forEach((file, index) => {
            console.log(typeof file[0]);
            console.log(file[0].hasOwnProperty("blob"));
            //@ts-ignore
            if (file[0].hasOwnProperty("blob")) {
                // @ts-ignore
                dataForm.append("file_mou[]", file[0].blob, file[0].name);
            } else {
                //@ts-ignore
                dataForm.append("file_mou[]", file[0], file[0].fileName);
            }
            console.log(file);
            // return;
        });

        // Append tgl_mulai and tgl_akhir based on dateRangeList
        dateRangeList.forEach((rangeDates, index) => {
            if (rangeDates.length === 2) {
                // Format the dates to the required format
                const tglMulai = rangeDates[0].format("YYYY-MM-DD");
                const tglAkhir = rangeDates[1].format("YYYY-MM-DD");

                // dataForm.append(`tgl_mulai`, tglMulai);
                // dataForm.append(`tgl_akhir`, tglAkhir);
                dataForm.append(`tgl_mulai[]`, tglMulai);
                dataForm.append(`tgl_akhir[]`, tglAkhir);
            }
        });

        let url = "/user/pengajuan-transporter/create";
        if (router.query.action == "edit") {
            url = "/user/pengajuan-transporter/update";
        }

        if (router.query.action == "validasi") {
            dataForm.append("status_transporter", "2");
            url = "/user/pengajuan-transporter/validasi";
        }
        let responsenya = await api.post(url, dataForm);

        console.log(fileListList);
        console.log(dateRangeList);
        console.log(responsenya);
    };

    // -- onSubmit
    const handleTolak = async () => {
        apimessage.open({
            message: 'Notification Title',
            description: 'Pengajuan Transporter ditolak.',
            duration: 0,
        });

        console.log(form);

        let dataForm: any = new FormData();
        dataForm.append("oldid", form.oldid);
        dataForm.append("nama_transporter", form.namatransporter);
        dataForm.append("npwp_transporter", form.npwp);
        dataForm.append("id_kecamatan", form.id_kecamatan);
        dataForm.append("id_kelurahan", form.id_kelurahan);
        dataForm.append("alamat_transporter", form.alamat);
        dataForm.append("notlp", form.telp);
        dataForm.append("nohp", "-");
        dataForm.append("email", form.email);

        console.log(fileListList);

        // Append tgl_mulai and tgl_akhir based on dateRangeList
        fileListList.forEach((file, index) => {
            console.log(typeof file[0]);
            console.log(file[0].hasOwnProperty("blob"));
            //@ts-ignore
            if (file[0].hasOwnProperty("blob")) {
                // @ts-ignore
                dataForm.append("file_mou[]", file[0].blob, file[0].name);
            } else {
                //@ts-ignore
                dataForm.append("file_mou[]", file[0], file[0].fileName);
            }
            console.log(file);
            // return;
        });

        // Append tgl_mulai and tgl_akhir based on dateRangeList
        dateRangeList.forEach((rangeDates, index) => {
            if (rangeDates.length === 2) {
                // Format the dates to the required format
                const tglMulai = rangeDates[0].format("YYYY-MM-DD");
                const tglAkhir = rangeDates[1].format("YYYY-MM-DD");

                // dataForm.append(`tgl_mulai`, tglMulai);
                // dataForm.append(`tgl_akhir`, tglAkhir);
                dataForm.append(`tgl_mulai[]`, tglMulai);
                dataForm.append(`tgl_akhir[]`, tglAkhir);
            }
        });

        let url = "/user/pengajuan-transporter/create";
        if (router.query.action == "edit") {
            url = "/user/pengajuan-transporter/update";
        }

        if (router.query.action == "validasi") {
            dataForm.append("status_transporter", "0");
            url = "/user/pengajuan-transporter/validasi";
        }
        let responsenya = await api.post(url, dataForm);

        console.log(fileListList);
        console.log(dateRangeList);
        console.log(responsenya);
    };

    const getFile = async (file: any) => {
        try {
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
            // fileListList.push([
            //   {
            //     uid: new Date().toISOString(),
            //     name: filename,
            //     status: "done",
            //     url: blobUrl,
            //   },
            // ]);
            return {
                uid: new Date().toISOString(),
                name: filename,
                status: "done",
                url: blobUrl,
                blob: blob,
            };

            // Open the Blob URL in a new tab
            // window.open(blobUrl, "_blank");
            // Release the Blob URL when done to avoid memory leaks
            // URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Error fetching or processing data:", error);
        }
    };
    const getFilesHere = async () => {
        let lengthfile = pengajuanTransporterStore.files?.length ?? 0;
        let arrfile = [];
        for (let index = 0; index < lengthfile; index++) {
            // const element = array[index];
            if (pengajuanTransporterStore.files) {
                let val = pengajuanTransporterStore.files[index];
                let tmpfile = await getFile(val.file1);
                // let tmpawal = await setDateRangeList(val.tgl_mulai);
                arrfile.push([tmpfile]);
            }
        }
        console.log(arrfile);
        setFileListList(arrfile as any[]);

        const listMouDynamic = formInstance.getFieldValue("listMouDynamic");
        // console.log(listMouDynamic);
        formInstance.setFieldsValue({
            listMouDynamic: arrfile,
        });
    };

    const [formInstance] = Form.useForm();

    useLayoutEffect(() => {
        getKecamatanData();
        console.log(router.query);
        console.log(Object.values(pengajuanTransporterStore));
        console.log(pengajuanTransporterStore);

        // jika create
        formInstance.resetFields();
        setForm(cloneDeep(tmpForm));

        // jika edit set valuenya
        if (router.query.action === "edit" || router.query.action === "validasi") {
            setForm({
                status_transporter: pengajuanTransporterStore.status_transporter_tmp?.toString() ?? "",
                oldid: pengajuanTransporterStore.id_transporter_tmp?.toString() ?? "",
                namatransporter: pengajuanTransporterStore.nama_transporter?.toString() ?? "",
                npwp: pengajuanTransporterStore.npwp_transporter?.toString() ?? "",
                id_kecamatan: pengajuanTransporterStore.id_kecamatan?.toString() ?? "",
                id_kelurahan: pengajuanTransporterStore.id_kelurahan?.toString() ?? "",
                alamat: pengajuanTransporterStore.alamat_transporter?.toString() ?? "",
                telp: pengajuanTransporterStore.nohp?.toString() ?? "",
                email: pengajuanTransporterStore.email?.toString() ?? "",
            });

            formInstance.setFieldsValue({
                form_namatransporter: pengajuanTransporterStore.nama_transporter,
                form_npwp: pengajuanTransporterStore.npwp_transporter,
                form_kecamatan: pengajuanTransporterStore.id_kecamatan,
                form_kelurahan: pengajuanTransporterStore.id_kelurahan,
                form_alamat: pengajuanTransporterStore.alamat_transporter,
                form_nohp: pengajuanTransporterStore.notlp,
                form_email: pengajuanTransporterStore.email,
            });

            getKelurahanData(parseInt(pengajuanTransporterStore.id_kecamatan ?? "0"));
            // getFile(pengajuanTransporterStore.files);
            getFilesHere();
        }
    }, []);
    return (
        <>
            {contextHolder}
            <Form
                {...layout}
                onFinish={handleSubmit}
                name="control-hooks"
                style={{ maxWidth: 600 }}
                form={formInstance}>
                <Form.Item
                    name="form_namatransporter"
                    label="Nama Transporter"
                    rules={[{ required: true }]}>
                    <Input
                        onChange={handleChangeInput}
                        value={form.namatransporter}
                        name="namatransporter" />
                </Form.Item>
                <Form.Item name="form_npwp" label="NPWP" rules={[{ required: true }]}>
                    <Input onChange={handleChangeInput} value={form.npwp} name="npwp" />
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
                        onChange={(v) => handleKecamatanSelectChange(v, "id_kecamatan", event)}
                        placeholder="Silahkan Pilih Kecamatan"
                        allowClear
                        options={kecamatanOptions} />
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
                        onChange={(v) => handleKelurahanSelectChange(v, "id_kelurahan", event)}
                        placeholder="Silahkan Pilih Kelurahan"
                        allowClear
                        options={kelurahanOptions} />
                </Form.Item>
                <Form.Item
                    name="form_alamat"
                    label="Alamat"
                    rules={[{ required: true }]}>
                    <TextArea
                        style={{ width: 250 }}
                        showCount
                        name="alamat"
                        maxLength={300}
                        onChange={handleChangeInput}
                        value={form.alamat} />
                </Form.Item>
                <Form.Item
                    name="form_nohp"
                    label="Nomor Handphone"
                    rules={[{ required: true }]}>
                    <Input onChange={handleChangeInput} value={form.telp} name="telp" />
                </Form.Item>
                <Form.Item name="form_email" label="Email" rules={[{ required: true }]}>
                    <Input onChange={handleChangeInput} value={form.email} name="email" />
                </Form.Item>

                <Divider />

                {fileListList.length}
                <Form.List
                    name="listMouDynamic"
                    initialValue={fileListList}
                    key={formListKey}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    direction="vertical"
                                    size="middle"
                                    key={"spaceKey" + key}
                                    style={{ display: "flex", justifyContent: "center" }}>
                                    <MinusCircleOutlined
                                        onClick={() => handleRemoveRowDynamic(remove, name, key)} />

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
                                            <Upload
                                                beforeUpload={(file) => beforeUploadFileDynamic(file, key)}
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
                                                onChange={(v1, v2) => onChangeRangeDateDynamic(v1, v2, key, name)}
                                                name={"rangePicker" + key}
                                                key={"rangePickerKey" + key} />
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
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={handleSubmit}
                        onCancel={handleTolak}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Validasi</Button>
                    </Popconfirm>
                </Form.Item>
            </Form>
        </>
    );
};
