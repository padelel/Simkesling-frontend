import {
    SafetyCertificateOutlined,
    HomeOutlined,
    TableOutlined,
} from "@ant-design/icons";
import { Typography, Layout, Menu, theme } from "antd";
import React, { ReactNode, useState } from "react";
import { useRouter } from "next/router";
// import Link from "next/link";
import Image from "next/image";

interface MainLayoutProps {
    children: ReactNode;
    title?: string;
}

const { Title, Paragraph, Text, Link } = Typography;

const { Header, Content, Footer, Sider } = Layout;

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);

    const items = [
        {
            icon: <HomeOutlined />,
            label: "Dashboard",
            path: "/admin/dashboard",
        },
        {
            icon: <TableOutlined />,
            label: "Manajemen Puskesmas / Rumah Sakit",
            path: "/admin/manajemenpuskesmas",
        },
        {
            icon: <TableOutlined />,
            label: "Manajemen Transporter",
            path: "/admin/manajementransporter",
        },
        {
            icon: <SafetyCertificateOutlined />,
            label: "Validasi Pengajuan Transporter",
            path: "/admin/validasitransporter",
        },
        {
            icon: <TableOutlined />,
            label: "Manajemen Laporan",
            path: "/admin/manajemenlaporan",
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
                width={350}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{ background: colorBgContainer }}
            >
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
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[router.pathname]}
                    selectedKeys={[router.pathname]}
                    items={items}
                    onClick={onClickMenu}
                />
            </Sider>
            <Layout>
                <Header style={{ paddingLeft: 5, background: colorBgContainer }}>
                    <Title level={3}>{title}</Title>
                </Header>
                <Content style={{ margin: "24px 16px 0" }}>
                    <div
                        style={{
                            padding: 12,
                            background: colorBgContainer,
                        }}
                    >
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
