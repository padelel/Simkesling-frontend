import React, { useState } from "react";
import { Button, Modal, Space } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { InfoCircleOutlined } from "@ant-design/icons";
import bg from "../../../public/gambar-carousel/Balaikota-Depok.jpg";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { SpaceSize } from "antd/es/space";
import Link from "next/link";
import FormLogin from "../login/FormLogin";

const contentStyle: React.CSSProperties = {
  color: "#fff",
  width: "100%",
  textAlign: "center",
  paddingTop: 100,
  paddingBottom: 100,
  backgroundImage: `url(${bg.src})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const CarrouselLanding = () => {
  const [sizeButton, setSizeButton] = useState<SizeType>("large"); // default is 'middle'
  const [size, setSize] = useState<SpaceSize | [SpaceSize, SpaceSize]>("small");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex" style={contentStyle}>
      <h2>
        SISTEM INFORMASI MANAJEMEN KESEHATAN LINGKUNGAN
        <br />
        Kota Depok - Jawa Barat
      </h2>
      <Space size={size}>
        <Button
          type="primary"
          icon={<LoginOutlined />}
          onClick={showModal}
          size={sizeButton}>
          Login
        </Button>

        <Button type="primary" icon={<InfoCircleOutlined />} size={sizeButton}>
          Tentang Kami
        </Button>
      </Space>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}>
        <h2 style={{ textAlign: "center" }}>Login Simkesling</h2>
        <FormLogin />
      </Modal>
    </div>
  );
};

export default CarrouselLanding;
