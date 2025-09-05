import React, { useState } from "react";
import { Button, Modal, Spin, Typography } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import bg2 from "../../../public/gambar-carousel/limbah-ilustration.jpg";
import FormLogin from "../login/FormLogin";
import { useGlobalStore } from "@/stores/globalStore";

const { Title, Paragraph } = Typography;

const HeroSection = () => {
  const globalStore = useGlobalStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "calc(100vh - 80px)", // Full viewport height minus header
          backgroundImage: `url(${bg2.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 123, 255, 0.3)", // Lighter, branded overlay
          }}
        />
        <div style={{ zIndex: 1, textAlign: "center", color: "white", padding: "20px" }}>
          <Title style={{ color: "white", fontWeight: "bold", textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }} level={1}>
            D&apos;SMILING
          </Title>
          <Paragraph style={{ color: "white", fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto 30px auto", textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}>
            (Depok Sistem Manajemen Kesehatan Lingkungan)
            <br/>Solusi terintegrasi untuk pengelolaan limbah medis yang efisien, transparan, dan ramah lingkungan di Kota Depok.
          </Paragraph>
          <Button
            type="primary"
            icon={<LoginOutlined />}
            onClick={showModal}
            size="large"
          >
            Login Aplikasi
          </Button>
        </div>
      </div>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null} centered>
        <Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
          Login D&apos;SMILING
        </Title>
        <Spin spinning={globalStore.isloading}>
          <FormLogin />
        </Spin>
      </Modal>
    </>
  );
};

export default HeroSection;
