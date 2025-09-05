// welcome page sebelum login
import React from "react";
import { Layout } from "antd";

import HeaderLanding from "../components/header/HeaderLanding";
import HeroSection from "../components/landing/CarrouselLanding";
import Overview from "@/components/landing/Overview";
import FooterLanding from "@/components/footer/FooterLanding";

const { Content } = Layout;

const LandingPage: React.FC = () => {
  return (
    <Layout style={{ backgroundColor: "#fff" }}>
      <HeaderLanding />
      <Content>
        <HeroSection />
        <div style={{ padding: "80px 20px", maxWidth: "1200px", margin: "0 auto" }}>
          <Overview />
        </div>
      </Content>
      <FooterLanding />
    </Layout>
  );
};

export default LandingPage;
