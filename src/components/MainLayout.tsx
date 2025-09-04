import React, { ReactNode, useEffect, useState } from "react";
import { Layout, Menu, Spin, theme, Typography } from "antd";
import {
  DashboardOutlined,
  CarOutlined,
  OrderedListOutlined,
  BarChartOutlined,
  ProfileOutlined,
  LogoutOutlined,
  HomeOutlined,
  SafetyCertificateOutlined,
  TableOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUserLoginStore } from "@/stores/userLoginStore";
import { useGlobalStore } from "@/stores/globalStore";
import cookie from "js-cookie";
import jwt_decode from "jwt-decode";

const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

const menuConfig = [
  // User menu
  {
    icon: <DashboardOutlined />,
    label: "Dashboard",
    path: "/dashboard/user",
    level: "user",
  },
  {
    icon: <CarOutlined />,
    label: "Pengajuan Transporter",
    path: "/dashboard/user/pengajuantransporter",
    level: "user",
  },
  {
    icon: <OrderedListOutlined />,
    label: "List Transporter",
    path: "/dashboard/user/transporter",
    level: "user",
  },
  {
    icon: <BarChartOutlined />,
    label: "Laporan Limbah",
    path: "/dashboard/user/limbah",
    level: "user",
  },
  {
    icon: <ProfileOutlined />,
    label: "Profil",
    path: "/dashboard/user/profile",
    level: "user",
  },
  // Admin menu
  {
    icon: <HomeOutlined />,
    label: "Dashboard",
    path: "/dashboard/admin",
    level: "admin",
  },
  {
    icon: <TableOutlined />,
    label: "Manajemen Puskesmas / Rumah Sakit",
    path: "/dashboard/admin/manajemen/profil",
    level: "admin",
  },
  {
    icon: <TableOutlined />,
    label: "Manajemen Transporter",
    path: "/dashboard/admin/manajemen/transporter",
    level: "admin",
  },
  {
    icon: <SafetyCertificateOutlined />,
    label: "Validasi Pengajuan Transporter",
    path: "/dashboard/admin/validasi",
    level: "admin",
  },
  {
    icon: <TableOutlined />,
    label: "Manajemen Laporan",
    path: "/dashboard/admin/manajemen/laporan",
    level: "admin",
  },
  {
    icon: <TableOutlined />,
    label: "Manajemen Laporan Rekapitulasi",
    path: "/dashboard/admin/manajemen/laporan-rekapitulasi",
    level: "admin",
  },
  // Logout (all)
  {
    icon: <LogoutOutlined />,
    label: "Logout",
    path: "/",
  },
].map((item) => ({
  key: item.path,
  ...item,
}));

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const userLoginStore = useUserLoginStore();
  const globalStore = useGlobalStore();
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    const token = cookie.get("token");
    const user: any = token ? jwt_decode(token) : null;
    const level = user?.level;

    const filteredMenu = menuConfig.filter((item) => {
      if (!item.level) return true;
      if (level === "1" && item.level === "admin") return true;
      if (level !== "1" && item.level === "user") return true;
      return false;
    });

    setMenuItems(filteredMenu);
  }, []);

  const handleMenuClick = async (menu: any) => {
    const clicked = menuItems.find((item) => item.key === menu.key);
    if (clicked?.label.toLowerCase() === "logout") {
      if (userLoginStore.prosesLogout) {
        await userLoginStore.prosesLogout();
        router.push(clicked.path);
      }
    } else {
      router.push(clicked.path);
    }
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
        width={200}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{ background: colorBgContainer }}
      >
        <div style={{ justifyContent: "center", display: "flex", marginTop: 30 }}>
          <Image
            preview={false}
            width={75}
            height={85}
            src="/icon-navbar/kotadepok.png"
            alt="icon-depok"
          />
        </div>
        <h4 style={{ textAlign: "center" }}>
          Sistem Informasi Manajemen Kesehatan Lingkungan
          <br />
          Kota Depok
        </h4>
        <Menu
          mode="inline"
          defaultSelectedKeys={[router.pathname]}
          selectedKeys={[router.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Title level={5}>{title}</Title>
        </Header>
        <Spin spinning={globalStore.isloading}>
          <Content style={{ margin: "10px 8px 0" }}>
            <div style={{ padding: 8, background: colorBgContainer }}>{children}</div>
          </Content>
        </Spin>
        <Footer style={{ textAlign: "center" }}>SIMKESLING ©2023</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
