import React from "react";
import MainLayout from "../components/MainLayout";
import { Button, Carousel, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import HeaderLanding from "../components/header/HeaderLanding";
import CarrouselLanding from "../components/landing/CarrouselLanding";
import FormLogin from "@/components/login/FormLogin";
import Overview from "@/components/landing/Overview";
import FooterLanding from "@/components/footer/FooterLanding";

const LandingPage: React.FC = () => {
  return (
    <>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <HeaderLanding />
        <CarrouselLanding />
        <Overview />
        {/* <FooterLanding /> */}
      </Space>
    </>
  );
};

export default LandingPage;
