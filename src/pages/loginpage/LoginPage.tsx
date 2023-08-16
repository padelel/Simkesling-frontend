import HeaderLanding from "@/components/header/HeaderLanding";
import FormLogin from "@/components/login/FormLogin";
import { Space } from "antd";
import React from "react";

const LoginPage = () => {
  return (
    <>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <HeaderLanding />
        <FormLogin />;
      </Space>
    </>
  );
};

export default LoginPage;
