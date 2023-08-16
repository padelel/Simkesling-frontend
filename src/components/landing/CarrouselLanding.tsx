import React, { useState } from "react";
import { Button, Space } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { InfoCircleOutlined } from "@ant-design/icons";
import bg from "../../../public/gambar-carousel/Balaikota-Depok.jpg";
import { SizeType } from "antd/es/config-provider/SizeContext";

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
  const [size, setSize] = useState<SizeType>("large"); // default is 'middle'

  return (
    <div className="flex" style={contentStyle}>
      <h2>
        SISTEM INFORMASI MANAJEMEN KESEHATAN LINGKUNGAN
        <br />
        Kota Depok - Jawa Barat
      </h2>
      <Space>
        <Button
          type="primary"
          shape="round"
          icon={<LoginOutlined />}
          size={size}>
          Login
        </Button>
        <Button
          type="primary"
          shape="round"
          icon={<InfoCircleOutlined />}
          size={size}>
          Tentang Kami
        </Button>
      </Space>
    </div>
  );
};

export default CarrouselLanding;
