import React from "react";
import { Layout, Typography, Image } from "antd";
import Link from "next/link";

const { Header } = Layout;
const { Title } = Typography;

const HeaderLanding = () => {
  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "white",
          height: 80,
          padding: "0 50px", // Increased padding
          borderBottom: "1px solid #f0f0f0", // Subtle border
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link href="/">
            <Image
              preview={false}
              height={60} // Slightly smaller
              src="/icon-navbar/kotadepok.png"
              alt="icon-depok"
            />
          </Link>
          <Title level={3} style={{ margin: "0 0 0 16px", color: "#007BFF" }}>
            D&apos;SMILING
          </Title>
        </div>
        <div>
          <Image
            preview={false}
            height={60} // Slightly smaller
            src="/icon-navbar/smart-city.png"
            alt="icon-depok"
          />
        </div>
      </Header>
    </Layout>
  );
};

export default HeaderLanding;
