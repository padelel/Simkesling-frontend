import { Card, Col, Image, Row, Space } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { SpaceSize } from "antd/es/space";
import React, { useState } from "react";

const Overview = () => {
  const cardStyle = {
    width: "flex",
    height: "flex",
    borderRadius: "10px",
    marginRight: "5px",
    boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
  };
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            style={cardStyle}
            cover={
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  alt="gambar"
                  src="/gambar-carousel/recycling-truck.png"
                  style={{
                    maxWidth: "250px",
                  }}
                />
              </div>
            }
            title="Transportasi Limbah Kesehatan"
            bordered={false}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis eaque perspiciatis, accusantium deleniti enim voluptate
              maxime reiciendis sequi eius corporis magni, nobis asperiores
              totam at. Fugiat maiores libero molestias vel. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Eos porro earum pariatur?
              Similique beatae rem facere? Odio, velit facere quaerat
              necessitatibus quam nihil, quas deserunt praesentium repellat
              aperiam voluptate. Earum?
            </p>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            style={cardStyle}
            title="Pengolahan Limbah Kesehatan"
            bordered={false}
            cover={
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  alt="gambar"
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis eaque perspiciatis, accusantium deleniti enim voluptate
              maxime reiciendis sequi eius corporis magni, nobis asperiores
              totam at. Fugiat maiores libero molestias vel. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Eos porro earum pariatur?
              Similique beatae rem facere? Odio, velit facere quaerat
              necessitatibus quam nihil, quas deserunt praesentium repellat
              aperiam voluptate. Earum?
            </p>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Overview;
