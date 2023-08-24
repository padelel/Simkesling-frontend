import MainLayout from "@/components/MainLayout";
import {
  useBearStore,
  usePengajuanTransporterStore,
} from "@/stores/pengajuanTransporterStore";
import { Button, Form, Input, Select } from "antd";
import form from "antd/es/form";
import { useEffect, useState } from "react";

const DariForm: React.FC = () => {
  // const userContext = useContext(UserContext);
  const pengajuanTransporterStore = usePengajuanTransporterStore();
  const [npwp, setNpwp] = useState("");

  const [form] = Form.useForm();

  useEffect(() => {
    console.log(Object.values(pengajuanTransporterStore));

    form.setFieldsValue({
      npwp_form: pengajuanTransporterStore.npwp_transporter,
      nama_transporter_form: pengajuanTransporterStore.nama_transporter,
    }); // Update this line
  }, []);

  const onFill = () => {};

  // const handleNpwpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newNpwp = event.target.value;
  //   pengajuanTransporterStore.simpenSementara({ npwp_transporter: newNpwp });
  //   setNpwp(newNpwp);
  // };
  return (
    <MainLayout>
      <Form form={form} name="control-hooks" style={{ maxWidth: 600 }}>
        <Form.Item
          name="nama_transporter_form"
          label="Nama Transporter"
          rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="npwp_form" label="NPWP" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>

      {/* <table>
        <tbody>
          {Object.keys(pengajuanTransporterStore).map((val, index) => (
            <tr key={index}>
              <td>{val}</td>
              <td>:</td>
              <td>
                {Object.values(pengajuanTransporterStore)[index]?.toString()}{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </MainLayout>
  );
};

export default DariForm;
