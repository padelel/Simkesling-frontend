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
import { Layout, Menu, MenuProps, theme } from "antd";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

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

  const items: MenuProps["items"] = [
    getItem(
      "Group",
      "grp",
      null,
      [
        getItem("Dashboard", "/dashboardpuskesmas"),
        getItem(
          "Pengajuan Transporter",
          "/dashboardpuskesmas/pengajuantransporter"
        ),
      ],
      "group"
    ),
  ];

  // const items = [
  //   {
  //     icon: <DashboardOutlined />,
  //     label: "Dashboard",
  //     url: "/dashboardpuskesmas",
  //   },
  //   {
  //     icon: <CarOutlined />,
  //     label: "Pengajuan Transporter",
  //     url: "/dashboardpuskesmas/pengajuantransporter",
  //   },
  //   {
  //     icon: <OrderedListOutlined />,
  //     label: "List Transporter",
  //     url: "/dashboardpuskesmas/transporter",
  //   },
  //   {
  //     icon: <BarChartOutlined />,
  //     label: "Laporan Limbah",
  //     url: "/dashboardpuskesmas/limbah",
  //   },
  //   {
  //     icon: <ProfileOutlined />,
  //     label: "Profil Saya",
  //     url: "/dashboardpuskesmas/profilepuskesmas",
  //   },
  //   {
  //     icon: <LogoutOutlined />,
  //     label: "Logout",
  //   },
  // ].map((item, index) => ({
  //   key: (index + 1).toString(),
  //   icon: item.icon,
  //   label: item.label,
  //   url: item.url,
  // }));

  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState("1"); // Default selected key
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setSelectedKey(e.key);
    router.push(e.key);
  };

  // const handleMenuItemClick = (url: any, key: any) => {
  //   console.debug("handleMenuItemClick:", key, url);
  //   if (url) {
  //     setSelectedKey(key);
  //     router.push(url);
  //   }
  // };
  // const handleMenuClick = (isi: any) => {
  //   console.debug(isi);
  //   console.debug("handleMenuItemClick:", key, url);
  //   if (url) {
  //     setSelectedKey(key);
  //     router.push(url);
  //   }
  // };

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
        {/* <Menu mode="inline" onClick={handleMenuClick}>
          {items.map((item, index) => {
            console.log(item);
            return (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                to
                onClick={() => handleMenuItemClick(item.url, item.key)}>
                <div>{item.label}</div>
              </Menu.Item>
            );
          })}
        </Menu> */}
        <Menu
          onClick={onClick}
          defaultSelectedKeys={[selectedKey]}
          mode="inline"
          items={items}
        />
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
          SIMKESLING ©2023 Created by Keluarga Berencana
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
