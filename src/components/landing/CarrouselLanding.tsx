import React, { useState, useEffect } from "react";
import { Button, Modal, Space } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { InfoCircleOutlined } from "@ant-design/icons";
import bg from "../../../public/gambar-carousel/Balaikota-Depok.jpg";
import bg2 from "../../../public/gambar-carousel/Balaikota-Depok2.jpg";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { SpaceSize } from "antd/es/space";
import Link from "next/link";
import FormLogin from "../login/FormLogin";
import { Roboto } from "next/font/google";

const CarrouselLanding = () => {
  const [sizeButton, setSizeButton] = useState<SizeType>("large"); // default is 'middle'
  const [size, setSize] = useState<SpaceSize | [SpaceSize, SpaceSize]>("small");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bgImage, setBgImage] = useState(bg2.src);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Berganti gambar latar belakang setiap 5 detik
      setBgImage((prevImage) => (prevImage === bg.src ? bg2.src : bg.src));
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="flex"
      style={{
        color: "#fff",
        width: "100%",
        textAlign: "center",
        paddingTop: 100,
        paddingBottom: 100,
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}>
      <h2 style={{ fontFamily: "Roboto" }}>
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

        {/* <Button type="primary" icon={<InfoCircleOutlined />} size={sizeButton}>
          Tentang Kami
        </Button> */}
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
