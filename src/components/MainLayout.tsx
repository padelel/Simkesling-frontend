import {
  UploadOutlined,
  UserOutlined,
  DashboardOutlined,
  VideoCameraOutlined,
  CarOutlined,
  OrderedListOutlined,
  BarChartOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Typography } from "antd";
import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const { Title } = Typography;
interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

const { Header, Content, Footer, Sider } = Layout;

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/dashboardpuskesmas",
    },
    {
      icon: <CarOutlined />,
      label: "Pengajuan Transporter",
      path: "/dashboardpuskesmas/pengajuantransporter",
    },
    {
      icon: <OrderedListOutlined />,
      label: "Daftar Transporter",
      path: "/dashboardpuskesmas/transporter",
    },
    {
      icon: <BarChartOutlined />,
      label: "Laporan Limbah",
      path: "/dashboardpuskesmas/limbah",
    },
    {
      icon: <ProfileOutlined />,
      label: "Profil Saya",
      path: "/dashboardpuskesmas/profilepuskesmas",
    },
    {
      icon: <LogoutOutlined />,
      label: "Logout",
      path: "/",
    },
  ].map((item, index) => ({
    key: item.path,
    ...item,
  }));

  const onClickMenu = (item: any) => {
    const clicked = items.find((_item) => _item.key === item.key);
    router.push(clicked!.path);
  };

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
        <Menu
          mode="inline"
          defaultSelectedKeys={[router.pathname]}
          selectedKeys={[router.pathname]}
          items={items}
          onClick={onClickMenu}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {/* <div style={{ display: "flex", justifyContent: "center" }}>
            <h2>{title}</h2>
          </div> */}
          <Title level={5}>{title}</Title>
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
          SIMKESLING ©2023 Created by Keluarga Berencana
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
