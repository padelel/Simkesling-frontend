import React from "react";
import { Layout, Menu, Button, Image } from "antd";

const { Header } = Layout;

const HeaderLanding = () => {
  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          background: "white",
          padding: 0,
        }}>
        <div>
          <Image
            width={60}
            height="auto"
            src="/icon-navbar/kotadepok.png"
            alt="icon-depok"
          />
        </div>
        <div>
          <Image
            height={60}
            src="/icon-navbar/smart-city.png"
            alt="icon-depok"
          />
        </div>
      </Header>
    </Layout>
  );
};

export default HeaderLanding;
