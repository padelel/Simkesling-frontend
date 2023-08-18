import React, { useState } from "react";
import { Button, Space } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { InfoCircleOutlined } from "@ant-design/icons";
import bg from "../../../public/gambar-carousel/Balaikota-Depok.jpg";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { SpaceSize } from "antd/es/space";
import Link from "next/link";

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

  return (
    <div className="flex" style={contentStyle}>
      <h2>
        SISTEM INFORMASI MANAJEMEN KESEHATAN LINGKUNGAN
        <br />
        Kota Depok - Jawa Barat
      </h2>
      <Space size={size}>
        <Link href="/loginpage" passHref>
          <Button
            type="primary"
            shape="round"
            icon={<LoginOutlined />}
            size={sizeButton}>
            Login
          </Button>
        </Link>
        <Button
          type="primary"
          shape="round"
          icon={<InfoCircleOutlined />}
          size={sizeButton}>
          Tentang Kami
        </Button>
      </Space>
    </div>
  );
};

export default CarrouselLanding;
