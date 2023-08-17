import {
  UploadOutlined,
  UserOutlined,
  DashboardOutlined,
  VideoCameraOutlined,
  CarOutlined,
  OrderedListOutlined,
  BarChartOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}
const { Header, Content, Footer, Sider } = Layout;

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      icon: <CarOutlined />,
      label: "Pengajuan Transporter",
    },
    {
      icon: <OrderedListOutlined />,
      label: "Daftar Transporter",
    },
    {
      icon: <BarChartOutlined />,
      label: "Laporan Limbah",
    },
    {
      icon: <ProfileOutlined />,
      label: "Profil Saya",
    },
  ].map((item, index) => ({
    key: String(index + 1),
    icon: item.icon,
    label: item.label,
  }));

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* STYLING */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        width={200}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ background: colorBgContainer }}>
        {/* <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        width={200}
        style={{ background: colorBgContainer }}
      > */}
        {/* <div className="demo-logo-vertical" /> */}
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            marginTop: "30px",
          }}>
          <Image
            src="/icon-navbar/kotadepok.png"
            alt="Vercel Logo"
            width={75}
            height={75}
            priority
          />
          <br />
        </div>
        <h4 style={{ textAlign: "center" }}>
          Sistem Informasi Manajemen Kesehatan Lingkungan
          <br />
          Kota Depok
        </h4>
        <div>
          <h5 style={{ textAlign: "center" }}>
            Puskesmas Pasir Gunung Selatan
          </h5>
        </div>
        <Menu mode="inline" defaultSelectedKeys={["1"]} items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <h4>{title}</h4>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 12,
              background: colorBgContainer,
            }}>
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia */}
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
