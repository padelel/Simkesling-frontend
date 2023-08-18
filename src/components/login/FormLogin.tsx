import React from "react";
import { Button, Card, Checkbox, Form, Input, Row } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import Link from "next/link";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const cardStyle = {
  width: "360px",
  height: "192px",
  borderRadius: "16px",
  marginRight: "24px",
  boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
};

const FormLogin = () => {
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
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Link href="/dashboardpuskesmas" passHref>
              <Button icon={<LoginOutlined />} type="primary" htmlType="submit">
                Login
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
};

export default FormLogin;
