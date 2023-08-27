import React, { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Row,
  notification,
  Space,
} from "antd";
import { LoginOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useUserLoginStore } from "@/stores/userLoginStore";
import cloneDeep from "clone-deep";
import { useRouter } from "next/router";
import { useGlobalStore } from "@/stores/globalStore";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const cardStyle = {
  width: "360px",
  height: "192px",
  borderRadius: "16px",
  marginRight: "24px",
  boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
};

const FormLogin = () => {
  const globalStore = useGlobalStore();
  let tmpForm = {
    username: "",
    password: "",
  };

  const [form, setForm] = useState(cloneDeep(tmpForm));
  const router = useRouter();

  const userLogin = useUserLoginStore();
  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(event);
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const onFinish = async (values: any) => {
    console.log("Success:", values);

    if (userLogin.prosesLogin) {
      if (globalStore.setLoading) {
        globalStore.setLoading(true);
      }
      let usernya = await userLogin.prosesLogin(
        values.form_username,
        values.form_password
      );
      if (globalStore.setLoading) {
        globalStore.setLoading(false);
      }
      if (usernya == null) return;

      console.log(usernya);
      let url = "/dashboard/user";
      if (usernya) {
        if (usernya.level == "1") {
          url = "/dashboard/admin";
        }
      }
      router.push(url);
    }
  };
  return (
    <Row justify="center">
      <Card style={cardStyle}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            label="Username"
            name="form_username"
            rules={[
              { required: true, message: "Please input your username!" },
            ]}>
            <Input
              name="username"
              onChange={handleChangeInput}
              value={form.username}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="form_password"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}>
            <Input.Password
              name="password"
              onChange={handleChangeInput}
              value={form.password}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            {/* <Link href="/dashboard/user" passHref> */}
            <Button icon={<LoginOutlined />} type="primary" htmlType="submit">
              Login
            </Button>
            {/* </Link> */}
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
};

export default FormLogin;
