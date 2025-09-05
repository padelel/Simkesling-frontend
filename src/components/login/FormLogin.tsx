import React from "react";
import { Button, Form, Input } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useUserLoginStore } from "@/stores/userLoginStore";
import { useRouter } from "next/router";
import { useGlobalStore } from "@/stores/globalStore";
import { User } from "@/models/MUser";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const FormLogin = () => {
  const router = useRouter();
  const globalStore = useGlobalStore();
  const userLogin = useUserLoginStore();

  const onFinish = async (values: {
    form_username: string;
    form_password: string;
  }) => {
    if (!userLogin.prosesLogin || !globalStore.setLoading) return;

    globalStore.setLoading(true);
    try {
      const usernya: User | null = await userLogin.prosesLogin(
        values.form_username,
        values.form_password
      );

      if (usernya) {
        userLogin.user = usernya;
        const url =
          usernya.level === "1" ? "/dashboard/admin" : "/dashboard/user";
        await router.push(url);
      }
    } catch (error) {
      console.error("Login process failed:", error);
    } finally {
      globalStore.setLoading(false);
    }
  };
  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="form_username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Masukan Username" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="form_password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Masukan Password" />
      </Form.Item>

      <Form.Item>
        <Button
          size="large"
          block
          icon={<LoginOutlined />}
          type="primary"
          htmlType="submit"
          loading={globalStore.isloading}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormLogin;
