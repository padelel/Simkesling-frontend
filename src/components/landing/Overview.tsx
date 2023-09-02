import { Card, Col, Image, Row, Space } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { SpaceSize } from "antd/es/space";
import React, { useEffect, useState } from "react";

const Overview: React.FC = () => {
  const cardStyle = {
    width: "flex",
    height: "flex",
    borderRadius: "10px",
    marginRight: "5px",
    boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 670);
    };

    // Tambahkan event listener untuk mengatur state ketika layar berubah ukurannya
    window.addEventListener("resize", handleResize);

    // Panggil fungsi handleResize saat komponen pertama kali dimuat
    handleResize();

    // Cleanup event listener saat komponen dibongkar
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  return (
    <>
      <Space
        direction={isSmallScreen ? "vertical" : "horizontal"}
        size="middle"
        style={{ display: "flex" }}>
        <Card
          style={cardStyle}
          bordered={false}
          title="Transportasi Limbah Kesehatan">
          {/* <h3 style={{ textAlign: "center" }}></h3> */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image
              alt="gambar"
              src="/gambar-carousel/recycling-truck.png"
              style={{
                maxWidth: "250px",
              }}
            />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            eaque perspiciatis, accusantium deleniti enim voluptate maxime
            reiciendis sequi eius corporis magni, nobis asperiores totam at.
            Fugiat maiores libero molestias vel. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Eos porro earum pariatur? Similique
            beatae rem facere? Odio, velit facere quaerat necessitatibus quam
            nihil, quas deserunt praesentium repellat aperiam voluptate. Earum?
          </p>
        </Card>

        <Card
          style={cardStyle}
          title="Pengolahan Limbah Kesehatan"
          bordered={false}
          cover={
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image
                alt="gambar"
                preview
                src="/gambar-carousel/industry.png"
                style={{
                  maxWidth: "250px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              />
            </div>
          }>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            eaque perspiciatis, accusantium deleniti enim voluptate maxime
            reiciendis sequi eius corporis magni, nobis asperiores totam at.
            Fugiat maiores libero molestias vel. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Eos porro earum pariatur? Similique
            beatae rem facere? Odio, velit facere quaerat necessitatibus quam
            nihil, quas deserunt praesentium repellat aperiam voluptate. Earum?
          </p>
        </Card>
      </Space>
    </>
  );
};

export default Overview;
